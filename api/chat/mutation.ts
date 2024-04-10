import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendMessageChat = async (payload: { userInput: string }) => {
  const response = await axios.post("/api/chat", { query: payload.userInput });
  return response;
};

export const useSendMessageChat = (handleSuccess: () => void) => {
  return useMutation({
    mutationFn: sendMessageChat,
    onSuccess: () => {
      handleSuccess();
    },
    onError: () => {
      console.log("ERROR");
    },
  });
};
