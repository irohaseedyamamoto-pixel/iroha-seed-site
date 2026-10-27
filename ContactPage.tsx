import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/*
 * 問い合わせページ（/contact）。2026-10-27 に新サイト（RenewPage）の見た目のルールへそろえた。
 * - 地の色は 明るい地 #faf8f4 ／ 紺 #12161f。模様は入れない
 * - 緑は 明るい面で濃い緑 #426b19、紺の面でブランドの黄緑（seed）
 * - ラベルは日本語だけ（英語のラベルは使わない）。呼び名は「無料相談」にそろえる
 * - 外側を .renew で包み、しっぽり明朝・字詰めなど新サイトの文字の仕上げを効かせる
 */

const GREEN = { light: 'text-[#426b19]', dark: 'text-seed' } as const;

/** 見出しの上の小さなラベル。新サイトの SectionHeading と同じ形 */
function Label({ tone, children }: { tone: 'light' | 'dark'; children: ReactNode }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold tracking-[0.2em] md:text-sm ${GREEN[tone]}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** 相談の流れ：よくある質問の答え（無料相談・30〜60分・納得いただけた場合だけ始める）を並べ直したもの。新しい事実は足さない */
const FLOW: { title: string; body?: string }[] = [
  { title: 'フォームから送る' },
  { title: 'オンラインで30〜60分、お話を聞く', body: '全国どこでも対応します。直接お会いしてのご相談も可能です。' },
  {
    title: '課題と方向性をお伝えし、納得いただけた場合だけ始める',
    body: '強引な勧誘はしません。',
  },
];

function PrivacyPolicy() {
  return (
    <section className="mt-24 border-t border-[#1c1c1e]/15 pt-16 md:mt-32 md:pt-20">
      <Label tone="light">個人情報の取り扱い</Label>
      <h2 className="mt-4 font-serif text-[clamp(1.6rem,5vw,2.25rem)] font-black leading-tight tracking-tight text-[#1c1c1e]">
        プライバシーポリシー
      </h2>

      {/* 本文は変えていない。会社名・住所は、個人情報を扱う事業者として示しておく必要があるため残す */}
      <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#1c1c1e]/75">
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">1. 個人情報の取得について</h3>
          <p>株式会社廣創（以下「当社」）は、お問い合わせフォームを通じてお名前・会社名・メールアドレス・お問い合わせ内容等の個人情報を取得します。個人情報は適切な方法で取得し、不正な取得は行いません。</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">2. 個人情報の利用目的</h3>
          <p>取得した個人情報は、以下の目的のみに利用します。</p>
          <ul className="mt-3 list-inside list-disc space-y-1 pl-2">
            <li>お問い合わせへの回答・ご連絡</li>
            <li>サービスに関する情報のご提供</li>
            <li>当社サービス改善のための統計分析（個人を特定しない形式）</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">3. 個人情報の第三者提供</h3>
          <p>当社は、法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供・開示・譲渡することはありません。</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">4. 個人情報の管理</h3>
          <p>個人情報への不正アクセス・紛失・破損・改ざん・漏洩等を防止するため、適切なセキュリティ対策を講じます。個人情報の保存期間は、利用目的達成後または法令に定める保存期間の終了時までとします。</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">5. 個人情報の開示・訂正・削除</h3>
          <p>ご本人から個人情報の開示・訂正・削除・利用停止を求められた場合は、合理的な範囲で速やかに対応します。お申し出は下記お問い合わせ先までご連絡ください。</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">6. Cookieの使用について</h3>
          <p>当サイトでは、サービスの改善を目的としてCookieを使用する場合があります。ブラウザの設定によりCookieの使用を拒否することができますが、その場合一部機能が利用できなくなる場合があります。</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">7. プライバシーポリシーの変更</h3>
          <p>当社は、法令の変更や運営上の必要に応じて、本ポリシーを予告なく変更することがあります。変更後のポリシーは本ページに掲載した時点から効力を生じます。</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-[#1c1c1e]">8. お問い合わせ先</h3>
          <div className="mt-2 border-t border-[#1c1c1e]/15 pt-4">
            <p className="mb-1 font-bold text-[#1c1c1e]">株式会社廣創（iroha Seed）</p>
            <p>福岡県福岡市城南区七隈3-2-29-101</p>
            <p className="mt-1">メール：iroha.seed.yamamoto@gmail.com</p>
          </div>
        </div>
        <p className="pt-4 text-right text-xs text-[#1c1c1e]/55">制定日：2026年5月18日</p>
      </div>
    </section>
  );
}

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // フォームを送ると Googleフォームの中身が読み込み直される。
  // 最初の読み込みでは何もせず、2回目以降（送信後）はフォームの位置へ戻して「送信しました」を見せる
  const formRef = useRef<HTMLElement>(null);
  const loadCount = useRef(0);
  const handleFormLoad = () => {
    loadCount.current += 1;
    if (loadCount.current > 1) {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="renew min-h-screen bg-[#faf8f4] font-sans antialiased">
      <header className="sticky top-0 z-50 border-b border-[#1c1c1e]/10 bg-[#faf8f4]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 md:px-12">
          <Link to="/" className="font-serif text-lg font-black tracking-wide text-[#1c1c1e]">
            iroha&nbsp;Seed
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#1c1c1e]/65 transition hover:text-[#1c1c1e]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            トップへ戻る
          </Link>
        </div>
      </header>

      {/* 紺の面：見出しと、相談しやすくするひと言 */}
      <div className="bg-[#12161f] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Label tone="dark">ご相談</Label>
          <h1 className="mt-4 font-serif text-[clamp(1.9rem,6.5vw,2.5rem)] font-black leading-tight tracking-tight text-white">
            無料相談・お問い合わせ
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[2] text-white/75 md:text-base">
            「今すぐではないけれど気になっている」という段階でも大丈夫です。まず現状をお聞きして、必要かどうかを一緒に判断しましょう。
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <section>
          <Label tone="light">相談の流れ</Label>
          <ol className="mt-8 border-t border-[#1c1c1e]/15">
            {FLOW.map(({ title, body }, i) => (
              <li
                key={title}
                className="flex gap-5 border-b border-[#1c1c1e]/15 py-6 md:gap-8 md:py-7"
              >
                <span
                  className={`w-8 shrink-0 font-serif text-3xl font-black leading-none md:w-10 md:text-4xl ${GREEN.light}`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-serif text-lg font-black leading-snug text-[#1c1c1e] md:text-xl">
                    {title}
                  </p>
                  {body && <p className="mt-2 text-[15px] leading-[1.9] text-[#1c1c1e]/75">{body}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section ref={formRef} className="mt-20 scroll-mt-20 md:mt-28">
          <Label tone="light">お問い合わせフォーム</Label>
          <div className="mt-8 overflow-hidden rounded-md border border-[#1c1c1e]/12 bg-white">
            {/* スマホはフォームが縦に長くなるため高くして、フォームの中で二重にスクロールしないようにする */}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSf97oAUOKluVJKb4TRWIQJ--tlJwfiTVF29SUAo3J74mehHRA/viewform?embedded=true"
              title="お問い合わせフォーム"
              className="block h-[1150px] w-full md:h-[900px]"
              onLoad={handleFormLoad}
            >
              読み込んでいます…
            </iframe>
          </div>
        </section>

        <PrivacyPolicy />
      </main>

      <footer className="bg-[#12161f] px-6 py-8 text-center text-xs tracking-wide text-white/55">
        © 2026 iroha Seed
      </footer>
    </div>
  );
}
