import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [
    // 动态获取模块对象
    TypeOrmModule.forFeature([Company]),
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
