interface SendMessagePayload {
  userInput: string;
  user_id: string;
  isInitialChat: boolean;
}

interface SendMessageChatWithId extends SendMessagePayload {
  message_chat_id?: number;
}
