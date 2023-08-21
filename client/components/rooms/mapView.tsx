"use client";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

type props = {
  lat: number,
  lon: number
}
export default function MapsView({ lon, lat }: props) {
  return (
    <div className="m-2 rounded-xl lg:w-3/5">
      <Map
        provider={osm}
        height={400}
        defaultCenter={[lat, lon]}
        zoom={11}>
        <Marker
          width={30}
          anchor={[lat, lon]}
        />
      </Map>

    </div>);
}
