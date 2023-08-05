import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RentalCardProps } from "@/interfaces/CardProps";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AirVent, Bed, LucideUser, MapPin, Tv2, Waves, Wifi } from "lucide-react";
import AddToWishlistButton from "./AddToWishlistButton";
import Link from "next/link";

const Ammenities: { name: string; icon: JSX.Element }[] = [
  {
    name: "Bed",
    icon: <Bed />,
  },
  {
    name: "Tv",
    icon: <Tv2 />,
  },
  {
    name: "Air conditioning",
    icon: <AirVent />,
  },
  {
    name: "Beach view",
    icon: <Waves />,
  },
  {
    name: "WiFi",
    icon: <Wifi />,
  },
];
export default function RoomCard({ props }: RentalCardProps) {

  return (
    <Card className="w-72 m-2.5 relative max-sm:w-screen">
      <AddToWishlistButton title={props.title} RoomId={props.id} />
      <Link href={`/rooms/${props.id}`}>
        <img className="object-cover rounded-lg" src={props.thumbnail} alt={props.title} />
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription className="flex content-center">
            <MapPin size={16} className="mr-1" />
            {props.address}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex justify-between overflow-hidden text-muted-foreground">
            {Ammenities.map((Ammenity) => {
              return <li key={Ammenity.name}>{Ammenity.icon}</li>;
            })}
          </ul>
        </CardContent>
        <Separator orientation="horizontal" className="mb-1" />
        <CardFooter className="flex justify-between pt-3">
          <p className="flex  leading-7 [&:not(:first-child)]:mt-6">{props.price} / night</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
