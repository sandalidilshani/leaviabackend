import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private plazeruserservice: PlazeruserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<string[]>('roles', context.getHandler());
    console.log("required role= "+requiredRole);

    if (!requiredRole) {
      return true;
    }

    const {user}  = context.switchToHttp().getRequest();
    console.log(user.username)
    const userrole = await this.getuserrole(user.username);

  if(userrole===requiredRole[0]){
    return true
  }
  }

  async getuserrole(username: string): Promise<string> {
    const userRole = await this.plazeruserservice.getuserroleByUserName(username);
    console.log("current user role = "+userRole)
    if (userRole === 'developer') {
      return 'developer';
    } else {
      return 'user';
    }
  }
}