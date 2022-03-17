# js递归实现深拷贝

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
