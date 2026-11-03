import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { apiError } from '../api/client';

export default function Account() {
  const { user, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function signOut() {
    if (busy) return;
    setBusy(true);
    setError('');
    try { await logout(); navigate('/login', { replace: true }); }
    catch (err) { setError(apiError(err)); setBusy(false); }
  }
  return (
    <main className="main-content"><div className="container">
      <section className="auth-card">
        <h1>Tài khoản của bạn</h1>
        <dl className="account-details">
          <dt>Email</dt><dd>{user.email}</dd>
          <dt>Mã người dùng</dt><dd>{user.id}</dd>
          <dt>Ngày đăng ký</dt><dd>{new Date(user.createdAt).toLocaleString('vi-VN')}</dd>
        </dl>
        <div className="post-actions">
          <Link to="/blog/new">Viết bài mới</Link>
          <button type="button" disabled={busy} onClick={signOut}>{busy ? 'Đang đăng xuất…' : 'Đăng xuất'}</button>
        </div>
        {error && <p role="alert" className="api-error">{error}</p>}
      </section>
    </div></main>
  );
}
