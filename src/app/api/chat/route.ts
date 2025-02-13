import assert from "assert";
import { type NextRequest } from "next/server";
import OpenAI from "openai";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI();

export async function POST(request: NextRequest) {
  assert(apiKey !== undefined);
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  assert(query !== null);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: query,
      },
    ],
    store: true,
  });
  return Response.json({ answer: completion.choices[0].message });
}
