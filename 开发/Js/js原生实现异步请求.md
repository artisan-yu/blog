# js原生实现异步请求

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
