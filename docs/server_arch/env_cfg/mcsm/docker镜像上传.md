# MCSM Docker 镜像导入指南

author@xhbsh

## 1. 下载镜像文件

> **注意**：请自行准备魔法工具
>
> 服务器 SSH 密码请查阅技术部团队文档
>
> 有关docker的更多信息请查看 [Docker 官方文档](https://docs.docker.com/)
>
> 比较好的中文教程 [docker教程](https://www.runoob.com/docker/docker-tutorial.html)

### 拉取并导出镜像

以 `GraalVM JDK 21` 为例：

1. **拉取镜像**

    ```bash
    docker pull container-registry.oracle.com/graalvm/jdk:21
    ```

2. **导出为 .tar 文件**

    ```bash
    # 格式: docker save -o <文件名.tar> <镜像名:标签>
    docker save -o graalvm21.tar container-registry.oracle.com/graalvm/jdk:21
    ```

## 2. 上传镜像至服务器

想办法将镜像上传至服务器中,如利用scp客户端等等

> 注意,是上传至实例所在的服务器(就是运行着mcsm的服务器)中,不是实例中
>
> 例如,上传至青岛mcsm中需要上传到10.102.33.76:10022

下面给出利用scp命令上传的方式

```{bash}
# 格式: scp -P <SSH端口> <本地文件> <用户名>@<服务器IP>:<目标路径>

# 示例 (默认端口22):
scp graalvm21.tar root@114.514.1.1:~/

# 示例 (如果服务器SSH端口不是22，例如是 20022):
scp -P 20022 graalvm21.tar root@114.514.1.1:~/
```

## 服务器端部署

> **注意**：以下命令需 **SSH 登录服务器(需要部署在哪台就登录哪台)** 后执行。

1. **导入镜像**

    ```bash
   # docker load -i <文件路径>
    docker load -i ~/graalvm21.tar
    ```

2. **重命名/打标签(推荐)**

    原镜像名称可能过长，可以打一个简短的标签

    ```bash
    # 格式: docker tag <原镜像名:原标签> <新镜像名:新标签>
    docker tag container-registry.oracle.com/graalvm/jdk:21 graalvm21:latest
    ```

3. **在mcsm中查看镜像上传结果**

管理面板->节点->镜像管理
![img_2.png](./image/docker1.png)
![img.png](image/docker2.png)

4. **记得把导入完的镜像删了**

    ```bash
   # rm <文件路径>
    rm ~/graalvm21.tar
    ```
