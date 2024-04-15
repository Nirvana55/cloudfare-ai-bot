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
import { useAtom } from "jotai";
import {
  isRedirectingNewChat,
  responseAtom,
  responseStreaming,
  streamLoading,
  userQuestion,
} from "@/utils/chat/store";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [_chatResponse, setChatResponse] = useAtom(responseAtom);
  const [_userPrompt, setUserPrompt] = useAtom(userQuestion);
  const [isResponseStreaming, setIsResponseStreaming] =
    useAtom(responseStreaming);
  const [_isStreamResponseLoading, setIsStreamResponseLoading] =
    useAtom(streamLoading);
  const [_isNewChatRedirection, setIsNewChatRedirection] =
    useAtom(isRedirectingNewChat);
  const form = useForm<QuestionSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
    },
  });

  const sendMessageChat = useSendNewMessageChat(() => {
    setIsNewChatRedirection(true);
  });

  const sendMessageChatWithId = useSendMessageChatWithId(() => {
    form.setValue("question", "");
    form.reset({ question: "" });
    setIsResponseStreaming(false);
    setChatResponse("");
    setUserPrompt("");
  }, Number(id));

  const onSubmit = async (values: QuestionSchema) => {
    setIsResponseStreaming(true);
    setUserPrompt(values.question);
    setIsStreamResponseLoading(true);

    const response = await fetch("/api/cloudfare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: values.question }),
    });

    if (!response.body) {
      setIsResponseStreaming(false);
      setIsStreamResponseLoading(false);
      setChatResponse("");
      setUserPrompt("");

      return;
    }
    setIsStreamResponseLoading(false);

    // getting the stream
    const reader = response.body.getReader();
    // decoding with utf-8
    const decoder = new TextDecoder("utf-8");
    let fullResponse = "";
    // partial data to get full chunks
    let partialData = "";

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        // decoding chunk
        const decoderChunk = decoder.decode(value, { stream: true });
        // partial data for all chunk
        partialData += decoderChunk;

        // split the chunks
        const lines = partialData.split("\n").map((line) => line.trim());
        partialData = lines.pop() as string;

        // remove unused lines and filter
        const parseLines = lines
          .map((line) =>
            line
              .replace(/^data: /, "")
              .replace("</s>", "")
              .trim()
          )
          .filter((line) => line !== "" && line !== "[DONE]" && line !== "</s>")
          .map((line) => JSON.parse(line));

        for (const parsedLine of parseLines) {
          const { response } = parsedLine;
          if (response) {
            setChatResponse((prev) => prev + response);
            fullResponse += response;
          }
        }
      }

      if (id) {
        return sendMessageChatWithId.mutate({
          message_chat_id: Number(id),
          response: fullResponse,
          user_id: user?.id as string,
          userInput: values.question,
        });
      }

      return sendMessageChat.mutate({
        response: fullResponse,
        user_id: user?.id as string,
        userInput: values.question,
      });
    } catch (error) {
      console.error("Error while reading or processing stream: ", error);
    }
  };

  return (
    <div className='px-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid justify-center grid-cols-8 md:grid-cols-9 lg:grid-cols-12 gap-2'
        >
          <div className='col-span-7 md:col-span-8 lg:col-span-11'>
            <FormField
              control={form.control}
              name='question'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='Message NIRVANA GPT'
                      className='resize-none min-h-10 h-10'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='cursor-pointer' asChild>
                <Button
                  disabled={
                    form.getValues("question").length === 0 ||
                    isResponseStreaming
                  }
                  type='submit'
                  className='w-full col-span-1 max-sm:p-2 max-md::p-2 lg:col-span-1 '
                >
                  <Send className='max-sm:h-5 h-5 dark:text-primary-foreground' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
