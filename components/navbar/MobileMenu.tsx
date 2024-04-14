import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import SidebarContent from "../sidebar/SidebarContent";

type SideBarProps = {
  id?: string;
};

const MobileMenu = (props: SideBarProps) => {
  const { id } = props;

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
          <SidebarContent id={id} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
