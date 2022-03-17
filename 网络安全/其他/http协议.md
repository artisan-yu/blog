# http协议

### 首行

请求方式 资源路径 http版本

```http request
GET /path HTTP/1.1
```

### 目标主机地址

```http request
Host: www.xxx.com
```

```http request
Host: 127.0.0.1
```
### Cookie

```http request
Cookie: PHPSESSID=me5au7aprsa3eb91v2iq17b627; extend_contents_views=383
```

### 是否请求保持长连接

```http request
Connection: close
```

### http缓存控制

- max-age>0:直接从浏览器缓存中提取数据发生到server
- max-age<=0:向server确认资源是否有更新，有更新则返回200，没有则返回304
- no-cache:强制直接发生给server，不经过本地缓存版本检验

```http request
Cache-Control: max-age=0
```


### 升级不安全请求，以后发请求不用http，用https

```http request
Upgrade-Insecure-Requests: 1
```

### 用户访问工具

- 告诉server访问者使用什么浏览器请求


```http request
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36
```

### 浏览器想接受的响应格式

- text/html：html格式
- text/plain：纯文本格式
- text/xml：xml格式
- image/gif:图片
- ...

```http request
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
```

### 浏览器表明能接受压缩的格式

Accept-Encoding: gzip, deflate


### 浏览器支持的语言类型

```
Accept-Language: zh-CN,zh-TW;q=0.9,zh;q=0.8,zh-HK;q=0.7
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://www.baidu.com/link?url=Xbuq6cf4-cYx1XCmzhS14u4ByXQL7cxBqVRqs6MAXc8edd4XkUAjIpGpz_VfJ_1a&wd=&eqid=e9b38f1b0005241c00000006620de3b1
```
