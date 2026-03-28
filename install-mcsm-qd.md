从 Proxmox 搭建到虚拟机部署 MCSManager 的全部过程，并说明了如何通过 SSH 登录 PVE 与虚拟机。

---

# 🧭 MCSManager 部署说明文档

## 📘 环境概述

* **宿主机系统**：Proxmox VE
* **宿主机 IP**：`10.102.33.76`
* **虚拟机系统**：Ubuntu Server (代号 `k8s`)
* **虚拟机 IP**：`192.168.1.2`
* **MCSManager 面板端口**：

  * Web 面板：`23333`
  * 守护进程：`24444`
* **访问方式**：通过 PVE 的端口转发访问

  ```
  http://10.102.33.76:23333
  ```

---

## 🧩 一、PVE 网络与虚拟机设置

### 1️⃣ 创建虚拟机

* 网络设备使用 **vmbr1（内网桥接）**
* 分配固定 IP：`192.168.1.2`
* 操作系统：Ubuntu Server
* 用户：`mc`（普通用户）

### 2️⃣ PVE NAT 与端口转发

为使外部可访问虚拟机内的服务，在 **Proxmox 主机** 上执行以下命令：

```bash
# 启用 IP 转发
sysctl -w net.ipv4.ip_forward=1

# Web 面板端口转发
iptables -t nat -A PREROUTING -p tcp -d 10.102.33.76 --dport 23333 -j DNAT --to-destination 192.168.1.2:23333
iptables -t nat -A POSTROUTING -p tcp -d 192.168.1.2 --dport 23333 -j MASQUERADE

# 守护进程端口转发
iptables -t nat -A PREROUTING -p tcp -d 10.102.33.76 --dport 24444 -j DNAT --to-destination 192.168.1.2:24444
iptables -t nat -A POSTROUTING -p tcp -d 192.168.1.2 --dport 24444 -j MASQUERADE
```

> 可选：持久化规则
>
> ```
> apt install -y iptables-persistent
> netfilter-persistent save
> ```

---

## ⚙️ 二、虚拟机内部环境准备

### 1️⃣ SSH 登录虚拟机

```bash
ssh mc@192.168.1.2
```

### 2️⃣ 获取 root 权限（并设置 root 密码）

```bash
sudo passwd root
sudo -i
```

---

## 📦 三、离线安装 Node.js

由于虚拟机无法联网，先在 PVE 下载离线包，再传入虚拟机。

### 在 PVE 上执行

```bash
mkdir -p /mc/nodepkg && cd /mc/nodepkg
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
tar -czvf node_offline_package.tar.gz node-v20.11.0-linux-x64.tar.xz
scp node_offline_package.tar.gz mc@192.168.1.2:/home/mc/
```

### 在虚拟机中安装

```bash
cd ~/ && tar -xzvf node_offline_package.tar.gz
tar -xf node-v20.11.0-linux-x64.tar.xz
sudo mv node-v20.11.0-linux-x64 /usr/local/node
sudo ln -sf /usr/local/node/bin/node /usr/bin/node
sudo ln -sf /usr/local/node/bin/npm /usr/bin/npm
sudo ln -sf /usr/local/node/bin/npx /usr/bin/npx
node -v
npm -v
```

---

## 🚀 四、安装并运行 MCSManager

### 1️⃣ 上传 MCSManager 压缩包

在 PVE 上：

```bash
scp /mc/mcsmanager_linux_release.tar.gz mc@192.168.1.2:/home/mc/mcsm/
```

### 2️⃣ 解压并安装

```bash
cd ~/mcsm
tar -zxvf mcsmanager_linux_release.tar.gz
chmod +x install.sh start-web.sh start-daemon.sh
./install.sh
```

### 3️⃣ 启动守护与面板服务

使用 Screen 后台运行：

```bash
# 守护进程
screen -S mcsm-daemon -dm bash -lc "./start-daemon.sh"

# Web 面板
screen -S mcsm-web -dm bash -lc "./start-web.sh"
```

---

## 🌐 五、访问 MCSManager

* 浏览器打开：

  ```
  http://10.102.33.76:23333
  ```
* 默认连接守护端口：

  ```
  24444
  ```

---

## 🔐 六、SSH 登录说明

### 登录 Proxmox 主机

```bash
ssh root@10.102.33.76
```

### 登录虚拟机

```bash
ssh mc@192.168.1.2
```

（若开启 root 登录）

```bash
ssh root@192.168.1.2
```

---

## 🧱 七、目录结构示例

```bash
/mc
├── mcsmanager_linux_release.tar.gz
└── nodepkg
    ├── node-v20.11.0-linux-x64.tar.xz
    └── node_offline_package.tar.gz

/home/mc/mcsm
├── mcsmanager_linux_release.tar.gz
└── MCSManager
    ├── start-daemon.sh
    ├── start-web.sh
    ├── install.sh
    └── config/
```

---

## ✅ 八、常用管理命令

| 任务           | 命令                         |                |         |
| ------------ | -------------------------- | -------------- | ------- |
| 查看运行状态       | `screen -ls`               |                |         |
| 进入面板窗口       | `screen -r mcsm-web`       |                |         |
| 进入守护窗口       | `screen -r mcsm-daemon`    |                |         |
| 退出 screen    | `Ctrl + A + D`             |                |         |
| 查看监听端口       | `ss -tulpn                 | grep -E '23333 | 24444'` |
| 停止服务         | 在对应 screen 窗口中按 `Ctrl + C` |                |         |
| 删除 screen 会话 | `screen -S <name> -X quit` |                |         |

---

## 📖 九、后续可选任务

* 在 PVE 增加 Minecraft 服务器端口转发（如 25565）
* 将 MCSManager 服务改为 systemd 自启
* 自动化 Node.js + MCSManager 部署脚本

---

