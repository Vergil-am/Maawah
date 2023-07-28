import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from "argon2"

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwtService: JwtService) { }

  async Signup(SignupDto: SignupDto) {
    try {
      SignupDto.password = await argon2.hash(SignupDto.password)
      const user = await this.prisma.user.create({
        data: SignupDto
      })
      return user

    } catch (error) {
      console.log()
      if (error.code == 'P2002' && error.meta.target.includes('email')) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: "user with this email already exists"
        }, HttpStatus.CONFLICT)

      } else {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: "couldn't create user"
        }, HttpStatus.BAD_REQUEST)
      }


    }


  }

  async Signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email }
    })
    if (user && await argon2.verify(user.password, password)) {
      const { password, ...result } = user;
      return result
    }
    throw new UnauthorizedException('wrong email or password')
  }


  ResetPassword() {
    return "Reset password"
  }

  //This function generates an access_token valid for 15min
  async GenerateJWT(payload) {
    console.log(payload)
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

  //Check Refresh Token
  async ValidateRefreshToken(refresh_token: string) {
    const token = this.jwtService.verify(refresh_token);
    const payload = { email: token.email, sub: token.sub }
    return this.GenerateJWT(payload)
  }

}
