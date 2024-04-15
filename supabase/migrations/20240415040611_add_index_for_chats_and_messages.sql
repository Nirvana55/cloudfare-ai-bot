create index idx_chats_user_id on chats (user_id);

create index idx_message_chat_id on messages (chat_id);

create index idx_messages_user_id on messages (user_id);
