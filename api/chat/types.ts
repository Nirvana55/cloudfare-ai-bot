interface SendMessagePayload {
  userInput: string;
  isInitialChat: boolean;
}

interface SendMessageChatWithId extends SendMessagePayload {
  message_chat_id?: number;
}
