import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${light ? 'text-sky-400' : 'text-blue-700'}`}>
      <span className={`w-10 h-[1.5px] ${light ? 'bg-sky-400' : 'bg-blue-600'}`} />
      <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{children}</span>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <section className="pt-20 mt-20 border-t border-slate-200">
      <Label>プライバシーポリシー / PRIVACY POLICY</Label>
      <h2 className="font-serif text-3xl font-black text-slate-900 mb-10">プライバシーポリシー</h2>

      <div className="space-y-8 text-slate-500 leading-relaxed text-sm">
        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">1. 個人情報の取得について</h3>
          <p>
            株式会社廣創（以下「当社」）は、お問い合わせフォームを通じてお名前・会社名・メールアドレス・
            お問い合わせ内容等の個人情報を取得します。個人情報は適切な方法で取得し、不正な取得は行いません。
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">2. 個人情報の利用目的</h3>
          <p>取得した個人情報は、以下の目的のみに利用します。</p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-slate-400 pl-2">
            <li>お問い合わせへの回答・ご連絡</li>
            <li>サービスに関する情報のご提供</li>
            <li>当社サービス改善のための統計分析（個人を特定しない形式）</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">3. 個人情報の第三者提供</h3>
          <p>
            当社は、法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供・開示・譲渡することはありません。
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">4. 個人情報の管理</h3>
          <p>
            個人情報への不正アクセス・紛失・破損・改ざん・漏洩等を防止するため、適切なセキュリティ対策を講じます。
            個人情報の保存期間は、利用目的達成後または法令に定める保存期間の終了時までとします。
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">5. 個人情報の開示・訂正・削除</h3>
          <p>
            ご本人から個人情報の開示・訂正・削除・利用停止を求められた場合は、合理的な範囲で速やかに対応します。
            お申し出は下記お問い合わせ先までご連絡ください。
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">6. Cookieの使用について</h3>
          <p>
            当サイトでは、サービスの改善を目的としてCookieを使用する場合があります。
            ブラウザの設定によりCookieの使用を拒否することができますが、その場合一部機能が利用できなくなる場合があります。
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">7. プライバシーポリシーの変更</h3>
          <p>
            当社は、法令の変更や運営上の必要に応じて、本ポリシーを予告なく変更することがあります。
            変更後のポリシーは本ページに掲載した時点から効力を生じます。
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base mb-3">8. お問い合わせ先</h3>
          <div className="border border-slate-200 rounded-xl p-6 mt-2 bg-slate-50">
            <p className="font-bold text-slate-800 mb-1">株式会社廣創（iroha Seed）</p>
            <p>福岡県福岡市城南区七隈3-2-29-101</p>
            <p className="mt-1">メール：iroha.seed.yamamoto@gmail.com</p>
          </div>
        </div>

        <p className="text-right text-slate-300 text-xs pt-4">制定日：2026年5月18日</p>
      </div>
    </section>
  );
}

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="font-sans antialiased min-h-screen bg-white">

      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={15} />
            トップへ戻る
          </Link>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
              <img src="/logo.png" alt="iroha Seed" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-slate-800 text-sm">iroha Seed</span>
          </div>
        </div>
      </header>

      {/* ページタイトル */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <Label light>お問い合わせ / CONTACT</Label>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight">
            無料相談・お問い合わせ
          </h1>
          <p className="text-slate-400 mt-4 text-[15px] max-w-lg leading-relaxed">
            サービスに関するご質問・無料相談のお申し込みは下記フォームよりお送りください。<br />
            通常2営業日以内にご返信いたします。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 lg:px-10 py-20">

        {/* Google フォーム */}
        <section>
          <Label>フォーム / FORM</Label>
          <h2 className="font-serif text-3xl font-black text-slate-900 mb-8">お問い合わせフォーム</h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSf97oAUOKluVJKb4TRWIQJ--tlJwfiTVF29SUAo3J74mehHRA/viewform?embedded=true"
              width="100%"
              height="820"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="お問い合わせフォーム"
              className="block"
              tabIndex={-1}
              onLoad={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
            >
              読み込んでいます…
            </iframe>
          </div>
        </section>

        <PrivacyPolicy />
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-slate-600 text-xs">
        © 2026 Hiroso Inc. All rights reserved.
      </footer>
    </div>
  );
}
