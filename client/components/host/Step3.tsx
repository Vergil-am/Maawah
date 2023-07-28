import {
  AirVent,
  Bed,
  Warehouse,
  Tv2,
  Waves,
  Wifi,
  BedDouble,
  Bath,
  Microwave,
  ParkingSquare,
  Sofa,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
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
  {
    name: "Couple",
    icon: <BedDouble />,
  },
  {
    name: "",
    icon: <Waves />,
  },
  {
    name: "Garage",
    icon: <Warehouse />,
  },
  {
    name: "Bathtub",
    icon: <Bath />,
  },
  {
    name: "Microwave",
    icon: <Microwave />,
  },
  {
    name: "Parking",
    icon: <ParkingSquare />,
  },
  {
    name: "Sofa",
    icon: <Sofa />,
  },
];
export default function Step3() {
  return (
    <main className="h-[60vh]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Ammenities
      </h2>
      <div>
        {Ammenities.map((Ammenity) => {
          return <Toggle>{Ammenity.icon}</Toggle>;
        })}
      </div>
    </main>
  );
}
