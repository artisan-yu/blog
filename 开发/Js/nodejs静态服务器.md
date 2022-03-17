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