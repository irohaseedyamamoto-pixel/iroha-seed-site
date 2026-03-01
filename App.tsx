/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Menu, 
  X, 
  Sparkles,
  Compass,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Layers,
  Palette
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Theme Definitions ---
type ThemePattern = 
  | 'modern-kyoto' 
  | 'minimal-clean' 
  | 'dark-pro' 
  | 'editorial' 
  | 'technical' 
  | 'warm-organic' 
  | 'brutalist' 
  | 'luxury' 
  | 'utility' 
  | 'immersive';

interface ThemeConfig {
  name: string;
  bg: string;
  text: string;
  accent: string;
  accentText: string;
  secondary: string;
  border: string;
  card: string;
  footer: string;
  font: string;
  radius: string;
  shadow: string;
}

const THEMES: Record<ThemePattern, ThemeConfig> = {
  'modern-kyoto': {
    name: 'モダン京都',
    bg: 'bg-[#F5F5F0]',
    text: 'text-[#1A1A1A]',
    accent: 'bg-[#2B4C7E]',
    accentText: 'text-[#2B4C7E]',
    secondary: 'text-[#1A1A1A]/70',
    border: 'border-[#2B4C7E]/10',
    card: 'bg-white',
    footer: 'bg-[#1A1A1A]',
    font: 'font-serif',
    radius: 'rounded-sm',
    shadow: 'shadow-sm'
  },
  'minimal-clean': {
    name: 'ミニマル・クリーン',
    bg: 'bg-white',
    text: 'text-slate-900',
    accent: 'bg-black',
    accentText: 'text-black',
    secondary: 'text-slate-500',
    border: 'border-slate-100',
    card: 'bg-white',
    footer: 'bg-slate-50',
    font: 'font-sans',
    radius: 'rounded-none',
    shadow: 'shadow-none'
  },
  'dark-pro': {
    name: 'ダーク・プロ',
    bg: 'bg-[#0F172A]',
    text: 'text-slate-100',
    accent: 'bg-emerald-500',
    accentText: 'text-emerald-400',
    secondary: 'text-slate-400',
    border: 'border-slate-800',
    card: 'bg-slate-900',
    footer: 'bg-black',
    font: 'font-sans',
    radius: 'rounded-2xl',
    shadow: 'shadow-2xl shadow-emerald-500/10'
  },
  'editorial': {
    name: 'エディトリアル',
    bg: 'bg-[#FAFAFA]',
    text: 'text-black',
    accent: 'bg-[#D4AF37]',
    accentText: 'text-[#D4AF37]',
    secondary: 'text-black/60',
    border: 'border-black/5',
    card: 'bg-white',
    footer: 'bg-black',
    font: 'font-serif',
    radius: 'rounded-none',
    shadow: 'shadow-xl'
  },
  'technical': {
    name: 'テクニカル',
    bg: 'bg-[#F1F5F9]',
    text: 'text-slate-900',
    accent: 'bg-indigo-600',
    accentText: 'text-indigo-600',
    secondary: 'text-slate-500',
    border: 'border-slate-200',
    card: 'bg-white',
    footer: 'bg-slate-900',
    font: 'font-mono',
    radius: 'rounded-md',
    shadow: 'shadow-md'
  },
  'warm-organic': {
    name: 'ウォーム・オーガニック',
    bg: 'bg-[#FDF8F3]',
    text: 'text-[#4A3728]',
    accent: 'bg-[#8B5E3C]',
    accentText: 'text-[#8B5E3C]',
    secondary: 'text-[#4A3728]/70',
    border: 'border-[#8B5E3C]/10',
    card: 'bg-white',
    footer: 'bg-[#2D1E12]',
    font: 'font-sans',
    radius: 'rounded-[2rem]',
    shadow: 'shadow-lg shadow-[#8B5E3C]/5'
  },
  'brutalist': {
    name: 'ブルータリスト',
    bg: 'bg-white',
    text: 'text-black',
    accent: 'bg-[#FF3E00]',
    accentText: 'text-[#FF3E00]',
    secondary: 'text-black/80',
    border: 'border-4 border-black',
    card: 'bg-white',
    footer: 'bg-black',
    font: 'font-sans font-black',
    radius: 'rounded-none',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
  },
  'luxury': {
    name: 'ラグジュアリー',
    bg: 'bg-[#0A0A0A]',
    text: 'text-[#E5E5E5]',
    accent: 'bg-[#C5A059]',
    accentText: 'text-[#C5A059]',
    secondary: 'text-[#E5E5E5]/60',
    border: 'border-[#C5A059]/20',
    card: 'bg-[#141414]',
    footer: 'bg-black',
    font: 'font-serif',
    radius: 'rounded-sm',
    shadow: 'shadow-2xl'
  },
  'utility': {
    name: 'ユーティリティ',
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'bg-blue-600',
    accentText: 'text-blue-600',
    secondary: 'text-slate-600',
    border: 'border-slate-200',
    card: 'bg-white',
    footer: 'bg-white',
    font: 'font-sans',
    radius: 'rounded-lg',
    shadow: 'shadow-sm border'
  },
  'immersive': {
    name: 'イマーシブ',
    bg: 'bg-black',
    text: 'text-white',
    accent: 'bg-white/20',
    accentText: 'text-white',
    secondary: 'text-white/60',
    border: 'border-white/10',
    card: 'bg-white/5 backdrop-blur-xl',
    footer: 'bg-black',
    font: 'font-sans',
    radius: 'rounded-3xl',
    shadow: 'shadow-2xl'
  }
};

// --- Components ---

const PatternSwitcher = ({ current, onSelect }: { current: ThemePattern, onSelect: (p: ThemePattern) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 bg-white shadow-2xl rounded-2xl p-4 w-64 border border-slate-200 overflow-hidden"
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
              <Palette className="w-3 h-3" /> デザインパターン選択
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto pr-2">
              {(Object.keys(THEMES) as ThemePattern[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    onSelect(p);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                    current === p 
                      ? "bg-slate-900 text-white" 
                      : "hover:bg-slate-100 text-slate-600"
                  )}
                >
                  {THEMES[p].name}
                  {current === p && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X /> : <Layers />}
      </button>
    </div>
  );
};

const Navbar = ({ theme }: { theme: ThemeConfig }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'サービス', href: '#services' },
    { name: '強み', href: '#strengths' },
    { name: '実績', href: '#achievements' },
    { name: '会社概要', href: '#company' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 md:py-6 flex justify-between items-center",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200" : "bg-transparent"
    )}>
      <div className="flex items-center gap-3">
        <img 
          src="https://lh3.googleusercontent.com/d/1yqIub1aBMMsKDQHG1iH5IjUAKKMCl-Fj" 
          alt="iroha Seed Logo" 
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className={cn("text-xl font-black tracking-tighter leading-none", isScrolled ? "text-black" : theme.text)}>iroha Seed</span>
          <span className={cn("text-[10px] font-bold opacity-50 tracking-widest", isScrolled ? "text-black" : theme.text)}>by Hiroso Inc.</span>
        </div>
      </div>

      <div className={cn("hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest", isScrolled ? "text-black" : theme.text)}>
        {navLinks.map(link => (
          <a key={link.name} href={link.href} className="hover:opacity-50 transition-opacity">{link.name}</a>
        ))}
        <a href="#contact" className={cn("px-8 py-3 text-white transition-transform hover:scale-105 shadow-lg", theme.accent, theme.radius)}>
          無料相談
        </a>
      </div>

      <button className={cn("md:hidden p-2", isScrolled ? "text-black" : theme.text)} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-bold text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className={cn("px-8 py-4 text-white text-center font-bold", theme.accent, theme.radius)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              無料相談
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, theme, light = false }: { title: string, subtitle: string, theme: ThemeConfig, light?: boolean }) => (
  <div className="mb-12 md:mb-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={cn("text-xs md:text-sm font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-3 md:mb-4", light ? "text-white/50" : "opacity-50", theme.accentText)}>{subtitle}</h2>
      <p className={cn("text-2xl md:text-5xl font-bold leading-tight text-balance", light ? "text-white" : theme.text)}>title</p>
    </motion.div>
  </div>
);

const Hero = ({ theme }: { theme: ThemeConfig }) => {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-20 overflow-hidden">
      <div className={cn("absolute top-0 right-0 w-1/2 h-full -z-10 hidden lg:block opacity-10", theme.accent)} />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className={cn("inline-block px-4 py-1 mb-6 md:mb-8 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] border", theme.accentText, theme.border)}>
            実戦型マーケティングパートナー
          </div>
          <h1 className={cn("text-3xl sm:text-5xl md:text-8xl font-black leading-[1.2] md:leading-[1.1] mb-8 md:mb-10 tracking-tighter text-balance", theme.text)}>
            売れる仕組みを、<br className="hidden sm:block" />
            <span className={cn("underline underline-offset-8 decoration-2", theme.accentText)}>再設計</span>する。
          </h1>
          <p className={cn("text-base md:text-2xl mb-10 md:mb-12 max-w-xl leading-relaxed font-medium text-balance", theme.secondary)}>
            机上の空論ではない、経営者視点の実戦型マーケティング支援。
            売上が積み上がる全体構造を、現場理解から組み直します。
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#contact" className={cn(
              "px-10 py-5 font-bold text-white text-lg transition-all hover:-translate-y-1 active:scale-95",
              theme.accent,
              theme.radius,
              theme.shadow
            )}>
              無料で相談する
            </a>
            <a href="#services" className={cn(
              "px-10 py-5 font-bold border text-lg transition-all hover:bg-black/5",
              theme.border,
              theme.text,
              theme.radius
            )}>
              サービスを見る
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative mt-12 lg:mt-0"
        >
          <div className={cn("aspect-[4/5] overflow-hidden", theme.radius, theme.shadow)}>
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000" 
              alt="戦略設計" 
              className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "absolute bottom-4 left-4 md:-bottom-10 md:-left-10 p-5 md:p-8 border bg-white text-black z-10",
              theme.radius,
              theme.shadow
            )}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white", theme.accent)}>
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-50">売上成長率</div>
                <div className="text-xl md:text-2xl font-black">+166%</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className={cn("absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30", theme.text)}>
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

const ProblemSection = ({ theme }: { theme: ThemeConfig }) => {
  const problems = [
    "広告や集客施策を行っているのに、売上の伸びにつながっていない",
    "問い合わせや見込み客はいるのに、成約や継続につながらない",
    "LP、営業、導線、商品設計がバラバラで、全体最適になっていない",
    "表面的なアドバイスではなく、現場まで踏み込んだ実務支援がほしい"
  ];

  return (
    <section className={cn("py-20 md:py-32 px-6 md:px-12", theme.card === 'bg-white' ? 'bg-white' : theme.bg)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <SectionHeader 
              subtitle="課題" 
              title="なぜ、施策を増やしても売上が伸びないのか？" 
              theme={theme}
            />
            <p className={cn("text-base md:text-lg mb-12 leading-relaxed text-balance", theme.secondary)}>
              売上が伸びない原因は、広告だけ、LPだけ、営業だけの問題ではありません。
              現場理解、訴求、導線、提案、改善が分断されていると、施策を増やしても成果は安定しません。
            </p>
          </div>
          <div className="space-y-6">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn("flex items-start gap-4 p-4 sm:p-6 border", theme.card, theme.border, theme.radius, theme.shadow)}
              >
                <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <span className={cn("font-bold text-lg", theme.text)}>{problem}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection = ({ theme }: { theme: ThemeConfig }) => {
  return (
    <section className={cn("py-20 md:py-32 px-6 md:px-12 text-white", theme.accent)}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 md:mb-8 opacity-60">解決策</h2>
          <p className="text-2xl md:text-6xl font-black mb-10 md:mb-12 leading-tight text-balance">
            部分的な改善ではなく、<br className="hidden sm:block" />
            売れる構造そのものを組み直す。
          </p>
          <div className="text-4xl md:text-8xl font-black mb-10 md:mb-12 opacity-20 tracking-tighter">
            RE-DESIGN
          </div>
          <p className="text-base md:text-2xl mb-12 md:mb-16 opacity-80 leading-relaxed max-w-3xl mx-auto text-balance">
            必要なのは、事業の現場を理解したうえで、集客・訴求・導線・成約・改善を
            一気通貫で繋ぎ直す「売れる仕組み再設計」です。
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "現場起点", desc: "経営・営業・現場の実態を深く理解することから始めます。" },
              { title: "全体最適", desc: "点ではなく線で捉え、売上につながる全体設計を見直します。" },
              { title: "実戦型伴走", desc: "アドバイスで終わらず、実行と改善まで共に歩みます。" }
            ].map((item, i) => (
              <div key={i} className={cn("p-8 bg-white/10 backdrop-blur-md border border-white/10", theme.radius)}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  {item.title}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceSection = ({ theme }: { theme: ThemeConfig }) => {
  const services = [
    { name: "マーケティング戦略コンサルティング", purpose: "集客から販売までの全体設計を整理し、売上につながる流れを現場レベルで整えます。" },
    { name: "セールスプロモーションツール制作", purpose: "HP・LP・チラシ等を、見た目ではなく成果につながる訴求設計で制作・改善します。" },
    { name: "販売導線・既存導線の見直し", purpose: "既存の販売戦略や導線の詰まりを見直し、成約につながる流れへ改善します。" },
    { name: "ビジネスマッチング", purpose: "新しい販路、提携先、売上機会を生み出す接点をつくります。" },
    { name: "アライアンス調整", purpose: "提携先との接続や協業設計を通じて、事業拡大のきっかけをつくります。" },
    { name: "イベント・セミナー企画運営", purpose: "信頼関係ベースの接点をつくり、商談や紹介につながる場を設計します。" }
  ];

  return (
    <section id="services" className={cn("py-32 px-6 md:px-12", theme.bg)}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="サービス" 
          title="売上を最大化させる、6つの支援領域" 
          theme={theme}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn("p-6 sm:p-10 border transition-all hover:-translate-y-2 group", theme.card, theme.border, theme.radius, theme.shadow)}
            >
              <div className={cn("w-12 h-12 mb-8 flex items-center justify-center text-white", theme.accent, theme.radius)}>
                <span className="text-lg font-bold">{i + 1}</span>
              </div>
              <h3 className={cn("text-2xl font-bold mb-6 leading-tight", theme.text)}>{service.name}</h3>
              <p className={cn("leading-relaxed", theme.secondary)}>
                {service.purpose}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StrengthSection = ({ theme }: { theme: ThemeConfig }) => {
  const strengths = [
    "実業の現場で結果を求められてきた当事者として、経営者と同じ目線で課題を捉えられる",
    "建設・リフォームの現場経験があり、机上ではなく現場理解を前提に提案できる",
    "戦略提案だけで終わらず、制作・導線設計・実行・改善まで一気通貫で支援できる",
    "デジタル施策だけでなく、人脈・紹介・リアル接点まで含めて売上導線を設計できる",
    "経営者の孤独や判断の重さを理解したうえで、表面的ではない打ち手を提示できる"
  ];

  return (
    <section id="strengths" className={cn("py-32 px-6 md:px-12", theme.card === 'bg-white' ? 'bg-white' : theme.bg)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <SectionHeader 
              subtitle="強み" 
              title="なぜ、iroha Seedが選ばれるのか" 
              theme={theme}
            />
            <div className="space-y-8">
              {strengths.map((strength, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 text-white", theme.accent)}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className={cn("text-xl font-bold leading-relaxed", theme.text)}>{strength}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className={cn("p-6 md:p-12 flex flex-col justify-center", theme.footer, theme.radius, theme.shadow)}>
            <h3 className="text-xl md:text-2xl font-bold mb-8 md:mb-10 border-b border-white/20 pb-6 uppercase tracking-widest text-white">メソッド</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {[
                "圧倒的な当事者意識",
                "アナログとデジタルの融合",
                "現場起点",
                "経営者視点",
                "全体最適",
                "伴走型支援"
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Sparkles className={cn("w-5 h-5", theme.accentText)} />
                  <span className="font-bold opacity-80 text-white">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AchievementSection = ({ theme }: { theme: ThemeConfig }) => {
  const achievements = [
    { title: "建設業 V字回復支援", result: "売上昨年対比166%達成", desc: "事業承継時に参画し、組織改革と営業戦略を刷新。物件選定から採用、販促まで一貫して統括。" },
    { title: "FC店舗 垂直立ち上げ", result: "オープン初日 全国3位", desc: "新規出店におけるマーケティング戦略を統括。圧倒的なスタートダッシュを実現。" },
    { title: "製薬会社 経営戦略参画", result: "社外取締役 CMO就任", desc: "CEOから直接オファーを受け、最高マーケティング責任者として経営戦略の根幹から支援。" }
  ];

  return (
    <section id="achievements" className={cn("py-32 px-6 md:px-12", theme.bg)}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="実績" 
          title="確かな実績に裏打ちされた、実戦力" 
          theme={theme}
        />
        <div className="grid md:grid-cols-3 gap-12">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={cn("p-6 sm:p-12 border transition-all", theme.card, theme.border, theme.radius, theme.shadow)}
            >
              <div className={cn("text-xs font-bold uppercase tracking-widest mb-4", theme.accentText)}>事例 {i + 1}</div>
              <h3 className={cn("text-2xl font-bold mb-4", theme.text)}>{item.title}</h3>
              <div className={cn("text-3xl font-black mb-6", theme.accentText)}>{item.result}</div>
              <p className={cn("leading-relaxed", theme.secondary)}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RepresentativeSection = ({ theme }: { theme: ThemeConfig }) => {
  return (
    <section className={cn("py-20 md:py-40 px-6 md:px-12 relative overflow-hidden", theme.card === 'bg-white' ? 'bg-white' : theme.bg)}>
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
        TSUYOSHI YAMAMOTO
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-24 items-center">
          <div className="lg:col-span-4 lg:col-start-2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[240px] xs:max-w-[280px] md:max-w-sm mx-auto lg:ml-0 lg:mr-auto"
            >
              {/* Main Image Container */}
              <div className={cn("aspect-[3/4] overflow-hidden relative z-10", theme.radius, theme.shadow)}>
                <img 
                  src="https://lh3.googleusercontent.com/d/1MKnTG0HAYUdRxW0QUi8eeoU0Khy1zG2g" 
                  alt="代表取締役社長 山本剛史" 
                  className="w-full h-full object-cover object-[center_10%] transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30" />
              </div>

              {/* Decorative Frame */}
              <div className={cn("absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border-2 opacity-20 pointer-events-none", theme.border, theme.radius)} />
              
              {/* Floating Name Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={cn("absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 p-4 md:p-10 text-white z-20", theme.accent, theme.radius, theme.shadow)}
              >
                <div className="text-[8px] md:text-xs font-bold opacity-60 mb-1 md:mb-2 uppercase tracking-widest">Founder & CEO</div>
                <div className="text-base md:text-3xl font-black tracking-tighter whitespace-nowrap">山本 剛史</div>
                <div className="text-[6px] md:text-xs font-bold tracking-[0.3em] mt-1 md:mt-4 opacity-40 uppercase">TSUYOSHI YAMAMOTO</div>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={cn("text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-8 md:mb-12 opacity-50 flex items-center justify-center lg:justify-start gap-4", theme.accentText)}>
                <span className={cn("w-8 md:w-12 h-[1px]", theme.accent)}></span>
                Representative Message
              </h2>
              <p className={cn("text-xl md:text-5xl font-bold mb-10 md:mb-16 leading-[1.3] md:leading-[1.1] text-balance", theme.text)}>
                「マーケティングは、<br className="hidden sm:block" />机の上ではなく<span className={cn("italic", theme.accentText)}>現場</span>で起きている」
              </p>
              <div className={cn("space-y-8 md:space-y-10 text-base md:text-xl leading-relaxed text-balance font-medium", theme.secondary)}>
                <p className="relative inline-block lg:block">
                  <span className="hidden lg:block absolute -left-8 top-0 text-6xl opacity-10 font-serif">“</span>
                  世の中に“アドバイスだけ”で終わる支援が多い中、私は自ら事業の立ち上げから組織再生までを当事者として経験してきました。
                </p>
                <p>
                  だからこそ、表面的なノウハウではなく、経営者が本当に必要としている打ち手を、実務目線で一緒に組み立てたいと考えています。
                </p>
                <p>
                  経営者の孤独や判断の重さを理解したうえで、あなたの事業の「種」を共に育て、確かな売上へと繋げていく。それがiroha Seedの使命です。
                </p>
              </div>

              <div className="mt-16 md:mt-24 flex items-center gap-6">
                <div className={cn("w-16 h-16 rounded-full border flex items-center justify-center overflow-hidden", theme.border)}>
                  <img 
                    src="https://lh3.googleusercontent.com/d/1yqIub1aBMMsKDQHG1iH5IjUAKKMCl-Fj" 
                    alt="iroha Seed Logo" 
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className={cn("text-sm font-bold opacity-40 tracking-widest")}>iroha Seed Representative</div>
                  <div className={cn("text-xl font-black tracking-tighter", theme.text)}>Tsuyoshi Yamamoto</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CompanySection = ({ theme }: { theme: ThemeConfig }) => {
  const info = [
    { label: "法人名", value: "株式会社廣創 (Hiroso Inc.)" },
    { label: "設立", value: "2012年10月1日" },
    { label: "事業ブランド", value: "iroha Seed (イロハシード)" },
    { label: "代表者", value: "山本 剛史" },
    { label: "本社所在地", value: "山口県" },
    { label: "福岡拠点", value: "福岡県福岡市城南区七隈3-2-29-101" },
    { label: "事業内容", value: "マーケティング戦略コンサルティング、プロモーション支援、事業開発" }
  ];

  return (
    <section id="company" className={cn("py-20 md:py-32 px-6 md:px-12", theme.bg)}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="会社概要" 
          title="企業情報" 
          theme={theme}
        />
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {info.map((item, i) => (
              <div key={i} className={cn("flex flex-col sm:flex-row border-b pb-6", theme.border)}>
                <div className={cn("w-full sm:w-48 shrink-0 font-bold text-xs opacity-50 uppercase tracking-widest mb-2 sm:mb-0", theme.text)}>{item.label}</div>
                <div className={cn("font-bold text-base md:text-lg", theme.text)}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ theme }: { theme: ThemeConfig }) => {
  return (
    <section id="contact" className={cn("py-20 md:py-32 px-6 md:px-12 text-white", theme.accent)}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-6xl font-black mb-10 md:mb-12 leading-tight text-balance">
            あなたのビジネスに、<br className="hidden sm:block" />新しい風を。
          </h2>
          <p className="text-base md:text-2xl mb-12 md:mb-16 opacity-80 leading-relaxed px-4 text-balance">
            まずは、現状の売上導線や集客の詰まりを整理するところからご相談ください。
            福岡市内・近郊は対面可、オンラインは全国対応可能です。
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className={cn("p-8 md:p-10 border border-white/10 flex flex-col items-center bg-white/10 backdrop-blur-md", theme.radius)}>
              <Mail className="w-6 h-6 md:w-8 md:h-8 mb-4" />
              <div className="text-xs md:text-sm opacity-60 mb-1 md:mb-2">メール</div>
              <div className="text-[min(4.2vw,18px)] sm:text-lg md:text-xl font-bold">iroha.seed.yamamoto@gmail.com</div>
            </div>
            <div className={cn("p-8 md:p-10 border border-white/10 flex flex-col items-center bg-white/10 backdrop-blur-md", theme.radius)}>
              <Phone className="w-6 h-6 md:w-8 md:h-8 mb-4" />
              <div className="text-xs md:text-sm opacity-60 mb-1 md:mb-2">電話</div>
              <div className="text-lg md:text-xl font-bold">090-8243-3923</div>
            </div>
          </div>

          <button className={cn(
            "px-8 md:px-12 py-5 md:py-6 bg-white text-black font-black text-xl md:text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95",
            theme.radius
          )}>
            無料相談を予約する
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ theme }: { theme: ThemeConfig }) => {
  return (
    <footer className={cn("py-20 px-6 md:px-12 text-white", theme.footer)}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="https://lh3.googleusercontent.com/d/1yqIub1aBMMsKDQHG1iH5IjUAKKMCl-Fj" 
              alt="iroha Seed Logo" 
              className="w-12 h-12 object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className={cn("text-2xl font-black tracking-tighter leading-none", theme.accentText)}>iroha Seed</span>
              <span className={cn("text-[10px] font-bold opacity-40 tracking-widest")}>by Hiroso Inc.</span>
            </div>
          </div>
          <p className="max-w-sm leading-relaxed opacity-60 font-medium text-balance">
            売上につながる全体構造を、現場理解から組み直す実戦型マーケティング支援。
            中小企業の成長に伴走し、確かな成果を創出します。
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-sm opacity-40">ナビゲーション</h4>
          <ul className="space-y-4 font-bold">
            <li><a href="#services" className="hover:opacity-50 transition-colors">サービス</a></li>
            <li><a href="#strengths" className="hover:opacity-50 transition-colors">強み</a></li>
            <li><a href="#achievements" className="hover:opacity-50 transition-colors">実績</a></li>
            <li><a href="#company" className="hover:opacity-50 transition-colors">会社概要</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-sm opacity-40">連絡先</h4>
          <ul className="space-y-4 font-bold opacity-80">
            <li className="flex items-center gap-2 text-sm sm:text-base"><Mail className="w-4 h-4 shrink-0" /> <span className="break-all sm:break-normal">iroha.seed.yamamoto@gmail.com</span></li>
            <li className="flex items-center gap-2 text-sm sm:text-base"><Phone className="w-4 h-4 shrink-0" /> 090-8243-3923</li>
            <li className="flex items-center gap-2 text-sm sm:text-base"><MapPin className="w-4 h-4 shrink-0" /> 福岡県福岡市城南区七隈</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs opacity-40 font-bold tracking-widest">
        <p>&copy; {new Date().getFullYear()} Hiroso Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
          <a href="#" className="hover:text-white transition-colors">利用規約</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [pattern, setPattern] = useState<ThemePattern>('modern-kyoto');
  const theme = THEMES[pattern];

  useEffect(() => {
    document.title = 'iroha Seed';
  }, []);

  return (
    <div className={cn("min-h-screen selection:bg-slate-900 selection:text-white", theme.bg, theme.text, theme.font)}>
      <Navbar theme={theme} />
      <Hero theme={theme} />
      <ProblemSection theme={theme} />
      <SolutionSection theme={theme} />
      <ServiceSection theme={theme} />
      <StrengthSection theme={theme} />
      <AchievementSection theme={theme} />
      <RepresentativeSection theme={theme} />
      <CompanySection theme={theme} />
      <ContactSection theme={theme} />
      <Footer theme={theme} />
      <PatternSwitcher current={pattern} onSelect={setPattern} />
    </div>
  );
}
