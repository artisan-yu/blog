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