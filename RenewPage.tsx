import RenewHero from './RenewHero.tsx';

/**
 * ② あいさつ
 * 課題の話から始めると企業サイトに見えるため、まず「人」を置く。
 * 売り込まないと先に宣言して、読み手の警戒を解く。
 */
function GreetingSection() {
  return (
    <section className="bg-[#faf8f4] px-6 py-24 md:px-12 md:py-32">
      {/* 写真はファーストビューで見せているので、ここでは重ねない */}
      <div className="mx-auto max-w-3xl">
        <div>
          <h2 className="font-serif text-[clamp(1.7rem,6vw,3rem)] font-black leading-tight tracking-tight text-[#1c1c1e]">
            はじめまして、
            <br className="md:hidden" />
            山本剛史です。
          </h2>

          <div className="mt-8 space-y-6 text-[15px] leading-[2.1] text-[#1c1c1e]/80 md:text-base md:leading-[2.2]">
            <p>
              このサイトを見てくださって、ありがとうございます。iroha Seed の山本剛史と申します。福岡を拠点に、売れない原因を見つけて、売れる形に組み直す仕事をしています。
            </p>
            <p>
              ここには、僕がどんな道を歩いてきて、何を考えていて、どんな仕事をしているのかを書きました。会社の案内というより、人を知ってもらうためのページだと思ってください。
            </p>
            <p>
              最後まで読んでみて「ちょっと話してみたいかも」と思っていただけたなら、たぶん合うと思います。そのときは声をかけてください。合わないと思ったら、それはそれでいいんです。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** ③ プロフィール：人となりを項目で見せる。事実が確認できたものだけ並べる */
const PROFILE = [
  { label: '名前', value: '山本 剛史（やまもと つよし）' },
  { label: '年齢', value: '44歳' },
  { label: '出身', value: '山口県' },
  { label: '対応エリア', value: '全国（オンライン・訪問どちらも）' },
  {
    label: 'いまの仕事',
    value: '売れない原因の診断と、集客から成約までの設計',
  },
  { label: '会社', value: '株式会社廣創　代表取締役社長' },
  { label: 'マーケティング事業部', value: 'iroha Seed（イロハシード）' },
  { label: 'これまで', value: '建築・飲食・IT・製薬' },
];

function ProfileSection() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="font-serif text-sm font-black tracking-[0.2em] text-seed">
          PROFILE
        </p>
        <dl className="mt-8 border-t border-[#1c1c1e]/15">
          {PROFILE.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-[#1c1c1e]/15 py-5 md:flex-row md:gap-8 md:py-6"
            >
              <dt className="font-serif text-sm font-black text-[#1c1c1e]/45 md:w-40 md:shrink-0 md:text-base">
                {label}
              </dt>
              <dd className="text-[15px] leading-relaxed text-[#1c1c1e] md:text-base">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
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
    <section className="bg-[#f4f1ea] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-[clamp(1.9rem,6.5vw,3.5rem)] font-black leading-tight tracking-tight text-[#1c1c1e]">
          頑張っているのに、
          <br className="md:hidden" />
          売れない。
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#1c1c1e]/70 md:text-lg">
          相談に来られる方は、だいたいこんな状態です。
        </p>

        <ul className="mt-12 space-y-0 border-t border-[#1c1c1e]/15">
          {TROUBLES.map((text, i) => (
            <li
              key={text}
              className="flex items-start gap-5 border-b border-[#1c1c1e]/15 py-6 md:gap-8 md:py-7"
            >
              <span className="mt-1 shrink-0 font-serif text-sm font-black text-seed md:text-base">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-base leading-relaxed text-[#1c1c1e] md:text-xl">
                {text}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-lg font-bold leading-relaxed text-[#1c1c1e] md:text-2xl">
          どれかひとつでも当てはまったなら、
          <br className="hidden md:block" />
          原因は努力の量じゃないと思います。
        </p>
      </div>
    </section>
  );
}

/** ③ 考え方：一方的な説明にせず、よく聞かれる質問に答える形で語る */
const QUESTIONS = [
  {
    q: '広告やLPより先に、「売れない理由」を探すのはなぜですか？',
    a: [
      '広告が悪いのか、LPが悪いのか、それとも商品の見せ方なのか。これ、見てみないと分からないんですよね。バナー1枚でクリックが止まっていることもあれば、クリックは取れているのにLPで落ちていることもあります。',
      'どこか一箇所だけを疑って作り直しても、だいたい外します。だから僕は、作る前に全体を順番に見ます。',
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
      '集客ができないから安くする。ここだけは、俺の中で譲れないところです。',
    ],
  },
];

function ThinkingSection() {
  return (
    <section className="bg-[#12161f] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-[clamp(1.9rem,6.5vw,3.5rem)] font-black leading-tight tracking-tight text-white">
          なぜ、「売れない理由」
          <br />
          から入るのか
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
          よく聞かれることを、3つだけ書いておきます。
        </p>

        <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
          {QUESTIONS.map(({ q, a }) => (
            <div key={q}>
              <h3 className="flex gap-4 text-lg font-bold leading-snug text-white md:text-2xl">
                <span className="shrink-0 font-serif text-white/40">Q.</span>
                <span>{q}</span>
              </h3>
              <div className="mt-6 space-y-5 pl-0 md:pl-10">
                {a.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-[2] text-white/80 md:text-lg md:leading-[2.1]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ④ やっていること：今のサイトの4サービス＋6ステップを、診断・設計・伴走の3つに畳む */
const WORK = [
  {
    title: '診断',
    lead: '売れない理由を、特定する。',
    body: '商品、言葉、導線、広告まで、ひと通り見せてもらいます。そのうえで、どこで止まっているのかを特定します。ここを飛ばして作り始めることはしません。',
  },
  {
    title: '設計',
    lead: '選ばれる理由と、売れる流れを組み直す。',
    body: '「なぜあなたから買うのか」を言葉にして、集客から成約までの流れをつなぎ直します。見た目を整える作業ではなく、順番を直す作業です。',
  },
  {
    title: '伴走',
    lead: '動かしながら、一緒に直していく。',
    body: '作って終わりにはしません。出してみて、数字を見て、また直す。これを一緒に繰り返します。正直、ここが一番時間のかかるところです。',
  },
];

const NOT_DOING = [
  '原因を見ないまま、広告だけ回すこと',
  '値下げで数字をつくること',
  '作って、納品して、終わりにすること',
];

function WorkSection() {
  return (
    <section className="bg-[#faf8f4] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-[clamp(1.9rem,6.5vw,3.5rem)] font-black leading-tight tracking-tight text-[#1c1c1e]">
          やっていること
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#1c1c1e]/70 md:text-lg">
          この考え方を仕事にすると、やることは3つだけになります。
        </p>

        <div className="mt-14 space-y-12 md:mt-20 md:space-y-16">
          {WORK.map(({ title, lead, body }, i) => (
            <div
              key={title}
              className="border-t border-[#1c1c1e]/15 pt-8 md:flex md:gap-12 md:pt-10"
            >
              <div className="flex items-baseline gap-4 md:w-56 md:shrink-0 md:flex-col md:gap-3">
                <span className="font-serif text-sm font-black text-seed">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-3xl font-black tracking-tight text-[#1c1c1e] md:text-4xl">
                  {title}
                </h3>
              </div>
              <div className="mt-5 md:mt-0">
                <p className="text-lg font-bold leading-snug text-[#1c1c1e] md:text-xl">
                  {lead}
                </p>
                <p className="mt-4 text-[15px] leading-[2] text-[#1c1c1e]/75 md:text-base md:leading-[2.1]">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 何をしないかを書くと、何をする人かがはっきりする */}
        <div className="mt-20 rounded-sm bg-[#1c1c1e]/[0.04] p-8 md:mt-24 md:p-12">
          <p className="font-serif text-xl font-black text-[#1c1c1e] md:text-2xl">
            逆に、やらないこと
          </p>
          <ul className="mt-6 space-y-3">
            {NOT_DOING.map((text) => (
              <li
                key={text}
                className="flex gap-3 text-[15px] leading-relaxed text-[#1c1c1e]/80 md:text-base"
              >
                <span className="select-none text-[#1c1c1e]/35">—</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * マーケティング支援プラン「Top SEED」
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

function TopSeedSection() {
  return (
    <section className="bg-[#12161f] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-3xl">
        {/* サービスのロゴをそのまま使う（暗い面なので白の透過版） */}
        <img
          src="/topseed-logo.png"
          alt="Top SEED"
          className="h-auto w-[13rem] md:w-[17rem]"
          loading="lazy"
        />
        <h2 className="mt-7 font-serif text-[clamp(1.6rem,5.5vw,2.75rem)] font-black leading-tight tracking-tight text-white">
          価格ではなく、
          <br />
          一番に選ばれる会社へ
        </h2>

        <div className="mt-8 space-y-6 text-[15px] leading-[2.1] text-white/80 md:text-base md:leading-[2.2]">
          <p>
            トップシードというのは、スポーツでいう「第1シード」のことです。優勝候補として、一番に選ばれる存在。そこを目指すための支援プランとして、この名前にしました。
          </p>
          <p>
            iroha Seed のマーケティング支援プランで、顧問として継続して関わる形になります。単発で何かを作って終わり、ではありません。
          </p>
          <p>
            やることは、SEED の4文字にそのまま入っています。
          </p>
        </div>

        {/* S・E・E・D はサービス名の由来であり、支援の4ステップそのもの */}
        <ol className="mt-12 border-t border-white/15 md:mt-14">
          {SEED_STEPS.map(({ letter, title, body }) => (
            <li
              key={letter + title}
              className="flex gap-5 border-b border-white/15 py-7 md:gap-8 md:py-8"
            >
              <span className="w-7 shrink-0 font-serif text-3xl font-black leading-none text-seed md:w-10 md:text-4xl">
                {letter}
              </span>
              <div>
                <p className="font-serif text-lg font-black tracking-tight text-white md:text-xl">
                  {title}
                </p>
                <p className="mt-2 text-[15px] leading-[1.9] text-white/75 md:text-base">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 space-y-6 text-[15px] leading-[2.1] text-white/80 md:text-base md:leading-[2.2]">
          <p>
            この4つを、月ごとに一緒に回していきます。やってみないと分からないことのほうが多いので、腰を据えて付き合う形にしています。
          </p>
          <p className="text-white/60">
            もう少し詳しく聞いてみたいと思っていただけたら、中身を具体的にお伝えします。まずは話すところからで大丈夫です。
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * ⑤ 歩いてきた道
 * 年表の羅列にせず、章立てにして短い語りをつける。
 * 事実（年次・数値・肩書き）は確認済みのものだけを使い、勝手に足さない。
 */
const CHAPTERS = [
  {
    period: '十代',
    title: '野球ばかりしていました',
    body: '高校では野球部で、2年続けてセンバツに出ました。専門学校では大阪代表として全国大会へ。この頃は、野球のことしか考えていませんでした。',
  },
  {
    period: '二十代',
    title: '整骨院から、父の現場へ',
    body: '整骨院に就職して、マッサージ師として働きました。その後、父が経営していた建設会社に入り、職人として現場に立ちました。どちらも、体を動かす仕事でした。',
  },
  {
    period: '2012年・30歳',
    title: '職人から、経営者になる',
    body: '職人として働いていた父の会社を継ぎ、法人化して代表になりました。建築リフォームと太陽光発電。現場に立っていた人間が、経営する側に回った年です。',
  },
  {
    period: '2017年',
    title: 'メロンパンが売れた日',
    body: 'フランチャイズのメロンパン店で、エリアマネージャーを任されました。最終的に2店舗を出しています。\n1店舗目の初日は、来客が500人、販売数は3,138個。全国3位でした。オープンから3か月の売上は2,500万円。\nここで分かったのは、売れるかどうかは商品の良し悪しだけでは決まらない、ということでした。',
  },
  {
    period: '2019年〜2023年',
    title: '壊れた家を直し続けた4年',
    body: '千葉を大きな台風が襲ったニュースを見て、自分にできることがあるんじゃないかと思い、現地へ向かいました。\n知り合いは一人もいませんでした。館山で地元の方とのご縁をいただき、すぐに工事の依頼を受けて復旧にあたりました。\n営業に行ったわけではありません。目の前の一軒を直していたら、次の一軒を頼まれる。その繰り返しでした。気づけば4年、修復に携わった家屋は100棟を超えていました。',
  },
  {
    period: '2023年〜',
    title: 'そして、iroha Seed',
    body: '福岡のIT企業で営業部のGMに就任し、2024年に iroha Seed を始めました。\nきっかけは、周りで独立した仲間が志半ばで諦めたり、倒産に追い込まれる姿を見てきたことです。自分が関わっていれば、救えたかもしれない。そう思ったのが始まりでした。',
  },
];

function PathSection() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-[clamp(1.9rem,6.5vw,3.5rem)] font-black leading-tight tracking-tight text-[#1c1c1e]">
          歩いてきた道
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#1c1c1e]/70 md:text-lg">
          なぜこういう考え方になったのか。
          <br className="hidden md:block" />
          たぶん、歩いてきた道と関係しています。まっすぐな道ではありませんでした。
        </p>

        <ol className="mt-14 md:mt-20">
          {CHAPTERS.map(({ period, title, body }, i) => (
            <li
              key={title}
              className="relative border-l border-[#1c1c1e]/15 pb-12 pl-8 last:pb-0 md:pl-14"
            >
              {/* 章の始まりを示す点 */}
              <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-seed" />
              <p className="font-serif text-xs font-black tracking-wider text-[#1c1c1e]/45 md:text-sm">
                {String(i + 1).padStart(2, '0')}
                <span className="mx-2 text-[#1c1c1e]/25">/</span>
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
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * ⑥ 裏付け
 * 考え方（③）と経歴（⑤）のあとに置き、「言っていることに根拠はあるのか」に答える。
 * 事実のみ。お客様の声は、実在の声が集まってからこの下に追加する。
 */
const PROOFS = [
  {
    label: '経営者として14年',
    body: '2012年の法人設立から、建築・飲食・IT・製薬と、複数の業種で当事者として経営に関わってきました。',
  },
  {
    label: '製薬会社の CMO',
    body: '2025年、製薬会社の最高マーケティング責任者に就任しました。',
  },
  {
    label: 'ラジオ出演',
    body: '2025年、ビジネス系のFMラジオに出演しました。',
  },
  {
    label: '著書を出版',
    body: '2026年、『なぜ、あの会社は高くても選ばれるのか？ 比べられない会社には、理由がある。』を出版。Amazon Kindleランキング6部門で1位になりました。',
  },
];

function ProofSection() {
  return (
    <section className="bg-[#12161f] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-[clamp(1.9rem,6.5vw,3.5rem)] font-black leading-tight tracking-tight text-white">
          言っていることの、
          <br className="md:hidden" />
          裏付け
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
          考え方だけなら、誰にでも言えますから。
        </p>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          <ul className="space-y-8 md:space-y-10">
            {PROOFS.map(({ label, body }) => (
              <li key={label} className="border-t border-white/15 pt-6 md:pt-7">
                <p className="font-serif text-xl font-black tracking-tight text-white md:text-2xl">
                  {label}
                </p>
                <p className="mt-3 text-[15px] leading-[2] text-white/75 md:text-base">
                  {body}
                </p>
              </li>
            ))}
          </ul>

          {/* 書影を大きく、その下に写真を2枚並べて裏付けの面を作る */}
          <div className="space-y-4 md:w-[19rem] md:shrink-0">
            <figure>
              <img
                src="/book-cover.jpg"
                alt="著書『なぜ、あの会社は高くても選ばれるのか？』の表紙"
                className="w-full rounded-sm shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                loading="lazy"
              />
            </figure>
            <figure>
              <img
                src="/radio.jpg"
                alt="ラジオ番組に出演したときの様子"
                className="aspect-[4/3] w-full rounded-sm object-cover object-[50%_38%]"
                loading="lazy"
              />
            </figure>
            <figure>
              <img
                src="/profile.jpg"
                alt="山本 剛史"
                className="aspect-[16/10] w-full rounded-sm object-cover"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
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
    a: 'まず無料診断でお話を聞きます。オンラインで30〜60分ほどです。そのうえで課題と方向性をお伝えして、納得いただけた場合だけ始めます。強引な勧誘はしません。',
  },
  {
    q: '料金はどのくらいですか？',
    a: '状況や課題の深さによって変わります。まず無料診断でお話を聞いてから、合うかたちをご提案します。',
  },
  {
    q: 'SNS運用や広告の代行もお願いできますか？',
    a: '代行よりも、「なぜ売れていないのか」を見つけて、売れる仕組みを設計するほうが専門です。土台が整っていない状態だと、どんな施策も効きにくいので。',
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
    <section className="bg-[#f4f1ea] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-[clamp(1.9rem,6.5vw,3.5rem)] font-black leading-tight tracking-tight text-[#1c1c1e]">
          よくある質問
        </h2>

        <div className="mt-12 border-t border-[#1c1c1e]/15 md:mt-16">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group border-b border-[#1c1c1e]/15">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-6 text-base font-bold leading-snug text-[#1c1c1e] md:text-lg">
                <span className="mt-[2px] shrink-0 font-serif text-[#1c1c1e]/40">
                  Q.
                </span>
                <span className="flex-1">{q}</span>
                <span className="mt-1 shrink-0 text-xl leading-none text-[#1c1c1e]/40 transition group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <p className="pb-7 pl-9 text-[15px] leading-[2] text-[#1c1c1e]/75 md:text-base">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
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
    <section className="bg-[#12161f] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-[clamp(1.7rem,5.5vw,3rem)] font-black leading-tight tracking-tight text-white">
          最後まで読んでいただき、
          <br />
          ありがとうございます。
        </h2>

        <p className="mt-8 text-[15px] leading-[2] text-white/80 md:text-lg md:leading-[2.1]">
          ここまで読んで「少し話してみたいかも」と思っていただけたなら、たぶん合うと思います。
          <br />
          売り込むことはしません。まずは現状をお聞かせください。
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
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-white underline decoration-seed decoration-2 underline-offset-4 transition hover:text-seed-bright"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 text-xs leading-relaxed text-white/40">
          株式会社廣創　代表取締役社長　山本 剛史
          <br />
          iroha Seed（廣創のマーケティング事業部）
          <br />
          福岡県福岡市城南区七隈3-2-29-101
        </p>
      </div>
    </section>
  );
}

export default function RenewPage() {
  return (
    <>
      <RenewHero />
      <GreetingSection />
      <TroubleSection />
      <ThinkingSection />
      <WorkSection />
      <TopSeedSection />
      <PathSection />
      <ProfileSection />
      <ProofSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
