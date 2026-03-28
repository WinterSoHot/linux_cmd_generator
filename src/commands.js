export const commandsConfig = {
  file: {
    name: '文件操作',
    icon: '📁',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'ls', label: '列出目录 (ls)' },
        { value: 'cd', label: '切换目录 (cd)' },
        { value: 'mkdir', label: '创建目录 (mkdir)' },
        { value: 'touch', label: '创建文件 (touch)' },
        { value: 'cp', label: '复制 (cp)' },
        { value: 'mv', label: '移动/重命名 (mv)' },
        { value: 'rm', label: '删除 (rm)' },
        { value: 'cat', label: '查看内容 (cat)' },
        { value: 'chmod', label: '修改权限 (chmod)' },
        { value: 'chown', label: '修改所有者 (chown)' }
      ]},
      { type: 'input', name: 'path', label: '路径/文件名', placeholder: '例如：/home/user/file.txt' },
      { type: 'input', name: 'dest', label: '目标路径 (可选)', placeholder: '例如：/backup/', condition: ['cp', 'mv'] },
      { type: 'select', name: 'chmod_mode', label: '权限模式', options: [
        { value: '755', label: '755 (rwxr-xr-x)' },
        { value: '700', label: '700 (rwx------)' },
        { value: '644', label: '644 (rw-r--r--)' },
        { value: '600', label: '600 (rw-------)' },
        { value: '+x', label: '+x (添加执行权限)' },
        { value: '-x', label: '-x (移除执行权限)' }
      ], condition: ['chmod'] },
      { type: 'input', name: 'owner', label: '所有者 (user:group)', placeholder: '例如：www:www', condition: ['chown'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-l', label: '详细列表 (-l)' },
        { value: '-a', label: '显示隐藏文件 (-a)' },
        { value: '-h', label: '人类可读 (-h)' },
        { value: '-p', label: '创建父目录 (-p)' },
        { value: '-v', label: '显示过程 (-v)' },
        { value: '-r', label: '递归 (-r)' },
        { value: '-f', label: '强制 (-f)' },
        { value: '-R', label: '递归 (-R)' }
      ], condition: (values) => {
        const showFlags = {
          'ls': ['-l', '-a', '-h'],
          'mkdir': ['-p', '-v'],
          'cp': ['-r', '-v'],
          'mv': ['-v'],
          'rm': ['-r', '-f', '-v'],
          'chmod': ['-R', '-v'],
          'chown': ['-R', '-v']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  network: {
    name: '网络命令',
    icon: '🌐',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'ping', label: '测试连接 (ping)' },
        { value: 'curl', label: 'HTTP 请求 (curl)' },
        { value: 'wget', label: '下载文件 (wget)' },
        { value: 'ssh', label: 'SSH 连接 (ssh)' },
        { value: 'scp', label: 'SCP 传输 (scp)' },
        { value: 'netstat', label: '网络状态 (netstat)' },
        { value: 'ifconfig', label: '网络接口 (ifconfig)' },
        { value: 'dig', label: 'DNS 查询 (dig)' },
        { value: 'nslookup', label: 'DNS 查找 (nslookup)' }
      ]},
      { type: 'input', name: 'host', label: '主机/URL', placeholder: '例如：google.com 或 https://example.com' },
      { type: 'input', name: 'port', label: '端口 (可选)', placeholder: '例如：22, 80, 443', condition: ['ssh', 'scp', 'netstat', 'curl'] },
      { type: 'input', name: 'user', label: '用户名 (可选)', placeholder: '例如：root', condition: ['ssh', 'scp'] },
      { type: 'input', name: 'remote_path', label: '远程路径 (可选)', placeholder: '例如：/home/user/file.txt', condition: ['scp'] },
      { type: 'input', name: 'local_path', label: '本地路径 (可选)', placeholder: '例如：./file.txt', condition: ['scp', 'wget', 'curl'] },
      { type: 'input', name: 'count', label: '次数', placeholder: '例如：4', condition: ['ping'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-4', label: 'IPv4 (-4)' },
        { value: '-6', label: 'IPv6 (-6)' },
        { value: '-L', label: '跟随重定向 (-L)' },
        { value: '-I', label: '仅头部 (-I)' },
        { value: '-O', label: '保存原文件名 (-O)' },
        { value: '-t', label: '显示时间 (-t)' },
        { value: '-c', label: '指定次数 (-c)' },
        { value: '-s', label: '安静模式 (-s)' }
      ], condition: (values) => {
        const showFlags = {
          'ping': ['-4', '-6', '-c'],
          'curl': ['-L', '-I', '-s'],
          'wget': ['-O', '-c', '-s'],
          'netstat': ['-t', '-s']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  process: {
    name: '进程管理',
    icon: '⚡',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'ps', label: '查看进程 (ps)' },
        { value: 'top', label: '实时监控 (top)' },
        { value: 'kill', label: '终止进程 (kill)' },
        { value: 'pkill', label: '按名称终止 (pkill)' },
        { value: 'pgrep', label: '查找进程 (pgrep)' },
        { value: 'nice', label: '设置优先级 (nice)' },
        { value: 'renice', label: '修改优先级 (renice)' },
        { value: 'jobs', label: '后台任务 (jobs)' },
        { value: 'bg', label: '后台运行 (bg)' },
        { value: 'fg', label: '前台运行 (fg)' }
      ]},
      { type: 'input', name: 'pid', label: '进程 ID (PID)', placeholder: '例如：1234', condition: ['kill', 'renice'] },
      { type: 'input', name: 'process_name', label: '进程名称', placeholder: '例如：nginx', condition: ['pkill', 'pgrep'] },
      { type: 'select', name: 'signal', label: '信号类型', options: [
        { value: '-9', label: 'SIGKILL (强制终止)' },
        { value: '-15', label: 'SIGTERM (正常终止)' },
        { value: '-1', label: 'SIGHUP (重新加载)' },
        { value: '-2', label: 'SIGINT (中断)' }
      ], condition: ['kill', 'pkill'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: 'aux', label: '显示所有进程 (aux)' },
        { value: '-ef', label: '完整格式 (-ef)' },
        { value: '-f', label: '完整命令 (-f)' },
        { value: '-l', label: '长格式 (-l)' }
      ], condition: (values) => {
        const showFlags = {
          'ps': ['aux', '-ef'],
          'top': ['-f']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  system: {
    name: '系统信息',
    icon: '💻',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'uname', label: '系统信息 (uname)' },
        { value: 'hostname', label: '主机名 (hostname)' },
        { value: 'uptime', label: '运行时间 (uptime)' },
        { value: 'free', label: '内存使用 (free)' },
        { value: 'df', label: '磁盘空间 (df)' },
        { value: 'du', label: '目录大小 (du)' },
        { value: 'who', label: '登录用户 (who)' },
        { value: 'w', label: '用户活动 (w)' },
        { value: 'last', label: '登录历史 (last)' },
        { value: 'date', label: '系统时间 (date)' }
      ]},
      { type: 'input', name: 'path', label: '路径 (可选)', placeholder: '例如：/var/log', condition: ['du', 'df'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-a', label: '详细信息 (-a)' },
        { value: '-h', label: '人类可读 (-h)' },
        { value: '-r', label: '内核版本 (-r)' },
        { value: '-m', label: '机器类型 (-m)' },
        { value: '-s', label: '内核名称 (-s)' },
        { value: '-H', label: '包含 /tmp (-H)' },
        { value: '--max-depth=1', label: '深度 1 层 (--max-depth=1)' }
      ], condition: (values) => {
        const showFlags = {
          'uname': ['-a', '-r', '-m', '-s'],
          'free': ['-h'],
          'df': ['-h', '-H'],
          'du': ['-h', '--max-depth=1']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  search: {
    name: '搜索查找',
    icon: '🔍',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'find', label: '查找文件 (find)' },
        { value: 'locate', label: '快速定位 (locate)' },
        { value: 'grep', label: '文本搜索 (grep)' },
        { value: 'which', label: '查找命令 (which)' },
        { value: 'whereis', label: '查找程序 (whereis)' },
        { value: 'ag', label: '代码搜索 (ag)' }
      ]},
      { type: 'input', name: 'path', label: '搜索路径', placeholder: '例如：/home 或 .' },
      { type: 'input', name: 'pattern', label: '搜索模式', placeholder: '例如：*.txt 或 "hello world"' },
      { type: 'input', name: 'filename', label: '文件名 (可选)', placeholder: '例如：config', condition: ['find', 'locate', 'whereis'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-name', label: '按名称 (-name)' },
        { value: '-type f', label: '仅文件 (-type f)' },
        { value: '-type d', label: '仅目录 (-type d)' },
        { value: '-mtime -7', label: '7 天内修改 (-mtime -7)' },
        { value: '-size +100M', label: '大于 100M (-size +100M)' },
        { value: '-i', label: '忽略大小写 (-i)' },
        { value: '-r', label: '递归搜索 (-r)' },
        { value: '-n', label: '显示行号 (-n)' },
        { value: '-v', label: '反向匹配 (-v)' },
        { value: '-l', label: '仅文件名 (-l)' }
      ], condition: (values) => {
        const showFlags = {
          'find': ['-name', '-type f', '-type d', '-mtime -7', '-size +100M'],
          'grep': ['-i', '-r', '-n', '-v', '-l'],
          'ag': ['-i', '-n']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  compress: {
    name: '压缩解压',
    icon: '📦',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'tar', label: 'TAR 归档 (tar)' },
        { value: 'zip', label: 'ZIP 压缩 (zip)' },
        { value: 'unzip', label: 'ZIP 解压 (unzip)' },
        { value: 'gzip', label: 'GZIP 压缩 (gzip)' },
        { value: 'gunzip', label: 'GZIP 解压 (gunzip)' },
        { value: '7z', label: '7Z 压缩 (7z)' }
      ]},
      { type: 'select', name: 'mode', label: '模式', options: [
        { value: '-c', label: '创建压缩包' },
        { value: '-x', label: '解压文件' },
        { value: '-t', label: '查看内容' },
        { value: '-r', label: '追加文件' }
      ], condition: ['tar'] },
      { type: 'input', name: 'archive', label: '压缩包名', placeholder: '例如：archive.tar.gz' },
      { type: 'input', name: 'files', label: '文件/目录', placeholder: '例如：file1.txt dir1/' },
      { type: 'input', name: 'dest', label: '解压路径 (可选)', placeholder: '例如：/extract/to/', condition: ['unzip', 'tar'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-z', label: 'gzip 压缩 (-z)' },
        { value: '-j', label: 'bzip2 压缩 (-j)' },
        { value: '-J', label: 'xz 压缩 (-J)' },
        { value: '-v', label: '显示过程 (-v)' },
        { value: '-f', label: '强制覆盖 (-f)' },
        { value: '-u', label: '仅更新 (-u)' },
        { value: '-d', label: '指定目录 (-d)' }
      ], condition: (values) => {
        const showFlags = {
          'tar': ['-z', '-j', '-J', '-v', '-f', '-u'],
          'zip': ['-r', '-v', '-f'],
          'unzip': ['-d', '-o'],
          'gzip': ['-v', '-f'],
          '7z': ['-r', '-y']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  user: {
    name: '用户管理',
    icon: '👤',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'useradd', label: '创建用户 (useradd)' },
        { value: 'usermod', label: '修改用户 (usermod)' },
        { value: 'userdel', label: '删除用户 (userdel)' },
        { value: 'passwd', label: '修改密码 (passwd)' },
        { value: 'groupadd', label: '创建组 (groupadd)' },
        { value: 'groupmod', label: '修改组 (groupmod)' },
        { value: 'groupdel', label: '删除组 (groupdel)' },
        { value: 'su', label: '切换用户 (su)' },
        { value: 'sudo', label: '管理员权限 (sudo)' },
        { value: 'id', label: '用户信息 (id)' }
      ]},
      { type: 'input', name: 'username', label: '用户名', placeholder: '例如：newuser' },
      { type: 'input', name: 'group', label: '用户组 (可选)', placeholder: '例如：developers', condition: ['useradd', 'usermod', 'groupmod'] },
      { type: 'input', name: 'shell', label: 'Shell (可选)', placeholder: '例如：/bin/bash', condition: ['useradd', 'usermod'] },
      { type: 'input', name: 'home', label: '家目录 (可选)', placeholder: '例如：/home/newuser', condition: ['useradd', 'usermod'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-m', label: '创建家目录 (-m)' },
        { value: '-M', label: '不创建家目录 (-M)' },
        { value: '-s', label: '指定 Shell (-s)' },
        { value: '-g', label: '主组 (-g)' },
        { value: '-G', label: '附加组 (-G)' },
        { value: '-d', label: '家目录 (-d)' },
        { value: '-l', label: '新用户名 (-l)' },
        { value: '-r', label: '系统账户 (-r)' }
      ], condition: (values) => {
        const showFlags = {
          'useradd': ['-m', '-M', '-s', '-g', '-G', '-d'],
          'usermod': ['-s', '-g', '-G', '-d', '-l'],
          'groupadd': ['-g', '-r'],
          'sudo': ['-u']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  package: {
    name: '软件包管理',
    icon: '📦',
    params: [
      { type: 'select', name: 'manager', label: '包管理器', options: [
        { value: 'apt', label: 'APT (Debian/Ubuntu)' },
        { value: 'yum', label: 'YUM (CentOS/RHEL)' },
        { value: 'dnf', label: 'DNF (Fedora)' },
        { value: 'pacman', label: 'Pacman (Arch)' },
        { value: 'brew', label: 'Homebrew (macOS)' },
        { value: 'pip', label: 'Python (pip)' },
        { value: 'npm', label: 'Node.js (npm)' }
      ]},
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'install', label: '安装包' },
        { value: 'remove', label: '卸载包' },
        { value: 'update', label: '更新源' },
        { value: 'upgrade', label: '升级包' },
        { value: 'search', label: '搜索包' },
        { value: 'info', label: '查看信息' },
        { value: 'list', label: '列出包' },
        { value: 'clean', label: '清理缓存' }
      ]},
      { type: 'input', name: 'package', label: '包名 (可选)', placeholder: '例如：nginx', condition: ['install', 'remove', 'search', 'info'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-y', label: '自动确认 (-y)' },
        { value: '-u', label: '升级依赖 (-u)' },
        { value: '--no-install-recommends', label: '不安装推荐包' },
        { value: '-S', label: '同步数据库 (-S)' },
        { value: '-Q', label: '查询本地 (-Q)' },
        { value: '-g', label: '全局安装 (-g)' },
        { value: '--save', label: '保存依赖 (--save)' }
      ], condition: (values) => {
        const showFlags = {
          'apt': ['-y', '-u', '--no-install-recommends'],
          'yum': ['-y'],
          'dnf': ['-y'],
          'pacman': ['-S', '-Q', '-R', '-y'],
          'brew': ['--cask'],
          'pip': ['-U', '--user'],
          'npm': ['-g', '--save']
        };
        return showFlags[values.manager]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  log: {
    name: '日志查看',
    icon: '📄',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'tail', label: '查看末尾 (tail)' },
        { value: 'head', label: '查看开头 (head)' },
        { value: 'less', label: '分页查看 (less)' },
        { value: 'more', label: '分页浏览 (more)' },
        { value: 'cat', label: '查看全文 (cat)' },
        { value: 'journalctl', label: '系统日志 (journalctl)' },
        { value: 'dmesg', label: '内核日志 (dmesg)' }
      ]},
      { type: 'input', name: 'logfile', label: '日志文件路径', placeholder: '例如：/var/log/syslog' },
      { type: 'input', name: 'lines', label: '显示行数', placeholder: '例如：100', condition: ['tail', 'head', 'journalctl'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-f', label: '跟踪输出 (-f)' },
        { value: '-n', label: '指定行数 (-n)' },
        { value: '-e', label: '跳到末尾 (-e)' },
        { value: '-r', label: '反向显示 (-r)' },
        { value: '-u', label: '指定服务 (-u)' },
        { value: '--since', label: '起始时间 (--since)' },
        { value: '--until', label: '结束时间 (--until)' },
        { value: '-H', label: '人类可读 (-H)' }
      ], condition: (values) => {
        const showFlags = {
          'tail': ['-f', '-n'],
          'head': ['-n'],
          'journalctl': ['-f', '-u', '--since', '--until', '-n'],
          'dmesg': ['-H', '-w']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  },
  disk: {
    name: '磁盘操作',
    icon: '💾',
    params: [
      { type: 'select', name: 'action', label: '操作类型', options: [
        { value: 'mount', label: '挂载 (mount)' },
        { value: 'umount', label: '卸载 (umount)' },
        { value: 'fdisk', label: '分区管理 (fdisk)' },
        { value: 'mkfs', label: '创建文件系统 (mkfs)' },
        { value: 'fsck', label: '检查文件系统 (fsck)' },
        { value: 'dd', label: '磁盘复制 (dd)' },
        { value: 'rsync', label: '同步文件 (rsync)' },
        { value: 'blkid', label: '查看块设备 (blkid)' }
      ]},
      { type: 'input', name: 'device', label: '设备/分区', placeholder: '例如：/dev/sda1' },
      { type: 'input', name: 'mountpoint', label: '挂载点', placeholder: '例如：/mnt/data', condition: ['mount'] },
      { type: 'input', name: 'fstype', label: '文件系统类型', placeholder: '例如：ext4, xfs, ntfs', condition: ['mount', 'mkfs'] },
      { type: 'input', name: 'dest', label: '目标路径', placeholder: '例如：/backup/', condition: ['dd', 'rsync'] },
      { type: 'checkbox', name: 'flags', label: '选项', options: [
        { value: '-t', label: '指定类型 (-t)' },
        { value: '-o', label: '挂载选项 (-o)' },
        { value: '-l', label: '列出分区 (-l)' },
        { value: '-a', label: '全部 (-a)' },
        { value: '-v', label: '详细输出 (-v)' },
        { value: '-a', label: '归档模式 (-a)' },
        { value: '-P', label: '显示进度 (-P)' },
        { value: '--progress', label: '显示进度 (--progress)' },
        { value: 'bs=4M', label: '块大小 4M' },
        { value: 'status=progress', label: '显示进度' }
      ], condition: (values) => {
        const showFlags = {
          'mount': ['-t', '-o', '-a', '-l'],
          'fdisk': ['-l'],
          'mkfs': ['-t'],
          'fsck': ['-y', '-f'],
          'dd': ['bs=4M', 'status=progress'],
          'rsync': ['-a', '-v', '-P', '--progress']
        };
        return showFlags[values.action]?.map(v => ({ value: v, label: v })) || [];
      }}
    ]
  }
};
