import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { PlazeruserModule } from 'src/plazeruser/plazeruser.module';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    PlazeruserModule,JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // Replace with your JWT secret
      signOptions: { expiresIn: '60s' }, // Optional: set the expiration time for the JWT
    }),
   
  ],
  providers: [AuthService,JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}