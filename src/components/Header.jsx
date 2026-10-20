import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AUTHOR, LOGO } from '../data/content';

const NAV_ITEMS = [
  { path: '/', label: 'Trang chủ' },
  { path: '/blog', label: 'Bài viết' },
  { path: '/tags', label: 'Tags' },
  { path: '/about', label: 'Giới thiệu' },
  { path: '/contact', label: 'Liên hệ' },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/blog?q=${encodeURIComponent(q)}` : '/blog');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-low/95 backdrop-blur-md shadow-header">
      <div className="h-20 max-w-[1120px] mx-auto px-gutter flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-space-md group">
          <img
            alt="Nhật Ký Lập Trình Logo"
            className="h-8 w-auto object-contain"
            src={LOGO}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Nhật Ký Lập Trình
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-space-xs py-0.5 rounded border border-outline-variant">
                vol. 01
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant italic">
              Hành trình tự học code mỗi ngày
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-space-xs bg-surface-container p-1 rounded-lg border border-outline-variant">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={`px-space-md py-1.5 rounded transition-all font-label-md text-label-md ${
                isActive(item.path)
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-space-md">
          <div className="hidden sm:flex items-center gap-space-xs bg-secondary-container/50 px-space-sm py-1 rounded-full border border-secondary/30 text-on-secondary-container font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span>Đang viết code</span>
          </div>

          <form onSubmit={onSearch} className="hidden md:flex items-center">
            <label className="sr-only" htmlFor="site-search">
              Tìm kiếm bài viết
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm trong sổ tay…"
              className="w-40 lg:w-48 bg-surface-container/70 border border-outline-variant rounded py-1.5 pl-8 pr-2 font-label-sm text-label-sm text-on-surface placeholder:text-outline/80 focus:outline-none focus:bg-surface-container focus:border-primary-container transition-all"
            />
            <button
              type="submit"
              title="Tìm kiếm"
              className="-ml-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
          </form>

          <Link
            to="/about"
            title={AUTHOR.name}
            className="hidden sm:flex items-center p-0.5 rounded-full border border-primary-container shadow-inner bg-surface-container"
          >
            <img
              alt={AUTHOR.name}
              className="w-8 h-8 rounded-full object-cover"
              src={AUTHOR.avatar}
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            className="lg:hidden flex items-center justify-center p-2 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="lg:hidden bg-surface-container-low border-t border-outline-variant shadow-paper">
          <ul className="max-w-[1120px] mx-auto px-gutter py-space-sm flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-space-md py-2 rounded font-label-md text-label-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Gradient hairline */}
      <div className="w-full h-0.5 bg-gradient-to-r from-outline-variant via-primary-container to-outline-variant opacity-40" />
    </header>
  );
}

export default Header;