import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/user/entities/user.entity";
import { ROLES_KEY } from "../decorators/role-auth.decorator";

@Injectable()   
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    matchRoles(roles: string[], userRole: string){
        return roles.some(role => role === userRole);
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
        
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return requiredRoles.some((role) => user.roles?.includes(role));

    }
}