function About() {
  return (
    <main className="main-content">
      <div className="container">
        <section className="page-header">
          <h1>📖 Về chúng tôi</h1>
        </section>

        <div className="about-content fade-in">
          <h2>Xin chào! 👋</h2>
          <p>
            Chào mừng bạn đến với <strong>Nhật Ký Lập Trình</strong> - 
            nơi tôi ghi lại hành trình tự học lập trình từ những bước đầu tiên.
          </p>

          <h2>🎯 Mục tiêu của tôi</h2>
          <ul>
            <li>Học lập trình web từ cơ bản đến nâng cao</li>
            <li>Xây dựng portfolio với các dự án thực tế</li>
            <li>Chia sẻ kiến thức và kinh nghiệm học tập</li>
            <li>Kết nối với cộng đồng lập trình viên</li>
          </ul>

          <h2>🛠️ Công nghệ đang học</h2>
          <ul>
            <li><strong>Frontend:</strong> HTML, CSS, JavaScript, React.js</li>
            <li><strong>Backend:</strong> Node.js, Express, Python</li>
            <li><strong>Database:</strong> MongoDB, MySQL, PostgreSQL</li>
            <li><strong>Tools:</strong> Git, GitHub, VS Code, Docker</li>
          </ul>

          <h2>📚 Phương pháp học tập</h2>
          <p>
            Tôi tin rằng cách tốt nhất để học lập trình là <strong>học qua thực hành</strong>. 
            Thay vì chỉ đọc tài liệu, tôi luôn cố gắng áp dụng những gì đã học vào các dự án nhỏ. 
            Sai lầm là phần quan trọng của quá trình học tập - và tôi không ngại chia sẻ những lỗi mình đã mắc phải.
          </p>

          <h2>📬 Liên hệ</h2>
          <p>
            Bạn có câu hỏi, gợi ý, hoặc muốn hợp tác? 
            Đừng ngần ngại liên hệ với tôi qua trang <a href="/contact">Liên hệ</a>!
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
