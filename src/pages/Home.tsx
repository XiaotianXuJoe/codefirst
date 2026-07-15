import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
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
import { useEffect, useState } from 'react'

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
}

// ── Animation Variants ──────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

// ── Animated Counter Component ──────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      })
      const unsubscribe = rounded.on('change', (v) => setDisplay(v))
      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [isInView, target, count, rounded])

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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-sm uppercase tracking-[2px] text-[#E88B2E] font-display font-semibold mb-6"
        >
          编程项目第一站
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          从零开始，
          <br />
          跑通你的第一个项目
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[#8A8A8A] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          CodeFirst 为零基础转码者精选人生第一个实战项目。每个项目都有清晰步骤、真实代码和简历写法。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.7,
            ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
        </motion.div>

        {/* Floating Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: 'Python', className: 'bg-[#FDF3E8] text-[#E88B2E]', delay: 0 },
            { label: 'HTML/CSS', className: 'bg-[#E8F0E9] text-[#7BA37E]', delay: 0.5 },
            { label: 'JavaScript', className: 'bg-[#F3E8F0] text-[#C07BA0]', delay: 1 },
            { label: '2小时上手', className: 'bg-white text-[#F27B4C]', delay: 1.5 },
          ].map((badge) => (
            <motion.span
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: badge.delay + 0.8 },
                y: {
                  duration: 3 + badge.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: badge.delay,
                },
              }}
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${badge.className}`}
            >
              {badge.label}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── Section 2: Featured Projects ───────────────────────────────────
function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#F4EFE6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            精选项目
          </h2>
          <p className="text-[#8A8A8A] text-base max-w-md mx-auto">
            从零代码片段到完整网页应用，每个项目都经过精心设计
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Project Card Component ─────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const level = levelConfig[project.level]
  const LevelIcon = level.icon

  return (
    <motion.div variants={staggerChild}>
      <Link to={`/projects/${project.slug}`}>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="group bg-white rounded-xl border border-[#E5E0D5] p-6 transition-all duration-300 hover:shadow-lg hover:border-[#E88B2E]/50 h-full flex flex-col"
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
        </motion.article>
      </Link>
    </motion.div>
  )
}

// ── Section 3: Level Explanation ───────────────────────────────────
function LevelExplanationSection() {
  const ref = useRef(null)
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
  ]

  return (
    <section className="bg-white py-20 border-y border-[#E5E0D5]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            三级难度，循序渐进
          </h2>
          <p className="text-[#8A8A8A] text-base max-w-md mx-auto">
            从最简单到完整应用，每一步都有清晰的目标
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((item, i) => {
            const level = levelConfig[item.level]
            const Icon = item.icon
            return (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="text-center"
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
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Section 4: Stats Banner ────────────────────────────────────────
function StatsSection() {
  const ref = useRef(null)
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl font-semibold text-white mb-2">
            每一步，都算数
          </h2>
          <p className="text-white/70 text-sm">
            不需要先学完所有语法。选一个项目，跟着做，做着做着就会了。
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1">
                {stat.number === 0 ? (
                  <span>0</span>
                ) : (
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section 5: How to Use (3 Steps) ────────────────────────────────
function HowToUseSection() {
  const ref = useRef(null)
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            三步开始你的第一个项目
          </h2>
          <p className="text-[#8A8A8A] text-base max-w-md mx-auto">
            简单清晰的流程，让你专注学习本身
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="relative"
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
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Section 6: CTA ─────────────────────────────────────────────────
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#2A2A2A] py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mx-auto max-w-3xl px-6 text-center"
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
      </motion.div>
    </section>
  )
}
