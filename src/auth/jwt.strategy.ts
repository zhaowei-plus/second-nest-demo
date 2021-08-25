/** 使用JWT Strategy（策略）用户认证守卫完成了用户登录功能 */

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@/user/user.interface';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 获取请求头 header token 值
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    // payload: jwt-passport 认证 jwt 通过后解码的结果
    return { username: payload.username, id: payload.sub };
  }
}
