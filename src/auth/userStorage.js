export const USER_STORAGE_KEY = 'webblog.user';

export function readCachedUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
    if (user && Number.isInteger(user.id) && user.id > 0 && typeof user.email === 'string' && typeof user.createdAt === 'string')
      return { id: user.id, email: user.email, createdAt: user.createdAt };
  } catch { /* Corrupt JSON or storage disabled: the API remains authoritative. */ }
  return null;
}

export function cacheUser(user) {
  try {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ id: user.id, email: user.email, createdAt: user.createdAt }));
    else localStorage.removeItem(USER_STORAGE_KEY);
  } catch { /* Login still works with cookies if localStorage is unavailable. */ }
}
