# nginx和IIS的cgi解析漏洞

`xxx/1.jpg/.php`会被当作一个php传给cgi处理



修复方案



将php.ini `cgi.fix_pathinfo`设置为`0`重启php-fpm即可