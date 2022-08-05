# 编译静态文件优化搜索排名-docsify编译工具

> [docsify官网](https://docsify.js.org/#/zh-cn/)
>
> [docsify简易入门](https://blog.duokan.xyz/docsify文档网站生成器/快速上手)
>
> [工具源码仓库](https://github.com/ayu-666/docsify-build)

将docsify文档每个页面编译成独立的html文件

## 安装

```bash
npm i docsify-build -g
```

or

```bash
yarn global add docsify-build
```

## 使用

```bash
docsify-build -d ./docs -o ./dist
```

## 参数列表

```
--o 输出路径 默认 ./dist
--d 文档路径 默认 ./
--t html模版路径
--c 配置文件路径
```

## 配置文件示例

```js
module.exports =  {
    name: 'name',
    repo: 'github/repository',
    routerMode: 'history',
    loadSidebar: true,
    auto2top: true
}
```
## 模版示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="https://docsify.js.org/_media/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/docsify/themes/vue.css">
    <link rel="stylesheet" href="https://unpkg.com/docsify-toc@1.0.0/dist/toc.css">
</head>
<body>
<!--inject-app-->
<!--inject-config-->
</body>
<script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code"></script>
<script src="/search.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script>
<script src="//unpkg.com/docsify-toc@1.0.0/dist/toc.js"></script>
<script src="//unpkg.com/docsify-count/dist/countable.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-bash.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-php.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
</html>
<script>
    // 让每次点击都跳转(不推荐)
    // window.history.pushState = function (a,b,c){
    //     window.location.href=c
    // }
</script>
```