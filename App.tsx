import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Target,
  Users,
  Handshake,
  Zap,
  BarChart3,
  Instagram,
  Facebook,
  Globe,
  ArrowRight,
} from 'lucide-react';

// ─── ナビゲーション ───────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'サービス', href: '#services' },
  { label: '強み', href: '#strengths' },
  { label: '実績', href: '#achievements' },
  { label: '代表メッセージ', href: '#representative' },
  { label: '会社概要', href: '#company' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-blue-50 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="iroha Seed"
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div>
            <div className={`font-bold text-lg leading-tight tracking-tight ${scrolled ? 'text-blue-900' : 'text-white'}`}>
              iroha Seed
            </div>
            <div className={`text-[10px] tracking-widest font-medium opacity-70 ${scrolled ? 'text-blue-900' : 'text-white'}`}>
              by Hiroso Inc.
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                scrolled ? 'text-slate-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            無料相談
          </Link>
        </nav>

        <button
          className={`md:hidden ${scrolled ? 'text-slate-700' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-slate-700 font-medium py-2 border-b border-slate-100"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/contact"
              className="bg-blue-600 text-white font-bold py-3 rounded-lg mt-2 text-center block"
            >
              無料相談
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── ヒーローセクション ──────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 背景写真 */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/72" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
            <TrendingUp size={14} />
            実戦型マーケティングパートナー
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
            売れる仕組みを、
            <br />
            <span className="text-sky-300">再設計する。</span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl drop-shadow">
            机上の空論ではない、経営者視点の実戦型マーケティング支援。<br />
            売上が積み上がる全体構造を、現場理解から組み直します。
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-white text-blue-900 font-bold text-base px-8 py-4 rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              無料で相談する
              <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/60 text-white font-bold text-base px-8 py-4 rounded-xl hover:border-white hover:bg-white hover:text-blue-900 transition-all duration-200"
            >
              サービスを見る
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── 課題セクション ───────────────────────────────────────────────────────────

const PROBLEMS = [
  '広告や集客施策を行っているのに、売上の伸びにつながっていない',
  '問い合わせや見込み客はいるのに、成約や継続につながらない',
  'LP、営業、導線、商品設計がバラバラで、全体最適になっていない',
  '表面的なアドバイスではなく、現場まで踏み込んだ実務支援がほしい',
];

function ProblemSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-blue-800 font-bold text-sm tracking-widest uppercase mb-3">課題</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            なぜ、施策を増やしても
            <br />
            売上が伸びないのか？
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            売上が伸びない原因は、広告だけ、LPだけ、営業だけの問題ではありません。<br />
            現場理解・訴求・導線・提案・改善が分断されていると、施策を増やしても成果は安定しません。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {PROBLEMS.map((text, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X size={16} className="text-red-500" />
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 解決策セクション ─────────────────────────────────────────────────────────

const METHODS = [
  {
    icon: Target,
    title: '現場起点',
    desc: '経営・営業・現場の実態を深く理解することから始めます。',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=75',
  },
  {
    icon: Globe,
    title: '全体最適',
    desc: '点ではなく線で捉え、売上につながる全体設計を見直します。',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75',
  },
  {
    icon: Handshake,
    title: '実戦型伴走',
    desc: 'アドバイスで終わらず、実行と改善まで共に歩みます。',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=75',
  },
];

function SolutionSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-blue-800 font-bold text-sm tracking-widest uppercase mb-3">解決策</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            部分的な改善ではなく、
            <br />
            売れる構造そのものを組み直す。
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            必要なのは、事業の現場を理解したうえで、集客・訴求・導線・成約・改善を<br />
            一気通貫で繋ぎ直す「売れる仕組みの再設計」です。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {METHODS.map(({ icon: Icon, title, desc, img }) => (
            <div key={title} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-44 overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-blue-800" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
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
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=75',
  },
  {
    num: '02',
    title: 'セールスプロモーションツール制作',
    desc: 'HP・LP・チラシ等を、見た目ではなく成果につながる訴求設計で制作・改善します。',
    icon: Zap,
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=75',
  },
  {
    num: '03',
    title: '販売導線・既存導線の見直し',
    desc: '既存の販売戦略や導線の詰まりを見直し、成約につながる流れへ改善します。',
    icon: ArrowRight,
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=75',
  },
  {
    num: '04',
    title: 'ビジネスマッチング',
    desc: '新しい販路、提携先、売上機会を生み出す接点をつくります。',
    icon: Users,
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=75',
  },
  {
    num: '05',
    title: 'アライアンス調整',
    desc: '提携先との接続や協業設計を通じて、事業拡大のきっかけをつくります。',
    icon: Handshake,
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=75',
  },
  {
    num: '06',
    title: 'イベント・セミナー企画運営',
    desc: '信頼関係ベースの接点をつくり、商談や紹介につながる場を設計します。',
    icon: Globe,
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=75',
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-blue-800 font-bold text-sm tracking-widest uppercase mb-3">サービス</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            売上を最大化させる、
            <br />
            6つの支援領域
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ num, title, desc, icon: Icon, img }) => (
            <div
              key={num}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all group"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-900/30" />
                <span className="absolute top-3 right-3 text-3xl font-black text-white/60">{num}</span>
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Icon size={20} className="text-blue-800 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
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
    <section id="strengths" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* セクションヘッダー写真 */}
        <div className="rounded-2xl overflow-hidden mb-14 relative h-52 md:h-64">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
            alt="強み"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/82 flex flex-col items-center justify-center text-center px-6">
            <div className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-3">強み</div>
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
              なぜ、iroha Seedが
              <br />
              選ばれるのか
            </h2>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {STRENGTHS.map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-5 bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all shadow-sm"
            >
              <CheckCircle size={22} className="text-blue-700 flex-shrink-0 mt-0.5" />
              <p className="text-slate-800 font-medium leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-block border-2 border-blue-800 rounded-2xl p-8 max-w-2xl">
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              私たちは単なる制作会社やコンサルティング会社ではありません。<br />
              「売れる仕組み」を共に創り上げるパートナーとして、<br />
              現場の熱量を成果に変えるまで伴走します。
            </p>
            <div className="text-blue-900 font-black text-xl italic">
              "現場の解像度を上げ、<br />経営の精度を高める。"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 実績セクション ───────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  {
    label: '事例 1',
    tag: '建設業',
    title: 'V字回復支援',
    highlight: '売上昨年対比166%達成',
    desc: '事業承継時に参画し、組織改革と営業戦略を刷新。物件選定から採用、販促まで一貫して統括。',
    num: '+166%',
    unit: '売上成長率',
  },
  {
    label: '事例 2',
    tag: 'FC店舗',
    title: '垂直立ち上げ',
    highlight: 'オープン初日 全国3位',
    desc: '新規出店におけるマーケティング戦略を統括。圧倒的なスタートダッシュを実現。',
    num: '全国3位',
    unit: 'オープン初日',
  },
  {
    label: '事例 3',
    tag: '製薬会社',
    title: '経営戦略参画',
    highlight: '社外取締役 CMO就任',
    desc: 'CEOから直接オファーを受け、最高マーケティング責任者として経営戦略の根幹から支援。',
    num: 'CMO',
    unit: '社外取締役就任',
  },
];

function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-blue-800 font-bold text-sm tracking-widest uppercase mb-3">実績</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            確かな実績に裏打ちされた、
            <br />
            実戦力
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map(({ label, tag, title, highlight, desc, num, unit }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-900 p-6">
                <div className="text-blue-200 text-xs font-bold tracking-widest mb-1">{tag}</div>
                <div className="text-4xl font-black text-white">{num}</div>
                <div className="text-blue-200 text-sm">{unit}</div>
              </div>
              <div className="p-6">
                <div className="text-xs text-slate-400 font-bold mb-2">{label}</div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{title}</h3>
                <div className="text-blue-800 font-bold text-sm mb-4">{highlight}</div>
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
    <section id="representative" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-full max-w-xs h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden bg-blue-100 shadow-2xl shadow-blue-900/20">
                <img
                  src="/profile.png"
                  alt="山本 剛史"
                  className="w-full h-full object-contain object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.style.display = 'flex';
                      parent.style.alignItems = 'center';
                      parent.style.justifyContent = 'center';
                      parent.innerHTML = '<span style="color:#3b82f6;font-size:4rem;font-weight:900">TY</span>';
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white rounded-xl px-5 py-3 shadow-lg">
                <div className="font-black text-sm">代表取締役社長</div>
                <div className="text-blue-200 text-xs">株式会社廣創</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-blue-800 font-bold text-sm tracking-widest uppercase mb-3">代表メッセージ</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">山本 剛史</h2>
            <div className="text-slate-400 font-medium mb-8">TSUYOSHI YAMAMOTO</div>

            <blockquote className="text-2xl font-black text-slate-900 leading-tight mb-8 italic border-l-4 border-blue-700 pl-6">
              "マーケティングは、<br />
              机の上ではなく<br />
              現場で起きている"
            </blockquote>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                世の中に"アドバイスだけ"で終わる支援が多い中、私は自ら事業の立ち上げから組織再生までを当事者として経験してきました。
              </p>
              <p>
                だからこそ、表面的なノウハウではなく、経営者が本当に必要としている打ち手を、実務目線で一緒に組み立てたいと考えています。
              </p>
              <p>
                経営者の孤独や判断の重さを理解したうえで、あなたの事業の「種」を共に育て、確かな売上へと繋げていく。それがiroha Seedの使命です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 会社概要セクション ───────────────────────────────────────────────────────

const COMPANY_INFO = [
  { label: '法人名', value: '株式会社廣創 (Hiroso Inc.)' },
  { label: '設立', value: '2012年10月1日' },
  { label: '事業ブランド', value: 'iroha Seed（イロハシード）' },
  { label: '代表者', value: '山本 剛史' },
  { label: '本社所在地', value: '山口県' },
  { label: '福岡拠点', value: '福岡県福岡市城南区七隈3-2-29-101' },
  { label: '事業内容', value: 'マーケティング戦略コンサルティング、プロモーション支援、事業開発' },
];

function CompanySection() {
  return (
    <section id="company" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-blue-800 font-bold text-sm tracking-widest uppercase mb-3">会社概要</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">企業情報</h2>
        </div>

        <div className="max-w-3xl mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          {COMPANY_INFO.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex items-start gap-6 px-8 py-5 ${
                i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
              } border-b border-slate-200 last:border-b-0`}
            >
              <div className="text-sm font-bold text-blue-900 w-32 flex-shrink-0 pt-0.5">{label}</div>
              <div className="text-slate-700 text-sm leading-relaxed">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTAセクション ────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* 背景写真 */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl px-10 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">
            あなたのビジネスに、
            <br />
            新しい風を。
          </h2>
          <p className="text-slate-600 leading-relaxed text-base mb-10">
            まずは、現状の売上導線や集客の詰まりを整理するところからご相談ください。<br />
            福岡市内・近郊は対面可、オンラインは全国対応可能です。
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-blue-600 text-white font-black text-lg px-12 py-5 rounded-2xl hover:bg-white hover:text-blue-700 border-2 border-blue-600 transition-all duration-200 shadow-lg"
          >
            無料相談を予約する
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── フッター ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="iroha Seed"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <div className="text-white font-bold">iroha Seed</div>
                <div className="text-slate-500 text-xs tracking-widest">by Hiroso Inc.</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              売上につながる全体構造を、現場理解から組み直す実戦型マーケティング支援。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-16 gap-y-2 text-sm">
            <div>
              <div className="text-white font-bold mb-3">ナビゲーション</div>
              {NAV_LINKS.map((l) => (
                <div key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-white transition-colors block py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {l.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SNSリンク */}
        <div className="border-t border-slate-800 pt-8 mb-6 flex justify-center gap-4">
          <a
            href="https://www.instagram.com/irohaseed.yamamoto?igsh=Y2o2bGRlbXJrMjRy&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors"
          >
            <Instagram size={18} className="text-white" />
          </a>
          <a
            href="https://www.facebook.com/share/1JKihxjj6A/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
          >
            <Facebook size={18} className="text-white" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>© 2026 Hiroso Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors">利用規約</a>
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
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <StrengthsSection />
      <AchievementsSection />
      <RepresentativeSection />
      <CompanySection />
      <CtaSection />
      <Footer />
    </div>
  );
}
