"use client"
import { BedSingle, BedDouble, Waves, Hotel, Warehouse, Ship, Building2, Home } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useAtom } from "jotai";
import { CreateListingAtom } from "./footer";
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
export default function SelectCategory() {
  const [Listing, setListing] = useAtom(CreateListingAtom)
  function onCategorySelect(category: string) {
    setListing({
      ...Listing,
      type: category
    })
  }
  return (
    <>
      <div className="grid grid-cols-2 mt-8 gap-2">
        {Categories.map(category => (
          <Toggle
            pressed={Listing.type === category.name}
            onPressedChange={() => onCategorySelect(category.name)}
            key={category.name} variant='outline' className="flex flex-col h-20">
            {category.icon}
            <h1>{category.name}</h1>
          </Toggle>))}
      </div>
    </>
  )
}
