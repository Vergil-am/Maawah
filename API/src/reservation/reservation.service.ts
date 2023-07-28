import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) { }
  async create(createReservationDto: CreateReservationDto) {
    const reservation = await this.prisma.reservation.create({
      data: {
        from: new Date(createReservationDto.from.split('T')[0]),
        to: new Date(createReservationDto.to.split('T')[0]),
        roomId: createReservationDto.roomId,
        userId: createReservationDto.userId,
      }

    })
    return reservation;
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
