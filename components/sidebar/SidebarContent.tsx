import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot, EllipsisVertical, MessageSquare, Trash2 } from "lucide-react";
import { useGetAllChat } from "@/api/chat/queries";
import { useDeleteChatHistory } from "@/api/chat/mutation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type SideBarContentProps = {
  id?: string;
};

const SidebarContent = (props: SideBarContentProps) => {
  const { id } = props;

  const { data: chatData, isLoading: isChatDataLoading } = useGetAllChat();

  const deleteChatHistory = useDeleteChatHistory();

  const handleChatHistory = (chat_id: number) =>
    deleteChatHistory.mutate(Number(chat_id));
  return (
    <>
      <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
        <Link
          href='/dashboard'
          className='flex items-center gap-2 font-semibold'
        >
          <Bot className='h-6 w-6 mr-2' />
          <span className=''>NIRVANA GPT</span>
        </Link>
      </div>
      <div className='hover:overflow-y-auto lg:h-[calc(100%-56px)]'>
        <div className='mt-3 items-start px-2 text-sm font-medium lg:px-4'>
          {!isChatDataLoading ? (
            <>
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
                    <Dialog>
                      {item.chat_id === Number(id) && (
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
                      )}

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete chat?</DialogTitle>
                        </DialogHeader>
                        <p className='break-all'>
                          {item.messages[0].prompt} will be deleted.
                        </p>
                        <DialogFooter>
                          <Button
                            className='bg-red-600 text-white font-semibold hover:bg-red-700'
                            onClick={() => handleChatHistory(item.chat_id)}
                            disabled={deleteChatHistory.isPending}
                            type='submit'
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className='justify-center h-20 flex mt-64'>
              <Loader2 className='h-4 w-4 animate-spin' />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarContent;
