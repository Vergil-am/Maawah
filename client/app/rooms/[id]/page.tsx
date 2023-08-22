import axios from "axios";
import { ImageCarousel } from "@/components/rooms/image-carousel";
import MapsView from "@/components/rooms/mapView";
import ReserveCard from "@/components/rooms/reserveCard";
import PageHeader from "@/components/HostPageHeader";

export default async function Room({ params }: { params: { id: string } }) {
  const res = await axios.get(`http://localhost:5000/rooms/${params.id}`);
  const Room = res.data;
  return (
    <main className="lg:container">
      <PageHeader title={Room.title} description={Room.address} className="max-lg:hidden" />
      <div className="w-full flex max-lg:flex-wrap">
        <div className="w-3/5 max-lg:w-screen m-2 max-lg:m-0">
          <ImageCarousel images={Room.images} />
        </div>
        {/* reserve card */}
        <ReserveCard props={Room} />
      </div>
      <div className="w-full flex flex-wrap justify-between">
        <div className="flex-1">
          <p className="text-lg font-semibold flex justify-center">{Room.description}</p>
        </div>
      </div>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Location{" "}
      </h2>

      <MapsView lat={Number(Room.lat)} lon={Number(Room.lon)} />
    </main>
  );
}
