import {
  IsNotEmpty,
  Min,
  Max,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

// DTO 数据传输对象模式，用作数据校验
export class EmployeeDTO {
  public readonly id: number;

  @IsNotEmpty({ message: '名称不能为空' })
  public readonly name: string;

  @IsNotEmpty({ message: '身份证号码不能为空' })
  @Length(18, 18, { message: '身份证号码长度不合法，必须是18位' })
  public readonly idCard: string;

  @IsNotEmpty({ message: '手机号码不能为空' })
  @Length(11, 11, { message: '身份证号码长度不合法，必须是18位' })
  public readonly mobile: string;

  @IsNumber()
  public readonly age: number;

  @IsString()
  public readonly address: string;

  // @IsString()
  public readonly createTime: string;

  // @IsString()
  public readonly updatedTime: string;

  // @IsString()
  public readonly deletedTime: string;
}
