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

export const github = "https://github.com/Copper3D-brids/codespacex";

export function createSocialLinks(): SocialLink[] {
  return [{ icon: "github", link: github }];
}

export function createAlgolia() {
  return {
    apiKey: "45b6bb84224e68593eeda867627c0925",
    indexName: "codespacex",
    // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
    appId: "P808QIPILT",
    placeholder: "Keywords for search docs",
    translations: {
      button: {
        buttonText: "Search",
      },
    },
  };
}

