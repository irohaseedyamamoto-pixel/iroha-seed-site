import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, Plus, Minus, Instagram, Facebook } from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────────

const SNS_LINKS = [
  { href: 'https://www.instagram.com/irohaseed.yamamoto?igsh=Y2o2bGRlbXJrMjRy&utm_source=qr', Icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/share/1JKihxjj6A/?mibextid=wwXIfr', Icon: Facebook, label: 'Facebook' },
];

const NAV_LINKS = [
  { href: '#service',        label: 'サービス'  },
  { href: '#process',        label: '支援の流れ' },
  { href: '#achievements',   label: '実績'      },
  { href: '#representative', label: '代表'      },
  { href: '#faq',            label: 'FAQ'       },
];

const MARQUEE_ITEMS = [
  '商品設計', '導線設計', 'ファネル構築', 'USP設計', '事業診断',
  '売れる仕組み', '個別伴走サポート', '事業再設計', '集客設計', '顧客獲得',
];

const PROBLEMS = [
  { num: '01', text: '発信・集客・自己投資を頑張っているのに、なぜ売れないのかがわからない' },
  { num: '02', text: '商品設計・導線設計・ファネルのどこに問題があるか判断できない' },
  { num: '03', text: '自信を持って自分の商品を提案・価格提示できない' },
  { num: '04', text: '施策が点になっていて、つながった流れになっていない' },
  { num: '05', text: 'SNSや広告を試したが手応えがなく、何が正解かわからない' },
];

const SERVICE_PILLARS = [
  {
    num: '01',
    title: '事業診断',
    desc: '商品・導線・ファネル全体を深くヒアリングし、売れない根本原因を特定します。表面的な分析ではなく、現場の実態から本質的な問題を見つけ出します。',
  },
  {
    num: '02',
    title: 'USP・商品設計',
    desc: 'あなたにしか語れない強みを言語化し、誰に・何を・どう届けるかを明確にします。「自信を持って提案できる商品」の土台を一緒に組み立てます。',
  },
  {
    num: '03',
    title: '導線・ファネル設計',
    desc: '集客から成約・継続までの流れを一気通貫で設計・構築します。分断されていた施策をつなぎ、成果が積み上がる構造をつくります。',
  },
  {
    num: '04',
    title: '実行支援・個別伴走',
    desc: 'アドバイスで終わらず、実行と改善まで共に歩みます。経営者の孤独な判断に、実務経験を持つパートナーとして寄り添い続けます。',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: '診断',   desc: '現状の商品・導線・ファネルを深くヒアリングし、売れない原因を特定します。' },
  { num: '02', title: '再設計', desc: 'USP・商品設計・ターゲットを整理し、選ばれるための土台を組み直します。'   },
  { num: '03', title: '構築',   desc: '集客から成約までの導線・ファネルを一気通貫で設計・構築します。'           },
  { num: '04', title: '実行',   desc: '施策の実行フェーズを共に歩みます。アドバイスで終わらず現場で伴走します。' },
  { num: '05', title: '改善',   desc: '結果を検証し、仮説と改善を繰り返しながら精度を高めていきます。'           },
  { num: '06', title: '自走',   desc: 'あなた自身が「売れる仕組み」を回せる状態へ。完全な自走を目指します。'     },
];

const ACHIEVEMENTS = [
  {
    value: '14', unit: '年',
    title: '経営者としての実務経験',
    desc: '30歳で法人化以来、建築・飲食・IT・製薬など複数業種で当事者として経営に携わってきました。',
  },
  {
    value: '複数', unit: '業種',
    title: '事業支援・立て直しの実績',
    desc: '建築リフォーム・フランチャイズ飲食・製薬マーケティングにて、売上と組織の立て直しに直接関与しました。',
  },
  {
    value: 'CMO', unit: '',
    title: '最高マーケティング責任者として参画',
    desc: '製薬会社のCMOとして、マーケティング戦略の立案・実行に携わった実務経験を持ちます。',
  },
];

const FAQS = [
  {
    q: 'どのような方が相談に来ますか？',
    a: '中小企業の経営者・スタートアップ・個人事業主・小規模事業者の方が中心です。「発信や集客を頑張っているのに売上につながらない」「何が問題なのかわからない」といったお悩みをお持ちの方がよくご相談にいらっしゃいます。',
  },
  {
    q: '相談から開始までの流れを教えてください。',
    a: 'まず無料診断（オンライン・30〜60分）にて現状をお聞きします。そのうえで課題と方向性をご提案し、ご納得いただけた場合にサポートを開始します。強引な勧誘は一切行っておりません。',
  },
  {
    q: '料金はどのくらいかかりますか？',
    a: 'お客様の状況や課題の深さによって異なります。まずは無料診断でお話をお聞きし、最適なプランをご提案いたします。',
  },
  {
    q: 'SNS運用や広告の代行もお願いできますか？',
    a: '個別施策の代行よりも、「なぜ売れていないか」の根本原因を特定し、売れる仕組みを設計することを専門としています。土台となる戦略が整っていない状態では、どんな施策も効果が出づらいためです。',
  },
  {
    q: 'どれくらいで成果が出ますか？',
    a: '事業の状況によって異なりますが、商品設計・導線の整理といった土台が整うことで、発信やセールスの迷いがなくなります。早い方では1〜2ヶ月以内に手応えを感じていただいています。',
  },
  {
    q: 'オンラインでも対応していますか？',
    a: 'はい、全国どこでもオンラインで対応しています。直接お会いしてのご相談をご希望の方も、ご対応可能ですのでお気軽にご相談ください。',
  },
  {
    q: 'まだ相談できる段階かわからないのですが、問い合わせしても大丈夫ですか？',
    a: 'もちろんです。「今すぐではないけれど気になっている」という段階でもお気軽にご連絡ください。まず現状をお聞きして、必要かどうかを一緒に判断しましょう。',
  },
];

// ─── Shared ────────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 text-[#c17f3c]">
      <span className="w-8 h-[1.5px] bg-[#c17f3c]" />
      <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{children}</span>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/96 backdrop-blur-sm border-b border-[#d8d2c8]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 rounded-md overflow-hidden bg-[#f8f5f0] flex items-center justify-center">
            <img src="/logo.png" alt="iroha Seed" className="w-full h-full object-contain" />
          </div>
          <span className="font-black text-sm tracking-wide text-[#1c1c1e]">iroha Seed</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 border-r border-[#d8d2c8] pr-6">
            {SNS_LINKS.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-[#d8d2c8] flex items-center justify-center text-[#8a8680] hover:border-[#c17f3c] hover:text-[#c17f3c] transition-colors">
                <Icon size={13} />
              </a>
            ))}
          </div>
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href}
              className="text-[#5c5a56] hover:text-[#1c1c1e] text-sm font-medium transition-colors">
              {label}
            </a>
          ))}
          <Link to="/company" className="text-[#5c5a56] hover:text-[#1c1c1e] text-sm font-medium transition-colors">
            会社概要
          </Link>
          <Link to="/contact"
            className="ml-1 bg-[#1c1c1e] hover:bg-[#c17f3c] text-white text-sm font-black px-5 py-2.5 rounded-full transition-colors duration-200">
            無料診断を受ける
          </Link>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center text-[#1c1c1e]"
          aria-label="メニュー">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#d8d2c8]">
          <div className="px-6 py-2">
            {[...NAV_LINKS, { href: '/company', label: '会社概要' }].map(({ href, label }) => (
              href.startsWith('#')
                ? <a key={href} href={href} onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 border-b border-[#f0ebe1] text-[#1c1c1e] font-medium text-sm last:border-0">
                    {label}<ArrowRight size={14} className="text-[#c17f3c]" />
                  </a>
                : <Link key={href} to={href} onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 border-b border-[#f0ebe1] text-[#1c1c1e] font-medium text-sm last:border-0">
                    {label}<ArrowRight size={14} className="text-[#c17f3c]" />
                  </Link>
            ))}
          </div>
          <div className="px-6 py-5">
            <Link to="/contact" onClick={() => setMenuOpen(false)}
              className="block bg-[#1c1c1e] text-white text-center font-black py-3.5 rounded-full text-sm">
              無料診断を受ける
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen bg-[#f8f5f0] flex flex-col justify-center overflow-hidden">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #c8c2b8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.45,
      }} />
      {/* Large watermark */}
      <span className="absolute right-0 bottom-0 font-serif font-black leading-none select-none pointer-events-none text-[#1c1c1e]"
        style={{ fontSize: '22vw', opacity: 0.028 }}>iroha</span>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* Text */}
          <div>
            <SectionLabel>Marketing Consultant</SectionLabel>
            <h1 className="font-serif font-black text-[#1c1c1e] leading-[1.1] mb-8">
              <span className="block text-4xl sm:text-5xl lg:text-6xl">「なぜ売れないか」を</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#c17f3c] mt-1">見つけ出し、</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl mt-1">事業を整える。</span>
            </h1>
            <p className="text-[#5c5a56] text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              商品・導線・ファネルを診断し、売れない原因を根本から特定。
              USP設計から実行支援まで、一気通貫で伴走します。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1c1c1e] hover:bg-[#c17f3c] text-white font-black text-sm px-8 py-4 rounded-full transition-colors duration-200">
                無料診断を受ける <ArrowRight size={16} />
              </Link>
              <a href="#service"
                className="inline-flex items-center justify-center gap-2 border border-[#d8d2c8] hover:border-[#1c1c1e] text-[#5c5a56] hover:text-[#1c1c1e] text-sm font-medium px-8 py-4 rounded-full transition-colors">
                サービスを見る <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Credential card — desktop only */}
          <div className="hidden lg:block flex-shrink-0 w-60">
            <div className="border border-[#d8d2c8] rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="bg-[#1c1c1e] px-6 py-4">
                <p className="text-[9px] tracking-[0.35em] text-[#5c5a56] uppercase">Profile</p>
                <p className="text-white font-black text-sm mt-1">山本 剛史</p>
              </div>
              <div className="divide-y divide-[#f0ebe1]">
                <div className="px-6 py-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-black text-4xl text-[#c17f3c]">14</span>
                    <span className="text-xs text-[#8a8680] font-bold">年</span>
                  </div>
                  <p className="text-xs text-[#5c5a56] mt-1 leading-snug">経営者としての実務経験</p>
                </div>
                <div className="px-6 py-5">
                  <span className="font-serif font-black text-2xl text-[#1c1c1e]">CMO</span>
                  <p className="text-xs text-[#5c5a56] mt-1 leading-snug">製薬会社の最高マーケティング責任者として参画</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[9px] tracking-[0.2em] text-[#8a8680] uppercase mb-2.5">Industries</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['建築', '飲食', 'IT', '製薬'].map(tag => (
                      <span key={tag} className="text-[10px] bg-[#f8f5f0] border border-[#d8d2c8] px-2 py-0.5 rounded-full text-[#5c5a56]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ───────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-[#1c1c1e] py-4 overflow-hidden">
      <div className="animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 mx-5">
            <span className="text-[#f8f5f0]/80 text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap">{item}</span>
            <span className="w-1 h-1 rounded-full bg-[#c17f3c] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Problem ───────────────────────────────────────────────────────────────────

function ProblemSection() {
  return (
    <section className="py-24 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <SectionLabel>こんな悩みはありませんか？</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-[#1c1c1e] leading-snug mb-6">
              頑張っているのに、<br />なぜ売れないのか。
            </h2>
            <p className="text-[#5c5a56] text-[15px] leading-relaxed">
              多くの経営者・個人事業主が、この壁に直面しています。
              問題は「努力が足りない」のではなく、
              「どこに問題があるか」が見えていないことです。
            </p>
          </div>
          <div className="space-y-3">
            {PROBLEMS.map(({ num, text }) => (
              <div key={num}
                className="flex items-start gap-5 bg-white border border-[#d8d2c8] rounded-xl p-5 hover:border-[#c17f3c]/60 hover:shadow-sm transition-all group">
                <span className="font-serif font-black text-2xl text-[#d8d2c8] group-hover:text-[#c17f3c]/60 transition-colors leading-none pt-0.5 flex-shrink-0 select-none">{num}</span>
                <p className="text-[#1c1c1e] text-sm font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Service ───────────────────────────────────────────────────────────────────

function ServiceSection() {
  return (
    <section id="service" className="py-24 bg-[#1c1c1e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel>サービス / SERVICE</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-white leading-snug">
              個別伴走サポート
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[#8a8680] text-sm leading-relaxed">
              商品・導線・ファネルを診断し、USP設計から実行支援まで一気通貫で整えます。
            </p>
            <Link to="/service" className="inline-flex items-center gap-1.5 text-[#c17f3c] text-sm font-bold mt-3 hover:underline">
              詳しく見る <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {SERVICE_PILLARS.map(({ num, title, desc }) => (
            <div key={num}
              className="border border-[#2a2a2e] rounded-xl p-8 hover:border-[#c17f3c]/30 transition-colors group">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-serif font-black text-[#c17f3c]/60 text-sm">{num}</span>
                <span className="w-px h-4 bg-[#2a2a2e]" />
                <h3 className="font-black text-white text-lg">{title}</h3>
              </div>
              <p className="text-[#8a8680] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="border border-[#c17f3c]/20 rounded-xl p-8 bg-[#c17f3c]/5">
          <p className="text-[9px] tracking-[0.35em] text-[#c17f3c] uppercase mb-5">Outcome</p>
          <blockquote className="font-serif text-xl md:text-2xl font-black text-white leading-relaxed">
            自分の商品に自信を持ち、誰に・何を・どう届ければ選ばれるのかが明確になる。
            <span className="block text-[#c17f3c] mt-3 text-lg md:text-xl">
              集客から販売までの流れが整った、"選ばれる事業"へ。
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ─── Process ───────────────────────────────────────────────────────────────────

function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[#ede8df]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <SectionLabel>支援の流れ / PROCESS</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#1c1c1e] leading-snug">
            診断から自走まで、<br className="hidden sm:block" />一気通貫で伴走します。
          </h2>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-0">
          {PROCESS_STEPS.map(({ num, title, desc }, i) => (
            <div key={num} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#d8d2c8] flex items-center justify-center flex-shrink-0">
                  <span className="font-serif font-black text-xs text-[#c17f3c]">{num}</span>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-[#d8d2c8] my-2" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-black text-[#1c1c1e] text-base mb-1.5 mt-2">{title}</h3>
                <p className="text-[#8a8680] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {PROCESS_STEPS.map(({ num, title, desc }) => (
            <div key={num} className="text-center">
              <div className="w-11 h-11 rounded-full bg-white border-2 border-[#d8d2c8] flex items-center justify-center mx-auto mb-4">
                <span className="font-serif font-black text-xs text-[#c17f3c]">{num}</span>
              </div>
              <h3 className="font-black text-[#1c1c1e] text-sm mb-2">{title}</h3>
              <p className="text-[#8a8680] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Achievements ──────────────────────────────────────────────────────────────

function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 bg-[#1c1c1e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <SectionLabel>実績 / ACHIEVEMENTS</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-white leading-snug">
            確かな経験に裏打ちされた、<br className="hidden sm:block" />実戦力
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map(({ value, unit, title, desc }) => (
            <div key={title} className="border border-[#2a2a2e] rounded-xl overflow-hidden">
              <div className="p-8 border-b border-[#2a2a2e]">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-serif font-black text-5xl md:text-6xl text-[#c17f3c]">{value}</span>
                  {unit && <span className="text-[#8a8680] text-lg font-bold">{unit}</span>}
                </div>
                <h3 className="font-black text-white text-base leading-snug">{title}</h3>
              </div>
              <div className="p-8">
                <p className="text-[#8a8680] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Representative ────────────────────────────────────────────────────────────

function RepresentativeSection() {
  return (
    <section id="representative" className="py-24 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">

          {/* Photo */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="relative">
              <div className="w-60 md:w-72 aspect-[3/4] overflow-hidden bg-[#ede8df]"
                style={{ borderRadius: '16px 16px 48px 16px' }}>
                <img src="/profile.jpg" alt="山本 剛史"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const p = el.parentElement;
                    if (p) {
                      p.style.display = 'flex';
                      p.style.alignItems = 'center';
                      p.style.justifyContent = 'center';
                      p.innerHTML = '<span style="color:#c17f3c;font-size:3rem;font-weight:900;font-family:serif">TY</span>';
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-3 bg-[#1c1c1e] text-white rounded-xl px-4 py-3 shadow-lg">
                <div className="font-black text-xs leading-tight">代表取締役社長</div>
                <div className="text-[#c17f3c] text-[10px] mt-0.5 tracking-wide">株式会社廣創</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-3">
            <SectionLabel>代表メッセージ / MESSAGE</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-[#1c1c1e] mb-1">山本 剛史</h2>
            <p className="text-[#8a8680] text-sm tracking-[0.2em] mb-8">TSUYOSHI YAMAMOTO</p>

            <blockquote className="font-serif text-xl md:text-2xl font-black text-[#1c1c1e] leading-snug mb-8 border-l-[3px] border-[#c17f3c] pl-6">
              "勇気を持って独立した方々の<br className="hidden sm:block" />成功を、少しでも手助けしたい"
            </blockquote>

            <div className="space-y-4 text-[#5c5a56] leading-relaxed text-[15px]">
              <p>30歳で法人を設立し、建築・飲食・IT・製薬など複数の業界で当事者として経営に携わってきました。その中でコロナ禍などの影響もあり、周囲で独立した仲間が志半ばで諦めたり、倒産に追い込まれる姿を目の当たりにしました。</p>
              <p>「自分が関わることで、もしかしたら救えたのかもしれない」——そう感じたとき、終身雇用という絶対的な安定がない今の時代に、勇気を持って踏み出した方々を支えたいと強く思うようになりました。</p>
              <p>私の強みは、SNS運用や広告といった施策の前に「なぜ売れていないか」を見抜くことです。その人の話を深く聞きながら、商品設計・導線設計・ファネルまで含めて、売れる流れを一から整えます。</p>
              <p>あなたの事業の「種」を共に育て、確かな売上へとつなげること。それが私の使命です。</p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#d8d2c8]">
              <p className="text-[9px] tracking-[0.35em] text-[#8a8680] uppercase mb-5">Career</p>
              <div className="space-y-3">
                {[
                  { year: '20代',  text: 'マッサージ師・職人として現場経験を積む' },
                  { year: '30歳',  text: '法人設立。建築リフォーム・太陽光発電事業を展開' },
                  { year: '30代',  text: 'フランチャイズ飲食事業エリアマネージャー兼任' },
                  { year: '〜現在', text: 'IT企業サービス構築・営業、製薬会社CMO参画' },
                ].map(({ year, text }) => (
                  <div key={year} className="flex gap-4 text-sm">
                    <span className="text-[#c17f3c] font-bold w-14 flex-shrink-0">{year}</span>
                    <span className="text-[#5c5a56]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#ede8df]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <SectionLabel>よくある質問 / FAQ</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#1c1c1e]">よくある質問</h2>
        </div>

        <div className="space-y-2">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className={`rounded-xl overflow-hidden border transition-colors ${
              openIndex === i ? 'border-[#c17f3c]/40 bg-white' : 'border-[#d8d2c8] bg-white'
            }`}>
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#f8f5f0] transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="font-bold text-sm md:text-base text-[#1c1c1e] leading-snug">{q}</span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                  openIndex === i ? 'border-[#c17f3c] bg-[#c17f3c] text-white' : 'border-[#d8d2c8] text-[#8a8680]'
                }`}>
                  {openIndex === i ? <Minus size={10} /> : <Plus size={10} />}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-[#f0ebe1] mb-4" />
                  <p className="text-[#5c5a56] text-sm leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-28 bg-[#1c1c1e]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <SectionLabel>お問い合わせ / CONTACT</SectionLabel>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          まずは無料診断から。
        </h2>
        <p className="text-[#8a8680] leading-relaxed max-w-lg mx-auto mb-10 text-[15px]">
          「今すぐではないけれど気になっている」という段階でも大丈夫です。
          現状をお聞きして、必要かどうかを一緒に判断しましょう。
        </p>
        <Link to="/contact"
          className="inline-flex items-center gap-3 bg-[#c17f3c] hover:bg-[#a0662c] text-white font-black text-base px-12 py-5 rounded-full transition-colors duration-200">
          無料診断を申し込む <ArrowRight size={18} />
        </Link>
        <p className="text-[#5c5a56] text-xs mt-6 tracking-wide">診断無料・オンライン対応可・強引な営業は一切ありません</p>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#1c1c1e] border-t border-[#2a2a2e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md overflow-hidden bg-[#f8f5f0] flex items-center justify-center">
              <img src="/logo.png" alt="iroha Seed" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-white text-sm">iroha Seed</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#5c5a56]">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-[#f8f5f0] transition-colors">{label}</a>
            ))}
            <Link to="/company" className="hover:text-[#f8f5f0] transition-colors">会社概要</Link>
            <Link to="/contact" className="hover:text-[#f8f5f0] transition-colors">お問い合わせ</Link>
          </nav>
          <div className="flex items-center gap-2">
            {SNS_LINKS.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-[#2a2a2e] flex items-center justify-center text-[#5c5a56] hover:border-[#c17f3c] hover:text-[#c17f3c] transition-colors">
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-[#2a2a2e] mt-8 pt-6 text-center text-[#5c5a56] text-xs">
          © 2026 Hiroso Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans antialiased bg-[#f8f5f0]">
      <Navbar />
      <Hero />
      <Marquee />
      <ProblemSection />
      <ServiceSection />
      <ProcessSection />
      <AchievementsSection />
      <RepresentativeSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
