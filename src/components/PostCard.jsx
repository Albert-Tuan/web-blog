import { Link } from 'react-router-dom';

const ACCENTS = [
  'bg-tertiary-fixed',
  'bg-primary-fixed',
  'bg-secondary-fixed',
  'bg-surface-container-highest',
];

function PostCard({ post, index = 0 }) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <article className="group relative flex flex-col bg-surface-container-lowest rounded-xl shadow-paper hover:shadow-paper-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Washi tape strip across the top */}
      <div className={`h-1.5 w-full ${accent} opacity-70`} aria-hidden="true" />

      {/* Left binding spine */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-container/50 via-primary-container/20 to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-space-sm p-space-lg pl-space-lg">
        {/* Category seal */}
        <div className="flex flex-wrap items-center gap-space-xs">
          <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            {post.category}
          </span>
          <span className="font-label-sm text-label-sm text-outline">{post.code}</span>
        </div>

        {/* Title */}
        <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight leading-snug">
          <Link
            to={`/blog/${post.id}`}
            className="transition-colors after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>

        {/* Meta deck */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-label-sm text-label-sm text-on-surface-variant">
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">
              calendar_today
            </span>
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
            {post.readTime} phút
          </span>
        </div>

        {/* Excerpt */}
        <p className="font-body-sm text-body-sm text-on-surface-variant italic leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-space-xs">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              className="relative z-10 px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-label-sm transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Footer meta */}
        <div className="mt-auto pt-space-sm border-t border-dashed border-outline-variant/70 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">commit</span>
            {post.commits} commits
          </span>
          <span className="inline-flex items-center gap-1 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Đọc tiếp
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </div>
      </div>

      {/* Diagonal stamp, revealed on hover */}
      <div
        className="pointer-events-none absolute right-4 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <span className="inline-block border-2 border-tertiary/60 text-tertiary/80 font-label-sm text-label-sm uppercase tracking-widest px-2 py-0.5 -rotate-12 rounded">
          Entry § {post.id}
        </span>
      </div>
    </article>
  );
}

export default PostCard;