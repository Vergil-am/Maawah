import { Controller, Post, Body, Request, Res, Put, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  Signup(@Body() SignupDto: SignupDto) {
    return this.authService.Signup(SignupDto);
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
  async ResetPassword() {
    return this.authService.ResetPassword()
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
    console.log(email)
    const user = await this.authService.FindUserByEmail(email)
    return user ? true : false
  }

  @Post("email")
  Email() {
    const email = ["olamine336@gmail.com"]
    const subject = "testing"
    return this.authService.sendEmail(email, subject)
  }


}
