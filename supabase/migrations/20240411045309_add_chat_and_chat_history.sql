create table chats (
  chat_id serial primary key,
  user_id uuid not null,
  created_at timestamp with time zone default current_timestamp,
  update_at timestamp with time zone default current_timestamp,
  foreign key (user_id) references auth.users
);

create table messages (
  message_id serial primary key,
  chat_id int not null,
  user_id uuid not null,
  prompt text not null,
  reply text not null,
  created_at timestamp with time zone default current_timestamp,
  update_at timestamp with time zone default current_timestamp,
  foreign key (user_id) references auth.users,
  foreign key (chat_id) references chats(chat_id) on delete cascade
);

alter table chats enable row level security; 
alter table messages enable row level security; 

create policy insert_own_chat_data on chats
for insert with check (auth.uid() = user_id);

create policy select_own_chat_data on chats
for select using (auth.uid() = user_id);

create policy update_own_chat_data on chats
for update using (auth.uid() = user_id);

create policy delete_own_chat_data on chats
for delete using (auth.uid() = user_id);

create policy insert_own_chat_message on messages
for insert with check (auth.uid() = user_id);

create policy get_own_chat_message on messages
for select using (auth.uid() = user_id);

create policy update_own_chat_message on messages
for update using (auth.uid() = user_id);

create policy delete_own_chat_message on messages
for delete using (auth.uid() = user_id);