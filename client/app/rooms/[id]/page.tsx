import axios from "axios";
import ReserveCard from "@/components/rooms/reserveCard";
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card";
import { BedSingle, Bath, Warehouse, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { ImageCarousel } from "@/components/rooms/image-carousel";
import { DatePickerWithRange } from "@/components/ui/daterange-picker";
import MapsView from "@/components/rooms/mapView";
export default async function Room({ params }: { params: { id: string } }) {
  const res = await axios.get(`http://localhost:5000/rooms/${params.id}`);
  const Room = res.data;
  return (
    <main>
      <div className="w-screen flex max-lg:flex-wrap">
        <div className="w-3/5 max-lg:w-screen m-2 max-lg:m-0">
          <ImageCarousel images={Room.images} />
        </div>
        <div className="w-2/5 flex flex-col justify-center items-center max-lg:w-screen mt-2 ">
          <Card className="max-md:w-full max-lg:w-4/5 lg:fixed lg:w-1/3 xl:w-1/4">
            <CardHeader className="flex items-center">
              <CardTitle>{Room.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center flex-col">
              <ul className="max-lg:flex max-lg:justify-between">
                <li className="flex m-2 max-lg:flex-col">
                  <BedSingle color="#000000" className="mr-2" /> Bedrooms : 4
                </li>

                <li className="flex m-2 max-lg:flex-col">
                  <Bath color="#000000" className="mr-2" /> Bathrooms : 1
                </li>
                <li className="flex m-2 max-lg:flex-col">
                  <Warehouse color="#000000" className="mr-2" /> Garages : yes
                </li>
                <li className="flex m-2 max-lg:flex-col">
                  <Home color="#000000" className="mr-2" /> Size : 200 m2
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-center w-full">
              <h1>{Room.price} $ / Night</h1>
              <DatePickerWithRange />
              <Button> Reserve Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between">
        <div className="flex-1">
          <p className="text-lg font-semibold flex justify-center">{Room.description}</p>
        </div>
      </div>

      <div className="w-3/5 m-3 max-lg:w-full rounded-md overflow-hidden">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Location{" "}
        </h2>
        <MapsView Coordinates={{ lat: Room.lat, lon: Room.lon }} />
      </div>
    </main>
  );
}
