# Bài 1 + Bài 2: đăng ký, đăng nhập và CRUD theo người dùng

## Kết quả bài tập

- Nhập email/password trên React, có xác nhận mật khẩu khi đăng ký.
- Validate ở frontend và backend; backend là nơi quyết định dữ liệu hợp lệ.
- Lưu user vào SQLite bằng EF Core, mật khẩu được hash có salt bằng `PasswordHasher<AppUser>`.
- Đăng nhập truy vấn user theo email chuẩn hóa, kiểm tra password bằng `VerifyHashedPassword`.
- React Context chia sẻ user và các hàm đăng ký/đăng nhập/đăng xuất cho toàn bộ ứng dụng.
- localStorage lưu `{id, email, createdAt}` sau khi đăng nhập thành công; không lưu password, password hash hay token xác thực.
- Cookie HttpOnly chứa ticket xác thực; bảng AuthSessions cho phép hết hạn và thu hồi phiên sau logout.
- Tải lại trang sẽ gọi `/api/auth/me` để xác minh phiên. Sửa localStorage không tạo được quyền đăng nhập.
- Kết hợp bài CRUD: khách được đọc, user đăng nhập được tạo bài, chỉ chủ bài được sửa/xóa.

## Chạy project

Yêu cầu .NET SDK 10, Node.js 24 và npm; Python 3 cho bộ kiểm thử. Trên Fedora có thể cài SDK bằng `sudo dnf install dotnet-sdk-10.0`. Chỉ cài `dotnet-host` chưa đủ để build/chạy project.

Tại thư mục gốc repository:

```bash
dotnet tool restore
dotnet restore backend/WebBlog.Api
dotnet ef database update --project backend/WebBlog.Api
dotnet run --project backend/WebBlog.Api --launch-profile http
```

Ở terminal thứ hai, cũng tại gốc repository:

```bash
npm ci
# Chỉ tạo .env nếu bạn chưa có; giữ cấu hình riêng nếu đã có.
[ -f .env ] || cp .env.example .env
npm run dev
```

Mở **http://localhost:5173**. API chạy **http://localhost:5080**. Dùng cùng hostname: localhost ở cả hai phía. Nếu mở frontend bằng 127.0.0.1, đổi `VITE_API_BASE_URL` thành `http://127.0.0.1:5080/api` và khởi động lại Vite. localhost và 127.0.0.1 không chia sẻ cookie; chỉ sửa CORS chưa giải quyết được vấn đề này.

`.config/dotnet-tools.json` và `.env.example` là file ẩn trên Linux. Khi copy project bằng trình quản lý file, bật Ctrl+H để không bỏ sót. Kiểm tra `dotnet --list-sdks`, `dotnet --list-runtimes` nếu không chạy được SDK.

## Luồng đăng ký

1. Vào `/register`, nhập email, password (12–128 ký tự) và nhập lại password.
2. Browser kiểm tra required, định dạng email và độ dài; React kiểm tra hai password khớp nhau.
3. `AuthContext.register()` gọi `authApi.register()`, Axios POST `/api/auth/register`.
4. Axios lấy CSRF token của phiên hiện tại qua GET `/api/auth/csrf`, gửi lại trong header `X-CSRF-TOKEN` cùng cookie.
5. ASP.NET Core validate DTO. Email được trim; password không bị trim. Email được chuẩn hóa bằng `ToUpperInvariant()` để tìm kiếm/kiểm tra trùng không phân biệt hoa thường.
6. Controller kiểm tra email, hash password rồi lưu Users. Unique index trên NormalizedEmail xử lý cả trường hợp hai request cùng đăng ký một email.
7. Backend tạo AuthSession, phát cookie HttpOnly và trả `201` với `{id,email,createdAt}`. Đăng ký thành công đồng thời đăng nhập.
8. Context cập nhật user và lưu bản sao thông tin vào localStorage, rồi chuyển tới trang tài khoản hoặc trang người dùng đang muốn truy cập.

Email trùng trả `409`. Dữ liệu không hợp lệ trả `400` với validation errors. Địa chỉ email chưa được xác minh qua email; đây là phần ngoài phạm vi bài tập.

## Luồng đăng nhập

1. Vào `/login`, gửi email/password bằng Axios.
2. Backend query Users qua NormalizedEmail; dùng `VerifyHashedPassword` so khớp password nhập vào với PasswordHash đã lưu.
3. Không tìm thấy user hoặc password sai đều trả cùng thông báo `401`: “Email hoặc mật khẩu không đúng.”
4. Thành công: tạo phiên 8 giờ, đặt cookie và trả thông tin user. Password/hash không xuất hiện trong response.
5. Context cập nhật; Header hiện email, trang `/account` hiển thị tài khoản.

Không dùng `password == user.PasswordHash`, không hash bằng SHA256 thuần và không lưu password rõ. PasswordHasher quản lý salt/định dạng hash, và hỗ trợ rehash khi cần nâng cấp tham số.

Register và login có rate limit mặc định **30 request/phút/IP**; vượt trả 429. Nếu đặt sau proxy, cần cấu hình forwarded headers và trusted proxies đúng để nhận IP thật. Không tăng giới hạn này chỉ để bỏ qua lỗi đăng nhập.

## Context, localStorage và cookie: mỗi phần làm gì?

| Thành phần | Dữ liệu / trách nhiệm |
| --- | --- |
| `AuthProvider` | State user, status, error; login/register/logout/refresh; đồng bộ các component |
| `localStorage['webblog.user']` | Bản sao ID, email, thời gian tạo; giúp lưu thông tin user giữa các lần tải trang |
| Cookie `WebBlog.Auth` | Ticket được bảo vệ bởi ASP.NET Core Data Protection; HttpOnly, SameSite=Strict, hết hạn sau 8 giờ |
| Database `AuthSessions` | Kiểm tra session còn tồn tại và chưa hết hạn ở mỗi request có cookie xác thực |
| `/api/auth/me` | Nguồn xác nhận user hiện tại từ server |

AuthProvider có bốn trạng thái: loading, authenticated, anonymous, error. Đọc được user từ localStorage **không** đồng nghĩa authenticated. Khi khởi động, RequireAuth đợi `/me`:

- 200: cập nhật user bằng dữ liệu server.
- 401: xóa user khỏi Context/localStorage và chuyển về đăng nhập khi truy cập trang bảo vệ.
- Mất mạng/500: hiện lỗi và nút Thử lại, không cho vào trang bảo vệ bằng cache cũ.

Code xử lý localStorage chứa JSON hỏng hoặc bị trình duyệt chặn. Khi tab khác đăng nhập/đăng xuất, sự kiện `storage` kích hoạt xác minh lại với server; khi quay lại tab, cũng xác minh lại. Request CRUD nhận 401 sẽ xóa trạng thái đăng nhập. Context không lưu password.

Ví dụ sử dụng trong component:

```jsx
const { user, isAuthenticated, login, logout } = useAuth();

await login({ email, password });
// Header được render lại nhờ Context.
// localStorage chứa user an toàn, cookie được browser quản lý.

await logout();
// Server thu hồi phiên hiện tại, browser xóa cookie,
// Context và localStorage xóa user.
```

Cookie đăng nhập đặt HttpOnly nên JavaScript không đọc được. Browser gửi nó nhờ `withCredentials: true`; CORS backend cho phép credentials ở những origin được khai báo. CSRF token chỉ dùng trong request, không lưu localStorage. Axios lấy token mới trước mỗi thao tác ghi để tránh dùng token của danh tính cũ sau login/logout.

## Đăng xuất và hết hạn

`POST /api/auth/logout` xóa session hiện tại trong DB và xóa cookie. Ngay cả nếu sao chép cookie cũ trước logout rồi gửi lại, server cũng từ chối vì session đã bị thu hồi. Logout nhiều lần được phép. Phiên trên thiết bị khác vẫn hoạt động độc lập.

Sau 8 giờ, cookie/session hết hạn và `/me` trả 401. API restart vẫn giữ phiên khi database và Data Protection key ring còn nguyên. Khi triển khai thật, lưu key ring bền vững, bảo vệ quyền truy cập và cấu hình HTTPS; không xóa key ring ở mỗi lần restart.

## Endpoint và kiểm tra quyền

| Method | Endpoint | Thành công | Lỗi chính |
| --- | --- | --- | --- |
| GET | `/api/auth/csrf` | 200 token + cookie CSRF | — |
| POST | `/api/auth/register` | 201 user + cookie đăng nhập | 400 input/CSRF, 409 email trùng, 429 |
| POST | `/api/auth/login` | 200 user + cookie đăng nhập | 400 input/CSRF, 401 credentials, 429 |
| GET | `/api/auth/me` | 200 user | 401 thiếu/hết hạn phiên |
| POST | `/api/auth/logout` | 204 | 400 CSRF |
| GET | `/api/posts`, `/api/posts/{id}`, `/api/tags` | 200 | 404 ID không có |
| POST | `/api/posts` | 201 | 401 chưa login, 400 input/CSRF |
| PUT / DELETE | `/api/posts/{id}` | 200 / 204 | 401 chưa login, 403 không phải chủ bài, 404, 400 CSRF |

Body register/login:

```json
{ "email": "student@example.com", "password": "My long passphrase 2026!" }
```

Body tạo/sửa bài chỉ gồm `title`, `excerpt`, `content`, `tags`. Server lấy AuthorId và Author từ người đã xác thực, không nhận quyền sở hữu do client tự khai. Frontend ẩn nút sửa/xóa của bài người khác; backend vẫn kiểm tra quyền dù gọi API trực tiếp.

## Database và migration

Migration mới `AddUsersSessionsAndPostOwnership` tạo Users, AuthSessions và thêm AuthorId nullable vào Posts. Migration đầu tiên được giữ nguyên. Chạy `database update` để nâng cấp database hiện có, **không xóa webblog.db và không tạo lại InitialCreate**.

- Users: Id, Email, NormalizedEmail (unique), PasswordHash, CreatedAt.
- AuthSessions: Id, UserId (FK), ExpiresAt.
- Posts: thêm AuthorId (FK nullable); Author dùng email của người tạo mới.

Tám bài mẫu và các bài cũ chưa có chủ sở hữu vẫn đọc được, nhưng không user mới nào được tự nhận quyền sửa/xóa. Để demo CRUD sau login, tạo một bài mới bằng tài khoản vừa đăng ký.

## File nên đọc theo thứ tự

1. `Models/AppUser.cs`, `Models/AuthSession.cs`, `Data/BlogDbContext.cs` — dữ liệu.
2. `Contracts/AuthRequests.cs`, `UserResponse.cs` — hợp đồng input/output.
3. `Controllers/AuthController.cs` — register, query user, verify password, sign-in/out.
4. `Auth/SessionCookieEvents.cs`, `Auth/ValidateCsrfFilter.cs`, `Program.cs` — xác thực request và cấu hình.
5. `src/api/auth.js`, `src/api/client.js` — Axios, credentials, CSRF, xử lý lỗi.
6. `src/auth/AuthProvider.jsx`, `AuthContext.js`, `userStorage.js` — Context và localStorage.
7. `src/auth/RequireAuth.jsx`, `src/pages/AuthPage.jsx`, `Account.jsx` — giao diện và route protection.
8. `Controllers/PostsController.cs`, `PostEditor.jsx`, `PostDetail.jsx` — tích hợp quyền sở hữu với bài CRUD.

## Kịch bản demo / nghiệm thu

1. Chưa đăng nhập, mở `/blog/new`: chuyển đến `/login`.
2. Chọn Đăng ký, thử password ngắn và hai password không khớp; nhập hợp lệ để tạo tài khoản.
3. Thành công sẽ quay về trang tạo bài, Header hiện email. Tạo/sửa/xóa một bài mới.
4. DevTools → Application → Local Storage: xem `webblog.user`; không có password/token.
5. Reload: vẫn đăng nhập nhờ cookie và `/me`.
6. Đăng xuất tại `/account`; dữ liệu user bị xóa. Truy cập `/account` lại phải đăng nhập.
7. Nhập sai password: hiện lỗi; email đúng + password đúng: đăng nhập thành công.
8. Đăng ký lại email với chữ hoa/thường khác nhau: bị từ chối.
9. Dùng tài khoản B thử sửa bài của A: UI không cho, API trả 403.
10. Xóa cookie nhưng tự thêm `webblog.user` giả: reload vẫn bị đưa về đăng nhập và cache giả bị xóa.
11. Ngắt API rồi reload trang tài khoản: có lỗi kết nối và Thử lại, không tự xác thực bằng localStorage.

Kiểm thử tự động:

```bash
npm run lint
npm run build
python3 scripts/smoke-api.py
```

Script dùng database tạm; kiểm thử CRUD, hashing, duplicate/race đăng ký, login sai/đúng, session expiry/revocation, CORS, CSRF, rate limit, migration nâng cấp/rollback và bảo toàn dữ liệu cũ. Không sửa database bạn đang dùng.

Kiểm thử trình duyệt (Playwright, tự khởi động API/Vite trên cổng tạm và dùng database riêng):

```bash
npx playwright install chromium
npm run test:browser
```

Bộ này kiểm tra form đăng ký, password không khớp, email trùng, login sai/đúng, logout giữa hai tab, Context/localStorage sau reload, JSON hỏng, cache giả khi không có cookie, API mất kết nối/Thử lại, quyền sở hữu, CRUD và layout mobile. Nếu thiếu thư viện hệ thống để chạy Chromium, xem thông báo Playwright và cài các thư viện tương ứng cho hệ điều hành. Không cần đổi URL/cổng project để chạy bài test.

## Giới hạn triển khai

Đã hoàn thành luồng email/password phục vụ bài tập. Chưa có xác minh email, quên/đổi mật khẩu, MFA hay vai trò quản trị. Production phải dùng HTTPS (cookie được đặt Secure ngoài Development), origin/CORS đúng và key ring bền vững. Cấu hình hiện tại dùng cùng site; không mở rộng sang frontend/backend khác site bằng cách tắt CSRF hoặc dùng origin `*`.

## Tài liệu chính thức

- Cookie authentication: https://learn.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-10.0
- CSRF: https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-10.0
- PasswordHasher: https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.identity.passwordhasher-1
- React useContext: https://react.dev/reference/react/useContext
