import { User } from "src/users/entities/user.entity";

export class Room {
  id: number;
  title: string;
  thumbnail: string;
  images: { title: string, image: string }[]
  location: { lon: number, lat: number, adress: string }
  description: string;
  amenities: String[]
  type: string;
  ownerId: number;
  owner: User
}
