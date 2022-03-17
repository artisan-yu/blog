# js实现sleep睡眠函数

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
