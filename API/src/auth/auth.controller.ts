import { Controller, Post, Body, Request, Res, Put, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResendService } from 'src/resend.service';
import { OTPservice } from './otp.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password-dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private Resend: ResendService,
    private readonly OTP: OTPservice,
    private users: UsersService
  ) { }

  @Post("signup")
  Signup(@Body() CreateUserDto: CreateUserDto) {
    try {
      return this.authService.Signup(CreateUserDto);
    } catch (error) {
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


  @UseGuards(AuthGuard('local'))
  @Post("signin")
  async Signin(@Request() req: any, @Res() res: any) {
    const payload = { email: req.user.email, sub: req.user.id };
    const access_token = await this.authService.GenerateJWT(payload);
    const refresh_token = await this.authService.GenerateRefreshToken(payload)
    res.cookie('access_token', access_token, {
      sameSite: 'None',
      secure: true
    })
    res.cookie('refresh_token', refresh_token, {
      sameSite: 'None',
      secure: true
    })
    return res.json(req.user);
  }


  @Put("reset-password")
  async ResetPassword(@Body('email') email: string) {
    const user = await this.users.findOneByEmail(email)
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }

    const OTP = this.OTP.GenerateOTP()
    this.Resend.sendResetPasswordEmail(email, OTP)
    return { userId: user.id }
  }

  @Put("new-password")
  async newPassword(@Body() ChangePasswordDto: ChangePasswordDto) {
    //WARN: idk there might be an error here have to test it
    const isValid = this.OTP.VerifyOTP(ChangePasswordDto.code)
    if (!isValid) {
      throw new HttpException('code expired', HttpStatus.UNAUTHORIZED)
    }
    const UpdateUserDto: UpdateUserDto = ChangePasswordDto
    return this.authService.ChangePassword(UpdateUserDto)
  }

  @Get("refresh")
  async Refresh(@Request() req, @Res() res: Response) {
    if (req.cookies && req.cookies['refresh_token']) {
      const { refresh_token } = req.cookies['refresh_token'];
      const access_token = await this.authService.ValidateRefreshToken(refresh_token)
      res.cookie('access_token', access_token)
      res.json('success')

    } else {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
    }
  }

  @Post("check")
  async Check(@Body('email') email: string) {
    const user = await this.users.findOneByEmail(email)
    if (user) {
      return true
    }
    return false

  }

  @Post('confirm-email')
  async ConfirmEmail(@Body('email') email: string) {
    //TODO: I need to validate the otp
    const user = await this.users.findOneByEmail(email)
    if (user) {
      throw new HttpException("User with this email already exists", HttpStatus.CONFLICT)
    }
    const OTP = this.OTP.GenerateOTP()
    this.Resend.sendConfirmationEmail(email, OTP)
    return "email sent successfully"
  }

}
