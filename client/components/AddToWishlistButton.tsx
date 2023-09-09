"use client";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { MakeRequest } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface props {
  title: string;
  RoomId: string;
}
export default function AddToWishlistButton({ title, RoomId }: props) {
  const router = useRouter()
  const { status } = useSession()
  const { toast } = useToast();

  const AddToWishlist = async () => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
    const options = {
      method: "post",
      withCredentials: true,
      data: {
        roomId: RoomId,
      },
    };
    const res = await MakeRequest("http://localhost:5000/wishlist", options);
    console.log(res);
    // This still needs to be added to a wishlist component
    toast({
      title: `${title}`,
      description: "Added to wishlist",
      action: <ToastAction altText="Goto wishlist to undo">Undo</ToastAction>,
    });
  };
  return (
    <Button
      onClick={AddToWishlist}
      size="sm"
      variant="secondary"
      className="absolute right-2 top-2 rounded-full px-1.5 py-0"
    >
      <Heart />
    </Button>
  );
}
