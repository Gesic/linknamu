import type { CSSProperties } from "react";

// 사진 속에서 프로필 원으로 보여 줄 원의 위치 (원본 이미지 픽셀 기준)
export type ImageCircle = {
  imageWidth: number;
  imageHeight: number;
  cx: number;
  cy: number;
  r: number;
};

type Props = {
  name: string;
  bio: string;
  imageUrl: string;
  imageCircle?: ImageCircle;
};

// 사진 속 원이 프로필 원형 틀에 딱 맞도록 이미지 크기와 위치를 계산합니다.
function circleStyle(c: ImageCircle): CSSProperties {
  const d = c.r * 2;
  return {
    width: `${(c.imageWidth / d) * 100}%`,
    height: `${(c.imageHeight / d) * 100}%`,
    left: `${(-(c.cx - c.r) / d) * 100}%`,
    top: `${(-(c.cy - c.r) / d) * 100}%`,
  };
}

export default function ProfileHeader({
  name,
  bio,
  imageUrl,
  imageCircle,
}: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white/90 shadow-[0_18px_40px_-12px_rgba(40,60,110,0.35),0_4px_10px_-4px_rgba(40,60,110,0.15)] sm:h-36 sm:w-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          className={
            imageCircle
              ? "absolute max-w-none"
              : "h-full w-full object-cover"
          }
          style={imageCircle ? circleStyle(imageCircle) : undefined}
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">
        {name}
      </h1>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-balance text-ink-soft">
        {bio}
      </p>
    </header>
  );
}
