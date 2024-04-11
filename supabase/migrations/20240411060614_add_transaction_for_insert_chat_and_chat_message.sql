create or replace function create_chat_and_chat_message(_user_id uuid, _prompt text, _reply text)
returns int as $$
declare
  _chat_id int;
begin 
  insert into chats(user_id)
  values (_user_id)
  returning chat_id into _chat_id;

  insert into messages(chat_id,user_id,prompt,reply)
  values (_chat_id,_user_id,_prompt,_reply);
  
  return _chat_id;

end;
$$ language plpgsql;