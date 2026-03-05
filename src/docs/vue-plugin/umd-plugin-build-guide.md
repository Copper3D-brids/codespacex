# Vite UMD 插件化 + 动态 CDN 部署配置指南

本指南详细记录了如何将一个庞大的 Vite (Vue/React) 单页应用（SPA，如 VolView）改造为可嵌入的 UMD 插件，并支持在任意第三方 CDN 或存储桶（如 MinIO）上即插即用，彻底解决 Web Worker 和 WebAssembly (WASM) 在子路径下的 404 MIME Type 报错。

## 背景痛点

当使用 Vite 打包一个 UMD (Universal Module Definition) 库提供给第三方使用时，如果库内部存在**动态代码分割 (Dynamic Import)**、**后台线程 (Web Worker)** 或者 **外置资源 (WASM)**，Vite 原生默认会把这些资源的路径写死成相对宿主域名根目录的绝对路径（如 `/assets/workers.js`）或纯相对路径（`./assets/...`）。

当你把打包好的资源夹扔进 MinIO 桶（例如 `https://minio.com/my-bucket/plugins/volview/`）然后让 `main-app` 加载时，由于宿主的主域名是 `http://localhost:5173/`，Vite 内部拉取这些 chunk 时会去请求 `http://localhost:5173/assets/workers.js`，完全丢失了所在 MinIO 桶的前缀，导致 404，进而触发 `non-JavaScript MIME type of "text/html"` 的著名 Vue/Vite 解析报错。

---

## 我们在项目中的具体改造措施

为了让 VolView 变成“不论放到哪里都知道去哪里拉自己的资源”的聪明插件，我们在两个工程中做了以下调整：

### 1. 对产出方 (`VolView`) 的改造

#### A. 入口文件捕获自身部署路径 (`src/index.ts`)
我们必须在 UMD 脚本**刚被宿主应用同步加载的第一瞬间**，抢下它所在的服务器完整路径。
```typescript
// 无论应用在哪个 CDN，自动计算出当前的 host folder 树
let basePath = '/volview'; // Fallback
try {
  const scriptUrl = document.currentScript ? (document.currentScript as HTMLScriptElement).src : '';
  if (scriptUrl) {
    basePath = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));
  }
} catch (e) {
  console.warn('Could not determine UMD path, falling back');
}

// 极其关键：因为 Web Worker 是异步实例化的，那时 document.currentScript 已经没了。
// 所以必须在这里同步拦截，并挂载到全局变量上备用。
(window as any).__VOLVIEW_BASE_PATH__ = basePath + '/';

// 给库级别的静态寻址打补丁 (如 ITK-WASM) 
setPipelinesBaseUrl(`${basePath}/itk/pipelines`);
```

#### B. 跨域拦截器 (Bypassing MinIO Web Worker SecurityError)
如果你要把代码放在诸如 MinIO、AWS S3 这类独立的域名下，你会立即面临一个新的浏览器底层限制：**同源策略 (Same-Origin-Policy) 严禁通过完整的外部跨域链接去 `new Worker('https://minio...')`**，这会直接报 `SecurityError`。

要解决这个问题，我们在 `src/index.ts` 顶层使用“黑客手段”将原生的 Web Worker 构造函数包裹并劫持：
```typescript
// Globally intercept and patch Web Worker creation to bypass MinIO/CDN Cross-Origin SecurityError
const OriginalWorker = window.Worker;
window.Worker = class extends OriginalWorker {
    constructor(scriptURL: string | URL, options?: WorkerOptions) {
        const urlStr = scriptURL.toString();
        // 发现它不仅是绝对路径，且非当前主应用的 Origin
        if (urlStr.startsWith('http') && new URL(urlStr).origin !== window.location.origin) {
            // 建一个本地伪造的假文件(Blob URL)，让本地文件去帮我们跨域下载执行外部的 Worker 文件
            const blob = new Blob([`importScripts('${urlStr}');`], { type: 'application/javascript' });
            const blobUrl = URL.createObjectURL(blob);
            super(blobUrl, options);
        } else {
            super(scriptURL, options);
        }
    }
} as any;
```
有了这两步，你的 UMD 不仅知道了自己的绝对路径，而且还能靠本地的代理套壳来逃避浏览器的同源审查器。

#### C. 剥夺 Vite 对资源的静态写死权 (`vite.config.ts`)
在 Vite 的配置文件中，当我们运行专门的 `build:plugin` 命令时，我们清空静态的 `base` 配置，并启用实验性钩子 `renderBuiltUrl`。通过这个钩子，我们可以给每一个动态引入（哪怕是极深度异步创建的 Worker）都强行加上我们在 `index.ts` 里面捕获的全局部署动态路径。

而在普通的 `yarn build` （打包主站）或者 `yarn dev` 时，保持所有的配置原封不动。

```typescript
const isPlugin = process.env.BUILD_AS_PLUGIN === 'true';

export default defineConfig({
  experimental: isPlugin ? {
    // 拦截 Vite 在构建 UMD 生成阶段对代码中的 import()、new Worker() URL 计算法则
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return {
          // 返回一段运行时的字符串自执行代码
          // 注意：不要在这里使用注入的打包时全局变量（如 __IS_PLUGIN__），因为这部分 runtime string 代码是在 Chunk 渲染成文本的最终阶段原封不动插入的。Vite 无法进入这里替换变量，如果强行检查未被替换的 \`__IS_PLUGIN__\`，在 UMD 单独部署时会因找不到变量而导致判定为 false，最终回退到 \`/volview/...\` 的硬编码失败路径。
          runtime: \`(function() {
              try {
                // 如果是首屏同步加载，自身还包含在 Script Tag 中
                if (document.currentScript && document.currentScript.src) {
                  return document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/') + 1) + \${JSON.stringify(filename)};
                }
                // 如果是 Web Worker 等异步延迟加载，读取我们之前存在 index.ts 的全局存根
                if (window.__VOLVIEW_BASE_PATH__) {
                  return window.__VOLVIEW_BASE_PATH__ + \${JSON.stringify(filename)};
                }
                return \${JSON.stringify('/volview/' + filename)}; // Fallback
              } catch (e) {
                // 异常兜底
                return window.__VOLVIEW_BASE_PATH__ ? (window.__VOLVIEW_BASE_PATH__ + \${JSON.stringify(filename)}) : \${JSON.stringify('/volview/' + filename)};
              }
          })()\`
        };
      }
      return { relative: true };
    }
  } : undefined,
  base: isPlugin ? '' : './', // 极其重要：作为插件时置空 base，否则 Vite 会强制在你拼接的路径前再加一层绝对斜杠
  build: isPlugin
    ? {
      // 插件专用的库模式打包
      lib: {
        entry: './src/index.ts',
        name: 'VolView',
        formats: ['umd'],
        fileName: (format) => \`volview.\${format}.js\`,
      },
      // ...
    }
    : {
      // ... 原应用默认的多 Chunk 打包规则
    }
  // ... 其他打包配置
})
```

#### C. 其他强依赖本地路径的底层库 (`src/io/itk/itkConfig.js`)
像 `itk-wasm` 这种内部还会继续发起二次 fetch 拿取 WASM 的老库，如果有直接拼接 URL 的逻辑也必须抹平：
```javascript
const fullUrl = (relative) => {
  try {
    const scriptUrl = document.currentScript.src;
    return scriptUrl.substring(0, scriptUrl.lastIndexOf('/')) + relative;
  } catch (e) {
    return window.__VOLVIEW_BASE_PATH__ + relative; 
  }
};
```

---

### 2. 对消费方 (`main-app`) 的改造

由于 `VolView` 已经被改造成了智能自推导的架构，消费方变得**极度纯粹和简单**。

无论是将产物传到 MinIO 上还是放在本地，消费方的 `main-app` 对于“路径”这件事不再需要新增任何特殊的 Vite 配置。**唯一需要保证的依赖架构**，是向它提供必要的全局运行时框架（Globals Injection）。

#### 为什么要向 window 挂载变量？
你在 `VolView/vite.config.ts` 打包配置里会看到这样一段代码：
```typescript
rollupOptions: {
  external: ['vue', 'vuetify', 'pinia'],
  output: {
    globals: {
      vue: 'Vue',
      vuetify: 'Vuetify',
      pinia: 'Pinia',
    },
  },
}
```
这叫做**“外部化依赖 (Peer Dependencies)”**。如果不外部化，那么打出来的 `volview.umd.js` 体积会极其庞大，并且内部会包含它自己私有一份的 Vue 实例和 Pinia 实例，这会导致 Vue 抛出非常可怕的双重 Reactivity 代理冲突报错（比如死循环或者数据不响应）。

因此，Vite UMD 构建时移除了这些包，规定：**宿主是谁，谁负责在 window 上提供这几个框架**。

#### 宿主方 (`main-app/src/main.ts`) 的正确挂载姿势
所以在你自己的主工程里，在调用任何 VolView 组件之前，必须显式地把当前运行环境的对应底层依赖“塞给” window，充当打孔好的“连接点”：

```typescript
import * as Vue from 'vue'
import { createPinia, defineStore, storeToRefs, getActivePinia } from 'pinia'
import vuetify from './plugin/vuetify';
import { useTheme, useDisplay } from "vuetify";

// 给 VolView UMD 暴露 Vue 运行时框架
;(window as any).Vue = Vue;

// 给 VolView UMD 暴露响应式的 Pinia 实例调度器
// 为什么连 defineStore 也要挂载？因为 Vite 打包时虽然把 pinia 指向了 window.Pinia，
// 但在有的深层 Chunk 里面它会 destructure (解构) 类似 import { defineStore } from 'pinia'，这就需要我们在 window 上摊平这些方法。
;(window as any).createPinia = createPinia;
;(window as any).getActivePinia = getActivePinia;
;(window as any).defineStore = defineStore;
;(window as any).storeToRefs = storeToRefs;

// 暴露 Vuetify 组件库的主题配置
;(window as any).Vuetify = vuetify;
;(window as any).useTheme = useTheme;
;(window as any).useDisplay = useDisplay;
```

最后，确保在 HTML 或者其他入口加载那个 UMD Js，它顺着这几个全局变量一摸，就能完美地在你的 `main-app` 原有生命周期中苏醒过来。

---

## 通用化：如何应用到其他项目？

未来如果你有其他诸如 React 组件库、WebGL 编辑器（如 Three.js, Babylon.js）、或者其他包含极其复杂的 WASM 线程应用需要构建为 UMD 给客户用时，无论你是用 Vite 还是 Webpack，请牢记这套黄金法则：

1. **入口劫持**：在打包 `entry` 的最顶端，写一个纯 JS 检测 `document.currentScript.src`，把自身的 Host Base 存进 `window.__MY_APP_BASE__` 中。
2. **劫持 Loader**：
   - 如果用 **Vite**：按照上文配置 `experimental.renderBuiltUrl`。
   - 如果用 **Webpack**：在入口顶部第一行设置魔法变量 `__webpack_public_path__ = window.__MY_APP_BASE__`。
3. **消除硬编码**：永远不要在源码中写死相对路径（例如 `new Worker('/assets/xxx.js')`），如果有硬编码要改为 `new Worker(window.__MY_APP_BASE__ + 'assets/xxx.js')`。
