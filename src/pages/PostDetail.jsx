import { useParams, Link } from 'react-router-dom';
import { findPost, adjacentPosts, AUTHOR } from '../data/content';

function PostDetail() {
  const { id } = useParams();
  const post = findPost(id);
  const { prev, next } = adjacentPosts(id);

  if (!post) {
    return (
      <div className="max-w-[1120px] mx-auto px-gutter py-space-xl text-center">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary bg-tertiary-fixed/60 px-space-xs py-0.5 rounded inline-block mb-space-md">
          Lỗi 404 — mục ghi không tồn tại
        </span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-md">
          Trang này chưa được ghi vào sổ
        </h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary-container font-label-md text-label-md px-space-lg py-2 rounded hover:bg-primary hover:text-on-primary transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1120px] mx-auto w-full px-gutter py-space-lg flex flex-col gap-space-xl">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-space-lg">
        <Link
          to="/blog"
          className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-all font-label-md text-label-md group"
        >
          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span className="underline decoration-dotted underline-offset-4">
            Quay lại danh sách bài viết
          </span>
        </Link>
        <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-outline">
          <span className="tracking-widest uppercase">Mã số bài: {post.code}</span>
          <span>•</span>
          <span>Trang {post.id * 10}/80</span>
        </div>
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Article body */}
        <article className="lg:col-span-8 flex flex-col bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-xl shadow-paper-lg relative overflow-hidden">
          {/* Washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-primary-fixed/60 backdrop-blur-sm -rotate-1 pointer-events-none shadow-sm flex items-center justify-center">
            <span className="font-label-sm text-label-sm text-on-primary-fixed tracking-widest uppercase opacity-70">
              Confidential Entry
            </span>
          </div>

          {/* Margin binding holes */}
          <div
            className="absolute left-2 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-20"
            aria-hidden="true"
          >
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="w-2.5 h-2.5 rounded-full bg-outline" />
            ))}
          </div>

          <div className="pl-2 sm:pl-4 flex flex-col">
            {/* Category seal */}
            <div className="flex flex-wrap items-center gap-space-sm mb-space-md">
              <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm uppercase tracking-wider font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                {post.category}
              </span>
              <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                {post.volume}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-md">
              {post.title}
            </h1>

            {/* Meta deck */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 py-space-sm px-space-md rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm mb-space-md">
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  calendar_today
                </span>
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                {post.readTime} phút đọc
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">forum</span>
                {post.comments} bình luận
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-space-xs mb-space-lg">
              <span className="font-label-sm text-label-sm text-outline uppercase mr-1">Thẻ:</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-2 py-0.5 rounded bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-sm text-label-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Quick note callout */}
            <div className="relative bg-surface-container-high/70 p-space-md sm:p-space-lg rounded-xl mb-space-xl shadow-sm">
              <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-md -rotate-12">
                <span className="material-symbols-outlined text-[16px]">push_pin</span>
              </div>
              <div className="flex flex-col gap-1 pl-4">
                <span className="font-label-md text-label-md text-tertiary font-bold tracking-wide">
                  GHI CHÚ NHANH TỪ BÀN HỌC
                </span>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                  "React thực tế không đáng sợ như lời đồn trên diễn đàn nếu bạn đã nắm chắc
                  JavaScript ES6 căn bản: Arrow functions, cú pháp Destructuring, và các hàm
                  mảng như <code className="font-label-sm text-label-sm bg-surface px-1.5 py-0.5 rounded text-tertiary">map()</code>,{' '}
                  <code className="font-label-sm text-label-sm bg-surface px-1.5 py-0.5 rounded text-tertiary">filter()</code>."
                </p>
              </div>
            </div>

            {/* Body content */}
            <div className="flex flex-col gap-space-lg text-on-surface font-body-md text-body-md leading-relaxed">
              <p>
                <span className="float-left font-headline-xl text-headline-xl text-primary leading-none pr-space-sm pt-1 select-none font-bold">
                  H
                </span>
                ôm nay là ngày đầu tiên tôi chính thức mở trình duyệt, mở Terminal và bắt
                đầu hành trình tự học thư viện React.js. Cảm giác bỡ ngỡ ban đầu nhanh chóng
                nhường chỗ cho sự thích thú khi nhìn thấy từng mảnh ghép giao diện ghép lại
                một cách mạch lạc. Dưới đây là những ghi chép vắn tắt nhưng cốt lõi nhất được
                đúc kết từ 6 giờ học tập trung liên tục bên tách cà phê sáng.
              </p>

              <div className="pt-space-md scroll-mt-24">
                <div className="flex items-center gap-space-sm mb-space-sm">
                  <span className="font-label-md text-label-md text-primary font-bold tracking-widest bg-primary-fixed/40 px-2 py-0.5 rounded">
                    MỤC 01
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Component là gì?
                  </h2>
                </div>
                <p>
                  Thay vì viết một tệp HTML khổng lồ dài hàng ngàn dòng, React cho phép chúng
                  ta chia giao diện thành các phần nhỏ độc lập, có thể tái sử dụng gọi là{' '}
                  <strong>Component</strong>. Hãy tưởng tượng Component giống những khối gạch
                  Lego: bạn thiết kế một viên gạch nút bấm (Button), một thanh điều hướng
                  (Navbar), sau đó lắp ráp chúng để dựng nên một tòa lâu đài giao diện hoàn
                  chỉnh.
                </p>
              </div>

              <div className="pt-space-md scroll-mt-24">
                <div className="flex items-center gap-space-sm mb-space-sm">
                  <span className="font-label-md text-label-md text-primary font-bold tracking-widest bg-primary-fixed/40 px-2 py-0.5 rounded">
                    MỤC 02
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    JSX — Kết hợp JS và HTML
                  </h2>
                </div>
                <p>
                  JSX cho phép chúng ta viết HTML ngay bên trong JavaScript. Trông có vẻ lạ lúc
                  đầu, nhưng sau vài lần thực hành, tôi nhận ra nó thực sự rất tiện lợi và
                  trực quan.
                </p>
              </div>

              <div className="pt-space-md scroll-mt-24">
                <div className="flex items-center gap-space-sm mb-space-sm">
                  <span className="font-label-md text-label-md text-primary font-bold tracking-widest bg-primary-fixed/40 px-2 py-0.5 rounded">
                    MỤC 03
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    State và Props
                  </h2>
                </div>
                <p>
                  <strong>State</strong> là dữ liệu nội bộ của component — thay đổi khi người
                  dùng tương tác. <strong>Props</strong> là dữ liệu được truyền từ bên ngoài
                  vào. Hiểu được sự khác nhau này là chìa khóa để nắm vững React.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="bg-secondary-container/30 border-l-4 border-secondary px-space-lg py-space-md rounded-r-lg">
                <p className="font-body-lg text-body-lg text-on-secondary-fixed-variant italic leading-relaxed">
                  "Mỗi ngày một bài học, mỗi tuần một dự án nhỏ — không cần hoàn hảo, chỉ
                  cần tiến bộ."
                </p>
              </blockquote>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-space-sm my-space-lg">
              <span className="h-px flex-1 bg-outline-variant" />
              <span className="font-label-sm text-label-sm text-outline">§</span>
              <span className="h-px flex-1 bg-outline-variant" />
            </div>

            {/* Share */}
            <div className="flex items-center justify-center gap-space-md">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Thích bài viết này? Chia sẻ nó!
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-space-sm py-1.5 rounded bg-surface-container hover:bg-surface-container-high font-label-sm text-label-sm text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                Chia sẻ
              </a>
            </div>
          </div>
        </article>

        {/* TOC sidebar (desktop only) */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-paper border border-outline-variant/60">
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-space-sm">
                Trong bài này
              </h3>
              <nav className="flex flex-col gap-1">
                {['Component là gì?', 'JSX — Kết hợp JS và HTML', 'State và Props'].map(
                  (item, i) => (
                    <a
                      key={i}
                      href={`#section-${i + 1}`}
                      className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-outline-variant/60 pl-space-sm hover:border-primary"
                    >
                      {item}
                    </a>
                  ),
                )}
              </nav>
            </div>

            {/* Author card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-paper border border-outline-variant/60">
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-space-sm">
                Tác giả
              </h3>
              <div className="flex items-center gap-space-sm">
                <img
                  alt="Albert Tuấn"
                  className="w-10 h-10 rounded-full object-cover border border-primary-container"
                  src={AUTHOR.avatar}
                />
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface font-bold">{post.author}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant italic">
                    Self-taught Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Prev / Next navigation */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-space-md" aria-label="Bài viết trước và sau">
        {prev ? (
          <Link
            to={`/blog/${prev.id}`}
            className="group flex flex-col gap-space-xs p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 hover:border-primary-container transition-all"
          >
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Bài trước
            </span>
            <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={`/blog/${next.id}`}
            className="group flex flex-col gap-space-xs p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 hover:border-primary-container transition-all text-right"
          >
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-end gap-1">
              Bài sau
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
            <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}

export default PostDetail;