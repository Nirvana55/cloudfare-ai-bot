"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserLogin } from "@/api/auth/mutation";
import { useRouter } from "next/navigation";
import { Bot } from "lucide-react";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});

type LogInSchema = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();
  const form = useForm<LogInSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useUserLogin(() => router.push("/dashboard"));

  const onSubmit = (value: LogInSchema) => {
    login.mutate({
      email: value.email,
      password: value.password,
    });
  };

  return (
    <Card className='mx-auto max-w-sm mt-40 md:mt-56'>
      <CardHeader className='text-center'>
        <Bot size={40} className='mx-auto' />
        <CardTitle className='text-2xl'>Welcome to Nirvana GPT</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id='email'
                      type='email'
                      placeholder='m@example.com'
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id='password'
                      placeholder='password'
                      type='password'
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Login
            </Button>
            <div className='mt-4 text-center text-sm'>
              This is just for test. Have Fun.
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
