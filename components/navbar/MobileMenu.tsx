import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Bot,
  EllipsisVertical,
  Menu,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { useGetAllChat } from "@/api/chat/queries";
import { useDeleteChatHistory } from "@/api/chat/mutation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SideBarProps = {
  id?: string;
};

const MobileMenu = (props: SideBarProps) => {
  const { id } = props;
  const { data: chatData } = useGetAllChat();
  const deleteChatHistory = useDeleteChatHistory();

  const handleChatHistory = () => deleteChatHistory.mutate(Number(id));

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
          <Link
            href='/dashboard'
            className='flex items-center gap-2 font-semibold'
          >
            <Bot className='h-6 w-6 mr-2' />
            <span className=''>NIRVANA GPT</span>
          </Link>
          <div className='hover:overflow-y-auto lg:h-[calc(100%-56px)]'>
            <div className='mt-3 items-start px-2 text-sm font-medium lg:px-4'>
              <Dialog>
                {chatData?.map((item) => (
                  <Link
                    key={item.chat_id}
                    href={`/dashboard/${item.chat_id}`}
                    className={`flex mb-2`}
                  >
                    <div
                      className={`flex gap-2 items-center cursor-pointer px-2 py-2 group ${
                        item.chat_id === Number(id)
                          ? "bg-black dark:bg-zinc-800 rounded-md text-white isSelected"
                          : "hover:bg-black dark:hover:bg-zinc-800 hover:text-white isNotSelected rounded-md"
                      }`}
                    >
                      <MessageSquare size={16} />
                      <div className='flex-1 w-[140px] group-[.isNotSelected]:w-[160px] lg:w-[180px] lg:group-[.isNotSelected]:w-[205px]'>
                        <p className='truncate text-[14px] capitalize'>
                          {item.messages[0].prompt}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <EllipsisVertical
                            size={16}
                            className='justify-end cursor-pointer hidden group-[.isSelected]:block'
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className='w-[20px]'
                          align='center'
                        >
                          <DialogTrigger asChild>
                            <DropdownMenuItem className='cursor-pointer text-red-500 flex items-center justify-center gap-2'>
                              <Trash2 size={14} />
                              <p>Delete</p>
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete chat?</DialogTitle>
                        </DialogHeader>
                        <p className='line-clamp-5'>
                          {item.messages[0].prompt} will be deleted.
                        </p>
                        <DialogFooter>
                          <Button
                            className='bg-red-600 text-white font-semibold hover:bg-red-700'
                            onClick={handleChatHistory}
                            disabled={deleteChatHistory.isPending}
                            type='submit'
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </div>
                  </Link>
                ))}
              </Dialog>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
