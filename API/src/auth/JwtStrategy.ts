import { Injectable } from "@nestjs/common/decorators";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //Extracts the access_token from the cookie
      jwtFromRequest: (req: any) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['access_token'];
        }
        if (token) {
          return token.access_token;
        }
      },
      ingnoreExpiration: false,
      secretOrKey: 'KLt2bX1aUIGqVFv5luavkFKoniVjfTLI',
    })

  }
  // This validates the Token
  async validate(payload: any) {
    return { UserId: payload.sub, username: payload.email };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
