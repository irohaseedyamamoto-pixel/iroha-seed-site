import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, MapPin, Calendar, Briefcase, User } from 'lucide-react';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 text-[#c17f3c]">
      <span className="w-8 h-[1.5px] bg-[#c17f3c]" />
      <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{children}</span>
    </div>
  );
}

const COMPANY_INFO = [
  { label: '法人名',      value: '株式会社廣創 (Hiroso Inc.)',                                   icon: Building2 },
  { label: '設立',        value: '2012年10月1日',                                                icon: Calendar  },
  { label: '事業ブランド', value: 'iroha Seed（イロハシード）',                                   icon: Briefcase },
  { label: '代表者',      value: '山本 剛史',                                                    icon: User      },
  { label: '本社所在地',  value: '山口県',                                                       icon: MapPin    },
  { label: '福岡拠点',    value: '福岡県福岡市城南区七隈3-2-29-101',                             icon: MapPin    },
  { label: '事業内容',    value: 'マーケティング戦略コンサルティング、プロモーション支援、事業開発', icon: Briefcase },
];

export default function CompanyPage() {
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
          <SectionLabel>会社概要 / COMPANY</SectionLabel>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight">
            会社概要
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Company info */}
        <section className="py-20">
          <SectionLabel>企業情報 / PROFILE</SectionLabel>
          <h2 className="font-serif text-3xl font-black text-[#1c1c1e] mb-10">企業情報</h2>
          <div className="border border-[#d8d2c8] rounded-2xl overflow-hidden bg-white">
            {COMPANY_INFO.map(({ label, value, icon: Icon }, i) => (
              <div key={label} className={`flex items-start gap-6 px-8 py-5 border-b border-[#f0ebe1] last:border-b-0 ${
                i % 2 === 0 ? 'bg-white' : 'bg-[#f8f5f0]'
              }`}>
                <div className="flex items-center gap-3 w-44 flex-shrink-0 pt-0.5">
                  <Icon size={14} className="text-[#c17f3c] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#1c1c1e]">{label}</span>
                </div>
                <div className="text-[#5c5a56] text-sm leading-relaxed">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="pb-20">
          <div className="bg-[#1c1c1e] rounded-2xl p-10 md:p-14">
            <SectionLabel>事業理念 / PHILOSOPHY</SectionLabel>
            <blockquote className="font-serif text-3xl md:text-4xl font-black text-white leading-tight mb-8 border-l-[3px] border-[#c17f3c] pl-8">
              "勇気を持って独立した方々の<br />
              <span className="text-[#c17f3c]">成功を、少しでも手助けしたい。</span>"
            </blockquote>
            <p className="text-[#8a8680] leading-relaxed max-w-2xl text-[15px]">
              30歳で法人を設立し、建築・飲食・IT・製薬など複数業種で当事者として経営に携わってきました。
              コロナ禍などの影響もあり、周囲で独立した仲間が志半ばで諦めたり倒産に追い込まれる姿を目の当たりにしてきました。
              終身雇用という安定がない今の時代に、勇気を持って踏み出した方々の成功を支えること。それが私たちの使命です。
            </p>
          </div>
        </section>

        {/* Area */}
        <section className="pb-20 border-t border-[#d8d2c8] pt-20">
          <SectionLabel>対応エリア / AREA</SectionLabel>
          <h2 className="font-serif text-3xl font-black text-[#1c1c1e] mb-10">対応エリア</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border border-[#d8d2c8] rounded-2xl p-8 bg-white hover:border-[#c17f3c]/50 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#f8f5f0] flex items-center justify-center group-hover:bg-[#c17f3c] transition-colors">
                  <Briefcase size={18} className="text-[#8a8680] group-hover:text-white transition-colors" />
                </div>
                <span className="font-black text-[#1c1c1e] text-lg">オンライン対応</span>
              </div>
              <p className="text-[#5c5a56] text-sm leading-relaxed">全国どこでもオンラインにてご対応可能です。</p>
            </div>
            <div className="border border-[#d8d2c8] rounded-2xl p-8 bg-white hover:border-[#c17f3c]/50 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#f8f5f0] flex items-center justify-center group-hover:bg-[#c17f3c] transition-colors">
                  <MapPin size={18} className="text-[#8a8680] group-hover:text-white transition-colors" />
                </div>
                <span className="font-black text-[#1c1c1e] text-lg">対面対応</span>
              </div>
              <p className="text-[#5c5a56] text-sm leading-relaxed">直接お会いしてのご相談をご希望の方も、ご対応可能です。お気軽にご相談ください。</p>
            </div>
          </div>
        </section>

      </main>

      {/* CTA */}
      <section className="py-24 bg-[#1c1c1e]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SectionLabel>お問い合わせ / CONTACT</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            まずはお気軽に<br />ご相談ください
          </h2>
          <p className="text-[#8a8680] mb-10 leading-relaxed text-[15px] max-w-lg mx-auto">
            サービス内容や料金など、どんな小さなことでもお気軽にお問い合わせください。
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-3 bg-[#c17f3c] hover:bg-[#a0662c] text-white font-black text-base px-10 py-4 rounded-full transition-colors duration-200">
            お問い合わせはこちら <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1c1c1e] border-t border-[#2a2a2e] py-8 text-center text-[#5c5a56] text-xs">
        © 2026 Hiroso Inc. All rights reserved.
      </footer>
    </div>
  );
}
