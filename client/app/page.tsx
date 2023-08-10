import axios from "axios";
import room from "@/interfaces/room";
import RoomCard from "@/components/card";
import CategoryList from "@/components/CategoryList";
import AddToWishlistButton from "@/components/AddToWishlistButton";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let query;
  if (searchParams) {
    const queryString = Object.keys(searchParams)
      .map((key) => {
        const paramValue = searchParams[key];
        if (paramValue !== undefined) {
          if (Array.isArray(paramValue)) {
            return paramValue
              .map((value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
              .join("&");
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(paramValue)}`;
        }
        return "";
      })
      .filter(Boolean)
      .join("&");
    query = queryString;
  }
  const res = await axios.get(`http://localhost:5000/rooms?${query}`);
  const Rooms = res.data;
  if (!Rooms) {
    return (
      <main className="flex flex-wrap justify-center">
        <p>No rooms were found</p>
      </main>
    );
  }
  return (
    <main className="flex flex-wrap justify-start mx-2">
      <CategoryList />
      {Rooms.map((room: room) => {
        return <RoomCard props={room} key={room.id} />;
      })}
    </main>
  );
}
