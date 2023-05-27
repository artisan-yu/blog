# 利用ssh开启加密代理隧道

## 修改服务端ssh配置
文件路径: `/etc/ssh/sshd_config`

```
# 禁止root账号远程登录(可选)
PermitRootLogin no

# 允许代理转发
AllowAgentForwarding yes 

# 允许tcp转发
AllowTcpForwarding yes 

# 端口访问范围为网关下所有ip
GatewayPorts yes 

# 客户端连接保持600秒
ClientAliveInterval 600 

# 客户端连接数量无限制
ClientAliveCountMax 0 
```

  

## 将本地服务转发到服务器(反向转发)


```bash
ssh -NfR 远程端口:本地ip:本地端口 用户名@服务端ip
```

- 示例：将本地rdp远程桌面3389端口转发到服务器12345端口，利用服务器的公网ip登录远程桌面

  ```bash
  ssh -NfR 12345:127.0.0.1:3389 root@ip
  ```

  > 服务端`/etc/ssh/sshd_config` GatewayPorts必须配置为`yes`，否则服务器端口只能监听在`127.0.0.1:12345`无法供外网范围


## 将服务端内网服务转发到本地(正向转发)

```bash
ssh -NfL 本地ip:本地端口:服务端内网ip:远程端口 root@ip
```

- 示例：将服务器内网mysql的3306端口临时转发到本机0.0.0.0:1234

  ```bash
  ssh -NfL 0.0.0.0:1234:127.0.0.1:3306 root@ip -p 22
  ```


## 利用服务端发起请求(动态转发、socks5)

```bash
ssh -NfD 本地ip:本地端口 root@ip
```

- 示例：创建一条socks5隧道，隧道内所有请求由服务器代理发起

  ```bash
  ssh -NfD 0.0.0.0:1234 root@ip
  ```
