import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';
import { PlazeruserModule } from 'src/plazeruser/plazeruser.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constant';
import { JWTStrategy } from './jwt.stratergy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from './roles.guard';
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
  providers: [AuthService, JWTStrategy,LocalStrategy],
  exports: [AuthService,JWTStrategy],
})
export class AuthModule {}
