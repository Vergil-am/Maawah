import { Room } from "src/rooms/entities/room.entity";

export class CreateUserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  type: string;
  rooms: Room[]
}
