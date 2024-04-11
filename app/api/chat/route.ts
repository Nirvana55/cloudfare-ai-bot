import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let redirectId;
  try {
    const { question, user_id, isInitialChat, message_chat_id } = await req
      .json();
    const supabase = createClient();
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

    if (!isInitialChat) {
      const { error } = await supabase.from("messages").insert({
        user_id,
        prompt: question,
        chat_id: message_chat_id,
        reply: data.result.response,
      });

      if (error) {
        throw error;
      }

      return NextResponse.json(true);
    }
    const { data: chat_id } = await supabase.rpc(
      "create_chat_and_chat_message",
      {
        _user_id: user_id,
        _prompt: question,
        _reply: data.result.response,
      },
    );
    redirectId = chat_id;
  } catch (error: any) {
    console.error("Error in POST handler:", error); // Log the error
    return new Response("An error occurred", { status: 500 });
  }
  if (
    redirectId
  ) {
    redirect(`/dashboard/${redirectId}`);
  }
}
