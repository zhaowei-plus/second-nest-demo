// 使用拦截器统一返回的数据格式
import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

// 拦截器
// 拦截器的作用与控制器，提供程序，守卫等相同，这意味着它们可以通过构造函数注入依赖项。
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  // 每个拦截器都会有 intercept 方法
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data,
          message: '请求成功',
        };
      }),
    );
  }
}
