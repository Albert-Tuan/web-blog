# 📔 Nhật Ký Lập Trình

Blog cá nhân ghi lại hành trình tự học lập trình từ con số 0.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## 🎯 Giới thiệu

Đây là blog cá nhân của tôi, nơi tôi ghi lại:
- Những bài học về lập trình web (React, JavaScript, CSS...)
- Các dự án nhỏ đã hoàn thành
- Những lỗi sai và cách khắc phục
- Tips & tricks cho developers

## 🛠️ Công nghệ sử dụng

- **Frontend**: React.js + Vite
- **Routing**: React Router v6
- **Styling**: CSS3 (Retro/Vintage style)
- **Deploy**: GitHub Pages

## 🚀 Cách chạy project

```bash
# Clone repository
git clone https://github.com/Albert-Tuan/web-blog.git
cd web-blog

# Install dependencies
npm install

# Chạy development server
npm run dev
```

Truy cập http://localhost:5173 để xem website.

## 📂 Cấu trúc thư mục

```
src/
├── components/     # Reusable components (Header, Footer, PostCard)
├── pages/          # Page components (Home, About, Blog, Tags, Contact)
├── assets/         # Static assets
├── App.jsx         # Main App with Routing
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## 🌐 Các trang trong website

| Route | Mô tả |
|-------|--------|
| `/` | Trang chủ |
| `/about` | Giới thiệu về blog |
| `/blog` | Danh sách tất cả bài viết |
| `/blog/:id` | Chi tiết bài viết |
| `/tags` | Trang danh sách tags |
| `/contact` | Trang liên hệ |

## 📝 React Router

Project sử dụng React Router v6 để quản lý navigation:

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

## 🎨 Design

Blog có phong cách **Retro/Vintage** với:
- Màu sắc ấm áp (nâu, kem, vàng nhạt)
- Font chữ serif cho nội dung
- Hiệu ứng giấy ruled như sổ tay
- Border và shadow mềm mại

## 👤 Tác giả

**Albert Tuan**
- GitHub: [@Albert-Tuan](https://github.com/Albert-Tuan)

## 📄 License

MIT License - feel free to use for your own blog!

---

⭐ Nếu bạn thấy project này hữu ích, hãy cho mình một star!
