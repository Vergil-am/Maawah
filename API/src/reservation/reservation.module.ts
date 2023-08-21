import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from 'src/prisma.service';
import { ResendService } from 'src/resend.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, PrismaService, ResendService]
})
export class ReservationModule { }
