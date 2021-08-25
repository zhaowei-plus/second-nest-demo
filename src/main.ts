import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局注册错误的过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 开启一个全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
