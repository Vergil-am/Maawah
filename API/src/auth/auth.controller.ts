import { Controller, Post, Body, Request, Res, Put, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResendService } from 'src/resend.service';
import { totp } from 'otplib';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly Resend: ResendService
  ) { }

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
  async ResetPassword(@Body('email') email: string) {
    //TODO: fix this temporary
    const user = await this.authService.FindUserByEmail(email)
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND)
    }
    totp.options = {
      step: 900
    }
    const OTP = totp.generate(process.env.OTP_SECRET)
    console.log(OTP)
    this.Resend.emails.send({
      from: process.env.RESEND_EMAIL,
      to: [email],
      subject: "reset your password",
      html: `This is your password reset one time code: <strong>${OTP}</strong>`
    })
    return { userId: user.id }
  }

  @Put("new-password")
  async newPassword(@Body() body) {
    const { userId, password, code } = body
    const isValid = totp.verify({ token: code, secret: process.env.OTP_SECRET })
    console.log(isValid)
    if (!isValid) {
      throw new HttpException('code expired', HttpStatus.UNAUTHORIZED)
    }
    return this.authService.ChangePassword(userId, password)
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
    const { access_token } = await this.authService.GenerateJWT({ email: email })
    const user = await this.authService.FindUserByEmail(email)
    if (user) {
      return true
    }
    return false

    // this.authService.sendEmail([email], "confirm your email", access_token)
  }

  @Post('confirm')
  async ConfirmEmail(@Query('token') token: string) {
    //TODO: there is more work to do here
    const validation = await this.authService.VerifyEmailConfirmationToken(token)
    console.log(validation)

  }

  @Post("email")
  Email() {

  }


}
