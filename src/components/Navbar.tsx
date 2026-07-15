import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, Code2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: '首页', href: '/' },
  { label: '项目库', href: '/projects' },
  { label: '学习路径', href: '/learning-path' },
  { label: '关于我们', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={
          'fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#E5E0D5] bg-white transition-all duration-300 ' +
          (scrolled ? 'backdrop-blur-md bg-white/90' : '')
        }
      >
        <div className="mx-auto max-w-7xl px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Code2 className="h-6 w-6 text-[#E88B2E] transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-display font-bold text-xl text-[#2A2A2A]">
              CodeFirst
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={
                  'text-sm font-medium transition-colors duration-200 hover:text-[#E88B2E] ' +
                  (location.pathname === link.href
                    ? 'text-[#E88B2E]'
                    : 'text-[#4A4A4A]')
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/projects"
            className="hidden md:inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg hover:opacity-90"
          >
            开始第一个项目
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#2A2A2A] hover:bg-[#F4EFE6] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="打开菜单"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#E5E0D5]">
                <span className="font-display font-bold text-lg text-[#2A2A2A]">菜单</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-[#2A2A2A] hover:bg-[#F4EFE6] transition-colors"
                  aria-label="关闭菜单"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className={
                        'block px-4 py-3 rounded-xl text-sm font-medium transition-colors ' +
                        (location.pathname === link.href
                          ? 'bg-[#FDF3E8] text-[#E88B2E]'
                          : 'text-[#4A4A4A] hover:bg-[#F4EFE6]')
                      }
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto p-4 border-t border-[#E5E0D5]">
                <Link
                  to="/projects"
                  className="flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00]"
                >
                  开始第一个项目
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
