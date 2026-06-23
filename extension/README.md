# MyGO Reloaded - B站会员购抢票助手

B站会员购自动抢票浏览器扩展，支持定时抢票、自动获取实名人信息。

---

## 目录

- [安装教程 / Installation](#安装教程--installation)
  - [加载未打包扩展 / Load Unpacked Extension](#加载未打包扩展--load-unpacked-extension)
  - [无痕模式启用 / Enable in Incognito](#无痕模式启用--enable-in-incognito)
- [使用教程 / Usage Guide](#使用教程--usage-guide)
- [功能说明 / Features](#功能说明--features)
- [注意事项 / Notes](#注意事项--notes)

---

## 安装教程 / Installation

### 加载未打包扩展 / Load Unpacked Extension

#### 中文

1. 打开 Chrome 扩展管理页面：在地址栏输入 `chrome://extensions/` 并回车
2. 开启右上角「开发者模式」开关
3. 点击左上角「加载已解压的扩展程序」按钮
4. 在弹出的文件选择器中，选择本项目的 `extension` 文件夹
5. 扩展加载成功后，会在扩展列表中显示「MyGO Reloaded - B站会员购抢票助手」
6. 点击扩展图标即可打开抢票界面

#### English

1. Open Chrome extensions page: type `chrome://extensions/` in the address bar and press Enter
2. Turn on the "Developer mode" toggle at the top right
3. Click the "Load unpacked" button at the top left
4. In the file picker, select the `extension` folder of this project
5. Once loaded, the extension "MyGO Reloaded" will appear in the list
6. Click the extension icon to open the ticket helper interface

### 无痕模式启用 / Enable in Incognito

#### 中文

1. 在扩展管理页面 (`chrome://extensions/`) 找到本扩展
2. 点击扩展卡片右下角的「详情」按钮
3. 在详情页面中，找到「在无痕模式下启用」选项
4. 开启该开关
5. 现在可以在无痕窗口中使用本扩展

#### English

1. Find this extension in the extensions page (`chrome://extensions/`)
2. Click the "Details" button on the extension card
3. In the details page, find the "Allow in Incognito" option
4. Turn on the toggle
5. The extension is now available in incognito windows

---

## 使用教程 / Usage Guide

#### 中文

1. **登录账号**：先登录 B 站账号，并打开任意一个 `https://mall.bilibili.com/` 页面（保持页面不要关闭）
2. **输入项目 ID**：在扩展 popup 中输入项目 ID（如 `1002171`），点击「获取票务信息」
3. **选择场次和票种**：从下拉菜单中选择想要购买的场次和票种
4. **设置购买张数**：输入想要购买的数量（注意限购数量）
5. **获取实名人**：点击「获取实名人列表」，勾选对应数量的实名人（购买几张票就选几个人）
6. **填写联系人**（如需要）：如果是匿名购买票种，需要填写联系人信息
7. **设置定时**（可选）：勾选「启用定时抢票」，设置抢票时间和提前 prepare 秒数
8. **开始抢票**：点击「开始抢票」按钮
9. **等待结果**：在运行日志中查看抢票进度，每 20 次尝试会提示一次
10. **停止抢票**：如需停止，点击「停止抢票」按钮

#### English

1. **Login**: Login to your Bilibili account and open any `https://mall.bilibili.com/` page (keep it open)
2. **Enter Project ID**: In the extension popup, enter the project ID (e.g., `1002171`), click "Fetch Ticket Info"
3. **Select Screen & Ticket**: Choose the screen and ticket type from the dropdown menus
4. **Set Quantity**: Enter the number of tickets you want to buy (check the purchase limit)
5. **Fetch Buyers**: Click "Fetch Buyers", select the exact number of buyers (must match ticket quantity)
6. **Fill Contact Info** (if needed): For anonymous-buy tickets, contact info is required
7. **Set Timer** (optional): Check "Enable Timer", set the target time and advance prepare seconds
8. **Start**: Click the "Start" button
9. **Wait for Result**: Check the running log for progress, a message appears every 20 attempts
10. **Stop**: Click "Stop" if you want to stop the process

---

## 功能说明 / Features

| 功能 | 说明 |
|------|------|
| 定时抢票 | 可设置目标时间，到时间自动开始抢票 |
| 自动获取实名人 | 直接从 B 站 API 获取实名人列表，无需手动输入 |
| 自动处理 token 过期 | 当 prepare token 过期时，自动返回重新获取 |
| 状态码监听 | 自动处理抢票成功、活动结束、库存不足等状态 |
| 购买人数量验证 | 实名制票种严格校验实名人数量等于购买张数 |
| 下单延迟限制 | 最小 600ms，防止请求过于频繁 |

---

## 注意事项 / Notes

- 本扩展需要在已登录 B 站账号的浏览器中使用
- 抢票前请确保已打开 `mall.bilibili.com` 的页面标签
- 实名制票种：实名人数量必须严格等于购买张数
- 匿名票种：需要填写联系人信息，无需实名人
- 建议提前测试扩展功能，熟悉操作流程
- 使用本扩展请遵守 B 站相关规则和法律法规

---

## 文件结构 / File Structure

```
extension/
├── manifest.json          # 扩展清单
├── background.js          # Service Worker - 核心调度
├── consts.js              # 状态码常量
├── content.js             # 内容脚本 - 消息桥梁
├── injected.js            # 注入脚本 - 与 Vue 实例交互
├── popup.html             # 弹出界面
├── popup.css              # 弹出界面样式
├── popup.js               # 弹出界面逻辑
├── README.md              # 本文件
├── js/
│   ├── ticket_prep.js     # 详情页 VM 扫描和 prep 请求
│   └── ticket_purc.js     # 订单页 VM 扫描和下单逻辑
└── icons/
    ├── icon.svg           # SVG 图标源文件
    ├── icon16.png         # 16x16 图标
    ├── icon48.png         # 48x48 图标
    └── icon128.png        # 128x128 图标
```
