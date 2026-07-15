import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  Clock,
  Code2,
  Target,
  ChevronDown,
  FileCode,
  Terminal,
  Globe,
  ArrowRight,
  Search,
  BookOpen,
  Briefcase,
} from 'lucide-react'

// ── Custom useInView Hook ───────────────────────────────────────────
function useInView(ref: React.RefObject<HTMLElement | null>, options?: { once?: boolean; margin?: string }) {
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (options?.once) observer.unobserve(el)
        } else if (!options?.once) {
          setIsInView(false)
        }
      },
      { rootMargin: options?.margin || '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return isInView
}

// ── CSS Animation Styles ────────────────────────────────────────────
const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`

// ── Project Data ────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    slug: 'password-generator',
    emoji: '🔐',
    title: '个人密码生成器',
    level: 0,
    levelLabel: 'Level 0',
    time: '1-2小时',
    lines: '~60行',
    stack: ['Python'],
    description: '生成随机强密码，支持自定义长度和字符类型，附带密码强度检测功能。',
    resumeValue: 'Python基础 · 字符串处理 · 用户交互',
    image: '/project-password.jpg',
  },
  {
    id: 2,
    slug: 'weather-cli',
    emoji: '🌤️',
    title: '命令行天气查询工具',
    level: 1,
    levelLabel: 'Level 1',
    time: '2-3小时',
    lines: '~80行',
    stack: ['Python', 'requests'],
    description: '调用天气API获取实时数据，支持摄氏/华氏切换，带错误处理。',
    resumeValue: 'API调用 · 第三方库 · 异常处理',
    image: '/project-weather.jpg',
  },
  {
    id: 3,
    slug: 'file-renamer',
    emoji: '📁',
    title: '文件批量重命名工具',
    level: 1,
    levelLabel: 'Level 1',
    time: '2-4小时',
    lines: '~100行',
    stack: ['Python', 'os/pathlib'],
    description: '批量添加前缀/后缀、按序号重命名、字符串替换，支持预览模式。',
    resumeValue: '文件操作 · 路径处理 · 自动化脚本',
    image: '/project-rename.jpg',
  },
  {
    id: 4,
    slug: 'github-profile',
    emoji: '🔍',
    title: 'GitHub用户资料查询站',
    level: 2,
    levelLabel: 'Level 2',
    time: '3-5小时',
    lines: '~150行',
    stack: ['HTML', 'CSS', 'JavaScript'],
    description: '纯前端调用GitHub API，展示用户资料卡片，可部署到GitHub Pages。',
    resumeValue: '前端开发 · API集成 · 响应式布局',
    image: '/project-github.jpg',
  },
  {
    id: 5,
    slug: 'todo-app',
    emoji: '✅',
    title: '待办事项管理网页',
    level: 2,
    levelLabel: 'Level 2',
    time: '4-6小时',
    lines: '~200行',
    stack: ['HTML', 'CSS', 'JavaScript'],
    description: '完整的CRUD待办应用，数据持久化，支持筛选查看，可部署上线。',
    resumeValue: 'CRUD开发 · LocalStorage · DOM操作',
    image: '/project-todo.jpg',
  },
  {
    id: 6,
    slug: 'movie-scraper',
    emoji: '🕷️',
    title: '豆瓣电影数据抓取与分析',
    level: 3,
    levelLabel: 'Level 3',
    time: '5-7小时',
    lines: '~250行',
    stack: ['Python', 'requests', 'BeautifulSoup', 'pandas'],
    description: '抓取豆瓣电影Top250数据，进行清洗、统计分析并生成可视化图表。',
    resumeValue: '爬虫 + 数据分析 + 数据可视化',
    image: '/project-movie.jpg',
  },
  {
    id: 7,
    slug: 'markdown-notes',
    emoji: '📝',
    title: 'Markdown笔记Web应用',
    level: 3,
    levelLabel: 'Level 3',
    time: '6-8小时',
    lines: '~300行',
    stack: ['HTML', 'CSS', 'JavaScript', 'marked.js'],
    description: '功能完整的Markdown笔记应用，左右分栏实时预览，标签分类与全文搜索。',
    resumeValue: '组件化设计 + 状态管理 + Markdown渲染',
    image: '/project-notes.jpg',
  },
  {
    id: 8,
    slug: 'site-monitor',
    emoji: '🌐',
    title: '网站状态监控工具',
    level: 3,
    levelLabel: 'Level 3',
    time: '4-6小时',
    lines: '~200行',
    stack: ['Python', 'requests', 'asyncio'],
    description: '批量检查网站HTTP状态码和响应时间，生成彩色状态报告。DevOps入门。',
    resumeValue: '异步编程 + DevOps + 配置驱动',
    image: '/project-monitor.jpg',
  },
]

// ── Level Config ────────────────────────────────────────────────────
const levelConfig: Record<
  number,
  { gradient: string; text: string; desc: string; icon: typeof FileCode }
> = {
  0: {
    gradient: 'from-[#7BA37E] to-[#5C8A5F]',
    text: '代码片段 — 复制即可运行',
    desc: '无需安装任何依赖，复制代码直接运行',
    icon: FileCode,
  },
  1: {
    gradient: 'from-[#E88B2E] to-[#B55A00]',
    text: '控制台应用 — 需安装依赖',
    desc: '需要安装第三方库，在终端中运行',
    icon: Terminal,
  },
  2: {
    gradient: 'from-[#C07BA0] to-[#9B5A7D]',
    text: '网页应用 — 涉及API与存储',
    desc: '涉及前端开发和外部API调用',
    icon: Globe,
  },
  3: {
    gradient: 'from-[#4A90D9] to-[#2E5A8C]',
    text: '进阶项目 — 多文件工程',
    desc: '涉及多模块协作和工程化实践',
    icon: Globe,
  },
}

// ── Animated Counter Component ──────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 1500
      const startTime = performance.now()
      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        start = Math.round(progress * target)
        setDisplay(start)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }, [isInView, target])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════
//  HOME PAGE
// ═══════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <div>
      <style>{animationStyles}</style>
      <HeroSection />
      <ProjectsSection />
      <LevelExplanationSection />
      <StatsSection />
      <HowToUseSection />
      <CTASection />
    </div>
  )
}

// ── Section 1: Hero ────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#2A2A2A]">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A]/60 via-[#2A2A2A]/40 to-[#2A2A2A]/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Tagline */}
        <p
          className="text-sm uppercase tracking-[2px] text-[#E88B2E] font-display font-semibold mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]"
        >
          编程项目第一站
        </p>

        {/* Title */}
        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-[fadeInUp_1s_ease-out_0.15s_both]"
        >
          从零开始，
          <br />
          跑通你的第一个项目
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#8A8A8A] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-[fadeIn_0.8s_ease-out_0.5s_both]"
        >
          CodeFirst 为零基础转码者精选人生第一个实战项目。每个项目都有清晰步骤、真实代码和简历写法。
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[scaleIn_0.6s_ease-out_0.7s_both]"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-xl hover:opacity-90"
          >
            浏览全部项目
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/learning-path"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20"
          >
            查看学习路径
          </Link>
        </div>

        {/* Floating Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: 'Python', className: 'bg-[#FDF3E8] text-[#E88B2E]', delay: 0 },
            { label: 'HTML/CSS', className: 'bg-[#E8F0E9] text-[#7BA37E]', delay: 0.5 },
            { label: 'JavaScript', className: 'bg-[#F3E8F0] text-[#C07BA0]', delay: 1 },
            { label: '2小时上手', className: 'bg-white text-[#F27B4C]', delay: 1.5 },
          ].map((badge) => (
            <span
              key={badge.label}
              style={{ animationDelay: `${badge.delay + 0.8}s` }}
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 ${badge.className}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[fadeIn_0.6s_ease-out_1.2s_both]"
      >
        <div className="animate-[bounce_2s_ease-in-out_infinite]">
          <ChevronDown className="h-6 w-6 text-white/50" />
        </div>
      </div>
    </section>
  )
}

// ── Section 2: Featured Projects ───────────────────────────────────
function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#F4EFE6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-600 ${isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            精选项目
          </h2>
          <p className="text-[#8A8A8A] text-base max-w-md mx-auto">
            从零代码片段到完整网页应用，每个项目都经过精心设计
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Project Card Component ─────────────────────────────────────────
function ProjectCard({ project, index, isInView }: { project: (typeof projects)[0]; index: number; isInView: boolean }) {
  const level = levelConfig[project.level]
  const LevelIcon = level.icon

  return (
    <div
      style={{ animationDelay: `${index * 0.1}s` }}
      className={isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}
    >
      <Link to={`/projects/${project.slug}`}>
        <article
          className="group bg-white rounded-xl border border-[#E5E0D5] p-6 transition-all duration-300 hover:shadow-lg hover:border-[#E88B2E]/50 hover:-translate-y-1 h-full flex flex-col"
        >
          {/* Thumbnail */}
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Title + Level Badge */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <h3 className="font-display text-lg font-semibold text-[#2A2A2A] group-hover:text-[#E88B2E] transition-colors">
              {project.title}
            </h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r ${level.gradient}`}
            >
              <LevelIcon className="h-3 w-3" />
              {project.levelLabel}
            </span>
          </div>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-[#8A8A8A]">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {project.time}
            </span>
            <span className="inline-flex items-center gap-1">
              <Code2 className="h-3.5 w-3.5" />
              {project.lines}
            </span>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-[#FDF3E8] text-[#B55A00] text-[11px] font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Resume Value */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0EB] text-[#F27B4C] text-xs font-medium">
            <Target className="h-3 w-3" />
            {project.resumeValue}
          </div>
        </article>
      </Link>
    </div>
  )
}

// ── Section 3: Level Explanation ───────────────────────────────────
function LevelExplanationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const levels = [
    {
      level: 0,
      title: '代码片段',
      subtitle: '复制即可运行',
      description: '一段完整的可运行代码，无需安装额外软件。适合第一次接触编程的人。',
      icon: FileCode,
    },
    {
      level: 1,
      title: '控制台应用',
      subtitle: '需安装依赖',
      description: '需要在终端中运行的工具类程序，涉及第三方库安装。',
      icon: Terminal,
    },
    {
      level: 2,
      title: '网页应用',
      subtitle: '涉及API与存储',
      description: '带有用户界面的完整网页项目，可部署到互联网。',
      icon: Globe,
    },
    {
      level: 3,
      title: '进阶项目',
      subtitle: '多模块工程',
      description: '涉及多文件协作、工程化实践和异步编程等进阶技术。',
      icon: Globe,
    },
  ]

  return (
    <section className="bg-white py-20 border-y border-[#E5E0D5]">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`text-center mb-12 ${isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            四级难度，循序渐进
          </h2>
          <p className="text-[#8A8A8A] text-base max-w-md mx-auto">
            从最简单到完整应用，每一步都有清晰的目标
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {levels.map((item, i) => {
            const level = levelConfig[item.level]
            const Icon = item.icon
            return (
              <div
                key={item.level}
                style={{ animationDelay: `${i * 0.15}s` }}
                className={`text-center ${isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${level.gradient} text-white mb-5`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${level.gradient} mb-3`}
                >
                  Level {item.level}
                </span>
                <h3 className="font-display text-xl font-semibold text-[#2A2A2A] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Section 4: Stats Banner ────────────────────────────────────────
function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { number: 5, suffix: '+', label: '精选项目' },
    { number: 3, suffix: '', label: '难度等级' },
    { number: 0, suffix: '', label: '前置要求' },
    { number: 100, suffix: '%', label: '可写进简历' },
  ]

  return (
    <section
      ref={ref}
      className="bg-gradient-to-r from-[#E88B2E] to-[#B55A00] py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`text-center mb-10 ${isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}`}
        >
          <h2 className="font-display text-2xl font-semibold text-white mb-2">
            每一步，都算数
          </h2>
          <p className="text-white/70 text-sm">
            不需要先学完所有语法。选一个项目，跟着做，做着做着就会了。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ animationDelay: `${i * 0.1}s` }}
              className={`text-center ${isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}`}
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1">
                {stat.number === 0 ? (
                  <span>0</span>
                ) : (
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section 5: How to Use (3 Steps) ────────────────────────────────
function HowToUseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      icon: Search,
      title: '选择项目',
      description: '浏览项目库，找到适合你当前水平的项目',
      color: 'bg-[#7BA37E]',
    },
    {
      number: '02',
      icon: BookOpen,
      title: '跟着教程做',
      description: '每一步都有详细说明和代码，不会迷路',
      color: 'bg-[#E88B2E]',
    },
    {
      number: '03',
      icon: Briefcase,
      title: '写进简历',
      description: '完成后参考简历模板，把项目写进你的作品集',
      color: 'bg-[#B55A00]',
    },
  ]

  return (
    <section className="bg-[#F4EFE6] py-20">
      <div className="mx-auto max-w-7xl px-6" ref={ref}>
        <div
          className={`text-center mb-14 ${isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            三步开始你的第一个项目
          </h2>
          <p className="text-[#8A8A8A] text-base max-w-md mx-auto">
            简单清晰的流程，让你专注学习本身
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                style={{ animationDelay: `${i * 0.15}s` }}
                className={`relative ${isInView ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : 'opacity-0'}`}
              >
                <div className="bg-white rounded-2xl border border-[#E5E0D5] p-8 text-center h-full transition-all duration-300 hover:shadow-lg hover:border-[#E88B2E]/30">
                  {/* Number Badge */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${step.color} text-white mb-5`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Step Number */}
                  <span className="block text-xs font-mono text-[#8A8A8A] mb-2">
                    Step {step.number}
                  </span>

                  <h3 className="font-display text-xl font-semibold text-[#2A2A2A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#8A8A8A] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#E5E0D5] to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Section 6: CTA ─────────────────────────────────────────────────
function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#2A2A2A] py-20">
      <div
        className={`mx-auto max-w-3xl px-6 text-center ${isInView ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'}`}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          准备好开始了吗？
        </h2>
        <p className="text-[#8A8A8A] text-base mb-10 max-w-md mx-auto">
          你的第一个项目，比想象中更简单。
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-xl hover:opacity-90"
        >
          立即浏览项目
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
