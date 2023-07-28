export default interface room {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  price: string;
  type: string;
  lat: number;
  lon: number;
  address: string;
  bedRooms: number;
  unavailableDates: Date[];
}
