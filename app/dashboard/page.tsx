"use client";

import ChatInput from "@/components/chatInput/ChatInput";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import Sidebar from "@/components/sidebar/Sidebar";
import {
  responseAtom,
  responseStreaming,
  streamLoading,
  userQuestion,
} from "@/utils/chat/store";
import { useAtom } from "jotai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import SkeletonGeneratingText from "@/components/skeleton/GeneratingTextSkeleton";

const Dashboard = () => {
  const [chatResponse] = useAtom(responseAtom);
  const [isChatResponseStreaming] = useAtom(responseStreaming);
  const [chatQuestion] = useAtom(userQuestion);
  const [isStreamResponseLoading] = useAtom(streamLoading);
  const pathname = usePathname();

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar />
      <NavbarMenu />

      <div>
        <div className='h-[80vh] md:h-[83vh] lg:h-[85vh] overflow-y-auto md:mt-16'>
          <main
            className={`flex h-full lg:py-6  lg:px-14 lg:mx-auto lg:max-w-screen-lg ${
              isChatResponseStreaming && chatQuestion
                ? ""
                : "items-center justify-center"
            }`}
          >
            <div className='flex-1 rounded-lg'>
              <div className='mb-8 group-last:mb-0'>
                {isChatResponseStreaming && chatQuestion && (
                  <div className='mb-8 group-last:mb-0'>
                    {chatQuestion && (
                      <div className='flex flex-col items-start'>
                        <div className='flex items-center'>
                          <Avatar className='h-8 w-8 mr-2 cursor-pointer'>
                            <AvatarImage
                              src='https://github.com/shadcn.png'
                              alt='@shadcn'
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <strong>You:</strong>
                        </div>
                        <p className='ml-10 text-[16px] justify-start  tracking-normal'>
                          {chatQuestion}
                        </p>
                      </div>
                    )}

                    <div className='mt-3'>
                      <div className='flex items-center'>
                        <Bot className='mr-2' />
                        <strong>NIRVANA</strong>
                      </div>
                      {isStreamResponseLoading ? (
                        <SkeletonGeneratingText />
                      ) : (
                        chatResponse && (
                          <p className='ml-8 text-[15px] tracking-normal'>
                            {chatResponse}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}
                {pathname === "/dashboard" &&
                  !isChatResponseStreaming &&
                  !chatQuestion && (
                    <div className='flex flex-col items-center gap-1 text-center'>
                      <h3 className='text-2xl font-bold tracking-tight'>
                        WELCOME TO NIRVANA GPT
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Type Any message to start chat with an AI
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </main>
        </div>

        <div className='mb-1 sm:mb-0 lg:px-14 lg:mx-auto lg:max-w-screen-lg'>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
