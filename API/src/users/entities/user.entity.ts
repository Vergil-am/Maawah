import { Room } from "src/rooms/entities/room.entity";

export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  rooms: Room[]
}
