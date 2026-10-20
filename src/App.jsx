import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Tags from './pages/Tags';
import Contact from './pages/Contact';
import PostDetail from './pages/PostDetail';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page - http://localhost:5173/ */}
        <Route path="/" element={<Home />} />
        
        {/* About page - http://localhost:5173/about */}
        <Route path="/about" element={<About />} />
        
        {/* Blog list page - http://localhost:5173/blog */}
        <Route path="/blog" element={<Blog />} />
        
        {/* Single post page - http://localhost:5173/blog/:id */}
        <Route path="/blog/:id" element={<PostDetail />} />
        
        {/* Tags page - http://localhost:5173/tags */}
        <Route path="/tags" element={<Tags />} />
        
        {/* Contact page - http://localhost:5173/contact */}
        <Route path="/contact" element={<Contact />} />
        
        {/* 404 - Not Found */}
        <Route path="*" element={
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            minHeight: '100vh'
          }}>
            <h1>404 - Trang không tìm thấy</h1>
            <p>Trang bạn đang tìm kiếm không tồn tại.</p>
            <a href="/">← Quay về trang chủ</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
