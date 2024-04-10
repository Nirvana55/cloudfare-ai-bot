import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const cloudflareResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_CLOUD_FARE_API_USER_ID}/ai/run/@hf/thebloke/mistral-7b-instruct-v0.1-awq`,
      {
        method: "POST",
        body: JSON.stringify({
          prompt: question || "Hello",
        }),
        headers: {
          Authorization: `Bearer ${process.env.NEXT_CLOUD_FARE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await cloudflareResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return new Response("Error fetching from Cloudflare", { status: 500 });
  }
}
