import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.interface';
import { LoggingInterceptor } from '@/interceptor/logging.interceptor';

@Controller('user')
@UseInterceptors(LoggingInterceptor) // 使用拦截器处理特定模块
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @UseGuards(AuthGuard('jwt'))
  // 添加 jwt 认证守卫
  @Get('list')
  async list(): Promise<User[]> {
    console.log('user list');
    return this.userService.list();
  }

  @Get('find')
  async find(@Query() query): Promise<User | any> {
    return this.userService.find(query.username);
  }
}
