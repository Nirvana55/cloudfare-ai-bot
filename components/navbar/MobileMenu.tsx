import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bot, EllipsisVertical, Menu, MessageSquare } from "lucide-react";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <nav className='grid gap-2 text-lg font-medium'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Bot className='h-4 w-4 mr-2' />
            <span className=''>NIRVANA GPT</span>
          </Link>
          <div className='hover:overflow-y-auto h-[calc(100%-56px)]'>
            <div className='mt-3 items-start px-2 text-sm font-medium lg:px-4'>
              {[1, 2].map((item, index) => (
                <div
                  key={index}
                  className={`mb-2 group ${
                    item === 1
                      ? "bg-black dark:bg-zinc-800 rounded-md text-white isSelected"
                      : "hover:bg-black dark:hover:bg-zinc-800 hover:text-white rounded-md"
                  }`}
                >
                  <div className='flex gap-2 items-center cursor-pointer px-2 py-2'>
                    <MessageSquare size={16} />
                    <div className='flex-1'>
                      <p className='line-clamp-1 text-[13px]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fuga error repellendus, perferendis ipsum at a vero
                        voluptatibus voluptatum porro. Ipsam temporibus id modi
                        debitis iusto atque mollitia maxime? Corrupti,
                        molestias?
                      </p>
                    </div>
                    <EllipsisVertical
                      size={16}
                      className='justify-end cursor-pointer hidden group-[.isSelected]:block group-hover:block'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
