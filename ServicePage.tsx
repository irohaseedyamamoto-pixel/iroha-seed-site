import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 text-[#c17f3c]">
      <span className="w-8 h-[1.5px] bg-[#c17f3c]" />
      <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{children}</span>
    </div>
  );
}

const PILLARS = [
  {
    num: '01',
    title: '事業診断',
    lead: '「売れない」の本当の原因を、ここから探ります。',
    points: [
      '商品・サービスの設計と訴求の確認',
      '集客導線・ファネルの全体把握',
      '競合・市場ポジションの整理',
      '売れていない根本原因の特定',
    ],
    desc: '表面的な施策の前に、まず現状を正確に把握します。ヒアリングを通じて、商品・導線・ファネルのどこに問題があるかを特定し、打つべき手を明確にします。',
  },
  {
    num: '02',
    title: 'USP・商品設計',
    lead: '「あなたから買う理由」を言語化します。',
    points: [
      'ターゲット顧客の明確化',
      'USP（独自の強み）の言語化',
      '商品・サービスの再設計',
      '価格設計と提案フレームの整備',
    ],
    desc: '多くの人は「誰に・何を・どう届けるか」が曖昧なまま発信しています。あなたにしか語れない強みを掘り起こし、自信を持って提案できる商品の土台を一緒に組み立てます。',
  },
  {
    num: '03',
    title: '導線・ファネル設計',
    lead: '点の施策を、つながった流れに変えます。',
    points: [
      '集客チャネルの選定と設計',
      'LP・セールスページの構成整理',
      '問い合わせ〜成約フローの設計',
      'リピート・紹介導線の構築',
    ],
    desc: 'SNS・広告・LP・セールスがバラバラに動いていると、どれだけ頑張っても成果が安定しません。集客から成約・継続まで分断なく繋がった構造を、一気通貫で設計・構築します。',
  },
  {
    num: '04',
    title: '実行支援・個別伴走',
    lead: 'アドバイスで終わらず、現場で一緒に動きます。',
    points: [
      '施策実行の伴走サポート',
      '定期的な進捗確認と改善提案',
      '数字の検証と仮説の修正',
      '自走できる状態までのサポート',
    ],
    desc: '「提案書を渡して終わり」ではありません。実行フェーズも共に歩み、結果を数字で検証しながら改善を繰り返します。あなたが自走できる状態になるまで寄り添い続けます。',
  },
];

const FOR_WHO = [
  '発信・集客を頑張っているのに売上につながらない方',
  '商品・導線・ファネルのどこに問題があるか判断できない方',
  '自信を持って自分の商品を提案できない方',
  'SNSや広告を試したが手応えがなく、迷っている方',
  '独立・開業して間もなく、何から手をつければいいか分からない方',
  'アドバイスではなく、一緒に動いてくれるパートナーを探している方',
];

const PROCESS = [
  { num: '01', title: '無料診断',   desc: 'まずオンラインで現状をヒアリング。課題の所在と方向性を一緒に確認します。（30〜60分）' },
  { num: '02', title: '提案',       desc: '診断結果をもとに、具体的なサポート内容とプランをご提案します。' },
  { num: '03', title: 'サポート開始', desc: 'ご納得いただけたらサポートスタート。診断→再設計→構築→実行の流れで進めます。' },
  { num: '04', title: '改善・自走', desc: '結果を検証しながら改善を繰り返し、最終的にあなたが自走できる状態を目指します。' },
];

export default function ServicePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="font-sans antialiased min-h-screen bg-[#f8f5f0]">

      {/* Header */}
      <header className="bg-[#f8f5f0] border-b border-[#d8d2c8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-[#8a8680] hover:text-[#1c1c1e] transition-colors text-sm font-medium">
            <ArrowLeft size={15} />
            トップへ戻る
          </Link>
          <span className="text-[#d8d2c8]">|</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md overflow-hidden bg-[#ede8df] flex items-center justify-center">
              <img src="/logo.png" alt="iroha Seed" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-[#1c1c1e] text-sm">iroha Seed</span>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="bg-[#1c1c1e] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #2a2a2e 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <SectionLabel>サービス / SERVICE</SectionLabel>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight">
            個別伴走サポート
          </h1>
          <p className="text-[#8a8680] mt-4 text-[15px] max-w-lg leading-relaxed">
            商品・導線・ファネルを診断し、売れない原因を根本から特定。
            USP設計から実行支援まで、一気通貫でサポートします。
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* For who */}
        <section className="py-20">
          <SectionLabel>こんな方へ / FOR WHO</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1c1c1e] mb-10 leading-snug">
            こんな方に向けたサービスです
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {FOR_WHO.map((text, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-[#d8d2c8] rounded-xl p-5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#c17f3c]/10 border border-[#c17f3c]/30 flex items-center justify-center mt-0.5">
                  <Check size={10} className="text-[#c17f3c]" />
                </span>
                <p className="text-[#1c1c1e] text-sm font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service pillars */}
        <section className="py-20 border-t border-[#d8d2c8]">
          <SectionLabel>サービス内容 / CONTENTS</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1c1c1e] mb-14 leading-snug">
            4つの柱で、売れる仕組みを整えます
          </h2>
          <div className="space-y-16">
            {PILLARS.map(({ num, title, lead, points, desc }) => (
              <div key={num} className="grid md:grid-cols-5 gap-8 md:gap-12">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-serif font-black text-4xl text-[#c17f3c]/40">{num}</span>
                    <div className="w-px h-8 bg-[#d8d2c8]" />
                    <h3 className="font-black text-[#1c1c1e] text-xl">{title}</h3>
                  </div>
                  <p className="text-[#8a8680] text-sm leading-relaxed mb-5">{lead}</p>
                  <ul className="space-y-2">
                    {points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#5c5a56]">
                        <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#c17f3c] mt-2" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3 bg-white border border-[#d8d2c8] rounded-xl p-8 flex items-center">
                  <p className="text-[#5c5a56] text-[15px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outcome */}
        <section className="py-20 border-t border-[#d8d2c8]">
          <SectionLabel>得られる成果 / OUTCOME</SectionLabel>
          <div className="bg-[#1c1c1e] rounded-2xl p-10 md:p-14">
            <blockquote className="font-serif text-2xl md:text-3xl font-black text-white leading-relaxed mb-6">
              自分の商品に自信を持ち、誰に・何を・どう届ければ選ばれるのかが明確になる。
            </blockquote>
            <p className="text-[#c17f3c] font-black text-lg md:text-xl font-serif">
              集客から販売までの流れが整った、"選ばれる事業"へ。
            </p>
            <div className="mt-8 pt-8 border-t border-[#2a2a2e] text-[#8a8680] text-sm leading-relaxed max-w-2xl">
              自己紹介・発信・セールス・価格提示に迷いがなくなり、施策が点ではなく
              つながった流れとして機能するようになります。
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 border-t border-[#d8d2c8]">
          <SectionLabel>ご利用の流れ / HOW TO START</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1c1c1e] mb-12 leading-snug">
            無料診断から始まります
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                <div className="w-11 h-11 rounded-full border-2 border-[#d8d2c8] bg-white flex items-center justify-center mb-4">
                  <span className="font-serif font-black text-xs text-[#c17f3c]">{num}</span>
                </div>
                <h3 className="font-black text-[#1c1c1e] text-base mb-2">{title}</h3>
                <p className="text-[#8a8680] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* CTA */}
      <section className="py-24 bg-[#1c1c1e]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SectionLabel>お問い合わせ / CONTACT</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            まずは無料診断から。
          </h2>
          <p className="text-[#8a8680] mb-10 leading-relaxed text-[15px] max-w-lg mx-auto">
            「今すぐではない」という段階でも大丈夫です。
            現状をお聞きして、必要かどうかを一緒に判断しましょう。
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-3 bg-[#c17f3c] hover:bg-[#a0662c] text-white font-black text-base px-10 py-4 rounded-full transition-colors duration-200">
            無料診断を申し込む <ArrowRight size={18} />
          </Link>
          <p className="text-[#5c5a56] text-xs mt-5 tracking-wide">診断無料・オンライン対応可・強引な営業は一切ありません</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1c1c1e] border-t border-[#2a2a2e] py-8 text-center text-[#5c5a56] text-xs">
        © 2026 Hiroso Inc. All rights reserved.
      </footer>
    </div>
  );
}
