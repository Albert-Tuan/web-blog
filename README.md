```markdown
# Nhật Ký Lập Trình — DevDiary

Blog cá nhân ghi lại hành trình tự học lập trình từ con số 0, kèm công cụ quản lý việc học: lộ trình, sổ tay lỗi, snippet code và theo dõi tiến độ mỗi ngày.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## Giới thiệu

Đây là blog cá nhân của tôi — nơi tôi ghi lại hành trình tự học lập trình và đồng thời dùng chính blog này như một **công cụ học tập cá nhân**. Không chỉ để đọc, website còn giúp tôi:

- Ghi lại **nhật ký học tập** mỗi ngày: hôm nay học gì, làm gì, gặp khó khăn gì.
- Viết và chia sẻ **bài viết kinh nghiệm** về lập trình web (React, JavaScript, CSS...).
- Lưu lại các **dự án nhỏ** đã hoàn thành.
- Ghi lại **lỗi sai và cách khắc phục** để tra cứu lại khi gặp lỗi tương tự.
- Lưu **snippet code** tái sử dụng, phân loại theo ngôn ngữ.
- Chia sẻ **tips & tricks** cho developers.

## Công nghệ sử dụng

- **Frontend**: React.js + Vite
- **Routing**: React Router v7
- **Styling**: CSS3 (Retro/Vintage style)
- **Backend**: ASP.NET Core 10 controllers + EF Core 10 + SQLite
- **HTTP client**: Axios
- **Deploy**: Frontend có thể host tĩnh; backend cần host ASP.NET Core riêng

## Chạy full-stack (React + ASP.NET Core + EF Core)

Yêu cầu .NET SDK 10 và Node.js 24. Backend dùng SQLite, không cần dịch vụ database riêng.

Terminal 1, từ thư mục gốc:

```bash
dotnet tool restore
dotnet restore backend/WebBlog.Api
dotnet ef database update --project backend/WebBlog.Api
dotnet run --project backend/WebBlog.Api --launch-profile http
```

Terminal 2, từ thư mục gốc:

```bash
npm ci
cp .env.example .env
npm run dev
```

Mở http://localhost:5173/blog. API: http://localhost:5080/api/posts.
Đăng ký tại `/register`, đăng nhập tại `/login`, xem tài khoản/đăng xuất tại `/account`.
User đăng nhập được tạo bài tại `/blog/new` và sửa/xóa bài của mình. Tám bài viết mẫu được giữ trong database qua migration và chỉ đọc vì chưa có chủ sở hữu.

**[Bài tập đăng ký/đăng nhập: Context, localStorage, database và phân quyền CRUD](docs/AUTH-FLOW.vi.md)**

**[Hướng dẫn tiếng Việt: Controllers, Axios, database và EF migrations](docs/ASP-NET-CORE-EF-CORE.vi.md)**

Kiểm tra: `npm run lint`, `npm run build`, `python3 scripts/smoke-api.py`.
Smoke test tự tạo database tạm để kiểm thử HTTP CRUD, auth, session, CSRF, quyền sở hữu và migration.
Kiểm thử trình duyệt: `npx playwright install chromium`, sau đó `npm run test:browser` (API/Vite/database tạm được tạo tự động).

Xác thực dùng cookie HttpOnly + session trong database; React Context/localStorage chỉ giữ thông tin user. Password được hash, các request ghi có CSRF protection, sửa/xóa bài kiểm tra chủ sở hữu. Production cần HTTPS và Data Protection key ring bền vững. Chưa có xác minh email hoặc quên mật khẩu. GitHub Pages chỉ host frontend; API cần môi trường chạy ASP.NET Core riêng.

## Cấu trúc thư mục

```
src/
├── components/     # Reusable components (Header, Footer, PostCard)
├── pages/          # Page components (Home, About, Blog, Tags, Contact)
├── assets/         # Static assets
├── App.jsx         # Main App with Routing
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Các trang trong website

| Route | Mô tả |
|-------|--------|
| `/` | Trang chủ |
| `/about` | Giới thiệu về blog |
| `/blog` | Danh sách tất cả bài viết |
| `/blog/:id` | Chi tiết bài viết và xóa |
| `/blog/new` | Tạo bài viết (POST) |
| `/blog/:id/edit` | Sửa bài viết (PUT) |
| `/tags` | Trang danh sách tags |
| `/contact` | Trang liên hệ |
| `/register` | Đăng ký và đăng nhập tự động |
| `/login` | Đăng nhập |
| `/account` | Tài khoản và đăng xuất |

## React Router

Project sử dụng React Router v7 để quản lý navigation:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Design

Blog có phong cách **Retro/Vintage** với:
- Màu sắc ấm áp (nâu, kem, vàng nhạt)
- Font chữ serif cho nội dung
- Hiệu ứng giấy ruled như sổ tay
- Border và shadow mềm mại

## Định hướng mở rộng

Các module dưới đây thuộc phạm vi ý tưởng đề tài và sẽ được bổ sung sau khi hoàn thiện phần blog + CRUD hiện tại:

- **Nhật ký học tập**: entry theo ngày, chế độ private/public.
- **Lộ trình học**: milestone + task, theo dõi % tiến độ, chia sẻ công khai.
- **Sổ tay lỗi**: lưu lỗi + cách sửa, gắn tag, tìm kiếm lại.
- **Snippet code**: lưu đoạn code tái sử dụng, phân loại theo ngôn ngữ.
- **Theo dõi tiến độ**: streak, giờ học, biểu đồ tuần/tháng.
- **Xác thực & phân quyền**: đăng nhập, phân biệt User / Admin trước khi dùng công khai.

## Tác giả

**Albert Tuan**
- GitHub: [@Albert-Tuan](https://github.com/Albert-Tuan)

## License

MIT License - feel free to use for your own blog!

---

⭐ Nếu bạn thấy project này hữu ích, hãy cho mình một star!
