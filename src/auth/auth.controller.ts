import { Body, Controller, Post, Request } from '@nestjs/common';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private plazeruserservice: PlazeruserService,
    private authservice: AuthService,
  ) {}

  @Post('/login')
  getProfile(@Request() req) {
    return this.authservice.login(req.body);
  }
}
