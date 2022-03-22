# 用docker快速搭建dvwa靶场

> 日期：2022/02/05

- 搜索dvwa镜像

```bash
docker search dvwa
```

```bash
NAME                                 DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
citizenstig/dvwa                     Docker container for Damn Vulnerable Web App…   68                   [OK]
infoslack/dvwa                                                                       11                   [OK]
sagikazarmark/dvwa                   DVWA (Damn Vulnerable Web Application) Docke…   9                    [OK]
garland/dvwa                         Damn Vulnerable Web Application in a Docker …   7                    [OK]
```

- 拉取stars数最多的镜像

```bash
docker pull citizenstig/dvwa
```

- 基于镜像创建并启动一个容器

```bash
# -d:以守护进程运行; --name:容器别名; -p:端口映射(宿主机:容器)
docker run -d --name dvwa -p 1080:80 -p 13306:3306 citizenstig/dvwa
```

- 浏览器访问靶场http://127.0.0.1:1080

> 网站用户名密码分别是 `admin` 和 `password`
> 
> 如果找不到默认密码，可以搜索引擎搜索`citizenstig/dvwa`
> 
> 或者访问Docker Hub [hub.docker.com](https://hub.docker.com/search?q=citizenstig%2Fdvwa&type=image) 查看官方说明 

