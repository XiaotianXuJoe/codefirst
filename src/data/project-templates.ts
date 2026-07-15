/**
 * 项目模板下载系统
 *
 * 模板内容存储在 template-contents.json 中，本文件负责：
 * - 导入 JSON 数据
 * - 环境配置信息
 * - ZIP 打包下载函数
 */

import JSZip from 'jszip'
import templateContents from './template-contents.json'

/* ═══════════════════════════════════════════════
   类型定义
   ═══════════════════════════════════════════════ */

export interface EnvConfig {
  hasDependencies: boolean
  runtime: 'python' | 'browser'
  dependencies: string[]
  pipCommand?: string
  installInstructions: string[]
  runCommand: string
  runInstructions: string[]
}

export interface ProjectTemplate {
  slug: string
  folderName: string
  env: EnvConfig
  fullCode: Record<string, string>
  skeleton: Record<string, string>
}

/* ═══════════════════════════════════════════════
   环境配置数据
   ═══════════════════════════════════════════════ */

const ENV_CONFIGS: Record<string, EnvConfig> = {
  'password-generator': {
    hasDependencies: false,
    runtime: 'python',
    dependencies: [],
    installInstructions: ['此项目使用 Python 内置库，无需安装任何第三方依赖'],
    runCommand: 'python main.py',
    runInstructions: [
      '打开终端，进入项目文件夹',
      '运行: python main.py',
      '程序启动后，按菜单提示操作',
    ],
  },
  'weather-cli': {
    hasDependencies: true,
    runtime: 'python',
    dependencies: ['requests'],
    pipCommand: 'pip install requests',
    installInstructions: [
      '确保已安装 Python 3.7+',
      '安装 requests 库: pip install requests',
      '（可选但推荐）使用虚拟环境: python -m venv venv',
    ],
    runCommand: 'python main.py',
    runInstructions: [
      '打开终端，进入项目文件夹',
      '运行: python main.py',
      '输入城市名查看天气（支持中文城市名）',
    ],
  },
  'file-renamer': {
    hasDependencies: false,
    runtime: 'python',
    dependencies: [],
    installInstructions: ['此项目使用 Python 内置库（os、pathlib、re），无需安装任何第三方依赖'],
    runCommand: 'python main.py',
    runInstructions: [
      '打开终端，进入项目文件夹',
      '运行: python main.py',
      '按提示输入文件夹路径和操作选项',
    ],
  },
  'github-profile': {
    hasDependencies: false,
    runtime: 'browser',
    dependencies: [],
    installInstructions: [
      '无需安装任何软件，浏览器即可运行',
      '推荐使用 Chrome / Edge / Firefox 浏览器',
    ],
    runCommand: '双击 index.html 用浏览器打开',
    runInstructions: [
      '双击 index.html 文件，用浏览器打开',
      '或在终端运行: python -m http.server 8080',
      '然后访问 http://localhost:8080',
      '在输入框中输入 GitHub 用户名，点击"查询"',
    ],
  },
  'todo-app': {
    hasDependencies: false,
    runtime: 'browser',
    dependencies: [],
    installInstructions: [
      '无需安装任何软件，浏览器即可运行',
      '推荐使用 Chrome / Edge / Firefox 浏览器',
    ],
    runCommand: '双击 index.html 用浏览器打开',
    runInstructions: [
      '双击 index.html 文件，用浏览器打开',
      '在输入框中输入任务，点击"+"按钮添加',
      '点击复选框标记完成，点击垃圾桶删除',
      '使用筛选按钮查看"全部/进行中/已完成"',
    ],
  },
  'movie-scraper': {
    hasDependencies: true,
    runtime: 'python',
    dependencies: ['requests', 'beautifulsoup4', 'pandas', 'matplotlib', 'lxml'],
    pipCommand: 'pip install requests beautifulsoup4 pandas matplotlib lxml',
    installInstructions: [
      '确保已安装 Python 3.8+',
      '（推荐）创建虚拟环境: python -m venv venv && source venv/bin/activate',
      '安装依赖: pip install requests beautifulsoup4 pandas matplotlib lxml',
      '验证安装: pip list | grep -E "requests|beautifulsoup|pandas|matplotlib"',
    ],
    runCommand: 'python main.py',
    runInstructions: [
      '打开终端，进入项目文件夹',
      '运行: python main.py',
      '程序会自动爬取豆瓣电影Top250数据',
      '完成后在当前目录生成 movies.csv 和图表 PNG 文件',
    ],
  },
  'markdown-notes': {
    hasDependencies: false,
    runtime: 'browser',
    dependencies: ['marked.js (CDN)'],
    installInstructions: [
      '无需安装任何软件，浏览器即可运行',
      'marked.js 通过 CDN 引入，无需手动下载',
      '推荐使用 Chrome / Edge / Firefox 浏览器',
    ],
    runCommand: '双击 index.html 用浏览器打开',
    runInstructions: [
      '双击 index.html 文件，用浏览器打开',
      '左侧边栏显示笔记列表，点击"新建"创建笔记',
      '右侧编辑器输入 Markdown 语法，实时预览渲染效果',
      '支持标签分类和全文搜索',
    ],
  },
  'site-monitor': {
    hasDependencies: true,
    runtime: 'python',
    dependencies: ['requests'],
    pipCommand: 'pip install requests',
    installInstructions: [
      '确保已安装 Python 3.8+',
      '安装 requests 库: pip install requests',
      '（可选）创建虚拟环境: python -m venv venv && source venv/bin/activate',
    ],
    runCommand: 'python main.py',
    runInstructions: [
      '打开终端，进入项目文件夹',
      '编辑 sites.json 配置要监控的网站',
      '运行单次检查: python main.py',
      '运行定时检查: python main.py --loop',
      '查看历史日志: cat history.log',
    ],
  },
}

/* ═══════════════════════════════════════════════
   模板集合 + 查询函数
   ═══════════════════════════════════════════════ */

const allTemplates: Record<string, ProjectTemplate> = {}

for (const [slug, contents] of Object.entries(templateContents)) {
  const typedContents = contents as { fullCode: Record<string, string>; skeleton: Record<string, string> }
  allTemplates[slug] = {
    slug,
    folderName: slug,
    env: ENV_CONFIGS[slug],
    fullCode: typedContents.fullCode,
    skeleton: typedContents.skeleton,
  }
}

export function getProjectTemplate(slug: string): ProjectTemplate | undefined {
  return allTemplates[slug]
}

export function hasTemplate(slug: string): boolean {
  return slug in allTemplates
}

/* ═══════════════════════════════════════════════
   ZIP 生成函数
   ═══════════════════════════════════════════════ */

export async function generateFullCodeZip(slug: string): Promise<Blob> {
  const tmpl = allTemplates[slug]
  if (!tmpl) throw new Error(`Project template not found: ${slug}`)

  const zip = new JSZip()
  const folder = zip.folder(tmpl.folderName)!

  for (const [filename, content] of Object.entries(tmpl.fullCode)) {
    folder.file(filename, content)
  }

  return zip.generateAsync({ type: 'blob' })
}

export async function generateSkeletonZip(slug: string): Promise<Blob> {
  const tmpl = allTemplates[slug]
  if (!tmpl) throw new Error(`Project template not found: ${slug}`)

  const zip = new JSZip()
  const folder = zip.folder(tmpl.folderName)!

  for (const [filename, content] of Object.entries(tmpl.skeleton)) {
    folder.file(filename, content)
  }

  return zip.generateAsync({ type: 'blob' })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
