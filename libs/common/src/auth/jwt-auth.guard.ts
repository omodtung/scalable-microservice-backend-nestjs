import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { tap, map } from 'rxjs/operators';
import { UserDto } from '../dto';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // retrieve the request object
    const request = context.switchToHttp().getRequest();
    // access to cookies from the https request

    const jwt = request.cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send<UserDto>('authenticate', { Authentication: jwt })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
      );
  }
}
