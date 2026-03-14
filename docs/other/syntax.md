# 自定义语法指南

author@xhbsh

为了丰富文档的表现力并方便维护，本项目引入了一些自定义的 Markdown 语法扩展（通过 `source/js` 下的脚本实现）。

## 1. q&a

### 语法

使用 `:::` 包裹内容，第一行指定 `qa` 和标题。

```markdown
::: qa <标题文本>
<内容区域>
支持标准 markdown 语法
:::
```

### 示例

::: qa 这是问题？
问题是什么呢

1. 我不知道啊
2. qwq

- awa
- 各种语法都支持哦

```text
# 禁止套娃
```

:::

> 代码块中的qa不会被解析
---

## 2. 作者信息

### 2.1 标记页面作者 (Page Author)

在 Markdown 文件的 **最顶部（第一行）** 添加标记。
这会在页面左上角生成一个悬浮的作者胶囊按钮，鼠标悬停可查看详情。

**语法：**

```text
author@<作者ID>
```

**示例：**

```markdown
author@xhbsh

# 我的文档标题
这里是正文...
```

### 2.2 行内提及 (Inline Mention)

在正文中通过 `@` 符号提及某位贡献者。渲染为高亮的标签，鼠标悬停显示信息卡片。

**语法：**

```text
@<作者ID>
```

**示例：**

文章作者@xhbsh

### 2.3 嵌入作者名片 (Embedded Card)

在页面中嵌入一个包含头像、简介、联系方式的大号卡片。

**语法：**

```text
[author-card:<作者ID>]
```

**示例：**

本章贡献者
[author-card:xhbsh]

### 2.4 新增作者

在`index.html`中的`window.docsifyAuthorSource`新增作者

```json
"example": {
    name: "Name",
    avatar: "头像链接",
    bio: "作者简介",
    link: "https://github.com/xxx",
    qq: "12345678",
    email: "test@example.com",
    github: "https://github.com/xxx"
}
```
