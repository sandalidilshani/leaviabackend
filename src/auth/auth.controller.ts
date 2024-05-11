import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';
import { userSignInDto } from 'src/plazeruser/dto/user-signin.dto';
import { CreatePlazeruserDto } from 'src/plazeruser/dto/create-plazeruser.dto';
import { refreshGuard } from './guard/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private plazeruerserivece:PlazeruserService
  ) {}

  @Post('register')
  async registerUser(@Body()createplazeruserdto:CreatePlazeruserDto){
    return await this.plazeruerserivece.create(createplazeruserdto)

  }

  @Post('login')
  async signIn(@Body() usersignInDto:userSignInDto) {
    return await this.authService.signIn(usersignInDto);
 
}
@UseGuards(refreshGuard)
@Post('refresh')
async refreshToken(@Request() req){
  return await this.authService.refershToken(req.user);
}

}
