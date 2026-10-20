import { Link } from 'react-router-dom';
import { AUTHOR } from '../data/content';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-space-xl bg-surface-container border-t-2 border-outline-variant overflow-hidden">
      {/* Notebook ruling continues into the footer */}
      <div className="absolute inset-0 opacity-30 notebook-lines pointer-events-none" />

      <div className="relative max-w-[1120px] mx-auto px-gutter py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
          {/* Brand column */}
          <div className="md:col-span-5">
            <p className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Nhật Ký Lập Trình
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant italic mb-space-md">
              Một cuốn sổ tay bìa cứng, ghi lại từng ngày học code.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-surface-container-high border border-outline-variant rounded-full px-space-sm py-1 font-label-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px] text-secondary">
                verified
              </span>
              Khởi tạo từ {AUTHOR.since}
            </span>
          </div>

          {/* Columns */}
          <div className="md:col-span-3">
            <h2 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-space-sm">
              Mục lục
            </h2>
            <ul className="flex flex-col gap-1">
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/blog', label: 'Bài viết' },
                { to: '/tags', label: 'Tags' },
                { to: '/about', label: 'Giới thiệu' },
                { to: '/contact', label: 'Liên hệ' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-space-sm">
              Liên kết ngoài
            </h2>
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href={AUTHOR.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  github.com/Albert-Tuan
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${AUTHOR.email}`}
                  className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  {AUTHOR.email}
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  {AUTHOR.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with ornamental flourish */}
        <div className="flex items-center gap-space-sm my-space-lg">
          <span className="h-px flex-1 bg-outline-variant" />
          <span className="font-label-sm text-label-sm text-outline">§</span>
          <span className="h-px flex-1 bg-outline-variant" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Made with <span aria-hidden="true">💚</span> by {AUTHOR.name}
          </p>
          <p className="font-label-sm text-label-sm text-outline">
            &copy; {currentYear} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;