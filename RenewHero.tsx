/**
 * 新サイトのファーストビュー（検証用）
 * 方針：演出で引くのではなく、写真とコピーの大きさで引く。
 * 　　　開いた瞬間に読める状態にするため、オープニングアニメーションは入れない。
 */
export default function RenewHero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#0f1115]">
      {/* 人物写真：顔の位置を基準に寄せる（スマホは横が大きく切れるため x を調整） */}
      <img
        src="/portrait.jpg"
        alt="iroha Seed 山本剛史"
        width="2000"
        height="1414"
        className="absolute inset-0 h-full w-full object-cover object-[53%_20%]"
        fetchPriority="high"
      />

      {/* 文字を読ませるための暗幕：スマホは下から、PCは左から掛ける */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 md:bg-gradient-to-r md:from-black/90 md:via-black/55 md:to-transparent" />

      {/* ヘッダー */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <span className="font-serif text-lg font-black tracking-wide text-white md:text-xl">
          iroha&nbsp;Seed
        </span>
        <a
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
        >
          無料相談
        </a>
      </header>

      {/* コピー */}
      <div className="relative z-10 flex min-h-[100svh] items-end px-6 pb-20 md:items-center md:px-12 md:pb-0 lg:px-20">
        <div className="max-w-[56rem]">
          {/* 行の途中で折り返すと締まらないので、各行は必ず1行に収める */}
          <h1 className="font-serif font-black leading-[1.08] tracking-tight text-white text-[clamp(2.6rem,11.5vw,7rem)]">
            <span className="block whitespace-nowrap">値下げは、</span>
            <span className="block whitespace-nowrap">戦略じゃない。</span>
          </h1>

          {/* 名前・肩書きは出さない。名乗りは②あいさつ以降で文脈とともに行う */}
          <p className="mt-7 text-[clamp(1.05rem,4.4vw,1.6rem)] font-medium leading-relaxed text-white/90">
            売れない理由を見つけて、
            <br className="md:hidden" />
            売れる形に組み直す。
          </p>
        </div>
      </div>

      {/* 下に続くことを示す控えめな目印 */}
      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center md:bottom-8">
        <span className="h-10 w-px bg-gradient-to-b from-white/0 to-white/60 md:h-14" />
      </div>
    </section>
  );
}
