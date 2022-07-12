import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      //беру из своего кастомного декоратора параметр роли @Roles('ADMINI')
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles[0]) {
        //если ролей нет то
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Barer' && !token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      //some = если у пользователя такая роль которая необходима для этого эндпоинта в роляхи если есть функция some вернет true и доступ будет разрешен
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (error) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
