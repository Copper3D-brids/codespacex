// typing --------------------------------------------------------------------

export interface SocialLink {
  icon: SocialLinkIcon;
  link: string;
}

export type SocialLinkIcon =
  | "discord"
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "mastodon"
  | "slack"
  | "twitter"
  | "youtube"
  | { svg: string };

// setting --------------------------------------------------------------------

export const github = "https://github.com/LinkunGao/codespacex_blog";

export function createSocialLinks(): SocialLink[] {
  return [{ icon: "github", link: github }];
}

export function createAlgolia() {
  return {
    apiKey: "b660c80f7535631292cb660a98e85d97",
    indexName: "codespacex-",
    // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
    appId: "260HZ0WV1R",
    placeholder: "Keywords for search docs",
    translations: {
      button: {
        buttonText: "Search",
      },
    },
  };
}
