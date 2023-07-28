import { CreateRoomDto } from "./create-room.dto";

export class RoomWithDatesDto extends CreateRoomDto {
  UnavailableDates: {from: string , to: string }[]
}
