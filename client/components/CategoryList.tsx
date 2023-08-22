"use client"
import { BedSingle, BedDouble, Waves, Hotel, Warehouse, Ship, Building2, Home } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Categories = [
  {
    name: "single",
    icon: <BedSingle />,
  },
  {
    name: "Double",
    icon: <BedDouble />,
  },
  {
    name: "Pool",
    icon: <Waves />,
  },
  {
    name: "Appartement",
    icon: <Building2 />,
  },
  {
    name: "Hotel",
    icon: <Hotel />,
  },
  {
    name: "Garage",
    icon: <Warehouse />,
  },
  {
    name: "Beach",
    icon: <Ship />,
  },
  {
    name: "Villa",
    icon: <Home />,
  },
];
export default function CategoryList() {
  return (
    <TooltipProvider>
      <div className="w-screen  overflow-hidden overflow-x-scroll">
        <ul className="flex text-muted-foreground ">
          {Categories.map((cat) => {
            return (
              <Tooltip key={cat.name}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="border-b-black">
                    <li className="m-1 hover:text-black">{cat.icon}</li>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{cat.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </ul>
      </div>{" "}
    </TooltipProvider>
  );
}
