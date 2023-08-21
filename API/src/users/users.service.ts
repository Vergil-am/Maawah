import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto
    })

    return user


  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        type: true
      }
    })
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({

      where: {
        id: id
      },
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
        Rooms: true
      }
    })

    return user;
  }
  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email }
    })

  }

  update(id: number, updateUserDto: UpdateUserDto) {

    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto
    })
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: {
        id: id
      }
    })
    return `account succesfully deleted`;
  }
}
