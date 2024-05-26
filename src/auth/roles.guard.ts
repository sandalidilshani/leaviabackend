import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { PlazeruserService } from 'src/plazeruser/plazeruser.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private plazeruserservice:PlazeruserService
  ) {}





  async getuserrole(username:string):Promise<any>{
    const userRole=await this.plazeruserservice.getuserroleByUserName(username)
    if(userRole==='admin'){
      return 'admin'
    }else{
      return 'user'
    }
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiedrole = this.reflector.get<String[]>('role', context.getHandler());
    if (!requiedrole) {
      console.log(requiedrole)
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user.username;
    const userrole=await this.getuserrole(user)
    return userrole ===requiedrole;
  }
}