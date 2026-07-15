import { motion } from 'framer-motion'
import {
  FileCode,
  FileText,
  Settings,
  Database,
  Check,
} from 'lucide-react'

/* ───────────────────────── types ───────────────────────── */

export interface StepFileState {
  filename: string
  statusByStep: ('pending' | 'active' | 'completed')[]
}

interface StepFileTreeProps {
  stepNum: number
  totalSteps: number
  fileStates: StepFileState[]
}

/* ───────────────────────── status icons ───────────────────────── */

function StatusIndicator({
  status,
}: {
  status: 'pending' | 'active' | 'completed'
}) {
  if (status === 'completed') {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
        }}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7BA37E]"
      >
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </motion.div>
    )
  }

  if (status === 'active') {
    return (
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E88B2E]"
      >
        <span className="h-2 w-2 rounded-full bg-white" />
      </motion.div>
    )
  }

  // pending
  return (
    <div className="h-5 w-5 rounded-full border-2 border-[#E5E0D5] bg-white" />
  )
}

/* ───────────────────────── file icon ───────────────────────── */

function FileIcon({ filename }: { filename: string }) {
  if (filename.endsWith('.md')) {
    return <FileText className="h-4 w-4 text-[#8A8A8A]" />
  }
  if (filename.endsWith('.txt')) {
    return <Settings className="h-4 w-4 text-[#8A8A8A]" />
  }
  if (filename.endsWith('.json') || filename.endsWith('.csv')) {
    return <Database className="h-4 w-4 text-[#C07BA0]" />
  }
  return <FileCode className="h-4 w-4 text-[#E88B2E]" />
}

function getStatusAtStep(
  fileState: StepFileState,
  stepNum: number,
): 'pending' | 'active' | 'completed' {
  // stepNum is 1-based
  const idx = stepNum - 1
  if (idx < 0 || idx >= fileState.statusByStep.length) return 'pending'
  return fileState.statusByStep[idx]
}

/* ───────────────────────── component ───────────────────────── */

export default function StepFileTree({
  stepNum,
  fileStates,
}: StepFileTreeProps) {
  return (
    <div className="rounded-lg border border-[#E5E0D5] bg-white px-4 py-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A8A]">
          本步骤涉及文件
        </span>
        <span className="text-[#E5E0D5]">|</span>
        <span className="text-[10px] text-[#8A8A8A]">
          Step {stepNum}
        </span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto pb-1">
        {fileStates.map((file) => {
          const status = getStatusAtStep(file, stepNum)
          return (
            <motion.div
              key={file.filename}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-1.5 min-w-[48px]"
            >
              <StatusIndicator status={status} />
              <FileIcon filename={file.filename} />
              <span className="font-mono text-[10px] text-[#4A4A4A] whitespace-nowrap">
                {file.filename}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-3 border-t border-[#F4EFE6] pt-2">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full border-2 border-[#E5E0D5] bg-white" />
          <span className="text-[10px] text-[#8A8A8A]">待开始</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-[#E88B2E]" />
          <span className="text-[10px] text-[#8A8A8A]">正在编辑</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#7BA37E]">
            <Check className="h-2 w-2 text-white" strokeWidth={3} />
          </div>
          <span className="text-[10px] text-[#8A8A8A]">已完成</span>
        </div>
      </div>
    </div>
  )
}
