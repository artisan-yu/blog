# 使用go1.16新特性embed将vue打包进可执行文件，简化部署流程

- 示例目录结构

```
├── view
    ├── vue
    ├── view.go
├── main.go
```

- `/view/view.go`

```golang
package view

//嵌入dist目录为file system
//go:embed vue/dist
var Dist embed.FS

//嵌入index.html文件为字节数组
//go:embed vue/dist/index.html
var Index []byte
```

embed.FS的`Open(name string)`方法有个陷阱

若要访问dist下的css js目录

需要将embed注解目录完整填写进name参数中，否则将导致404

- `/main.go`

```golang
package main
import (
	"view"
	"io"
)
func main() {
    file,err := view.Dist.Open("vue/dist/js/xxx.js")
}
```


### 封装可从根目录读取文件的Open(name string)方法
```golang
package view

import (
	"embed"
	"io"
	"io/fs"
	"path"
)

type EmbedResource struct {
	Fs embed.FS
	FullPath string //embed注释里的路径/子目录
}

func (_this *EmbedResource) Open(name string) (fs.File, error) {
	fullName := path.Join(_this.FullPath, name)
	return _this.Fs.Open(fullName)
}

//嵌入./vue/dist目录
//go:embed vue/dist
var DistFs embed.FS

//dist子目录 css
var VueCss = &EmbedResource{
	Fs:       DistFs,
	FullPath: "vue/dist/css",
}
```

```golang
file,err := view.VueCss.Open("xxx.css")
```
