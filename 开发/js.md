# nodejs简单静态文件服务器

```js
var http = require('http')
var fs = require('fs')
var path = require('path')
var mime = require('./mime')
var rootPath = path.join(__dirname,'../../blog')
var server = new http.createServer( (request, response) => {
    let url = decodeURIComponent(request.url)
    fs.readFile(path.join(rootPath, url), (err, data) => {
        let output = err?(""+err):data
        let code = err?500:200
        let type = mime[path.extname(url)]
        response.writeHead(code, { 'Content-Type': `${type}; charset=utf-8` })
        response.write(output)
        response.end()
    })
})
// 0使用随机端口号
server.listen(0,()=>{
    console.log('server is running on http://127.0.0.1:' + server.address().port)
})
```

> [mime.json文件](/其他/mime.json.md)

# 原生js实现异步请求

> 日期: 2022/03/05

原生实现比较啰嗦，一般使用axios库或根据使用习惯封装。

```js
//创建ajax实例
let xhr = new XMLHttpRequest()
//设置请求方法与请求路径
xhr.open("post", "http://127.0.0.1/test")
//请求头指定表单类型为form
xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
//请求参数
xhr.send("field1=xxx&field2=xxxxxx")
//绑定事件处理
xhr.onreadystatechange = () => {
    /**
     * xhr.readyState状态码对照
     * 0:未初始化，尚未调用open()方法
     * 1:启动，调用open()方法，已调用send()的方法，正在发送请求
     * 2:发送，已经调用send()方法，已接受到响应
     * 3:解析 正在解析响应数据
     * 4:完成，响应数据解析完成，客户端可以调用;（我们都是使用xhr.readyState == 4 判断ajax请求是否结束）
     */
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText)
    }
}
```


# 实现sleep睡眠函数

```js
function sleep (millisecond){
    let exitTime = (new Date()).getTime() + millisecond
    while ((new Date).getTime() <= exitTime) {}
    return
}
```

- 测试

```js
sleep(1000*8);console.log('done');
```

# 递归实现深拷贝

```js
function deepClone(target) {
    let result;
    if (typeof target === 'object') {
        result = Array.isArray(target)?[]:{};
        for (let i in target) {
            result[i] = deepClone(target[i]);
        }
    } else {
        result = target;
    }
    return result;
}
```

# 获取当前网址信息

> 日期: 2022/01/28

### 获取完整URL
```js
window.location.href
```
> https://note.duokan.xyz/#/test

### 获取文件路径
```js
window.location.pathname
```
> /

### 获取协议
```js
window.location.protocol
```
> http:

### 获取主机地址和端口号
```js
window.location.host
```
> http://127.0.0.1:80

### 获取主机地址
```js
window.location.hostname
```
> note.duokan.xyz

### 获取端口号
```js
window.location.port
```
> 80

### 获取锚点
```js
window.location.hash
```
> \#/前端/JS/获取当前网址信息

### 获取域名
```js
document.domain
```
> note.duokan.xyz





