import { useState } from 'react';
import PostCard from '../components/PostCard';

// Sample blog posts data
const allPosts = [
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
  },
  {
    id: 7,
    title: 'Tìm hiểu về API và RESTful',
    date: '05/11/2024',
    author: 'Albert Tuan',
    excerpt: 'GET, POST, PUT, DELETE - những HTTP methods cơ bản mà developer nào cũng cần biết.',
    tags: ['API', 'REST', 'Backend']
  },
  {
    id: 8,
    title: '5 VS Code extensions giúp tôi code nhanh hơn',
    date: '10/11/2024',
    author: 'Albert Tuan',
    excerpt: 'Những extension không thể thiếu cho React developer: Prettier, ESLint, Auto Rename Tag...',
    tags: ['VS Code', 'Tools', 'Productivity']
  }
];

function Blog() {
  const [selectedTag, setSelectedTag] = useState(null);
  
  // Get unique tags
  const allTags = [...new Set(allPosts.flatMap(post => post.tags))].sort();
  
  // Filter posts by tag
  const filteredPosts = selectedTag 
    ? allPosts.filter(post => post.tags.includes(selectedTag))
    : allPosts;

  return (
    <main className="main-content">
      <div className="container">
        <section className="page-header">
          <h1>📝 Tất cả bài viết</h1>
          <p className="subtitle">{allPosts.length} bài viết • Cập nhật liên tục</p>
        </section>

        {/* Tag Filter */}
        <div className="tags-cloud mb-xl fade-in">
          <button 
            className={`tag-item ${!selectedTag ? 'active' : ''}`}
            onClick={() => setSelectedTag(null)}
            style={{
              background: !selectedTag ? 'var(--primary-container)' : undefined,
              color: !selectedTag ? 'var(--on-primary-container)' : undefined
            }}
          >
            Tất cả
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-item ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
              style={{
                background: selectedTag === tag ? 'var(--primary-container)' : undefined,
                color: selectedTag === tag ? 'var(--on-primary-container)' : undefined
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="text-center">Không có bài viết nào với tag này.</p>
        )}
      </div>
    </main>
  );
}

export default Blog;
