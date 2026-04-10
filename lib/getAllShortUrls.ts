import getCollection, { URLS_COLLECTION } from "@/db";
import { ShortUrlProps } from "@/types";

export default async function getAllShortUrls(): Promise<ShortUrlProps[]> {
  const urlCollection = await getCollection(URLS_COLLECTION);
  const data = await urlCollection.find().toArray();

  const urls: ShortUrlProps[] = data.map((u) => ({
    id: u._id.toHexString(),
    alias: u.alias,
    originalUrl: u.originalUrl,
  }));

  return urls.reverse();
}