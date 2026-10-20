import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';

// Sample blog posts data
const samplePosts = [
  {
    id: 1,
    title: 'Ngày đầu tiên với React.js',
    date: '15/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Hôm nay tôi bắt đầu hành trình học React. Component, JSX, state... bao nhiêu thứ mới lạ!',
    tags: ['React', 'JavaScript', 'Cơ bản']
  },
  {
    id: 2,
    title: 'CSS Flexbox không khó như bạn nghĩ',
    date: '18/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Sau nhiều ngày vật lộn với float và grid, cuối cùng tôi cũng hiểu Flexbox rồi! Chia sẻ cách tôi học nó.',
    tags: ['CSS', 'Flexbox', 'Layout']
  },
  {
    id: 3,
    title: 'Git & GitHub cho người mới bắt đầu',
    date: '22/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Commit, push, pull, merge... Tưởng khó hoá ra dễ! Ghi chú lại những lệnh Git cơ bản tôi hay dùng.',
    tags: ['Git', 'GitHub', 'Version Control']
  },
  {
    id: 4,
    title: 'Tự xây blog cá nhân với React',
    date: '25/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Để ôn lại kiến thức, tôi quyết định làm một blog cá nhân. Và đây là nhật ký hành trình!',
    tags: ['Project', 'React', 'Blog']
  },
  {
    id: 5,
    title: 'Học JavaScript qua 5 trò chơi nhỏ',
    date: '28/10/2024',
    author: 'Albert Tuan',
    excerpt: 'Không có gì thú vị hơn việc học code qua game! Giới thiệu 5 trang web giúp học JS một cách vui vẻ.',
    tags: ['JavaScript', 'Game', 'Học tập']
  },
  {
    id: 6,
    title: 'Async/Await là gì vậy?',
    date: '01/11/2024',
    author: 'Albert Tuan',
    excerpt: 'Callback, Promise, Async/Await - trời ơi sao JavaScript có nhiều cách xử lý bất đồng bộ thế!',
    tags: ['JavaScript', 'Async', 'Nâng cao']
  }
];

function Home() {
  return (
    <>
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero mb-xl">
            <h1>Chào mừng đến với Nhật Ký Lập Trình! 👋</h1>
            <p>
              Đây là nơi tôi ghi lại hành trình tự học lập trình từ con số 0. 
              Mỗi ngày một bài học, mỗi tuần một dự án nhỏ. Cùng nhau tiến bộ nhé!
            </p>
          </section>

          {/* Latest Posts */}
          <section>
            <h2 className="text-center mb-lg">📌 Bài viết mới nhất</h2>
            <div className="blog-grid">
              {samplePosts.slice(0, 3).map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* About teaser */}
          <section className="text-center mb-xl" style={{ marginTop: '3rem' }}>
            <h2>Về blog này</h2>
            <p>
              Tôi bắt đầu học lập trình từ đầu năm 2024 với ước mơ trở thành một lập trình viên chuyên nghiệp.
              Blog này là nơi tôi chia sẻ những gì đã học được, những lỗi đã mắc phải, và những giải pháp đã tìm ra.
            </p>
            <p>
              <strong>Công nghệ đang học:</strong> React, Node.js, Python, SQL...
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}

export default Home;
