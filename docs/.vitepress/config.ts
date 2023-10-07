// import { defineConfig } from "vitepress";

export default {
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    nav: [
      {
        text: "Guide",
        link: "/guide",
        activeMatch: "/guide/what-is-vitepress",
      },
      {
        text: "Select boxes",
        items: [
          { text: "options-1", link: "/" },
          { text: "options-2", link: "http://www.baidu.com" },
        ],
      },
    ],
  },
};
