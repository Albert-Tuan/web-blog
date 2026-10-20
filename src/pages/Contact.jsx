import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <main className="main-content">
      <div className="container">
        <section className="page-header">
          <h1>✉️ Liên hệ</h1>
          <p className="subtitle">Hãy liên hệ với tôi nếu bạn có câu hỏi hoặc muốn trò chuyện!</p>
        </section>

        <div className="contact-form fade-in">
          {submitted ? (
            <div className="success-message">
              <h2>✓ Gửi thành công!</h2>
              <p>Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Tên của bạn</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên của bạn..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Chủ đề</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Chủ đề bạn muốn thảo luận..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Nội dung</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Viết tin nhắn của bạn ở đây..."
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                📤 Gửi tin nhắn
              </button>
            </form>
          )}
        </div>

        {/* Alternative contact methods */}
        <div className="about-content text-center fade-in" style={{ marginTop: '2rem' }}>
          <h2>Hoặc liên hệ qua</h2>
          <p>
            📧 Email: <a href="mailto:albert.tuan@email.com">albert.tuan@email.com</a>
          </p>
          <p>
            💻 GitHub: <a href="https://github.com/Albert-Tuan" target="_blank" rel="noopener noreferrer">github.com/Albert-Tuan</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Contact;
