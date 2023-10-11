import { github, createSocialLinks, createAlgolia } from "./setting.js";

export default {
  base: "/codespacex_blog/",
  srcDir: "src",
  cacheDir: "src/cache",
  outDir: "dist",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/codespacex_blog/logo_header.svg",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
    ],
  ],
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  title: "CodeSpaceX",
  description: "A knowledge base for EHR & CI/CD",
  // lang: "zh-CN",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    outline: "deep",
    docFooter: { prev: "Prev", next: "Next" },
    lastUpdatedText: "Last update time",
    editLink: {
      pattern: `${github}/blob/main/src/:path`,
      text: "Edit this page on GitHub",
    },
    footer: {
      message: `CodeSpaceX Blog, Welcome <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> let's get more people to discover!`,
      copyright: `<a target="_blank" href="${github}/blob/main/LICENSE">Apache-2.0 License CodeSpaceX </a> | COPYRIGHT © 2023-${new Date().getFullYear()}`,
    },
    socialLinks: createSocialLinks(),
    algolia: createAlgolia(),

    nav: createNav(),
    sidebar: {
      // EHR
      "/docs/ehr": createEHRColumnSidebar(),
      // Py
      "/docs/py/basic/": createPySidebar(),
      // MySQL
      "/docs/mysql/basic/": createMySQLSidebar(),
      // 面试
      "/docs/interview/": createInterviewSidebar(),
      // 随笔
      "/docs/essay": createEssaySidebar(),

      "/docs/code-tools": createCodeToolsSidebar(),
    },
  },
  vite: {
    server: {
      host: "0.0.0.0",
      port: 5872,
    },
    build: {
      minify: "terser",
      chunkSizeWarningLimit: Infinity,
    },
    json: {
      stringify: true,
    },
  },
};

/**
 * @description 导航 navbar
 */
function createNav() {
  return [
    {
      text: "📝 Inspirations",
      link: "/docs/essay/index",
      activeMatch: "/docs/essay/",
    },
    {
      text: "🔥 EHR",
      items: [
        {
          items: [
            {
              text: "🕌 Architecture",
              link: "/docs/ehr/server/architecture",
              activeMatch: "/docs/ehr",
            },
            {
              text: "🌋 FHIR",
              link: "/docs/ehr/fhir/01-fhir-resources",
              activeMatch: "/docs/ehr",
            },
          ],
        },
        {
          text: "🤖 OMOP",
          link: "/docs/ehr/fhir/03-fhir-omop",
          activeMatch: "/docs/ehr",
        },
        {
          text: "🤔 SODA",
          link: "/docs/ehr/soda/soda_guidelines",
          activeMatch: "/docs/ehr",
        },
      ],
    },
    // {
    //   text: "📜 Note",
    //   items: [
    //     {
    //       text: "🐍 Python",
    //       link: "/docs/py/basic/数据类型-运算符",
    //       activeMatch: "/docs/py/basic/数据类型-运算符",
    //     },
    //     {
    //       text: "🐬 MySQL",
    //       link: "/docs/mysql/basic/index",
    //       activeMatch: "/docs/mysql/basic/index",
    //     },
    //   ],
    // },
    {
      text: "🔧 Coding tools",
      link: "/docs/code-tools/nav",
      activeMatch: "/docs/code-tools/",
    },
  ];
}

/**
 * @description 面试 sidebar
 */
function createInterviewSidebar() {
  return [
    {
      text: "",
      collapsed: false,
      items: [
        {
          text: "计算机网络",
          link: "/docs/interview/internet-questions",
        },
        { text: "浏览器", link: "/docs/interview/browser-questions" },
        { text: "HTML、CSS", link: "/docs/interview/html-css" },
        { text: "Javascript", link: "/docs/interview/javascript" },
        { text: "TypeScript", link: "/docs/interview/typescript" },
        { text: "移动端", link: "/docs/interview/mobile" },
        { text: "Vue2", link: "/docs/interview/vue2" },
        { text: "React", link: "/docs/interview/react" },
        { text: "Webpack", link: "/docs/interview/webpack" },
        { text: "Vite", link: "/docs/interview/vite" },
        { text: "Node", link: "/docs/interview/node" },
      ],
    },
  ];
}

/**
 * @description 专栏 sidebar
 */
function createEHRColumnSidebar() {
  return [
    {
      text: "EHR",
      collapsed: false,
      items: [
        { text: "📚 Roadmap", link: "/docs/ehr/roadmap" },
        {
          text: "🌱 Architecture",
          link: "/docs/ehr/server/architecture",
        },
        {
          text: "FHIR",
          // collapsed: false,
          items: [
            {
              text: "FHIR Resources for EHR (MRI)",
              link: "/docs/ehr/fhir/01-fhir-resources",
            },
            {
              text: "Hapi FHIR",
              link: "/docs/ehr/fhir/02-hapi-fhir",
            },
            {
              text: "OMOP on FHIR",
              link: "/docs/ehr/fhir/03-fhir-omop",
            },
            {
              text: "REDCap on FHIR",
              link: "/docs/ehr/fhir/04-fhir-redcap",
            },
          ],
        },
        {
          text: "SODA",
          link: "/docs/ehr/soda/soda_guidelines",
          // collapsed: false,
          items: [
            {
              text: "Guidelines",
              link: "/docs/ehr/soda/soda_guidelines",
            },
          ],
        },
      ],
    },
  ];
}

/**
 * @description 随笔 sidebar
 */
function createEssaySidebar() {
  return [
    {
      text: "Vue",
      collapsed: false,
      items: [{ text: "源码角度分析, Vue3 做的优化", link: "" }],
    },
    {
      text: "小程序",
      collapsed: false,
      items: [
        { text: "微信原生开发入门", link: "" },
        { text: "基于微信原生仿卖座网开发总结", link: "" },
      ],
    },
  ];
}

/**
 * @description Python sidebar
 */
function createPySidebar() {
  return [
    {
      text: "Basic",
      collapsed: false,
      items: [
        { text: "数据类型、运算符", link: "/docs/py/basic/数据类型-运算符" },
        { text: "数据类型（高级）", link: "/docs/py/basic/数据类型-高级" },
        {
          text: "分支、循环、函数、文件IO、异常捕获、模块",
          link: "/docs/py/basic/循环-函数",
        },
        {
          text: "名称空间、作用域、闭包、nonlocal、global",
          link: "/docs/py/basic/作用域",
        },
        { text: "装饰器", link: "/docs/py/basic/装饰器" },
        {
          text: "生成器、迭代器、表达式",
          link: "/docs/py/basic/生成器-迭代器-表达式",
        },
        { text: "面向对象", link: "/docs/py/basic/面向对象" },
        { text: "pymysql 基本操作", link: "/docs/py/basic/pymysql" },
        { text: "内置模块", link: "/docs/py/basic/内置模块" },
        { text: "requiests", link: "/docs/py/basic/requiest" },
        { text: "网络编程", link: "/docs/py/basic/网络编程" },
        { text: "异步编程", link: "/docs/py/basic/线程" },
      ],
    },
  ];
}

/**
 * @descriptionc MySQL sidebar
 */
function createMySQLSidebar() {
  return [
    {
      text: "MySQL",
      collapsed: false,
      items: [
        { text: "📚 导读", link: "/docs/mysql/basic/index" },
        { text: "基础语法", link: "/docs/mysql/basic/语法" },
        { text: "数据类型及表操作", link: "/docs/mysql/basic/表操作" },
        { text: "数据查询", link: "/docs/mysql/basic/数据查询" },
      ],
    },
  ];
}

/**
 * @description 编程工具 sidebar
 */
function createCodeToolsSidebar() {
  return [
    // {
    //   text: "VSCode 配置",
    //   link: "/docs/code-tools/vscode",
    // },
    {
      text: "Resources",
      link: "/docs/code-tools/nav",
    },
  ];
}

// dandanzan oletv + 电影名 =》 google
// duyaoss
// ddys
