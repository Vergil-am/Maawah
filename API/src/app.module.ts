import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ReservationModule } from './reservation/reservation.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), UsersModule, RoomsModule, AuthModule, WishlistModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
