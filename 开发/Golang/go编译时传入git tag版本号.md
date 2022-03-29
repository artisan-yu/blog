# go编译时传入git tag版本号

### 简介

golang编译时可使用`ldflags`动态地为代码变量赋值。

利用这个特性，可以将`git tag`作为版本号一起编译进程序里

### 开始

- 示例代码
```golang
package main

import "fmt"

var GitTag string

func main (){
    fmt.Println("当前版本：", GitTag)
}
```

### 编译命令

> 获取最后一个提交的tag编号：`git describe --abbrev=0 --tags` 

- linux、mac
```bash
go build -ldflags "-X 'main.GitTag=$(git describe --abbrev=0 --tags)'" ./main.go
```
