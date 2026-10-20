function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-logo">📔 Nhật Ký Lập Trình</p>
        <p>Một hành trình tự học, chia sẻ và phát triển</p>
        <p>
          Made with 💚 by <a href="https://github.com/Albert-Tuan" target="_blank" rel="noopener noreferrer">Albert-Tuan</a>
        </p>
        <p className="footer-copyright">
          &copy; {currentYear} - All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
