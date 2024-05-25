import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<String[]>('roles', context.getHandler());
    if (!role) {
      console.log(role)
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return role.some((role) => user.role?.includes(role));
  }
}