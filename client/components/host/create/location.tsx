"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin } from "lucide-react";
import { Draggable, Map, Marker } from "pigeon-maps"
import { osm } from "pigeon-maps/providers";
import { useState } from "react";
const SelectItems = [
  {
    name: 'alger',
    lon: 36.7597828,
    lat: 3.0541533,
  }
]

export default function Location() {
  const [anchor, setAnchor] = useState([36.328, 2.609]);
  console.log(anchor)
  return (
    <main className="container">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {SelectItems.map(item => (
              <SelectItem value={item.name} onSelect={() => setAnchor([item.lon, item.lat])}>{item.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Map height={500} width={500} provider={osm} zoom={6} center={[36.328, 2.609]}>
        <Draggable offset={[6, 6]} anchor={[anchor[0], anchor[1]]} onDragEnd={setAnchor} >
          <div
            className="w-12 h-12 bg-rose-400 grid place-items-center rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16" aria-hidden="true"
              role="presentation" focusable="false"
              className="blcok h-5 w-5 fill-white"
            >
              <path d="m8.6 1.15.1.08 7.15 6.91-.7.72L14 7.75v6.75a.5.5 0 0 1-.41.5H10V9.5a.5.5 0 0 0-.41-.5H6.5a.5.5 0 0 0-.5.41V15H2.5a.5.5 0 0 1-.5-.41V7.75L.85 8.86l-.7-.72L7.3 1.23a1 1 0 0 1 1.3-.08z"></path></svg>
          </div>
        </Draggable>
      </Map>

    </main>
  )
}
