import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Tags from './pages/Tags';
import Contact from './pages/Contact';
import PostDetail from './pages/PostDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function NotFound() {
  return (
    <div className="max-w-[1120px] mx-auto px-gutter py-space-xl text-center">
      <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary bg-tertiary-fixed/60 px-space-xs py-0.5 rounded inline-block mb-space-md">
        Lỗi 404 — trang không tồn tại
      </span>
      <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight mb-space-md">
        Trang này chưa được ghi vào sổ
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant italic max-w-lg mx-auto mb-space-lg">
        Có vẻ đường dẫn bạn tìm chưa từng tồn tại trong cuốn nhật ký này.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary-container font-label-md text-label-md px-space-lg py-2 rounded hover:bg-primary hover:text-on-primary transition-all shadow-sm"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Quay về trang chủ
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background font-body-md text-body-md text-on-surface notebook-lines min-h-screen flex flex-col">
        <Header />

        <main className="w-full pt-20 bg-transparent flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<PostDetail />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;