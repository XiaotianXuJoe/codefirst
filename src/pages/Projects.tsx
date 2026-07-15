import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Clock,
  Code2,
  Target,
  ChevronDown,
  FileCode,
  Terminal,
  Globe,
  X,
  LayoutGrid,
  List,
  ArrowRight,
  SearchX,
  SlidersHorizontal,
} from 'lucide-react'

// ── Animation Constants ─────────────────────────────────────────────
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number]
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number]
const easeBounce = [0.68, -0.55, 0.265, 1.55] as [number, number, number, number]

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
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

// ── Level Config ────────────────────────────────────────────────────
const levelConfig: Record<
  number,
  { gradient: string; text: string; icon: typeof FileCode }
> = {
  0: {
    gradient: 'from-[#7BA37E] to-[#5C8A5F]',
    text: '代码片段 — 复制即可运行',
    icon: FileCode,
  },
  1: {
    gradient: 'from-[#E88B2E] to-[#B55A00]',
    text: '控制台应用 — 需安装依赖',
    icon: Terminal,
  },
  2: {
    gradient: 'from-[#C07BA0] to-[#9B5A7D]',
    text: '网页应用 — 涉及API与存储',
    icon: Globe,
  },
}

// ── Project Data ────────────────────────────────────────────────────
const allProjects = [
  {
    id: 1,
    slug: 'password-generator',
    emoji: '\u{1F510}',
    title: '个人密码生成器',
    level: 0,
    levelLabel: 'Level 0',
    levelColor: 'from-[#7BA37E] to-[#5C8A5F]',
    time: '1-2\u5C0F\u65F6',
    lines: '~60\u884C',
    stack: ['Python'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    description: '\u751F\u6210\u968F\u673A\u5F3A\u5BC6\u7801\uFF0C\u652F\u6301\u81EA\u5B9A\u4E49\u957F\u5EA6\u548C\u5B57\u7B26\u7C7B\u578B\uFF0C\u9644\u5E26\u5BC6\u7801\u5F3A\u5EA6\u68C0\u6D4B\u529F\u80FD\u3002',
    resumeValue: 'Python\u57FA\u7840 \u00B7 \u5B57\u7B26\u4E32\u5904\u7406 \u00B7 \u7528\u6237\u4EA4\u4E92',
    image: '/project-password.jpg',
  },
  {
    id: 2,
    slug: 'weather-cli',
    emoji: '\u{1F324}\uFE0F',
    title: '命令行天气查询工具',
    level: 1,
    levelLabel: 'Level 1',
    levelColor: 'from-[#E88B2E] to-[#B55A00]',
    time: '2-3\u5C0F\u65F6',
    lines: '~80\u884C',
    stack: ['Python', 'requests'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    description: '\u8C03\u7528\u5929\u6C14API\u83B7\u53D6\u5B9E\u65F6\u6570\u636E\uFF0C\u652F\u6301\u6444\u6C0F/\u534E\u6C0F\u5207\u6362\uFF0C\u5E26\u9519\u8BEF\u5904\u7406\u3002',
    resumeValue: 'API\u8C03\u7528 \u00B7 \u7B2C\u4E09\u65B9\u5E93 \u00B7 \u5F02\u5E38\u5904\u7406',
    image: '/project-weather.jpg',
  },
  {
    id: 3,
    slug: 'file-renamer',
    emoji: '\u{1F4C1}',
    title: '文件批量重命名工具',
    level: 1,
    levelLabel: 'Level 1',
    levelColor: 'from-[#E88B2E] to-[#B55A00]',
    time: '2-4\u5C0F\u65F6',
    lines: '~100\u884C',
    stack: ['Python', 'os/pathlib'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    description: '\u6279\u91CF\u6DFB\u52A0\u524D\u7F00/\u540E\u7F00\u3001\u6309\u5E8F\u53F7\u91CD\u547D\u540D\u3001\u5B57\u7B26\u4E32\u66FF\u6362\uFF0C\u652F\u6301\u9884\u89C8\u6A21\u5F0F\u3002',
    resumeValue: '\u6587\u4EF6\u64CD\u4F5C \u00B7 \u8DEF\u5F84\u5904\u7406 \u00B7 \u81EA\u52A8\u5316\u811A\u672C',
    image: '/project-rename.jpg',
  },
  {
    id: 4,
    slug: 'github-profile',
    emoji: '\u{1F50D}',
    title: 'GitHub用户资料查询站',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '3-5\u5C0F\u65F6',
    lines: '~150\u884C',
    stack: ['HTML', 'CSS', 'JavaScript'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    description: '\u7EAF\u524D\u7AEF\u8C03\u7528GitHub API\uFF0C\u5C55\u793A\u7528\u6237\u8D44\u6599\u5361\u7247\uFF0C\u53EF\u90E8\u7F72\u5230GitHub Pages\u3002',
    resumeValue: '\u524D\u7AEF\u5F00\u53D1 \u00B7 API\u96C6\u6210 \u00B7 \u54CD\u5E94\u5F0F\u5E03\u5C40',
    image: '/project-github.jpg',
  },
  {
    id: 5,
    slug: 'todo-app',
    emoji: '\u2705',
    title: '待办事项管理网页',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '4-6\u5C0F\u65F6',
    lines: '~200\u884C',
    stack: ['HTML', 'CSS', 'JavaScript'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    description: '\u5B8C\u6574\u7684CRUD\u5F85\u529E\u5E94\u7528\uFF0C\u6570\u636E\u6301\u4E45\u5316\uFF0C\u652F\u6301\u7B5B\u9009\u67E5\u770B\uFF0C\u53EF\u90E8\u7F72\u4E0A\u7EBF\u3002',
    resumeValue: 'CRUD\u5F00\u53D1 \u00B7 LocalStorage \u00B7 DOM\u64CD\u4F5C',
    image: '/project-todo.jpg',
  },
]

// ── Sort Options ────────────────────────────────────────────────────
type SortOption = 'default' | 'difficulty-asc' | 'difficulty-desc' | 'time-asc'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: '\u9ED8\u8BA4' },
  { value: 'difficulty-asc', label: '\u96BE\u5EA6\u9012\u589E' },
  { value: 'difficulty-desc', label: '\u96BE\u5EA6\u9012\u51CF' },
  { value: 'time-asc', label: '\u65F6\u95F4\u7531\u77ED\u5230\u957F' },
]

// ── Level Filter Tabs ───────────────────────────────────────────────
type LevelFilter = 'all' | 0 | 1 | 2

const levelFilters: { value: LevelFilter; label: string; color: string }[] = [
  { value: 'all', label: '\u5168\u90E8', color: 'from-[#E88B2E] to-[#B55A00]' },
  { value: 0, label: 'Level 0', color: 'from-[#7BA37E] to-[#5C8A5F]' },
  { value: 1, label: 'Level 1', color: 'from-[#E88B2E] to-[#B55A00]' },
  { value: 2, label: 'Level 2', color: 'from-[#C07BA0] to-[#9B5A7D]' },
]

// ── Parse time for sorting ──────────────────────────────────────────
function parseTimeMin(timeStr: string): number {
  const match = timeStr.match(/(\d+)(?:-(\d+))?/)
  if (!match) return 999
  return parseInt(match[1], 10)
}

// ═══════════════════════════════════════════════════════════════════
//  PROJECTS PAGE
// ═══════════════════════════════════════════════════════════════════
export default function Projects() {
  // ── State ────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLevel, setActiveLevel] = useState<LevelFilter>('all')
  const [activeSort, setActiveSort] = useState<SortOption>('default')
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterBarScrolled, setFilterBarScrolled] = useState(false)

  const sortDropdownRef = useRef<HTMLDivElement>(null)

  // ── Sticky filter bar scroll detection ───────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setFilterBarScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Close sort dropdown on outside click ─────────────────────────
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setSortDropdownOpen(false)
      }
    }
    if (sortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sortDropdownOpen])

  // ── Filtered & Sorted Projects ──────────────────────────────────
  const filteredProjects = useMemo(() => {
    let result = [...allProjects]

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // Level filter
    if (activeLevel !== 'all') {
      result = result.filter((p) => p.level === activeLevel)
    }

    // Sort
    switch (activeSort) {
      case 'difficulty-asc':
        result.sort((a, b) => a.level - b.level)
        break
      case 'difficulty-desc':
        result.sort((a, b) => b.level - a.level)
        break
      case 'time-asc':
        result.sort((a, b) => parseTimeMin(a.time) - parseTimeMin(b.time))
        break
      default:
        // Keep default order (by id)
        break
    }

    return result
  }, [searchQuery, activeLevel, activeSort])

  // ── Active filter count for clear button ────────────────────────
  const activeFilterCount =
    (searchQuery ? 1 : 0) + (activeLevel !== 'all' ? 1 : 0)

  // ── Clear all filters ───────────────────────────────────────────
  const clearFilters = () => {
    setSearchQuery('')
    setActiveLevel('all')
    setActiveSort('default')
  }

  // ── Current sort label ──────────────────────────────────────────
  const currentSortLabel =
    sortOptions.find((o) => o.value === activeSort)?.label || '\u9ED8\u8BA4'

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* ═══════ Section 1: Page Header ═══════ */}
      <PageHeader />

      {/* ═══════ Section 2: Filter & Search Bar (Sticky) ═══════ */}
      <div
        className={
          'sticky top-16 z-40 transition-all duration-200 ' +
          (filterBarScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-[#F4EFE6]')
        }
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-shrink-0 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A8A8A]" />
              <input
                type="text"
                placeholder="\u641C\u7D22\u9879\u76EE\u540D\u79F0\u3001\u6280\u672F\u6808..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={
                  'w-full rounded-full border border-[#E5E0D5] bg-white ' +
                  'pl-10 pr-10 py-3 text-sm text-[#2A2A2A] ' +
                  'placeholder:text-[#8A8A8A] ' +
                  'focus:outline-none focus:border-[#E88B2E] focus:ring-1 focus:ring-[#E88B2E]/30 ' +
                  'transition-all duration-200'
                }
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#F4EFE6] transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-[#8A8A8A]" />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 flex-1 lg:justify-end">
              {/* Level Filter Tabs */}
              <div className="flex items-center gap-2">
                {levelFilters.map((filter) => (
                  <motion.button
                    key={String(filter.value)}
                    onClick={() => setActiveLevel(filter.value)}
                    whileTap={{ scale: 0.95 }}
                    className={
                      'relative px-4 py-2 rounded-full text-sm font-medium ' +
                      'border transition-all duration-200 ' +
                      (activeLevel === filter.value
                        ? 'border-transparent text-white '
                        : 'border-[#E5E0D5] text-[#4A4A4A] bg-white hover:border-[#E88B2E]/50')
                    }
                    style={
                      activeLevel === filter.value
                        ? {
                            background:
                              filter.value === 'all'
                                ? 'linear-gradient(135deg, #E88B2E 0%, #B55A00 100%)'
                                : `linear-gradient(135deg, ${filter.value === 0 ? '#7BA37E' : filter.value === 1 ? '#E88B2E' : '#C07BA0'} 0%, ${filter.value === 0 ? '#5C8A5F' : filter.value === 1 ? '#B55A00' : '#9B5A7D'} 100%)`,
                          }
                        : undefined
                    }
                  >
                    {filter.label}
                  </motion.button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className={
                    'flex items-center gap-2 px-4 py-2 rounded-lg border ' +
                    'text-sm font-medium transition-all duration-200 ' +
                    (sortDropdownOpen
                      ? 'border-[#E88B2E] text-[#E88B2E] bg-[#FDF3E8]'
                      : 'border-[#E5E0D5] text-[#4A4A4A] bg-white hover:border-[#E88B2E]/50')
                  }
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {currentSortLabel}
                  <ChevronDown
                    className={
                      'h-3.5 w-3.5 transition-transform duration-200 ' +
                      (sortDropdownOpen ? 'rotate-180' : '')
                    }
                  />
                </button>

                <AnimatePresence>
                  {sortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: easeSmooth }}
                      className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-[#E5E0D5] shadow-lg overflow-hidden z-50"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setActiveSort(option.value)
                            setSortDropdownOpen(false)
                          }}
                          className={
                            'w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ' +
                            (activeSort === option.value
                              ? 'bg-[#FDF3E8] text-[#E88B2E] font-medium'
                              : 'text-[#4A4A4A] hover:bg-[#F4EFE6]')
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-[#E5E0D5] rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode('grid')}
                  className={
                    'p-2 transition-all duration-200 ' +
                    (viewMode === 'grid'
                      ? 'bg-[#E88B2E] text-white'
                      : 'text-[#8A8A8A] hover:text-[#4A4A4A]')
                  }
                  aria-label="\u7F51\u683C\u89C6\u56FE"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={
                    'p-2 transition-all duration-200 ' +
                    (viewMode === 'list'
                      ? 'bg-[#E88B2E] text-white'
                      : 'text-[#8A8A8A] hover:text-[#4A4A4A]')
                  }
                  aria-label="\u5217\u8868\u89C6\u56FE"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Clear Filters */}
              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-[#8A8A8A] hover:text-[#F27B4C] transition-colors duration-200"
                  >
                    <X className="h-3.5 w-3.5" />
                    \u6E05\u9664\u7B5B\u9009
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ Section 3: Project List ═══════ */}
      <section className="pb-20 pt-8">
        <div className="mx-auto max-w-7xl px-6">
          {/* Project Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#8A8A8A]">
              {filteredProjects.length > 0 ? (
                <span>
                  \u5171{' '}
                  <span className="font-semibold text-[#2A2A2A]">
                    {filteredProjects.length}
                  </span>{' '}
                  \u4E2A\u9879\u76EE
                </span>
              ) : (
                '\u672A\u627E\u5230\u5339\u914D\u7684\u9879\u76EE'
              )}
            </p>
          </div>

          {/* Grid or List View */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={viewMode + activeLevel + activeSort + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {viewMode === 'grid' ? (
                  <ProjectGrid projects={filteredProjects} />
                ) : (
                  <ProjectList projects={filteredProjects} />
                )}
              </motion.div>
            ) : (
              <EmptyState onClear={clearFilters} />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

// ── Page Header ─────────────────────────────────────────────────────
function PageHeader() {
  return (
    <div className="bg-[#F4EFE6] pt-24 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <nav className="flex items-center gap-2 text-xs text-[#8A8A8A]">
            <Link to="/" className="hover:text-[#E88B2E] transition-colors">
              \u9996\u9875
            </Link>
            <span>&gt;</span>
            <span className="text-[#4A4A4A]">\u9879\u76EE\u5E93</span>
          </nav>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-3"
        >
          \u9879\u76EE\u5E93
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          className="text-[#8A8A8A] text-base max-w-2xl leading-relaxed"
        >
          \u6309\u4F60\u7684\u65F6\u95F4\u548C\u6C34\u5E73\uFF0C\u627E\u5230\u6700\u9002\u5408\u7684\u5B9E\u6218\u9879\u76EE\u3002\u6BCF\u4E2A\u9879\u76EE\u90FD\u80FD\u5728 2-6 \u5C0F\u65F6\u5185\u8DD1\u8D77\u6765\u3002
        </motion.p>
      </div>
    </div>
  )
}

// ── Project Grid View ──────────────────────────────────────────────
function ProjectGrid({ projects }: { projects: typeof allProjects }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <ProjectCardGrid key={project.id} project={project} />
      ))}
    </motion.div>
  )
}

// ── Grid Card ──────────────────────────────────────────────────────
function ProjectCardGrid({
  project,
}: {
  project: (typeof allProjects)[0]
}) {
  const level = levelConfig[project.level]
  const LevelIcon = level.icon

  return (
    <motion.div variants={staggerChild} layout>
      <Link to={`/projects/${project.slug}`}>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: easeSmooth }}
          className={
            'group bg-white rounded-xl border border-[#E5E0D5] p-6 ' +
            'transition-all duration-300 hover:shadow-lg hover:border-[#E88B2E]/50 ' +
            'h-full flex flex-col'
          }
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
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r ${project.levelColor}`}
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

// ── Project List View ──────────────────────────────────────────────
function ProjectList({ projects }: { projects: typeof allProjects }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {projects.map((project) => (
        <ProjectCardList key={project.id} project={project} />
      ))}
    </motion.div>
  )
}

// ── List Card ──────────────────────────────────────────────────────
function ProjectCardList({
  project,
}: {
  project: (typeof allProjects)[0]
}) {
  const level = levelConfig[project.level]
  const LevelIcon = level.icon

  return (
    <motion.div variants={staggerChild} layout>
      <Link to={`/projects/${project.slug}`}>
        <motion.article
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3, ease: easeSmooth }}
          className={
            'group bg-white rounded-xl border border-[#E5E0D5] p-6 ' +
            'transition-all duration-300 hover:shadow-lg hover:border-[#E88B2E]/50 ' +
            'flex flex-col md:flex-row gap-6'
          }
        >
          {/* Thumbnail (larger in list view) */}
          <div className="md:w-60 lg:w-72 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {/* Title + Level Badge */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <h3 className="font-display text-xl font-semibold text-[#2A2A2A] group-hover:text-[#E88B2E] transition-colors">
                {project.title}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r ${project.levelColor}`}
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

            {/* Description (fuller in list view) */}
            <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Bottom Row: Resume Value + CTA */}
            <div className="flex flex-wrap items-center gap-3 mt-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0EB] text-[#F27B4C] text-xs font-medium">
                <Target className="h-3 w-3" />
                {project.resumeValue}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E88B2E] group-hover:underline">
                \u67E5\u770B\u5B8C\u6574\u6307\u5357
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}

// ── Empty State ────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: easeBounce }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: easeBounce }}
      >
        <SearchX className="h-12 w-12 text-[#8A8A8A] mb-4" />
      </motion.div>
      <h3 className="font-display text-xl font-semibold text-[#2A2A2A] mb-2">
        \u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u9879\u76EE
      </h3>
      <p className="text-sm text-[#8A8A8A] mb-6 max-w-md">
        \u5C1D\u8BD5\u8C03\u6574\u7B5B\u9009\u6761\u4EF6\u6216\u641C\u7D22\u5173\u952E\u8BCD
      </p>
      <button
        onClick={onClear}
        className={
          'inline-flex items-center gap-2 px-6 py-2.5 rounded-full ' +
          'border-2 border-[#E88B2E] text-[#E88B2E] font-medium text-sm ' +
          'transition-all duration-300 hover:bg-[#E88B2E] hover:text-white'
        }
      >
        <X className="h-4 w-4" />
        \u6E05\u9664\u6240\u6709\u7B5B\u9009
      </button>
    </motion.div>
  )
}
