import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { authConstants } from "./auth.constant";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authservice:AuthService
    ) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        ignoreExpiration: false, 
        secretOrKey: authConstants.secret, 
        });
        }
        

        async validate(payload: any) {
            const user = await this.authservice.validateUser(payload.username);
            if (!user) {
                throw new UnauthorizedException('Login frist to access end point');
            }
            return  payload.username ;
        }
}