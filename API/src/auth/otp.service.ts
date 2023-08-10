import { Injectable } from "@nestjs/common";
import { totp } from "otplib";

totp.options = {
  step: 900
}
@Injectable()
export class OTPservice {
  GenerateOTP() {
    return totp.generate(process.env.OTP_SECRET)
  }

  VerifyOTP(token: string) {
    return totp.verify({ token: token, secret: process.env.OTP_SECRET })
  }
}
