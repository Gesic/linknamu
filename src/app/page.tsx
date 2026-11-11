import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile } from "@/data/profile";

// 와이어프레임 배치: 위쪽은 프로필(사진, 이름, 한 줄 소개), 아래쪽은 링크 카드 세로 목록
export default function Home() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden px-6 py-16 sm:py-24">
      {/* 배경 장식: 흐릿한 빛 번짐 (글래스 카드 뒤로 은은하게 비침) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-full max-w-2xl -translate-x-1/2"
      >
        <div className="absolute top-0 -left-16 h-72 w-72 rounded-full bg-glow-sky/50 blur-3xl" />
        <div className="absolute top-[340px] -right-16 h-80 w-80 rounded-full bg-glow-lavender/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-glow-mint/60 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-col items-center">
        <ProfileHeader
          name={profile.name}
          bio={profile.bio}
          imageUrl={profile.imageUrl}
          imageCircle={profile.imageCircle}
        />

        <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
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
