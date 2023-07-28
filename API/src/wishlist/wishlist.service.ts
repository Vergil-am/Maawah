import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) { }
  async create(createWishlistDto: CreateWishlistDto) {
    const wishlist = await this.prisma.wishlist.create({
      data: createWishlistDto
    })
    return wishlist;
  }

  async findAll(userId: number) {
    const wishlist = await this.prisma.wishlist.findMany({
      where: { userId: userId },
      include: { room: true }
    })
    return wishlist;
  }


  async remove(id: number) {
    const wishlist = await this.prisma.wishlist.delete({
      where: { id: id },
      include: { room: true }
    })
    return `${wishlist.room.title} has been removed from wishlist`;
  }
}
