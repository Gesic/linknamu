import { getClicksCollection } from "@/lib/mongodb";
import { profile } from "@/data/profile";

// 해당 링크의 클릭 수를 1 늘리고, 늘어난 값을 돌려줍니다.
export async function POST(_req: Request, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  // profile.ts에 등록된 링크만 집계합니다. (아무 id나 DB에 쌓이지 않도록)
  if (!profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "없는 링크입니다." }, { status: 404 });
  }

  try {
    const collection = await getClicksCollection();
    const doc = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { clicks: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, clicks: doc?.clicks ?? 1 });
  } catch (err) {
    console.error("클릭 수 저장 실패", err);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
