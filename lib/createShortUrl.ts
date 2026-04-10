"use server";

import getCollection, { URLS_COLLECTION } from "@/db";
import { ShortUrlProps } from "@/types";

function isValidUrl(input: string): boolean {
  try {
    const parsed = new URL(input);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidAlias(alias: string): boolean {
  const aliasRegex = /^[a-zA-Z0-9-_]+$/;
  return aliasRegex.test(alias);
}

export default async function createShortUrl(
  alias: string,
  originalUrl: string
): Promise<
  | { success: true; data: ShortUrlProps }
  | { success: false; error: string }
> {
  const trimmedAlias = alias.trim();
  const trimmedUrl = originalUrl.trim();

  if (!trimmedAlias || !trimmedUrl) {
    return { success: false, error: "Please fill in both fields." };
  }

  if (!isValidUrl(trimmedUrl)) {
    return { success: false, error: "Please enter a valid URL." };
  }

  if (!isValidAlias(trimmedAlias)) {
    return {
      success: false,
      error: "Alias can only contain letters, numbers, hyphens, and underscores.",
    };
  }

  const urlCollection = await getCollection(URLS_COLLECTION);
  const existingAlias = await urlCollection.findOne({ alias: trimmedAlias });

  if (existingAlias) {
    return { success: false, error: "That alias is already taken." };
  }

  const newShortUrl = {
    alias: trimmedAlias,
    originalUrl: trimmedUrl,
  };

  const result = await urlCollection.insertOne(newShortUrl);

  if (!result.acknowledged) {
    return { success: false, error: "Failed to create the short URL." };
  }

  return {
    success: true,
    data: {
      id: result.insertedId.toHexString(),
      alias: trimmedAlias,
      originalUrl: trimmedUrl,
    },
  };
}