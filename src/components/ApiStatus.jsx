export default function ApiStatus({ loading, error, retry }) {
  if (loading) return <p role="status">Đang tải dữ liệu…</p>;
  if (error) return (
    <div role="alert" className="api-error">
      <p>{error}</p>
      {retry && <button type="button" onClick={retry}>Thử lại</button>}
    </div>
  );
  return null;
}
