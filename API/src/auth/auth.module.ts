import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './LocalLoginStrategy';
import { JwtStrategy } from './JwtStrategy';
import { ResendService } from 'src/resend.service';
import { OTPservice } from './otp.service';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      //TODO: this should be changed to a more secure key
      secret: 'KLt2bX1aUIGqVFv5luavkFKoniVjfTLI',
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, LocalStrategy, JwtStrategy, ResendService, OTPservice]
})
export class AuthModule { }
