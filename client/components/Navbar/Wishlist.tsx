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
import { HeartIcon, MapPin } from "lucide-react";
import { use } from "react";
import { MakeRequest } from "@/lib/fetcher";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { isLoggedinAtom } from "@/components/Navbar/ProfileMenu";
import wishlist from "@/interfaces/wishlist";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Pin } from "lucide-react";
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

  return (
    <>
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
                    <Card >
                      <CardContent className="relative pt-4 grid grid-cols-2 grid-rows-1 gap-4">
                        <div className="">
                          <img src={item.room.thumbnail} className="rounded-lg" />
                        </div>
                        <div>
                          <CardTitle className="">{item.room.title}</CardTitle>
                          <p className="text-xl text-muted-foreground">{item.room.type}</p>
                          <p className="text-sm text-muted-foreground flex content-center"><MapPin size={16} className="mr-2" />{item.room.address}</p>
                        </div>
                        <p className="absolute bottom-2 right-4">{item.room.price} $ /Night</p>
                      </CardContent>
                    </Card>
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
    </>
  );
}
