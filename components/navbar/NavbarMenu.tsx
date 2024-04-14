"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ThemeToggle";
import { useRouter } from "next/navigation";
import { useUserLogOut } from "@/api/auth/mutation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NavProps = {
  id?: string;
};

const NavbarMenu = (props: NavProps) => {
  const { id } = props;

  const router = useRouter();
  const logOut = useUserLogOut(() => router.push("/auth/login"));
  const handleLogOut = () => logOut.mutate();

  return (
    <header className='flex md:fixed md:top-0 md:w-[calc(100%-220px)] lg:w-[calc(100%-280px)] md:right-0 h-14 items-center justify-between md:justify-end gap-4  px-4 lg:h-[60px] lg:px-6'>
      <MobileMenu id={id} />
      <div className='justify-end flex items-center'>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-8 w-8 cursor-pointer'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem className='cursor-pointer' onClick={handleLogOut}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavbarMenu;
