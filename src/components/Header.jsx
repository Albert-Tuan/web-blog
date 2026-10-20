import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">📔</div>
          <div className="logo-text">
            Nhật Ký Lập Trình
            <span>Hành trình tự học code</span>
          </div>
        </Link>
      </div>
      
      <nav className="navbar">
        <div className="container">
          <ul className="nav-list">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <span className="icon">🏠</span>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                <span className="icon">📖</span>
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>
                <span className="icon">📝</span>
                Bài viết
              </Link>
            </li>
            <li>
              <Link to="/tags" className={location.pathname === '/tags' ? 'active' : ''}>
                <span className="icon">🏷️</span>
                Tags
              </Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                <span className="icon">✉️</span>
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
