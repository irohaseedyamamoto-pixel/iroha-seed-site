import React from 'react'
import { motion } from 'motion/react'
import { Leaf, Heart, Sparkles, ArrowRight } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-[#fdfcf8] text-[#3a3a2e] font-serif">
      {/* ナビゲーション */}
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <Leaf className="text-[#5a5a40]" />
          <span>いろはシード</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">Concept</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Products</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <main className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl leading-[1.1] mb-8">
            心に、<br />
            <span className="italic text-[#5a5a40]">小さな種</span>を。
          </h1>
          <p className="text-lg leading-relaxed opacity-80 mb-10 max-w-md">
            いろはシードは、日常の中に「余白」と「彩り」を添える、
            丁寧な暮らしのためのライフスタイルブランドです。
          </p>
          <button className="bg-[#5a5a40] text-white px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#4a4a35] transition-colors group">
            詳しく見る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[3/4] rounded-[100px] overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1000" 
            alt="Nature"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </main>

      {/* 特徴セクション */}
      <section className="bg-white py-32 mt-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <Heart className="w-8 h-8 text-[#5a5a40] opacity-50" />
            <h3 className="text-2xl">想いをかたちに</h3>
            <p className="opacity-70 leading-relaxed">ひとつひとつの素材にこだわり、作り手の想いが伝わるものづくりを大切にしています。</p>
          </div>
          <div className="space-y-4">
            <Sparkles className="w-8 h-8 text-[#5a5a40] opacity-50" />
            <h3 className="text-2xl">日常を特別に</h3>
            <p className="opacity-70 leading-relaxed">何気ない毎日が、少しだけ特別に感じられるような、ささやかな魔法を届けます。</p>
          </div>
          <div className="space-y-4">
            <Leaf className="w-8 h-8 text-[#5a5a40] opacity-50" />
            <h3 className="text-2xl">自然と共に</h3>
            <p className="opacity-70 leading-relaxed">地球に優しく、循環する未来を目指して。持続可能な選択を続けていきます。</p>
          </div>
        </div>
      </section>

      <footer className="p-20 text-center opacity-40 text-sm tracking-widest uppercase">
        &copy; 2024 Iroha Seed. All Rights Reserved.
      </footer>
    </div>
  )
}
