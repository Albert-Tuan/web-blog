import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts, allTagNames } from '../data/content';

function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const activeTag = searchParams.get('tag') || null;

  const tags = allTagNames();

  let filtered = posts;

  if (q.trim()) {
    const lower = q.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.excerpt.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower)),
    );
  }

  if (activeTag) {
    filtered = filtered.filter((p) => p.tags.includes(activeTag));
  }

  const setTag = (tag) => {
    const next = new URLSearchParams(searchParams);
    if (tag) {
      next.set('tag', tag);
    } else {
      next.delete('tag');
    }
    setSearchParams(next);
  };

  return (
    <div className="max-w-[1120px] mx-auto w-full px-gutter py-space-lg flex flex-col gap-space-xl">
      {/* Page header */}
      <div className="relative bg-surface-container-low rounded-xl p-space-xl shadow-paper overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-primary-fixed/30 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest bg-tertiary-fixed/60 px-space-xs py-0.5 rounded">
              Mục lục sổ tay § Index
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-xs">
            📝 Tất cả bài viết
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant italic">
            {posts.length} bài viết — tất cả được ghi chép cẩn thận
          </p>
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col gap-space-md">
        {/* Search input */}
        <div className="relative max-w-md">
          <label className="sr-only" htmlFor="blog-search">
            Tìm kiếm bài viết
          </label>
          <input
            id="blog-search"
            type="search"
            value={q}
            onChange={(e) => {
              const next = new URLSearchParams(searchParams);
              if (e.target.value) {
                next.set('q', e.target.value);
              } else {
                next.delete('q');
              }
              setSearchParams(next);
            }}
            placeholder="Tìm trong sổ tay…"
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-space-md py-2.5 font-label-md text-label-md text-on-surface placeholder:text-outline/80 focus:outline-none focus:bg-surface-container focus:border-primary-container transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline pointer-events-none">
            search
          </span>
        </div>

        {/* Tag filter pills */}
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            onClick={() => setTag(null)}
            className={`px-space-sm py-1.5 rounded font-label-sm text-label-sm transition-all ${
              !activeTag
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Tất cả
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTag(tag === activeTag ? null : tag)}
              className={`px-space-sm py-1.5 rounded font-label-sm text-label-sm transition-all ${
                tag === activeTag
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Hiển thị {filtered.length} / {posts.length} mục ghi
          {activeTag && <span> — tag: <strong>{activeTag}</strong></span>}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filtered.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-space-xl gap-space-md text-center">
          <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
          <p className="font-headline-sm text-headline-sm text-on-surface">
            Không tìm thấy mục ghi nào
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant italic">
            Thử từ khoá khác hoặc xoá bộ lọc tag
          </p>
          <button
            onClick={() => {
              setSearchParams({});
            }}
            className="mt-space-sm bg-primary-container text-on-primary-container font-label-md text-label-md px-space-lg py-2 rounded hover:bg-primary hover:text-on-primary transition-all"
          >
            Xoá bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

export default Blog;