import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma.service';
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
        error: "couldn'nt create room"
      }, HttpStatus.BAD_REQUEST)
    }

  }

  async findAll(queries) {
    let rooms

    if (queries.rooms) {
      rooms = await this.prisma.room.findMany({
        where: {
          bedRooms: Number(queries.rooms),
          address: { contains: queries.location }
        },
        include: {
          UnavailableDates: true
        }
      })
      // I need to filter based on dates here

    }
    else {
      rooms = await this.prisma.room.findMany()
    }

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
