## 守卫（Guard）

守卫是根据运行时出现的某些条件（例如权限、角色、访问控制列表等）来确定给定的请求是否由路由处理程序处理，通常称为授权

在 express 中，通常都是由中间件处理授权，诸如 token 验证 等

- 绑定守卫

  使用 UseGuards() 设置守卫的范围，多个守卫用逗号分隔

## 过滤器
## 管道
## 拦截器
## 身份验证
### Auth
### JWT

#### 对称
#### 非对称

[OAuth2认证和jwt机制](https://www.cnblogs.com/alan6/p/12335416.html)

## 数据表创建

```sql
use nest_app;

create table company(
	id int primary key auto_increment,
  name varchar(64)
);
```

```sql
use nest_app;

create table employee(
  id int primary key auto_increment,
  name varchar(64) comment '姓名',
  age int comment '年龄',
  address varchar(255) comment '家庭住址',
  company_id int,
  foreign key (company_id) references Company(id)
);
```

## Typeorm

### 主键
### 外键
### 关联关系

#### 一对一关系
#### 一对多关系
#### 多对多关系

### JoinTable & JoinColumn

### 内连接

内连接表示使用比较运算符根据每个表共有的列的值匹配两张表的行。

内连接，也称为普通连接，也就是普通的查询，只会输出满足条件的数据元祖

外连接则是以制定表为连接主体，将主体表中部门组连接条件的数据都会输出，不匹配的以null填充

例如：

```SQL
SELECT * from `a` INNER JOIN b on a.aid =  b.bid;
```

结果：

![](https://img-blog.csdn.net/20181002112707702?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjM5NDYxNQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
### 左外连接

以左表为基础，根据给出两表的条件将两张表连接起来。结果将会将左表所有的查询信息列出，而右表只列出与左表满足的部分

例如：

```SQL
SELECT * from `a` LEFT JOIN b on ano =  bno;
```

结果：将A表的记录都查询出来，B表中的bno等于ano的都查询出来对应左表ano对应的信息

![](https://img-blog.csdn.net/2018091020522559?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjM5NDYxNQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 右外连接

右连接表示以右表为基础，根据给出的两表的条件将两张表连接起来。与左连接相反，右连接结果将会将右表所有的查询信
息列出，而左表只列出与右表满足的部分

例如:

```SQL
SELECT * from `a` RIGHT JOIN b on a.aid =  b.bid;
```

结果：a表只显示和b表id相等的2行数据，b表的记录全部显示出来

![](https://img-blog.csdn.net/20181002112131428?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjM5NDYxNQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

查询示例：

```js
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

    return {
      list,
      total,
    };
  }
}
```

### 事务

- 删除

```js
  async delete({ id }): Promise<string> {
    const company = await this.companyRepository.findOne({ id });
    if (!company) {
      return '项不存在，删除失败';
    }

    // 事务：级联删除
    return getManager()
      .transaction(async (transactionalEntityManager) => {
        // softRemove 不生效
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
```

## 管道、DTO校验入参

## 参考文章

https://www.jianshu.com/p/d5afbe68d37f