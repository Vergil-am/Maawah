export class CreateReservationDto {
  id: number;
  from: string;
  to: string;
  roomId: number;
  userId?: number;
  totalPrice?: number;
  acceptedAt?: Date
  status: string
}
