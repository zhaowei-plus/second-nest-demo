import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '@/user/user.interface';
import { Token } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(AuthGuard('local'))
  // @UseGuards(AuthGuard('local')) 守卫将从body中提取 username、password，
  // 然后调用 LocalStrategy 中的 validate方法，若认证成功通过，则将 User 信息赋值给 request.user
  @Post('login')
  async login(@Request() request): Promise<User> {
    return request.user;
  }

  // @UseGuards(AuthGuard('local'))
  @Post('jwtLogin')
  async jwtLogin(@Body() user): Promise<Token> {
    console.log('body:', user)
    return this.authService.jwtLogin(user);
  }
}
