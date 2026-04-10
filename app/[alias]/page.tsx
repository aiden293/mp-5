import getUrlByAlias from "@/lib/getUrlByAlias";
import { notFound, redirect } from "next/navigation";

export default async function AliasPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  const data = await getUrlByAlias(alias);

  if (data === null) {
    notFound();
  }

  redirect(data.originalUrl);
}