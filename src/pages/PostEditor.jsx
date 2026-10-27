import { useCallback, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postsApi } from '../api/posts';
import { apiError } from '../api/client';
import { useApi } from '../hooks/useApi';
import ApiStatus from '../components/ApiStatus';

const emptyPost = { title: '', excerpt: '', content: '', author: 'Albert Tuan', tags: [] };

function PostForm({ post, id }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...post, tags: post.tags.join(', ') });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function change(event) {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    const payload = {
      title: form.title.trim(), author: form.author.trim(), excerpt: form.excerpt.trim(),
      content: form.content.trim(), tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    try {
      const saved = id ? await postsApi.update(id, payload) : await postsApi.create(payload);
      navigate(`/blog/${saved.id}`);
    } catch (err) {
      setError(apiError(err));
      setSaving(false);
    }
  }

  return (
    <form className="post-editor" onSubmit={submit}>
      <fieldset disabled={saving}>
        <label htmlFor="title">Tiêu đề</label>
        <input id="title" name="title" required maxLength={200} value={form.title} onChange={change} />
        <label htmlFor="author">Tác giả</label>
        <input id="author" name="author" required maxLength={100} value={form.author} onChange={change} />
        <label htmlFor="excerpt">Tóm tắt</label>
        <textarea id="excerpt" name="excerpt" required maxLength={500} rows={3} value={form.excerpt} onChange={change} />
        <label htmlFor="content">Nội dung (hỗ trợ HTML cơ bản)</label>
        <textarea id="content" name="content" required maxLength={100000} rows={12} value={form.content} onChange={change} />
        <label htmlFor="tags">Tags (phân cách bằng dấu phẩy; tối đa 10 tag, 40 ký tự/tag)</label>
        <input id="tags" name="tags" value={form.tags} onChange={change} />
        <div className="post-actions">
          <button type="submit">{saving ? 'Đang lưu…' : id ? 'Lưu thay đổi' : 'Tạo bài viết'}</button>
          {!saving && <Link to={id ? `/blog/${id}` : '/blog'}>Hủy</Link>}
        </div>
      </fieldset>
      {error && <p role="alert" className="api-error">{error}</p>}
    </form>
  );
}

export default function PostEditor() {
  const { id } = useParams();
  const loader = useCallback(signal => id ? postsApi.get(id, signal) : Promise.resolve(emptyPost), [id]);
  const state = useApi(loader);
  return (
    <main className="main-content"><div className="container">
      <h1>{id ? 'Sửa bài viết' : 'Tạo bài viết'}</h1>
      <p>Bài thực hành CRUD — chức năng ghi chạy với API ở môi trường Development.</p>
      <ApiStatus {...state} />
      {state.data && <PostForm key={id || 'new'} post={state.data} id={id} />}
    </div></main>
  );
}
