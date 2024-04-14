interface SendMessagePayload {
  userInput: string;
  response: string;
  user_id: string;
}

interface SendMessageChatWithId extends SendMessagePayload {
  message_chat_id?: number;
}
