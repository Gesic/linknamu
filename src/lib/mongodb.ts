import { MongoClient, type Collection } from "mongodb";

// 링크별 클릭 수 문서: { _id: 링크 id, clicks: 숫자 }
export type ClickDoc = { _id: string; clicks: number };

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 실행되므로,
// 연결을 전역에 보관해 매번 새 연결이 생기지 않게 합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri)
      .connect()
      .catch((err) => {
        // 연결에 실패하면 다음 요청에서 다시 시도할 수 있도록 비웁니다.
        globalForMongo._mongoClientPromise = undefined;
        throw err;
      });
  }
  return globalForMongo._mongoClientPromise;
}

// DB 이름은 MONGODB_URI 경로(…mongodb.net/linknamu)에서 정해집니다.
export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db().collection<ClickDoc>("clicks");
}
