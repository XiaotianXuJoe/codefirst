import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Rocket,
  Check,
  FileCode,
  Terminal,
  Code2,
} from 'lucide-react'

// ── Animation Constants ─────────────────────────────────────────────
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number]
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number]
const easeBounce = [0.68, -0.55, 0.265, 1.55] as [number, number, number, number]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const fadeUpChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

// ── Path Data ───────────────────────────────────────────────────────
interface PathStep {
  name: string
  slug: string
  level: 0 | 1 | 2
  description: string
}

interface LearningPath {
  id: string
  icon: typeof Globe
  iconEmoji: string
  title: string
  color: string
  gradient: string
  bgTint: string
  steps: PathStep[]
  nextSteps: string
}

const paths: LearningPath[] = [
  {
    id: 'python',
    icon: Globe,
    iconEmoji: '\u{1F40D}',
    title: 'Python\u81EA\u52A8\u5316\u65B9\u5411',
    color: 'text-[#7BA37E]',
    gradient: 'from-[#7BA37E] to-[#5C8A5F]',
    bgTint: 'bg-[#E8F0E9]',
    steps: [
      {
        name: '\u5BC6\u7801\u751F\u6210\u5668',
        slug: 'password-generator',
        level: 0,
        description: '\u638C\u63E1Python\u57FA\u7840\u8BED\u6CD5',
      },
      {
        name: '\u5929\u6C14\u67E5\u8BE2\u5DE5\u5177',
        slug: 'weather-cli',
        level: 1,
        description: '\u5B66\u4F1A\u8C03\u7528API',
      },
      {
        name: '\u6587\u4EF6\u6279\u91CF\u91CD\u547D\u540D',
        slug: 'file-renamer',
        level: 1,
        description: '\u6587\u4EF6\u7CFB\u7EDF\u64CD\u4F5C',
      },
    ],
    nextSteps: '\u722C\u866B / \u6570\u636E\u5206\u6790 / \u81EA\u52A8\u5316\u529E\u516C',
  },
  {
    id: 'frontend',
    icon: Code2,
    iconEmoji: '\u{1F310}',
    title: '\u524D\u7AEF\u5F00\u53D1\u65B9\u5411',
    color: 'text-[#E88B2E]',
    gradient: 'from-[#E88B2E] to-[#B55A00]',
    bgTint: 'bg-[#FDF3E8]',
    steps: [
      {
        name: 'GitHub\u7528\u6237\u8D44\u6599\u67E5\u8BE2\u7AD9',
        slug: 'github-profile',
        level: 2,
        description: 'HTML/CSS/JS\u57FA\u7840',
      },
      {
        name: '\u5F85\u529E\u4E8B\u9879\u7BA1\u7406\u7F51\u9875',
        slug: 'todo-app',
        level: 2,
        description: 'CRUD + LocalStorage',
      },
    ],
    nextSteps: 'React/Vue\u6846\u67B6 / \u5168\u6808\u5E94\u7528',
  },
  {
    id: 'fullstack',
    icon: Rocket,
    iconEmoji: '\u{1F680}',
    title: '\u5168\u6808\u5DE5\u7A0B\u5E08\u65B9\u5411',
    color: 'text-[#C07BA0]',
    gradient: 'from-[#C07BA0] to-[#9B5A7D]',
    bgTint: 'bg-[#F3E8F0]',
    steps: [
      {
        name: '\u5BC6\u7801\u751F\u6210\u5668',
        slug: 'password-generator',
        level: 0,
        description: '\u7F16\u7A0B\u57FA\u7840',
      },
      {
        name: '\u5929\u6C14\u67E5\u8BE2\u5DE5\u5177',
        slug: 'weather-cli',
        level: 1,
        description: 'API\u8C03\u7528',
      },
      {
        name: 'GitHub\u7528\u6237\u8D44\u6599\u67E5\u8BE2\u7AD9',
        slug: 'github-profile',
        level: 2,
        description: '\u524D\u7AEF\u5F00\u53D1',
      },
      {
        name: '\u5F85\u529E\u4E8B\u9879\u7BA1\u7406\u7F51\u9875',
        slug: 'todo-app',
        level: 2,
        description: '\u5B8C\u6574\u5E94\u7528',
      },
    ],
    nextSteps: '\u5B66\u4E60\u540E\u7AEF + \u6570\u636E\u5E93',
  },
]

// ── Level Config ────────────────────────────────────────────────────
const levelConfig: Record<
  number,
  { gradient: string; label: string; icon: typeof FileCode }
> = {
  0: {
    gradient: 'from-[#7BA37E] to-[#5C8A5F]',
    label: 'Level 0',
    icon: FileCode,
  },
  1: {
    gradient: 'from-[#E88B2E] to-[#B55A00]',
    label: 'Level 1',
    icon: Terminal,
  },
  2: {
    gradient: 'from-[#C07BA0] to-[#9B5A7D]',
    label: 'Level 2',
    icon: Code2,
  },
}

// ── Milestone Data ──────────────────────────────────────────────────
const milestones = [
  {
    level: 0,
    title: '\u4EE3\u7801\u7247\u6BB5',
    description: '\u80FD\u76F4\u63A5\u590D\u5236\u8FD0\u884C\u7684\u5C0F\u7A0B\u5E8F',
    skills: ['Python\u57FA\u7840\u8BED\u6CD5', '\u53D8\u91CF', '\u51FD\u6570', '\u6A21\u5757\u5BFC\u5165'],
    count: 1,
  },
  {
    level: 1,
    title: '\u63A7\u5236\u53F0\u5E94\u7528',
    description: '\u9700\u8981\u5B89\u88C5\u4F9D\u8D56\u7684\u5B8C\u6574\u5DE5\u5177',
    skills: ['API\u8C03\u7528', '\u6587\u4EF6\u64CD\u4F5C', '\u9519\u8BEF\u5904\u7406', '\u547D\u4EE4\u884C\u4EA4\u4E92'],
    count: 2,
  },
  {
    level: 2,
    title: '\u6709\u754C\u9762\u5E94\u7528',
    description: '\u80FD\u5728\u6D4F\u89C8\u5668\u91CC\u8FD0\u884C\u7684\u5B8C\u6574\u5E94\u7528',
    skills: ['DOM\u64CD\u4F5C', '\u4E8B\u4EF6\u5904\u7406', '\u6570\u636E\u6301\u4E45\u5316', '\u54CD\u5E94\u5F0F\u5E03\u5C40'],
    count: 2,
  },
]

// ═══════════════════════════════════════════════════════════════════
//  LEARNING PATH PAGE
// ═══════════════════════════════════════════════════════════════════
export default function LearningPath() {
  return (
    <div>
      {/* ═══════ Section 1: Hero ═══════ */}
      <HeroSection />

      {/* ═══════ Section 2: Skill Tree ═══════ */}
      <SkillTreeSection />

      {/* ═══════ Section 3: Milestones ═══════ */}
      <MilestonesSection />

      {/* ═══════ Section 4: CTA Banner ═══════ */}
      <CTASection />
    </div>
  )
}

// ── Hero Section ────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center overflow-hidden bg-[#2A2A2A]">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/learning-path-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A]/60 via-transparent to-[#2A2A2A]/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2 text-xs text-[#8A8A8A] mb-6"
        >
          <Link to="/" className="hover:text-[#E88B2E] transition-colors">
            \u9996\u9875
          </Link>
          <span>&gt;</span>
          <span className="text-[#4A4A4A]">\u5B66\u4E60\u8DEF\u5F84</span>
        </motion.nav>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOutExpo }}
          className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-4"
        >
          \u4F60\u7684\u7F16\u7A0B\u5B66\u4E60\u8DEF\u7EBF\u56FE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
          className="text-[#8A8A8A] text-base max-w-xl mx-auto leading-relaxed"
        >
          \u4ECE\u7B2C\u4E00\u4E2AHello World\u5230\u7B2C\u4E00\u4E2A\u5B8C\u6574\u5E94\u7528\uFF0C\u8DDF\u7740\u8D70\u5C31\u5BF9\u4E86
        </motion.p>

        {/* Path Selector Pills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: easeBounce,
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {paths.map((path) => (
            <a
              key={path.id}
              href={`#path-${path.id}`}
              className={
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full ' +
                'text-sm font-medium transition-all duration-300 ' +
                'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }
            >
              <span>{path.iconEmoji}</span>
              {path.title}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Skill Tree Section ─────────────────────────────────────────────
function SkillTreeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#F4EFE6] py-20" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
            \u6309\u65B9\u5411\u9009\u62E9\u5B66\u4E60\u8DEF\u5F84
          </h2>
          <p className="text-[#8A8A8A] text-base max-w-md mx-auto">
            \u4E09\u6761\u4E13\u4E1A\u8DEF\u5F84\uFF0C\u5E2E\u4F60\u4ECE\u5165\u95E8\u5230\u5C31\u4E1A
          </p>
        </motion.div>

        {/* Path Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {paths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Path Card ──────────────────────────────────────────────────────
function PathCard({ path }: { path: LearningPath }) {
  return (
    <motion.div
      variants={fadeUpChild}
      id={`path-${path.id}`}
      className="bg-white rounded-xl border border-[#E5E0D5] overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      {/* Path Header */}
      <div className={`p-6 ${path.bgTint} border-b border-[#E5E0D5]`}>
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${path.gradient} text-white text-xl`}
          >
            <span>{path.iconEmoji}</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-[#2A2A2A]">
              {path.title}
            </h3>
            <p className="text-xs text-[#8A8A8A]">
              {path.steps.length}\u4E2A\u9879\u76EE
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6">
        <div className="space-y-0">
          {path.steps.map((step, i) => {
            const lvl = levelConfig[step.level]
            const LevelIcon = lvl.icon
            return (
              <div key={`${step.slug}-${i}`}>
                {/* Step Item */}
                <Link
                  to={`/projects/${step.slug}`}
                  className="group flex items-start gap-3 py-3 transition-colors"
                >
                  {/* Step Number */}
                  <div
                    className={
                      'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ' +
                      'text-xs font-bold text-white ' +
                      `bg-gradient-to-r ${lvl.gradient}`
                    }
                  >
                    {i + 1}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[#2A2A2A] group-hover:text-[#E88B2E] transition-colors">
                        {step.name}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r ${lvl.gradient}`}
                      >
                        <LevelIcon className="h-2.5 w-2.5" />
                        {lvl.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-4 w-4 text-[#E5E0D5] group-hover:text-[#E88B2E] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </Link>

                {/* Arrow Connector between steps */}
                {i < path.steps.length - 1 && (
                  <div className="flex items-center py-1">
                    <div className="w-7 flex justify-center">
                      <div className="w-px h-6 bg-[#E5E0D5]" />
                    </div>
                    <div className="flex-1" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Next Steps Arrow */}
        <div className="mt-4 pt-4 border-t border-dashed border-[#E5E0D5]">
          <div className="flex items-center gap-2 text-xs text-[#8A8A8A]">
            <ArrowRight className="h-3.5 w-3.5 text-[#E88B2E]" />
            <span>
              <span className="font-medium">\u4E0B\u4E00\u6B65\uFF1A</span>
              {path.nextSteps}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Milestones Section ─────────────────────────────────────────────
function MilestonesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-white py-16 border-y border-[#E5E0D5]" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl font-semibold text-[#2A2A2A]">
            \u6BCF\u4E2A Level \u610F\u5473\u7740\u4EC0\u4E48\uFF1F
          </h2>
        </motion.div>

        {/* Milestone Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {milestones.map((m) => {
            const lvl = levelConfig[m.level]
            return (
              <motion.div
                key={m.level}
                variants={fadeUpChild}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: easeSmooth }}
                className="bg-white rounded-xl border border-[#E5E0D5] p-6 transition-all duration-300 hover:shadow-lg"
              >
                {/* Level Badge */}
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${lvl.gradient} text-white`}
                  >
                    <span className="font-display text-xl font-bold">
                      {m.level}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-[#2A2A2A] text-center mb-2">
                  Level {m.level}: {m.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#8A8A8A] text-center mb-4 leading-relaxed">
                  {m.description}
                </p>

                {/* Skill List */}
                <ul className="space-y-2">
                  {m.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.08 + 0.3 }}
                      className="flex items-center gap-2 text-sm text-[#4A4A4A]"
                    >
                      <Check className="h-4 w-4 text-[#7BA37E] flex-shrink-0" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>

                {/* Project Count */}
                <div className="mt-4 pt-4 border-t border-[#E5E0D5] text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FDF3E8] text-[#B55A00] text-xs font-medium">
                    {m.count}\u4E2A\u9879\u76EE
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ── CTA Banner Section ─────────────────────────────────────────────
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#2A2A2A] py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          \u9009\u5B9A\u4F60\u7684\u8DEF\u5F84\uFF0C\u5F00\u59CB\u7B2C\u4E00\u4E2A\u9879\u76EE
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          className="text-[#8A8A8A] text-base mb-10 max-w-md mx-auto"
        >
          \u4E0D\u9700\u8981\u7B49\u5B66\u5B8C\u6240\u6709\u4E1C\u897F\u624D\u5F00\u59CB\u3002\u9009\u4E00\u4E2A\u9879\u76EE\uFF0C\u73B0\u5728\u5C31\u5F00\u59CB\u505A\u3002
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: easeBounce }}
        >
          <Link
            to="/projects"
            className={
              'inline-flex items-center gap-2 rounded-full px-10 py-4 ' +
              'text-base font-semibold text-white ' +
              'bg-gradient-to-r from-[#E88B2E] to-[#B55A00] ' +
              'transition-all duration-300 hover:shadow-xl hover:opacity-90'
            }
          >
            \u6D4F\u89C8\u5168\u90E8\u9879\u76EE
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
