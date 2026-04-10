import getCollection, { URLS_COLLECTION } from "@/db";
import { ShortUrlProps } from "@/types";

export default async function getUrlByAlias(
  alias: string
): Promise<ShortUrlProps | null> {
  const urlCollection = await getCollection(URLS_COLLECTION);
  const data = await urlCollection.findOne({ alias });

  if (data === null) {
    return null;
  }

  return {
    id: data._id.toHexString(),
    alias: data.alias,
    originalUrl: data.originalUrl,
  };
}