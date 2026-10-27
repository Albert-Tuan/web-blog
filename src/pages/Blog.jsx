import { Link, useSearchParams } from 'react-router-dom';
import { postsApi } from '../api/posts';
import { useApi } from '../hooks/useApi';
import ApiStatus from '../components/ApiStatus';
import PostCard from '../components/PostCard';

function Blog() {
  const [params, setParams] = useSearchParams();
  const selectedTag = params.get('tag');
  const setSelectedTag = tag => setParams(tag ? { tag } : {});
  const state = useApi(postsApi.list);
  const allPosts = state.data || [];
  
  // Get unique tags
  const allTags = [...new Set(allPosts.flatMap(post => post.tags))].sort();
  
  // Filter posts by tag
  const filteredPosts = selectedTag 
    ? allPosts.filter(post => post.tags.some(tag => tag.toLocaleLowerCase() === selectedTag.toLocaleLowerCase()))
    : allPosts;

  return (
    <main className="main-content">
      <div className="container">
        <section className="page-header">
          <h1>📝 Tất cả bài viết</h1>
          <p className="subtitle">{allPosts.length} bài viết • Cập nhật liên tục</p>
          <Link to="/blog/new" className="read-more">＋ Tạo bài viết</Link>
        </section>
        <ApiStatus {...state} />

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

        {!state.loading && !state.error && filteredPosts.length === 0 && (
          <p className="text-center">Không có bài viết nào với tag này.</p>
        )}
      </div>
    </main>
  );
}

export default Blog;
