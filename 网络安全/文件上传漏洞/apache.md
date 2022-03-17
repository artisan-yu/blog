# apache

## 后缀解析漏洞

Apache从右往左判断后缀名，当Apache无法识别后缀名时，则往左跳下一个，可借助abcde绕过检测`shell.php.abcde`


