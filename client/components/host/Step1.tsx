import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, Hotel, Home, BedDouble, Users2 } from "lucide-react";

const Types = [
  {
    name: "Appartment",
    icon: <Building2 />,
  },
  {
    name: "Hotel",
    icon: <Hotel />,
  },
  {
    name: "villa",
    icon: <Home />,
  },
  {
    name: "Room",
    icon: <BedDouble />,
  },
  {
    name: "colocation",
    icon: <Users2 />,
  },
];
export default function Step1() {
  return (
    <main className="h-[60vh] flex flex-col justify-center items-center">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Choose a type 
      </h2>
      <RadioGroup defaultValue="comfortable">
        {Types.map((type) => {
          return (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={type.name} id="r1" />
              <Label htmlFor="r1" className="flex items-center">
                {type.icon} {type.name}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </main>
  );
}
