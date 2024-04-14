import { useToast } from "@/components/ui/use-toast";
import { supabaseClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const sendNewMessageChat = async (
  payload: SendMessagePayload,
) => {
  const { data: chat_id, error } = await supabaseClient.rpc(
    "create_chat_and_chat_message",
    {
      _user_id: payload.user_id,
      _prompt: payload.userInput,
      _reply: payload.response,
    },
  );

  if (error) throw error;
  return chat_id;
};

const sendMessageChatWithId = async (
  payload: SendMessageChatWithId,
) => {
  const { error } = await supabaseClient.from("messages").insert({
    prompt: payload.userInput,
    chat_id: payload.message_chat_id as number,
    reply: payload.response,
    user_id: payload.user_id.toString(),
  });

  if (error) throw error;
};

const deleteChatHistory = async (chat_id: number) => {
  const { data, error } = await supabaseClient.from("chats").delete().eq(
    "chat_id",
    chat_id,
  );

  if (error) {
    throw Error(error.message);
  }
  return data;
};

export const useSendMessageChatWithId = (
  handleSuccess: () => void,
  chat_id: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessageChatWithId,
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries({
        queryKey: ["getChat", chat_id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useSendNewMessageChat = (handleSuccess: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: sendNewMessageChat,
    onSuccess: (chat_id) => {
      router.push(`/dashboard/${chat_id}`);
      queryClient.invalidateQueries({
        queryKey: ["getAllChats"],
      });
      handleSuccess();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteChatHistory = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChatHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllChats"],
      });
      router.push("/dashboard");
    },
    onError: (error) =>
      toast({
        title: "ERROR",
        description: `${error.message}`,
        variant: "destructive",
      }),
  });
};
