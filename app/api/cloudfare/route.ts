export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const cloudflareResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_CLOUD_FARE_API_USER_ID}/ai/run/@hf/thebloke/mistral-7b-instruct-v0.1-awq`,
      {
        method: "POST",
        body: JSON.stringify({
          messages,
          stream: true,
        }),
        headers: {
          Authorization: `Bearer ${process.env.NEXT_CLOUD_FARE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!cloudflareResponse.body) {
      return new Response("Failed to stream response from Cloudflare.", {
        status: 500,
      });
    }

    return new Response(cloudflareResponse.body, {
      status: 200,
    });
  } catch (error) {
    console.error("Stream failed:", error);
    return new Response("An error occurred", { status: 500 });
  }
}
