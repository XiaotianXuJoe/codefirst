import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import { Copy, Check, FileCode } from 'lucide-react'

/* ───────────────────────── register languages ───────────────────────── */

SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('html', markup)

/* ───────────────────────── types ───────────────────────── */

export interface CodeBlockWithHeaderProps {
  filename: string
  filepath?: string
  lineRange?: string
  action: 'new-file' | 'new-function' | 'modify' | 'replace'
  description?: string
  language: string
  code: string
  stepNum?: number
}

/* ───────────────────────── action config ───────────────────────── */

const actionConfig = {
  'new-file': {
    bg: 'bg-[#7BA37E]',
    text: '新增文件',
  },
  'new-function': {
    bg: 'bg-[#E88B2E]',
    text: '新增函数',
  },
  modify: {
    bg: 'bg-[#4A90D9]',
    text: '修改代码',
  },
  replace: {
    bg: 'bg-[#F27B4C]',
    text: '替换代码',
  },
}

/* ───────────────────────── component ───────────────────────── */

export default function CodeBlockWithHeader({
  filename,
  filepath,
  lineRange,
  action,
  description,
  language,
  code,
  stepNum,
}: CodeBlockWithHeaderProps) {
  const [copied, setCopied] = useState(false)
  const config = actionConfig[action]

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const displayPath = filepath ? `${filepath}${filename}` : filename

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="rounded-xl overflow-hidden border border-[#E5E0D5] shadow-sm"
    >
      {/* ── Location Bar ── */}
      <div className="bg-[#2A2A2A] px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          {/* Left: file info */}
          <div className="flex-1 min-w-0">
            {/* Filename */}
            <div className="flex items-center gap-2 mb-1.5">
              <FileCode className="h-4 w-4 shrink-0 text-[#E88B2E]" />
              <span className="font-mono text-sm font-semibold text-white truncate">
                {displayPath}
              </span>
              {stepNum !== undefined && (
                <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#8A8A8A]">
                  Step {stepNum}
                </span>
              )}
            </div>

            {/* Line range + action badge */}
            <div className="flex items-center gap-2 flex-wrap">
              {lineRange && (
                <span className="text-xs text-[#8A8A8A]">{lineRange}</span>
              )}
              {lineRange && <span className="text-[#8A8A8A]">·</span>}
              <span
                className={
                  'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ' +
                  config.bg
                }
              >
                {config.text}
              </span>
              <span className="text-[10px] text-[#8A8A8A]">
                {action === 'new-file' && '创建新文件'}
                {action === 'new-function' && '在文件底部添加'}
                {action === 'modify' && '修改现有代码'}
                {action === 'replace' && '替换现有代码'}
              </span>
            </div>

            {/* Description */}
            {description && (
              <p className="mt-1.5 text-xs text-[#8A8A8A] leading-relaxed">
                作用：{description}
              </p>
            )}
          </div>

          {/* Right: copy button */}
          <button
            onClick={handleCopy}
            className={
              'shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ' +
              (copied
                ? 'bg-[#7BA37E]/20 text-[#7BA37E]'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white')
            }
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                已复制
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                复制
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Code Body ── */}
      <div className="bg-[#1E1E1E]">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1rem 1.25rem',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            background: '#1E1E1E',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: '#4A4A4A',
            fontSize: '0.75rem',
            minWidth: '2em',
            paddingRight: '1em',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  )
}
