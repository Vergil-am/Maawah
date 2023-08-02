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
    <div>
      <Map provider={osm} height={500} defaultCenter={[lat, lon]} defaultZoom={13}>
        <Marker width={50} anchor={[lon, lat]} />
      </Map>
    </div>);
}
