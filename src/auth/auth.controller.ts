import { Body, Controller, Post } from '@nestjs/common';
import { promises } from 'fs';
import { userSignInDto } from 'src/plazeruser/dto/user-signin.dto';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private plazeruserservice:PlazeruserService,
    private authservice:AuthService){}



    
}
