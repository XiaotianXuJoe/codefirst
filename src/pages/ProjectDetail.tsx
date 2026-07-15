import { useParams } from 'react-router'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="font-display text-3xl font-bold text-[#2A2A2A] mb-4">项目详情</h1>
      <p className="text-[#8A8A8A]">项目 slug: {slug}</p>
      <p className="text-[#8A8A8A] mt-2">这里是项目详情页面，由页面代理实现完整功能。</p>
    </div>
  )
}
