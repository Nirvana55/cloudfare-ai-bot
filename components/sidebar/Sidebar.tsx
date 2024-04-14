import Link from "next/link";
import { Bot, EllipsisVertical, MessageSquare, Trash2 } from "lucide-react";
import { useGetAllChat } from "@/api/chat/queries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteChatHistory } from "@/api/chat/mutation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type SideBarProps = {
  id?: string;
};

const Sidebar = (props: SideBarProps) => {
  const { id } = props;
  const { data: chatData } = useGetAllChat();

  const deleteChatHistory = useDeleteChatHistory();

  const handleChatHistory = () => deleteChatHistory.mutate(Number(id));

  return (
    <div className='hidden border-r bg-muted/40 md:block '>
      <div className='fixed top-0 left-0 h-full max-h-screen md:w-[220px] lg:w-[280px]'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link
            href='/dashboard'
            className='flex items-center gap-2 font-semibold'
          >
            <Bot className='h-6 w-6 mr-2' />
            <span className=''>NIRVANA GPT</span>
          </Link>
        </div>
        <div className='hover:overflow-y-auto h-[calc(100%-56px)]'>
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
                    <div className='flex-1 md:w-[140px] lg:w-[180px] group-[.isNotSelected]:w-[205px]'>
                      <p className='line-clamp-1 text-[14px] capitalize'>
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
                      <DropdownMenuContent className='w-[20px]' align='center'>
                        <DialogTrigger asChild>
                          <DropdownMenuItem className='cursor-pointer text-red-500 flex items-center justify-center gap-2'>
                            <Trash2 size={14} />
                            <p>Delete</p>
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Delete chat?</DialogTitle>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <p>
                          This will delete{" "}
                          <span className='font-semibold'>
                            {item.messages[0].prompt}.
                          </span>
                        </p>
                      </div>
                      <DialogFooter>
                        <Button
                          className='bg-red-600 text-white font-semibold hover:bg-red-700'
                          onClick={handleChatHistory}
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
      </div>
    </div>
  );
};

export default Sidebar;
