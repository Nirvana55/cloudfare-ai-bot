"use client";

import ChatInput from "@/components/chatInput/ChatInput";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import Sidebar from "@/components/sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChatItem = Partial<{ msg: string; reply: string }>;

const ChatItem = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([{ msg: "1" }]);

  useEffect(() => {
    if (scrollableDivRef.current) {
      const scrollableDiv = scrollableDivRef.current;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, []);

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar id={id} />
      <NavbarMenu />

      <div>
        <div
          ref={scrollableDivRef}
          className='h-[80vh] md:h-[83vh] lg:h-[85vh] overflow-y-auto md:mt-16'
        >
          <main className='flex flex-1 flex-col lg:py-6 lg:px-14 lg:mx-auto lg:max-w-screen-lg'>
            {chatHistory.length > 0 ? (
              <div className='flex flex-col rounded-lg p-4'>
                {[1, 2, 3, 3, 3, 3, 3, 3, 3].map((item, index) => (
                  <div key={index} className='mb-8 group-last:mb-0'>
                    <div className='flex items-center'>
                      <Avatar className='h-8 w-8 mr-2 cursor-pointer'>
                        <AvatarImage
                          src='https://github.com/shadcn.png'
                          alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <strong>You</strong>
                    </div>
                    <div className='mt-3'>
                      <div className='flex items-center'>
                        <Bot className='mr-2' />
                        <strong>NIRVANA</strong>
                      </div>
                      <p className='ml-8 text-[15px] tracking-normal'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur quae, magnam eius hic maxime saepe ea sed
                        iusto laudantium exercitationem cum modi quibusdam nobis
                        laboriosam officia possimus quisquam voluptatem
                        sapiente. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Consequatur quae, magnam eius hic
                        maxime saepe ea sed iusto laudantium exercitationem cum
                        modi quibusdam nobis laboriosam officia possimus
                        quisquam voluptatem sapiente.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
                <div className='flex flex-col items-center gap-1 text-center'>
                  <h3 className='text-2xl font-bold tracking-tight'>
                    WELCOME TO NIRVANA GPT
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Type Any message to start chat with an AI
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>

        <div className='mb-1 sm:mb-0 lg:px-14 lg:mx-auto lg:max-w-screen-lg'>
          <ChatInput setChatHistory={setChatHistory} />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
