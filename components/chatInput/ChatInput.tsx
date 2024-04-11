"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSendMessageChatWithId,
  useSendNewMessageChat,
} from "@/api/chat/mutation";
import useGetUserData from "@/lib/hooks";

const schema = z.object({
  question: z.string(),
});

type QuestionSchema = z.infer<typeof schema>;

type ChatInputProps = {
  id?: string;
};

const ChatInput = (props: ChatInputProps) => {
  const { id } = props;
  const user = useGetUserData();
  const form = useForm<QuestionSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
    },
  });

  const sendMessageChat = useSendNewMessageChat(() => {
    form.setValue("question", "");
    form.reset({ question: "" });
  });

  const sendMessageChatWithId = useSendMessageChatWithId(() => {
    form.setValue("question", "");
    form.reset({ question: "" });
  }, Number(id));

  const onSubmit = async (values: QuestionSchema) => {
    const payloadData = {
      userInput: values.question,
      user_id: user?.id as string,
    };
    if (id) {
      return sendMessageChatWithId.mutate({
        ...payloadData,
        isInitialChat: false,
        message_chat_id: Number(id),
      });
    }
    return sendMessageChat.mutate({ ...payloadData, isInitialChat: true });
  };

  return (
    <div className='px-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid grid-cols-1 lg:grid-cols-12 gap-2'
        >
          <div className='lg:col-span-11'>
            <FormField
              control={form.control}
              name='question'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id='text'
                      autoComplete='off'
                      type='text'
                      placeholder='Message NIRVANA GPT'
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='w-full lg:col-span-1'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
