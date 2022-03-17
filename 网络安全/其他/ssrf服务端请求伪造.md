# ssrf服务端请求伪造

## 简介
不同于csrf客户端请求伪造，ssrf（server side request forgery）
服务端请求伪造是利用目标服务器发起请求，可用于攻击跳板、内网探测

## 出现场景

可以自定义任意url的地方，如在线网页翻译、在线分享等等
示例站点：
- [yeekit网页翻译](http://web.yeekit.com/yeekit_translate_url/content.html)
- [有道翻译](http://fanyi.youdao.com)

如果抓包发现有存放url的参数，或者填写`action=refleashCode.php`之类的参数，就有可能存在ssrf漏洞

## 利用

### 内网地址总共有：
- 192.168.0.0/16
- 10.0.0.0/8
- 172.16.0.0/16

### 常用协议（最好都试一遍）：

- 探测网站`http://127.0.0.1:8080`
- 探测部分内网（服务/网站）是否存在`dict://127.0.0.1:3306`
- 文件协议`file://C:/xxx/xxx`
- 直接使用tcp`gopher://127.0.0.1:6379/  tcp包  `注意手动添加%0d%0a回车换行(常用于redis未授权访问写入文件)

利用上面总结的特点，跑包～


## 靶场（php）

```php
<?php
$url = $_GET['url'];
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_exec($ch);
curl_close($ch);
```

监听80端口
`php -S 0.0.0.0:80 ./`

浏览器访问`http://127.0.0.1:80?url=dict://192.168.x.x:3306`

