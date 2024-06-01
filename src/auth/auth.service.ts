import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userSignInDto } from 'src/auth/dto/user-signin.dto';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';

@Injectable()
export class AuthService {
  constructor(
    private plazeruserservice: PlazeruserService,
    private jwtservice: JwtService,
  ) {}

  //login route
  async login(usersignindto: userSignInDto): Promise<{ accesstoken: string }> {
    const { username, password } = usersignindto;
    const user = await this.plazeruserservice.findUserByUserName(username);
    console.log();
    
    console.log(usersignindto);
    if (!user) {
      throw new UnauthorizedException('invalid username');
    }
    if (!password === user.password) {

      
      throw new UnauthorizedException('invalid username or password');
    }
    const accesstoken = this.jwtservice.sign({
      sub: user.userid,
      username: user.username,
      role:user.role
    });
    return { accesstoken };
  }

  async validateUser(username: string): Promise<any> {
    const user = await this.plazeruserservice.findUserByUserName(username);
    if (user) {
      return user.username;
    }

    return null;
  }
}
