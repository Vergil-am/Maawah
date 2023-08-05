"use client"
import { use } from "react";
import { MakeRequest } from "@/lib/fetcher";
import { useAtomValue } from "jotai";
import { isLoggedinAtom } from "@/components/Navbar/ProfileMenu";
import wishlist from "@/interfaces/wishlist";
import { toast } from "@/components/ui/use-toast";
import RoomCard from "@/components/card"
const optionsForFetch = {
  method: "get",
  withCredentials: true,
};
const getWishlist = MakeRequest("http://localhost:5000/wishlist", optionsForFetch)
  .then((res) => res)
  .catch((err) => console.log(err));



export default function Wishlist() {
  const isLoggedin = useAtomValue(isLoggedinAtom);
  if (!isLoggedin) {
    return (
      null
    )
  }
  const wishlist = use(getWishlist);

  async function HandleDelete(item: wishlist) {
    //TODO: I need to add a button to remove from wishlist
    const optionsForDelete = {
      method: "delete",
      withCredentials: true
    }
    try {
      await MakeRequest(`http://localhost:5000/wishlist/${item.id}`, optionsForDelete)
      toast({
        title: `${item.room.title}`,
        description: "removed from wishlist",
      });

    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "failed to remove from wishlist",
        description: `${err.response.data.message}`,
      });
    }


  }
  return (

    <main className="flex flex-wrap justify-start mx-2">

      {wishlist ? (
        wishlist.length < 1 ? <div>your wishlist is empty</div> :
          wishlist.map((item: wishlist) => {
            return (
              <RoomCard props={item.room} key={item.room.id} />
            );
          })
      ) : (
        <div>Loading ...</div>
      )}
    </main>
  )
}
