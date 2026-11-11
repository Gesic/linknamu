import type { ImageCircle } from "@/components/ProfileHeader";

// 보여 주기용 더미 값입니다. 진짜 내용은 이 파일만 고치면 됩니다.

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  imageCircle?: ImageCircle;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "이개발",
  bio: "webOS 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  imageUrl: "/profile.jpg",
  // profile.jpg(601x603) 속 달 모양 원의 위치
  imageCircle: { imageWidth: 601, imageHeight: 603, cx: 305.8, cy: 306, r: 292.6 },
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "blog", title: "Blog", url: "https://example.com" },
  ],
};
