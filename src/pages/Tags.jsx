import { Link } from 'react-router-dom';

// Sample tags with counts
const tagsData = [
  { name: 'React', count: 12 },
  { name: 'JavaScript', count: 18 },
  { name: 'CSS', count: 8 },
  { name: 'Git', count: 5 },
  { name: 'GitHub', count: 4 },
  { name: 'Node.js', count: 7 },
  { name: 'Python', count: 6 },
  { name: 'API', count: 4 },
  { name: 'REST', count: 3 },
  { name: 'Flexbox', count: 3 },
  { name: 'Layout', count: 5 },
  { name: 'Backend', count: 8 },
  { name: 'Frontend', count: 10 },
  { name: 'Database', count: 4 },
  { name: 'MongoDB', count: 3 },
  { name: 'VS Code', count: 2 },
  { name: 'Tools', count: 6 },
  { name: 'Productivity', count: 4 },
  { name: 'Cơ bản', count: 15 },
  { name: 'Nâng cao', count: 7 },
  { name: 'Project', count: 9 },
  { name: 'Blog', count: 3 },
  { name: 'Game', count: 2 },
  { name: 'Học tập', count: 5 },
  { name: 'Async', count: 3 },
  { name: 'Version Control', count: 5 },
  { name: 'Docker', count: 2 },
  { name: 'TypeScript', count: 4 }
];

function Tags() {
  // Sort tags by count (descending)
  const sortedTags = [...tagsData].sort((a, b) => b.count - a.count);

  return (
    <main className="main-content">
      <div className="container">
        <section className="page-header">
          <h1>🏷️ Tags</h1>
          <p className="subtitle">Tất cả chủ đề được sử dụng trong blog</p>
        </section>

        {/* All tags cloud */}
        <div className="tags-cloud mb-xl fade-in">
          {sortedTags.map(tag => (
            <Link 
              key={tag.name} 
              to={`/blog?tag=${tag.name}`}
              className="tag-item"
            >
              {tag.name} <span className="count">({tag.count})</span>
            </Link>
          ))}
        </div>

        {/* Tags by category */}
        <section className="about-content fade-in">
          <h2>📂 Tags theo danh mục</h2>
          
          <div className="tags-category">
            <h3>Công nghệ</h3>
            <div className="tags-cloud" style={{ marginBottom: '1.5rem', background: 'transparent', border: 'none', padding: 0 }}>
              {['React', 'JavaScript', 'Node.js', 'Python', 'TypeScript'].map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="tag-item"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="tags-category">
            <h3>Công cụ</h3>
            <div className="tags-cloud" style={{ marginBottom: '1.5rem', background: 'transparent', border: 'none', padding: 0 }}>
              {['Git', 'GitHub', 'VS Code', 'Docker'].map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="tag-item"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="tags-category">
            <h3>Chủ đề</h3>
            <div className="tags-cloud" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              {['Cơ bản', 'Nâng cao', 'Project', 'Học tập', 'Productivity'].map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="tag-item"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Tags;
