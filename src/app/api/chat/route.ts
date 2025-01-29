import assert from "assert";
import { type NextRequest } from "next/server";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const apiKey = process.env.X_API_KEY;

export async function POST(request: NextRequest) {
  assert(apiKey !== undefined);
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const email = searchParams.get("email");
  const response = await fetch(
    "https://testfe.voltquant.uk/test/chat?query=" + query + "&email=" + email,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "x-api-key": apiKey,
      },
    }
  );
  const text = await response.json();
  const data = text.data;
  return Response.json({ answer: data.answer });
}
