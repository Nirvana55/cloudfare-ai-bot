"use client";

import { useGetChat } from "@/api/chat/queries";
import ChatInput from "@/components/chatInput/ChatInput";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import Sidebar from "@/components/sidebar/Sidebar";
import SkeletonGeneratingText from "@/components/skeleton/GeneratingTextSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  isRedirectingNewChat,
  responseAtom,
  responseStreaming,
  streamLoading,
  userQuestion,
} from "@/utils/chat/store";
import { useAtom } from "jotai";
import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatItem = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: chatItemData } = useGetChat(Number(id));
  const [chatResponse, setChatResponse] = useAtom(responseAtom);
  const [isChatResponseStreaming] = useAtom(responseStreaming);
  const [chatQuestion] = useAtom(userQuestion);
  const [_userPrompt, setUserPrompt] = useAtom(userQuestion);
  const [_isResponseStreaming, setIsResponseStreaming] =
    useAtom(responseStreaming);
  const [isNewChatRedirection, setIsNewChatRedirection] =
    useAtom(isRedirectingNewChat);

  const [isStreamResponseLoading] = useAtom(streamLoading);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamMessagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const scrollContainer = messagesEndRef.current;
    if (scrollContainer) {
      scrollContainer.scrollIntoView({
        behavior: `${isChatResponseStreaming ? "smooth" : "instant"}`,
      });
    }
  };

  useEffect(() => {
    if (isNewChatRedirection) {
      setIsResponseStreaming(false);
      setChatResponse("");
      setUserPrompt("");
    }
    setIsNewChatRedirection(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatItemData]);

  useEffect(() => {
    scrollToBottom();
  }, [isChatResponseStreaming, chatResponse]);

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar id={id} />
      <NavbarMenu id={id} />

      <div>
        <div className='h-[80vh] md:h-[83vh] lg:h-[85vh] overflow-y-auto md:mt-16'>
          <main className='flex flex-1 flex-col lg:py-6 lg:px-14 lg:mx-auto lg:max-w-screen-lg'>
            {chatItemData && chatItemData.length > 0 && (
              <div className='flex flex-col rounded-lg p-4'>
                {chatItemData.map((item, index) => (
                  <div
                    key={item.message_id}
                    ref={
                      index === chatItemData.length - 1 ? messagesEndRef : null
                    }
                    className='mb-8 group-last:mb-0'
                  >
                    <div className='flex flex-col items-start'>
                      <div className='flex items-center'>
                        <Avatar className='h-8 w-8 mr-2 cursor-pointer'>
                          <AvatarImage
                            src='https://github.com/shadcn.png'
                            alt='@profile'
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <strong>You:</strong>
                      </div>
                      <p className='ml-10 leading-7 break-all text-[16px]'>
                        {item.prompt}
                      </p>
                    </div>

                    <div className='mt-3'>
                      <div className='flex items-center'>
                        <Bot className='mr-2 h-8 w-8 ' />
                        <strong>NIRVANA</strong>
                      </div>
                      <p className='ml-10 text-[16px] leading-7 tracking-normal'>
                        {item.reply}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isChatResponseStreaming && (
              <div className='mb-8 group-last:mb-0' ref={streamMessagesEndRef}>
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
                    <p className='ml-10 text-[16px] leading-7 break-all tracking-normal'>
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
                      <p className='ml-10 text-[16px] leading-7 tracking-normal'>
                        {chatResponse}
                      </p>
                    )
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
        {/* <div ref={messagesEndRef} /> */}

        <div className='mb-1 sm:mb-0 lg:px-14 lg:mx-auto lg:max-w-screen-lg'>
          <ChatInput id={id} />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
