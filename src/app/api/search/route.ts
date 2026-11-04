import { articleSource } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const revalidate = false;

const searchApi = createFromSource(articleSource);

export const GET = process.env.NEXT_PUBLIC_OUTPUT === "export" ? searchApi.staticGET : searchApi.GET;
