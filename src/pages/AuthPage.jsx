import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { apiError } from '../api/client';
import ApiStatus from '../components/ApiStatus';

export default function AuthPage({ mode }) {
  const registering = mode === 'register';
  const { login, register, status, isAuthenticated, error: sessionError, refresh } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const destination = typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') && !from.includes('\\') && !/^\/(login|register)([/?#]|$)/.test(from) ? from : '/account';
  const [form, setForm] = useState({ email: '', password: '', confirmation: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setError('');
    if (registering && form.password !== form.confirmation) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }
    setBusy(true);
    try {
      await (registering ? register : login)({ email: form.email.trim(), password: form.password });
      navigate(destination, { replace: true });
    } catch (err) {
      setError(apiError(err));
    } finally { setBusy(false); }
  }

  const change = event => setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  if (isAuthenticated) return <Navigate to={destination} replace />;
  return (
    <main className="main-content"><div className="container">
      <section className="auth-card">
        <h1>{registering ? 'Tạo tài khoản' : 'Đăng nhập'}</h1>
        <p>{registering ? 'Đăng ký để viết và quản lý bài viết của bạn.' : 'Chào mừng bạn trở lại Nhật Ký Lập Trình.'}</p>
        <ApiStatus loading={status === 'loading'} error={sessionError} retry={refresh} />
        <form onSubmit={submit} className="post-editor auth-form">
          <fieldset disabled={busy || status === 'loading' || status === 'error'}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={change} />
            <label htmlFor="password">Mật khẩu</label>
            <input id="password" name="password" type="password" autoComplete={registering ? 'new-password' : 'current-password'} required minLength={registering ? 12 : undefined} maxLength={128} value={form.password} onChange={change} aria-describedby={registering ? 'password-help' : undefined} />
            {registering && <>
              <p id="password-help" className="auth-hint">Dùng 12–128 ký tự. Có thể dùng một cụm từ dài, dễ nhớ.</p>
              <label htmlFor="confirmation">Nhập lại mật khẩu</label>
              <input id="confirmation" name="confirmation" type="password" autoComplete="new-password" required maxLength={128} value={form.confirmation} onChange={change} />
            </>}
            <div className="post-actions"><button type="submit">{busy ? 'Đang xử lý…' : registering ? 'Đăng ký' : 'Đăng nhập'}</button></div>
          </fieldset>
          {error && <p role="alert" className="api-error">{error}</p>}
        </form>
        <p>{registering ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <Link to={registering ? '/login' : '/register'} state={{ from: destination }}>{registering ? 'Đăng nhập' : 'Đăng ký'}</Link>
        </p>
      </section>
    </div></main>
  );
}
