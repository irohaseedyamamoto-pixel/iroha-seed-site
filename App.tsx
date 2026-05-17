import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, Target, Users, Handshake,
  Zap, BarChart3, Instagram, Facebook, Globe, ArrowRight,
  ArrowUpRight, CheckCircle,
} from 'lucide-react';

// ─── ユーティリティ ───────────────────────────────────────────────────────────

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${light ? 'text-sky-400' : 'text-blue-700'}`}>
      <span className={`w-10 h-[1.5px] ${light ? 'bg-sky-400' : 'bg-blue-600'}`} />
      <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{children}</span>
    </div>
  );
}

// ─── ナビゲーション ───────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'サービス', href: '#services' },
  { label: '強み', href: '#strengths' },
  { label: '実績', href: '#achievements' },
  { label: '代表', href: '#representative' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center transition-colors ${scrolled ? 'bg-slate-100' : 'bg-white/15'}`}>
            <img
              src="/logo.png"
              alt="iroha Seed"
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div>
            <div className={`font-bold text-base leading-none tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              iroha Seed
            </div>
            <div className={`text-[9px] tracking-[0.22em] font-medium mt-0.5 transition-colors ${scrolled ? 'text-slate-400' : 'text-white/50'}`}>
              BY HIROSO INC.
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-[13px] font-medium tracking-wide transition-colors hover:text-sky-400 ${
                scrolled ? 'text-slate-600' : 'text-white/80'
              }`}
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/company"
            className={`text-[13px] font-medium tracking-wide transition-colors hover:text-sky-400 ${
              scrolled ? 'text-slate-600' : 'text-white/80'
            }`}
          >
            会社概要
          </Link>
          <Link
            to="/contact"
            className={`flex items-center gap-1.5 text-[13px] font-bold px-5 py-2 rounded-full border-2 transition-all duration-200 ${
              scrolled
                ? 'border-blue-800 text-blue-900 hover:bg-blue-900 hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-blue-900'
            }`}
          >
            無料相談
          </Link>
        </nav>

        <button
          className={`md:hidden p-1 ${scrolled ? 'text-slate-700' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-slate-700 font-medium py-3 border-b border-slate-100 text-sm"
              >
                {link.label}
              </button>
            ))}
            <Link to="/company" className="text-slate-700 font-medium py-3 border-b border-slate-100 text-sm block">
              会社概要
            </Link>
            <Link
              to="/contact"
              className="mt-4 bg-blue-800 text-white font-bold py-3.5 rounded-xl text-center text-sm"
            >
              無料相談を予約する →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── ヒーロー ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/55 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-sky-400/15 border border-sky-400/30 text-sky-300 text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8">
              実戦型マーケティングパートナー
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6">
              売れる仕組みを、<br />
              <span className="text-sky-400">再設計する。</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
              机上の空論ではない、経営者視点の実戦型マーケティング支援。<br />
              売上が積み上がる全体構造を、現場理解から組み直します。
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-black text-sm px-8 py-4 rounded-full transition-all duration-200 shadow-xl shadow-blue-700/30"
            >
              無料で相談する
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors"
            >
              サービスを見る <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── マーキー ─────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [
    'マーケティング戦略', 'セールスプロモーション', '販売導線設計',
    'ビジネスマッチング', 'アライアンス調整', 'イベント企画・運営',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="bg-blue-900 py-3 overflow-hidden select-none">
      <div className="animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-sky-200 font-bold text-xs tracking-[0.22em] uppercase">
            {item}
            <span className="ml-8 text-sky-200/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── 課題セクション ───────────────────────────────────────────────────────────

const PROBLEMS = [
  '広告や集客施策を行っているのに、売上の伸びにつながっていない',
  '問い合わせや見込み客はいるのに、成約や継続につながらない',
  'LP・営業・導線・商品設計がバラバラで、全体最適になっていない',
  '表面的なアドバイスではなく、現場まで踏み込んだ実務支援がほしい',
];

function ProblemSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Label>課題 / PROBLEM</Label>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-slate-900 leading-snug mb-6">
              なぜ、施策を増やしても<br />
              売上が伸びないのか？
            </h2>
            <p className="text-slate-500 leading-relaxed text-[15px]">
              売上が伸びない原因は、広告だけ、LPだけ、営業だけの問題ではありません。
              集客・訴求・導線・提案・改善が分断されていると、
              施策を増やしても成果は安定しません。
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {PROBLEMS.map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-5 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md hover:shadow-blue-50 transition-all group"
              >
                <span className="text-slate-200 font-black text-3xl leading-none select-none group-hover:text-blue-300 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-slate-700 font-medium leading-relaxed text-sm pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 解決策セクション ─────────────────────────────────────────────────────────

const METHODS = [
  {
    num: '01',
    icon: Target,
    title: '現場起点',
    desc: '経営・営業・現場の実態を深く理解することから始めます。表面的なヒアリングではなく、現場に入り込んだ解像度で課題を特定します。',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=75',
  },
  {
    num: '02',
    icon: Globe,
    title: '全体最適',
    desc: '点ではなく線で捉え、売上につながる全体設計を見直します。集客から成約・継続まで、分断なく繋ぎ直します。',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75',
  },
  {
    num: '03',
    icon: Handshake,
    title: '実戦型伴走',
    desc: 'アドバイスで終わらず、実行と改善まで共に歩みます。経営者の孤独な判断に、当事者として寄り添い続けます。',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=75',
  },
];

function SolutionSection() {
  return (
    <section className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Label light>解決策 / SOLUTION</Label>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-white leading-snug">
              部分的な改善ではなく、<br />
              <span className="text-sky-400">売れる構造</span>そのものを<br />
              組み直す。
            </h2>
          </div>
          <p className="text-slate-500 max-w-xs leading-relaxed text-sm md:text-right">
            集客・訴求・導線・成約・改善を一気通貫で繋ぎ直す「売れる仕組みの再設計」が必要です。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {METHODS.map(({ num, icon: Icon, title, desc, img }) => (
            <div
              key={num}
              className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-sky-400/40 transition-all duration-300"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sky-400 font-black text-xs tracking-[0.3em]">{num}</span>
                  <Icon size={18} className="text-slate-600 group-hover:text-sky-400 transition-colors" />
                </div>
                <h3 className="text-white font-black text-xl mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── サービスセクション ───────────────────────────────────────────────────────

const SERVICES = [
  {
    num: '01',
    title: 'マーケティング戦略コンサルティング',
    desc: '集客から販売までの全体設計を整理し、売上につながる流れを現場レベルで整えます。',
    icon: BarChart3,
  },
  {
    num: '02',
    title: 'セールスプロモーションツール制作',
    desc: 'HP・LP・チラシ等を、見た目ではなく成果につながる訴求設計で制作・改善します。',
    icon: Zap,
  },
  {
    num: '03',
    title: '販売導線・既存導線の見直し',
    desc: '既存の販売戦略や導線の詰まりを見直し、成約につながる流れへ改善します。',
    icon: ArrowRight,
  },
  {
    num: '04',
    title: 'ビジネスマッチング',
    desc: '新しい販路、提携先、売上機会を生み出す接点をつくります。',
    icon: Users,
  },
  {
    num: '05',
    title: 'アライアンス調整',
    desc: '提携先との接続や協業設計を通じて、事業拡大のきっかけをつくります。',
    icon: Handshake,
  },
  {
    num: '06',
    title: 'イベント・セミナー企画運営',
    desc: '信頼関係ベースの接点をつくり、商談や紹介につながる場を設計します。',
    icon: Globe,
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Label>サービス / SERVICES</Label>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-slate-900 leading-snug">
              売上を最大化させる、<br />6つの支援領域
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 border-b-2 border-blue-600 pb-0.5 hover:text-blue-600 transition-colors self-start md:self-end"
          >
            無料相談はこちら <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-slate-200">
          {SERVICES.map(({ num, title, desc, icon: Icon }) => (
            <div
              key={num}
              className="group flex items-center gap-8 py-6 hover:bg-blue-50/60 px-4 -mx-4 rounded-xl transition-all cursor-default"
            >
              <span className="text-slate-200 font-black text-4xl w-16 leading-none shrink-0 group-hover:text-blue-300 transition-colors">
                {num}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 font-black text-lg mb-1 group-hover:text-blue-900 transition-colors">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-700 group-hover:border-blue-700 transition-all shadow-sm">
                <Icon size={16} className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 強みセクション ───────────────────────────────────────────────────────────

const STRENGTHS = [
  '実業の現場で結果を求められてきた当事者として、経営者と同じ目線で課題を捉えられる',
  '建設・リフォームの現場経験があり、机上ではなく現場理解を前提に提案できる',
  '戦略提案だけで終わらず、制作・導線設計・実行・改善まで一気通貫で支援できる',
  'デジタル施策だけでなく、人脈・紹介・リアル接点まで含めて売上導線を設計できる',
  '経営者の孤独や判断の重さを理解したうえで、表面的ではない打ち手を提示できる',
];

function StrengthsSection() {
  return (
    <section id="strengths" className="relative py-28 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-15"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-20">
          <Label light>強み / STRENGTHS</Label>
          <blockquote className="font-serif text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            "現場の解像度を上げ、<br />
            <span className="text-sky-400">経営の精度を高める。</span>"
          </blockquote>
          <p className="text-slate-400 leading-relaxed max-w-xl text-[15px]">
            私たちは単なる制作会社やコンサルティング会社ではありません。「売れる仕組み」を共に創り上げるパートナーとして、現場の熱量を成果に変えるまで伴走します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {STRENGTHS.map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 hover:border-sky-400/30 transition-all"
            >
              <CheckCircle size={18} className="text-sky-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 font-medium leading-relaxed text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 実績セクション ───────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  {
    tag: '建設業',
    title: 'V字回復支援',
    highlight: '売上昨年対比166%達成',
    desc: '事業承継時に参画し、組織改革と営業戦略を刷新。物件選定から採用、販促まで一貫して統括。',
    num: '+166%',
    numUnit: '売上成長率',
  },
  {
    tag: 'FC店舗',
    title: '垂直立ち上げ',
    highlight: 'オープン初日 全国3位',
    desc: '新規出店におけるマーケティング戦略を統括。圧倒的なスタートダッシュを実現。',
    num: '全国3位',
    numUnit: 'オープン初日達成',
  },
  {
    tag: '医療業界',
    title: '経営戦略参画',
    highlight: '社外取締役 CMO就任',
    desc: 'CEOから直接オファーを受け、最高マーケティング責任者として経営戦略の根幹から支援。',
    num: 'CMO',
    numUnit: '社外取締役就任',
  },
];

function AchievementsSection() {
  return (
    <section id="achievements" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Label>実績 / RESULTS</Label>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-slate-900 leading-snug">
              確かな実績に裏打ちされた、<br />実戦力
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed md:text-right">
            それぞれの業界で、数字と結果で証明し続けてきた支援実績です。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map(({ tag, title, highlight, desc, num, numUnit }) => (
            <div
              key={title}
              className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all group"
            >
              <div className="bg-slate-900 p-8 relative overflow-hidden">
                <div className="absolute -right-4 -top-2 text-8xl font-black text-white/5 leading-none select-none">
                  {num}
                </div>
                <div className="text-sky-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-3">{tag}</div>
                <div className="text-white font-black text-4xl md:text-5xl leading-none">{num}</div>
                <div className="text-slate-500 text-xs mt-2 tracking-wide">{numUnit}</div>
              </div>
              <div className="p-6">
                <h3 className="text-slate-900 font-black text-xl mb-1">{title}</h3>
                <div className="text-blue-700 font-bold text-xs mb-4 tracking-wide">{highlight}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 代表メッセージセクション ─────────────────────────────────────────────────

function RepresentativeSection() {
  return (
    <section id="representative" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-center">
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-sky-400 rounded-xl opacity-50" />
              <div className="relative w-64 md:w-72 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20">
                <img
                  src="/profile.png"
                  alt="山本 剛史"
                  className="w-full h-auto block"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      parent.classList.add('h-80', 'flex', 'items-center', 'justify-center', 'bg-slate-200');
                      parent.innerHTML = '<span style="color:#0f172a;font-size:3.5rem;font-weight:900;font-family:serif">TY</span>';
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-blue-800 text-white rounded-xl px-4 py-2.5 shadow-lg">
                <div className="font-black text-xs leading-tight">代表取締役社長</div>
                <div className="text-blue-300 text-[10px] mt-0.5">株式会社廣創</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <Label>代表メッセージ / MESSAGE</Label>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-slate-900 mb-1">山本 剛史</h2>
            <div className="text-slate-400 text-sm tracking-[0.2em] mb-8">TSUYOSHI YAMAMOTO</div>

            <blockquote className="font-serif text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-8 border-l-[3px] border-blue-600 pl-6">
              "マーケティングは、<br />
              机の上ではなく<br />
              現場で起きている"
            </blockquote>

            <div className="space-y-4 text-slate-500 leading-relaxed text-[15px]">
              <p>
                世の中に"アドバイスだけ"で終わる支援が多い中、私は自ら事業の立ち上げから組織再生までを当事者として経験してきました。
              </p>
              <p>
                だからこそ、表面的なノウハウではなく、経営者が本当に必要としている打ち手を、実務目線で一緒に組み立てたいと考えています。
              </p>
              <p>
                あなたの事業の「種」を共に育て、確かな売上へと繋げていく。それがiroha Seedの使命です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTAセクション ────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-800/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <Label light>お問い合わせ / CONTACT</Label>
        <h2 className="font-serif text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
          あなたのビジネスに、<br />
          新しい風を。
        </h2>
        <p className="text-slate-400 leading-relaxed max-w-xl mx-auto mb-12 text-[15px]">
          まずは、現状の売上導線や集客の詰まりを整理するところからご相談ください。<br />
          福岡市内・近郊は対面可、オンラインは全国対応可能です。
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-600 text-white font-black text-base px-12 py-5 rounded-full transition-all duration-200 shadow-2xl shadow-blue-700/30"
        >
          無料相談を予約する
          <ArrowRight size={18} />
        </Link>
        <p className="text-slate-600 text-xs mt-6 tracking-wide">相談無料・オンライン対応可・強引な営業は一切ありません</p>
      </div>
    </section>
  );
}

// ─── フッター ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="iroha Seed"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm">iroha Seed</div>
                <div className="text-slate-600 text-[9px] tracking-[0.2em]">BY HIROSO INC.</div>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              売上につながる全体構造を、現場理解から組み直す実戦型マーケティング支援。
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/irohaseed.yamamoto?igsh=Y2o2bGRlbXJrMjRy&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors border border-white/10"
              >
                <Instagram size={15} className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/share/1JKihxjj6A/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors border border-white/10"
              >
                <Facebook size={15} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.25em] uppercase mb-5">Navigation</h4>
            <div className="space-y-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-slate-500 hover:text-white text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Link to="/company" className="block text-slate-500 hover:text-white text-sm transition-colors">会社概要</Link>
              <Link to="/contact" className="block text-slate-500 hover:text-white text-sm transition-colors">お問い合わせ</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.25em] uppercase mb-5">Contact</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              福岡市内・近郊は対面でのご相談に対応。<br />オンラインにて全国どこでもご対応可能です。
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-black text-sm px-6 py-3 rounded-full transition-all"
            >
              無料相談を予約する <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <div>© 2026 Hiroso Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-slate-400 transition-colors">プライバシーポリシー</Link>
            <Link to="/company" className="hover:text-slate-400 transition-colors">会社概要</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── メインアプリ ─────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <Marquee />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <StrengthsSection />
      <AchievementsSection />
      <RepresentativeSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
