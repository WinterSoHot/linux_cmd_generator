# Linux 命令生成器 🐧

一个基于 React + Electron 的 Linux 命令生成工具，通过可视化界面引导用户输入参数，生成可复制的 Linux 命令。

## 功能特点

- 🎨 **现代化界面** - 深色主题，流畅动画
- 🔍 **快速搜索** - 支持命令名称搜索，无需逐个分类查找
- 📋 **10 种命令类别** - 涵盖常用 Linux 命令场景
- ⚙️ **动态表单** - 根据选择自动显示/隐藏相关参数
- 📦 **一键复制** - 生成的命令可直接复制到剪贴板
- 🖥️ **跨平台桌面应用** - 支持 macOS、Windows、Linux

## 支持的命令类别

| 类别 | 图标 | 包含命令 |
|------|------|----------|
| 文件操作 | 📁 | ls, cd, mkdir, touch, cp, mv, rm, cat, chmod, chown |
| 网络命令 | 🌐 | ping, curl, wget, ssh, scp, netstat, ifconfig, dig, nslookup |
| 进程管理 | ⚡ | ps, top, kill, pkill, pgrep, nice, renice, jobs, bg, fg |
| 系统信息 | 💻 | uname, hostname, uptime, free, df, du, who, w, last, date |
| 搜索查找 | 🔍 | find, locate, grep, which, whereis, ag |
| 压缩解压 | 📦 | tar, zip, unzip, gzip, gunzip, 7z |
| 用户管理 | 👤 | useradd, usermod, userdel, passwd, groupadd, su, sudo |
| 软件包管理 | 📦 | apt, yum, dnf, pacman, brew, pip, npm |
| 日志查看 | 📄 | tail, head, less, cat, journalctl, dmesg |
| 磁盘操作 | 💾 | mount, umount, fdisk, mkfs, fsck, dd, rsync |

## 技术栈

- **前端**: React 19 + Vite
- **桌面框架**: Electron
- **样式**: CSS
- **打包**: electron-builder

## 开发与运行

### 安装依赖
```bash
npm install
```

### Web 模式运行
```bash
# 开发模式
npm run dev

# 构建
npm run build

# 预览
npm run preview
```

### Electron 桌面模式
```bash
# 开发模式
npm run electron:dev

# 打包构建
npm run electron:build

# 按平台打包
npm run electron:build:mac    # macOS (.dmg, .zip)
npm run electron:build:win    # Windows (.exe)
npm run electron:build:linux  # Linux (.AppImage, .deb, .rpm)
```

## 使用流程

1. **搜索或选择命令类别** - 可以直接搜索命令（如 "ls", "grep"）或点击类别按钮
2. **选择具体命令** - 从下拉菜单选择操作类型
3. **填写参数** - 根据提示输入路径、文件名等参数
4. **添加选项** - 勾选需要的命令标志（如 -r, -v, -h 等）
5. **复制命令** - 点击"复制命令"按钮，粘贴到终端使用

## 示例

### 示例 1：递归复制目录
1. 搜索 "cp" 或选择"文件操作"
2. 选择"复制 (cp)"
3. 源路径：`/home/user/project`
4. 目标路径：`/backup/`
5. 勾选"递归 (-r)"和"显示过程 (-v)"
6. 生成：`cp -r -v /home/user/project /backup/`

### 示例 2：SSH 连接到远程服务器
1. 搜索 "ssh" 或选择"网络命令"
2. 选择"SSH 连接 (ssh)"
3. 用户名：`root`
4. 主机：`192.168.1.100`
5. 端口：`22`
6. 生成：`ssh -p 22 root@192.168.1.100`

### 示例 3：查看日志最后 100 行并跟踪
1. 搜索 "tail" 或选择"日志查看"
2. 选择"查看末尾 (tail)"
3. 日志文件：`/var/log/syslog`
4. 行数：`100`
5. 勾选"跟踪输出 (-f)"
6. 生成：`tail -f -n 100 /var/log/syslog`

## 项目结构

```
linux_cmd_generator/
├── electron/
│   └── main.js          # Electron 主进程
├── public/
│   └── icon.png         # 应用图标
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── commands.js      # 命令配置
│   ├── main.jsx         # React 入口
│   └── index.css        # 全局样式
├── index.html           # HTML 入口
├── package.json         # 项目配置
├── vite.config.js       # Vite 配置
└── README.md            # 说明文档
```

## License

MIT
# linux_cmd_generator
