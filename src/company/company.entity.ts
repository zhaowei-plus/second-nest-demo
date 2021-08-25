import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Employee } from '@/employee/employee.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  // OneToMany 用于主表，总是反向的，并且总是和 ManyToOne 一起出现
  // Company -> Employee 一对多
  // (employee) => employee.company 这里将会在 Employee 类中创建 company 属性
  @OneToMany((type) => Employee, (employee) => employee.company, {
    cascade: true, // 用于级联删除保存操作，注：级联删除和级联保存仅在 save() 时生效
  })
  employees: Employee[];
}
