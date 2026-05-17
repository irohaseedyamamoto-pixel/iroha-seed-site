import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Calendar, Briefcase, User } from 'lucide-react';

const COMPANY_INFO = [
  { label: '法人名', value: '株式会社廣創 (Hiroso Inc.)', icon: Building2 },
  { label: '設立', value: '2012年10月1日', icon: Calendar },
  { label: '事業ブランド', value: 'iroha Seed（イロハシード）', icon: Briefcase },
  { label: '代表者', value: '山本 剛史', icon: User },
  { label: '本社所在地', value: '山口県', icon: MapPin },
  { label: '福岡拠点', value: '福岡県福岡市城南区七隈3-2-29-101', icon: MapPin },
  { label: '事業内容', value: 'マーケティング戦略コンサルティング、プロモーション支援、事業開発', icon: Briefcase },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-500 hover:text-blue-800 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            トップページへ戻る
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="iroha Seed" className="w-6 h-6 object-contain" />
            <span className="font-bold text-slate-800 text-sm">iroha Seed</span>
          </div>
        </div>
      </header>

      {/* ヒーロー */}
      <div className="bg-blue-900 py-14">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-blue-300 font-bold text-sm tracking-widest uppercase mb-3">COMPANY</div>
          <h1 className="text-3xl md:text-4xl font-black text-white">会社概要</h1>
        </div>
      </div>

      {/* コンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* 企業情報テーブル */}
        <section className="mb-16">
          <h2 className="text-xl font-black text-slate-900 mb-6 pb-3 border-b-2 border-blue-900">企業情報</h2>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {COMPANY_INFO.map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className={`flex items-start gap-5 px-8 py-5 border-b border-slate-100 last:border-b-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 w-40 flex-shrink-0 pt-0.5">
                  <Icon size={15} className="text-blue-900 flex-shrink-0" />
                  <span className="text-sm font-bold text-blue-900">{label}</span>
                </div>
                <div className="text-slate-700 text-sm leading-relaxed">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 事業理念 */}
        <section className="mb-16">
          <h2 className="text-xl font-black text-slate-900 mb-6 pb-3 border-b-2 border-blue-900">事業理念</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <blockquote className="text-2xl font-black text-slate-900 leading-snug mb-6 border-l-4 border-blue-900 pl-6">
              "現場の解像度を上げ、<br />経営の精度を高める。"
            </blockquote>
            <p className="text-slate-600 leading-relaxed">
              私たちは単なる制作会社やコンサルティング会社ではありません。
              「売れる仕組み」を共に創り上げるパートナーとして、現場の熱量を成果に変えるまで伴走します。
              経営者の孤独や判断の重さを理解したうえで、表面的ではない打ち手を提示し、
              あなたの事業の「種」を確かな売上へと繋げていくことが私たちの使命です。
            </p>
          </div>
        </section>

        {/* 対応エリア */}
        <section className="mb-16">
          <h2 className="text-xl font-black text-slate-900 mb-6 pb-3 border-b-2 border-blue-900">対応エリア</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-blue-900" />
                <span className="font-black text-slate-900">対面対応</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                福岡市内・近郊エリアは対面でのご相談・支援に対応しています。
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase size={18} className="text-blue-900" />
                <span className="font-black text-slate-900">オンライン対応</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                オンラインにて全国どこでもご対応可能です。
              </p>
            </div>
          </div>
        </section>

        {/* お問い合わせへの導線 */}
        <div className="bg-blue-900 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-black text-white mb-3">まずはお気軽にご相談ください</h3>
          <p className="text-blue-200 mb-8 leading-relaxed">
            サービス内容や料金など、どんな小さなことでもお気軽にお問い合わせください。
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-black px-10 py-4 rounded-xl hover:bg-blue-700 hover:text-white border-2 border-white transition-all duration-200 shadow-lg"
          >
            お問い合わせはこちら
          </Link>
        </div>

      </main>

      {/* フッター */}
      <footer className="border-t border-slate-200 mt-16 py-8 text-center text-slate-400 text-sm">
        © 2026 Hiroso Inc. All rights reserved.
      </footer>
    </div>
  );
}
