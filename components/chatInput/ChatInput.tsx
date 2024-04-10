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
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
  question: z.string(),
});

type QuestionSchema = z.infer<typeof schema>;

type ChatInputProps = {
  handleSubmit?: () => void;
  setChatHistory: Dispatch<
    SetStateAction<
      Partial<{
        msg: string;
        reply: string;
      }>[]
    >
  >;
};

const ChatInput = (props: ChatInputProps) => {
  const { setChatHistory } = props;

  const form = useForm<QuestionSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = async (values: QuestionSchema) => {
    try {
      const response = await axios.post("/api/chat", {
        question: values.question,
      });
      setChatHistory((prev) => [
        ...prev,
        {
          msg: values.question,
          reply: response.data.result.response,
        },
      ]);
    } catch (error) {
      console.log("first");
    }
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
