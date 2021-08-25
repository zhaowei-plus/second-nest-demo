/** 使用Local Strategy用户认证守卫完成了用户登录功能 */

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@/user/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly autoService: AuthService) {
    super();
    this.autoService = autoService;
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.autoService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException('incorrect username or password');
    }
    return user;
  }
}
