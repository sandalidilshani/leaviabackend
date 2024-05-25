import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userSignInDto } from 'src/plazeruser/dto/user-signin.dto';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';

@Injectable()
export class AuthService {
  constructor(
    private plazeruserservice: PlazeruserService,
    private jwtservice: JwtService,
  ) {}

 

  async login(usersignindto:userSignInDto): Promise<{ accesstoken: string }> {
   const {username,upassword}=usersignindto;
   const user= await this.plazeruserservice.findUserByUserName(username)
   if (!user){
    throw new UnauthorizedException('invalid username')
   }
   if(!(upassword==user.upassword)){
      throw new UnauthorizedException('invalid username or password')
   }
   const accesstoken=this.jwtservice.sign({userid:user.userid,username:user.username})
   return {accesstoken}
}

async validateUser(username: string): Promise<any> {
  const user = await this.plazeruserservice.findUserByUserName(username);
  if (user) {
    
    return user.username;
  }
  
  return null
}
}
