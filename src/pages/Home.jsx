import { postsApi } from '../api/posts';
import { useApi } from '../hooks/useApi';
import ApiStatus from '../components/ApiStatus';
import PostCard from '../components/PostCard';

function Home() {
  const state = useApi(postsApi.list);
  const posts = state.data || [];
  return (
    <main className="main-content">
      <div className="container">
        {/* Hero Section */}
        <section className="hero mb-xl fade-in">
          <h1>Chào mừng đến với Nhật Ký Lập Trình! 👋</h1>
          <p>
            Đây là nơi tôi ghi lại hành trình tự học lập trình từ con số 0. 
            Mỗi ngày một bài học, mỗi tuần một dự án nhỏ. Cùng nhau tiến bộ nhé!
          </p>
          <div className="divider"></div>
        </section>

        {/* Latest Posts */}
        <section className="mb-xl">
          <h2 className="text-center mb-lg">📌 Bài viết mới nhất</h2>
          <ApiStatus {...state} />
          {!state.loading && !state.error && posts.length === 0 && <p>Chưa có bài viết.</p>}
          <div className="blog-grid">
            {posts.slice(0, 3).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* About teaser */}
        <section className="about-content text-center fade-in">
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
  );
}

export default Home;
