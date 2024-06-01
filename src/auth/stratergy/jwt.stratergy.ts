import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstants } from "../auth.constant";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

    constructor(
    ) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        ignoreExpiration: false, 
        secretOrKey: authConstants.secret, 
        });
        }
        

        async validate(payload: any) {
           console.log('validate',payload)
            return { username: payload.username,}
        }
}