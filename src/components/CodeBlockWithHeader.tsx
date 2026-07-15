import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, FileCode } from 'lucide-react'

/* ───────────────────────── types ───────────────────────── */

interface CodeBlockWithHeaderProps {
  filename: string
  filepath?: string
  lineRange?: string
  action: 'new-file' | 'new-function' | 'modify' | 'replace'
  description?: string
  language: string
  code: string
  stepNum?: number
}

/* ───────────────────────── action badge config ───────────────────────── */

const actionConfig = {
  'new-file':   { label: '新增文件', className: 'bg-[#7BA37E] text-white' },
  'new-function': { label: '新增函数', className: 'bg-[#E88B2E] text-white' },
  'modify':     { label: '修改代码', className: 'bg-[#4A90D9] text-white' },
  'replace':    { label: '替换代码', className: 'bg-[#F27B4C] text-white' },
}

/* ───────────────────────── simple syntax highlighter ───────────────────────── */

function highlightCode(code: string, _lang: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments
  html = html.replace(/(# .*$)/gm, '<span style="color:#8A8A8A">$1</span>')
  html = html.replace(/(\/\/ .*$)/gm, '<span style="color:#8A8A8A">$1</span>')
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#8A8A8A">$1</span>')

  // Strings
  html = html.replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color:#E88B2E">$1</span>')

  // Keywords
  const keywords = [
    'import', 'from', 'def', 'return', 'if', 'else', 'elif', 'for', 'in',
    'while', 'True', 'False', 'None', 'try', 'except', 'async', 'await',
    'const', 'let', 'var', 'function', 'class', 'new', 'this', 'export',
    'default', 'interface', 'type', 'as',
  ]
  const kwPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
  html = html.replace(kwPattern, '<span style="color:#7BA37E">$1</span>')

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span style="color:#F27B4C">$1</span>')

  // Functions
  html = html.replace(/(\w+)(?=\()/g, '<span style="color:#C07BA0">$1</span>')

  return html
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
}: CodeBlockWithHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  const actionInfo = actionConfig[action]
  const displayPath = filepath ? `${filepath}${filename}` : filename

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden border border-[#E5E0D5] my-4"
    >
      {/* Header bar */}
      <div className="bg-[#2A2A2A] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-[#E88B2E]" />
            <span className="font-mono text-sm font-semibold text-white">
              {displayPath}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-[#8A8A8A] hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#7BA37E]" />
                <span className="text-[#7BA37E]">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${actionInfo.className}`}>
            {actionInfo.label}
          </span>
          {lineRange && (
            <span className="text-xs text-[#8A8A8A]">{lineRange}</span>
          )}
        </div>
        {description && (
          <p className="text-xs text-[#8A8A8A] mt-1.5">{description}</p>
        )}
      </div>

      {/* Code body */}
      <div className="bg-[#1E1E1E] overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code
            dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
          />
        </pre>
      </div>
    </motion.div>
  )
}
