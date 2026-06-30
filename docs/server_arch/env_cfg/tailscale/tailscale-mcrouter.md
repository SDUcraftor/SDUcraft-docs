author@kylaan

# Tailscale + mc-router 公网转发方案完整指南


这是除 [FRP](../frp/FRP-doc.md) 之外的**另一种公网转发方案**：在云服务器上跑一个
[`mc-router`](https://github.com/itzg/mc-router)，读取 Minecraft Java 握手包里携带的**连接域名**，
把不同域名的玩家通过 **[Tailscale](https://tailscale.com/) 虚拟局域网加密隧道**转发到不同的内网游戏机上。

它的两个好处：

- **所有服务器共用公网 `25565` 一个端口**，靠域名区分，玩家不用记端口。
- 配合 `*.mc.sdumc.cn` 泛解析，**开新服只需加一行路由配置，不用再碰 DNS**。


> 202606更新 - 由于机房NAT问题，目前并未采用此方案，本文档仅作参考使用；如需使用请部署 [完整docker方案](https://github.com/Kylaan/docker-mcrouter) 到新服务器即可

---

## 1. 拓扑总览

```text
                         公网 (Internet)
  玩家1 连campus.mc.sdumc.cn ─┐
  玩家2 连world2.mc.sdumc.cn ─┤  (域名经 *.mc.sdumc.cn 泛解析到云机公网IP)
                             ▼
  ┌────────────────────────────────────────────────────┐
  │  云服务器 (唯一公网入口, 只开 25565)                 │
  │      mc-router 读握手域名 → 查 routes.json → 选后端  │
  │      宿主机 tailscale (tailnet 节点)                │
  └────────────────────┬───────────────────────────────┘
                       │  Tailscale (WireGuard) 加密隧道, 穿透 NAT (已配好)
                       ▼
  ┌───────────────────────────────────────────────────┐
  │  内网游戏机 (无公网IP, tailscale IP 100.85.131.48)  │
  │     :30000 → Campus 服   :30001 → 其他服 ...       │
  └───────────────────────────────────────────────────┘
```

三个角色：

| 角色 | 作用 |
|---|---|
| **云服务器 + mc-router** | 唯一公网入口，按请求域名把玩家分流到对应内网后端 |
| **Tailscale** | 加密隧道，自动穿透 NAT，让云机能直连无公网 IP 的内网游戏机 |
| **内网游戏机** | 真正跑 MC 容器，对公网完全不可见，只经 tailscale 暴露给云机 |

数据流：

```mermaid
flowchart LR
    A["玩家连 campus.mc.sdumc.cn"]
    B["云服务器:25565"]
    C["mc-router 读到该域名"]
    D["查路由表知后端 100.85.131.48:30000"]
    E["经 tailscale 隧道送达内网游戏机"]

    A --> B --> C --> D --> E
    E <--> D
```

玩家全程只感知云机，看不到背后的内网。

---

## 2. 如何新加转发需求

前提（**只需做一次**，已配好）：`*.mc.sdumc.cn` 的 A 记录指向云机公网 IP。
之后任何 `xxx.mc.sdumc.cn` 都自动解析到云机，开新服**不用再动 DNS**。

### 最佳实践

**① 编辑路由表** `stacks/mc-gateway/config/routes.json`（权限联系@kylaan或@epsilonH）在 `mappings` 里加一行：

```json
{
  "default-server": null,
  "mappings": {
    "campus.mc.sdumc.cn": "sducraft-mcsm-jn:30000",
    "world2.mc.sdumc.cn": "sducraft-mcsm-jn:30001"
  }
}
```

格式：`"玩家连接的域名": "内网游戏机tailscaleIP:宿主机端口"`。
> 子域名任取（建议见名知意）；后端端口填**内网游戏机宿主机上**映射出来的端口（即内网玩家游玩使用的端口，非容器内端口）。

**② 保存即生效。** mc-router 开了 `ROUTES_CONFIG_WATCH`，改完**秒生效，无需重启容器**。

**③ 验证**（不用开 MC，用 Server List Ping 探测整条链路）：

```python
pip install mcstatus
mcstatus <domain>.mc.sdumc.cn status
```

返回 version / online / motd 就说明全链路通，玩家可以连 `<domain>.mc.sdumc.cn` 进服了。

### 如何加青岛机的服务器？

一样只加一行，把后端 IP 换成**那台新游戏机的 tailscale IP** 即可（前提它已加入同一 tailnet）：

```json
"newworld.mc.sdumc.cn": "sducraft-mcsm-qd:25565"
```

---

## 3. 快速排查（从外到内）

::: qa 玩家连不上 / 探测无响应，怎么查？
按这个顺序逐段排查：

1. **任意机器**：`nslookup world2.mc.sdumc.cn` —— 是否解析到云机公网 IP（泛解析是否生效）。
2. **云服务器**：安全组 / 防火墙是否放行 `25565`。
3. **云服务器**： `docker-compose logs -f mc-router` —— 看连接有没有进来、命中哪个后端、域名拼写对不对。
4. **云服务器**： `tailscale ping sducraft-mcsm-jn`、`nc -zv sducraft-mcsm-jn <port>` —— 隧道和后端端口是否通。
5. **内网游戏机**：MC 容器是否在跑、端口对不对。
:::

::: qa 改了 routes.json 没生效？
确认 JSON 没写错（少逗号 / 多逗号都会让整个文件解析失败）。
**云服务器**：可用 `cd /www/docker/sducraft/stacks/mc-gateway && docker-compose logs --tail=20 mc-router` 看有没有报错；必要时 `docker-compose restart mc-router`。
:::

---

本章维护者

[author-card:kylaan]
