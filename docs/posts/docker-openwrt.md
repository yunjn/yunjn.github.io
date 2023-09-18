# Docker部署OpenWrt做旁路由

## Install docker

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh --mirror Aliyun #阿里云镜像
```

* 使用阿里云docker镜像进行加速   <https://cr.console.aliyun.com/cn-beijing/instances/mirrors>

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxxxxxxxxxxx.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
```

点击网址后，得到xxxxxxxxxx的值，替换即可

* 图形化界面，感觉没那个必要，需要请自行搜索~~百度~~`Portainer`进行安装

## Install openwrt

* 开启混合网卡模式

```shell
#查看使用的网卡，以下默认eth0
ifconfig
#开启网卡混合模式，可能需要sudo权限
ip link set eth0 promisc on
```

* 创建 macvlan 网络

```shell
docker network create -d macvlan --subnet=192.168.1.1/24 --gateway=192.168.1.1 -o parent=eth0 macnet
#subnet=192.168.1.1/24 主路由器地址网段
#gateway=192.168.1.1   主路由器IP地址
#macnet                网络名称
```

* 拉取 docker 镜像

`docker pull XXX/XXX:XXX`

::: warning 
此处不提供镜像，笔者就是因为直接 pull 别人给的出来许多小问题，想要什么镜像需自行去 [Docker Hub](https://hub.docker.com/) 搜索`openwrt`，平台别选错就行
:::

* 创建openwrt容器

```shell
docker run --restart always -d --network macnet --privileged XXXXX/XXXXX:XXXXX /sbin/init
#XXXXX/XXXXX:XXXXX即使用的OpenWrt版本，需要和前面下载安装的一致
```

* openwrt容器修改network设置(可选，这得看你pull的镜像)

```shell
docker ps -a
# XXXXX 即第一步查询到的ID
docker exec -it XXXX sh
vim /etc/config/network
#找到，并修改 192.168.1.213 即你访问 openwrt web 的地址
option ipaddr 192.168.1.123
```

* reboot
* 浏览器输入openwrt访问的地址
* [OpenWrt-旁路由的设置](https://zhuanlan.zhihu.com/p/112484256)
* enjoy it ！

##  FAQ

* 笔者使用的 `docker pull raymondwong/openwrt_r9:21.2.1-x86_64`
* 设备：X86_64的服务器 