import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  getRepository,
  EntityManager,
  Like,
  FindOperator,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Company } from '@/company/company.entity';

// https://blog.csdn.net/lxy869718069/article/details/113975416

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(employeeInfo): Promise<string> {
    console.log('add employee:', employeeInfo);
    const company = new Company();
    company.name = '中国电信';

    const employee = new Employee();
    employee.name = employeeInfo.name;
    employee.age = employeeInfo.age;
    employee.address = employeeInfo.address;
    employee.idCard = employeeInfo.idCard;
    employee.mobile = employeeInfo.mobile;
    employee.company = company;

    return this.employeeRepository
      .save(employee)
      .then(() => 'create employee ...done')
      .catch((error) => error);
  }

  async detail(name: string): Promise<Employee> {
    const employee = await await this.employeeRepository.findOne({ name });
    if (!employee) {
      throw new HttpException(
        {
          error: '用户不存在',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return employee;
  }

  async add(employeeInfo): Promise<string> {
    const company = new Company();
    company.name = employeeInfo.companyName;

    const employee = new Employee();
    employee.name = employeeInfo.name;
    employee.age = employeeInfo.age;
    employee.address = employeeInfo.address;
    employee.idCard = employeeInfo.idCard;
    employee.mobile = employeeInfo.mobile;
    employee.company = company;

    // 保存 employee 同时，也会保存 company
    await this.employeeRepository.save(employee);
    return '新增成功';
  }

  async update(employeeInfo): Promise<string> {
    // 先修改主表，在修改副表

    // const employeeInfo
    const employee = await this.employeeRepository.findOne(employeeInfo.id);
    if (!employee) {
      throw new HttpException(
        {
          error: '用户不存在',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.employeeRepository.update(employeeInfo.id, employeeInfo);
    return '更新成功';
  }

  async delete(id): Promise<string> {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new HttpException(`用户 ${id} 不存在`, 404);
    }
    await this.employeeRepository.delete(id);
    return '删除成功';
  }

  async list(params): Promise<any> {
    const { pageIndex, pageSize = 2, idCard, name, mobile, ...rest } = params;

    const where: {
      idCard?: FindOperator<string>;
      name?: FindOperator<string>;
      mobile?: FindOperator<string>;
    } = {
      ...rest,
    };

    if (idCard) {
      where.idCard = Like(`%${idCard}%`);
    }

    if (name) {
      where.name = Like(`%${name}%`); // Not('')
    }

    if (mobile) {
      where.mobile = Like(`%${mobile}%`);
    }

    const [list, total] = await this.employeeRepository.findAndCount({
      where,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      order: {
        id: 'DESC',
      },
      // 要加带有 company 的 employee， 需要在这里配置引入
      relations: ['company'],
      // 关联表
      join: {
        alias: 'employee',
        // // 左外连接：会根据 employee 中的外键 company_id 做关联查询
        leftJoin: {
          company: 'employee.company',
        },
      },
      select: ['id', 'name', 'company'], // 表示选择表的列
      // withDeleted: false, // 是否查询软删除的数据
    });

    // const [list, total] = await getRepository(Employee)
    //   .createQueryBuilder('employee')
    //   .leftJoin('employee.company', 'company')
    //   // .addOrderBy('employee.created_time', 'ASC') // 排序
    //   .skip((pageIndex - 1) * pageSize) // 跳过多少条
    //   .take(pageSize) // 取多少条数据
    //   .where(query) // 查询条件
    //   // 默认是全部都返回
    //   .select([
    //     'employee.id',
    //     'employee.name',
    //     // 'employee.idCard',
    //     'employee.mobile',
    //     'company',
    //   ]) // 选择主表的部分属性，需要的属性要一个一个列下来。。。
    //   // 默认是都不返回
    //   // .addSelect(['company']) // 选择副表的部分属性，或者隐藏的属性
    //   .getManyAndCount();

    return {
      list,
      total,
    };
  }
}
