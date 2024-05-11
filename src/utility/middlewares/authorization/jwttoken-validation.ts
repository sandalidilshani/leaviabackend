import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class AuthoriznMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        const token=req.headers.authorization
    }

}