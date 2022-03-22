# centos7更新内核

> 日期：2020/04/14

## 查看系统内核

`uname -r`
```
uname -r
3.10.0-1062.18.1.el7.x86_64
```
## 导入elrepo公钥

`rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org`

---

## 添加elrepo的yum源
`rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm`

---

## 查看可安装内核包
`yum --disablerepo="*" --enablerepo="elrepo-kernel" list available`

```
[root@localhost ~]# yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * elrepo-kernel: hkg.mirror.rackspace.com
elrepo-kernel                                                                                         | 2.9 kB  00:00:00     
elrepo-kernel/primary_db                                                                              | 1.9 MB  00:00:00     
Available Packages
elrepo-release.noarch                                         7.0-4.el7.elrepo                                  elrepo-kernel
kernel-lt.x86_64                                              4.4.218-1.el7.elrepo                              elrepo-kernel
kernel-lt-devel.x86_64                                        4.4.218-1.el7.elrepo                              elrepo-kernel
kernel-lt-doc.noarch                                          4.4.218-1.el7.elrepo                              elrepo-kernel
kernel-lt-headers.x86_64                                      4.4.218-1.el7.elrepo                              elrepo-kernel
kernel-lt-tools.x86_64                                        4.4.218-1.el7.elrepo                              elrepo-kernel
kernel-lt-tools-libs.x86_64                                   4.4.218-1.el7.elrepo                              elrepo-kernel
kernel-lt-tools-libs-devel.x86_64                             4.4.218-1.el7.elrepo                              elrepo-kernel
kernel-ml.x86_64                                              5.6.2-1.el7.elrepo                                elrepo-kernel
kernel-ml-devel.x86_64                                        5.6.2-1.el7.elrepo                                elrepo-kernel
kernel-ml-doc.noarch                                          5.6.2-1.el7.elrepo                                elrepo-kernel
kernel-ml-headers.x86_64                                      5.6.2-1.el7.elrepo                                elrepo-kernel
kernel-ml-tools.x86_64                                        5.6.2-1.el7.elrepo                                elrepo-kernel
kernel-ml-tools-libs.x86_64                                   5.6.2-1.el7.elrepo                                elrepo-kernel
kernel-ml-tools-libs-devel.x86_64                             5.6.2-1.el7.elrepo                                elrepo-kernel
perf.x86_64                                                   5.6.2-1.el7.elrepo                                elrepo-kernel
python-perf.x86_64                                            5.6.2-1.el7.elrepo                                elrepo-kernel

```
---

## 安装内核
- --enablerepo 选项开启 CentOS 系统上的指定仓库。默认开启的是 elrepo，这里用 elrepo-kernel 替换。
- 上面得到可安装内核有4和5两个版本 分别是 kernel-lt kernel-ml, 这里我们安装最新的

`yum --enablerepo=elrepo-kernel install kernel-ml`

---

## 查询系统已安装内核
`sudo awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg`

- 可得到 内核编号:内核版本

```
0 : CentOS Linux (4.18.7-1.el7.elrepo.x86_64) 7 (Core)
1 : CentOS Linux (3.10.0-862.11.6.el7.x86_64) 7 (Core)
2 : CentOS Linux (3.10.0-514.el7.x86_64) 7 (Core)
3 : CentOS Linux (0-rescue-063ec330caa04d4baae54c6902c62e54) 7 (Core)
```

## 设置grub2默认启动内核版本两种方式
- `grub2-set-default 0 #0为内核编号`
- `vim /etc/default/grub`
  ```
    GRUB_TIMEOUT=5
    GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
    GRUB_DEFAULT=0 #替换为新的内核编号
    GRUB_DISABLE_SUBMENU=true
    GRUB_TERMINAL_OUTPUT="console"
    GRUB_CMDLINE_LINUX="crashkernel=auto rd.lvm.lv=cl/root rhgb quiet"
    GRUB_DISABLE_RECOVERY="true"
  ```

### 生成grub2配置文件 && 重启
`grub2-mkconfig -o /boot/grub2/grub.cfg`

`reboot`

---

## 重启后验证 || 删除旧内核(可选)
```
uname -r
4.18.7-1.el7.elrepo.x86_64
```

```
rpm -qa | grep kernel
kernel-xxxxxxxx
kernel-xxxxxxx
kernel-xxxxxxx

#删除方法一
yum remove kernel-xxxxxxxxxxxxx

#删除方法二 (超过3个内核,自动删除旧的)
yum install yum-utils
package-cleanup --oldkernels
```
