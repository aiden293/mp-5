import ShortUrlDisplay from "@/components/ShortUrlDisplay";
import getAllShortUrls from "@/lib/getAllShortUrls";

export default async function Home() {
  const urls = await getAllShortUrls();

  return (
    <div className="flex flex-col items-center bg-blue-200 p-4 min-h-screen">
      <ShortUrlDisplay inputUrls={urls} />
    </div>
  );
}