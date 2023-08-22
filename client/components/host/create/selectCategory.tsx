"use client"
import { BedSingle, BedDouble, Waves, Hotel, Warehouse, Ship, Building2, Home } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
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
//TODO: make it return the chosen category 
//NOTE:  i'm thinking of making it in the query params? 
export default function SelectCategory() {
  const [SelectedCategory, setSeletedCategory] = useState<string | null>(null)
  function onCategorySelect(category: string) {
    setSeletedCategory(category)
  }
  return (
    <>
      <div className="grid grid-cols-2 mt-8 gap-2">
        {Categories.map(category => (
          <Toggle
            pressed={SelectedCategory === category.name}
            onPressedChange={() => onCategorySelect(category.name)}
            key={category.name} variant='outline' className="flex flex-col h-20">
            {category.icon}
            <h1>{category.name}</h1>
          </Toggle>))}
      </div>
    </>
  )
}
