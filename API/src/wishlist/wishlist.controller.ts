import { Controller, Get, Request, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req
    , @Body() createWishlistDto: CreateWishlistDto) {
    createWishlistDto.userId = req.user.UserId
    return this.wishlistService.create(createWishlistDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    const userId = req.user.UserId
    return this.wishlistService.findAll(userId);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
