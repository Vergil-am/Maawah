import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from "argon2"
import { ResendService } from 'src/resend.service';
import { Emails } from 'resend/build/src/emails/emails';
import { CreateEmailOptions } from 'resend/build/src/emails/interfaces';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private resend: ResendService,
    private jwtService: JwtService,
    private users: UsersService
  ) { }

  async Signup(CreateUserDto: CreateUserDto) {
    CreateUserDto.password = await argon2.hash(CreateUserDto.password)
    return await this.users.create(CreateUserDto)
  }

  async sendEmail(EmailOptions: CreateEmailOptions) {
    try {
      const data = await this.resend.emails.send(EmailOptions);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async Signin(email: string, password: string) {
    const user = await this.FindUserByEmail(email)
    if (user && await argon2.verify(user.password, password)) {
      const { password, ...result } = user;
      return result
    }
    throw new UnauthorizedException('wrong email or password')
  }

  async FindUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email }
    })

  }


  async ChangePassword(UpdateUserDto: UpdateUserDto) {
    UpdateUserDto.password = await argon2.hash(UpdateUserDto.password)
    const user = await this.users.update(UpdateUserDto)
    return user

  }

  //This function generates an access_token valid for 15min
  async GenerateJWT(payload) {
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    }
  }

  // This function generates a refresh_token that doesnt expire
  async GenerateRefreshToken(payload) {
    return {
      refresh_token: this.jwtService.sign(payload)
    }
  }
  VerifyEmailConfirmationToken(token: string) {
    return this.jwtService.verify(token)
  }

  //Check Refresh Token
  async ValidateRefreshToken(refresh_token: string) {
    const token = this.jwtService.verify(refresh_token);
    console.log(token)
    const payload = { email: token.email, sub: token.sub }
    return this.GenerateJWT(payload)
  }

}
