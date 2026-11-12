"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // 서버에서 받은 클릭 수 (받기 전에는 비어 있어 모두 0회로 보입니다)
  const [serverCounts, setServerCounts] = useState<Record<string, number>>({});
  // 이 페이지에서 누른 횟수 (서버 응답을 기다리지 않고 바로 화면에 반영)
  const [localClicks, setLocalClicks] = useState<Record<string, number>>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => setServerCounts(data))
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("클릭 수를 불러오지 못했습니다.", err);
      });
    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 1을 더하고, 서버에도 기록합니다.
    // 링크가 새 탭에서 열리더라도 요청이 끊기지 않도록 keepalive를 씁니다.
    setLocalClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    fetch(`/api/clicks/${encodeURIComponent(id)}`, {
      method: "POST",
      keepalive: true,
    }).catch((err) => console.error("클릭 수를 저장하지 못했습니다.", err));
  }

  return (
    <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            clicks={(serverCounts[link.id] ?? 0) + (localClicks[link.id] ?? 0)}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
