"use client"
import axios from "axios";
import { useAtom } from "jotai";
import { Draggable, Map, ZoomControl } from "pigeon-maps"
import { maptiler } from "pigeon-maps/providers";
import { useState } from "react";
import { CreateListingAtom } from "./footer";

const ApiKey = 'A87e1nbSlZntcjt20YZw'
export default function Location() {
  const [anchor, setAnchor] = useState<number[]>([36.328, 2.609]);
  const [Listing, setListing] = useAtom(CreateListingAtom)

  async function SetLocation(latLng: number[]) {
    setAnchor(latLng)
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latLng[0]}&lon=${latLng[1]}&format=json&accept-language=fr`)
      setListing({
        ...Listing,
        address: res.data.display_name,
        lat: latLng[0],
        lon: latLng[1]
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <Map height={500} width={500}
        provider={maptiler(ApiKey, 'streets')}
        zoom={6}
        center={[36.328, 2.609]}
        onClick={async (e) => SetLocation(e.latLng)}
      >
        <ZoomControl />
        <Draggable offset={[6, 6]} anchor={[anchor[0], anchor[1]]} onDragEnd={SetLocation} >
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

    </div>
  )
}
