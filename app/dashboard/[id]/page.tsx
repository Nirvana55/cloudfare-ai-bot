"use client";

import { useGetChat } from "@/api/chat/queries";
import ChatInput from "@/components/chatInput/ChatInput";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import Sidebar from "@/components/sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatItem = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const { data: chatItemData } = useGetChat(Number(id));

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
            {chatItemData && chatItemData.length > 0 && (
              <div className='flex flex-col rounded-lg p-4'>
                {chatItemData.map((item) => (
                  <div key={item.message_id} className='mb-8 group-last:mb-0'>
                    <div className='flex items-center'>
                      <Avatar className='h-8 w-8 mr-2 cursor-pointer'>
                        <AvatarImage
                          src='https://github.com/shadcn.png'
                          alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <strong>You:</strong>
                      <p className='ml-2 text-[16px] tracking-normal'>
                        {item.prompt}
                      </p>
                    </div>
                    <div className='mt-3'>
                      <div className='flex items-center'>
                        <Bot className='mr-2' />
                        <strong>NIRVANA</strong>
                      </div>
                      <p className='ml-8 text-[15px] tracking-normal'>
                        {item.reply}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        <div className='mb-1 sm:mb-0 lg:px-14 lg:mx-auto lg:max-w-screen-lg'>
          <ChatInput id={id} />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
