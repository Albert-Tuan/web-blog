import { Link } from 'react-router-dom';
import { getTags } from '../api/posts';
import { useApi } from '../hooks/useApi';
import ApiStatus from '../components/ApiStatus';

function Tags() {
  const state = useApi(getTags);
  const tags = state.data || [];
  return (
    <main className="main-content">
      <div className="container">
        <section className="page-header">
          <h1>🏷️ Tags</h1>
          <p className="subtitle">Chủ đề và số bài viết thực tế trong database</p>
        </section>
        <ApiStatus {...state} />
        <div className="tags-cloud mb-xl fade-in">
          {tags.map(tag => (
            <Link key={tag.name} to={`/blog?tag=${encodeURIComponent(tag.name)}`} className="tag-item">
              {tag.name} <span className="count">({tag.count})</span>
            </Link>
          ))}
        </div>
        {!state.loading && !state.error && tags.length === 0 && <p>Chưa có tag nào.</p>}
      </div>
    </main>
  );
}

export default Tags;
