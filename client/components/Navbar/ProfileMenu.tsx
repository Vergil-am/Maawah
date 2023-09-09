"use client";
import * as React from "react";
import { Menu, LucideUser, Home, LifeBuoy, Heart, LogOut, UserPlus } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
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
import { signIn, signOut, useSession } from "next-auth/react";

export default function ProfileMenu() {
  const { status } = useSession()

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
        {status === 'authenticated' ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className={buttonVariants({ variant: 'ghost' })} href="/account">
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className={buttonVariants({ variant: 'ghost' })} href="/wishlist">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Whishlist</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className={buttonVariants({ variant: 'ghost' })} href="/host">
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
                <Button
                  onClick={() => signIn()}
                  variant='ghost'
                >
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span>Signin</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className={buttonVariants({ variant: 'ghost' })} href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Sign up</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuItem>
          <Link className={buttonVariants({ variant: 'ghost' })} href="/help">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Help</span>
          </Link>
        </DropdownMenuItem>
        {status === 'authenticated' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={() => signOut()}
                variant='ghost'>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
