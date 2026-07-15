import { Link } from 'react-router'
import { Code2, Github, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-[#E88B2E]" />
              <span className="font-display font-bold text-xl">CodeFirst</span>
            </div>
            <p className="text-[#8A8A8A] text-sm leading-relaxed">
              帮助零基础转码者找到第一个实战项目
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">快速链接</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/projects"
                  className="text-[#8A8A8A] text-sm hover:text-white transition-colors duration-200"
                >
                  项目库
                </Link>
              </li>
              <li>
                <Link
                  to="/learning-path"
                  className="text-[#8A8A8A] text-sm hover:text-white transition-colors duration-200"
                >
                  学习路径
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#8A8A8A] text-sm hover:text-white transition-colors duration-200"
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">资源</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8A8A8A] text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#8A8A8A] text-sm hover:text-white transition-colors duration-200"
                >
                  贡献项目
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#404040] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8A8A8A] text-xs">
            &copy; 2025 CodeFirst. 让每个人都能写出人生第一个项目。
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A8A8A] hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A8A8A] hover:text-white transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
