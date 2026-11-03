# Thực hành ASP.NET Core API + Axios + EF Core với web-blog

> Project đã bổ sung đăng ký/đăng nhập. Xem [AUTH-FLOW.vi.md](AUTH-FLOW.vi.md) cho cấu hình xác thực và cách gọi API ghi có cookie/CSRF.

## 1. Những gì thay đổi

Trước đây `Home.jsx`, `Blog.jsx`, `PostDetail.jsx` có các mảng bài viết riêng và `Tags.jsx` có số lượng giả lập. Hiện tại tất cả đọc cùng một database thông qua API. Tám bài viết cũ được giữ trong migration đầu tiên. Trang `/blog/new` dùng POST, `/blog/:id/edit` dùng PUT, nút xóa ở trang chi tiết dùng DELETE; các trang đọc dữ liệu dùng GET.

Luồng xử lý: **React → Axios → Controller → BlogDbContext → SQLite**. Backend trả JSON; React cập nhật giao diện sau khi request thành công.

| Thành phần | File |
| --- | --- |
| Cấu hình dịch vụ, kết nối database, CORS | `backend/WebBlog.Api/Program.cs` |
| Cấu hình theo môi trường | `backend/WebBlog.Api/appsettings.json` |
| Entity tương ứng bảng Posts | `backend/WebBlog.Api/Models/Post.cs` |
| DbContext, ánh xạ và dữ liệu mẫu | `backend/WebBlog.Api/Data/` |
| Kiểm tra input, giới hạn trường được ghi | `backend/WebBlog.Api/Contracts/PostRequest.cs` |
| Controller bài viết | `backend/WebBlog.Api/Controllers/PostsController.cs` |
| Controller thống kê tag | `backend/WebBlog.Api/Controllers/TagsController.cs` |
| Lịch sử thay đổi schema | `backend/WebBlog.Api/Migrations/` |
| Axios instance và thông báo lỗi | `src/api/client.js` |
| Bốn phương thức Axios | `src/api/posts.js` |
| Form tạo/sửa | `src/pages/PostEditor.jsx` |
| Kiểm thử API với database tạm | `scripts/smoke-api.py` |

## 2. Chạy bản đã có trong repository

Yêu cầu: **.NET SDK 10**, Node.js tương thích Vite 8 (khuyến nghị Node.js 24), npm. Python 3 chỉ cần khi chạy smoke test. Xác nhận `dotnet --version` và `node --version`. SQLite nằm trong package EF, không cần cài một dịch vụ database riêng.

Từ thư mục gốc repository, terminal thứ nhất:

```bash
dotnet tool restore
dotnet restore backend/WebBlog.Api
dotnet ef database update --project backend/WebBlog.Api
dotnet run --project backend/WebBlog.Api --launch-profile http
```

API: `http://localhost:5080/api/posts`. `database update` tạo `backend/WebBlog.Api/webblog.db` và áp dụng migration có sẵn. Không chạy `migrations add InitialCreate` lần nữa trên bản này.

Terminal thứ hai, cũng từ gốc repository:

```bash
npm ci
cp .env.example .env
npm run dev
```

Mở `http://localhost:5173/blog`, chọn **Tạo bài viết**, nhập nội dung và lưu. Trang chi tiết có **Sửa bài viết** và **Xóa bài viết**. Thử tải lại trang hoặc khởi động lại API để thấy dữ liệu vẫn tồn tại.

## 3. Hiểu cách tạo backend và cài EF Core

Các lệnh dưới đây giải thích cách dựng một project mới tương đương; **không chạy đè lên backend đã có**:

```bash
dotnet new webapi --use-controllers --framework net10.0 -o backend/WebBlog.Api
dotnet add backend/WebBlog.Api package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.14
dotnet add backend/WebBlog.Api package Microsoft.EntityFrameworkCore.Design --version 10.0.14
dotnet new tool-manifest
dotnet tool install dotnet-ef --version 10.0.14
```

- `Sqlite`: provider dịch truy vấn EF thành SQL cho SQLite.
- `Design`: hỗ trợ EF CLI tạo migration và khởi tạo DbContext ở thời điểm thiết kế.
- `dotnet-ef`: công cụ dòng lệnh, được ghim trong `.config/dotnet-tools.json` để mọi người dùng cùng phiên bản.
- SDK, EF provider, Design và CLI cần tương thích. Trong project này EF provider/Design/CLI cùng phiên bản 10.0.14.

`Post` là entity; `DbSet<Post>` đại diện tập bài viết; `SaveChangesAsync()` gửi INSERT/UPDATE/DELETE xuống database. `AsNoTracking()` phù hợp truy vấn chỉ đọc; khi sửa, EF theo dõi entity được tải ra và lưu các trường thay đổi.

## 4. Cấu hình kết nối database

Trong `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "BlogDatabase": "Data Source=webblog.db"
  }
}
```

Trong `Program.cs`, lấy cấu hình bằng `GetConnectionString("BlogDatabase")`, chuẩn hóa đường dẫn tương đối theo thư mục API, rồi đăng ký:

```csharp
builder.Services.AddDbContext<BlogDbContext>(options =>
    options.UseSqlite(connection.ToString()));
```

Dependency Injection cấp `BlogDbContext` cho controller. Không tạo connection database ở React.

Có thể ghi đè connection string bằng biến môi trường, ví dụ trên Fedora:

```bash
export ConnectionStrings__BlogDatabase='Data Source=/duong/dan/tuyet/doi/blog.db'
dotnet ef database update --project backend/WebBlog.Api
dotnet run --project backend/WebBlog.Api --launch-profile http
```

Thư mục chứa file phải tồn tại và tiến trình cần quyền ghi. Dùng cùng biến môi trường khi migration và khi chạy API để tránh tạo schema ở nhầm database. Dấu `__` trong biến môi trường tương ứng dấu `:` của cấu hình .NET.

SQLite không cần username/password. Nếu sau này dùng SQL Server/PostgreSQL, giữ mật khẩu ở environment hoặc .NET User Secrets; không commit vào git và không đặt trong biến `VITE_*` vì các biến đó được đưa vào frontend công khai.

**Nếu môn học yêu cầu SQL Server:** cài `Microsoft.EntityFrameworkCore.SqlServer` cùng phiên bản, đổi sang `UseSqlServer(...)`, bỏ xử lý `SqliteConnectionStringBuilder`, và cấu hình connection string SQL Server. Migration phụ thuộc provider; tạo bộ migration riêng cho SQL Server, không áp dụng nguyên migration SQLite. LocalDB chỉ phù hợp Windows; trên Fedora dùng SQL Server qua máy chủ/container tương thích. Đây là hướng chuyển đổi, không phải cấu hình đã được kiểm thử trong bản này.

## 5. Controllers và HTTP methods

`[ApiController]` bật kiểm tra model tự động, `[Route("api/posts")]` xác định prefix; mỗi action chọn method với `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]`. Controller kế thừa `ControllerBase`, trả dữ liệu JSON.

| Method | Endpoint | Kết quả thành công | Mục đích |
| --- | --- | --- | --- |
| GET | `/api/posts` | 200 + mảng bài viết | Danh sách mới nhất trước |
| GET | `/api/posts/{id}` | 200 + bài viết | Chi tiết |
| POST | `/api/posts` | 201 + bài viết + Location | Tạo mới |
| PUT | `/api/posts/{id}` | 200 + bài viết sau sửa | Thay toàn bộ trường có thể chỉnh sửa |
| DELETE | `/api/posts/{id}` | 204, không có body | Xóa |
| GET | `/api/tags` | 200 + `{name, count}[]` | Thống kê từ bài viết thực tế |

ID không tồn tại trả 404; input không hợp lệ trả 400 kèm `errors`. POST/PUT không nhận `id`, `author`, `authorId` hoặc `publishedAt` để ghi: server tạo ID và thời gian UTC, PUT giữ ngày đăng gốc. Các trường title/excerpt/content bắt buộc; tối đa 10 tag, mỗi tag 1–40 ký tự; tag trùng trong cùng bài được gộp không phân biệt hoa/thường.

Ví dụ body POST/PUT:

```json
{
  "title": "Học ASP.NET Core",
  "excerpt": "Kết nối React với API và SQLite.",
  "content": "<h2>Bài học đầu tiên</h2><p>Tôi đã tạo được API CRUD.</p>",
  "tags": ["ASP.NET Core", "EF Core"]
}
```

Ví dụ kiểm tra GET:

```bash
curl http://localhost:5080/api/posts

```

Các request POST/PUT/DELETE cần cookie đăng nhập và CSRF token. Dùng giao diện đã tích hợp hoặc xem `scripts/smoke-api.py` để kiểm tra với cookie jar.

## 6. Axios ở frontend

Cài bằng `npm install axios` (dependency đã nằm trong project). Tạo một instance dùng chung:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080/api',
  timeout: 10000,
  withCredentials: true,
});
```

Bốn thao tác trong `src/api/posts.js`:

```js
const list = await api.get('/posts');          // đọc list.data
const created = await api.post('/posts', body);
const updated = await api.put(`/posts/${id}`, body);
await api.delete(`/posts/${id}`);              // 204: không đọc dữ liệu bài viết
```

`body` là object JSON ở mục 5, `id` lấy từ bài viết/API. Mọi request có xử lý lỗi; form giữ nguyên input nếu lưu thất bại và chặn thao tác lặp khi đang gửi. Các request đọc được hủy khi component unmount hoặc chuyển sang ID khác. API lỗi không tự thay bằng dữ liệu mẫu, giúp nhận biết lỗi kết nối.

`VITE_API_BASE_URL` có hậu tố `/api`. Sửa `.env` rồi khởi động lại Vite. Frontend tại cổng 5173 và API tại 5080 là hai origin khác nhau nên cần CORS. `Cors:AllowedOrigins` chỉ cho phép đúng hai origin localhost/127.0.0.1 của Vite; `strictPort` tránh tự đổi cổng gây lỗi CORS. Không dùng CORS làm cơ chế xác thực.

Nội dung HTML từ database được lọc bằng DOMPurify trước khi dùng `dangerouslySetInnerHTML` để tránh thực thi script/handler do người nhập chèn vào.

## 7. Migration: tạo, áp dụng và thay đổi schema

Migration là mã C# mô tả thay đổi schema. EF so sánh model hiện tại với **ModelSnapshot**, không phải so trực tiếp với cấu trúc database đang chạy. `Up()` áp dụng thay đổi; `Down()` đảo ngược; bảng `__EFMigrationsHistory` ghi migration đã áp dụng.

Với project mới chưa có migration, sau khi tạo entity và DbContext:

```bash
dotnet ef migrations add InitialCreate --project backend/WebBlog.Api
dotnet ef database update --project backend/WebBlog.Api
```

Bản repository này đã có `InitialCreate` do EF CLI sinh. Nó tạo bảng Posts, index ngày đăng và chèn tám bài viết mẫu. `Tags` là collection string được EF lưu JSON trong cột TEXT của SQLite. API không gọi `EnsureCreated()` hay tự chạy migration mỗi lần khởi động.

Thực hành thay đổi tiếp theo, ví dụ thêm `public string? CoverImageUrl { get; set; }` vào `Post`:

```bash
dotnet ef migrations add AddCoverImageUrl --project backend/WebBlog.Api
# Mở migration mới, đọc Up/Down trước khi áp dụng.
dotnet ef database update --project backend/WebBlog.Api
dotnet ef migrations list --project backend/WebBlog.Api
dotnet ef migrations has-pending-model-changes --project backend/WebBlog.Api
```

Nếu muốn frontend gửi/đọc trường mới, cập nhật DTO và form tương ứng. Chỉ thêm cột database chưa tự thay đổi hợp đồng API.

Nếu migration mới **chưa áp dụng**, có thể bỏ bằng:

```bash
dotnet ef migrations remove --project backend/WebBlog.Api
```

Để rollback database **thử nghiệm** về migration trước, dùng `database update TEN_MIGRATION_TRUOC`, sau đó mới `migrations remove` nếu cần. `database update 0` chạy Down của toàn bộ migration, làm mất bảng/dữ liệu; chỉ dùng với database dùng một lần. Trước khi áp dụng trên dữ liệu quan trọng, sao lưu và đọc migration; thao tác đổi/xóa cột có thể mất dữ liệu.

Dữ liệu mẫu dùng `HasData` với ID/ngày cố định. Sửa bài viết bằng API không yêu cầu migration. Chỉ tạo migration khi thay đổi model hoặc dữ liệu mẫu được quản lý trong model.

## 8. Kiểm thử và lỗi thường gặp

```bash
npm run lint
npm run build
python3 scripts/smoke-api.py
```

Smoke test dùng database tạm: build, kiểm tra model/snapshot, apply/reapply migration, CRUD, validation, CORS, persistence sau restart, authentication, session, quyền sở hữu và CSRF, rồi rollback và apply lại. Không đụng `webblog.db` của bạn.

Mở DevTools → Network, quan sát GET khi vào blog, POST khi tạo, PUT khi sửa, DELETE khi xóa. Kiểm tra response code/body; thử bỏ trống tiêu đề, ngắt API, truy cập ID không tồn tại và nhấn Thử lại.

| Hiện tượng | Kiểm tra |
| --- | --- |
| `dotnet` không tồn tại hoặc không hỗ trợ net10.0 | Cài .NET SDK 10, kiểm tra PATH |
| `dotnet ef` không tồn tại | Chạy `dotnet tool restore` từ gốc repo |
| `no such table: Posts` | Chạy `dotnet ef database update`, kiểm tra connection string giống khi chạy API |
| Frontend báo không kết nối API | API đang chạy cổng 5080, URL `.env`, CORS và Vite cổng 5173 |
| 400 khi lưu | Xem `errors` trong response; kiểm tra trường bắt buộc và giới hạn tag |
| 401 / 403 khi tạo/sửa/xóa | Đăng nhập trước; chỉ chủ bài được sửa/xóa; bài mẫu chưa có chủ |
| Tags không còn số lượng cũ | Số lượng hiện được tính thật từ database |

## 9. Phạm vi bản thực hành

Project hiện có đăng ký/đăng nhập bằng cookie và quyền sở hữu bài viết. `DevelopmentWriteAttribute` đã được thay bằng `[Authorize]` và kiểm tra AuthorId. Các request ghi cần CSRF token; xem [AUTH-FLOW.vi.md](AUTH-FLOW.vi.md). Production cần HTTPS và cấu hình key ring/hosting phù hợp.

GET hiện trả toàn bộ bài viết và nội dung; phù hợp dữ liệu nhỏ của bài học. Blog lớn nên thêm phân trang, tách DTO danh sách/chi tiết và truy vấn tag phù hợp. Trang Liên hệ vẫn là phần giao diện hiện có, chưa có API gửi email. GitHub Pages chỉ phục vụ frontend tĩnh; backend ASP.NET Core cần host riêng và cấu hình URL API khi build frontend.

## Tài liệu chính thức

- ASP.NET Core Controllers: https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-10.0
- EF Core + SQLite: https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app
- EF migrations: https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/
- Cấu hình ASP.NET Core: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-10.0
- Axios: https://axios-http.com/docs/api_intro
