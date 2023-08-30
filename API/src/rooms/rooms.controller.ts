import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createRoomDto: CreateRoomDto
  ) {
    createRoomDto.ownerId = req.user.UserId
    // console.log(createRoomDto)
    return await this.roomsService.create(createRoomDto)
    // I need to set UnavailableDates

  }



  @Get()
  findAll(
    @Query() queries
  ) {
    return this.roomsService.findAll(queries);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }


}
