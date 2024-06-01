import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';
import { PlazeruserModule } from 'src/plazeruser/plazeruser.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authConstants } from './auth.constant';
import { JWTStrategy } from './stratergy/jwt.stratergy';
@Module({
  imports: [
    PlazeruserModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,JWTStrategy ],
  exports: [AuthService,],
})
export class AuthModule {}