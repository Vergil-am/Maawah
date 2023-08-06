import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class ResendService extends Resend {
  constructor() {
    super(process.env.RESND_API_KEY)
  }


}

