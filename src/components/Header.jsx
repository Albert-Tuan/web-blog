import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="container header-content">
        <div>
          <Link to="/" className="logo">
            📔 Nhật Ký <span>Lập Trình</span>
          </Link>
          <p className="tagline">Hành trình tự học code mỗi ngày</p>
        </div>
      </div>
      
      <nav className="navbar">
        <div className="container">
          <ul className="nav-list">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                🏠 Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                📖 Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>
                📝 Bài viết
              </Link>
            </li>
            <li>
              <Link to="/tags" className={location.pathname === '/tags' ? 'active' : ''}>
                🏷️ Tags
              </Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                ✉️ Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
