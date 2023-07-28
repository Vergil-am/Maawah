import { Strategy } from "passport-local"
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from "./auth.service"


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // local Strategy expects username and password by default 
    // customize with overriding with super
    super({ usernameField: "email" });
  }
  async validate(email: string, password: string) {
    const user = await this.authService.Signin(email, password)
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "user dosen't exist"
      }, HttpStatus.NOT_FOUND)
    }
    return user
  }
}
