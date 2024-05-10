import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';
import { JwtService } from '@nestjs/jwt';
import { userSignInDto } from 'src/plazeruser/dto/user-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private plazerusersService: PlazeruserService,
    private jwtService: JwtService,
  ) {}
  async signIn(signdto: userSignInDto): Promise<any> {
    const user = await this.validateUser(signdto);
    const payload = {
      username: user.username,
      sub: {
        userid: user.userid,
      },
    };
    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecretKey,
        }),
      },
      refreshTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
      },
    };
  }

  async validateUser(signdto: userSignInDto) {
    const user = await this.plazerusersService.findUserByUserName(
      signdto.username,
    );

    if (user && signdto.upassword === user.upassword) {
      const { upassword, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('user name or password are Not Crrrect');
  }
}
