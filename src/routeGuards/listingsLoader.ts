import { validateUrlParams } from "@/taxonomy/validateUrl"
import { redirect } from "react-router-dom";

export function listingsLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const validation = validateUrlParams(params);

  if (!validation.valid) {
    throw redirect("/404"); // 🔥 STOP AVANT RENDER
  }

  return null;
}