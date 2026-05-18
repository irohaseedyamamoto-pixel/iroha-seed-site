import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Calendar, Briefcase, User, ArrowRight } from 'lucide-react';

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${light ? 'text-[#a8c08a]' : 'text-[#5a7d42]'}`}>
      <span className={`w-10 h-[1.5px] ${light ? 'bg-[#a8c08a]' : 'bg-[#5a7d42]'}`} />
      <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{children}</span>
    </div>
  );
}

const COMPANY_INFO = [
  { label: '法人名',    value: '株式会社廣創 (Hiroso Inc.)', icon: Building2 },
  { label: '設立',      value: '2012年10月1日',              icon: Calendar  },
  { label: '事業ブランド', value: 'iroha Seed（イロハシード）', icon: Briefcase },
  { label: '代表者',    value: '山本 剛史',                  icon: User      },
  { label: '本社所在地', value: '山口県',                     icon: MapPin    },
  { label: '福岡拠点',  value: '福岡県福岡市城南区七隈3-2-29-101', icon: MapPin },
  { label: '事業内容',  value: 'マーケティング戦略コンサルティング、プロモーション支援、事業開発', icon: Briefcase },
];

export default function CompanyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="font-sans antialiased min-h-screen bg-[#faf8f4]">

      {/* ヘッダー */}
      <header className="bg-[#faf8f4] border-b border-[#d0cabb] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#7a8e70] hover:text-[#1e2e1a] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={15} />
            トップへ戻る
          </Link>
          <span className="text-[#d0cabb]">|</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md overflow-hidden bg-[#e8e4da] flex items-center justify-center">
              <img src="/logo.png" alt="iroha Seed" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-[#1e2e1a] text-sm">iroha Seed</span>
          </div>
        </div>
      </header>

      {/* ページタイトル */}
      <div className="relative bg-[#1e3a22] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a22] via-[#1e3a22]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <Label light>会社概要 / COMPANY</Label>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight">
            会社概要
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* 企業情報 */}
        <section className="py-20">
          <Label>企業情報 / PROFILE</Label>
          <h2 className="font-serif text-3xl font-black text-[#1e2e1a] mb-10">企業情報</h2>

          <div className="border border-[#d0cabb] rounded-2xl overflow-hidden">
            {COMPANY_INFO.map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className={`flex items-start gap-6 px-8 py-5 border-b border-[#e0dbd0] last:border-b-0 ${
                  i % 2 === 0 ? 'bg-[#faf8f4]' : 'bg-[#f5f0e8]'
                }`}
              >
                <div className="flex items-center gap-3 w-44 flex-shrink-0 pt-0.5">
                  <Icon size={14} className="text-[#5a7d42] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#1e2e1a]">{label}</span>
                </div>
                <div className="text-[#5a6e52] text-sm leading-relaxed">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 事業理念 */}
        <section className="py-20 -mx-6 lg:-mx-10 px-6 lg:px-10 bg-[#1e3a22] rounded-3xl mb-20">
          <Label light>事業理念 / PHILOSOPHY</Label>
          <blockquote className="font-serif text-3xl md:text-4xl font-black text-white leading-tight mb-8 border-l-[3px] border-[#a8c08a] pl-8">
            "現場の解像度を上げ、<br />
            <span className="text-[#a8c08a]">経営の精度を高める。</span>"
          </blockquote>
          <p className="text-[#7a8e70] leading-relaxed max-w-2xl text-[15px]">
            私たちは単なる制作会社やコンサルティング会社ではありません。
            「売れる仕組み」を共に創り上げるパートナーとして、現場の熱量を成果に変えるまで伴走します。
            経営者の孤独や判断の重さを理解したうえで、表面的ではない打ち手を提示し、
            あなたの事業の「種」を確かな売上へと繋げていくことが私たちの使命です。
          </p>
        </section>

        {/* 対応エリア */}
        <section className="pb-20">
          <Label>対応エリア / AREA</Label>
          <h2 className="font-serif text-3xl font-black text-[#1e2e1a] mb-10">対応エリア</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="border border-[#d0cabb] rounded-2xl p-8 hover:border-[#8aab68] hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8e4da] flex items-center justify-center group-hover:bg-[#5a7d42] group-hover:text-white transition-colors">
                  <MapPin size={18} className="text-[#7a8e70] group-hover:text-white transition-colors" />
                </div>
                <span className="font-black text-[#1e2e1a] text-lg">対面対応</span>
              </div>
              <p className="text-[#5a6e52] text-sm leading-relaxed">
                福岡市内・近郊エリアは対面でのご相談・支援に対応しています。
              </p>
            </div>
            <div className="border border-[#d0cabb] rounded-2xl p-8 hover:border-[#8aab68] hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8e4da] flex items-center justify-center group-hover:bg-[#5a7d42] group-hover:text-white transition-colors">
                  <Briefcase size={18} className="text-[#7a8e70] group-hover:text-white transition-colors" />
                </div>
                <span className="font-black text-[#1e2e1a] text-lg">オンライン対応</span>
              </div>
              <p className="text-[#5a6e52] text-sm leading-relaxed">
                オンラインにて全国どこでもご対応可能です。
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* CTA */}
      <section className="relative py-24 bg-[#1e3a22] overflow-hidden">
        <div className="absolute inset-0 opacity-12">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Label light>お問い合わせ / CONTACT</Label>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            まずはお気軽に<br />ご相談ください
          </h2>
          <p className="text-[#7a8e70] mb-10 leading-relaxed text-[15px] max-w-lg mx-auto">
            サービス内容や料金など、どんな小さなことでもお気軽にお問い合わせください。
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#5a7d42] hover:bg-[#6a8d52] text-white font-black text-base px-10 py-4 rounded-full transition-all duration-200"
            style={{ boxShadow: '0 20px 50px rgba(90,125,66,0.35)' }}
          >
            お問い合わせはこちら
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-[#1e3a22] border-t border-[#2a4a2d] py-8 text-center text-[#4a5e42] text-xs">
        © 2026 Hiroso Inc. All rights reserved.
      </footer>
    </div>
  );
}
