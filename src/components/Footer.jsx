function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>📔 <strong>Nhật Ký Lập Trình</strong></p>
        <p>Một hành trình tự học, chia sẻ và phát triển</p>
        <p className="mb-sm">
          Made with 💚 by <a href="https://github.com/Albert-Tuan" target="_blank" rel="noopener noreferrer">Albert-Tuan</a>
        </p>
        <p>&copy; {currentYear} - All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
