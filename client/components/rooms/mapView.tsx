"use client";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";

type props = {
  lat: number,
  lon: number
}


export default function MapsView({ lon, lat }: props) {
  return (
    <div className="m-2 rounded-xl lg:w-3/5">
      <Map
        provider={maptiler('A87e1nbSlZntcjt20YZw', 'streets')}
        height={400}
        defaultCenter={[lat, lon]}
        zoom={11}>

        <ZoomControl />
        <Marker
          width={30}
          anchor={[lat, lon]}
        />
      </Map>

    </div>);
}
