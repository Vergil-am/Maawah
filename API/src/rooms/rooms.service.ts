import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma.service';
import { whereType } from './entities/where.type'
import { queriestype } from './entities/queries.type';
import { Room } from '@prisma/client';
@Injectable()
export class RoomsService {

  constructor(private prisma: PrismaService) { }
  async create(createRoomDto: CreateRoomDto) {
    try {
      const { images, features, ...data } = createRoomDto
      const room = await this.prisma.room.create({
        data: {
          ...data,
          images: { create: images },
          features: { create: features }
        }
      })
      console.log(room)
      return room;

    } catch (error) {
      console.log(error)
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "couldn't create room"
      }, HttpStatus.BAD_REQUEST)
    }

  }

  async findAll(queries: queriestype) {
    const where: whereType = {};
    let rooms: Room[]
    if (queries.from && queries.to) {
      where.NOT = {
        UnavailableDates: {
          some: {
            from: { lte: queries.to },
            to: { gte: queries.from }
          }
        }
      }
    }
    if (queries.rooms) {
      where.bedRooms = Number(queries.rooms)
    }
    if (queries.location) {
      where.address = {
        contains: queries.location
      }
    }
    rooms = await this.prisma.room.findMany({
      where,
    })
    return rooms;
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id: id },
      include: { images: true, features: true }
    })
    return room;
  }


  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
