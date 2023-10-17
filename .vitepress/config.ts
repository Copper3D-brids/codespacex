import { github, createSocialLinks, createAlgolia } from "./setting.js";

export default {
  base: "/codespacex/",
  srcDir: "src",
  cacheDir: "src/cache",
  outDir: "dist",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/codespacex/logo_header.svg",
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
      // Inspiration
      "/docs/inspirations": createInspirationsSidebar(),
      // EHR
      "/docs/ehr": createEHRColumnSidebar(),
      // DevOps
      "/docs/devops/": createDevOpsSidebar(),
      // // MySQL
      // "/docs/mysql/basic/": createMySQLSidebar(),
      // // 面试
      // "/docs/interview/": createInterviewSidebar(),
      // // 随笔
      // "/docs/essay": createEssaySidebar(),

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
      link: "/docs/inspirations/git",
      activeMatch: "/docs/inspirations/",
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
          ],
        },
        {
          text: "🌋 FHIR",
          link: "/docs/ehr/fhir/01-fhir-resources",
          activeMatch: "/docs/ehr",
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
    {
      text: "🦾 DevOps",
      items: [
        {
          text: "Elastic Search",
          link: "/docs/devops/elastic-search/index",
          activeMatch: "/docs/devops",
        },
        {
          text: "Docker",
          link: "/docs/devops/docker/index",
          activeMatch: "/docs/devops",
        },
        {
          text: "Kubernetes",
          link: "/docs/devops/kubernetes/index",
          activeMatch: "/docs/devops",
        },
      ],
    },
    {
      text: "🔧 Coding tools",
      link: "/docs/code-tools/nav",
      activeMatch: "/docs/code-tools/",
    },
  ];
}

function createInspirationsSidebar() {
  return [
    {
      text: "",
      collapsed: false,
      items: [
        {
          text: "Python",
          link: "/docs/inspirations/python",
        },
        {
          text: "Git",
          link: "/docs/inspirations/git",
        },
        { text: "Javascript", link: "/docs/interview/javascript" },
        { text: "TypeScript", link: "/docs/interview/typescript" },
      ],
    },
  ];
}

/**
 * @description EHR sidebar
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
          items: [
            {
              text: "MVP",
              link: "/docs/ehr/server/mvp",
            },
          ],
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
              link: "/docs/ehr/fhir/hapi_fhir/hapi-fhir",
              items: [
                {
                  text: "T-00 Synthea data",
                  link: "/docs/ehr/fhir/hapi_fhir/tutorials/00-synthea",
                },
                {
                  text: "T-01 Initial dataset",
                  link: "/docs/ehr/fhir/hapi_fhir/tutorials/01-initial-data",
                },
                {
                  text: "T-02 Patient resource",
                  link: "/docs/ehr/fhir/hapi_fhir/tutorials/02-patient-resource",
                },
              ],
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
 * @description DevOps sidebar
 */
function createDevOpsSidebar() {
  return [
    {
      text: "Elastic Search",
      collapsed: false,
      items: [
        { text: "Usage & Scope", link: "/docs/devops/elastic-search/index" },
      ],
    },
    {
      text: "Docker",
      collapsed: false,
      items: [{ text: "Usage & Scope", link: "/docs/devops/docker/index" }],
    },
    {
      text: "Kubernetes",
      collapsed: false,
      items: [{ text: "Usage & Scope", link: "/docs/devops/kubernetes/index" }],
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
