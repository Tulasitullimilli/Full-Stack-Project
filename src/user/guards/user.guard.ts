import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { register } from "module";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext):boolean{
        const role = this.reflector.get<string[]>('roles',context.getHandler());
        console.log('roleguars',role)
        if(!role){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('userrguard',user);  

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }
    if (!role.includes(user.role)) {
      throw new ForbiddenException(`Access denied for role: ${user.role}`);
    }
        return true;
    }
}