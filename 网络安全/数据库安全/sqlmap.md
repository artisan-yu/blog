# sqlmap

[官网地址: https://sqlmap.org/](https://sqlmap.org/)

[仓库地址: https://github.com/sqlmapproject/sqlmap](https://github.com/sqlmapproject/sqlmap)

[使用手册(英文): https://github.com/sqlmapproject/sqlmap/wiki/Usage](https://github.com/sqlmapproject/sqlmap/wiki/Usage)

## 常用参数
- `-m` 扫码文件里所有url

```
www.target1.com/vuln1.php?q=foobar
www.target2.com/vuln2.asp?id=1
www.target3.com/vuln3/id/1*
```

- `-r` 从文件加载http请求

```
POST /vuln.php HTTP/1.1
Host: www.target.com
User-Agent: Mozilla/4.0
id=1
```

- `-c` 从配置文件加载flag
- `--proxy` 使用http代理
- `--proxy-file` 使用文件里的http代理(失败自动跳下一个)
- `--delay` 每个请求间延迟(秒),默认0
- `--timeout` 连接超时等待(秒),默认30
- `--retries` 连接重试次数,默认3
- `--safe-url` 测试时经常访问的安全url(假装在正常使用业务)
- `--safe-req` 从文件加载使用安全url
- `--safe-post` 给上述连接发送post数据
- `--safe-freq` 每次测试请求后再访问一次安全连接
- `--level` 测试级别【1-5】，默认1
- `--fisk` 风险级别【1-3】，默认1，3级可能会导致数据被更新
- `--dump-all` 脱库
- `--exclude-sysdbs` 脱库时排除系统数据库
