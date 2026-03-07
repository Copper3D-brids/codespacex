# 插件化微前端：API Nginx 网关路由指南 (反向代理方案)

在将一个独立的 Vue/React 应用打包为可嵌入主应用 (如 `VolView/main-app`) 的 UMD 插件后，插件应用面临的最大的网络通信问题就是：**插件所需要调用的远端后端 API 的 IP 和端口号是动态和难以预测的**（比如部署在不同的 Kubernetes/Docker 容器组，暴露的宿主机端口会随机变化）。

如果你在跑 `yarn build:plugin` 进行插件 UMD 打包的那一刻，把从 `.env` 读到的 `http://130.2xx...:8080/api` 固定写死进去，一旦容器重新映射端口或者换了部署公网环境，插件的请求就会全部变成跨域死链接。

本指南说明了如何利用 **“同源网关路由转发 (Nginx Reverse Proxy)”** 优雅地解决多插件 API 指向问题。

---

## 核心架构原则

1. **主应用统一代理流量**：前端所有网页应用（包含主应用自身及内部拉取运行的外部子插件）的所有网络请求流量，都发给同一个统一的 Nginx 容器/入口网关。
2. **消融跨域烦恼 (CORS Free)**：只要所有的插件 API 请求都发到了跟主页面（如 `http://mainapp.com`) **完全同源**的域名下，它天生绕过了浏览器的所有跨域规则检查。
3. **划分专属前缀**：为了避免所有插件在向 Nginx 发送请求时都使用同一个含糊的 `/api` 前缀导致主从应用路由冲突，我们在前端代码里为每个子插件约定一个**专属的接口前缀**。 
   - 比如 `Medical Image Annotator` 插件专属的路由是 `/medical-plugin-api`。
   - 比如 `AI Detection` 插件专属的路由是 `/ai-detection-api`。

---

## 前端构建时改造实现

我们希望前端代码能像生命体一样，**聪明地感知到自己当前所处的编译形态**并针对形态切换不同环境和网络基准架构。

### 1. 注入"我是插件"全局宏 (Vite)
我们正在使用 `yarn build:plugin` (通过 `cross-env BUILD_AS_PLUGIN=true vite build`) 执行独立分支构建。可以通过 `vite.config.ts` 暴露出此时的宏变量。

```typescript
// vite.config.ts
export default defineConfig(({ command }) => {
  const isPluginBuild = process.env.BUILD_AS_PLUGIN === 'true'
  
  return {
    define: {
      // 通过环境常量传送到整个所有源文件中
      __IS_PLUGIN__: isPluginBuild, 
    },
    // ...
  }
})
```

### 2. 动态自愈的 Axios BaseURL
在我们管理 Axios 通信的集中处理文件 `client.ts` 顶部，加入这段极其安全的防抖检查代码：

```typescript
// src/plugins/api/client.ts
declare const __IS_PLUGIN__: boolean | undefined;

let endpoint = '';

// 安全检测这个宏是否存在且为 true 
if (typeof __IS_PLUGIN__ !== 'undefined' && __IS_PLUGIN__) {
    // 【插件环境阶段】
    // 将不具有任何端口和 IP，直接向宿主服务器的同一级路径发送带着自己签名的请求
    endpoint = '/medical-plugin-api';
} else {
    // 【本地开发阶段 (yarn dev) / 常规独立全站发布 (yarn build)】
    // 继续老实从你本地或 CI 的 .env 环境配置文件中调取硬编码 IP 与独立端口
    const base_url = import.meta.env.VITE_PLUGIN_API_URL || 'http://127.0.0.1';
    const port = import.meta.env.VITE_PLUGIN_API_PORT || '8000';
    endpoint = `${base_url}:${port}/api`;
}

axios.defaults.baseURL = endpoint;
```

有了它，当你执行单独普通的开发或构建，插件的行为和以前一模一样。但只有当我们构建 `umd.js` 插件时，它会自动在所有的 HTTP 请求前添加无伤的 `/medical-plugin-api`。

---

## 运维/部署端配合 (Nginx 示例配置)

代码改造完后，最后一步就是配置网关把流量接好。假设现在主应用的前端页面架设在一个 Nginx 服务器之上。

配置如下所示：

```nginx
# main-app nginx.conf 生产配置示例
server {
    listen 80;
    server_name localhost;

    # =============== [ 主应用静态文件挂载区 ] ===============
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # =============== [ 主应用的自家常规 API 后端 ] ===============
    location /api {
        proxy_pass http://main_backend:8080/api;
    }

    # =============== [ 新增: Annotator 插件后端的专线路由 ] ===============
    location /medical-plugin-api {
        # 我们在这里利用 rewrite 把 /medical-plugin-api 的前缀扒掉，还原为 /api 传进容器
        rewrite ^/medical-plugin-api/(.*)$ /api/$1 break;
        
        # 转发到 Docker 虚拟网内的实际医疗图像容器指定端口
        proxy_pass http://annotator_backend:8082;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # 如果有 websocket 连接（如 wss 后端通讯）需要保留头
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

通过这一套完美解构与组合组合拳：
- **前端工程师**：只需与运维定下一个专属名字 `/medical-plugin-api`。随后彻底从复杂的 Docker IP、Port 环境参数泥潭中解脱出来。
- **运维/部署工程师**：可以通过 Nginx 配置文件清晰无比地管理每一个子插件应用该映射到哪个虚拟后端的容器端口中，全域尽在掌握。
