import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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
  findOneByEmail(email) {
    return `This action returns a #${email} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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
