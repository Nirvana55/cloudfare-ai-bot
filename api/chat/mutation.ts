import { useToast } from "@/components/ui/use-toast";
import { supabaseClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const sendNewMessageChat = async (
  payload: SendMessagePayload,
) => {
  const response = await axios.post("/api/chat", {
    question: payload.userInput,
    user_id: payload.user_id,
    isInitialChat: payload.isInitialChat,
  });

  return response;
};

const sendMessageChatWithId = async (
  payload: SendMessageChatWithId,
) => {
  const response = await axios.post("/api/chat", {
    question: payload.userInput,
    user_id: payload.user_id,
    isInitialChat: payload.isInitialChat,
    message_chat_id: payload.message_chat_id,
  });
  return response;
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

  return useMutation({
    mutationFn: sendNewMessageChat,
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries({
        queryKey: ["getAllChats"],
      });
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
