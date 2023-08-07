"use client";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

interface params {
  Coordinates: {
    lat: number;
    lon: number;
  };
}
export default function MapsView({ Coordinates }: params) {
  const { lon, lat } = Coordinates;
  return (
    <div className="m-2 rounded-xl lg:w-3/5">
      <Map provider={osm} height={400} defaultCenter={[lat, lon]} defaultZoom={13}>
        <Marker width={50} anchor={[lon, lat]} />
      </Map>
    </div>);
}
