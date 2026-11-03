import { useCallback, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { postsApi, formatPostDate } from '../api/posts';
import { apiError } from '../api/client';
import { useApi } from '../hooks/useApi';
import ApiStatus from '../components/ApiStatus';
import { useAuth } from '../auth/AuthContext';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const loader = useCallback(signal => postsApi.get(id, signal), [id]);
  const state = useApi(loader);
  const post = state.data;
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  async function remove() {
    if (deleting || !window.confirm(`Xóa bài viết “${post.title}”?`)) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await postsApi.remove(id);
      navigate('/blog');
    } catch (error) {
      setDeleteError(apiError(error));
      setDeleting(false);
    }
  }

  if (!post) return (
    <main className="main-content"><div className="container">
      <ApiStatus {...state} />
      <Link to="/blog">← Quay lại danh sách bài viết</Link>
    </div></main>
  );

  return (
    <main className="main-content">
      <div className="container">
        <article className="post-detail fade-in">
          <Link to="/blog" className="back-link">
            ← Quay lại danh sách bài viết
          </Link>
          
          {isAuthenticated && post.authorId === user.id && <div className="post-actions">
            <Link to={`/blog/${id}/edit`}>Sửa bài viết</Link>
            <button type="button" disabled={deleting} onClick={remove}>{deleting ? 'Đang xóa…' : 'Xóa bài viết'}</button>
          </div>}
          {deleteError && <p role="alert" className="api-error">{deleteError}</p>}
          <div className="post-detail-header">
            <h1>{post.title}</h1>
            
            <p className="post-meta">
              <span>📅</span> {formatPostDate(post.publishedAt)}
              <span className="separator">•</span>
              <span>👤</span> {post.author}
            </p>
            
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="post-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content, { USE_PROFILES: { html: true } }) }} />
          
          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px dashed var(--outline-variant)' }} />
          
          <div className="text-center">
            <p className="label" style={{ marginBottom: '1rem' }}>Thích bài viết này? Chia sẻ nó!</p>
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
  );
}

export default PostDetail;
