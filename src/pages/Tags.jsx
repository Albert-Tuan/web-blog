import { Link, useSearchParams } from 'react-router-dom';
import { tags, roadmap } from '../data/content';

const STATUS_MAP = {
  done: { color: 'bg-secondary text-on-secondary', label: 'Hoàn thành', icon: 'check_circle' },
  in_progress: { color: 'bg-primary text-on-primary', label: 'Đang học', icon: 'autorenew' },
  planned: { color: 'bg-surface-container border border-outline-variant text-on-surface-variant', label: 'Sắp tới', icon: 'schedule' },
};

const STATUS_COLOR_BAR = {
  done: 'bg-secondary',
  in_progress: 'bg-primary',
  planned: 'bg-outline',
};

function Tags() {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  return (
    <div className="max-w-[1120px] mx-auto w-full px-gutter py-space-lg flex flex-col gap-space-xl">
      {/* Page header + stats */}
      <div className="relative bg-surface-container-low rounded-xl p-space-xl shadow-paper overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-surface-container-highest rounded-full blur-2xl opacity-70 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" aria-hidden="true" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg relative z-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-space-sm mb-space-xs">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest bg-tertiary-fixed/60 px-space-xs py-0.5 rounded">
                Mục lục sổ tay § Index
              </span>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                history_edu
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              🏷️ Tags &amp; Chủ đề
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic">
              Tất cả {tags.length} chủ đề và thẻ ghi chú được phân loại trong cuốn sổ tay này
            </p>
          </div>

          {/* Stats pill */}
          <div className="flex items-center gap-space-md bg-surface p-space-sm px-space-md rounded-lg shadow-sm flex-shrink-0">
            <div className="flex flex-col items-center">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {tags.reduce((a, t) => a + t.count, 0)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tổng thẻ</span>
            </div>
            <div className="w-px h-8 bg-surface-variant" />
            <div className="flex flex-col items-center">
              <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                {tags.length}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Chủ đề</span>
            </div>
            <div className="w-px h-8 bg-surface-variant" />
            <div className="flex flex-col items-center">
              <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                {roadmap.length}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Nhánh học</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tag cloud */}
      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-paper border border-outline-variant/70">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
          ☁️ Tất cả thẻ
        </h2>
        <div className="flex flex-wrap gap-space-sm">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              to={`/blog?tag=${encodeURIComponent(tag.name)}`}
              className={`px-space-sm py-1.5 rounded-full font-label-sm text-label-sm transition-all ${
                tag.name === activeTag
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container border border-primary-container text-primary hover:bg-primary-container hover:text-on-primary-container'
              }`}
            >
              {tag.name}
              <span className="ml-1 opacity-70">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-paper border border-outline-variant/70">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">
          🗺️ Lộ trình học tập
        </h2>
        <div className="flex flex-col gap-space-md">
          {roadmap.map((item, i) => {
            const s = STATUS_MAP[item.status] || STATUS_MAP.planned;
            return (
              <div
                key={i}
                className="relative flex flex-col sm:flex-row sm:items-center gap-space-sm bg-surface rounded-lg p-space-md border border-outline-variant/60"
              >
                <div className={`inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full text-xs font-label-sm ${s.color} flex-shrink-0`}>
                  <span className="material-symbols-outlined text-[14px]">{s.icon}</span>
                  {s.label}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-bold truncate">
                    {item.title}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic truncate">
                    {item.detail}
                  </p>
                </div>
                <div className="w-full sm:w-40 flex-shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Tiến độ</span>
                    <span className="font-label-sm text-label-sm text-on-surface font-bold">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${STATUS_COLOR_BAR[item.status]}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tags;