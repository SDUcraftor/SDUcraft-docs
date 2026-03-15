author@kylaan

# FRP 公网转发配置指南

本文档旨在帮助配置新开实例的 FRP 公网转发功能。如果有问题请联系@kylaan.

## 1. 推荐方案：使用预置节点

@kylaan 目前已经在 **济南** 和 **青岛** 节点已预置了独立的 FRP 客户端实例。无需下载和安装，只需修改配置文件重启即可。

* **济南节点**：[图片: JN.png]
* **青岛节点**：[图片: QD.png]

### 配置步骤

1. 在面板中进入上述对应的 **FRP 穿透实例**。
2. 在【文件管理】中找到并编辑 `frpc.toml` 文件。
3. 在文件末尾**追加**以下内容（请勿修改现有配置）：

```toml
# frpc.toml

# --- 新增转发规则 ---
[[proxies]]
name = "name_支持中文"
type = "tcp"
localIP = "127.0.0.1"
localPort = 11451    # 实例对应的宿主机端口（非容器端口）
remotePort = 11451   # 公网访问端口（建议和本地端口统一）
```

4. 保存文件并 **重启该 FRP 实例** 使配置生效。

---

## 自行部署指南

如果您希望自行部署 FRP 客户端实例，比如加到实例启动命令中随实例一同开关，请参考以下步骤：

### FRP基本信息

官方文档：[FRP-DOC](https://gofrp.org/zh-cn/docs/)

### 下载

您可以从 GitHub 的 [Release](https://github.com/fatedier/frp/releases) 页面中下载最新版本的客户端和服务器二进制文件。所有文件都打包在一个压缩包中，还包含了一份完整的配置参数说明。

### 客户端（待转发实例）部署

1. 解压下载的压缩包。
2. 将 `frpc` 和 `frpc.toml` 复制到内网服务所在的实例。

> 注意看清是客户端 `frpc` 还是服务端 `frps`。

### 配置 `frpc.toml`

编辑 `frpc.toml` 文件，配置如下内容：

```toml
# frpc.toml

# 服务端信息
serverAddr = "47.104.216.235" 
serverPort = 7000
auth.token = "frp-serverToken"

# 客户端转发规则1
[[proxies]]
name = "name_支持中文"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000

# 客户端转发规则2
[[proxies]]
...

```

#### 参数信息

- `serverAddr`：FRP服务端公网IP，目前使用 @Kylaan 提供的阿里云 (200Mbps)
- `serverPort`：FRP 服务端监听端口，已经开放7000端口
- `auth.token`：认证 Token，请勿泄露
- `[[proxies]]`：定义一个转发规则
- `name`：转发规则名称，支持中文
- `type`：转发类型，常用的有 `tcp`（TCP转发）、`http`（HTTP转发）、`https`（HTTPS转发）
- `localIP`：内网服务所在实例的 IP 地址，通常为 `127.0.0.1`
- `localPort`：实例对应的主机端口（非容器端口）

### 开始使用

在实例上运行以下命令启动 FRP 客户端：

```bash
./frpc -c ./frpc.toml
```

> 建议直接将此命令加入实例的启动脚本中，注意后台运行。
>
> 仍需联系 @Kylaan 开放对应的 `remotePort` 端口。
