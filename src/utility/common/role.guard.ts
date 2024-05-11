import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private plazeruserservise:PlazeruserService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();
      const userRoles = await this.plazeruserservise.getuserroleByUserName(user.username);
      return requiredRoles.some((role) => userRoles?.includes(role));
 
    }
  }
}
