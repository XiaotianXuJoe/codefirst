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
  Folder,
  Download,
  FileArchive,
  Terminal,
  Globe,
  Package,
  Play,
} from 'lucide-react'
import FileTree from '../components/FileTree'
import CodeBlockWithHeader from '../components/CodeBlockWithHeader'
import StepFileTree from '../components/StepFileTree'
import {
  getProjectTemplate,
  hasTemplate,
  generateFullCodeZip,
  generateSkeletonZip,
  downloadBlob,
} from '../data/project-templates'

/* ───────────────────────── types ───────────────────────── */

interface Step {
  title: string
  time: string
  code: string
  explanation: string
  filename: string
  filepath?: string
  lineRange?: string
  action: 'new-file' | 'new-function' | 'modify' | 'replace'
  description?: string
}

interface FileNode {
  name: string
  type: 'folder' | 'file-core' | 'file-config' | 'file-doc' | 'file-data'
  description?: string
  analogy?: string
  required: boolean
  children?: FileNode[]
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

interface ResumePoint {
  title: string
  content: string
}

interface InterviewFocus {
  question: string
  direction: string
}

interface ResumeSection {
  projectName: string
  points: ResumePoint[]
  interviewFocus: InterviewFocus[]
  preparation: string[]
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
  resumeSection: ResumeSection
  steps: Step[]
  keyConcepts: KeyConcept[]
  faq: FAQItem[]
  githubProjects: GitHubProject[]
  extensions: Extension[]
  fileStructure: FileNode[]
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
    resumeSection: {
      projectName: '个人密码生成器',
      points: [
        {
          title: '项目概述',
          content: '使用 Python 内置 random/string 库开发命令行密码生成工具，支持自定义长度、包含字符类型（大小写字母、数字、特殊符号），并提供密码强度评估功能。',
        },
        {
          title: '核心功能实现',
          content: '通过 random.choice() 实现密码随机生成，利用 string 模块预定义字符集，使用条件判断和循环控制密码复杂度，采用命令行交互获取用户输入。',
        },
        {
          title: '技术亮点',
          content: '纯标准库实现，无需第三方依赖；支持密码强度实时评估（弱/中/强）；可重复生成直到用户满意；代码简洁，适合作为 Python 入门项目展示基础语法掌握程度。',
        },
      ],
      interviewFocus: [
        {
          question: 'random 模块的随机性如何保证安全性？',
          direction: '区分 random 和 secrets 模块：random 是伪随机，不适合安全场景；secrets 使用系统熵源，适合密码生成。可回答如何改进为安全密码生成器。',
        },
        {
          question: '密码强度评估的标准是什么？',
          direction: '从长度、字符集多样性、熵值等角度回答。可扩展讨论 zxcvbn 等开源库的实现原理。',
        },
        {
          question: '如果用户要求生成 1000 个不重复的密码，你会怎么优化？',
          direction: '讨论集合去重、生成效率、内存占用，以及当密码空间不足时的处理策略。',
        },
      ],
      preparation: [
        '了解 random 与 secrets 模块的区别，能解释伪随机和真随机的应用场景',
        '熟悉密码学基本概念：熵、字符集、密码空间',
        '思考项目扩展方向：GUI界面、密码管理器、浏览器插件',
        '准备展示代码中的异常处理（如用户输入非数字时的处理）',
      ],
    },
    steps: [
      {
        title: '导入模块，定义字符集合',
        time: '15分钟',
        code: `import random\nimport string\n\n# 定义四种字符集\nlowercase = string.ascii_lowercase\nuppercase = string.ascii_uppercase\ndigits = string.digits\nsymbols = string.punctuation`,
        explanation:
          '导入random和string两个内置模块。string模块提供了预设的字符集合，避免手写a-z、A-Z等。',
        filename: 'main.py',
        filepath: 'password-generator/',
        lineRange: '第1-10行',
        action: 'new-file' as const,
        description: '导入random和string模块，定义四种子符集',
      },
      {
        title: '实现密码生成函数',
        time: '20分钟',
        code: `def generate_password(length=12, use_upper=True, use_digits=True, use_symbols=True):\n    chars = lowercase\n    if use_upper:   chars += uppercase\n    if use_digits:  chars += digits\n    if use_symbols: chars += symbols\n    \n    password = ''.join(random.choice(chars) for _ in range(length))\n    return password`,
        explanation:
          '根据用户的选择拼接字符集，然后用random.choice从字符集中随机选取指定数量的字符，最后拼接成字符串。',
        filename: 'main.py',
        filepath: 'password-generator/',
        lineRange: '第12-20行',
        action: 'new-function' as const,
        description: '根据用户选择拼接字符集，随机选取字符生成密码',
      },
      {
        title: '实现强度检测函数',
        time: '20分钟',
        code: `def check_strength(password):\n    score = 0\n    if len(password) >= 8:  score += 1\n    if len(password) >= 12: score += 1\n    if any(c.isupper() for c in password): score += 1\n    if any(c.isdigit() for c in password): score += 1\n    if any(c in symbols for c in password): score += 1\n    \n    if score <= 2: return "弱"\n    if score <= 3: return "中"\n    return "强"`,
        explanation:
          '从长度、大写字母、数字、符号四个维度评分，根据总分返回弱/中/强的评级。',
        filename: 'main.py',
        filepath: 'password-generator/',
        lineRange: '第22-32行',
        action: 'new-function' as const,
        description: '从长度、大写字母、数字、符号四个维度评分',
      },
      {
        title: '主菜单循环',
        time: '15分钟',
        code: `def main():\n    while True:\n        print("\\n=== 密码生成器 ===")\n        print("1. 生成密码")\n        print("2. 检测密码强度")\n        print("3. 退出")\n        choice = input("请选择: ")\n        \n        if choice == "1":\n            length = int(input("密码长度: ") or "12")\n            pwd = generate_password(length)\n            print(f"生成密码: {pwd}")\n            print(f"强度: {check_strength(pwd)}")\n        elif choice == "2":\n            pwd = input("输入密码: ")\n            print(f"强度: {check_strength(pwd)}")\n        else:\n            break\n\nif __name__ == "__main__":\n    main()`,
        explanation:
          '用while True创建循环菜单，根据用户选择调用不同功能。input()获取用户输入，if-elif处理不同选项。',
        filename: 'main.py',
        filepath: 'password-generator/',
        lineRange: '第34-55行',
        action: 'modify' as const,
        description: '整合所有功能，添加输入验证和循环菜单',
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
    fileStructure: [
      { name: 'password-generator', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'main.py', type: 'file-core', description: '程序入口，包含菜单循环和用户交互', analogy: '就像餐厅的前台，客人一来先到这里', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档，介绍项目功能和使用方法', analogy: '就像餐厅的菜单，告诉别人你有什么', required: false }
      ]}
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
    resumeSection: {
      projectName: '命令行天气查询工具',
      points: [
        {
          title: '项目概述',
          content: '基于 Python requests 库调用第三方天气 API，实现命令行天气查询工具。支持城市名称输入、JSON 数据解析、格式化输出，并包含完整的异常处理机制。',
        },
        {
          title: '核心功能实现',
          content: '构造 HTTP GET 请求并添加 API Key 认证；解析 JSON 响应提取温度、湿度、天气状况等字段；使用 argparse 实现命令行参数解析；封装为模块化函数便于复用。',
        },
        {
          title: '技术亮点',
          content: '完整的 API 调用链路实践：请求构造 → 发送 → 响应处理 → 错误处理；理解 HTTP 状态码含义（200/401/404/429）；JSON 数据解析与格式化输出；环境变量管理 API Key。',
        },
      ],
      interviewFocus: [
        {
          question: 'API Key 应该如何安全存储？',
          direction: '强调环境变量方式，避免硬编码；提及 .env 文件和 .gitignore 配合；生产环境可使用密钥管理服务（AWS Secrets Manager / Vault）。',
        },
        {
          question: '如果 API 响应超时或不可用，你的程序会怎么处理？',
          direction: '讨论超时设置（requests timeout）、重试机制（指数退避）、降级策略（返回缓存数据或友好提示）。',
        },
        {
          question: '如何处理 API 返回的大量数据，只提取需要的字段？',
          direction: 'JSON 解析技巧：字典 get() 方法、嵌套字段安全访问、数据验证（schema validation）。',
        },
      ],
      preparation: [
        '理解 HTTP 协议基础：GET/POST、Headers、Status Code、JSON 格式',
        '熟悉 requests 库的高级用法：timeout、重试、Session 复用',
        '了解 RESTful API 设计原则和认证方式（API Key / OAuth / JWT）',
        '思考如何扩展：多城市批量查询、历史数据存储、定时任务',
      ],
    },
    steps: [
      {
        title: '安装requests库',
        time: '10分钟',
        code: '# 在终端运行\npip install requests',
        explanation:
          'requests是Python最流行的HTTP库，让API调用变得简单。',
        filename: 'main.py',
        filepath: 'weather-cli/',
        lineRange: '第1-2行',
        action: 'new-file' as const,
        description: '创建主程序文件，开始编写代码',
      },
      {
        title: '发送第一个API请求',
        time: '20分钟',
        code: `import requests\n\ndef get_weather(city):\n    url = f"https://wttr.in/{city}?format=%C|%t|%h"\n    try:\n        response = requests.get(url, timeout=5)\n        response.raise_for_status()\n        return response.text\n    except requests.RequestException as e:\n        return f"请求失败: {e}"`,
        explanation:
          '使用requests.get()发送HTTP GET请求。timeout参数防止请求卡住。raise_for_status()检查HTTP错误码。',
        filename: 'weather.py',
        filepath: 'weather-cli/',
        lineRange: '第1-10行',
        action: 'new-file' as const,
        description: '实现天气查询核心逻辑，调用API获取数据',
      },
      {
        title: '解析和格式化数据',
        time: '30分钟',
        code: `def parse_weather(raw_text):\n    parts = raw_text.strip().split("|")\n    if len(parts) >= 3:\n        return {\n            "condition": parts[0],\n            "temperature": parts[1],\n            "humidity": parts[2]\n        }\n    return None\n\ndef display_weather(data, city):\n    if data is None:\n        print("无法解析天气数据")\n        return\n    print(f"\\n🌍 {city} 的当前天气:")\n    print(f"  天气状况: {data['condition']}")\n    print(f"  温度: {data['temperature']}")\n    print(f"  湿度: {data['humidity']}")`,
        explanation:
          '将API返回的管道分隔文本解析为字典，然后用格式化输出展示。',
        filename: 'formatter.py',
        filepath: 'weather-cli/',
        lineRange: '第1-16行',
        action: 'new-file' as const,
        description: '数据格式化，将API原始数据转成可读格式',
      },
      {
        title: '主程序整合',
        time: '20分钟',
        code: `from weather import get_weather\nfrom formatter import parse_weather, display_weather\n\ndef main():\n    print("=== 命令行天气查询 ===")\n    while True:\n        city = input("\\n请输入城市名 (或输入'退出'): ").strip()\n        if city in ["退出", "quit", "q"]:\n            break\n        if not city:\n            print("城市名不能为空")\n            continue\n        \n        raw = get_weather(city)\n        if raw.startswith("请求失败"):\n            print(raw)\n        else:\n            data = parse_weather(raw)\n            display_weather(data, city)\n\nif __name__ == "__main__":\n    main()`,
        explanation:
          '整合所有功能，添加输入验证和循环菜单。用.strip()去除首尾空格，防止空输入。',
        filename: 'main.py',
        filepath: 'weather-cli/',
        lineRange: '第1-22行',
        action: 'modify' as const,
        description: '整合所有功能，添加输入验证和循环菜单',
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
    fileStructure: [
      { name: 'weather-cli', type: 'folder', required: true, children: [
        { name: 'main.py', type: 'file-core', description: '程序入口，包含菜单循环', analogy: '餐厅前台', required: true },
        { name: 'weather.py', type: 'file-core', description: '天气查询核心逻辑，调用API获取数据', analogy: '后厨，实际做菜的地方', required: true },
        { name: 'formatter.py', type: 'file-core', description: '数据格式化，将API原始数据转成可读格式', analogy: '摆盘师，让菜看起来更好看', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false },
        { name: 'requirements.txt', type: 'file-config', description: '依赖清单，记录需要安装的第三方库', analogy: '采购清单', required: true }
      ]}
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
    resumeSection: {
      projectName: '文件批量重命名工具',
      points: [
        {
          title: '项目概述',
          content: '使用 Python os/pathlib 模块开发文件批量重命名工具，支持按序号、日期、前缀/后缀等规则批量处理，提供预览模式避免误操作，具备撤销功能。',
        },
        {
          title: '核心功能实现',
          content: '使用 os.listdir() / Path.glob() 扫描目录；利用 os.rename() / Path.rename() 执行重命名；通过正则表达式提取和替换文件名中的特定模式；实现预览-确认-执行的安全操作流程。',
        },
        {
          title: '技术亮点',
          content: '文件系统操作的安全实践：预览模式防止误操作；撤销功能记录原始文件名；支持递归处理子目录；跨平台路径处理（pathlib 替代 os.path）。',
        },
      ],
      interviewFocus: [
        {
          question: '如果重命名过程中途出错，如何保证数据不丢失？',
          direction: '讨论原子操作、事务性处理、备份策略。可提及先复制再删除而非直接重命名，或维护操作日志支持回滚。',
        },
        {
          question: 'os.path 和 pathlib 有什么区别？为什么推荐 pathlib？',
          direction: 'pathlib 是面向对象的路径处理，支持链式调用，自动处理不同操作系统的路径分隔符，代码更简洁优雅。',
        },
        {
          question: '处理上万个文件时，如何优化性能？',
          direction: '讨论生成器替代列表（内存优化）、多线程/多进程并发、批量操作减少系统调用次数、进度条反馈用户体验。',
        },
      ],
      preparation: [
        '熟练掌握 os 和 pathlib 模块的文件/目录操作方法',
        '理解 Python 的正则表达式（re 模块）在文本处理中的应用',
        '了解文件系统的基本操作原理：原子性、锁、权限',
        '思考扩展方向：GUI界面（tkinter/PyQt）、文件去重、批量格式转换',
      ],
    },
    steps: [
      {
        title: '列出文件夹中的文件',
        time: '15分钟',
        code: `import os\nfrom pathlib import Path\n\ndef list_files(folder_path):\n    path = Path(folder_path)\n    if not path.exists():\n        print("文件夹不存在!")\n        return []\n    \n    files = [f for f in path.iterdir() if f.is_file()]\n    return files`,
        explanation:
          '使用pathlib.Path处理文件路径，iterdir()遍历目录，is_file()过滤只保留文件（排除子文件夹）。',
        filename: 'main.py',
        filepath: 'file-renamer/',
        lineRange: '第1-10行',
        action: 'new-file' as const,
        description: '导入模块，实现列出文件夹文件功能',
      },
      {
        title: '实现重命名函数',
        time: '30分钟',
        code: `def add_prefix(files, prefix):\n    for f in files:\n        new_name = prefix + f.name\n        new_path = f.parent / new_name\n        f.rename(new_path)\n        print(f"{f.name} -> {new_name}")\n\ndef rename_with_index(files, prefix="file"):\n    for index, f in enumerate(files, start=1):\n        ext = f.suffix\n        new_name = f"{prefix}_{index:03d}{ext}"\n        new_path = f.parent / new_name\n        f.rename(new_path)\n        print(f"{f.name} -> {new_name}")`,
        explanation:
          'f.parent获取父目录，f.suffix获取扩展名。{index:03d}格式化为001, 002等三位数字。',
        filename: 'renamer.py',
        filepath: 'file-renamer/',
        lineRange: '第1-14行',
        action: 'new-file' as const,
        description: '重命名核心逻辑：添加前缀和按序号重命名',
      },
      {
        title: '实现替换功能和预览模式',
        time: '30分钟',
        code: `def replace_in_name(files, old, new):\n    for f in files:\n        if old in f.name:\n            new_name = f.name.replace(old, new)\n            new_path = f.parent / new_name\n            f.rename(new_path)\n            print(f"{f.name} -> {new_name}")\n\ndef preview_changes(files, operation, **kwargs):\n    print("\\n=== 预览模式 ===")\n    print("以下文件将被重命名:")\n    for f in files:\n        if operation == "prefix":\n            new_name = kwargs["prefix"] + f.name\n        print(f"  {f.name}  ->  {new_name}")\n    \n    confirm = input("\\n确认执行? (y/n): ").lower()\n    return confirm == 'y'`,
        explanation:
          '预览模式先展示将要进行的修改，让用户确认后再执行。这是防止误操作的重要设计。',
        filename: 'renamer.py',
        filepath: 'file-renamer/',
        lineRange: '第16-30行',
        action: 'modify' as const,
        description: '添加字符串替换和预览确认功能',
      },
      {
        title: '主菜单',
        time: '15分钟',
        code: `def main():\n    print("=== 文件批量重命名工具 ===")\n    folder = input("请输入文件夹路径: ")\n    files = list_files(folder)\n    \n    if not files:\n        print("没有找到文件")\n        return\n    \n    print(f"\\n找到 {len(files)} 个文件")\n    print("\\n1. 添加前缀\\n2. 按序号重命名\\n3. 替换文件名中的文字")\n    \n    choice = input("请选择操作: ")\n    if choice == "1":\n        prefix = input("输入前缀: ")\n        if preview_changes(files, "prefix", prefix=prefix):\n            add_prefix(list_files(folder), prefix)\n    # ... 其他选项`,
        explanation:
          '整合所有功能，添加文件存在检查和预览确认流程。注意重新获取文件列表因为路径对象在重命名后会失效。',
        filename: 'main.py',
        filepath: 'file-renamer/',
        lineRange: '第12-32行',
        action: 'modify' as const,
        description: '整合所有功能，添加文件存在检查和预览确认流程',
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
      { q: '隐藏文件被修改', a: "没有过滤隐藏文件。加条件 not f.name.startswith('.')。" },
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
    fileStructure: [
      { name: 'file-renamer', type: 'folder', required: true, children: [
        { name: 'main.py', type: 'file-core', description: '程序入口，菜单和预览确认', analogy: '前台接待', required: true },
        { name: 'renamer.py', type: 'file-core', description: '重命名核心逻辑', analogy: '加工厂', required: true },
        { name: 'test_folder', type: 'folder', description: '测试用文件夹（可自己创建）', required: false },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
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
    resumeSection: {
      projectName: 'GitHub 用户资料查询站',
      points: [
        {
          title: '项目概述',
          content: '纯前端实现 GitHub 用户资料查询页面，调用 GitHub REST API 获取用户公开信息，展示个人资料卡片、仓库列表、关注统计。使用原生 HTML/CSS/JavaScript 实现，无框架依赖。',
        },
        {
          title: '核心功能实现',
          content: '使用 Fetch API 发送异步 HTTP 请求；DOM 操作动态渲染用户资料和仓库列表；响应式 CSS 布局适配不同屏幕；GitHub API 速率限制处理和错误提示。',
        },
        {
          title: '技术亮点',
          content: '原生技术栈展示前端基础能力：理解 DOM 树结构、事件冒泡/捕获、CSS Flexbox/Grid 布局；异步编程实践（Promise/async-await）；REST API 数据绑定到视图层。',
        },
      ],
      interviewFocus: [
        {
          question: 'Fetch API 和 XMLHttpRequest 有什么区别？',
          direction: 'Fetch 基于 Promise，API 更现代简洁；XHR 兼容性好但回调地狱。Fetch 需要手动处理 HTTP 错误（!response.ok），XHR 自动抛错。',
        },
        {
          question: 'GitHub API 有速率限制，你的页面怎么处理？',
          direction: '讨论未认证请求限制（60次/小时），添加用户提示；缓存策略（localStorage 缓存结果）；错误状态码处理（403/404）。',
        },
        {
          question: '如果 API 返回的数据量很大，如何优化页面渲染性能？',
          direction: '虚拟列表（只渲染可见区域）、分页加载、骨架屏优化感知性能、防抖搜索减少请求次数。',
        },
      ],
      preparation: [
        '深入理解 DOM API：querySelector、createElement、appendChild、事件监听',
        '掌握 CSS 布局：Flexbox、Grid、响应式媒体查询',
        '理解 JavaScript 异步：Promise、async/await、事件循环',
        '了解浏览器同源策略和 CORS，以及 JSONP/代理等跨域解决方案',
      ],
    },
    steps: [
      {
        title: 'HTML结构',
        time: '30分钟',
        code: `<div class="search-box">\n  <input type="text" id="username" placeholder="输入GitHub用户名...">\n  <button onclick="searchUser()">查询</button>\n</div>\n<div id="profile" class="profile-card" style="display:none;">\n  <img id="avatar" src="" alt="头像">\n  <h2 id="name"></h2>\n  <p id="bio"></p>\n  <div class="stats">\n    <span>仓库: <b id="repos"></b></span>\n    <span>粉丝: <b id="followers"></b></span>\n  </div>\n  <a id="link" href="#" target="_blank">查看GitHub主页</a>\n</div>`,
        explanation:
          '构建基本的HTML骨架。input获取用户输入，button触发搜索，profile-card展示结果。',
        filename: 'index.html',
        filepath: 'github-profile/',
        lineRange: '第10-25行',
        action: 'new-file' as const,
        description: '网页结构，包含搜索框和资料卡片',
      },
      {
        title: 'CSS样式',
        time: '45分钟',
        code: `/* 核心样式 */\n.profile-card {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.1);\n}\n.profile-card img {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n}\n.stats {\n  display: flex;\n  gap: 24px;}`,
        explanation:
          '用flexbox布局，border-radius做圆角，box-shadow添加阴影。白色卡片在灰色背景上突出。',
        filename: 'style.css',
        filepath: 'github-profile/',
        lineRange: '第1-15行',
        action: 'new-file' as const,
        description: '网页样式，让页面美观',
      },
      {
        title: 'JavaScript API调用',
        time: '45分钟',
        code: `const API_URL = 'https://api.github.com/users/';\n\nasync function searchUser() {\n    const username = document.getElementById('username').value.trim();\n    if (!username) { showError('请输入用户名'); return; }\n    \n    try {\n        const response = await fetch(API_URL + username);\n        if (response.status === 404) throw new Error('用户不存在');\n        if (!response.ok) throw new Error('请求失败');\n        \n        const data = await response.json();\n        displayProfile(data);\n    } catch (err) {\n        showError(err.message);\n    }\n}\n\nfunction displayProfile(data) {\n    document.getElementById('avatar').src = data.avatar_url;\n    document.getElementById('name').textContent = data.name || data.login;\n    document.getElementById('bio').textContent = data.bio || '暂无简介';\n    document.getElementById('repos').textContent = data.public_repos;\n    document.getElementById('followers').textContent = data.followers;\n    document.getElementById('link').href = data.html_url;\n    document.getElementById('profile').style.display = 'block';\n}`,
        explanation:
          "使用Fetch API发送异步请求，async/await让异步代码更易读。getElementById获取DOM元素，直接修改属性和内容。",
        filename: 'script.js',
        filepath: 'github-profile/',
        lineRange: '第1-28行',
        action: 'new-file' as const,
        description: '网页交互逻辑，调用API获取并展示用户资料',
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
      { name: 'bradtraversy/github-finder', stars: '~200', description: 'React 版本但核心逻辑相同：Fetch API 获取 GitHub 用户信息并展示' },
      { name: 'himanshumoral/github-profile-search', stars: '~15', description: '纯前端实现，调用 GitHub API 展示用户资料卡片' },
    ],
    extensions: [
      { level: 1, text: '展示用户的最近仓库列表', skill: 'API嵌套调用' },
      { level: 2, text: '添加搜索历史（localStorage保存）', skill: '浏览器本地存储' },
      { level: 2, text: '暗色模式切换', skill: 'CSS变量+主题切换' },
      { level: 3, text: '展示用户的贡献热力图', skill: '图片嵌入+数据处理' },
      { level: 4, text: '支持对比两个用户的数据', skill: '复杂UI布局' },
    ],
    fileStructure: [
      { name: 'github-profile', type: 'folder', required: true, children: [
        { name: 'index.html', type: 'file-core', description: '网页结构，包含搜索框和资料卡片', analogy: '房子的框架结构', required: true },
        { name: 'style.css', type: 'file-core', description: '网页样式，让页面美观', analogy: '房子的装修', required: true },
        { name: 'script.js', type: 'file-core', description: '网页交互逻辑，调用API', analogy: '房子的电路系统', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
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
    resumeSection: {
      projectName: '待办事项管理网页',
      points: [
        {
          title: '项目概述',
          content: '使用原生 JavaScript 开发功能完整的 CRUD 待办应用，支持添加、编辑、删除、标记完成、筛选（全部/进行中/已完成）。数据持久化存储在浏览器 LocalStorage，刷新页面不丢失。',
        },
        {
          title: '核心功能实现',
          content: '事件委托处理动态元素点击；LocalStorage 实现数据持久化（JSON 序列化/反序列化）；DOM 操作实现增删改查的视图更新；CSS 过渡动画提升交互体验。',
        },
        {
          title: '技术亮点',
          content: '完整的 CRUD 应用架构：数据层（LocalStorage）→ 逻辑层（状态管理）→ 视图层（DOM渲染）；理解数据驱动视图的核心思想；模块化函数设计便于维护扩展。',
        },
      ],
      interviewFocus: [
        {
          question: 'LocalStorage 有什么限制？如果数据量很大怎么办？',
          direction: '5MB 存储限制、仅支持字符串、同步阻塞主线程。大数据量可改用 IndexedDB，或结合 Service Worker 做离线缓存。',
        },
        {
          question: '如何防止 XSS 攻击？用户输入的内容直接插入 DOM 安全吗？',
          direction: '必须使用 textContent 而非 innerHTML；对用户输入做转义处理；了解 XSS 攻击原理和防御手段（CSP、输入过滤、输出编码）。',
        },
        {
          question: '如果要在多台设备间同步待办数据，你会怎么设计？',
          direction: '引入后端和数据库（REST API + 数据库）；用户认证（JWT/Session）；实时同步（WebSocket / SSE）；冲突解决策略（最后写入优先 / CRDT）。',
        },
      ],
      preparation: [
        '深入理解浏览器存储：LocalStorage、SessionStorage、IndexedDB、Cookie 的区别和适用场景',
        '掌握事件委托、事件冒泡/捕获机制',
        '了解前端安全基础：XSS、CSRF 防御',
        '思考扩展方向：React/Vue 重构、后端同步、拖拽排序、分类标签',
      ],
    },
    steps: [
      {
        title: 'HTML结构',
        time: '30分钟',
        code: `<div class="container">\n  <h1>✅ 待办事项</h1>\n  <div class="input-area">\n    <input type="text" id="taskInput" placeholder="添加新任务...">\n    <button onclick="addTask()">+</button>\n  </div>\n  <div class="filters">\n    <button class="filter-btn active" onclick="setFilter('all')">全部</button>\n    <button class="filter-btn" onclick="setFilter('active')">进行中</button>\n    <button class="filter-btn" onclick="setFilter('completed')">已完成</button>\n  </div>\n  <ul id="taskList"></ul>\n  <div class="stats" id="stats"></div>\n</div>`,
        explanation:
          '构建完整HTML骨架：输入区域、筛选按钮、任务列表、统计区域。',
        filename: 'index.html',
        filepath: 'todo-app/',
        lineRange: '第10-25行',
        action: 'new-file' as const,
        description: '网页结构：输入框、筛选按钮、任务列表',
      },
      {
        title: 'CSS样式（核心）',
        time: '45分钟',
        code: `/* 核心样式 */\n#taskList li {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  border-bottom: 1px solid #f0f0f0;\n  gap: 10px;\n}\n#taskList li span.completed {\n  text-decoration: line-through;\n  color: #999;\n}\n.filter-btn.active {\n  background: #667eea;\n  color: white;\n}\n.delete-btn {\n  background: none;\n  border: none;\n  color: #ff6b6b;\n  cursor: pointer;}`,
        explanation:
          '用flexbox排列任务项，.completed类添加删除线效果，.active类高亮当前筛选按钮。',
        filename: 'style.css',
        filepath: 'todo-app/',
        lineRange: '第1-18行',
        action: 'new-file' as const,
        description: '网页样式：卡片、按钮、完成任务划线效果',
      },
      {
        title: 'JavaScript核心逻辑',
        time: '90分钟',
        code: `let tasks = [];\nlet currentFilter = 'all';\n\nfunction loadTasks() {\n  const saved = localStorage.getItem('todo_tasks');\n  if (saved) tasks = JSON.parse(saved);\n  render();\n}\nfunction saveTasks() {\n  localStorage.setItem('todo_tasks', JSON.stringify(tasks));\n}\n\nfunction addTask() {\n  const input = document.getElementById('taskInput');\n  const text = input.value.trim();\n  if (!text) return;\n  tasks.push({ id: Date.now(), text, completed: false });\n  input.value = '';\n  saveTasks(); render();\n}\n\nfunction toggleTask(id) {\n  const task = tasks.find(t => t.id === id);\n  if (task) { task.completed = !task.completed; saveTasks(); render(); }\n}\n\nfunction deleteTask(id) {\n  tasks = tasks.filter(t => t.id !== id); saveTasks(); render(); }\n\nfunction render() {\n  const list = document.getElementById('taskList');\n  list.innerHTML = '';\n  let filtered = tasks;\n  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);\n  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);\n  \n  filtered.forEach(task => {\n    const li = document.createElement('li');\n    li.innerHTML = \`<input type="checkbox" \${task.completed ? 'checked' : ''} onchange="toggleTask(\${task.id})">\n      <span class="\${task.completed ? 'completed' : ''}">\${task.text}</span>\n      <button class="delete-btn" onclick="deleteTask(\${task.id})">🗑️</button>\`;\n    list.appendChild(li);\n  });\n  document.getElementById('stats').textContent = \`共 \${tasks.length} 个任务，已完成 \${tasks.filter(t => t.completed).length} 个\`;\n}`,
        explanation:
          '这是核心CRUD逻辑：loadTasks从localStorage读取，saveTasks保存，add/toggle/delete修改数据后调用render刷新UI。render根据currentFilter过滤并重新渲染列表。',
        filename: 'script.js',
        filepath: 'todo-app/',
        lineRange: '第1-45行',
        action: 'new-file' as const,
        description: '核心逻辑：CRUD操作、LocalStorage存取、筛选渲染',
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
      { name: 'himanshumoral/vanilla-js-todo-app', stars: '~50', description: 'Clean 的 Vanilla JS 实现，LocalStorage 持久化，适合对照学习' },
      { name: 'Chinchilla15/todo-list', stars: '~30', description: 'The Odin Project 作业，有项目分类、优先级、截止日期功能' },
    ],
    extensions: [
      { level: 1, text: '添加任务编辑功能（双击修改）', skill: '复杂DOM操作' },
      { level: 2, text: '任务拖拽排序', skill: 'HTML5 Drag and Drop API' },
      { level: 2, text: '添加任务优先级（高/中/低）+ 按优先级排序', skill: '数据结构+排序' },
      { level: 3, text: '添加任务截止日期，显示是否逾期', skill: 'Date对象处理' },
      { level: 4, text: '用React/Vue重写整个项目', skill: '前端框架入门' },
    ],
    fileStructure: [
      { name: 'todo-app', type: 'folder', required: true, children: [
        { name: 'index.html', type: 'file-core', description: '网页结构：输入框、筛选按钮、任务列表', analogy: '房屋框架', required: true },
        { name: 'style.css', type: 'file-core', description: '网页样式：卡片、按钮、完成任务划线效果', analogy: '室内装修', required: true },
        { name: 'script.js', type: 'file-core', description: '核心逻辑：CRUD操作、LocalStorage存取', analogy: '智能家居系统', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
    ],
  },
  'movie-scraper': {
    slug: 'movie-scraper',
    emoji: '🕷️',
    title: '豆瓣电影数据抓取与分析',
    level: 3,
    levelLabel: 'Level 3',
    levelColor: 'from-[#4A90D9] to-[#2E5A8C]',
    time: '5-7小时',
    lines: '~250行',
    stack: ['Python', 'requests', 'BeautifulSoup', 'pandas', 'matplotlib'],
    stackColor: 'bg-[#E3F0FC] text-[#2E5A8C]',
    prerequisites: ['Python基础语法', '列表/字典操作', '函数定义', 'pip安装包'],
    description: '抓取豆瓣电影Top250的公开数据，进行数据清洗、统计分析并生成可视化图表。涵盖完整的数据处理流水线。',
    whyThisProject: '数据工程是Python最热门的就业方向之一。这个项目涵盖了完整的数据处理流水线：抓取→清洗→存储→分析→可视化。让你第一次感受到"用数据讲故事"的力量。',
    image: '/project-movie.jpg',
    resumeText: '使用requests+BeautifulSoup实现豆瓣电影Top250数据抓取，pandas完成数据清洗与统计分析，matplotlib生成评分分布、Top10排名、年份趋势等多维可视化图表。输出结构化CSV数据集及分析报告。',
    resumeTags: ['网络爬虫', '数据分析', '数据可视化', 'pandas', 'matplotlib'],
    resumeSection: {
      projectName: '豆瓣电影数据抓取与分析',
      points: [
        {
          title: '项目概述',
          content: '使用 Python requests + BeautifulSoup 爬取豆瓣电影 Top250 数据，使用 pandas 进行数据清洗和统计分析，使用 matplotlib 生成评分分布、Top10 排名、年份趋势等多维可视化图表，输出结构化 CSV 数据集。',
        },
        {
          title: '核心功能实现',
          content: 'requests 发送 HTTP 请求并处理响应编码；BeautifulSoup 解析 HTML DOM 提取电影标题、评分、评价人数、导演等信息；分页爬取（10页×25条）并合并数据；pandas DataFrame 数据清洗（去重、类型转换、缺失值处理）；matplotlib 多子图可视化。',
        },
        {
          title: '技术亮点',
          content: '完整的爬虫工程实践：请求伪装（User-Agent/Headers）、请求间隔控制（防封策略）、防御性解析（处理缺失字段避免 AttributeError）；数据分析 Pipeline：原始数据 → 清洗 → 分析 → 可视化 → 报告。',
        },
      ],
      interviewFocus: [
        {
          question: '爬虫被封 IP 了怎么办？有哪些反反爬策略？',
          direction: '请求间隔（time.sleep + random）、User-Agent 轮换、代理 IP 池、Cookie/Session 维持、分布式爬取。强调遵守 robots.txt 和网站服务条款。',
        },
        {
          question: 'BeautifulSoup 和 XPath/lxml 有什么区别？',
          direction: 'BeautifulSoup 更灵活容错（标签不闭合也能解析），适合快速开发；lxml 基于 C 更快，XPath 表达能力强。Scrapy 框架内置 XPath/CSS Selector。',
        },
        {
          question: '如果网站改用 JavaScript 动态加载数据，你的爬虫还适用吗？',
          direction: '静态 HTML 爬虫失效，需要使用 Selenium/Playwright 模拟浏览器、或分析 API 接口直接请求 JSON 数据。对比不同方案的优缺点。',
        },
      ],
      preparation: [
        '理解 HTTP 协议细节：Headers、Cookie、Session、编码（UTF-8/GBK）',
        '熟悉 pandas 核心操作：DataFrame、groupby、merge、pivot_table',
        '掌握 matplotlib/seaborn 可视化：折线图、柱状图、饼图、热力图',
        '了解爬虫法律边界：robots.txt、频率控制、数据用途合规',
      ],
    },
    fileStructure: [
      { name: 'movie-scraper', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'scraper.py', type: 'file-core', description: '爬取逻辑：HTTP请求+HTML解析', analogy: '情报收集员，负责从网页中提取信息', required: true },
        { name: 'analyzer.py', type: 'file-core', description: '数据分析：pandas统计与计算', analogy: '数据分析师，从数据中发现规律', required: true },
        { name: 'visualizer.py', type: 'file-core', description: '图表生成：matplotlib绘制', analogy: '设计师，把数据变成好看的图表', required: true },
        { name: 'main.py', type: 'file-core', description: '入口：协调爬取→分析→可视化全流程', analogy: '项目经理，统筹安排各环节', required: true },
        { name: 'utils.py', type: 'file-core', description: '工具函数：数据清洗、保存CSV', analogy: '后勤部门，处理杂务', required: true },
        { name: 'config.py', type: 'file-config', description: '配置：目标URL、请求头、参数', analogy: '导航手册，告诉系统去哪里', required: true },
        { name: 'movies.csv', type: 'file-data', description: '生成的数据文件（运行时创建）', required: false },
        { name: 'top10.png', type: 'file-data', description: '生成的图表文件（运行时创建）', required: false },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
    ],
    steps: [
      {
        title: '配置模块：定义目标URL和请求参数',
        time: '15分钟',
        code: `# config.py - 项目配置\n\nBASE_URL = "https://movie.douban.com/top250"\nHEADERS = {\n    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"\n}\nSTART = 0\nPER_PAGE = 25\nTOTAL_PAGES = 10  # 250部电影，每页25部`,
        explanation: '将可配置的参数集中管理，方便后续修改。User-Agent模拟浏览器访问，避免被网站拒绝。',
        filename: 'config.py',
        filepath: 'movie-scraper/',
        lineRange: '第1-10行',
        action: 'new-file' as const,
        description: '定义爬取目标URL、请求头和分页参数'
      },
      {
        title: '工具模块：数据清洗与CSV保存',
        time: '20分钟',
        code: `# utils.py - 工具函数\nimport csv\nimport re\n\ndef clean_text(text: str) -> str:\n    """去除空白字符"""\n    return text.strip().replace('\\n', '').replace('\\xa0', '')\n\ndef extract_year(info: str) -> int:\n    """从电影信息中提取年份"""\n    match = re.search(r'(\\d{4})', info)\n    return int(match.group(1)) if match else 0\n\ndef save_to_csv(movies: list, filename: str = "movies.csv"):\n    """保存电影数据到CSV"""\n    if not movies:\n        print("没有数据可保存")\n        return\n    keys = movies[0].keys()\n    with open(filename, 'w', newline='', encoding='utf-8') as f:\n        writer = csv.DictWriter(f, fieldnames=keys)\n        writer.writeheader()\n        writer.writerows(movies)\n    print(f"已保存 {len(movies)} 条数据到 {filename}")`,
        explanation: '数据清洗是数据工程的核心步骤。去除空白、提取年份、统一格式，让后续分析更可靠。CSV是最通用的数据交换格式。',
        filename: 'utils.py',
        filepath: 'movie-scraper/',
        lineRange: '第1-25行',
        action: 'new-file' as const,
        description: '实现文本清洗、年份提取、CSV保存等工具函数'
      },
      {
        title: '爬取模块：HTTP请求与HTML解析',
        time: '45分钟',
        code: `# scraper.py - 爬取逻辑\nimport requests\nfrom bs4 import BeautifulSoup\nfrom config import BASE_URL, HEADERS, START, PER_PAGE, TOTAL_PAGES\nfrom utils import clean_text, extract_year\n\ndef fetch_page(start: int) -> str:\n    """获取单页HTML"""\n    url = f"{BASE_URL}?start={start}"\n    try:\n        response = requests.get(url, headers=HEADERS, timeout=10)\n        response.raise_for_status()\n        return response.text\n    except requests.RequestException as e:\n        print(f"请求失败: {e}")\n        return ""\n\ndef parse_movies(html: str) -> list:\n    """从HTML解析电影数据"""\n    soup = BeautifulSoup(html, 'html.parser')\n    items = soup.find_all('div', class_='item')\n    movies = []\n    \n    for item in items:\n        try:\n            title_el = item.find('span', class_='title')\n            if not title_el:\n                continue\n            title = clean_text(title_el.get_text())\n            \n            rating_el = item.find('span', class_='rating_num')\n            rating = float(rating_el.get_text()) if rating_el else 0.0\n            \n            star_div = item.find('div', class_='star')\n            if star_div:\n                spans = star_div.find_all('span')\n                rating_num = spans[-1].get_text() if spans else "N/A"\n            else:\n                rating_num = "N/A"\n            \n            hd_div = item.find('div', class_='hd')\n            link = hd_div.find('a')['href'] if hd_div and hd_div.find('a') else ""\n            \n            info_p = item.find('p', class_='')\n            info = info_p.get_text() if info_p else ""\n            \n            movies.append({\n                'title': title,\n                'rating': rating,\n                'rating_num': rating_num,\n                'year': extract_year(info),\n                'link': link\n            })\n        except Exception as e:\n            print(f"  ⚠️ 解析单个电影时出错，跳过: {e}")\n            continue\n    \n    return movies\n\ndef scrape_all() -> list:\n    """爬取所有页面"""\n    all_movies = []\n    for page in range(TOTAL_PAGES):\n        start = START + page * PER_PAGE\n        print(f"正在爬取第 {page + 1}/{TOTAL_PAGES} 页...")\n        html = fetch_page(start)\n        if html:\n            movies = parse_movies(html)\n            all_movies.extend(movies)\n    print(f"\\n共爬取 {len(all_movies)} 部电影")\n    return all_movies`,
        explanation: 'requests发送HTTP请求，BeautifulSoup解析HTML。每个find()调用都加了空值检查，使用.get_text()替代.text防止None错误，try/except包裹单个电影解析防止一个坏数据导致整个程序崩溃。',
        filename: 'scraper.py',
        filepath: 'movie-scraper/',
        lineRange: '第1-55行',
        action: 'new-file' as const,
        description: '使用requests+BeautifulSoup爬取豆瓣电影数据并解析HTML'
      },
      {
        title: '分析模块：数据统计与计算',
        time: '25分钟',
        code: `# analyzer.py - 数据分析\nimport pandas as pd\nfrom utils import save_to_csv\n\ndef analyze(movies: list) -> dict:\n    """分析电影数据"""\n    df = pd.DataFrame(movies)\n    \n    # 基本统计\n    stats = {\n        'total': len(df),\n        'avg_rating': round(df['rating'].mean(), 2),\n        'max_rating': df['rating'].max(),\n        'min_rating': df['rating'].min(),\n        'top_movie': df.loc[df['rating'].idxmax(), 'title'],\n    }\n    \n    # Top10电影\n    top10 = df.nlargest(10, 'rating')[['title', 'rating']].to_dict('records')\n    \n    # 评分分布\n    rating_dist = df['rating'].value_counts().sort_index().to_dict()\n    \n    # 年份统计\n    year_counts = df[df['year'] > 0]['year'].value_counts().sort_index()\n    \n    return {\n        'stats': stats,\n        'top10': top10,\n        'rating_dist': rating_dist,\n        'year_counts': year_counts.to_dict()\n    }\n\ndef print_report(result: dict):\n    """打印分析报告"""\n    s = result['stats']\n    print("\\n" + "="*40)\n    print("📊 数据分析报告")\n    print("="*40)\n    print(f"总计电影: {s['total']} 部")\n    print(f"平均评分: {s['avg_rating']} 分")\n    print(f"最高评分: {s['max_rating']} 分 —《{s['top_movie']}》")\n    print(f"最低评分: {s['min_rating']} 分")\n    print("\\n🏆 Top 10 电影:")\n    for i, m in enumerate(result['top10'], 1):\n        print(f"  {i}. {m['title']} — {m['rating']}分")\n    print("="*40)`,
        explanation: 'pandas是Python数据分析的利器。DataFrame让表格操作像Excel一样简单：mean()求平均，max()找最大，nlargest()取TopN，value_counts()统计分布。',
        filename: 'analyzer.py',
        filepath: 'movie-scraper/',
        lineRange: '第1-45行',
        action: 'new-file' as const,
        description: '使用pandas进行数据统计分析，生成Top10、评分分布、年份统计'
      },
      {
        title: '可视化模块：生成统计图表',
        time: '30分钟',
        code: `# visualizer.py - 图表生成\nimport matplotlib.pyplot as plt\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei', 'DejaVu Sans']\nplt.rcParams['axes.unicode_minus'] = False\n\ndef plot_rating_dist(dist: dict):\n    """评分分布直方图"""\n    plt.figure(figsize=(10, 5))\n    plt.bar(dist.keys(), dist.values(), color='#E88B2E', edgecolor='#B55A00')\n    plt.xlabel('评分', fontsize=12)\n    plt.ylabel('电影数量', fontsize=12)\n    plt.title('豆瓣Top250 评分分布', fontsize=14)\n    plt.tight_layout()\n    plt.savefig('rating_dist.png', dpi=150)\n    plt.close()\n    print("已保存评分分布图: rating_dist.png")\n\ndef plot_top10(top10: list):\n    """Top10电影条形图"""\n    titles = [m['title'][:10] + '...' if len(m['title']) > 10 else m['title'] for m in top10]\n    ratings = [m['rating'] for m in top10]\n    \n    plt.figure(figsize=(10, 6))\n    colors = plt.cm.YlOrRd([0.3 + 0.07 * i for i in range(10)])\n    plt.barh(range(10), ratings, color=colors)\n    plt.yticks(range(10), titles)\n    plt.xlabel('评分', fontsize=12)\n    plt.title('豆瓣Top250 评分Top10', fontsize=14)\n    plt.gca().invert_yaxis()\n    plt.tight_layout()\n    plt.savefig('top10.png', dpi=150)\n    plt.close()\n    print("已保存Top10图表: top10.png")\n\ndef plot_year_trend(years: dict):\n    """年份趋势折线图"""\n    plt.figure(figsize=(12, 5))\n    x = sorted(years.keys())\n    y = [years[k] for k in x]\n    plt.plot(x, y, marker='o', color='#4A90D9', linewidth=2)\n    plt.xlabel('年份', fontsize=12)\n    plt.ylabel('电影数量', fontsize=12)\n    plt.title('豆瓣Top250 年份分布趋势', fontsize=14)\n    plt.grid(True, alpha=0.3)\n    plt.tight_layout()\n    plt.savefig('year_trend.png', dpi=150)\n    plt.close()\n    print("已保存年份趋势图: year_trend.png")`,
        explanation: 'matplotlib是Python最流行的绘图库。bar()柱状图、barh()水平条形图、plot()折线图。set_figsize()控制尺寸，tight_layout()防止文字被截断。',
        filename: 'visualizer.py',
        filepath: 'movie-scraper/',
        lineRange: '第1-55行',
        action: 'new-file' as const,
        description: '使用matplotlib生成评分分布、Top10排名、年份趋势三张图表'
      },
      {
        title: '入口模块：协调全流程',
        time: '15分钟',
        code: `# main.py - 程序入口\nfrom scraper import scrape_all\nfrom analyzer import analyze, print_report\nfrom visualizer import plot_rating_dist, plot_top10, plot_year_trend\nfrom utils import save_to_csv\n\ndef main():\n    print("🕷️ 豆瓣电影Top250数据抓取与分析")\n    print("-" * 40)\n    \n    # Step 1: 爬取数据\n    movies = scrape_all()\n    \n    if not movies:\n        print("爬取失败，请检查网络连接")\n        return\n    \n    # Step 2: 保存原始数据\n    save_to_csv(movies)\n    \n    # Step 3: 分析数据\n    result = analyze(movies)\n    print_report(result)\n    \n    # Step 4: 生成图表\n    print("\\n📈 正在生成图表...")\n    plot_rating_dist(result['rating_dist'])\n    plot_top10(result['top10'])\n    plot_year_trend(result['year_counts'])\n    \n    print("\\n✅ 全部完成！")\n    print("输出文件: movies.csv, rating_dist.png, top10.png, year_trend.png")\n\nif __name__ == "__main__":\n    main()`,
        explanation: 'main.py是程序的"总指挥"，按顺序调用各模块：先爬取，再保存，然后分析，最后可视化。清晰的流程让代码易读易维护。',
        filename: 'main.py',
        filepath: 'movie-scraper/',
        lineRange: '第1-35行',
        action: 'new-file' as const,
        description: '协调爬取→保存→分析→可视化的完整流程'
      }
    ],
    keyConcepts: [
      { name: 'HTTP请求', description: 'requests.get()发送GET请求，headers模拟浏览器访问避免被拒绝' },
      { name: 'HTML解析', description: 'BeautifulSoup将HTML转为可查询的树结构，find/find_all定位元素' },
      { name: 'CSS选择器', description: '通过class名（如item、rating_num）定位网页中的数据位置' },
      { name: '分页爬取', description: '通过修改URL参数（如start=0,25,50...）获取多页数据' },
      { name: 'DataFrame', description: 'pandas的核心数据结构，类似Excel表格，支持筛选、排序、统计' },
      { name: 'matplotlib', description: 'Python最流行的绘图库，bar/plot/barh分别绘制柱状图、折线图、条形图' }
    ],
    faq: [
      { q: '爬取时报403 Forbidden', a: '网站拒绝了请求。检查config.py中的User-Agent是否设置，或增加请求间隔时间（time.sleep(1)）。' },
      { q: '解析不到数据', a: '网页结构可能已更新。用浏览器F12检查元素class名是否与代码中一致。' },
      { q: '图表中文显示为方块', a: '中文字体未配置。确保plt.rcParams[font.sans-serif]包含系统可用的中文字体。' },
      { q: 'movies.csv为空或乱码', a: '写入时指定encoding=utf-8，并用newline=防止空行。' }
    ],
    githubProjects: [
      { name: 'Nn1ght9z/douban-movie-scraper', stars: '~30', description: '爬取豆瓣 Top250 电影，BeautifulSoup + xlwt 导出 Excel，结构清晰' },
      { name: 'stars1324/python-ai-spider', stars: '~15', description: '爬取豆瓣电影 + DeepSeek AI 解析，包含数据分析和可视化' },
    ],
    extensions: [
      { level: 1, text: '添加请求间隔防止被封IP', skill: 'time.sleep + 随机延迟' },
      { level: 2, text: '爬取详情页获取更多字段（导演、演员、简介）', skill: '深度爬取' },
      { level: 2, text: '导出为Excel格式（openpyxl）', skill: 'Excel操作' },
      { level: 3, text: '使用asyncio异步爬取提速', skill: '异步编程' },
      { level: 4, text: '接入数据库（SQLite）存储数据', skill: '数据库入门' }
    ]
  },
  'markdown-notes': {
    slug: 'markdown-notes',
    emoji: '📝',
    title: 'Markdown笔记Web应用',
    level: 3,
    levelLabel: 'Level 3',
    levelColor: 'from-[#4A90D9] to-[#2E5A8C]',
    time: '6-8小时',
    lines: '~300行',
    stack: ['HTML', 'CSS', 'JavaScript', 'marked.js'],
    stackColor: 'bg-[#E3F0FC] text-[#2E5A8C]',
    prerequisites: ['HTML/CSS/JS基础', 'DOM操作', '事件监听', '数组操作'],
    description: '功能完整的Markdown笔记应用，支持创建/编辑/删除笔记，左右分栏实时预览，标签分类与全文搜索。',
    whyThisProject: 'TODO应用的自然进阶——从单列表到完整的编辑器+预览器。Markdown是现代开发者的必备技能，这个项目本身就是Markdown的实际应用场景。涉及组件化设计、状态管理、条件渲染等前端核心概念。',
    image: '/project-notes.jpg',
    resumeText: '独立开发Markdown笔记Web应用，实现CRUD操作、左右分栏实时预览、标签分类、全文搜索等功能。使用marked.js实现Markdown渲染，LocalStorage实现数据持久化，模块化组件设计。',
    resumeTags: ['React式组件设计', '状态管理', 'Markdown渲染', 'LocalStorage'],
    resumeSection: {
      projectName: 'Markdown 笔记 Web 应用',
      points: [
        {
          title: '项目概述',
          content: '独立开发功能完整的 Markdown 笔记 Web 应用，实现 CRUD 操作、左右分栏实时预览、标签分类、全文搜索。使用 marked.js 实现 Markdown 渲染，LocalStorage 实现数据持久化，采用模块化组件设计。',
        },
        {
          title: '核心功能实现',
          content: 'marked.js 库解析 Markdown 语法为 HTML；左右分栏实时预览（输入即时渲染）；标签系统（多标签筛选、标签云）；全文搜索（标题+内容关键词匹配）；本地存储自动保存和读取。',
        },
        {
          title: '技术亮点',
          content: '前端组件化设计思想：将编辑器、预览区、侧边栏、搜索框封装为独立模块；状态管理实践（笔记列表、当前笔记、筛选条件的状态同步）；理解数据驱动视图的核心架构。',
        },
      ],
      interviewFocus: [
        {
          question: '如何实现左右分栏的实时同步滚动？',
          direction: '计算编辑区和预览区的滚动比例映射，监听 scroll 事件同步滚动位置。或基于行号映射，将 Markdown 行号与渲染后的 DOM 元素位置关联。',
        },
        {
          question: 'marked.js 渲染的 HTML 可能存在 XSS 风险，如何处理？',
          direction: '开启 marked 的 sanitize 选项（或使用 DOMPurify）；只渲染白名单标签；对用户输入做过滤转义。',
        },
        {
          question: '如果笔记数量达到上千条，LocalStorage 性能会下降吗？',
          direction: 'LocalStorage 是同步 API，大数据量会阻塞主线程。优化方案：按需加载（分页）、IndexedDB 替代、Service Worker 后台同步、笔记压缩存储。',
        },
      ],
      preparation: [
        '深入理解前端组件化设计模式：MVC / MVVM 的区别',
        '了解 Markdown 语法规范和渲染原理（lexer → parser → renderer）',
        '掌握浏览器存储的性能特征和容量限制',
        '思考扩展方向：后端同步、多人协作（CRDT）、云端存储、导出 PDF',
      ],
    },
    fileStructure: [
      { name: 'markdown-notes', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'index.html', type: 'file-core', description: '网页入口', analogy: '房屋大门', required: true },
        { name: 'style.css', type: 'file-core', description: '全局样式：布局、颜色、动画', analogy: '房屋装修风格', required: true },
        { name: 'app.js', type: 'file-core', description: '应用主逻辑：状态管理和事件处理', analogy: '房屋的总控制中心', required: true },
        { name: 'components/', type: 'folder', description: '组件文件夹', required: true, children: [
          { name: 'Editor.js', type: 'file-core', description: '编辑器：左侧文本输入区域', analogy: '书桌', required: true },
          { name: 'Preview.js', type: 'file-core', description: '预览器：右侧Markdown渲染', analogy: '显示器', required: true },
          { name: 'Sidebar.js', type: 'file-core', description: '侧边栏：笔记列表+搜索+新建', analogy: '文件柜', required: true },
          { name: 'NoteItem.js', type: 'file-core', description: '单个笔记条目', required: true },
          { name: 'TagFilter.js', type: 'file-core', description: '标签筛选组件', required: true }
        ]},
        { name: 'utils/', type: 'folder', description: '工具函数文件夹', required: true, children: [
          { name: 'storage.js', type: 'file-core', description: 'LocalStorage读写封装', required: true },
          { name: 'markdown.js', type: 'file-core', description: 'marked.js配置和渲染', required: true },
          { name: 'search.js', type: 'file-core', description: '全文搜索逻辑', required: true }
        ]},
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
    ],
    steps: [
      {
        title: 'HTML结构：左右分栏布局',
        time: '30分钟',
        code: `<!-- index.html -->\n<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <title>Markdown笔记</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <div class="app">\n    <!-- 侧边栏 -->\n    <aside class="sidebar">\n      <div class="sidebar-header">\n        <h2>📝 我的笔记</h2>\n        <button id="newBtn">+ 新建</button>\n      </div>\n      <input type="text" id="searchInput" placeholder="🔍 搜索笔记...">\n      <div id="tagFilters"></div>\n      <ul id="noteList"></ul>\n    </aside>\n    \n    <!-- 主编辑区 -->\n    <main class="editor-area">\n      <input type="text" id="titleInput" placeholder="笔记标题">\n      <div class="split-pane">\n        <textarea id="editor" placeholder="在此输入Markdown..."></textarea>\n        <div id="preview"></div>\n      </div>\n    </main>\n  </div>\n  <script src="app.js"></script>\n</body>\n</html>`,
        explanation: '使用aside+main语义化标签。split-pane实现左右分栏，textarea用于输入，div用于预览。',
        filename: 'index.html',
        filepath: 'markdown-notes/',
        lineRange: '第1-30行',
        action: 'new-file' as const,
        description: '构建左右分栏的网页骨架：侧边栏+编辑器+预览区'
      },
      {
        title: 'CSS样式：分栏布局与美观设计',
        time: '45分钟',
        code: `/* style.css - 核心样式 */\n* { margin: 0; padding: 0; box-sizing: border-box; }\n\n.app {\n  display: flex;\n  height: 100vh;\n  font-family: -apple-system, BlinkMacSystemFont, sans-serif;\n}\n\n.sidebar {\n  width: 280px;\n  background: #f5f5f5;\n  border-right: 1px solid #ddd;\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n}\n\n.sidebar-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n#newBtn {\n  background: #E88B2E;\n  color: white;\n  border: none;\n  padding: 6px 14px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n#searchInput {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  margin-bottom: 12px;\n}\n\n#noteList {\n  list-style: none;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.note-item {\n  padding: 10px 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  margin-bottom: 4px;\n  transition: background 0.15s;\n}\n\n.note-item:hover {\n  background: #e8e8e8;\n}\n\n.note-item.active {\n  background: #E88B2E;\n  color: white;\n}\n\n.editor-area {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n#titleInput {\n  padding: 12px 20px;\n  font-size: 20px;\n  font-weight: bold;\n  border: none;\n  border-bottom: 1px solid #eee;\n  outline: none;\n}\n\n.split-pane {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n}\n\n#editor {\n  flex: 1;\n  padding: 20px;\n  border: none;\n  border-right: 1px solid #eee;\n  font-family: 'Courier New', monospace;\n  font-size: 14px;\n  line-height: 1.8;\n  resize: none;\n  outline: none;\n}\n\n#preview {\n  flex: 1;\n  padding: 20px;\n  overflow-y: auto;\n  line-height: 1.8;\n}`,
        explanation: 'flex布局实现自适应分栏。vh单位让应用占满视口高度。textarea的resize:none防止用户拖拽改变大小。',
        filename: 'style.css',
        filepath: 'markdown-notes/',
        lineRange: '第1-95行',
        action: 'new-file' as const,
        description: '使用Flexbox实现左右分栏布局，设计侧边栏和编辑区样式'
      },
      {
        title: '核心逻辑：状态管理与CRUD操作',
        time: '60分钟',
        code: `// app.js - 应用主逻辑\nlet notes = [];\nlet activeNoteId = null;\nlet filterTag = 'all';\n\n// DOM元素\nconst editor = document.getElementById('editor');\nconst preview = document.getElementById('preview');\nconst titleInput = document.getElementById('titleInput');\nconst noteList = document.getElementById('noteList');\nconst searchInput = document.getElementById('searchInput');\nconst newBtn = document.getElementById('newBtn');\n\n// 初始化\nfunction init() {\n  notes = loadNotes();\n  if (notes.length === 0) {\n    createNote();\n  }\n  activeNoteId = notes[0].id;\n  renderNoteList();\n  loadActiveNote();\n  setupEventListeners();\n}\n\n// 创建新笔记\nfunction createNote() {\n  const note = {\n    id: Date.now(),\n    title: '未命名笔记',\n    content: '# 新笔记\\n\\n开始写作...',\n    tag: '未分类',\n    updatedAt: new Date().toISOString()\n  };\n  notes.unshift(note);\n  activeNoteId = note.id;\n  saveNotes();\n  renderNoteList();\n  loadActiveNote();\n}\n\n// 保存当前笔记\nfunction saveCurrentNote() {\n  const note = notes.find(n => n.id === activeNoteId);\n  if (note) {\n    note.title = titleInput.value || '未命名';\n    note.content = editor.value;\n    note.updatedAt = new Date().toISOString();\n    saveNotes();\n    renderNoteList();\n  }\n}\n\n// 删除笔记\nfunction deleteNote(id) {\n  if (!confirm('确定删除此笔记？')) return;\n  notes = notes.filter(n => n.id !== id);\n  if (notes.length === 0) createNote();\n  if (activeNoteId === id) activeNoteId = notes[0].id;\n  saveNotes();\n  renderNoteList();\n  loadActiveNote();\n}\n\n// 加载当前笔记到编辑器\nfunction loadActiveNote() {\n  const note = notes.find(n => n.id === activeNoteId);\n  if (!note) return;\n  titleInput.value = note.title;\n  editor.value = note.content;\n  renderPreview();\n}\n\n// 渲染预览\nfunction renderPreview() {\n  preview.innerHTML = marked.parse(editor.value);\n}\n\n// 渲染笔记列表\nfunction renderNoteList() {\n  let filtered = notes;\n  \n  // 标签筛选\n  if (filterTag !== 'all') {\n    filtered = filtered.filter(n => n.tag === filterTag);\n  }\n  \n  // 搜索筛选\n  const keyword = searchInput.value.trim().toLowerCase();\n  if (keyword) {\n    filtered = filtered.filter(n =>\n      n.title.toLowerCase().includes(keyword) ||\n      n.content.toLowerCase().includes(keyword)\n    );\n  }\n  \n  // 排序：最近编辑在前\n  filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));\n  \n  noteList.innerHTML = filtered.map(note =>\n    \`<li class="note-item \${note.id === activeNoteId ? 'active' : ''}"\n        onclick="selectNote(\${note.id})"\n        oncontextmenu="event.preventDefault(); deleteNote(\${note.id})">\n      <div class="note-title">\${note.title}</div>\n      <div class="note-meta">\${note.tag} · \${formatDate(note.updatedAt)}</div>\n    </li>\`\n  ).join('');\n}\n\n// 选择笔记\nfunction selectNote(id) {\n  saveCurrentNote();\n  activeNoteId = id;\n  renderNoteList();\n  loadActiveNote();\n}\n\n// 事件监听\nfunction setupEventListeners() {\n  editor.addEventListener('input', () => {\n    saveCurrentNote();\n    renderPreview();\n  });\n  titleInput.addEventListener('input', saveCurrentNote);\n  searchInput.addEventListener('input', renderNoteList);\n  newBtn.addEventListener('click', createNote);\n}\n\n// 启动\ndocument.addEventListener('DOMContentLoaded', init);`,
        explanation: '这是整个应用的核心。状态（notes数组+activeNoteId）驱动UI渲染。每次编辑自动保存到LocalStorage。input事件实现实时预览。',
        filename: 'app.js',
        filepath: 'markdown-notes/',
        lineRange: '第1-125行',
        action: 'new-file' as const,
        description: '实现状态管理、CRUD操作、搜索筛选、实时预览等核心逻辑'
      },
      {
        title: '工具模块：Storage、Markdown渲染、搜索',
        time: '30分钟',
        code: `// utils/storage.js - LocalStorage封装\nconst STORAGE_KEY = 'markdown_notes';\n\nfunction loadNotes() {\n  try {\n    const data = localStorage.getItem(STORAGE_KEY);\n    return data ? JSON.parse(data) : [];\n  } catch {\n    return [];\n  }\n}\n\nfunction saveNotes() {\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));\n}\n\nfunction formatDate(iso) {\n  const d = new Date(iso);\n  return \`\${d.getMonth()+1}/\${d.getDate()} \${d.getHours()}:\${String(d.getMinutes()).padStart(2,'0')}\`;\n}\n\n// utils/markdown.js - marked.js配置\nmarked.setOptions({\n  breaks: true,\n  gfm: true,\n  highlight: function(code, lang) {\n    return code;\n  }\n});\n\n// 标签颜色\nconst TAG_COLORS = {\n  '工作': '#E88B2E',\n  '学习': '#4A90D9',\n  '灵感': '#7BA37E',\n  '待整理': '#8A8A8A',\n  '未分类': '#C07BA0'\n};`,
        explanation: 'storage.js封装LocalStorage操作，加try/catch防止隐私模式报错。marked.setOptions配置Markdown解析选项。',
        filename: 'utils/storage.js',
        filepath: 'markdown-notes/',
        lineRange: '第1-35行',
        action: 'new-file' as const,
        description: '封装LocalStorage读写、配置marked.js、定义标签颜色'
      }
    ],
    keyConcepts: [
      { name: '状态驱动UI', description: '数据（notes数组）变化时重新渲染界面，而不是直接操作DOM修改单个元素' },
      { name: 'LocalStorage持久化', description: '浏览器本地键值对存储，页面刷新后数据不丢失。容量约5MB' },
      { name: '实时预览', description: 'textarea的input事件触发Markdown重新渲染，实现打字即时预览' },
      { name: 'Flexbox分栏', description: 'display:flex让子元素自适应排列，flex:1占据剩余空间' },
      { name: '事件委托 vs 直接绑定', description: '动态生成的元素用onclick直接绑定，静态元素用addEventListener' },
      { name: 'Markdown语法', description: '#标题 **粗体** *斜体* `代码` [链接](url) 等标记语言' }
    ],
    faq: [
      { q: '预览不实时更新', a: '检查editor的input事件是否正确绑定到renderPreview()。确保marked.js已加载。' },
      { q: '刷新后笔记丢失', a: '检查saveNotes()是否在每次编辑后调用。确认LocalStorage未被浏览器清除。' },
      { q: 'Markdown表格渲染异常', a: 'marked.js默认支持GFM表格。确保表格语法正确（| 列1 | 列2 |）。' },
      { q: '笔记列表不显示', a: '检查renderNoteList()是否被调用。确认notes数组非空。' }
    ],
    githubProjects: [
      { name: 'mastercell85/markdown_playground', stars: '~40', description: '功能丰富的浏览器 Markdown 编辑器，Vanilla JS 实现，支持多标签页和主题' },
      { name: 'apandey-dev/markdownStudio', stars: '~25', description: '实时 Markdown 编辑器，支持 PDF 导出和零后端 URL 分享' },
    ],
    extensions: [
      { level: 1, text: 'Dark Mode 切换', skill: 'CSS变量 + 主题切换' },
      { level: 2, text: '导入/导出 Markdown 文件', skill: 'File API' },
      { level: 2, text: '笔记导出 PDF', skill: 'html2pdf.js' },
      { level: 3, text: '添加笔记分类文件夹', skill: '嵌套数据结构' },
      { level: 4, text: '接入后端 API 实现云同步', skill: '前后端交互' }
    ]
  },
  'site-monitor': {
    slug: 'site-monitor',
    emoji: '🌐',
    title: '网站状态监控工具',
    level: 3,
    levelLabel: 'Level 3',
    levelColor: 'from-[#4A90D9] to-[#2E5A8C]',
    time: '4-6小时',
    lines: '~200行',
    stack: ['Python', 'requests', 'asyncio', 'JSON配置'],
    stackColor: 'bg-[#E3F0FC] text-[#2E5A8C]',
    prerequisites: ['Python基础', '文件读写', '字典操作', 'JSON基础'],
    description: '命令行工具，批量检查多个网站的HTTP状态码和响应时间，生成彩色状态报告并保存到日志文件。',
    whyThisProject: 'DevOps/SRE方向入门项目。引入asyncio异步编程——Python高性能编程的核心。配置文件驱动设计是真实工程项目的常见模式。彩色终端输出让初学者感受到"专业工具"的成就感。',
    image: '/project-monitor.jpg',
    resumeText: '开发异步网站状态监控工具，使用asyncio实现并发HTTP检测，JSON配置文件驱动，支持响应时间测量与彩色状态报告。可配置监控目标、检查频率与超时阈值，适用于小型服务的可用性监控。',
    resumeTags: ['异步编程', 'DevOps', '配置驱动', '并发检测'],
    resumeSection: {
      projectName: '网站状态监控工具',
      points: [
        {
          title: '项目概述',
          content: '开发异步网站状态监控工具，使用 asyncio + aiohttp 实现并发 HTTP 检测，JSON 配置文件驱动监控目标，支持响应时间测量与彩色状态报告。可配置监控目标、检查频率与超时阈值，适用于小型服务的可用性监控。',
        },
        {
          title: '核心功能实现',
          content: 'asyncio 异步并发同时检测多个网站；aiohttp 发送 HTTP 请求并测量响应时间；JSON 配置文件解析监控目标列表；定时任务调度（asyncio.sleep 循环）；彩色终端输出（ANSI 颜色码）。',
        },
        {
          title: '技术亮点',
          content: '异步编程实践：理解协程、事件循环、并发与并行的区别；配置驱动设计（JSON 配置无需改代码即可增减监控目标）；可扩展的监控指标（状态码、响应时间、SSL 证书过期）。',
        },
      ],
      interviewFocus: [
        {
          question: 'asyncio 和 threading/multiprocessing 有什么区别？',
          direction: 'asyncio 是单线程协程，适合 IO 密集型（网络请求）；threading 是多线程，受 GIL 限制不适合 CPU 密集型；multiprocessing 是真并行，适合 CPU 密集型。监控工具是 IO 密集型，asyncio 最优。',
        },
        {
          question: '如果监控 1000 个网站，asyncio 的并发量有限制吗？',
          direction: '讨论连接池限制（aiohttp.TCPConnector 限制连接数）、文件描述符上限（ulimit）、内存占用。可使用信号量（asyncio.Semaphore）控制并发数。',
        },
        {
          question: '如何实现告警通知（邮件/钉钉/企业微信）？',
          direction: '监控异常时触发告警通道：smtplib 发送邮件、webhook 调用钉钉/企业微信机器人、集成第三方告警平台（PagerDuty）。讨论告警降噪（避免频繁告警）。',
        },
      ],
      preparation: [
        '深入理解 Python asyncio：事件循环、协程、Task、Future、await/async',
        '了解 aiohttp 的高级用法：连接池、超时控制、重试策略',
        '熟悉 JSON/YAML 配置文件解析和验证（jsonschema）',
        '思考扩展方向：Web 仪表盘、历史数据存储（时序数据库）、告警通知集成',
      ],
    },
    fileStructure: [
      { name: 'site-monitor', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'monitor.py', type: 'file-core', description: '核心监控逻辑：异步HTTP检查', analogy: '检测员，实际执行检查任务的人', required: true },
        { name: 'reporter.py', type: 'file-core', description: '报告生成：彩色终端+日志文件', analogy: '秘书，整理检查结果并汇报', required: true },
        { name: 'config.py', type: 'file-core', description: '配置管理：读取JSON配置', analogy: '导航手册', required: true },
        { name: 'main.py', type: 'file-core', description: '入口：命令行参数解析', analogy: '前台接待', required: true },
        { name: 'sites.json', type: 'file-config', description: '网站列表配置', required: true },
        { name: 'history.log', type: 'file-data', description: '检查结果日志（运行时创建）', required: false },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
    ],
    steps: [
      {
        title: '配置文件：定义监控目标',
        time: '10分钟',
        code: `{\n  "sites": [\n    { "name": "GitHub", "url": "https://github.com", "expected_status": 200 },\n    { "name": "百度", "url": "https://www.baidu.com", "expected_status": 200 },\n    { "name": "我的网站", "url": "https://example.com", "expected_status": 200 },\n    { "name": "测试404页面", "url": "https://httpbin.org/status/404", "expected_status": 404 }\n  ],\n  "timeout": 10,\n  "interval": 300,\n  "log_file": "history.log"\n}`,
        explanation: 'JSON格式清晰易读，name用于显示，url是检查目标，expected_status定义期望的HTTP状态码。',
        filename: 'sites.json',
        filepath: 'site-monitor/',
        lineRange: '第1-15行',
        action: 'new-file' as const,
        description: '用JSON配置定义要监控的网站列表和参数'
      },
      {
        title: '配置模块：读取和管理配置',
        time: '15分钟',
        code: `# config.py - 配置管理\nimport json\n\ndef load_config(path: str = "sites.json") -> dict:\n    """读取JSON配置文件"""\n    try:\n        with open(path, 'r', encoding='utf-8') as f:\n            return json.load(f)\n    except FileNotFoundError:\n        print(f"❌ 配置文件不存在: {path}")\n        return {\n            "sites": [],\n            "timeout": 10,\n            "interval": 300\n        }\n    except json.JSONDecodeError:\n        print(f"❌ JSON格式错误: {path}")\n        return {\n            "sites": [],\n            "timeout": 10,\n            "interval": 300\n        }\n\ndef validate_config(config: dict) -> bool:\n    """验证配置是否有效"""\n    if not config.get("sites"):\n        print("⚠️ 监控列表为空，请检查sites.json")\n        return False\n    for site in config["sites"]:\n        if "url" not in site:\n            print(f"⚠️ {site.get('name', '?')} 缺少url字段")\n            return False\n    return True`,
        explanation: '配置文件独立管理，方便修改监控目标而不动代码。添加异常处理防止配置文件缺失或格式错误导致程序崩溃。',
        filename: 'config.py',
        filepath: 'site-monitor/',
        lineRange: '第1-30行',
        action: 'new-file' as const,
        description: '读取JSON配置文件，添加异常处理和配置验证'
      },
      {
        title: '监控模块：异步HTTP检测',
        time: '35分钟',
        code: `# monitor.py - 核心监控逻辑\nimport asyncio\nimport time\nimport requests\n\nasync def check_site(session, site: dict, timeout: int) -> dict:\n    """检查单个网站状态"""\n    url = site["url"]\n    name = site.get("name", url)\n    expected = site.get("expected_status", 200)\n    \n    result = {\n        "name": name,\n        "url": url,\n        "status": None,\n        "response_time": 0,\n        "expected": expected,\n        "ok": False,\n        "error": None\n    }\n    \n    start = time.time()\n    try:\n        # 在线程池中运行同步的requests\n        loop = asyncio.get_event_loop()\n        response = await asyncio.wait_for(\n            loop.run_in_executor(None, lambda: requests.get(url, timeout=timeout)),\n            timeout=timeout + 5\n        )\n        result["status"] = response.status_code\n        result["ok"] = (response.status_code == expected)\n    except asyncio.TimeoutError:\n        result["error"] = "请求超时"\n    except requests.RequestException as e:\n        result["error"] = str(e)\n    finally:\n        result["response_time"] = round((time.time() - start) * 1000, 2)\n    \n    return result\n\nasync def check_all(config: dict) -> list:\n    """并发检查所有网站"""\n    sites = config["sites"]\n    timeout = config.get("timeout", 10)\n    \n    tasks = [check_site(None, site, timeout) for site in sites]\n    results = await asyncio.gather(*tasks, return_exceptions=True)\n    \n    # 处理异常结果\n    return [r if isinstance(r, dict) else {\n        "name": "?", "url": "?", "status": None,\n        "ok": False, "error": str(r), "response_time": 0\n    } for r in results]`,
        explanation: 'asyncio.gather并发执行多个检查任务，大幅提速。run_in_executor将同步的requests包在线程池中运行，避免阻塞事件循环。',
        filename: 'monitor.py',
        filepath: 'site-monitor/',
        lineRange: '第1-55行',
        action: 'new-file' as const,
        description: '使用asyncio实现异步并发HTTP检测，测量响应时间'
      },
      {
        title: '报告模块：彩色终端输出与日志',
        time: '25分钟',
        code: `# reporter.py - 报告生成\nfrom datetime import datetime\n\n# ANSI颜色代码\nGREEN = "\\033[32m"\nRED = "\\033[31m"\nYELLOW = "\\033[33m"\nRESET = "\\033[0m"\nBOLD = "\\033[1m"\n\ndef format_result(r: dict) -> str:\n    """格式化单个检查结果"""\n    name = r["name"]\n    url = r["url"]\n    status = r["status"]\n    ms = r["response_time"]\n    ok = r["ok"]\n    error = r["error"]\n    \n    if ok:\n        return f"{GREEN}✓{RESET} {BOLD}{name}{RESET} — {status} ({ms}ms)"\n    elif error:\n        return f"{YELLOW}◆{RESET} {BOLD}{name}{RESET} — {error}"\n    else:\n        return f"{RED}✗{RESET} {BOLD}{name}{RESET} — {status} (期望{r['expected']}) ({ms}ms)"\n\ndef print_report(results: list):\n    """打印彩色终端报告"""\n    print(f"\\n{BOLD}🌐 网站状态监控报告{RESET}")\n    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")\n    print("-" * 50)\n    \n    ok_count = sum(1 for r in results if r["ok"])\n    fail_count = len(results) - ok_count\n    \n    for r in results:\n        print(format_result(r))\n    \n    print("-" * 50)\n    print(f"总计: {len(results)} | {GREEN}正常{ok_count}{RESET} | {RED}异常{fail_count}{RESET}\\n")\n\ndef save_log(results: list, log_file: str):\n    """保存检查历史到日志"""\n    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')\n    with open(log_file, 'a', encoding='utf-8') as f:\n        f.write(f"\\n[{timestamp}]\\n")\n        for r in results:\n            status_str = "OK" if r["ok"] else (f"ERROR:{r['error']}" if r['error'] else f"FAIL:{r['status']}")\n            f.write(f"  {r['name']}: {status_str} ({r['response_time']}ms)\\n")\n    print(f"📄 日志已保存: {log_file}")`,
        explanation: 'ANSI转义码实现彩色终端输出（\\033[32m=绿色）。绿色✓正常、黄色◆超时、红色✗异常。a模式追加写入日志，保留历史记录。',
        filename: 'reporter.py',
        filepath: 'site-monitor/',
        lineRange: '第1-55行',
        action: 'new-file' as const,
        description: '使用ANSI颜色代码生成彩色终端报告，并保存检查日志'
      },
      {
        title: '入口模块：命令行参数与定时模式',
        time: '15分钟',
        code: `# main.py - 程序入口\nimport asyncio\nimport sys\nimport time\nfrom config import load_config, validate_config\nfrom monitor import check_all\nfrom reporter import print_report, save_log\n\ndef main():\n    # 解析命令行参数\n    config_path = sys.argv[1] if len(sys.argv) > 1 else "sites.json"\n    loop_mode = "--loop" in sys.argv\n    \n    # 加载配置\n    config = load_config(config_path)\n    if not validate_config(config):\n        return\n    \n    sites = config["sites"]\n    interval = config.get("interval", 300)\n    log_file = config.get("log_file", "history.log")\n    \n    print(f"📋 监控目标: {len(sites)} 个网站")\n    for s in sites:\n        print(f"   • {s['name']}: {s['url']}")\n    print(f"⏱️  超时: {config.get('timeout', 10)}s | 间隔: {interval}s")\n    if loop_mode:\n        print(f"🔄 定时模式: 每 {interval} 秒检查一次\\n")\n    \n    # 执行检查\n    while True:\n        results = asyncio.run(check_all(config))\n        print_report(results)\n        save_log(results, log_file)\n        \n        if not loop_mode:\n            break\n        \n        print(f"⏳ {interval}秒后再次检查...\\n")\n        time.sleep(interval)\n\nif __name__ == "__main__":\n    main()`,
        explanation: 'asyncio.run()启动事件循环执行异步检查。--loop参数启用定时模式。sys.argv解析命令行参数，让工具更灵活。',
        filename: 'main.py',
        filepath: 'site-monitor/',
        lineRange: '第1-40行',
        action: 'new-file' as const,
        description: '命令行参数解析，支持单次检查和定时循环模式'
      }
    ],
    keyConcepts: [
      { name: 'asyncio', description: 'Python异步编程库，用async/await实现非阻塞IO，适合并发网络请求' },
      { name: '并发 vs 并行', description: '并发是交替执行多个任务（IO等待时切换），并行是同时执行（多核CPU）。asyncio实现并发' },
      { name: 'run_in_executor', description: '将同步代码（如requests）放到线程池中运行，避免阻塞异步事件循环' },
      { name: 'ANSI颜色码', description: '终端控制字符\\033[32m设置绿色、\\033[0m重置，让输出更美观' },
      { name: '配置文件驱动', description: '将可变参数（监控目标、超时时间）放到配置文件，代码不动只改配置' },
      { name: 'HTTP状态码', description: '200正常、301/302重定向、404不存在、500服务器错误、503服务不可用' }
    ],
    faq: [
      { q: '所有网站都显示超时', a: '检查网络连接。确认config.py中的timeout值是否太小（建议>=10秒）。' },
      { q: '颜色代码显示为乱码', a: 'Windows CMD默认不支持ANSI颜色。使用Windows Terminal或PowerShell。' },
      { q: 'asyncio报错RuntimeError', a: '确保在async函数中使用await。asyncio.run()只能调用一次，不要嵌套。' },
      { q: '日志文件越来越大', a: '添加日志轮转功能，或定期清理旧日志。可用logging模块替代手写。' }
    ],
    githubProjects: [
      { name: 'kulsum842/server-status-checker', stars: '~20', description: 'Python 服务器监控脚本，支持响应时间检测和 SMTP 邮件告警' },
      { name: 'rosslh/uptime-checker', stars: '~50', description: 'CLI 工具检查 UptimeRobot 监控的网站状态，展示响应时间和可用率' },
    ],
    extensions: [
      { level: 1, text: '添加邮件告警通知', skill: 'smtplib邮件发送' },
      { level: 2, text: '历史数据可视化趋势图', skill: 'matplotlib时间序列' },
      { level: 2, text: '支持HTTP Basic Auth认证', skill: '请求头配置' },
      { level: 3, text: '导出为Prometheus exporter格式', skill: '指标暴露格式' },
      { level: 4, text: 'Web管理界面（Flask）', skill: 'Web框架入门' }
    ]
  },
  'ai-chat': {
    slug: 'ai-chat',
    emoji: '🤖',
    title: 'AI 聊天助手',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '1-2小时',
    lines: '~90行',
    stack: ['Python', 'requests库', 'DeepSeek API'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['Python基础', '函数定义', '环境变量'],
    description:
      '调用 DeepSeek API 实现命令行 AI 对话。理解大模型 API 的基本调用方式：构造请求体、发送 HTTP POST、解析 JSON 响应。',
    whyThisProject:
      '大模型时代最基础的技能。学会调用 API 后，你可以将 AI 能力集成到任何项目中。本项目让你理解 temperature、role 等核心参数的含义。',
    image: '/project-ai-chat.jpg',
    resumeText:
      '基于 DeepSeek API 开发命令行 AI 对话助手，实现 HTTP 请求构造、JSON 响应解析、API 异常处理（401/超时/网络错误），理解 temperature 等核心参数对生成效果的影响。',
    resumeTags: ['大模型 API 调用', 'Prompt 设计', '异常处理'],
    resumeSection: {
      projectName: 'AI 聊天助手',
      points: [
        {
          title: '项目概述',
          content: '基于 DeepSeek API 开发命令行 AI 对话助手，实现 HTTP 请求构造、JSON 响应解析、API 异常处理（401/超时/网络错误）。理解 temperature、role 等核心参数对生成效果的影响，掌握大模型 API 的标准调用范式。',
        },
        {
          title: '核心功能实现',
          content: '使用 requests 库发送 POST 请求到 DeepSeek API，构造包含 model、messages、temperature 的请求体；解析响应 JSON 提取 AI 回复内容；处理常见异常（401 认证失败、超时、网络错误）；实现命令行交互循环。',
        },
        {
          title: '技术亮点',
          content: '完整的大模型 API 调用链路实践：理解 REST API 请求结构、HTTP Headers（Authorization Bearer Token）、请求体格式（OpenAI 兼容格式）；异常处理覆盖网络层、HTTP 层、应用层错误；环境变量管理 API Key。',
        },
      ],
      interviewFocus: [
        {
          question: 'temperature 参数是什么？如何根据场景调整？',
          direction: 'temperature 控制采样随机性（0-2）。低 temperature（0.1-0.3）适合代码生成、分类等确定性任务；高 temperature（0.7-1.0）适合创意写作、头脑风暴。理解背后的 softmax 采样原理。',
        },
        {
          question: 'API Key 泄露了怎么办？如何安全存储？',
          direction: '立即在平台撤销并重新生成；使用环境变量而非硬编码；.env 文件加入 .gitignore；生产环境使用密钥管理服务（KMS/Vault）；前端代码绝不应包含 API Key。',
        },
        {
          question: '如果 API 响应很慢，用户体验怎么优化？',
          direction: '流式输出（SSE/streaming）让用户看到逐字生成效果；添加打字机动画提升感知体验；超时设置和重试机制；Loading 状态提示。',
        },
      ],
      preparation: [
        '理解大模型 API 的核心概念：token、context window、temperature、top_p、role',
        '熟悉 OpenAI/DeepSeek API 的请求/响应格式和错误码',
        '了解 Prompt Engineering 基础：zero-shot、few-shot、Chain-of-Thought',
        '思考扩展方向：多轮对话、流式输出、对话历史、系统提示词定制',
      ],
    },
    fileStructure: [
      { name: 'ai-chat', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'chat.py', type: 'file-core', description: '核心对话逻辑：构造请求、调用 API、处理异常', analogy: '就像餐厅的服务员，负责把客人的需求传达给后厨', required: true },
        { name: '.env.example', type: 'file-config', description: '环境变量模板，告诉用户需要填什么', analogy: '就像申请表模板', required: true },
        { name: 'requirements.txt', type: 'file-config', description: '依赖清单', analogy: '采购清单', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
    ],
    steps: [
      {
        title: '安装依赖',
        time: '10分钟',
        code: 'pip install requests python-dotenv',
        explanation:
          'requests 是 Python 最流行的 HTTP 库，python-dotenv 用于从 .env 文件加载环境变量。',
        filename: 'requirements.txt',
        filepath: 'ai-chat/',
        lineRange: '第1行',
        action: 'new-file' as const,
        description: '安装 requests 和 python-dotenv',
      },
      {
        title: '加载环境变量和配置',
        time: '10分钟',
        code: `import os\nimport requests\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\nAPI_KEY = os.getenv("DEEPSEEK_API_KEY")\nAPI_URL = "https://api.deepseek.com/chat/completions"\nMODEL = "deepseek-chat"`,
        explanation:
          'load_dotenv() 自动读取 .env 文件中的环境变量。os.getenv() 获取 API Key。将 URL 和模型名定义为常量，方便后续修改。',
        filename: 'chat.py',
        filepath: 'ai-chat/',
        lineRange: '第1-8行',
        action: 'new-file' as const,
        description: '导入模块，加载环境变量，定义 API 配置',
      },
      {
        title: '实现 chat() 函数',
        time: '30分钟',
        code: `def chat(message: str) -> str:\n    headers = {\n        "Authorization": f"Bearer {API_KEY}",\n        "Content-Type": "application/json",\n    }\n    data = {\n        "model": MODEL,\n        "messages": [{"role": "user", "content": message}],\n        "temperature": 0.7,\n    }\n    try:\n        response = requests.post(API_URL, headers=headers, json=data, timeout=30)\n        response.raise_for_status()\n        result = response.json()\n        return result["choices"][0]["message"]["content"]\n    except requests.exceptions.HTTPError as e:\n        if response.status_code == 401:\n            return "❌ API Key 无效"\n        return f"❌ API 请求失败: {e}"\n    except requests.exceptions.Timeout:\n        return "❌ 请求超时"\n    except Exception as e:\n        return f"❌ 错误: {e}"`,
        explanation:
          '构造 headers（Authorization Bearer 认证），构造 data（model/messages/temperature），处理 401/超时/通用异常。raise_for_status() 检查 HTTP 错误码，非 2xx 会抛出异常。',
        filename: 'chat.py',
        filepath: 'ai-chat/',
        lineRange: '第10-35行',
        action: 'new-function' as const,
        description: '实现 API 调用核心函数，处理各种异常情况',
      },
      {
        title: '主循环',
        time: '20分钟',
        code: `def main():\n    if not API_KEY or API_KEY == "your_api_key_here":\n        print("⚠️ 请先设置 API Key！")\n        print("  1. 复制 .env.example 为 .env")\n        print("  2. 填入你的 DeepSeek API Key")\n        sys.exit(1)\n\n    print("🤖 AI 聊天助手  (输入 'quit' 退出)")\n    print("-" * 40)\n\n    while True:\n        user_input = input("\\n你: ").strip()\n        if not user_input:\n            continue\n        if user_input.lower() in ("quit", "exit", "q"):\n            print("\\n👋 再见！")\n            break\n        print("AI: ", end="", flush=True)\n        reply = chat(user_input)\n        print(reply)\n\nif __name__ == "__main__":\n    main()`,
        explanation:
          '检查 API Key 是否已设置，while True 接收输入，调用 chat()，打印回复，支持 quit 退出。',
        filename: 'chat.py',
        filepath: 'ai-chat/',
        lineRange: '第37-60行',
        action: 'modify' as const,
        description: '整合所有功能，添加输入验证和循环菜单',
      },
    ],
    keyConcepts: [
      { name: 'API Key', description: '身份凭证，通过 Authorization 请求头传递。Never 硬编码到代码中，用环境变量管理。' },
      { name: 'temperature', description: '控制随机性，0.7 适合对话，0.2 适合精确回答。值越高回答越创意，越低越确定。' },
      { name: 'role', description: 'user（用户消息）、assistant（AI 回复）、system（设定人格的隐藏指令）。' },
      { name: 'raise_for_status()', description: '检查 HTTP 错误码，非 2xx 会抛出异常，配合 try/except 实现优雅错误处理。' },
    ],
    faq: [
      { q: "401 Unauthorized", a: 'API Key 无效或过期，检查 .env 文件中的 DEEPSEEK_API_KEY 是否正确。' },
      { q: "请求超时", a: '网络问题或 API 繁忙，增加 timeout 值或稍后重试。' },
      { q: "ModuleNotFoundError: No module named 'dotenv'", a: '未安装 python-dotenv，运行 pip install python-dotenv。' },
    ],
    githubProjects: [
      { name: 'bradtraversy/ai-chatbot', stars: '~200', description: 'Node.js 版本但核心逻辑相同：调用 OpenAI API 进行对话' },
      { name: 'himanshumoral/ai-assistant-cli', stars: '~15', description: 'Python CLI AI 助手，支持多模型切换' },
    ],
    extensions: [
      { level: 1, text: '添加对话历史记录', skill: '列表+上下文拼接' },
      { level: 2, text: '支持流式输出（SSE）', skill: '流式响应处理' },
      { level: 2, text: '添加系统提示词定制', skill: 'system role' },
      { level: 3, text: '用 Streamlit 做成 Web 界面', skill: 'Web UI 框架' }
    ]
  },
  'chat-history': {
    slug: 'chat-history',
    emoji: '💬',
    title: '带历史记忆的聊天机器人',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '2-3小时',
    lines: '~270行',
    stack: ['Python', 'requests', 'JSON文件'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['Python基础', '字典操作', '文件读写', 'JSON基础'],
    description:
      '多轮对话 + 多会话管理 + 系统提示词定制 + JSON 持久化。完整的对话系统入门。',
    whyThisProject:
      '从单轮对话升级到多轮对话，理解对话状态管理的核心概念。学习系统提示词（system prompt）如何塑造 AI 人格。掌握本地 JSON 持久化，数据不丢失。',
    image: '/project-chat-history.jpg',
    resumeText:
      '开发带历史记忆的 AI 聊天机器人，支持多会话管理、系统提示词定制、JSON 本地持久化。实现对话状态维护、上下文窗口管理、多角色消息格式。',
    resumeTags: ['对话状态管理', '数据持久化', '系统提示词'],
    resumeSection: {
      projectName: '带历史记忆的聊天机器人',
      points: [
        {
          title: '项目概述',
          content: '开发带历史记忆的 AI 聊天机器人，支持多会话管理、系统提示词定制、JSON 本地持久化。实现对话状态维护、上下文窗口管理、多角色消息格式（system/user/assistant），可切换不同 AI 人格。',
        },
        {
          title: '核心功能实现',
          content: '使用 dict 结构维护多个独立 session，每个 session 包含 messages 列表；system role 设定 AI 人格和行为；JSON 文件读写实现对话历史持久化；提供 /new /list /switch /system /personality /clear 等完整命令集。',
        },
        {
          title: '技术亮点',
          content: '对话系统的核心架构设计：会话层（多 session 管理）→ 消息层（role/content 格式）→ 持久层（JSON 序列化）；上下文窗口意识：理解 token 消耗与历史长度的关系；系统提示词工程：通过 system role 塑造 AI 行为。',
        },
      ],
      interviewFocus: [
        {
          question: '上下文窗口满了怎么办？如何管理对话历史？',
          direction: '讨论滑动窗口（保留最近 N 轮）、摘要压缩（将早期对话总结为 system prompt）、token 计数（tiktoken 估算）、超出限制时的优雅降级策略。',
        },
        {
          question: 'system prompt 和 user prompt 有什么区别？',
          direction: 'system 是全局指令（设定人格、规则），user 是具体请求。system 优先级更高，影响整个对话。可讨论 system prompt 注入攻击和防御。',
        },
        {
          question: '如果对话历史很大，JSON 文件读写性能会下降吗？',
          direction: 'JSON 文件随时间增大，读写变慢。优化方案：按 session 分文件存储、数据库替代（SQLite）、增量写入、压缩存储、定期归档。',
        },
      ],
      preparation: [
        '深入理解大模型对话格式：system / user / assistant / tool 角色的作用和区别',
        '了解 token 计数方法和上下文窗口限制（不同模型的限制不同）',
        '掌握对话管理策略：滑动窗口、摘要压缩、RAG 增强',
        '思考扩展方向：Web 界面、云端同步、语音输入、导出分享',
      ],
    },
    fileStructure: [
      { name: 'chat-history', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'chat.py', type: 'file-core', description: '核心逻辑：API调用、会话管理、交互界面', analogy: '就像餐厅的全套服务系统', required: true },
        { name: '.env.example', type: 'file-config', description: '环境变量模板', required: true },
        { name: 'requirements.txt', type: 'file-config', description: '依赖清单', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
    ],
    steps: [
      {
        title: '环境配置',
        time: '10分钟',
        code: 'pip install requests python-dotenv',
        explanation:
          '安装 requests 和 python-dotenv。复制 .env.example 为 .env 填入 Key。',
        filename: 'requirements.txt',
        filepath: 'chat-history/',
        lineRange: '第1行',
        action: 'new-file' as const,
        description: '安装依赖，配置环境变量',
      },
      {
        title: '数据持久化层',
        time: '30分钟',
        code: `import json\nimport os\nfrom datetime import datetime\n\nHISTORY_FILE = "chat_history.json"\n\ndef load_sessions() -> dict:\n    if not os.path.exists(HISTORY_FILE):\n        return {}\n    try:\n        with open(HISTORY_FILE, "r", encoding="utf-8") as f:\n            return json.load(f)\n    except:\n        return {}\n\ndef save_sessions(sessions: dict):\n    with open(HISTORY_FILE, "w", encoding="utf-8") as f:\n        json.dump(sessions, f, ensure_ascii=False, indent=2)\n\ndef create_session(sessions: dict, system_prompt: str = "") -> str:\n    sid = f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"\n    sessions[sid] = {\n        "title": f"对话 {len(sessions) + 1}",\n        "created_at": datetime.now().isoformat(),\n        "system_prompt": system_prompt or "你是一个 helpful 的 AI 助手",\n        "messages": [],\n    }\n    save_sessions(sessions)\n    return sid`,
        explanation:
          'load_sessions() 读取 chat_history.json，save_sessions() 写入，create_session() 创建新对话。JSON 格式是人类可读的文本格式。',
        filename: 'chat.py',
        filepath: 'chat-history/',
        lineRange: '第1-35行',
        action: 'new-file' as const,
        description: '实现数据持久化层：加载、保存、创建会话',
      },
      {
        title: '对话管理',
        time: '60分钟',
        code: `def chat_with_history(messages: list, system_prompt: str) -> str:\n    headers = {\n        "Authorization": f"Bearer {API_KEY}",\n        "Content-Type": "application/json",\n    }\n    full_messages = [{"role": "system", "content": system_prompt}]\n    full_messages.extend(messages)\n    data = {\n        "model": MODEL,\n        "messages": full_messages,\n        "temperature": 0.7,\n    }\n    try:\n        response = requests.post(API_URL, headers=headers, json=data, timeout=30)\n        response.raise_for_status()\n        result = response.json()\n        return result["choices"][0]["message"]["content"]\n    except Exception as e:\n        return f"❌ 错误: {e}"\n\ndef chat_loop(session_id: str, sessions: dict):\n    session = sessions[session_id]\n    print(f"\\n💬 {session['title']}")\n    print(f"输入 /help 查看命令\\n")\n    while True:\n        user_input = input("你: ").strip()\n        if not user_input:\n            continue\n        if user_input.lower() in ("quit", "exit", "q"):\n            save_sessions(sessions)\n            return "quit"\n        if user_input == "/help":\n            show_help(); continue\n        if user_input == "/new":\n            save_sessions(sessions); return "new"\n        if user_input == "/list":\n            list_sessions(sessions); continue\n        if user_input.startswith("/switch "):\n            idx = int(user_input.split()[1]) - 1\n            keys = list(sessions.keys())\n            if 0 <= idx < len(keys):\n                save_sessions(sessions); return keys[idx]\n        if user_input.startswith("/system "):\n            session["system_prompt"] = user_input[8:].strip()\n            save_sessions(sessions)\n            print("✅ 系统提示词已更新"); continue\n        if user_input == "/personality":\n            session["system_prompt"] = choose_personality()\n            save_sessions(sessions)\n            print("✅ 人格已切换\\n"); continue\n        if user_input == "/clear":\n            session["messages"] = []\n            save_sessions(sessions)\n            print("🗑️ 当前对话已清空"); continue\n        session["messages"].append({"role": "user", "content": user_input})\n        print("AI: ", end="", flush=True)\n        reply = chat_with_history(session["messages"], session["system_prompt"])\n        print(reply)\n        session["messages"].append({"role": "assistant", "content": reply})\n        save_sessions(sessions)`,
        explanation:
          'chat_with_history() 构造 system + messages 列表发送 API。chat_loop() 处理 /new /list /switch /system /personality /clear /help 命令，以及正常对话。',
        filename: 'chat.py',
        filepath: 'chat-history/',
        lineRange: '第37-120行',
        action: 'new-function' as const,
        description: '实现对话管理和命令处理',
      },
      {
        title: '人格定制',
        time: '20分钟',
        code: `def choose_personality() -> str:\n    personalities = {\n        "1": ("通用助手", "你是一个 helpful 的 AI 助手，用中文回答问题"),\n        "2": ("代码导师", "你是一位耐心的编程导师，擅长用简单的语言解释复杂的编程概念"),\n        "3": ("创意写手", "你是一位富有创意的作家，擅长各种文体的写作"),\n        "4": ("极简回答", "你是一个极简主义者，回答简洁直接，不超过3句话"),\n        "5": ("详细解释", "你是一个耐心的老师，回答详细全面，先给结论再展开"),\n    }\n    print("🎭 选择 AI 人格:")\n    for k, (name, _) in personalities.items():\n        print(f"  [{k}] {name}")\n    print("  [6] 自定义")\n    choice = input("选择: ").strip()\n    if choice == "6":\n        return input("输入自定义系统提示词: ").strip()\n    return personalities.get(choice, personalities["1"])[1]`,
        explanation:
          '提供 5 种预设人格（通用/导师/写手/极简/详细），支持自定义。系统提示词通过 system role 传递给模型，塑造 AI 的回答风格。',
        filename: 'chat.py',
        filepath: 'chat-history/',
        lineRange: '第122-140行',
        action: 'new-function' as const,
        description: '实现人格选择功能',
      },
    ],
    keyConcepts: [
      { name: 'system role', description: '设定 AI 人格和行为的隐藏指令，模型会在内部遵循但不直接展示给用户。' },
      { name: '上下文窗口', description: '历史消息越多，token 消耗越多，超出限制会报错。需要定期清理或限制历史长度。' },
      { name: '多会话', description: '用 dict 存储多个 session，每个 session 独立 messages，实现"多个聊天窗口"。' },
      { name: '持久化', description: 'JSON 文件读写实现"记忆"，退出不丢失。ensure_ascii=False 保证中文正常保存。' },
    ],
    faq: [
      { q: "上下文太长导致报错", a: '清理旧消息或限制历史长度。可只保留最近 N 轮对话。' },
      { q: "切换对话后历史丢失", a: '检查是否正确调用了 save_sessions()。确保 HISTORY_FILE 有写入权限。' },
      { q: "人格切换不生效", a: '确保 system_prompt 已更新并保存。system 只在对话开始时生效，新对话才会完全应用。' },
    ],
    githubProjects: [
      { name: 'bradtraversy/ai-chatbot', stars: '~200', description: 'React 版本但核心逻辑相同：维护对话历史列表' },
      { name: 'himanshumoral/chatgpt-cli', stars: '~30', description: 'Python CLI 多会话聊天工具，支持上下文管理' },
    ],
    extensions: [
      { level: 1, text: '添加消息数量统计', skill: '计数器' },
      { level: 2, text: '导出对话为 Markdown', skill: '文件格式化' },
      { level: 2, text: '搜索历史对话内容', skill: '字符串搜索' },
      { level: 3, text: 'Web 界面管理对话', skill: 'Flask/Streamlit' }
    ]
  },
  'tool-agent': {
    slug: 'tool-agent',
    emoji: '🔧',
    title: '多工具智能 Agent',
    level: 3,
    levelLabel: 'Level 3',
    levelColor: 'from-[#4A90D9] to-[#2E5A8C]',
    time: '3-5小时',
    lines: '~300行',
    stack: ['Python', 'requests', 'JSON'],
    stackColor: 'bg-[#E3F0FC] text-[#2E5A8C]',
    prerequisites: ['Python基础', '字典操作', '函数作为参数', '正则表达式基础'],
    description:
      '大模型自动判断调用哪个工具（天气/计算/搜索/时间），实现 Function Calling 入门。',
    whyThisProject:
      'Function Calling 是 Agent 的核心能力。让大模型"使用工具"是现代 AI 应用的基础。学习工具注册、意图路由、结果回传等核心概念。',
    image: '/project-tool-agent.jpg',
    resumeText:
      '开发多工具智能 Agent，实现 Function Calling 能力。大模型根据用户问题自动判断调用天气查询、数学计算、时间获取等工具，执行后将结果回传给模型生成最终回答。',
    resumeTags: ['Function Calling', '工具注册', '意图路由'],
    resumeSection: {
      projectName: '多工具智能 Agent',
      points: [
        {
          title: '项目概述',
          content: '开发多工具智能 Agent，实现 Function Calling 能力。大模型根据用户问题自动判断调用天气查询、数学计算、时间获取等工具，执行后将结果回传给模型生成最终回答。理解 Agent 的核心架构：意图识别 → 工具调用 → 结果回传 → 回答生成。',
        },
        {
          title: '核心功能实现',
          content: 'TOOLS 字典注册多个工具（function + description + parameters）；build_tool_prompt() 构造工具描述让模型理解可用工具；parse_tool_call() 解析模型返回的工具调用指令；execute_tool() 执行对应函数并返回结果；两次 API 调用模式（判断工具 → 执行 → 生成回答）。',
        },
        {
          title: '技术亮点',
          content: 'Function Calling 的完整链路实践：工具注册 → 意图路由 → 参数解析 → 执行 → 结果回传；理解大模型如何基于工具描述做出决策；可扩展的工具注册架构（新增工具零耦合）。',
        },
      ],
      interviewFocus: [
        {
          question: '大模型怎么知道要调用哪个工具？',
          direction: '模型基于工具 description 和参数定义做语义匹配。清晰的描述至关重要。可讨论 ReAct 模式（Reasoning + Acting）：模型先思考再行动。',
        },
        {
          question: '如果工具执行失败，怎么处理？',
          direction: '错误信息回传给模型，让模型决定重试、换工具、或告知用户。讨论容错设计：超时处理、降级策略、错误日志记录。',
        },
        {
          question: 'ReAct、Plan-and-Execute、Function Calling 有什么区别？',
          direction: 'ReAct：思考-行动-观察循环；Plan-and-Execute：先规划步骤再执行；Function Calling：模型直接输出结构化工具调用。三者可结合使用，适应不同复杂度场景。',
        },
      ],
      preparation: [
        '深入理解 Function Calling 原理：模型输出结构化 JSON 而非自然语言',
        '了解主流 Agent 框架：LangChain、AutoGPT、MetaGPT 的架构差异',
        '掌握工具描述优化技巧：清晰的 description 和参数定义直接影响模型决策准确率',
        '思考扩展方向：多工具链式调用、人机协作确认、工具执行沙箱安全',
      ],
    },
    fileStructure: [
      { name: 'tool-agent', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'agent.py', type: 'file-core', description: '核心逻辑：工具注册、意图路由、结果回传', analogy: '就像餐厅的智能调度系统', required: true },
        { name: '.env.example', type: 'file-config', description: '环境变量模板', required: true },
        { name: 'requirements.txt', type: 'file-config', description: '依赖清单', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false }
      ]}
    ],
    steps: [
      {
        title: '环境配置',
        time: '10分钟',
        code: 'pip install requests python-dotenv',
        explanation:
          '安装 requests 和 python-dotenv。配置 .env 文件。',
        filename: 'requirements.txt',
        filepath: 'tool-agent/',
        lineRange: '第1行',
        action: 'new-file' as const,
        description: '安装依赖，配置环境变量',
      },
      {
        title: '工具定义',
        time: '40分钟',
        code: `def tool_get_weather(city: str) -> str:\n    try:\n        url = f"https://wttr.in/{city}?format=%C|%t|%h|%w"\n        r = requests.get(url, timeout=10)\n        if r.status_code == 200:\n            parts = r.text.strip().split("|")\n            return f"{city}天气: {parts[0]}, 温度{parts[1]}"\n        return f"无法获取 {city} 天气"\n    except Exception as e:\n        return f"天气查询失败: {e}"\n\ndef tool_calculate(expression: str) -> str:\n    try:\n        allowed = set("0123456789+-*/.() **%// ")\n        if not all(c in allowed for c in expression):\n            return "表达式包含非法字符"\n        result = eval(expression, {"__builtins__": {}}, {})\n        return f"{expression} = {result}"\n    except Exception as e:\n        return f"计算错误: {e}"\n\ndef tool_search_web(query: str) -> str:\n    return f"搜索结果: 关于'{query}'的相关信息可以在百科、知乎等平台找到。"\n\ndef tool_get_time() -> str:\n    from datetime import datetime\n    now = datetime.now()\n    return f"当前时间: {now.strftime('%Y年%m月%d日 %H:%M:%S')}"\n\nTOOLS = {\n    "get_weather": {\n        "function": tool_get_weather,\n        "description": "查询指定城市的当前天气状况",\n        "parameters": {"city": {"type": "string", "description": "城市名称，如北京、上海"}}\n    },\n    "calculate": {\n        "function": tool_calculate,\n        "description": "计算数学表达式，如 1+1、2**10",\n        "parameters": {"expression": {"type": "string", "description": "数学表达式字符串"}}\n    },\n    "search_web": {\n        "function": tool_search_web,\n        "description": "搜索互联网上的信息",\n        "parameters": {"query": {"type": "string", "description": "搜索关键词"}}\n    },\n    "get_time": {\n        "function": tool_get_time,\n        "description": "获取当前的日期和时间",\n        "parameters": {}\n    },\n}`,
        explanation:
          'TOOLS 字典注册 4 个工具（get_weather/calculate/search_web/get_time），每个工具包含 function/description/parameters。清晰的 description 帮助模型做出正确选择。',
        filename: 'agent.py',
        filepath: 'tool-agent/',
        lineRange: '第1-50行',
        action: 'new-file' as const,
        description: '定义工具函数和工具注册表',
      },
      {
        title: '工具调用解析',
        time: '30分钟',
        code: `def parse_tool_call(response_text: str) -> dict | None:\n    text = response_text.strip()\n    if text.startswith("{") and text.endswith("}"):\n        try:\n            data = json.loads(text)\n            if "tool" in data and data["tool"] in TOOLS:\n                return data\n        except json.JSONDecodeError:\n            pass\n    import re\n    pattern = r'(\\w+)\\s*\\(\\s*([^)]*)\\s*\\)'\n    match = re.match(pattern, text)\n    if match:\n        tool_name = match.group(1)\n        param_str = match.group(2)\n        if tool_name in TOOLS:\n            params = {}\n            if param_str:\n                for pair in param_str.split(","):\n                    pair = pair.strip()\n                    if "=" in pair:\n                        k, v = pair.split("=", 1)\n                        v = v.strip().strip('"').strip("'")\n                        params[k.strip()] = v\n            return {"tool": tool_name, "parameters": params}\n    return None\n\ndef execute_tool(tool_info: dict) -> str:\n    name = tool_info["tool"]\n    params = tool_info.get("parameters", {})\n    tool = TOOLS[name]\n    func = tool["function"]\n    try:\n        result = func(**params)\n        return result\n    except Exception as e:\n        return f"工具执行失败: {e}"`,
        explanation:
          'parse_tool_call() 解析模型返回的 JSON 格式工具调用，支持 JSON 和函数式两种格式。execute_tool() 执行工具并返回结果。',
        filename: 'agent.py',
        filepath: 'tool-agent/',
        lineRange: '第52-90行',
        action: 'new-function' as const,
        description: '实现工具调用解析和执行',
      },
      {
        title: 'Agent 主循环',
        time: '40分钟',
        code: `def build_tool_prompt() -> str:\n    lines = [\n        "你是一个智能助手。你可以使用以下工具来回答用户的问题。",\n        "如果需要使用工具，请严格按照以下 JSON 格式回复：",\n        '',\n        '{"tool": "工具名", "parameters": {"参数名": "参数值"}}',\n        '',\n        "可用工具：",\n    ]\n    for name, info in TOOLS.items():\n        lines.append(f"  - {name}: {info['description']}")\n        for pname, pdesc in info["parameters"].items():\n            lines.append(f"      参数 {pname}: {pdesc['description']}")\n    return "\\n".join(lines)\n\ndef chat(messages: list) -> str:\n    headers = {\n        "Authorization": f"Bearer {API_KEY}",\n        "Content-Type": "application/json",\n    }\n    data = {\n        "model": MODEL,\n        "messages": messages,\n        "temperature": 0.5,\n    }\n    try:\n        response = requests.post(API_URL, headers=headers, json=data, timeout=30)\n        response.raise_for_status()\n        result = response.json()\n        return result["choices"][0]["message"]["content"]\n    except Exception as e:\n        return f"❌ API 错误: {e}"\n\ndef agent_run(user_input: str) -> str:\n    system_prompt = build_tool_prompt()\n    messages = [\n        {"role": "system", "content": system_prompt},\n        {"role": "user", "content": user_input},\n    ]\n    print("[思考] 分析用户需求...")\n    first_response = chat(messages)\n    tool_info = parse_tool_call(first_response)\n    if tool_info is None:\n        return first_response\n    tool_name = tool_info["tool"]\n    print(f"[决策] 调用工具: {tool_name}")\n    tool_result = execute_tool(tool_info)\n    print(f"[结果] {tool_result}")\n    messages.append({"role": "assistant", "content": first_response})\n    messages.append({\n        "role": "user",\n        "content": f"工具 '{tool_name}' 的返回结果: {tool_result}\\n\\n请根据这个结果回答用户的原始问题。"\n    })\n    final_response = chat(messages)\n    return final_response`,
        explanation:
          'agent_run() 第一次调用让模型判断是否需要工具，如果需要则 execute_tool() 执行并回传结果，第二次调用生成最终回答。temperature=0.5 让模型更确定性。',
        filename: 'agent.py',
        filepath: 'tool-agent/',
        lineRange: '第92-150行',
        action: 'new-function' as const,
        description: '实现 Agent 主循环：意图判断、工具执行、结果回传',
      },
    ],
    keyConcepts: [
      { name: 'Tool Calling', description: '让大模型"使用工具"是 Agent 的核心能力。模型根据工具描述自动判断是否需要调用。' },
      { name: '意图路由', description: '模型自动判断用户需要什么工具，无需人工编写 if-else 规则。' },
      { name: '工具描述', description: '清晰的 description 帮助模型做出正确选择。描述要说明工具用途和参数含义。' },
      { name: '结果回传', description: '工具结果需再次传给模型，让其组织语言生成自然回答，而不是直接返回原始数据。' },
    ],
    faq: [
      { q: "模型不返回工具调用", a: '检查工具描述是否清晰，temperature 是否太高。尝试降低 temperature 到 0.3-0.5。' },
      { q: "工具参数解析失败", a: '检查 parse_tool_call 的 JSON 解析逻辑。确保模型返回的格式与预期一致。' },
      { q: "eval 不安全", a: 'calculate 工具使用 eval，生产环境应改用 ast.literal_eval 或专门的数学表达式解析库。' },
    ],
    githubProjects: [
      { name: 'langchain-ai/langchain', stars: '~90k', description: '最流行的 AI 应用框架，内置丰富的工具集成示例' },
      { name: 'simonw/llm', stars: '~5k', description: '命令行工具调用大模型，支持插件和模板' },
    ],
    extensions: [
      { level: 1, text: '添加文件读取工具', skill: '文件 IO' },
      { level: 2, text: '接入真实搜索 API（SerpAPI）', skill: '第三方 API' },
      { level: 2, text: '支持多工具链式调用', skill: '调用链' },
      { level: 3, text: '添加记忆模块（向量数据库）', skill: 'RAG 基础' }
    ]
  },
  'rag-kb': {
    slug: 'rag-kb',
    emoji: '📚',
    title: 'RAG 知识库问答系统',
    level: 3,
    levelLabel: 'Level 3',
    levelColor: 'from-[#4A90D9] to-[#2E5A8C]',
    time: '5-7小时',
    lines: '~400行',
    stack: ['Python', 'requests', 'ChromaDB', 'SiliconFlow'],
    stackColor: 'bg-[#E3F0FC] text-[#2E5A8C]',
    prerequisites: ['Python基础', '列表/字典操作', '文件读写', 'API调用基础'],
    description:
      '文档上传 → 切分向量化 → 向量检索 → 大模型生成回答。RAG 完整流程实战。',
    whyThisProject:
      'RAG（检索增强生成）是 AI 应用落地的核心技术。学会 RAG，你就能构建企业知识库、智能客服、文档问答等真实产品。本项目覆盖 Embedding、向量数据库、检索、增强生成完整链路。',
    image: '/project-rag-kb.jpg',
    resumeText:
      '开发 RAG 知识库问答系统，实现文档上传、文本切分、Embedding 向量化、ChromaDB 向量检索、检索增强生成完整流程。支持批量上传、多文档管理、问答交互。',
    resumeTags: ['Embedding', '向量检索', '检索增强生成', 'ChromaDB'],
    resumeSection: {
      projectName: 'RAG 知识库问答系统',
      points: [
        {
          title: '项目概述',
          content: '开发 RAG（检索增强生成）知识库问答系统，实现文档上传、文本切分、Embedding 向量化、ChromaDB 向量检索、检索增强生成完整流程。支持批量上传、多文档管理、问答交互。使用 DeepSeek API 进行对话生成，SiliconFlow API 进行文本 Embedding。',
        },
        {
          title: '核心功能实现',
          content: '文本切分策略（chunk_size + overlap 保证上下文完整）；调用 Embedding API 将文本转为高维向量；ChromaDB 向量数据库存储和检索；余弦相似度计算找到最相关文档片段；将检索结果作为上下文填入 Prompt，大模型生成精准回答。',
        },
        {
          title: '技术亮点',
          content: '完整的 RAG Pipeline 实践：文档 → 切分 → Embedding → 存储 → 检索 → 增强生成；理解 Embedding 的语义相似性原理；向量检索的 top-k 策略；检索结果与 Prompt 的工程化拼接；混合 API 架构（DeepSeek 对话 + SiliconFlow Embedding）。',
        },
      ],
      interviewFocus: [
        {
          question: 'Embedding 是什么？为什么语义相似的文本向量距离近？',
          direction: 'Embedding 将文本映射到高维语义空间（通常 512-4096 维），通过神经网络训练使语义相似的文本在向量空间中距离近。使用余弦相似度或欧氏距离衡量相似性。',
        },
        {
          question: 'Chunk 切分的大小和重叠率怎么选择？',
          direction: 'chunk_size 太小会丢失上下文，太大会降低检索精度；overlap 保证边界信息不丢失。需根据文档类型（代码/论文/对话）调整，可实验对比不同参数的效果。',
        },
        {
          question: 'RAG 和微调（Fine-tuning）有什么区别？什么时候用 RAG？',
          direction: 'RAG：动态检索外部知识，适合频繁更新的知识库，无需训练；微调：修改模型参数，适合固定领域知识、特定风格。两者可结合：RAG 提供上下文 + 微调模型理解领域术语。',
        },
        {
          question: '检索到的内容不相关怎么办？如何提升检索精度？',
          direction: '优化方向：query 改写/扩展、重排序（Rerank）模型、混合检索（向量+关键词）、调整 chunk 策略、添加元数据过滤。讨论 RAG 评估指标：Recall@K、MRR、NDCG。',
        },
      ],
      preparation: [
        '深入理解 Embedding 原理：神经网络编码器、向量空间、相似度度量',
        '掌握向量数据库核心概念：索引算法（HNSW/IVF）、距离度量、维度灾难',
        '了解 RAG 进阶技术：重排序、查询改写、混合检索、多路召回',
        '思考扩展方向：多模态 RAG（图片/音频）、Agentic RAG（自主决策检索策略）、生产级部署（缓存、监控、评估）',
      ],
    },
    fileStructure: [
      { name: 'rag-kb', type: 'folder', description: '项目根文件夹', required: true, children: [
        { name: 'rag.py', type: 'file-core', description: '核心逻辑：向量库、文档处理、RAG问答', analogy: '就像图书馆的智能查询系统', required: true },
        { name: '.env.example', type: 'file-config', description: '环境变量模板（需要两个API Key）', required: true },
        { name: 'requirements.txt', type: 'file-config', description: '依赖清单', required: true },
        { name: 'README.md', type: 'file-doc', description: '项目说明文档', required: false },
        { name: 'sample_docs/', type: 'folder', description: '测试文档文件夹', required: false }
      ]}
    ],
    steps: [
      {
        title: '环境配置',
        time: '15分钟',
        code: 'pip install requests python-dotenv chromadb',
        explanation:
          '安装 requests、python-dotenv 和 chromadb。配置 .env（需要 DEEPSEEK_API_KEY 和 SILICONFLOW_API_KEY）。',
        filename: 'requirements.txt',
        filepath: 'rag-kb/',
        lineRange: '第1行',
        action: 'new-file' as const,
        description: '安装依赖，配置两个 API Key',
      },
      {
        title: '向量数据库',
        time: '30分钟',
        code: `class VectorStore:\n    def __init__(self, persist_dir: str = "chroma_db"):\n        try:\n            import chromadb\n            self.client = chromadb.PersistentClient(path=persist_dir)\n            self.collection = self.client.get_or_create_collection("documents")\n            self.available = True\n        except ImportError:\n            print("⚠️ 未安装 chromadb，运行: pip install chromadb")\n            self.available = False\n\n    def add_documents(self, texts, ids, metadatas, embeddings):\n        if not self.available:\n            return\n        self.collection.add(\n            embeddings=embeddings, ids=ids, metadatas=metadatas, documents=texts\n        )\n\n    def search(self, query_embedding, top_k=3):\n        if not self.available:\n            return {"documents": [[]], "metadatas": [[]], "distances": [[]]}\n        return self.collection.query(\n            query_embeddings=[query_embedding], n_results=top_k\n        )\n\n    def count(self):\n        if not self.available:\n            return 0\n        return self.collection.count()\n\n    def clear(self):\n        if not self.available:\n            return\n        docs = self.collection.get()\n        if docs and docs["ids"]:\n            self.collection.delete(ids=docs["ids"])`,
        explanation:
          'VectorStore 类封装 ChromaDB，支持 add_documents/search/count/clear。PersistentClient 将数据持久化到磁盘。',
        filename: 'rag.py',
        filepath: 'rag-kb/',
        lineRange: '第1-40行',
        action: 'new-file' as const,
        description: '封装 ChromaDB 向量数据库操作',
      },
      {
        title: '文档处理',
        time: '45分钟',
        code: `def split_text(text: str, chunk_size=500, overlap=50) -> list[str]:\n    chunks = []\n    start = 0\n    while start < len(text):\n        end = min(start + chunk_size, len(text))\n        if end < len(text):\n            for sep in ["\\n\\n", "。", "\\n", " "]:\n                idx = text.rfind(sep, start + chunk_size // 2, end)\n                if idx != -1:\n                    end = idx + len(sep)\n                    break\n        chunks.append(text[start:end].strip())\n        if end >= len(text):\n            break\n        start = end - overlap\n    return [c for c in chunks if c]\n\ndef load_document(filepath: str) -> str:\n    try:\n        with open(filepath, "r", encoding="utf-8") as f:\n            return f.read()\n    except UnicodeDecodeError:\n        try:\n            with open(filepath, "r", encoding="gbk") as f:\n                return f.read()\n        except:\n            return ""\n    except Exception as e:\n        print(f"读取文件失败 {filepath}: {e}")\n        return ""\n\ndef process_and_store(store, filepath: str) -> int:\n    filename = os.path.basename(filepath)\n    print(f"  📄 处理: {filename}")\n    text = load_document(filepath)\n    if not text:\n        print(f"  文件为空或无法读取，跳过")\n        return 0\n    chunks = split_text(text, chunk_size=500, overlap=50)\n    if not chunks:\n        print(f"  切分后为空，跳过")\n        return 0\n    print(f"  切分为 {len(chunks)} 个片段")\n    ids = [f"{filename}_{i}" for i in range(len(chunks))]\n    metadatas = [{"source": filename, "chunk_index": i} for i in range(len(chunks))]\n    print(f"  正在获取 Embeddings...")\n    embeddings = get_embeddings(chunks)\n    if not embeddings or len(embeddings) != len(chunks):\n        print(f"  Embedding 获取失败，跳过")\n        return 0\n    store.add_documents(texts=chunks, ids=ids, metadatas=metadatas, embeddings=embeddings)\n    print(f"  ✅ {filename} 已存入向量库 ({len(chunks)} 片段)")\n    return len(chunks)`,
        explanation:
          'split_text() 切分文本（500字符/块，50字符重叠），load_document() 加载文件，process_and_store() 加载→切分→Embedding→存储。',
        filename: 'rag.py',
        filepath: 'rag-kb/',
        lineRange: '第42-100行',
        action: 'new-function' as const,
        description: '实现文档加载、文本切分、Embedding、存储',
      },
      {
        title: 'RAG 问答',
        time: '45分钟',
        code: `def rag_answer(store, question: str) -> str:\n    print(f"  [RAG] 问题向量化...")\n    query_embs = get_embeddings([question])\n    if not query_embs:\n        return "❌ 问题向量化失败"\n    query_emb = query_embs[0]\n    print(f"  [RAG] 检索相关文档...")\n    results = store.search(query_emb, top_k=3)\n    docs = results["documents"][0] if results["documents"] else []\n    metas = results["metadatas"][0] if results["metadatas"] else []\n    if not docs:\n        return "未找到相关文档，请先上传文档。"\n    context_parts = []\n    for i, (doc, meta) in enumerate(zip(docs, metas), 1):\n        source = meta.get("source", "未知")\n        context_parts.append(f"[文档{i}] 来自 {source}:\\n{doc}\\n")\n    context = "\\n".join(context_parts)\n    print(f"  [RAG] 检索到 {len(docs)} 个相关片段")\n    prompt = f"""根据以下参考文档回答问题。如果文档中没有相关信息，请如实说明。\n\n参考文档:\n{context}\n\n用户问题: {question}\n\n请用中文回答:"""\n    headers = {\n        "Authorization": f"Bearer {CHAT_API_KEY}",\n        "Content-Type": "application/json",\n    }\n    data = {\n        "model": CHAT_MODEL,\n        "messages": [{"role": "user", "content": prompt}],\n        "temperature": 0.3,\n    }\n    try:\n        response = requests.post(CHAT_URL, headers=headers, json=data, timeout=30)\n        response.raise_for_status()\n        result = response.json()\n        return result["choices"][0]["message"]["content"]\n    except Exception as e:\n        return f"❌ API 错误: {e}"`,
        explanation:
          'rag_answer() 问题向量化→向量检索(top-3)→构建上下文 Prompt→大模型生成回答。temperature=0.3 让回答更基于文档内容。',
        filename: 'rag.py',
        filepath: 'rag-kb/',
        lineRange: '第102-150行',
        action: 'new-function' as const,
        description: '实现 RAG 问答完整流程',
      },
    ],
    keyConcepts: [
      { name: 'Embedding', description: '将文本映射为高维向量，语义相似的文本向量距离近。是 RAG 的核心技术。' },
      { name: '向量检索', description: '用余弦相似度找到与问题最相关的文档片段。top_k 控制返回数量。' },
      { name: 'Chunk 切分', description: '长文档必须切分，块大小和重叠率影响检索质量。500字符/50重叠是常用参数。' },
      { name: 'RAG', description: '检索 + 生成，让大模型基于私有文档回答，避免幻觉。是 AI 应用落地的核心技术。' },
    ],
    faq: [
      { q: "Embedding 报错 404", a: 'DeepSeek 不提供 Embedding API，项目使用 SiliconFlow 免费 Embedding 服务。' },
      { q: "ChromaDB 下载模型超时", a: '代码已传入 embeddings，ChromaDB 不需要下载模型。检查网络连接。' },
      { q: "上传文档后问答不相关", a: '调整 chunk_size 和 overlap，或增加 top_k 检索数量。确保文档内容与问题相关。' },
    ],
    githubProjects: [
      { name: 'langchain-ai/langchain', stars: '~90k', description: '最流行的 RAG 框架，内置向量存储和检索链' },
      { name: 'chroma-core/chroma', stars: '~15k', description: 'ChromaDB 官方仓库，了解向量数据库底层实现' },
    ],
    extensions: [
      { level: 1, text: '支持 PDF 文件上传', skill: 'pdfplumber' },
      { level: 2, text: '添加重排序（Rerank）提升精度', skill: '语义排序' },
      { level: 2, text: '接入网络搜索实现混合 RAG', skill: '搜索+知识库' },
      { level: 3, text: '用 Gradio 做成 Web 界面', skill: 'Web UI' }
    ]
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

/* ──────────────────── component ──────────────────── */

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [openStep, setOpenStep] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState<'full' | 'skeleton' | null>(null)

  const project = slug ? projectDetails[slug] : undefined
  const template = slug && hasTemplate(slug) ? getProjectTemplate(slug) : undefined

  const copyResume = useCallback(() => {
    if (!project) return
    const section = project.resumeSection
    const fullText = `${section.projectName}\n\n` +
      section.points.map(p => `【${p.title}】\n${p.content}`).join('\n\n') +
      '\n\n【面试官可能深挖的问题】\n' +
      section.interviewFocus.map((f, i) => `${i + 1}. ${f.question}\n   准备方向：${f.direction}`).join('\n\n') +
      '\n\n【准备方向】\n' +
      section.preparation.map((p, i) => `${i + 1}. ${p}`).join('\n')
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [project])

  /* ── download handlers ── */
  const handleDownloadFull = useCallback(async () => {
    if (!slug) return
    setDownloading('full')
    try {
      const blob = await generateFullCodeZip(slug)
      downloadBlob(blob, `${slug}-完整代码.zip`)
    } catch (e) {
      console.error('Download failed:', e)
    }
    setDownloading(null)
  }, [slug])

  const handleDownloadSkeleton = useCallback(async () => {
    if (!slug) return
    setDownloading('skeleton')
    try {
      const blob = await generateSkeletonZip(slug)
      downloadBlob(blob, `${slug}-项目骨架.zip`)
    } catch (e) {
      console.error('Download failed:', e)
    }
    setDownloading(null)
  }, [slug])

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpenStep(0)
    setOpenFaq(null)
    setCopied(false)
  }, [slug])

  /* ── file progress helper ── */

  function buildFileProgress(steps: Step[], allFiles: string[]) {
    const progress: { filename: string; statusByStep: ('pending' | 'active' | 'completed')[] }[] =
      allFiles.map(f => ({ filename: f, statusByStep: steps.map((_, i) => {
        const stepFiles = steps.slice(0, i + 1).map(s => s.filename)
        const firstIdx = stepFiles.indexOf(f)
        const lastIdx = stepFiles.lastIndexOf(f)
        if (firstIdx === -1) return 'pending'
        if (lastIdx <= i - 1) return 'completed'
        return 'active'
      }) }))
    return progress
  }

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

  const allFiles = Array.from(new Set(project.steps.map(s => s.filename)))
  const fileProgress = buildFileProgress(project.steps, allFiles)

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

              {/* GitHub Link */}
              {project.githubProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <a
                    href={`https://github.com/${project.githubProjects[0].name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#4A4A4A] border border-[#E5E0D5] bg-white transition-all duration-300 hover:border-[#E88B2E] hover:text-[#E88B2E]"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    查看GitHub示例
                  </a>
                </motion.div>
              )}
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

      {/* ── File Structure Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#E5E0D5] bg-white p-6"
          >
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[#2A2A2A]">
              <Folder className="h-5 w-5 text-[#E88B2E]" />
              项目结构
            </h2>
            <p className="mb-4 text-sm text-[#8A8A8A]">
              做完这个项目后，你的文件夹会长这样。点击文件查看详情。
            </p>
            <FileTree structure={project.fileStructure} />
          </motion.div>
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

      {/* ── Environment Setup & Download Section ── */}
      {template && (
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6">
            {/* 环境配置指南 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl border border-[#E5E0D5] p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4A90D9] to-[#2E5A8C] flex items-center justify-center text-white">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-[#2A2A2A]">
                    环境配置
                  </h2>
                  <p className="text-xs text-[#8A8A8A]">
                    开始项目前，先配置好运行环境
                  </p>
                </div>
              </div>

              {/* 依赖说明 */}
              <div className="space-y-4">
                {/* 运行环境 */}
                <div className="flex items-start gap-3 p-4 bg-[#F4EFE6] rounded-lg">
                  {template.env.runtime === 'python' ? (
                    <Terminal className="h-5 w-5 text-[#E88B2E] flex-shrink-0 mt-0.5" />
                  ) : (
                    <Globe className="h-5 w-5 text-[#7BA37E] flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-[#2A2A2A]">
                      {template.env.runtime === 'python'
                        ? 'Python 命令行运行'
                        : '浏览器直接运行'}
                    </p>
                    <p className="text-xs text-[#8A8A8A] mt-1">
                      {template.env.runtime === 'python'
                        ? '需要在电脑终端中运行 Python 程序'
                        : '无需安装任何软件，直接用浏览器打开 HTML 文件'}
                    </p>
                  </div>
                </div>

                {/* 依赖列表 */}
                {template.env.hasDependencies && (
                  <div className="p-4 bg-[#FFF0EB] rounded-lg border border-[#FDE8D8]">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-[#F27B4C]" />
                      <p className="text-sm font-semibold text-[#2A2A2A]">
                        需要安装的依赖
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {template.env.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="px-2.5 py-1 rounded-full bg-white text-[#F27B4C] text-xs font-medium border border-[#FDE8D8]"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                    {template.env.pipCommand && (
                      <div className="relative">
                        <code className="block bg-[#2A2A2A] text-white text-sm p-3 rounded-lg font-mono overflow-x-auto">
                          {template.env.pipCommand}
                        </code>
                        <p className="text-xs text-[#8A8A8A] mt-1.5">
                          在终端中运行上方命令安装依赖
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!template.env.hasDependencies && (
                  <div className="p-4 bg-[#E8F0E9] rounded-lg border border-[#D4E5D6]">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#5C8A5F]" />
                      <p className="text-sm font-medium text-[#2A2A2A]">
                        无需安装任何依赖
                      </p>
                    </div>
                    <p className="text-xs text-[#8A8A8A] mt-1">
                      本项目使用 Python 内置库或浏览器原生 API，无需额外安装
                    </p>
                  </div>
                )}

                {/* 安装步骤 */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#2A2A2A]">安装步骤：</p>
                  {template.env.installInstructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FDF3E8] text-[#B55A00] text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>

                {/* 运行步骤 */}
                <div className="pt-3 border-t border-[#E5E0D5] space-y-2">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-[#E88B2E]" />
                    <p className="text-sm font-semibold text-[#2A2A2A]">运行项目</p>
                  </div>
                  <code className="block bg-[#2A2A2A] text-white text-sm p-3 rounded-lg font-mono overflow-x-auto">
                    {template.env.runCommand}
                  </code>
                  <div className="space-y-1">
                    {template.env.runInstructions.map((inst, i) => (
                      <p key={i} className="text-xs text-[#8A8A8A] flex items-start gap-1.5">
                        <span className="flex-shrink-0">•</span>
                        <span>{inst}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 模板下载 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-xl border border-[#E5E0D5] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E88B2E] to-[#B55A00] flex items-center justify-center text-white">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-[#2A2A2A]">
                    下载项目模板
                  </h2>
                  <p className="text-xs text-[#8A8A8A]">
                    跟着网页指南一步步实现，或下载模板开始编码
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 完整代码下载 */}
                <button
                  onClick={handleDownloadFull}
                  disabled={downloading === 'full'}
                  className="group flex flex-col items-start p-5 rounded-xl border-2 border-[#E5E0D5] hover:border-[#E88B2E] transition-all duration-300 hover:shadow-md disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileArchive className="h-5 w-5 text-[#E88B2E]" />
                    <span className="font-semibold text-[#2A2A2A]">完整项目代码</span>
                  </div>
                  <p className="text-sm text-[#8A8A8A] text-left mb-3">
                    包含所有文件的完整实现代码，可直接运行。适合对照学习或直接使用。
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E88B2E] group-hover:underline">
                    <Download className="h-4 w-4" />
                    {downloading === 'full' ? '打包中...' : '下载 .zip'}
                  </span>
                </button>

                {/* 骨架模板下载 */}
                <button
                  onClick={handleDownloadSkeleton}
                  disabled={downloading === 'skeleton'}
                  className="group flex flex-col items-start p-5 rounded-xl border-2 border-[#E5E0D5] hover:border-[#4A90D9] transition-all duration-300 hover:shadow-md disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Folder className="h-5 w-5 text-[#4A90D9]" />
                    <span className="font-semibold text-[#2A2A2A]">项目骨架</span>
                  </div>
                  <p className="text-sm text-[#8A8A8A] text-left mb-3">
                    只包含文件结构和注释说明，代码部分为空。适合跟着网页指南亲手实现。
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#4A90D9] group-hover:underline">
                    <Download className="h-4 w-4" />
                    {downloading === 'skeleton' ? '打包中...' : '下载 .zip'}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
                        <div className="border-t border-[#E5E0D5] p-5 space-y-4">
                          {/* Step File Tree */}
                          <StepFileTree
                            stepNum={i + 1}
                            totalSteps={project.steps.length}
                            fileStates={fileProgress}
                          />
                          {/* Code Block */}
                          <CodeBlockWithHeader
                            filename={step.filename}
                            filepath={step.filepath}
                            lineRange={step.lineRange}
                            action={step.action}
                            description={step.description}
                            language={project.slug === 'github-profile' || project.slug === 'todo-app'
                              ? (step.filename.endsWith('.css') ? 'css' : step.filename.endsWith('.html') ? 'html' : 'javascript')
                              : 'python'}
                            code={step.code}
                            stepNum={i + 1}
                          />
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

      {/* ── Resume Project Description Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-white border border-[#E5E0D5] p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C07BA0] to-[#9B5A7D] flex items-center justify-center text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-[#2A2A2A]">
                  简历项目描述
                </h2>
                <p className="text-xs text-[#8A8A8A]">
                  可直接复制到简历，含面试深挖与准备方向
                </p>
              </div>
            </div>

            {/* Project Name */}
            <div className="rounded-lg bg-gradient-to-r from-[#F3E8F0] to-[#E8D5E0] p-4 mb-5">
              <h3 className="font-display text-lg font-semibold text-[#2A2A2A]">
                {project.resumeSection.projectName}
              </h3>
            </div>

            {/* Points */}
            <div className="space-y-4 mb-6">
              {project.resumeSection.points.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="rounded-lg border border-[#E5E0D5] p-4"
                >
                  <h4 className="text-sm font-semibold text-[#2A2A2A] mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-[#C07BA0] to-[#9B5A7D] text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    {point.title}
                  </h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed pl-7">
                    {point.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Interview Focus */}
            <div className="rounded-lg bg-[#FDF3E8] border border-[#E5D5C0] p-5 mb-5">
              <h4 className="text-sm font-semibold text-[#B55A00] mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                面试官可能深挖的问题
              </h4>
              <div className="space-y-3">
                {project.resumeSection.interviewFocus.map((focus, i) => (
                  <div key={i} className="rounded-lg bg-white border border-[#E5E0D5] p-3">
                    <p className="text-sm font-medium text-[#2A2A2A] mb-1">
                      Q{i + 1}. {focus.question}
                    </p>
                    <p className="text-xs text-[#8A8A8A] leading-relaxed">
                      <span className="font-medium text-[#B55A00]">准备方向：</span>
                      {focus.direction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation */}
            <div className="rounded-lg bg-[#E3F0FC] border border-[#C0D5E8] p-5 mb-5">
              <h4 className="text-sm font-semibold text-[#2E5A8C] mb-3 flex items-center gap-2">
                <Check className="h-4 w-4" />
                准备方向
              </h4>
              <ul className="space-y-2">
                {project.resumeSection.preparation.map((prep, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-[#4A90D9] to-[#2E5A8C] text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{prep}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyResume}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  已复制完整描述
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  复制完整简历描述
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
