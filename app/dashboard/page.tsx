"use client";

import ChatInput from "@/components/chatInput/ChatInput";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import Sidebar from "@/components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar />
      <NavbarMenu />

      <div>
        <div className='h-[80vh] md:h-[83vh] lg:h-[85vh] overflow-y-auto md:mt-16'>
          <main className='flex h-full lg:py-6 items-center justify-center lg:px-14 lg:mx-auto lg:max-w-screen-lg'>
            <div className='flex-1 rounded-lg'>
              <div className='flex flex-col items-center gap-1 text-center'>
                <h3 className='text-2xl font-bold tracking-tight'>
                  WELCOME TO NIRVANA GPT
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Type Any message to start chat with an AI
                </p>
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
