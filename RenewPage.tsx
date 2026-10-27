import type { ReactNode } from 'react';
import RenewHero from './RenewHero.tsx';

/**
 * ページ全体の見た目のルール
 * - 地の色は3つだけ：明るい地／ベージュの地／紺の地。同じ色を続けて並べない
 * - 囲み（カード）は、同じ重さの悩みが並ぶ③だけに使う。ほかは線で区切る
 * - 単調さは囲みではなく、セクションごとの配置の変化（左右分割・写真の左右）で崩す
 * - 緑は、明るい面では濃い緑（白地で読める濃さ）、紺の面ではブランドの黄緑を使う
 */
const GROUND = {
  light: 'bg-[#faf8f4]',
  beige: 'bg-[#e6dfcf]',
  dark: 'bg-[#12161f]',
} as const;

type Tone = 'light' | 'dark';

const CARD = 'rounded-md border border-[#1c1c1e]/12 bg-white';

// 明るい面の緑は、ベージュの地でも小さい文字が読める濃さ（比4.5以上）にする
const GREEN = { light: 'text-[#426b19]', dark: 'text-seed' } as const;

/** 項目の番号は、どのセクションでも同じ明朝体の大きな数字で見せる */
const NUMBER = 'font-serif text-3xl font-black leading-none md:text-4xl';

/**
 * セクションの外枠。
 * texture：紙の質感を背景に敷く（明るい地向け）
 *   ※背景の縦線は「見づらい」との本人判断で外した。線の模様は入れない
 * watermark：セクションの一文字を、右下に大きく薄く透かして置く
 * glow：紺の地に、ごく弱い緑と青の光のにじみを重ねて奥行きを出す（紺の地向け）
 * blendFrom：上の境目を、ひとつ前のセクションの色からゆっくり移り変わらせる（近い色どうし向け）
 * fadeBottom：下の境目で紙の質感をゆっくり消し、無地の地色で次のセクションへ渡す（blendFrom と対で使う）
 * overlapNext：中身を次のセクションへはみ出させる（写真を境目にまたがせるとき）
 * backdrop：写真を背景に暗く敷く（紺の地向け。文字が読める濃さの暗幕を重ねる）
 */
const GROUND_FROM = {
  light: 'from-[#faf8f4]',
  beige: 'from-[#e6dfcf]',
  dark: 'from-[#12161f]',
} as const;

const GROUND_TO = {
  light: 'to-[#faf8f4]',
  beige: 'to-[#e6dfcf]',
  dark: 'to-[#12161f]',
} as const;

function Section({
  ground,
  texture = false,
  watermark,
  glow = false,
  blendFrom,
  fadeBottom = false,
  overlapNext = false,
  backdrop,
  children,
}: {
  ground: keyof typeof GROUND;
  texture?: boolean;
  watermark?: string;
  glow?: boolean;
  blendFrom?: keyof typeof GROUND;
  fadeBottom?: boolean;
  overlapNext?: boolean;
  backdrop?: { src: string; position: string };
  children: ReactNode;
}) {
  return (
    <section
      // 透かし文字のはみ出しは切る（hidden だと見出しの左固定 sticky が効かなくなるため clip）。
      // 次へはみ出させるときは切らずに、次のセクションより手前に重ねる
      className={`relative ${overlapNext ? 'z-10' : 'overflow-clip'} ${GROUND[ground]} ${texture ? 'paper-texture' : ''} ${glow ? 'night-glow' : ''} px-6 py-24 md:px-12 md:py-32`}
    >
      {backdrop && (
        <>
          <img
            src={backdrop.src}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${backdrop.position}`}
            loading="lazy"
          />
          {/* 暗幕：文字側（スマホは全体、PCは左）を濃くし、写真は右側にうっすら見せる */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#12161f]/[0.88] md:bg-transparent md:bg-gradient-to-r md:from-[#12161f] md:from-35% md:via-[#12161f]/[0.88] md:to-[#12161f]/[0.55]"
          />
        </>
      )}
      {/* 紙の質感は覆うが、透かし文字は消さないよう透かしより下の層に置く */}
      {fadeBottom && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent ${GROUND_TO[ground]} md:h-64`}
        />
      )}
      {watermark && (
        <span
          aria-hidden="true"
          // 下の境目をなめらかにするセクションでは、透かしが境目でまっすぐ切れて線に見えないよう上げる
          className={`pointer-events-none absolute ${fadeBottom ? 'bottom-24 md:bottom-32' : '-bottom-[0.18em]'} right-[-0.05em] select-none font-serif text-[clamp(14rem,48vw,34rem)] font-black leading-none text-[#1c1c1e]/[0.04]`}
        >
          {watermark}
        </span>
      )}
      {/* 紙の質感より手前に重ね、質感も境目からゆっくり現れるようにする */}
      {blendFrom && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${GROUND_FROM[blendFrom]} to-transparent md:h-64`}
        />
      )}
      <div className="relative mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

/** PCでは見出しを左に固定し、右側の内容だけを流す。スマホでは縦に積む */
function Split({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <div className="md:grid md:grid-cols-[21rem_1fr] md:gap-14">
      <div className="md:sticky md:top-24 md:self-start">{heading}</div>
      <div className="mt-10 md:mt-2">{children}</div>
    </div>
  );
}

/** 見出しの上に小さなラベルを付け、どのセクションも同じ形で始める */
function SectionHeading({
  label,
  tone,
  lead,
  children,
}: {
  label: string;
  tone: Tone;
  lead?: ReactNode;
  children: ReactNode;
}) {
  const dark = tone === 'dark';
  return (
    <header>
      <p
        className={`flex items-center gap-3 text-xs font-bold tracking-[0.2em] md:text-sm ${GREEN[tone]}`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {label}
      </p>
      <h2
        className={`mt-4 font-serif text-[clamp(1.9rem,6.5vw,2.5rem)] font-black leading-tight tracking-tight ${dark ? 'text-white' : 'text-[#1c1c1e]'}`}
      >
        {children}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${dark ? 'text-white/65' : 'text-[#1c1c1e]/70'}`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

/**
 * ② あいさつ
 * 課題の話から始めると企業サイトに見えるため、まず「人」を置く。
 * 売り込まないと先に宣言して、読み手の警戒を解く。
 */
function GreetingSection() {
  return (
    // 写真を③との境目にまたがせて、箱が積み重なっただけに見えないようにする
    <Section ground="light" texture overlapNext>
      {/* 左に語り、右に写真。ファーストビューとは別のカットを置き、同じ写真は繰り返さない */}
      <div className="grid gap-10 md:grid-cols-[1fr_19rem] md:items-start md:gap-16">
        <div>
          <SectionHeading label="はじめに" tone="light">
            はじめまして、
            <br className="md:hidden" />
            山本剛史です。
          </SectionHeading>

          <div className="mt-8 space-y-6 text-[15px] leading-[2.1] text-[#1c1c1e]/80 md:text-base md:leading-[2.2]">
            <p>
              このサイトを見てくださって、ありがとうございます。iroha Seed の山本剛史と申します。売れない原因を見つけて、売れる形に組み直す仕事をしています。
            </p>
            <p>
              ここには、私がどんな道を歩いてきて、何を考えていて、どんな仕事をしているのかを書きました。会社の案内というより、人を知ってもらうためのページだと思ってください。
            </p>
            <p>
              最後まで読んでみて「ちょっと話してみたいかも」と思っていただけたなら、たぶん合うと思います。そのときは声をかけてください。合わないと思ったら、それはそれでいいんです。
            </p>
          </div>
        </div>

        {/* 下側にマイナスの余白を付け、セクションの下の余白を越えて③へ垂らす（スマホ約3rem・PC約5rem食い込む） */}
        <figure className="-mb-36 md:-mb-52 md:self-end">
          <img
            src="/profile.jpg"
            alt="山本 剛史"
            width="2048"
            height="1536"
            className="aspect-[4/5] w-full rounded-sm object-cover object-[62%_32%] shadow-[0_24px_48px_-16px_rgba(28,28,30,0.35)]"
            loading="lazy"
          />
        </figure>
      </div>
    </Section>
  );
}

/**
 * ⑦ プロフィール：人となりを項目で見せる。事実が確認できたものだけ並べる。
 * 初めて見た人が上から読むだけで分かるよう、「誰か → 何をしている人か → 人となり」の順に並べる
 */
const PROFILE: { label: string; value: string | string[] }[] = [
  { label: '名前', value: '山本 剛史（やまもと つよし）' },
  { label: '会社', value: '株式会社廣創　代表取締役社長' },
  { label: 'マーケティング事業部', value: 'iroha Seed（イロハシード）' },
  {
    // 仕事が複数あるため、文章ではなく箇条書きで並べる。主の仕事 Top SEED を先頭に、内容の近い順
    label: 'いまの仕事',
    value: [
      'マーケティング顧問（Top SEED）',
      'マーケティングコンサルティング（BtoB）',
      'クリエイティブ制作（ホームページ・LP・名刺・チラシなど）',
      'AI活用サポート',
      'Kindle出版プロデュース',
    ],
  },
  { label: 'これまで', value: '建築・飲食・IT・製薬' },
  { label: '出身', value: '山口県' },
  { label: '対応エリア', value: '全国（オンライン・訪問どちらも）' },
];

function ProfileSection() {
  return (
    // 上の境目は⑥経歴の明るい地から色をにじませてつなぐ
    <Section ground="beige" blendFrom="light">
      <Split
        heading={
          <>
            <SectionHeading label="プロフィール" tone="light">
              山本 剛史について
            </SectionHeading>
            {/*
              やわらかい表情の写真。元の白い背景を透明に抜いてあるので、ベージュの地にそのままなじむ。
              切り抜きが宙に浮いて見えないよう、足もとに細い線を引き、その上に立たせる
            */}
            <div className="mt-8 max-w-[15rem] border-b border-[#1c1c1e]/25 md:mt-10 md:max-w-[17rem]">
              <img
                src="/profile-smile.png"
                alt="笑顔の山本剛史"
                width={629}
                height={630}
                className="block w-full"
                loading="lazy"
              />
            </div>
          </>
        }
      >
        <dl className="border-t border-[#1c1c1e]/20">
          {PROFILE.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-[#1c1c1e]/20 py-5 md:flex-row md:gap-8 md:py-6"
            >
              <dt className="font-serif text-sm font-black text-[#1c1c1e]/65 md:w-44 md:shrink-0 md:text-base">
                {label}
              </dt>
              <dd className="text-[15px] leading-relaxed text-[#1c1c1e] md:text-base">
                {Array.isArray(value) ? (
                  <ul className="space-y-1.5">
                    {value.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className={`select-none ${GREEN.light}`}>
                          ・
                        </span>
                        {/* かっこ内は途中で折り返さず、ひとまとまりで次の行へ送る */}
                        <span>
                          {item.split(/(?=（)/).map((part) =>
                            part.startsWith('（') ? (
                              <span key={part} className="whitespace-nowrap">
                                {part}
                              </span>
                            ) : (
                              part
                            ),
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Split>
    </Section>
  );
}

/** ② こんな悩みはありませんか：読み手の状況を言語化して、自分ごとにしてもらう */
const TROUBLES = [
  '発信も広告も頑張っているのに、なぜ売れないのかがわからない',
  'どこを直せばいいのか、見当がつかない',
  '自分の商品に、自信を持って値段をつけられない',
  'やったことが点のままで、つながっていない',
  'SNSも広告も試したけれど、何が正解かわからない',
];

function TroubleSection() {
  return (
    <Section ground="beige">
      <SectionHeading
        label="よくあるご相談"
        tone="light"
        lead="相談に来られる方は、だいたいこんな状態です。"
      >
        頑張っているのに、
        <br className="md:hidden" />
        売れない。
      </SectionHeading>

      {/* 同じ重さの悩みが並ぶので、ここはカードにする。5つ目はPCで横幅いっぱいにする */}
      <ul className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4">
        {TROUBLES.map((text, i) => (
          <li
            key={text}
            className={`${CARD} flex items-start gap-5 px-6 py-6 md:gap-6 md:px-8 md:py-8 md:last:col-span-2`}
          >
            <span className={`${NUMBER} ${GREEN.light} w-10 shrink-0 md:w-12`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="pt-1 text-base font-medium leading-relaxed text-[#1c1c1e] md:text-lg">
              {text}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-lg font-bold leading-relaxed text-[#1c1c1e] md:mt-14 md:text-2xl">
        どれかひとつでも当てはまったなら、原因は努力の量じゃないと思います。
      </p>
    </Section>
  );
}

/** ③ 考え方：一方的な説明にせず、よく聞かれる質問に答える形で語る */
const QUESTIONS = [
  {
    q: '広告やLPより先に、「売れない理由」を探すのはなぜですか？',
    a: [
      '広告が悪いのか、LPが悪いのか、それとも商品の見せ方なのか。これ、見てみないと分からないんですよね。バナー1枚でクリックが止まっていることもあれば、クリックは取れているのにLPで落ちていることもあります。',
      'どこか一箇所だけを疑って作り直しても、だいたい外します。だから私は、作る前に全体を順番に見ます。',
      'それに、ズレは思っているより手前にあることも多いです。野球場の売店で相手チームのグッズを並べても売れない。商品が悪いわけじゃなくて、置いている場所が違うだけで。同じことが、誰に向けて出すかを決める段階で起きていたりします。',
    ],
  },
  {
    q: '具体的には、どこを見ているんですか？',
    a: [
      'まず、5つ見ます。誰に売るのかが決まっているか。何を理由に選ばれるのかを、言葉にできるか。広告とLPで言っていることが揃っているか。商品の良さが、相手の「欲しい」に変換されているか。そして、最後まで辿り着く道が作られているか。',
      'この5つを順に見ていくと、たいてい2つか3つで引っかかります。引っかかったところが、そのまま売れない理由です。',
    ],
  },
  {
    q: 'なぜ、値下げに頼らなくて済むようになるんですか？',
    a: [
      '安くすれば売れる。そう思っている方、多いと思います。でも、そもそも値段を下げて買った人は、次も値段で選びます。そして一度下げた値段は、もう戻せません。',
      '選ばれる理由さえ作れれば、価格は後からついてきます。本当に、本当にここが分かれ目なんです。',
    ],
  },
];

/** 次の⑥ Top SEED が紺の地のため、同じ色が続かないよう明るい地にする */
function ThinkingSection() {
  return (
    // 見出し「考え方」から一文字を透かしに使う。上の境目は③のベージュから色をにじませてつなぐ
    <Section ground="light" texture watermark="考" blendFrom="beige">
      <Split
        heading={
          <SectionHeading
            label="考え方"
            tone="light"
            lead="よく聞かれることを、3つだけ書いておきます。"
          >
            なぜ、
            <br className="hidden md:block" />
            「売れない理由」
            <br />
            から入るのか
          </SectionHeading>
        }
      >
        <div className="border-t border-[#1c1c1e]/15">
          {QUESTIONS.map(({ q, a }, i) => (
            <article key={q} className="border-b border-[#1c1c1e]/15 py-10 md:py-12">
              <h3 className="flex gap-4 text-lg font-bold leading-snug text-[#1c1c1e] md:text-2xl">
                <span className={`shrink-0 font-serif ${GREEN.light}`}>Q{i + 1}.</span>
                <span>{q}</span>
              </h3>
              <div className="mt-6 space-y-5">
                {a.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-[2] text-[#1c1c1e]/75 md:text-base md:leading-[2.1]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Split>

      {/*
        見せ場：一番言いたい一文を、本文の列から外に出して画面幅いっぱいの大きな文字で置く。
        ファーストビュー以外にも「手を止める場所」をつくるため（文言は変えていない）
      */}
      <blockquote className="mt-24 md:mt-40">
        <span aria-hidden="true" className="block h-px w-16 bg-[#426b19]" />
        {/* PCでは1文がちょうど1行に収まる大きさを上限にする（中身の幅1024pxに14文字） */}
        <p className="mt-10 font-serif text-[clamp(2rem,7.2vw,4.25rem)] font-black leading-[1.35] tracking-tight text-[#1c1c1e] md:mt-14">
          集客ができないから安くする。
          <br />
          それは、違うと思っています。
        </p>
      </blockquote>
    </Section>
  );
}

/**
 * 写真の帯：④考え方と⑤サービスの間に、画面いっぱいの写真を1枚挟む。
 * 箱が積み重なっただけに見えないよう、文字の続くページに「写真で区切る」場所をつくる。
 * 白黒の落ち着いた写真が、考え方の締めからサービスへの切り替えになる
 */
function PhotoBand() {
  return (
    <figure className="relative h-[clamp(17rem,52vw,36rem)] overflow-hidden bg-[#12161f]">
      <img
        src="/band-mono.jpg"
        alt="屋外のテーブルで手を組み、遠くを見つめる山本剛史"
        width={2000}
        height={1304}
        // PCは帯が横長になり上下が切れるため、頭が収まるよう上寄りに表示する
        className="h-full w-full object-cover object-[52%_22%]"
        loading="lazy"
      />
    </figure>
  );
}

/**
 * マーケティング顧問サービス「Top SEED」
 * 本人のサービス紹介の場所。何のサービスかを最初に言い切り、概要→4ステップ→やらないこと→由来→相談の順に置く。
 * 以前は手前に「やっていること」（診断・設計・伴走）のセクションがあったが、S・E・E・D と内容が重なり
 * 「サービスが2つある」ように読めたため削除し、「やらないこと」だけをここに移した。
 * 料金は本人判断により非掲載。内容の説明のみ置く。
 * SEED の4文字は、支援の4ステップの頭文字（サービス名を決めたときの定義）。
 */
const SEED_STEPS = [
  {
    letter: 'S',
    title: 'Strength ／ 強み',
    body: '売れない原因を探り、本当の強みを見つけます。',
  },
  {
    letter: 'E',
    title: 'Edge ／ 選ばれる理由',
    body: '見つけた強みを、選ばれる理由に磨きます。',
  },
  {
    letter: 'E',
    title: 'Entry ／ 入口',
    body: 'お客様が買うまでの道すじを整えます。',
  },
  {
    letter: 'D',
    title: 'Drive ／ 実行',
    body: '売れるまで、実行を一緒に回します。',
  },
];

/** 何をしないかを書くと、何をする人かがはっきりする */
const NOT_DOING = [
  '原因を見ないまま、広告だけ回すこと',
  '値下げで数字をつくること',
  '作って、納品して、終わりにすること',
];

/** サービス概要：今の本文にある内容を短く言い直したもの。新しい事実は足さない */
const SEED_OVERVIEW = [
  { label: '形式', value: '顧問として、継続して関わります。単発で作って終わり、ではありません。' },
  { label: '中身', value: 'S・E・E・D の4ステップ' },
];

/** サービス紹介の中の小見出し。左に短い線を置き、ブロックの区切りを示す */
function SubHeading({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-serif text-base font-black text-white md:text-lg">
      <span aria-hidden="true" className="h-px w-6 bg-seed" />
      {children}
    </p>
  );
}

function TopSeedSection() {
  return (
    // 光のにじみは、サービスの紺の地だけに入れる（本人判断。ほかの紺の地はベタのまま）
    <Section ground="dark" glow>
      {/* サービス名に見えるよう、ロゴを見出しにして、その下に小さく種類を添える */}
      <p
        className={`flex items-center gap-3 text-xs font-bold tracking-[0.2em] md:text-sm ${GREEN.dark}`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        サービス
      </p>
      <h2 className="mt-6 md:mt-8">
        <img
          src="/topseed-logo.png"
          alt="Top SEED"
          width="1000"
          height="257"
          className="h-auto w-[17rem] md:w-[28rem]"
          loading="lazy"
        />
      </h2>
      <p className="mt-4 text-base font-bold tracking-[0.15em] text-white/75 md:mt-5 md:text-lg">
        マーケティング顧問サービス
      </p>
      {/* 何のサービスかを一文で分かるようにする。役職を名乗らず、関わり方のたとえとして「社外CMO」を使う */}
      <p className="mt-3 max-w-2xl text-[15px] leading-[1.9] text-white/70 md:text-base">
        社外CMO（マーケティングの責任者）のような立場で、あなたの会社のマーケティングに継続して関わります。
      </p>
      <p className="mt-8 font-serif text-xl font-black leading-snug tracking-tight text-white/90 md:mt-10 md:text-3xl">
        価格ではなく、
        <br className="md:hidden" />
        一番に選ばれる会社へ
      </p>

      <div className="mt-14 md:mt-16">
        <SubHeading>どんなサービスか</SubHeading>
        <dl className="mt-6 border-t border-white/15">
          {SEED_OVERVIEW.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-white/15 py-5 md:flex-row md:gap-8"
            >
              <dt className={`font-serif text-sm font-black md:w-32 md:shrink-0 md:text-base ${GREEN.dark}`}>
                {label}
              </dt>
              <dd className="text-[15px] leading-relaxed text-white/85 md:text-base">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14 md:mt-16">
        <SubHeading>S・E・E・D の4ステップ</SubHeading>
      </div>

      {/* S・E・E・D はサービス名の由来であり、支援の4ステップそのもの。横に4つ並べて線で区切る */}
      <ol className="mt-6 grid border-t border-white/15 sm:grid-cols-2 md:grid-cols-4">
        {SEED_STEPS.map(({ letter, title, body }) => (
          <li
            key={letter + title}
            className="border-b border-white/15 py-8 sm:px-5 sm:first:pl-0 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
          >
            <span className={`block font-serif text-5xl font-black leading-none ${GREEN.dark}`}>
              {letter}
            </span>
            <p className="mt-5 font-serif text-lg font-black tracking-tight text-white">
              {title}
            </p>
            <p className="mt-2 text-[15px] leading-[1.9] text-white/75">{body}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-3xl text-[15px] leading-[2.1] text-white/80 md:text-base md:leading-[2.2]">
        この4つを、月ごとに一緒に回していきます。やってみないと分からないことのほうが多いので、腰を据えて付き合う形にしています。
      </p>

      <div className="mt-14 md:mt-16">
        <SubHeading>逆に、やらないこと</SubHeading>
        <ul className="mt-6 space-y-3">
          {NOT_DOING.map((text) => (
            <li
              key={text}
              className="flex gap-3 text-[15px] leading-relaxed text-white/85 md:text-base"
            >
              <span aria-hidden="true" className={`select-none ${GREEN.dark}`}>
                ×
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 名前の由来は補足なので、小さく最後に置く */}
      <div className="mt-14 max-w-3xl md:mt-16">
        <SubHeading>名前の由来</SubHeading>
        <p className="mt-4 text-sm leading-[2.1] text-white/65 md:text-[15px]">
          トップシードというのは、スポーツでいう「第1シード」のことです。優勝候補として、一番に選ばれる存在。そこを目指すためのサービスとして、この名前にしました。
        </p>
      </div>

      {/* サービス紹介として完結させるため、相談フォームへの入口を置く。ページ最後の黄緑のボタンと区別するため白にする */}
      <div className="mt-14 border-t border-white/15 pt-10 md:mt-16">
        <p className="max-w-3xl text-[15px] leading-[2] text-white/75 md:text-base">
          もう少し詳しく聞いてみたいと思っていただけたら、中身を具体的にお伝えします。まずは話すところからで大丈夫です。
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-[#12161f] transition hover:bg-white/85"
        >
          Top SEED について聞いてみる
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <KindleService />
      <OtherServices />
    </Section>
  );
}

/**
 * もうひとつのサービス：Kindle出版プロデュース
 * サービス名・ロゴはないため、文字の見出しで Top SEED より一段控えめに見せる。
 * 実績はまだないため、本人の著書（確認済み）を根拠に置き、他の方の本は「進行中」とだけ書く。
 * 表紙づくり・出版手続きは「仕上げ」に含めない（本人確認済み）。
 */
const KINDLE_STEPS = [
  { label: 'お話を聞く', value: 'これまでの経験や考えを、インタビューで聞かせてもらいます' },
  { label: '本の設計', value: '誰に向けて何を伝える本にするか、テーマと章立てを決めます' },
  { label: '原稿づくり', value: 'いただいた言葉をもとに、原稿に仕上げます' },
  { label: '仕上げ', value: '読み直して整え、ご本人の確認を経て完成させます' },
];

const KINDLE_FOR = [
  '出版を通して、自分の専門性や考えを伝え、ブランディングにつなげたい方',
  '本を入口にして、相談や問い合わせにつながる流れをつくりたい方',
];

function KindleService() {
  return (
    <div className="mt-24 border-t border-white/15 pt-20 md:mt-28 md:pt-24">
      {/* ロゴがない分、見出しの大きさで Top SEED のロゴと並ぶ「サービス名」として見せる */}
      <h3 className="font-serif text-[clamp(2rem,8.5vw,3.5rem)] font-black leading-tight tracking-tight text-white">
        Kindle出版
        <br className="md:hidden" />
        プロデュース
      </h3>
      <p className="mt-6 font-serif text-lg font-black leading-snug text-white/90 md:mt-8 md:text-2xl">
        あなたの経験や考えを、1冊の本にまとめるお手伝いをします。
      </p>
      <p className="mt-5 max-w-3xl text-[15px] leading-[2.1] text-white/80 md:text-base md:leading-[2.2]">
        「話すのは得意だけど、書くのは苦手」という方でも大丈夫です。お話を聞かせてもらい、その言葉を素材にして、読み手に届く原稿に仕上げていきます。
      </p>

      <div className="mt-12">
        <SubHeading>進め方</SubHeading>
        <dl className="mt-6 border-t border-white/15">
          {KINDLE_STEPS.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-white/15 py-5 md:flex-row md:gap-8"
            >
              <dt className={`font-serif text-sm font-black md:w-32 md:shrink-0 md:text-base ${GREEN.dark}`}>
                {label}
              </dt>
              <dd className="text-[15px] leading-relaxed text-white/85 md:text-base">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12">
        <SubHeading>こんな方に</SubHeading>
        {/* 本を残したい人ではなく、出版をブランディングや集客の入口に使いたい人に向けて書く */}
        <ul className="mt-6 space-y-3">
          {KINDLE_FOR.map((text) => (
            <li
              key={text}
              className="flex gap-3 text-[15px] leading-relaxed text-white/85 md:text-base"
            >
              <span aria-hidden="true" className={`select-none ${GREEN.dark}`}>
                ・
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[15px] leading-[2] text-white/75 md:text-base">
          経営者・専門家・講師・士業の方など、「この人に頼みたい」と思われることが仕事につながる方に向いています。
        </p>
      </div>

      <p className="mt-12 max-w-3xl text-[15px] leading-[2.1] text-white/75 md:text-base md:leading-[2.2]">
        私自身も2026年に著書を出版し、Amazon Kindleランキング6部門で1位になりました。いまは、ほかの方の本づくりもプロデュースしています。
      </p>

      {/* 申し込みは問い合わせフォームに一本化。Top SEED のボタンより控えめな枠線のボタンにする */}
      <a
        href="/contact"
        className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition hover:border-white hover:bg-white/10"
      >
        出版について聞いてみる
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

/**
 * そのほかのご依頼：Top SEED・Kindle 以外に受けている仕事を、控えめに並べる。
 * 見出しは Kindle より一段小さく、囲みは使わず線で区切る。
 * マーケティングコンサルティング（BtoB）は顧問と比べづらいため、本人判断でここには載せない（プロフィールには残す）。
 */
const OTHER_SERVICES = [
  {
    title: 'クリエイティブ制作',
    body: 'ホームページ・LP・名刺・チラシなど。単発の制作だけでも、お受けします。見た目だけでなく、「誰に・何を・どの順番で伝えるか」から考えて作ります。',
  },
  {
    title: 'AI活用サポート',
    body: 'マーケティングへの活かし方から、日々の業務の効率化、社内向けのAI研修まで。AIを仕事に取り入れるお手伝いをします。',
  },
];

function OtherServices() {
  return (
    <div className="mt-20 border-t border-white/15 pt-14 md:mt-24 md:pt-16">
      <h3 className="font-serif text-xl font-black tracking-tight text-white md:text-2xl">
        そのほかのご依頼
      </h3>
      <dl className="mt-8 border-t border-white/15">
        {OTHER_SERVICES.map(({ title, body }) => (
          <div
            key={title}
            className="flex flex-col gap-2 border-b border-white/15 py-6 md:flex-row md:gap-8"
          >
            <dt className={`font-serif text-base font-black md:w-48 md:shrink-0 md:text-lg ${GREEN.dark}`}>
              {title}
            </dt>
            <dd className="max-w-2xl text-[15px] leading-[2] text-white/80 md:text-base">{body}</dd>
          </div>
        ))}
      </dl>
      <a
        href="/contact"
        className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition hover:border-white hover:bg-white/10"
      >
        ご依頼について聞いてみる
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

/**
 * ⑤ 歩いてきた道
 * 年表の羅列にせず、章立てにして短い語りをつける。
 * 事実（年次・数値・肩書き）は確認済みのものだけを使い、勝手に足さない。
 * 時期は「年号（年齢）」にそろえる。年齢は「2012年に30歳」から逆算し、本人確認済み。
 * 最初の2章は本人の記憶ベースのため「ごろ」を付ける（専門学校は2年制として計算）。
 */
const CHAPTERS = [
  {
    period: '1997〜2002年ごろ（15〜20歳）',
    title: '野球ばかりしていました',
    body: '高校では野球部で、2年続けてセンバツに出ました。専門学校では大阪代表として全国大会へ。この頃は、野球のことしか考えていませんでした。',
    image: {
      src: '/history-baseball.jpg',
      alt: '野球のユニフォーム姿で守備につく、学生時代の山本剛史',
      width: 1000,
      height: 750,
      position: 'object-[50%_30%]',
    },
  },
  {
    period: '2002〜2004年ごろ（20〜22歳）',
    title: '整骨院から、父の現場へ',
    body: '整骨院に就職して、マッサージ師として働きました。その後、父が経営していた建設会社に入り、職人として現場に立ちました。どちらも、体を動かす仕事でした。',
  },
  {
    period: '2012年（30歳）',
    title: '職人から、経営者になる',
    body: '職人として働いていた父の会社を継ぎ、法人化して代表になりました。建築リフォームと太陽光発電。現場に立っていた人間が、経営する側に回った年です。',
  },
  {
    period: '2017年（35歳）',
    title: 'メロンパンが売れた日',
    body: 'フランチャイズのメロンパン店で、エリアマネージャーを任されました。最終的に2店舗を出しています。\n1店舗目の初日は、来客が500人、販売数は3,138個。全国3位でした。オープンから3か月の売上は2,500万円。\nここで分かったのは、売れるかどうかは商品の良し悪しだけでは決まらない、ということでした。',
    // 後ろに写っている店員の方の顔はぼかし済み
    image: {
      src: '/history-melonpan.jpg',
      alt: 'メロンパン店の店頭で、ショーケースの前に立つ山本剛史',
      width: 675,
      height: 840,
      position: 'object-[50%_42%]',
    },
  },
  {
    period: '2019〜2023年（37〜41歳）',
    title: '壊れた家を直し続けた4年',
    body: '千葉を大きな台風が襲ったニュースを見て、自分にできることがあるんじゃないかと思い、現地へ向かいました。\n知り合いは一人もいませんでした。館山で地元の方とのご縁をいただき、すぐに工事の依頼を受けて復旧にあたりました。\n営業に行ったわけではありません。目の前の一軒を直していたら、次の一軒を頼まれる。その繰り返しでした。気づけば4年、修復に携わった家屋は100棟を超えていました。',
  },
  {
    period: '2023年（41歳）',
    title: '福岡のIT企業へ',
    body: '福岡のIT企業で、営業部のGMに就任しました。扱っていたのは、コールセンター向けの電話自動応答の仕組みです。売って終わりではなく、お客様ごとに中身を組み立てて、導入するところまで関わっていました。',
  },
  {
    period: '2024年（42歳）',
    title: 'そして、iroha Seed',
    body: '自分の会社のマーケティング事業部として、iroha Seed を立ち上げました。\nきっかけは、周りで独立した仲間が志半ばで諦めたり、倒産に追い込まれる姿を見てきたことです。自分が関わっていれば、救えたかもしれない。そう思ったのが始まりでした。',
  },
  {
    // 以前は⑨の実績に置いていたが、経歴の流れの中で見せるほうが自然なため移した（本人確認済み）
    period: '2025年（43歳）',
    title: '製薬会社のCMOへ',
    body: '製薬会社の最高マーケティング責任者（CMO）に就任しました。',
  },
];

/**
 * 経歴の中の実績の数字は、その話をしている文章の中でだけ大きくする。
 * 数字を集めて並べる見せ方は使わない（文脈のない数字はAIっぽく見えるため）。
 */
const FIGURES = ['500人', '3,138個', '全国3位', '2,500万円', '100棟'];
// 数字の直後の句読点も一緒に切り出し、「。」だけが次の行に落ちないようにする
const FIGURE_PATTERN = new RegExp(`((?:${FIGURES.join('|')})[。、]?)`);

function EmphasizeFigures({ text }: { text: string }) {
  return (
    <>
      {text.split(FIGURE_PATTERN).map((part, i) => {
        const figure = FIGURES.find((f) => part.startsWith(f));
        if (!figure) return part;
        return (
          <span key={i} className="whitespace-nowrap">
            <strong className="mx-0.5 font-serif text-[1.6em] font-black leading-none text-[#1c1c1e]">
              {figure}
            </strong>
            {part.slice(figure.length)}
          </span>
        );
      })}
    </>
  );
}

function PathSection() {
  return (
    // 見出し「歩いてきた道」から一文字を透かしに使う
    // 下の境目で紙の質感を消し、⑦プロフィールのベージュへ色をにじませてつなぐ
    <Section ground="light" texture watermark="道" fadeBottom>
      <Split
        heading={
          <SectionHeading
            label="経歴"
            tone="light"
            lead="なぜこういう考え方になったのか。たぶん、歩いてきた道と関係しています。まっすぐな道ではありませんでした。"
          >
            歩いてきた道
          </SectionHeading>
        }
      >
        <ol>
          {CHAPTERS.map(({ period, title, body, image }) => (
            <li
              key={title}
              className="relative border-l border-[#1c1c1e]/15 pb-12 pl-8 last:pb-0 md:pl-12"
            >
              {/* 章の始まりを示す点 */}
              <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-[#426b19]" />
              <p className={`text-sm font-bold tracking-wide ${GREEN.light}`}>
                {period}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-black leading-snug tracking-tight text-[#1c1c1e] md:text-3xl">
                {title}
              </h3>
              {body.split('\n').map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-[15px] leading-[2] text-[#1c1c1e]/75 md:text-base md:leading-[2.1]"
                >
                  <EmphasizeFigures text={paragraph} />
                </p>
              ))}
              {/*
                本人の当時の写真を、本文の下に添える。主役は文章のまま。
                誌面のように扱いをそろえる：比率は全部 3:2、色味は彩度を少し落としてコントラストを上げ、
                撮った機材の違う昔の写真どうしでも「同じアルバムの写真」に見えるようにする
              */}
              {image && (
                <figure className="mt-7 max-w-sm md:max-w-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className={`aspect-[3/2] w-full rounded-sm object-cover ${image.position} contrast-[1.06] saturate-[0.82]`}
                    loading="lazy"
                  />
                </figure>
              )}
            </li>
          ))}
        </ol>
      </Split>
    </Section>
  );
}

/**
 * ⑨ メディア出演・出版
 * 「実績」「裏付け」という言い方はやめ、出演と出版をまとめる場所にする（本人の判断）。
 * 製薬会社のCMOは⑦経歴へ移し、「経営者として14年」は経歴・プロフィールと重なるため外した。
 * 事実のみ。お客様の声は、実在の声が集まってから別の場所に追加する。
 */
const MEDIA = [
  {
    label: 'ラジオ出演',
    body: '2025年、ビジネス系FMラジオ『プレジデントステーション福岡』に出演しました。',
    link: {
      href: 'https://www.youtube.com/live/DDv-fCFCdmw?t=290s',
      text: 'アーカイブを見る',
    },
    image: {
      src: '/radio.jpg',
      alt: 'ラジオ番組『プレジデントステーション福岡』に出演したときの様子',
      width: 996,
      height: 1100,
      className: 'aspect-[4/3] w-full rounded-sm object-cover object-[50%_38%]',
    },
  },
  {
    label: '著書を出版',
    body: '2026年、『なぜ、あの会社は高くても選ばれるのか？ 比べられない会社には、理由がある。』を出版。Amazon Kindleランキング6部門で1位になりました。',
    link: {
      href: 'https://www.amazon.co.jp/dp/B0H6KGYCX1',
      text: 'Amazonで見る',
    },
    image: {
      src: '/book-cover.jpg',
      alt: '著書『なぜ、あの会社は高くても選ばれるのか？』の表紙',
      width: 750,
      height: 1200,
      className:
        'mx-auto w-[11rem] rounded-sm shadow-[0_18px_40px_rgba(0,0,0,0.45)] md:w-[13rem]',
    },
  },
];

function ProofLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center gap-2 rounded-full border border-seed/60 px-5 py-2 text-sm font-bold text-seed transition hover:bg-seed hover:text-[#12161f] md:text-[15px]"
    >
      {text}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function ProofSection() {
  return (
    <Section ground="dark">
      <SectionHeading label="メディア・出版" tone="dark">
        メディア出演・出版
      </SectionHeading>

      {/* 文章と写真を左右に置き、行ごとに左右を入れ替える */}
      <ul className="mt-12 border-t border-white/15 md:mt-14">
        {MEDIA.map(({ label, body, link, image }, i) => (
          <li
            key={label}
            className="border-b border-white/15 py-10 md:flex md:items-center md:gap-14 md:py-14"
          >
            <div className={`md:flex-1 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <p className="font-serif text-xl font-black tracking-tight text-white md:text-2xl">
                {label}
              </p>
              <p className="mt-3 text-[15px] leading-[2] text-white/75 md:text-base">{body}</p>
              {link && <ProofLink href={link.href} text={link.text} />}
            </div>
            {image && (
              <figure className="mt-8 md:mt-0 md:w-[22rem] md:shrink-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className={image.className}
                  loading="lazy"
                />
              </figure>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** ⑦ よくある質問：今のサイトの7問を流用し、文体を会話調にして柔らかくする */
const FAQS = [
  {
    q: 'どんな方が相談に来られますか？',
    a: '中小企業の経営者、個人事業主、小規模事業者の方が中心です。「発信も集客も頑張っているのに売上につながらない」「どこに問題があるのか分からない」という相談が多いです。',
  },
  {
    q: '相談から始まるまでの流れは？',
    a: 'まず無料相談でお話を聞きます。オンラインで30〜60分ほどです。そのうえで課題と方向性をお伝えして、納得いただけた場合だけ始めます。強引な勧誘はしません。',
  },
  {
    q: '料金はどのくらいですか？',
    a: '状況や課題の深さによって変わります。まず無料相談でお話を聞いてから、合うかたちをご提案します。',
  },
  {
    q: 'SNS運用や広告の代行もお願いできますか？',
    a: 'いちばんの専門は、「なぜ売れていないのか」を見つけて、売れる形に組み直すことです。土台が整っていない状態だと、どんな施策も効きにくいので、まずはそこを一緒に見させてください。そのうえで、SNS運用や広告の代行もお受けできます。',
  },
  {
    q: 'どれくらいで成果が出ますか？',
    a: '事業の状況によります。ただ、商品設計や導線が整うと、発信やセールスの迷いがなくなります。早い方だと1〜2か月で手応えを感じていただいています。',
  },
  {
    q: 'オンラインでも対応していますか？',
    a: 'はい、全国どこでもオンラインで対応しています。直接お会いしてのご相談も可能です。',
  },
  {
    q: 'まだ相談できる段階か分からないのですが、問い合わせしていいですか？',
    a: 'もちろんです。「今すぐではないけれど気になっている」くらいでかまいません。まず現状を聞いて、必要かどうかを一緒に判断しましょう。',
  },
];

function FaqSection() {
  return (
    <Section ground="light" texture>
      <Split
        heading={
          <SectionHeading label="ご質問" tone="light">
            よくある質問
          </SectionHeading>
        }
      >
        <div className="border-t border-[#1c1c1e]/15">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group border-b border-[#1c1c1e]/15">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-6 text-base font-bold leading-snug text-[#1c1c1e] md:text-lg">
                <span
                  aria-hidden="true"
                  className={`mt-[2px] shrink-0 font-serif ${GREEN.light}`}
                >
                  Q.
                </span>
                <span className="flex-1">{q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl leading-none text-[#1c1c1e]/55 transition group-open:rotate-45"
                >
                  ＋
                </span>
              </summary>
              <p className="pb-7 pl-9 text-[15px] leading-[2] text-[#1c1c1e]/75 md:text-base">
                {a}
              </p>
            </details>
          ))}
        </div>
      </Split>
    </Section>
  );
}

/** ⑧ 連絡先：売り込まずに閉じる。主導線はフォーム、あわせて普段の発信先を置く */
const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1JKihxjj6A/?mibextid=wwXIfr' },
  { label: 'Instagram', href: 'https://www.instagram.com/yamamoto.irohaseed' },
  { label: 'X', href: 'https://x.com/irohashuukyaku' },
];

function ContactSection() {
  return (
    // ファーストビューと同じ人物写真を暗く敷き、「写真で始まり、写真で終わる」形にする
    <Section ground="dark" backdrop={{ src: '/portrait.jpg', position: 'object-[70%_20%]' }}>
      <div className="max-w-3xl">
        <SectionHeading label="ご連絡" tone="dark">
          最後まで読んでいただき、
          <br />
          ありがとうございます。
        </SectionHeading>

        <p className="mt-8 text-[15px] leading-[2] text-white/80 md:text-lg md:leading-[2.1]">
          最後まで読んでくださったなら、きっと何か引っかかるところがあったのだと思います。売り込むことはしません。まずは現状をお聞かせください。
        </p>

        <div className="mt-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-seed px-9 py-4 text-base font-bold text-[#12161f] transition hover:bg-seed-bright md:text-lg"
          >
            無料で相談してみる
          </a>
          <p className="mt-4 text-sm text-white/55">
            オンラインで30〜60分。全国どこでも対応します。
          </p>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8">
          <p className="text-sm text-white/55">普段の発信はこちらです。</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-white/25 px-5 py-2 text-sm font-bold text-white transition hover:border-seed hover:text-seed md:text-[15px]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 text-xs leading-relaxed text-white/55">
          株式会社廣創　代表取締役社長　山本 剛史
          <br />
          iroha Seed（廣創のマーケティング事業部）
          <br />
          福岡県福岡市城南区七隈3-2-29-101
        </p>
      </div>
    </Section>
  );
}

/** 地の色が同じものを続けない順番：明→ベ→明→紺→明→ベ→紺→明→紺 */
export default function RenewPage() {
  return (
    // renew：新サイトだけの文字の仕上げ（index.css）を効かせる目印
    <main className="renew">
      <RenewHero />
      <GreetingSection />
      <TroubleSection />
      <ThinkingSection />
      <PhotoBand />
      <TopSeedSection />
      <PathSection />
      <ProfileSection />
      <ProofSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
