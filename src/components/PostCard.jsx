import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p className="post-meta">
        📅 {post.date} • 👤 {post.author}
      </p>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-tags">
        {post.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <Link to={`/blog/${post.id}`} className="read-more">
        Đọc tiếp →
      </Link>
    </article>
  );
}

export default PostCard;
