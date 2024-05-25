import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private authService: AuthService){

  }
    @Post('auth/login')
    getProfile(@Request() req){
      console.log('Request body:', req.body);
      return this.authService.login(req.body);
    
    }


}
