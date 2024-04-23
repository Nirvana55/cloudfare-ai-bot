import { supabaseClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const getAllChats = async () => {
  const { data, error } = await supabaseClient.from("chats").select(
    "chat_id,messages(prompt)",
  ).order("created_at", {
    ascending: false,
  });

  if (error) {
    throw error;
  }
  return data;
};

const getChat = async (chat_id: number) => {
  const { data, error } = await supabaseClient.from("messages").select(
    "message_id,prompt,reply",
  ).eq(
    "chat_id",
    chat_id,
  ).order("created_at", { ascending: true });

  if (error) {
    throw error;
  }
  const formattedData = data.map((item) => {
    return [{
      role: "user",
      content: item.prompt,
    }, { role: "assistant", "content": item.reply }];
  }).flat();
  return { data, formattedData };
};

export const useGetAllChat = () => {
  return useQuery({
    queryKey: ["getAllChats"],
    queryFn: () => getAllChats(),
    refetchOnWindowFocus: true,
  });
};

export const useGetChat = (chat_id: number) => {
  return useQuery({
    queryKey: ["getChat", chat_id],
    queryFn: () => getChat(chat_id),
    enabled: !!chat_id,
    refetchOnWindowFocus: true,
  });
};
