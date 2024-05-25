// src/auth/jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { authConstants } from '../auth.constant';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, { secret: authConstants });
      req.user = { userId: decoded.sub, username: decoded.username };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
