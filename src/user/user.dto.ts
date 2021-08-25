import { IsNotEmpty, Length } from 'class-validator';

// DTO 数据传输对象模式，用作数据校验
export class userDTO {
  @IsNotEmpty({ message: '用户名称不能为空' })
  public readonly username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  // @Length(18, 18, { message: '身份证号码长度不合法，必须是18位' })
  public readonly password: string;
}
