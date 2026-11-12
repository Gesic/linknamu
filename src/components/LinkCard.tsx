type Props = {
  title: string;
  url: string;
  clicks: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, clicks, onClick }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-white/70 bg-white/45 px-16 py-4 text-center text-[15px] font-medium text-ink shadow-[0_6px_24px_-10px_rgba(40,60,110,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_10px_28px_-10px_rgba(40,60,110,0.3),inset_0_1px_0_rgba(255,255,255,0.9)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow-sky motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {title}
      {/* 제목은 가운데 그대로 두고, 클릭 수는 오른쪽 끝에 작게 표시 */}
      <span
        aria-label={`클릭 ${clicks}회`}
        className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-normal tabular-nums text-ink-soft"
      >
        {clicks.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
