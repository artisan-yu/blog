# 使用go1.16新特性embed将vue打包进可执行文件

```go
package main

import "embed"
//go:embed asset/dist
var vue embed.FS


```


