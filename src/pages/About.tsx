import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  Footprints,
  Eye,
  BookOpen,
  Target,
  Zap,
  Briefcase,
  Send,
  Check,
  ArrowRight,
  Github,
} from 'lucide-react'

/* ─────────────────────── data ─────────────────────── */

const principles = [
  {
    icon: Target,
    title: '项目驱动学习',
    description:
      '不是先学语法再做题，而是直接开始做一个能用的东西，在做的过程中自然学会所需的知识',
  },
  {
    icon: Zap,
    title: '2小时跑起来',
    description:
      '每个项目都控制在2-6小时内可完成，让你快速获得正反馈，不再被漫长的教程拖垮',
  },
  {
    icon: Briefcase,
    title: '能写进简历',
    description:
      '每个项目都配有简历写法建议，完成后你知道如何向面试官展示这个项目的价值',
  },
]

const howToCards = [
  {
    icon: Footprints,
    title: '跟着项目做',
    forWho: '纯小白，第一次做项目',
    steps: ['选项目', '看指南', '复制代码', '改参数', '跑起来'],
  },
  {
    icon: Eye,
    title: '先看再改',
    forWho: '有基础，想快速出成果',
    steps: ['看完成效果', '读代码', '改功能', '加自己的特性'],
  },
  {
    icon: BookOpen,
    title: '当参考用',
    forWho: '有经验，找灵感',
    steps: ['浏览项目', '看扩展挑战', '整合到自己的作品集中'],
  },
]

/* ─────────────────────── component ─────────────────────── */

export default function About() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    stack: '',
    desc: '',
    github: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* ════════════ Section 1: Hero ════════════ */}
      <section className="bg-[#2A2A2A] min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-xs uppercase tracking-[3px] text-[#E88B2E] mb-6 font-display"
        >
          关于 CodeFirst
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] mb-6"
        >
          我们深信
          <br />
          每个人都能写出人生第一个项目
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[#8A8A8A] text-base max-w-2xl mb-8 leading-relaxed"
        >
          CodeFirst 诞生于一个简单的观察：太多人在"学完了"和"开始做"之间卡住了。
          我们精选最友好的入门项目，把这一步的距离缩短到 2 小时。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {['2024 创立', '5+ 精选项目', '100% 能写进简历'].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#404040] bg-[#333] px-4 py-1.5 text-xs text-[#8A8A8A]"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ════════════ Section 2: Philosophy ════════════ */}
      <section className="bg-[#F4EFE6] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-6">
                为什么从项目开始学？
              </h2>
              <p className="text-[#4A4A4A] text-base leading-relaxed mb-8">
                传统的编程学习路径是"先学完所有语法，再开始做项目"。但我们发现，
                大多数人在这个过程中就失去了动力。CodeFirst 的理念是"边做边学"
                ——选一个项目，跟着做，遇到不懂的概念再去查。这样你学的每一个知识点都有上下文，都能立刻看到效果。
              </p>
              <blockquote className="border-l-4 border-[#E88B2E] pl-6 italic text-[#E88B2E] font-display text-xl">
                "最好的学习方式，就是做出一个你能展示给别人的东西。"
              </blockquote>
            </motion.div>

            {/* Right Column - Principle Cards */}
            <div className="space-y-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#E88B2E]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDF3E8]">
                      <p.icon className="h-5 w-5 text-[#E88B2E]" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-[#2A2A2A] mb-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ Section 3: How to Use ════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
              如何使用 CodeFirst
            </h2>
            <p className="text-[#8A8A8A] text-base">
              三种方式，找到适合你的节奏
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howToCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="rounded-2xl bg-[#FDF9F3] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <motion.span
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.2 + 0.1,
                    duration: 0.4,
                    ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
                  }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FDF3E8] mb-4"
                >
                  <card.icon className="h-6 w-6 text-[#E88B2E]" />
                </motion.span>
                <h3 className="font-display font-semibold text-xl text-[#2A2A2A] mb-2">
                  {card.title}
                </h3>
                <span className="inline-block rounded-full bg-[#FDF3E8] px-3 py-1 text-xs text-[#B55A00] mb-4">
                  {card.forWho}
                </span>
                <ol className="text-left space-y-2 mt-4">
                  {card.steps.map((step, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-[#8A8A8A]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5E0D5] text-[10px] font-bold text-[#4A4A4A]">
                        {j + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ Section 4: Contribute ════════════ */}
      <section className="bg-[#F4EFE6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3">
              想要贡献项目？
            </h2>
            <p className="text-[#8A8A8A] text-base">
              如果你有一个适合初学者的项目想法，欢迎提交！
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-sm"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0E9] mb-4">
                  <Check className="h-8 w-8 text-[#7BA37E]" />
                </span>
                <h3 className="font-display font-semibold text-xl text-[#2A2A2A] mb-2">
                  已提交！
                </h3>
                <p className="text-sm text-[#8A8A8A]">
                  感谢你的贡献，我们会尽快审核。
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2A2A2A] mb-1.5">
                    项目名称
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#E5E0D5] bg-white px-4 py-2.5 text-sm text-[#2A2A2A] outline-none transition-colors focus:border-[#E88B2E] focus:ring-1 focus:ring-[#E88B2E]"
                    placeholder="给你的项目起个名字"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2A2A2A] mb-1.5">
                    技术栈
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.stack}
                    onChange={(e) =>
                      setFormData({ ...formData, stack: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#E5E0D5] bg-white px-4 py-2.5 text-sm text-[#2A2A2A] outline-none transition-colors focus:border-[#E88B2E] focus:ring-1 focus:ring-[#E88B2E]"
                    placeholder="例如：Python, requests, API"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2A2A2A] mb-1.5">
                    项目描述
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData({ ...formData, desc: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#E5E0D5] bg-white px-4 py-2.5 text-sm text-[#2A2A2A] outline-none transition-colors focus:border-[#E88B2E] focus:ring-1 focus:ring-[#E88B2E] resize-none"
                    placeholder="简单描述一下这个项目做什么，适合谁"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2A2A2A] mb-1.5">
                    你的GitHub用户名（可选）
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    className="w-full rounded-lg border border-[#E5E0D5] bg-white px-4 py-2.5 text-sm text-[#2A2A2A] outline-none transition-colors focus:border-[#E88B2E] focus:ring-1 focus:ring-[#E88B2E]"
                    placeholder="@username"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg hover:-translate-y-px"
                >
                  <Send className="mr-2 h-4 w-4" />
                  提交项目
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-[#8A8A8A] mb-2">
                或者，直接在 GitHub 上提交
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[#4A4A4A] hover:text-[#E88B2E] transition-colors"
              >
                <Github className="h-4 w-4" />
                前往 GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ Section 5: CTA ════════════ */}
      <section className="bg-[#2A2A2A] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
          >
            准备好开始你的第一个项目了吗？
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#8A8A8A] text-base mb-8"
          >
            选一个项目，2 小时后你会感谢现在的自己。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4,
              duration: 0.4,
              ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/projects"
              className="inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg"
            >
              浏览项目库
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/learning-path"
              className="text-white text-sm underline underline-offset-4 hover:text-[#E88B2E] transition-colors"
            >
              查看学习路径
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
