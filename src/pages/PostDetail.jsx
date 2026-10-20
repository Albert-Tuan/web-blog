import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Sample blog posts data (same as Blog.jsx)
const allPosts = [
  {
    id: 1,
    title: 'Ngày đầu tiên với React.js',
    date: '15/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Hôm nay tôi bắt đầu hành trình học React. Component, JSX, state... bao nhiêu thứ mới lạ!',
    tags: ['React', 'JavaScript', 'Cơ bản'],
    content: `
      <p>Hôm nay là ngày đầu tiên tôi bắt đầu học React.js, và tôi đã học được rất nhiều thứ!</p>
      
      <h3>1. Component là gì?</h3>
      <p>Component là một khối UI có thể tái sử dụng. Giống như một "viên gạch" để xây dựng giao diện. Mỗi component có thể chứa logic riêng và giao diện riêng.</p>
      
      <h3>2. JSX - Kết hợp JS và HTML</h3>
      <p>JSX cho phép chúng ta viết HTML trong JavaScript. Trông có vẻ lạ lúc đầu, nhưng sau đó tôi nhận ra nó rất tiện lợi!</p>
      
      <h3>3. State và Props</h3>
      <p>State là dữ liệu nội bộ của component, còn Props là dữ liệu được truyền vào từ bên ngoài. Hiểu được sự khác nhau này là chìa khóa để học React.</p>
      
      <h3>Kết luận</h3>
      <p>Ngày đầu tiên với React khá thú vị. Tôi đã tạo được component đầu tiên và hiểu được cách React quản lý giao diện. Looking forward to learning more!</p>
    `
  },
  {
    id: 2,
    title: 'CSS Flexbox không khó như bạn nghĩ',
    date: '18/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Sau nhiều ngày vật lộn với float và grid, cuối cùng tôi cũng hiểu Flexbox rồi!',
    tags: ['CSS', 'Flexbox', 'Layout'],
    content: `<p>Nội dung chi tiết về Flexbox...</p>`
  },
  {
    id: 3,
    title: 'Git & GitHub cho người mới bắt đầu',
    date: '22/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Commit, push, pull, merge... Tưởng khó hoá ra dễ!',
    tags: ['Git', 'GitHub', 'Version Control'],
    content: `<p>Nội dung chi tiết về Git...</p>`
  },
  {
    id: 4,
    title: 'Tự xây blog cá nhân với React',
    date: '25/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Để ôn lại kiến thức, tôi quyết định làm một blog cá nhân.',
    tags: ['Project', 'React', 'Blog'],
    content: `<p>Nội dung chi tiết về project blog...</p>`
  },
  {
    id: 5,
    title: 'Học JavaScript qua 5 trò chơi nhỏ',
    date: '28/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Không có gì thú vị hơn việc học code qua game!',
    tags: ['JavaScript', 'Game', 'Học tập'],
    content: `<p>Nội dung chi tiết về games...</p>`
  },
  {
    id: 6,
    title: 'Async/Await là gì vậy?',
    date: '01/11/2024',
    author: 'Albert Tuan',
    excerpt: 'Callback, Promise, Async/Await - JavaScript xử lý bất đồng bộ như thế nào?',
    tags: ['JavaScript', 'Async', 'Nâng cao'],
    content: `<p>Nội dung chi tiết về Async/Await...</p>`
  },
  {
    id: 7,
    title: 'Tìm hiểu về API và RESTful',
    date: '05/11/2024',
    author: 'Albert Tuan',
    excerpt: 'GET, POST, PUT, DELETE - những HTTP methods cơ bản.',
    tags: ['API', 'REST', 'Backend'],
    content: `<p>Nội dung chi tiết về API...</p>`
  },
  {
    id: 8,
    title: '5 VS Code extensions giúp tôi code nhanh hơn',
    date: '10/11/2024',
    author: 'Albert Tuan',
    excerpt: 'Những extension không thể thiếu cho React developer.',
    tags: ['VS Code', 'Tools', 'Productivity'],
    content: `<p>Nội dung chi tiết về VS Code extensions...</p>`
  }
];

function PostDetail() {
  const { id } = useParams();
  const post = allPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <>
        <Header />
        <main className="main-content">
          <div className="container text-center">
            <h1>404 - Không tìm thấy bài viết</h1>
            <p>Bài viết bạn đang tìm kiếm không tồn tại.</p>
            <Link to="/blog" className="read-more">← Quay lại danh sách bài viết</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="main-content">
        <div className="container">
          <article className="about-content" style={{ maxWidth: '800px' }}>
            <Link to="/blog" className="read-more" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              ← Quay lại danh sách bài viết
            </Link>
            
            <h1>{post.title}</h1>
            
            <p className="post-meta" style={{ marginLeft: 0 }}>
              📅 {post.date} • 👤 {post.author}
            </p>
            
            <div className="post-tags" style={{ marginLeft: 0, marginBottom: '1.5rem' }}>
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px dashed var(--color-brown-light)' }} />
            
            <div className="text-center">
              <p>Thích bài viết này? Chia sẻ nó!</p>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                🐦 Twitter
              </a>
              {' • '}
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                📘 Facebook
              </a>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </>
  );
}

export default PostDetail;
