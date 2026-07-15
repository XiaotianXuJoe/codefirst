import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Code2,
  Copy,
  Check,
  ChevronDown,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  FileText,
  Github,
  Star,
} from 'lucide-react'

/* ───────────────────────── types ───────────────────────── */

interface Step {
  title: string
  time: string
  code: string
  explanation: string
}

interface KeyConcept {
  name: string
  description: string
}

interface FAQItem {
  q: string
  a: string
}

interface GitHubProject {
  name: string
  stars: string
  description: string
}

interface Extension {
  level: number
  text: string
  skill: string
}

interface ProjectDetailData {
  slug: string
  emoji: string
  title: string
  level: number
  levelLabel: string
  levelColor: string
  time: string
  lines: string
  stack: string[]
  stackColor: string
  prerequisites: string[]
  description: string
  whyThisProject: string
  image: string
  resumeText: string
  resumeTags: string[]
  steps: Step[]
  keyConcepts: KeyConcept[]
  faq: FAQItem[]
  githubProjects: GitHubProject[]
  extensions: Extension[]
}

/* ─────────────────────── project data ─────────────────────── */

const projectDetails: Record<string, ProjectDetailData> = {
  'password-generator': {
    slug: 'password-generator',
    emoji: '🔐',
    title: '个人密码生成器',
    level: 0,
    levelLabel: 'Level 0',
    levelColor: 'from-[#7BA37E] to-[#5C8A5F]',
    time: '1-2小时',
    lines: '~60行',
    stack: ['Python (内置库: random, string)'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['变量和赋值', '函数定义和调用', '字符串拼接', 'input()获取输入'],
    description:
      '一个可以生成随机强密码的命令行小工具。用户指定密码长度和包含的字符类型，程序生成并输出安全密码。附带密码强度检测功能。',
    whyThisProject:
      '零外部依赖，安装Python就能跑。涉及随机数、字符串处理、用户输入验证等多个基础知识点。实用价值高——每个人都需要密码。代码短但功能完整，1小时内能看到成果。',
    image: '/project-password.jpg',
    resumeText:
      '使用Python内置random/string模块实现强密码生成算法；支持自定义密码长度和字符类型（大写/小写/数字/符号）；实现密码强度评估功能，基于长度和字符多样性进行分级评分。',
    resumeTags: ['Python基础', '字符串处理', '用户交互设计'],
    steps: [
      {
        title: '导入模块，定义字符集合',
        time: '15分钟',
        code: `import random\nimport string\n\n# 定义四种字符集\nlowercase = string.ascii_lowercase\nuppercase = string.ascii_uppercase\ndigits = string.digits\nsymbols = string.punctuation`,
        explanation:
          '导入random和string两个内置模块。string模块提供了预设的字符集合，避免手写a-z、A-Z等。',
      },
      {
        title: '实现密码生成函数',
        time: '20分钟',
        code: `def generate_password(length=12, use_upper=True, use_digits=True, use_symbols=True):\n    chars = lowercase\n    if use_upper:   chars += uppercase\n    if use_digits:  chars += digits\n    if use_symbols: chars += symbols\n    \n    password = ''.join(random.choice(chars) for _ in range(length))\n    return password`,
        explanation:
          '根据用户的选择拼接字符集，然后用random.choice从字符集中随机选取指定数量的字符，最后拼接成字符串。',
      },
      {
        title: '实现强度检测函数',
        time: '20分钟',
        code: `def check_strength(password):\n    score = 0\n    if len(password) >= 8:  score += 1\n    if len(password) >= 12: score += 1\n    if any(c.isupper() for c in password): score += 1\n    if any(c.isdigit() for c in password): score += 1\n    if any(c in symbols for c in password): score += 1\n    \n    if score <= 2: return "弱"\n    if score <= 3: return "中"\n    return "强"`,
        explanation:
          '从长度、大写字母、数字、符号四个维度评分，根据总分返回弱/中/强的评级。',
      },
      {
        title: '主菜单循环',
        time: '15分钟',
        code: `def main():\n    while True:\n        print("\\n=== 密码生成器 ===")\n        print("1. 生成密码")\n        print("2. 检测密码强度")\n        print("3. 退出")\n        choice = input("请选择: ")\n        \n        if choice == "1":\n            length = int(input("密码长度: ") or "12")\n            pwd = generate_password(length)\n            print(f"生成密码: {pwd}")\n            print(f"强度: {check_strength(pwd)}")\n        elif choice == "2":\n            pwd = input("输入密码: ")\n            print(f"强度: {check_strength(pwd)}")\n        else:\n            break\n\nif __name__ == "__main__":\n    main()`,
        explanation:
          '用while True创建循环菜单，根据用户选择调用不同功能。input()获取用户输入，if-elif处理不同选项。',
      },
    ],
    keyConcepts: [
      { name: 'random模块', description: 'Python内置随机数生成模块，random.choice()从序列中随机选取一个元素' },
      { name: 'string模块', description: '提供预设字符串常量：ascii_lowercase, ascii_uppercase, digits, punctuation' },
      { name: '列表推导式', description: "''.join(random.choice(chars) for _ in range(length)) 是一种简洁的循环写法" },
      { name: '函数默认参数', description: 'def generate_password(length=12, ...) 让参数有默认值，调用时可以省略' },
    ],
    faq: [
      { q: "NameError: name 'string' is not defined", a: '忘记import string。检查文件开头是否有导入语句。' },
      { q: '生成的密码全是小写', a: '用户参数传错。检查函数调用时的参数值是否为True。' },
      { q: '输入长度时报错退出', a: '没有处理非数字输入。用try/except包裹int()转换。' },
    ],
    githubProjects: [
      { name: 'otter365/password-generator', stars: '~10', description: '极简版本，适合对照学习基础逻辑' },
      { name: 'Abeshdas/Password-Generator-GUI', stars: '~5', description: '用Tkinter做了图形界面，展示如何从CLI升级到GUI' },
    ],
    extensions: [
      { level: 1, text: '支持生成N个密码的批量模式', skill: '循环+列表' },
      { level: 2, text: '将生成的密码保存到txt文件', skill: '文件读写' },
      { level: 2, text: '给程序加颜色输出（colorama库）', skill: '第三方库使用' },
      { level: 3, text: '用Tkinter做成图形界面', skill: 'GUI编程入门' },
      { level: 4, text: '支持易记密码模式（随机单词组合）', skill: '读取文件+单词列表' },
    ],
  },
  'weather-cli': {
    slug: 'weather-cli',
    emoji: '🌤️',
    title: '命令行天气查询工具',
    level: 1,
    levelLabel: 'Level 1',
    levelColor: 'from-[#E88B2E] to-[#B55A00]',
    time: '2-3小时',
    lines: '~80行',
    stack: ['Python + requests库 + wttr.in API'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['函数', '字符串格式化', '字典访问', 'pip安装包'],
    description:
      '一个命令行天气查询工具。用户输入城市名，程序调用免费的天气API获取实时天气数据，格式化后在终端展示。',
    whyThisProject:
      '第一次接触API概念——这是现代编程最核心的技能之一。学会安装第三方库（requests），学会阅读API文档，理解请求-响应模型。',
    image: '/project-weather.jpg',
    resumeText:
      '调用wttr.in开放天气API，实现城市天气实时查询功能；使用requests库处理HTTP请求，实现网络异常捕获与重试机制；设计数据解析层，将API原始响应格式化为结构化天气信息。',
    resumeTags: ['REST API调用', 'HTTP协议基础', '数据解析'],
    steps: [
      {
        title: '安装requests库',
        time: '10分钟',
        code: '# 在终端运行\npip install requests',
        explanation:
          'requests是Python最流行的HTTP库，让API调用变得简单。',
      },
      {
        title: '发送第一个API请求',
        time: '20分钟',
        code: `import requests\n\ndef get_weather(city):\n    url = f"https://wttr.in/{city}?format=%C|%t|%h"\n    try:\n        response = requests.get(url, timeout=5)\n        response.raise_for_status()\n        return response.text\n    except requests.RequestException as e:\n        return f"请求失败: {e}"`,
        explanation:
          '使用requests.get()发送HTTP GET请求。timeout参数防止请求卡住。raise_for_status()检查HTTP错误码。',
      },
      {
        title: '解析和格式化数据',
        time: '30分钟',
        code: `def parse_weather(raw_text):\n    parts = raw_text.strip().split("|")\n    if len(parts) >= 3:\n        return {\n            "condition": parts[0],\n            "temperature": parts[1],\n            "humidity": parts[2]\n        }\n    return None\n\ndef display_weather(data, city):\n    if data is None:\n        print("无法解析天气数据")\n        return\n    print(f"\\n🌍 {city} 的当前天气:")\n    print(f"  天气状况: {data['condition']}")\n    print(f"  温度: {data['temperature']}")\n    print(f"  湿度: {data['humidity']}")`,
        explanation:
          '将API返回的管道分隔文本解析为字典，然后用格式化输出展示。',
      },
      {
        title: '主程序整合',
        time: '20分钟',
        code: `def main():\n    print("=== 命令行天气查询 ===")\n    while True:\n        city = input("\\n请输入城市名 (或输入'退出'): ").strip()\n        if city in ["退出", "quit", "q"]:\n            break\n        if not city:\n            print("城市名不能为空")\n            continue\n        \n        raw = get_weather(city)\n        if raw.startswith("请求失败"):\n            print(raw)\n        else:\n            data = parse_weather(raw)\n            display_weather(data, city)\n\nif __name__ == "__main__":\n    main()`,
        explanation:
          '整合所有功能，添加输入验证和循环菜单。用.strip()去除首尾空格，防止空输入。',
      },
    ],
    keyConcepts: [
      { name: 'API', description: '应用程序接口，通过URL向服务器请求数据的标准方式' },
      { name: 'HTTP GET请求', description: '从服务器获取数据的方法，requests.get(url)是最简单的调用方式' },
      { name: '异常处理', description: '用try/except捕获网络超时、连接错误等问题，让程序不会崩溃' },
      { name: '字典访问', description: "data['condition'] 从字典中取值，是最基础的数据结构操作" },
    ],
    faq: [
      { q: "ModuleNotFoundError: No module named 'requests'", a: '没安装requests库。运行 pip install requests。' },
      { q: '返回乱码或空内容', a: '城市名拼写错误或包含特殊字符。检查拼写，尝试英文城市名。' },
      { q: '程序卡很久没反应', a: '网络连接问题。给requests.get()加timeout参数。' },
    ],
    githubProjects: [
      { name: 'ayushmandas29/weather-cli', stars: '~15', description: '非常好的学习参考，项目结构清晰，有requirements.txt和完整README' },
      { name: 'tomi3-11/Python-beginner-CLI-projects', stars: '~50', description: '包含60+个CLI项目示例，可以看到同一类项目的多种实现方式' },
    ],
    extensions: [
      { level: 1, text: '支持查询未来3天天气预报', skill: 'API多参数调用' },
      { level: 2, text: '给输出加颜色和emoji美化', skill: '终端UI美化' },
      { level: 2, text: '保存查询历史到本地文件', skill: '文件读写+数据持久化' },
      { level: 3, text: '改用OpenWeatherMap API（需注册获取API Key）', skill: 'API认证机制' },
      { level: 4, text: '添加自动定位（根据IP获取当前城市）', skill: '更多API的链式调用' },
    ],
  },
  'file-renamer': {
    slug: 'file-renamer',
    emoji: '📁',
    title: '文件批量重命名工具',
    level: 1,
    levelLabel: 'Level 1',
    levelColor: 'from-[#E88B2E] to-[#B55A00]',
    time: '2-4小时',
    lines: '~100行',
    stack: ['Python + os/pathlib + re正则'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['文件路径概念', '循环', '字符串操作', '正则表达式基础'],
    description:
      '实用的文件批量重命名工具。可以一次性将文件夹中的所有文件按规则重命名——加前缀、按序号、替换文字等。',
    whyThisProject:
      '极强的实用性——每个人都会遇到批量处理文件的场景。深入理解文件系统操作，引入正则表达式——文本处理的利器。',
    image: '/project-rename.jpg',
    resumeText:
      '使用pathlib模块实现跨平台的文件批量重命名操作；支持前缀添加、序号格式化、字符串替换三种重命名模式；设计预览确认机制，防止误操作。',
    resumeTags: ['文件系统操作', '路径处理', '自动化脚本'],
    steps: [
      {
        title: '列出文件夹中的文件',
        time: '15分钟',
        code: `import os\nfrom pathlib import Path\n\ndef list_files(folder_path):\n    path = Path(folder_path)\n    if not path.exists():\n        print("文件夹不存在!")\n        return []\n    \n    files = [f for f in path.iterdir() if f.is_file()]\n    return files`,
        explanation:
          '使用pathlib.Path处理文件路径，iterdir()遍历目录，is_file()过滤只保留文件（排除子文件夹）。',
      },
      {
        title: '实现重命名函数',
        time: '30分钟',
        code: `def add_prefix(files, prefix):\n    for f in files:\n        new_name = prefix + f.name\n        new_path = f.parent / new_name\n        f.rename(new_path)\n        print(f"{f.name} -> {new_name}")\n\ndef rename_with_index(files, prefix="file"):\n    for index, f in enumerate(files, start=1):\n        ext = f.suffix\n        new_name = f"{prefix}_{index:03d}{ext}"\n        new_path = f.parent / new_name\n        f.rename(new_path)\n        print(f"{f.name} -> {new_name}")`,
        explanation:
          'f.parent获取父目录，f.suffix获取扩展名。{index:03d}格式化为001, 002等三位数字。',
      },
      {
        title: '实现替换功能和预览模式',
        time: '30分钟',
        code: `def replace_in_name(files, old, new):\n    for f in files:\n        if old in f.name:\n            new_name = f.name.replace(old, new)\n            new_path = f.parent / new_name\n            f.rename(new_path)\n            print(f"{f.name} -> {new_name}")\n\ndef preview_changes(files, operation, **kwargs):\n    print("\\n=== 预览模式 ===")\n    print("以下文件将被重命名:")\n    for f in files:\n        if operation == "prefix":\n            new_name = kwargs["prefix"] + f.name\n        print(f"  {f.name}  ->  {new_name}")\n    \n    confirm = input("\\n确认执行? (y/n): ").lower()\n    return confirm == 'y'`,
        explanation:
          '预览模式先展示将要进行的修改，让用户确认后再执行。这是防止误操作的重要设计。',
      },
      {
        title: '主菜单',
        time: '15分钟',
        code: `def main():\n    print("=== 文件批量重命名工具 ===")\n    folder = input("请输入文件夹路径: ")\n    files = list_files(folder)\n    \n    if not files:\n        print("没有找到文件")\n        return\n    \n    print(f"\\n找到 {len(files)} 个文件")\n    print("\\n1. 添加前缀\\n2. 按序号重命名\\n3. 替换文件名中的文字")\n    \n    choice = input("请选择操作: ")\n    if choice == "1":\n        prefix = input("输入前缀: ")\n        if preview_changes(files, "prefix", prefix=prefix):\n            add_prefix(list_files(folder), prefix)\n    # ... 其他选项`,
        explanation:
          '整合所有功能，添加文件存在检查和预览确认流程。注意重新获取文件列表因为路径对象在重命名后会失效。',
      },
    ],
    keyConcepts: [
      { name: 'pathlib.Path', description: '面向对象的文件路径处理，比os.path更直观。支持/运算符拼接路径。' },
      { name: '文件重命名', description: 'path.rename(new_path)是原子操作，直接修改文件系统。' },
      { name: '列表推导式', description: '[f for f in path.iterdir() if f.is_file()] 简洁的过滤语法。' },
      { name: '字符串格式化', description: "f'{prefix}_{index:03d}' 中的:03d表示3位零填充数字。" },
    ],
    faq: [
      { q: 'FileNotFoundError', a: '文件夹路径错误。用Path()处理路径，支持/跨平台。' },
      { q: '重命名后文件名冲突', a: '两个文件重命名后可能同名。先检查目标文件名是否已存在。' },
      { q: '隐藏文件被修改', a: '没有过滤隐藏文件。加条件 not f.name.startswith(\'.\')。' },
    ],
    githubProjects: [
      { name: 'tomi3-11/Python-beginner-CLI-projects', stars: '~50', description: '包含文件操作类项目，可以学习不同的文件处理模式' },
    ],
    extensions: [
      { level: 1, text: '支持递归处理子文件夹', skill: '递归/栈遍历目录树' },
      { level: 2, text: '用正则表达式匹配文件名模式', skill: 're模块使用' },
      { level: 2, text: '支持撤销操作（记录原始文件名）', skill: '日志/状态管理' },
      { level: 3, text: '按文件修改日期重命名', skill: 'os.path.getmtime()' },
      { level: 4, text: '用Tkinter做图形界面（拖拽文件夹）', skill: 'GUI+文件操作结合' },
    ],
  },
  'github-profile': {
    slug: 'github-profile',
    emoji: '🔍',
    title: 'GitHub用户资料查询站',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '3-5小时',
    lines: '~150行',
    stack: ['HTML5 + CSS3 + JavaScript + Fetch API'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['HTML基础标签', 'CSS选择器', 'JS变量和函数', 'DOM操作'],
    description:
      '纯前端的网页应用。用户输入GitHub用户名，页面调用GitHub开放API获取公开资料，以美观的卡片形式展示。',
    whyThisProject:
      '第一次做出看得见摸得着的网页应用。第一次在前端调用API。可以部署到GitHub Pages——真正上线一个网站。面试官可以直接打开链接看效果。',
    image: '/project-github.jpg',
    resumeText:
      '纯前端实现GitHub用户资料实时查询与展示，调用GitHub REST API获取公开数据；使用原生Fetch API配合async/await实现异步数据获取与错误处理；设计响应式卡片布局，适配桌面端和移动端浏览。',
    resumeTags: ['DOM操作', 'Fetch API', '异步编程', '响应式布局'],
    steps: [
      {
        title: 'HTML结构',
        time: '30分钟',
        code: `<div class="search-box">\n  <input type="text" id="username" placeholder="输入GitHub用户名...">\n  <button onclick="searchUser()">查询</button>\n</div>\n<div id="profile" class="profile-card" style="display:none;">\n  <img id="avatar" src="" alt="头像">\n  <h2 id="name"></h2>\n  <p id="bio"></p>\n  <div class="stats">\n    <span>仓库: <b id="repos"></b></span>\n    <span>粉丝: <b id="followers"></b></span>\n  </div>\n  <a id="link" href="#" target="_blank">查看GitHub主页</a>\n</div>`,
        explanation:
          '构建基本的HTML骨架。input获取用户输入，button触发搜索，profile-card展示结果。',
      },
      {
        title: 'CSS样式',
        time: '45分钟',
        code: `/* 核心样式 */\n.profile-card {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.1);\n}\n.profile-card img {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n}\n.stats {\n  display: flex;\n  gap: 24px;\n}`,
        explanation:
          '用flexbox布局，border-radius做圆角，box-shadow添加阴影。白色卡片在灰色背景上突出。',
      },
      {
        title: 'JavaScript API调用',
        time: '45分钟',
        code: `const API_URL = 'https://api.github.com/users/';\n\nasync function searchUser() {\n    const username = document.getElementById('username').value.trim();\n    if (!username) { showError('请输入用户名'); return; }\n    \n    try {\n        const response = await fetch(API_URL + username);\n        if (response.status === 404) throw new Error('用户不存在');\n        if (!response.ok) throw new Error('请求失败');\n        \n        const data = await response.json();\n        displayProfile(data);\n    } catch (err) {\n        showError(err.message);\n    }\n}\n\nfunction displayProfile(data) {\n    document.getElementById('avatar').src = data.avatar_url;\n    document.getElementById('name').textContent = data.name || data.login;\n    document.getElementById('bio').textContent = data.bio || '暂无简介';\n    document.getElementById('repos').textContent = data.public_repos;\n    document.getElementById('followers').textContent = data.followers;\n    document.getElementById('link').href = data.html_url;\n    document.getElementById('profile').style.display = 'block';\n}`,
        explanation:
          "使用Fetch API发送异步请求，async/await让异步代码更易读。getElementById获取DOM元素，直接修改属性和内容。",
      },
    ],
    keyConcepts: [
      { name: 'DOM操作', description: "document.getElementById()获取元素，修改textContent/src/href等属性。" },
      { name: 'Fetch API', description: '现代JS的标准HTTP请求方式，返回Promise，配合async/await使用。' },
      { name: 'async/await', description: '处理异步操作的语法糖，让异步代码看起来像同步的，更易读。' },
      { name: 'JSON解析', description: 'response.json()自动将API返回的JSON字符串转为JS对象。' },
      { name: '错误处理', description: 'response.ok检查HTTP状态，try/catch捕获网络异常。' },
    ],
    faq: [
      { q: '页面空白，什么都没显示', a: 'JS代码有语法错误。打开浏览器F12控制台看报错信息。' },
      { q: 'API请求失败，报CORS错误', a: 'GitHub API支持跨域，通常是网络问题。检查网络连接。' },
      { q: '头像显示不出来', a: 'avatar_url为空或img标签src设置错误。检查API返回的数据结构。' },
      { q: '样式没生效', a: 'CSS文件路径错误或没被引入。检查<link>标签的href路径。' },
    ],
    githubProjects: [
      { name: '本项目本身就是最好的起点', stars: '你的', description: '完成后可直接作为GitHub仓库展示' },
    ],
    extensions: [
      { level: 1, text: '展示用户的最近仓库列表', skill: 'API嵌套调用' },
      { level: 2, text: '添加搜索历史（localStorage保存）', skill: '浏览器本地存储' },
      { level: 2, text: '暗色模式切换', skill: 'CSS变量+主题切换' },
      { level: 3, text: '展示用户的贡献热力图', skill: '图片嵌入+数据处理' },
      { level: 4, text: '支持对比两个用户的数据', skill: '复杂UI布局' },
    ],
  },
  'todo-app': {
    slug: 'todo-app',
    emoji: '✅',
    title: '待办事项管理网页',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '4-6小时',
    lines: '~200行',
    stack: ['HTML5 + CSS3 + JavaScript + LocalStorage'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['DOM操作', '事件监听', '数组操作', 'JSON基础'],
    description:
      '功能完整的待办事项(TODO)管理网页应用。可以添加任务、标记完成、删除任务、筛选查看，数据保存在浏览器本地。',
    whyThisProject:
      '第一次实现完整的CRUD（增删改查）操作。第一次使用浏览器本地存储（LocalStorage）。是所有现代Web应用的最小原型。',
    image: '/project-todo.jpg',
    resumeText:
      '实现完整的任务增删改查(CRUD)功能，支持任务完成状态切换与筛选查看；使用LocalStorage实现浏览器端数据持久化，刷新页面数据不丢失；设计渐变背景+卡片式布局，支持全部/进行中/已完成三种筛选视图。',
    resumeTags: ['DOM操作', '事件驱动编程', 'LocalStorage', 'CRUD设计'],
    steps: [
      {
        title: 'HTML结构',
        time: '30分钟',
        code: `<div class="container">\n  <h1>✅ 待办事项</h1>\n  <div class="input-area">\n    <input type="text" id="taskInput" placeholder="添加新任务...">\n    <button onclick="addTask()">+</button>\n  </div>\n  <div class="filters">\n    <button class="filter-btn active" onclick="setFilter('all')">全部</button>\n    <button class="filter-btn" onclick="setFilter('active')">进行中</button>\n    <button class="filter-btn" onclick="setFilter('completed')">已完成</button>\n  </div>\n  <ul id="taskList"></ul>\n  <div class="stats" id="stats"></div>\n</div>`,
        explanation:
          '构建完整HTML骨架：输入区域、筛选按钮、任务列表、统计区域。',
      },
      {
        title: 'CSS样式（核心）',
        time: '45分钟',
        code: `/* 核心样式 */\n#taskList li {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  border-bottom: 1px solid #f0f0f0;\n  gap: 10px;\n}\n#taskList li span.completed {\n  text-decoration: line-through;\n  color: #999;\n}\n.filter-btn.active {\n  background: #667eea;\n  color: white;\n}\n.delete-btn {\n  background: none;\n  border: none;\n  color: #ff6b6b;\n  cursor: pointer;\n}`,
        explanation:
          '用flexbox排列任务项，.completed类添加删除线效果，.active类高亮当前筛选按钮。',
      },
      {
        title: 'JavaScript核心逻辑',
        time: '90分钟',
        code: `let tasks = [];\nlet currentFilter = 'all';\n\nfunction loadTasks() {\n  const saved = localStorage.getItem('todo_tasks');\n  if (saved) tasks = JSON.parse(saved);\n  render();\n}\nfunction saveTasks() {\n  localStorage.setItem('todo_tasks', JSON.stringify(tasks));\n}\n\nfunction addTask() {\n  const input = document.getElementById('taskInput');\n  const text = input.value.trim();\n  if (!text) return;\n  tasks.push({ id: Date.now(), text, completed: false });\n  input.value = '';\n  saveTasks(); render();\n}\n\nfunction toggleTask(id) {\n  const task = tasks.find(t => t.id === id);\n  if (task) { task.completed = !task.completed; saveTasks(); render(); }\n}\n\nfunction deleteTask(id) {\n  tasks = tasks.filter(t => t.id !== id); saveTasks(); render(); }\n\nfunction render() {\n  const list = document.getElementById('taskList');\n  list.innerHTML = '';\n  let filtered = tasks;\n  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);\n  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);\n  \n  filtered.forEach(task => {\n    const li = document.createElement('li');\n    li.innerHTML = \`<input type="checkbox" \${task.completed ? 'checked' : ''} onchange="toggleTask(\${task.id})">\n      <span class="\${task.completed ? 'completed' : ''}">\${task.text}</span>\n      <button class="delete-btn" onclick="deleteTask(\${task.id})">🗑️</button>\`;\n    list.appendChild(li);\n  });\n  document.getElementById('stats').textContent = \`共 \${tasks.length} 个任务，已完成 \${tasks.filter(t => t.completed).length} 个\`;\n}`,
        explanation:
          '这是核心CRUD逻辑：loadTasks从localStorage读取，saveTasks保存，add/toggle/delete修改数据后调用render刷新UI。render根据currentFilter过滤并重新渲染列表。',
      },
    ],
    keyConcepts: [
      { name: 'CRUD', description: '增(addTask) / 查(render) / 改(toggleTask) / 删(deleteTask) — 所有应用的基础操作模式。' },
      { name: 'LocalStorage', description: '浏览器内置的键值对存储，localStorage.setItem/getItem实现数据持久化。' },
      { name: 'JSON序列化', description: 'JSON.stringify将JS对象转为字符串存储，JSON.parse转回对象。' },
      { name: '数组方法', description: 'push添加、filter过滤、find查找、forEach遍历 — 最常用的高阶函数。' },
      { name: '事件监听', description: 'onclick/onchange直接绑定，addEventListener更灵活。事件驱动是前端的核心模式。' },
    ],
    faq: [
      { q: '刷新后任务丢失', a: '没有调用saveTasks()或loadTasks()。确保每个修改操作后保存，页面加载时读取。' },
      { q: 'localStorage报错', a: '某些浏览器隐私模式下禁用。用try/catch包裹localStorage操作。' },
      { q: '删除wrong的任务', a: 'ID匹配错误。确认filter(t => t.id !== id)逻辑正确。' },
      { q: '回车没反应', a: '事件监听没有正确绑定。检查addEventListener是否在DOM加载后执行。' },
    ],
    githubProjects: [
      { name: '本项目完成后建议作为独立仓库维护', stars: '你的', description: '这是前端面试最常问的项目类型之一' },
    ],
    extensions: [
      { level: 1, text: '添加任务编辑功能（双击修改）', skill: '复杂DOM操作' },
      { level: 2, text: '任务拖拽排序', skill: 'HTML5 Drag and Drop API' },
      { level: 2, text: '添加任务优先级（高/中/低）+ 按优先级排序', skill: '数据结构+排序' },
      { level: 3, text: '添加任务截止日期，显示是否逾期', skill: 'Date对象处理' },
      { level: 4, text: '用React/Vue重写整个项目', skill: '前端框架入门' },
    ],
  },
}

/* ──────────────────── helpers ──────────────────── */

const slugs = Object.keys(projectDetails)

function getPrevSlug(current: string): string | null {
  const idx = slugs.indexOf(current)
  return idx > 0 ? slugs[idx - 1] : null
}

function getNextSlug(current: string): string | null {
  const idx = slugs.indexOf(current)
  return idx < slugs.length - 1 ? slugs[idx + 1] : null
}

/* ──────────────── syntax highlighter ──────────────── */

function highlightCode(code: string): string {
  // Simple syntax highlighting for Python/JS
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments (must be first)
  html = html.replace(
    /(#.*$)/gm,
    '<span class="text-[#8A8A8A]">$1</span>',
  )

  // Strings
  html = html.replace(
    /(&quot;.*?&quot;|&#039;.*?&#039;|`.*?`)/g,
    '<span class="text-[#E88B2E]">$1</span>',
  )

  // Keywords
  const keywords = [
    'import',
    'from',
    'def',
    'return',
    'if',
    'else',
    'elif',
    'for',
    'in',
    'while',
    'True',
    'False',
    'None',
    'try',
    'except',
    'async',
    'await',
    'const',
    'let',
    'var',
    'function',
    'class',
    'new',
    'this',
  ]
  const kwPattern = new RegExp(
    `\\b(${keywords.join('|')})\\b`,
    'g',
  )
  html = html.replace(kwPattern, '<span class="text-[#7BA37E]">$1</span>')

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="text-[#F27B4C]">$1</span>')

  // Functions
  html = html.replace(
    /(\w+)(?=\()/g,
    '<span class="text-[#C07BA0]">$1</span>',
  )

  return html
}

/* ──────────────────── component ──────────────────── */

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [openStep, setOpenStep] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const project = slug ? projectDetails[slug] : undefined

  const copyResume = useCallback(() => {
    if (!project) return
    navigator.clipboard.writeText(project.resumeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [project])

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpenStep(0)
    setOpenFaq(null)
    setCopied(false)
  }, [slug])

  /* ── not found ── */
  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HelpCircle className="mx-auto h-16 w-16 text-[#E5E0D5] mb-4" />
          <h1 className="font-display text-3xl font-bold text-[#2A2A2A] mb-4">
            项目未找到
          </h1>
          <p className="text-[#8A8A8A] mb-8">
            抱歉，我们找不到你访问的项目。请检查链接是否正确。
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目列表
          </Link>
        </motion.div>
      </div>
    )
  }

  const prevSlug = getPrevSlug(slug!)
  const nextSlug = getNextSlug(slug!)

  return (
    <div className="bg-[#F4EFE6]">
      {/* ── Hero Section ── */}
      <section className="pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4 text-xs text-[#8A8A8A]"
          >
            <Link to="/" className="hover:text-[#E88B2E] transition-colors">
              首页
            </Link>
            {' > '}
            <Link
              to="/projects"
              className="hover:text-[#E88B2E] transition-colors"
            >
              项目库
            </Link>
            {' > '}
            <span className="text-[#4A4A4A]">{project.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column */}
            <div>
              {/* Level Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
                }}
              >
                <span
                  className={`inline-block rounded-full bg-gradient-to-r ${project.levelColor} px-4 py-1 text-xs font-semibold text-white mb-4`}
                >
                  {project.levelLabel}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-4"
              >
                <span className="mr-3">{project.emoji}</span>
                {project.title}
              </motion.h1>

              {/* Meta Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF3E8] px-3 py-1 text-xs text-[#B55A00]">
                  <Clock className="h-3.5 w-3.5" />
                  {project.time}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF3E8] px-3 py-1 text-xs text-[#B55A00]">
                  <Code2 className="h-3.5 w-3.5" />
                  {project.lines}
                </span>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${project.stackColor}`}
                  >
                    {s}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[#4A4A4A] text-base leading-relaxed mb-6"
              >
                {project.description}
              </motion.p>

              {/* Why This Project */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-xl bg-[#FDF3E8] p-5 mb-6"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-[#E88B2E] mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-sm text-[#2A2A2A] mb-1">
                      为什么选这个项目
                    </h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      {project.whyThisProject}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#steps"
                  className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg hover:opacity-90"
                >
                  开始跟着做
                </a>
                {project.githubProjects.length > 0 && (
                  <a
                    href={`https://github.com/${project.githubProjects[0].name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#4A4A4A] border border-[#E5E0D5] bg-white transition-all duration-300 hover:border-[#E88B2E] hover:text-[#E88B2E]"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    查看GitHub示例
                  </a>
                )}
              </motion.div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg bg-[#2A2A2A]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 md:h-80 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.4,
                  ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
                }}
                className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-md px-4 py-2 text-sm font-medium text-[#2A2A2A]"
              >
                <span className="text-[#E88B2E] font-bold">{project.lines}</span>{' '}
                行代码
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.0,
                  duration: 0.4,
                  ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
                }}
                className="absolute -top-4 -right-4 bg-white rounded-lg shadow-md px-4 py-2 text-sm font-medium text-[#2A2A2A]"
              >
                <Clock className="inline h-3.5 w-3.5 text-[#E88B2E] mr-1" />
                {project.time}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Prerequisites Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              前置知识检查清单
            </h2>
            <div className="space-y-3">
              {project.prerequisites.map((pre, i) => (
                <motion.div
                  key={pre}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F0E9]">
                    <svg
                      className="h-3.5 w-3.5 text-[#7BA37E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-[#4A4A4A]">{pre}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Steps Section ── */}
      <section id="steps" className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl font-bold text-[#2A2A2A] mb-6">
              分步实现指南
            </h2>

            <div className="space-y-4">
              {project.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-xl border border-[#E5E0D5] bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenStep(openStep === i ? null : i)
                    }
                    className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[#FDF9F3]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#E88B2E] to-[#B55A00] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-[#2A2A2A]">
                        {step.title}
                      </h3>
                      <span className="text-xs text-[#8A8A8A]">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {step.time}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-[#8A8A8A] transition-transform duration-300 ${
                        openStep === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openStep === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#E5E0D5] p-5">
                          {/* Code Block */}
                          <div className="relative mb-4 rounded-lg bg-[#2A2A2A] p-4 overflow-x-auto">
                            <pre
                              className="font-mono text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: highlightCode(step.code),
                              }}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                navigator.clipboard.writeText(step.code)
                              }}
                              className="absolute right-3 top-3 rounded-md bg-white/10 p-1.5 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                              title="复制代码"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                          {/* Explanation */}
                          <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            {step.explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Concepts Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              涉及的关键概念
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {project.keyConcepts.map((concept, i) => (
                    <motion.tr
                      key={concept.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className={
                        i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'
                      }
                    >
                      <td className="py-3 px-4 font-mono text-sm font-bold text-[#2A2A2A] whitespace-nowrap">
                        {concept.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#4A4A4A]">
                        {concept.description}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              常见错误排错
            </h2>
            <div className="space-y-3">
              {project.faq.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="rounded-lg border border-[#E5E0D5] overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === i ? null : i)
                    }
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#FDF9F3]"
                  >
                    <HelpCircle className="h-5 w-5 shrink-0 text-[#E88B2E]" />
                    <span className="flex-1 text-sm font-semibold text-[#2A2A2A]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#8A8A8A] transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#E5E0D5] px-4 py-4 flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 shrink-0 text-[#7BA37E] mt-0.5" />
                          <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Resume Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-[#E8F0E9] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-[#7BA37E]" />
              <h2 className="font-display text-xl font-semibold text-[#2A2A2A]">
                简历写法建议
              </h2>
            </div>
            <div className="rounded-lg bg-white border border-[#E5E0D5] p-5 mb-4">
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                {project.resumeText}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.resumeTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-[#E8F0E9] px-3 py-1 text-xs font-medium text-[#5C8A5F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={copyResume}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  复制到剪贴板
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── GitHub Projects Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              关联的GitHub项目
            </h2>
            <div className="space-y-3">
              {project.githubProjects.map((gp, i) => (
                <motion.a
                  key={gp.name}
                  href={`https://github.com/${gp.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 rounded-lg border border-[#E5E0D5] p-4 transition-all duration-200 hover:border-[#E88B2E] hover:shadow-md"
                >
                  <Github className="h-6 w-6 shrink-0 text-[#8A8A8A]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#2A2A2A] truncate">
                        {gp.name}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-[#FDF3E8] px-2 py-0.5 text-xs text-[#B55A00]">
                        <Star className="mr-1 h-3 w-3" />
                        {gp.stars}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">
                      {gp.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#8A8A8A]" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Extension Challenges Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              扩展挑战（由易到难）
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E0D5]">
                    <th className="py-2 px-3 text-left text-xs font-semibold text-[#8A8A8A] w-24">
                      难度
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-semibold text-[#8A8A8A]">
                      挑战
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-semibold text-[#8A8A8A]">
                      你将学到
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.extensions.map((ext, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className={`${
                        i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'
                      } transition-colors hover:bg-[#FDF9F3]`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < ext.level
                                  ? 'text-[#E88B2E] fill-[#E88B2E]'
                                  : 'text-[#E5E0D5]'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm text-[#2A2A2A]">
                        {ext.text}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center rounded-full bg-[#E8F0E9] px-2.5 py-0.5 text-xs text-[#5C8A5F]">
                          {ext.skill}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom Navigation ── */}
      <section className="py-8 pb-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevSlug ? (
              <Link
                to={`/projects/${prevSlug}`}
                className="flex items-center gap-2 rounded-full border border-[#E5E0D5] bg-white px-5 py-2.5 text-sm text-[#4A4A4A] transition-all duration-300 hover:border-[#E88B2E] hover:text-[#E88B2E]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>
                  {projectDetails[prevSlug].emoji}{' '}
                  {projectDetails[prevSlug].title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            <Link
              to="/projects"
              className="text-sm text-[#8A8A8A] hover:text-[#E88B2E] transition-colors"
            >
              返回项目列表
            </Link>
            {nextSlug ? (
              <Link
                to={`/projects/${nextSlug}`}
                className="flex items-center gap-2 rounded-full border border-[#E5E0D5] bg-white px-5 py-2.5 text-sm text-[#4A4A4A] transition-all duration-300 hover:border-[#E88B2E] hover:text-[#E88B2E]"
              >
                <span>
                  {projectDetails[nextSlug].emoji}{' '}
                  {projectDetails[nextSlug].title}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
