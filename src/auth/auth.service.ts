import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { User } from '@/user/user.interface';
import { Token } from './auth.interface';

@Injectable()
export class AuthService {
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  /**
   * 校验用户名和密码
   * @param {string} username
   * @param {string} password
   * @return {*}  {Promise<User>}
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.userService.find(username);

    // 校验密码是否正确，实际使用过加密处理
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async jwtLogin(user: User): Promise<Token> {
    console.log('user:', user);
    const { id, username } = user;
    return {
      token: this.jwtService.sign({ username, sub: id }),
    };
  }
}
