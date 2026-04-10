"use client";

import { ShortUrlProps } from "@/types";
import { useState } from "react";
import NewShortUrlForm from "./NewShortUrlForm";

export default function ShortUrlDisplay({
  inputUrls,
}: {
  inputUrls: ShortUrlProps[];
}) {
  const [urls, setUrls] = useState(inputUrls);

  function append(newUrl: ShortUrlProps) {
    setUrls([newUrl, ...urls]);
  }

  return (
    <div className="flex flex-col items-center">
      <NewShortUrlForm append={append} />
      {urls.map((u) => (
        <div key={u.id} className="bg-sky-400 rounded-xl p-4 m-2 w-96">
          <h4 className="font-bold text-2xl">{u.alias}</h4>

          <p className="break-all text-sm">
            Original: {u.originalUrl}
          </p>

          <p className="break-all text-sm">
            Short: {window.location.origin}/{u.alias}
          </p>
        </div>
      ))}
    </div>
  );
}