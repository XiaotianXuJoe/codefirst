import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  Settings,
  Database,
  ChevronRight,
  Info,
} from 'lucide-react'

/* ───────────────────────── types ───────────────────────── */

export interface FileNode {
  name: string
  type: 'folder' | 'file-core' | 'file-config' | 'file-doc' | 'file-data'
  description?: string
  analogy?: string
  required: boolean
  children?: FileNode[]
}

interface FileTreeProps {
  structure: FileNode[]
  activeFile?: string
  completedFiles?: string[]
}

/* ───────────────────────── helpers ───────────────────────── */

const typeConfig = {
  folder: {
    iconColor: 'text-[#4A90D9]',
    Icon: Folder,
    IconOpen: FolderOpen,
    label: '文件夹',
  },
  'file-core': {
    iconColor: 'text-[#E88B2E]',
    Icon: FileCode,
    label: '入口文件 / 核心模块',
  },
  'file-config': {
    iconColor: 'text-[#8A8A8A]',
    Icon: Settings,
    label: '配置文件',
  },
  'file-doc': {
    iconColor: 'text-[#8A8A8A]',
    Icon: FileText,
    label: '文档',
  },
  'file-data': {
    iconColor: 'text-[#C07BA0]',
    Icon: Database,
    label: '数据文件',
  },
}

function getFileTypeLabel(type: FileNode['type']): string {
  return typeConfig[type]?.label ?? '文件'
}

function RequiredBadge({ required }: { required: boolean }) {
  if (required) {
    return (
      <span className="inline-flex items-center rounded-full bg-[#E8F0E9] px-2 py-0.5 text-[10px] font-medium text-[#5C8A5F]">
        必需
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[#FDF3E8] px-2 py-0.5 text-[10px] font-medium text-[#B55A00]">
      推荐
    </span>
  )
}

/* ───────────────────────── FileCard ───────────────────────── */

function FileCard({
  node,
  isActive,
}: {
  node: FileNode
  isActive: boolean
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="overflow-hidden"
    >
      <div
        className={
          'mt-1 ml-6 rounded-lg border p-3 ' +
          (isActive
            ? 'border-[#E88B2E] bg-[#FDF3E8]'
            : 'border-[#E5E0D5] bg-[#FAFAF8]')
        }
      >
        {/* Description */}
        {node.description && (
          <div className="mb-2 flex items-start gap-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4A90D9]" />
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A8A]">
                作用
              </span>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                {node.description}
              </p>
            </div>
          </div>
        )}

        {/* Type & Required */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-[#8A8A8A]">
            {getFileTypeLabel(node.type)}
          </span>
          <span className="text-[#E5E0D5]">·</span>
          <RequiredBadge required={node.required} />
        </div>

        {/* Analogy */}
        {node.analogy && (
          <div className="rounded-md bg-white/70 p-2 border border-[#E5E0D5]/50">
            <span className="text-[10px] font-medium text-[#E88B2E]">
              类比
            </span>
            <p className="text-xs text-[#4A4A4A] leading-relaxed italic">
              &ldquo;{node.analogy}&rdquo;
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ───────────────────────── TreeNode ───────────────────────── */

function TreeNode({
  node,
  depth,
  activeFile,
  expandedFolders,
  toggleFolder,
  selectedFile,
  setSelectedFile,
}: {
  node: FileNode
  depth: number
  activeFile?: string
  expandedFolders: Set<string>
  toggleFolder: (name: string) => void
  selectedFile: string | null
  setSelectedFile: (name: string | null) => void
}) {
  const isFolder = node.type === 'folder'
  const isExpanded = expandedFolders.has(node.name)
  const isSelected = selectedFile === node.name
  const isActiveFile = activeFile === node.name

  const config = typeConfig[node.type]
  const IconComponent =
    isFolder && isExpanded
      ? (config as typeof typeConfig['folder']).IconOpen
      : config.Icon

  const handleClick = () => {
    if (isFolder) {
      toggleFolder(node.name)
    } else {
      setSelectedFile(isSelected ? null : node.name)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={
          'flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left transition-colors duration-150 ' +
          (isSelected || isActiveFile
            ? 'bg-[#FDF3E8] border-l-2 border-[#E88B2E] pl-2'
            : 'pl-2 hover:bg-[#FDF3E8]') +
          (isFolder ? ' cursor-pointer' : ' cursor-pointer')
        }
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder && (
          <ChevronRight
            className={
              'h-3.5 w-3.5 shrink-0 text-[#8A8A8A] transition-transform duration-200 ' +
              (isExpanded ? 'rotate-90' : '')
            }
          />
        )}
        {!isFolder && <span className="w-3.5 shrink-0" />}

        <IconComponent
          className={'h-4 w-4 shrink-0 ' + config.iconColor}
        />

        <span
          className={
            'font-mono text-sm truncate ' +
            (isSelected || isActiveFile
              ? 'font-semibold text-[#2A2A2A]'
              : 'text-[#4A4A4A]')
          }
        >
          {node.name}
        </span>

        {!isFolder && !node.required && (
          <span className="ml-auto shrink-0 text-[10px] text-[#8A8A8A] italic">
            可选
          </span>
        )}
      </button>

      {/* File info card */}
      <AnimatePresence>
        {isSelected && !isFolder && <FileCard node={node} isActive={!!isActiveFile} />}
      </AnimatePresence>

      {/* Children */}
      <AnimatePresence>
        {isFolder && isExpanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            {node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                depth={depth + 1}
                activeFile={activeFile}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── FileTree ───────────────────────── */

export default function FileTree({
  structure,
  activeFile,
}: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    () => new Set(structure.map((n) => n.name))
  )
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <div className="rounded-xl border border-[#E5E0D5] bg-white p-4 shadow-sm">
      {structure.map((node) => (
        <TreeNode
          key={node.name}
          node={node}
          depth={0}
          activeFile={activeFile}
          expandedFolders={expandedFolders}
          toggleFolder={toggleFolder}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      ))}
    </div>
  )
}
