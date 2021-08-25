import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Company } from '@/company/company.entity';

@Entity()
// @Index() // 联合索引
export class Employee {
  @PrimaryGeneratedColumn() // 自增长主键
  id: number;

  // @Index('name-idx')
  @Column({ length: 64, comment: '姓名' })
  name: string;

  @Column({
    name: 'id_card',
    length: 18,
    comment: '身份证号',
    // nullable: true, // 是否可以为空，当时新增加的列的时候需要考虑
    // 在 QueryBuilder 中select entity 也不会出现
    // select: false,
  })
  @Index({ unique: true })
  idCard: string;

  @Column({
    length: 11,
    comment: '手机号码',
  })
  @Index({ unique: true })
  mobile: string;

  @Column({ comment: '年龄' })
  age: number;

  @Column({ length: 256, comment: '家庭住址' })
  address: string;

  @CreateDateColumn({
    name: 'created_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: string; // createdAt

  @UpdateDateColumn({
    name: 'updated_time',
    type: 'datetime',
    comment: '更新时间',
  })
  updatedTime: string; // updatedAt

  @DeleteDateColumn({
    name: 'deleted_time',
    type: 'datetime',
    comment: '删除时间',
  })
  deletedTime: string;

  // ManyToOne 用于副表，总是和 OnToMany 一起出现，使用ManyToOne的类将会存储相关对象的id，
  // 即：ManyToOne 会修改 employee表，添加新的列 d，为 Company 的外键

  // (company) => company.employee 表示会在
  @ManyToOne((type) => Company, (company) => company.employees)
  @JoinColumn() // JoinColumn // 会生成新的列
  company: Company;
}

// 多对多关系 TypeOrm 会创建中间联结表
