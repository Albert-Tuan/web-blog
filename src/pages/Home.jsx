import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts, AUTHOR } from '../data/content';

function Home() {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-[1120px] mx-auto w-full px-gutter-mobile sm:px-gutter py-space-lg flex flex-col gap-space-xl">
      {/* ============================================
          HERO: Opening Journal Spread
          ============================================ */}
      <section className="relative w-full bg-surface-container-low rounded-xl shadow-paper-lg p-space-md sm:p-space-xl overflow-hidden">
        {/* Watermark stamp */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full border-4 border-dashed border-primary/10 pointer-events-none flex items-center justify-center rotate-12 select-none hidden sm:flex">
          <span className="font-label-lg text-primary/15 text-xs tracking-widest uppercase">
            Ex Libris • Archive § 2024
          </span>
        </div>

        {/* Journal spine accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-primary-container/40 to-transparent"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start pl-2 sm:pl-space-sm relative z-10">
          {/* Left page */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm flex-wrap text-on-surface-variant font-label-sm text-label-sm">
              <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-bold">
                Tập 01 / Trang 001
              </span>
              <span>•</span>
              <span className="italic font-body-sm text-body-sm">
                Thứ Ba, tiết trời mùa thu {AUTHOR.location}
              </span>
              <span className="text-tertiary">✿ ✿ ✿</span>
            </div>

            <div className="relative">
              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight leading-tight">
                Chào mừng đến với{' '}
                <br className="hidden sm:inline" />
                <span className="text-primary italic font-normal">Nhật Ký Lập Trình!</span> 👋
              </h1>
              <div className="inline-flex items-center gap-1 mt-space-xs bg-tertiary/10 text-tertiary px-space-sm py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                Bản thảo số 01 • Ghi chép hằn ngày
              </div>
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Đây là nơi tôi ghi lại hành trình tự học lập trình từ con số 0. Mỗi ngày
              một bài học, mỗi tuần một dự án nhỏ — tất cả được gói trong cuốn sổ tay
              bìa cứng này.
            </p>

            {/* Motto callout */}
            <div className="relative bg-secondary-container/20 rounded-lg border-2 border-dashed border-secondary/50 p-space-md transform -rotate-0.5">
              <div className="flex items-center gap-1 text-secondary mb-1">
                <span className="material-symbols-outlined text-[18px]">format_quote</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase font-bold text-secondary">
                  Phương châm
                </span>
              </div>
              <p className="font-headline-sm text-[17px] text-on-secondary-fixed-variant italic leading-snug">
                “{AUTHOR.motto}”
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary-container font-label-md text-label-md px-space-lg py-2 rounded hover:bg-primary hover:text-on-primary transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                Đọc bài viết
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 bg-surface-container-low border border-outline-variant text-on-surface font-label-md text-label-md px-space-lg py-2 rounded hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                Về tôi
              </Link>
            </div>

            {/* Signature */}
            <div className="flex items-center gap-space-sm pt-space-sm">
              <img
                src={AUTHOR.avatar}
                alt={AUTHOR.name}
                className="w-8 h-8 rounded-full object-cover border border-primary-container"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant italic">
                Khởi viết từ {AUTHOR.since} — {AUTHOR.name}
              </span>
            </div>
          </div>

          {/* Right page: notebook ledger summary */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="relative bg-surface-container-lowest rounded-xl border border-outline-variant/70 shadow-paper overflow-hidden">
              <div className="px-space-md py-space-sm bg-surface-container border-b border-outline-variant/60 flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                  Sổ tay ghi chép
                </span>
                <span className="material-symbols-outlined text-[18px] text-outline">
                  bookmark
                </span>
              </div>

              <dl className="divide-y divide-outline-variant/40">
                {[
                  { k: 'Tổng số bài viết', v: posts.length, tone: 'text-primary' },
                  { k: 'Tổng thẻ ghi chú', v: 28, tone: 'text-secondary' },
                  { k: 'Giờ đọc tích luỹ', v: `${posts.reduce((a, p) => a + p.readTime, 0)}′`, tone: 'text-tertiary' },
                  { k: 'Nhánh học hiện tại', v: 3, tone: 'text-primary' },
                ].map((row) => (
                  <div key={row.k} className="px-space-md py-space-sm flex items-center justify-between">
                    <dt className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                      {row.k}
                    </dt>
                    <dd className={`font-headline-sm text-headline-sm font-bold ${row.tone}`}>
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="px-space-md py-space-sm bg-surface-container-low border-t border-outline-variant/60">
                <p className="font-label-sm text-label-sm text-on-surface-variant italic">
                  Ghi chép gần nhất: React Hooks chuyên sâu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          LATEST ENTRIES
          ============================================ */}
      <section>
        <header className="flex flex-wrap items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs mb-space-xs">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest bg-tertiary-fixed/60 px-space-xs py-0.5 rounded">
                Mục lục sổ tay § Index
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
              📌 Bài viết mới nhất
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-tertiary transition-colors"
          >
            Xem tất cả
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {recentPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* ============================================
          ABOUT TEASER
          ============================================ */}
      <section className="relative bg-surface-container-lowest rounded-xl shadow-paper border border-outline-variant/70 overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-2 bg-primary"
          aria-hidden="true"
        />
        <div className="pl-space-lg sm:pl-space-xl py-space-lg pr-space-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
            Về cuốn sổ này
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Tôi bắt đầu học lập trình từ đầu năm 2024 với ước mơ trở thành một lập
            trình viên chuyên nghiệp. Sổ tay này là nơi tôi chia sẻ những gì đã học
            được, những lỗi đã mắc phải, và những giải pháp đã tìm ra.
          </p>
          <div className="flex flex-wrap items-center gap-space-xs mt-space-md">
            {['React', 'Node.js', 'Python', 'SQL', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant font-label-sm text-label-sm text-on-surface"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;