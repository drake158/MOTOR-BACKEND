import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "../constants/jws.constant";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
   
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException(); // No token provided
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
            {
                secret: JWT_SECRET
            });
            request['user'] = payload; // Attach user info to request
        } catch {
            throw new UnauthorizedException('Invalid token'); // Token verification failed
        }

        return true; 
    }

    private extractTokenFromHeader(request: Request): string | undefined { 
        const [type, token] = request.headers.authorization?.split(' ') || [];
        return type === 'Bearer' ? token : undefined;
    }
}