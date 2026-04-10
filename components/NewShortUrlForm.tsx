"use client";

import createShortUrl from "@/lib/createShortUrl";
import { ShortUrlProps } from "@/types";
import { useState } from "react";

export default function NewShortUrlForm({
  append,
}: {
  append: (newUrl: ShortUrlProps) => void;
}) {
  const [alias, setAlias] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  return (
    <form
      className="w-96 rounded-xl p-4 bg-sky-400"
      onSubmit={(e) => {
        e.preventDefault();

        setError("");
        setShortUrl("");

        createShortUrl(alias, originalUrl)
          .then((result) => {
            if (!result.success) {
              setError(result.error);
              return;
            }

            append(result.data);
            setShortUrl(`${window.location.origin}/${result.data.alias}`);
            setAlias("");
            setOriginalUrl("");
          })
          .catch(() => setError("Something went wrong."));
      }}
    >
      {/* Original URL input */}
      <input
        type="text"
        placeholder="Original URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="w-full p-2 mb-2 bg-white text-black placeholder-gray-500"
      />

      {/* Alias input */}
      <input
        type="text"
        placeholder="Alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        className="w-full p-2 mb-2 bg-white text-black placeholder-gray-500"
      />

      <div className="w-full flex justify-center">
        <button type="submit" className="bg-white px-4 py-2 rounded">
          Create
        </button>
      </div>

      {/* Error message */}
      {error ? <p className="mt-2 text-red-700">{error}</p> : null}

      {/* Short URL display */}
      {shortUrl ? (
        <div className="mt-2">
          <p className="break-all">{shortUrl}</p>
        </div>
      ) : null}
    </form>
  );
}