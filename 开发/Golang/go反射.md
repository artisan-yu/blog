# go反射


## 定义本次实验样板
```golang
type User stryct {
    ID int64
    Name string
    CreatedAt time.Time
}
func (_this *User) getInfo(id uint64){

}
```

## 获取结构体的反射实例

```
ref := reflect.ValueOf(User{})
```
这里的ValueOf()只能传值，传指针使用时引发panic

`panic: reflect: call of reflect.Value.XXX on ptr Value`
