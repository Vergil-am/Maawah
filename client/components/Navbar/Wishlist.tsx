"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeartIcon } from "lucide-react";
import { use, useEffect } from "react";
import { MakeRequest } from "@/lib/fetcher";
import { useState } from "react";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { isLoggedinAtom } from "@/components/Navbar/ProfileMenu";
import wishlist from "@/interfaces/wishlist";

const options = {
  method: "get",
  withCredentials: true,
};

const getWishlist = MakeRequest("http://localhost:5000/wishlist", options)
  .then((res) => res)
  .catch((err) => console.log(err));

export default function Wishlist() {
  const isLoggedin = useAtomValue(isLoggedinAtom);
  let wishlist: wishlist[] | null = null;
  if (isLoggedin) {
    const Wishlist = use(getWishlist);
    wishlist = Wishlist;
  }
  // const [wishlist, setWishlist] = useState<wishlist[]>()
  // useEffect(() => {
  //   const options = {
  //     method: "get",
  //     withCredentials: true,
  //   }

  //   async function getWishlist() {
  //     const res = await MakeRequest("http://localhost:5000/wishlist", options);
  //     setWishlist(res)

  //   }
  //   getWishlist()

  // }, [isLoggedin])

  return (
    <>
      {/* {isLoggedin ? ( */}
      <Sheet>
        <SheetTrigger asChild>
          <HeartIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Wishlist</SheetTitle>
            <SheetDescription>This is your Wishlist</SheetDescription>
          </SheetHeader>
          <div>
            {wishlist ? (
              wishlist.map((item) => {
                return (
                  <Link key={item.id} href={`rooms/${item.room.id}`}>
                    <div>
                      <h2>{item.room.title}</h2>
                      <img src={item.room.thumbnail} alt={item.room.title} />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>
                <h2>
                  <Link href="/login">Login</Link> to see your wishlist{" "}
                </h2>
              </div>
            )}
          </div>

          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* ) : null} */}
    </>
  );
}
