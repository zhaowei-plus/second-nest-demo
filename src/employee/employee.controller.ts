import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeDTO } from './employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('detail')
  // Param 是url中的参数 findOne/:name -> findOne/张三
  // Query 是拼装在 url 后面的参数，使用 ? 连接
  async detail(@Query() query): Promise<Employee> {
    console.log('query:', query);
    return this.employeeService.detail(query.name);
  }

  @Post('add')
  async add(@Body() employeeDto: EmployeeDTO): Promise<string> {
    return this.employeeService.add(employeeDto);
  }

  @Put('update')
  async update(@Body() employee): Promise<string> {
    return this.employeeService.update(employee);
  }

  @Delete('delete')
  async delete(@Query() query): Promise<string> {
    return this.employeeService.delete(query);
  }

  @Get('list')
  async list(@Query() query): Promise<any> {
    console.log('list query:', query);
    return this.employeeService.list(query);
  }
}
