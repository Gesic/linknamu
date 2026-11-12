import { connection } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { profile } from "@/data/profile";

// 모든 링크의 현재 클릭 수를 한 번에 돌려줍니다. 예: { "github": 42, "blog": 0 }
export async function GET() {
  // 빌드 시점에 미리 만들어 두지 않고, 요청이 올 때마다 DB에서 읽습니다.
  await connection();

  try {
    const ids = profile.links.map((link) => link.id);
    const collection = await getClicksCollection();
    const docs = await collection.find({ _id: { $in: ids } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(
      ids.map((id) => [id, 0]),
    );
    for (const doc of docs) counts[doc._id] = doc.clicks;

    return Response.json(counts, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("클릭 수 조회 실패", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
