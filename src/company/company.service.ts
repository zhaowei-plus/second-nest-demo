import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, EntityManager } from 'typeorm';
import { Company } from './company.entity';
import { Employee } from '@/employee/employee.entity';

// https://blog.csdn.net/lxy869718069/article/details/113975416

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async detail(id: number): Promise<Company> {
    const company = await await this.companyRepository.findOne({ id });
    if (!company) {
      throw new HttpException(
        {
          error: '公司不存在',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return company;
  }

  async list(): Promise<any> {
    const [list, total] = await this.companyRepository.findAndCount({
      order: {
        id: 'DESC',
      },
      // 当前表中的关系字段
      relations: ['employees'],
      join: {
        alias: 'company',
        leftJoin: {
          employees: 'company.employees',
        },
        // select: [],
      },
      select: ['id', 'name', 'employees'], // 表示选择表的列
      withDeleted: true,
    });

    return {
      list,
      total,
    };
  }

  async delete({ id }): Promise<string> {
    const company = await this.companyRepository.findOne({ id });
    if (!company) {
      return '项不存在，删除失败';
    }

    // 事务：级联删除
    return getManager()
      .transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.softDelete(Employee, {
          company: {
            id,
          },
        });

        await transactionalEntityManager.softDelete(Company, {
          id,
        });
      })
      .then((res) => {
        console.log(res);
        return '删除成功';
      })
      .catch((error) => {
        console.error(error);
        return '删除失败';
      });
  }
}
