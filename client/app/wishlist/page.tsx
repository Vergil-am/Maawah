"use client"
import { MakeRequest } from "@/lib/fetcher";
import { atom, useAtom, useSetAtom } from "jotai";
import { loadable } from 'jotai/utils'
import { isLoggedinAtom } from "@/components/Navbar/ProfileMenu";
import wishlist from "@/interfaces/wishlist";
import { toast } from "@/components/ui/use-toast";
import RoomCard from "@/components/card"


const optionsForFetch = {
  method: "get",
  withCredentials: true,
};
const responseAtom = atom(null)
const WishlistAtom = atom(null, async (get, set) => {
  const res = await MakeRequest("http://localhost:5000/wishlist", optionsForFetch)
  set(responseAtom, res)
})
const loadableAtom = loadable<Promise<wishlist[]> | null>(responseAtom)

export default function Wishlist() {
  const [wishlist] = useAtom(loadableAtom)
  const [, refreshData] = useAtom(WishlistAtom)
  // refreshData()
  //TODO: I need to redirect if user is not loggedin
  // const isLoggedin = useAtomValue(isLoggedinAtom);


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
      {wishlist.state == 'loading' ? <div>Loading ... </div>
        : wishlist.state == 'hasError' ? <div>Sorry an error has occured</div>
          : <div>{wishlist.data != null && wishlist.data.map((item) => {
            return <>
              <RoomCard key={item.id} props={item.room} />
            </>
          })}</div>}

    </main>
  )

}
