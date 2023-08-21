"use client";
import * as React from "react";
import { deleteCookie, getCookie } from "cookies-next";

import { Menu, LucideUser, Home, LifeBuoy, Heart, LogOut, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useAtom, atom } from "jotai";

export const isLoggedinAtom = atom<boolean>(false);
export default function ProfileMenu() {
  // const isLoggedin = true;
  const [isLoggedin, setisLoggedin] = useAtom(isLoggedinAtom);
  React.useEffect(() => {
    const RefreshToken = getCookie("refresh_token");
    if (RefreshToken) {
      setisLoggedin(true);
    }
  }, [isLoggedin]);
  const handleLogout = () => {
    // I need to delete cookies
    deleteCookie("refresh_token");
    deleteCookie("access_token");
    setisLoggedin(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="rounded-full text-foreground hover:text-gray-700">
          <div className="flex items-center">
            <Menu />
            <Avatar className="h-6 w-6 ml-2">
              <AvatarFallback>
                <LucideUser />
              </AvatarFallback>
            </Avatar>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        {isLoggedin ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="flex" href="/account">
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="flex" href="/wishlist">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Whishlist</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="flex" href="/host">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Become a host</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="flex" href="/auth/signin">
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span>Signin</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="flex" href="/auth/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Sign up</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuItem>
          <Link className="flex" href="/help">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Help</span>
          </Link>
        </DropdownMenuItem>
        {isLoggedin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
