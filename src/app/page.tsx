import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile } from "@/data/profile";

// 와이어프레임 배치: 위쪽은 프로필(사진, 이름, 한 줄 소개), 아래쪽은 링크 카드 세로 목록
export default function Home() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-emerald-50 to-white px-4 py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        <ProfileHeader
          name={profile.name}
          bio={profile.bio}
          imageUrl={profile.imageUrl}
        />

        <ul className="mt-8 flex w-full flex-col gap-6">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
