// Shared content data for the journal.
// Kept inline (no backend yet) but centralised so Home / Blog / PostDetail
// all render from one source of truth.

export const AUTHOR = {
  name: 'Albert Tuấn',
  shortName: 'Albert',
  role: 'Self-taught Developer',
  motto: 'Learn in Public • Build small things • Never stop questioning',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDmOUXeMv4Eeuq7BdYKD5k-Tgm4dmfL_jU2SZOhurHvaU-dlgBgX9tze1JJTitmm23GMQDLGpfaKQkY4h1kT1buDEoma82ImNBm-8g_zXk4xzd9A8qFNBI9hiwt-GJpHaBn-QC8jlvEUvfEwGjKoQ5DLBG612AFi62io14e98qKwL6xz7tTZ10jS1I2CjKWNbRKGfoTCAsRNEiznwPbn1P32kkyatvTBKO5nT_Fr7Cf7WUgzf48w7Xk',
  github: 'https://github.com/Albert-Tuan',
  email: 'albert.tuan@email.com',
  location: 'Hà Nội, VN',
  since: '01.2024',
};

export const LOGO =
  'https://lh3.googleusercontent.com/aida/AEtjO1UJ3v3rNRib8TIcnDa8DipBPJuw-rhxISW3RNdj1JtGC2w9XZqnYTIkNSIk8f3rgOsy7W70OvrzkFm_cAzNCfXO1w2JIwmubEGXB_TcOyDq97jrhq-nQ92uab6gSFVZZxFG-U9X0OgYXR-tdDWCRde4QAB4HmkUcpvFmWyXKvhIaPcgXasWHVnW1vb3Wi0NqeCwusRUc4kI96HkspgJUAL8weYdC4DqGHqnLloLewzbm5oW6E7YXd6vvQ';

export const posts = [
  {
    id: 1,
    slug: 'ngay-dau-tien-voi-react',
    code: 'REACT-001',
    title: 'Ngày đầu tiên với React.js',
    date: '15/10/2024',
    author: 'Albert Tuấn',
    excerpt:
      'Hôm nay tôi bắt đầu hành trình học React. Component, JSX, state... bao nhiêu thứ mới lạ!',
    tags: ['React', 'JavaScript', 'Cơ bản', 'Frontend'],
    readTime: 5,
    commits: 12,
    comments: 12,
    volume: 'Tập I: Nền tảng',
    category: 'Học tập • React.js',
    featured: true,
  },
  {
    id: 2,
    slug: 'css-flexbox-khong-kho',
    code: 'CSS-002',
    title: 'CSS Flexbox không khó như bạn nghĩ',
    date: '18/10/2024',
    author: 'Albert Tuấn',
    excerpt:
      'Sau nhiều ngày vật lộn với float và grid, cuối cùng tôi cũng hiểu Flexbox rồi! Chia sẻ cách tôi học nó.',
    tags: ['CSS', 'Flexbox', 'Layout'],
    readTime: 7,
    commits: 8,
    comments: 5,
    volume: 'Tập I: Nền tảng',
    category: 'Thiết kế • CSS',
  },
  {
    id: 3,
    slug: 'git-github-cho-nguoi-moi',
    code: 'GIT-003',
    title: 'Git & GitHub cho người mới bắt đầu',
    date: '22/10/2024',
    author: 'Albert Tuấn',
    excerpt:
      'Commit, push, pull, merge... Tưởng khó hoá ra dễ! Ghi chú lại những lệnh Git cơ bản tôi hay dùng.',
    tags: ['Git', 'GitHub', 'Version Control', 'Tools'],
    readTime: 6,
    commits: 15,
    comments: 9,
    volume: 'Tập I: Nền tảng',
    category: 'Công cụ • Git',
  },
  {
    id: 4,
    slug: 'tu-xay-blog-ca-nhan',
    code: 'PROJ-004',
    title: 'Tự xây blog cá nhân với React',
    date: '25/10/2024',
    author: 'Albert Tuấn',
    excerpt:
      'Để ôn lại kiến thức, tôi quyết định làm một blog cá nhân. Và đây là nhật ký hành trình!',
    tags: ['Project', 'React', 'Blog'],
    readTime: 9,
    commits: 24,
    comments: 7,
    volume: 'Tập II: Thực chiến',
    category: 'Dự án • Blog',
    featured: true,
  },
  {
    id: 5,
    slug: 'hoc-javascript-qua-5-tro-choi',
    code: 'JS-005',
    title: 'Học JavaScript qua 5 trò chơi nhỏ',
    date: '28/10/2024',
    author: 'Albert Tuấn',
    excerpt:
      'Không có gì thú vị hơn việc học code qua game! Giới thiệu 5 trang web giúp học JS một cách vui vẻ.',
    tags: ['JavaScript', 'Game', 'Học tập'],
    readTime: 4,
    commits: 6,
    comments: 14,
    volume: 'Tập I: Nền tảng',
    category: 'Học tập • JavaScript',
  },
  {
    id: 6,
    slug: 'async-await-la-gi',
    code: 'JS-006',
    title: 'Async/Await là gì vậy?',
    date: '01/11/2024',
    author: 'Albert Tuấn',
    excerpt:
      'Callback, Promise, Async/Await - trời ơi sao JavaScript có nhiều cách xử lý bất đồng bộ thế!',
    tags: ['JavaScript', 'Async', 'Nâng cao'],
    readTime: 8,
    commits: 11,
    comments: 6,
    volume: 'Tập II: Thực chiến',
    category: 'Học tập • JavaScript',
  },
  {
    id: 7,
    slug: 'tim-hieu-api-restful',
    code: 'API-007',
    title: 'Tìm hiểu về API và RESTful',
    date: '05/11/2024',
    author: 'Albert Tuấn',
    excerpt: 'GET, POST, PUT, DELETE - những HTTP methods cơ bản mà developer nào cũng cần biết.',
    tags: ['API', 'REST', 'Backend'],
    readTime: 10,
    commits: 18,
    comments: 3,
    volume: 'Tập II: Thực chiến',
    category: 'Backend • API',
  },
  {
    id: 8,
    slug: '5-vscode-extensions',
    code: 'TOOL-008',
    title: '5 VS Code extensions giúp tôi code nhanh hơn',
    date: '10/11/2024',
    author: 'Albert Tuấn',
    excerpt:
      'Những extension không thể thiếu cho React developer: Prettier, ESLint, Auto Rename Tag...',
    tags: ['VS Code', 'Tools', 'Productivity'],
    readTime: 5,
    commits: 7,
    comments: 11,
    volume: 'Tập III: Công cụ',
    category: 'Công cụ • Editor',
  },
];

export const tags = [
  { name: 'React', count: 12 },
  { name: 'JavaScript', count: 18 },
  { name: 'CSS', count: 8 },
  { name: 'Git', count: 5 },
  { name: 'GitHub', count: 4 },
  { name: 'Node.js', count: 7 },
  { name: 'Python', count: 6 },
  { name: 'API', count: 4 },
  { name: 'REST', count: 3 },
  { name: 'Flexbox', count: 3 },
  { name: 'Layout', count: 5 },
  { name: 'Backend', count: 8 },
  { name: 'Frontend', count: 10 },
  { name: 'Database', count: 4 },
  { name: 'MongoDB', count: 3 },
  { name: 'VS Code', count: 2 },
  { name: 'Tools', count: 6 },
  { name: 'Productivity', count: 4 },
  { name: 'Cơ bản', count: 15 },
  { name: 'Nâng cao', count: 7 },
  { name: 'Project', count: 9 },
  { name: 'Blog', count: 3 },
  { name: 'Game', count: 2 },
  { name: 'Học tập', count: 5 },
  { name: 'Async', count: 3 },
  { name: 'Version Control', count: 5 },
  { name: 'Docker', count: 2 },
  { name: 'TypeScript', count: 4 },
];

export const roadmap = [
  {
    title: 'JavaScript nâng cao & ES6+',
    detail: 'Closures, async patterns, module system',
    progress: 78,
    status: 'in_progress',
    icon: 'javascript',
  },
  {
    title: 'React Hooks chuyên sâu',
    detail: 'useReducer, custom hooks, context API',
    progress: 55,
    status: 'in_progress',
    icon: 'widgets',
  },
  {
    title: 'Node.js & REST API',
    detail: 'Express, JWT, PostgreSQL',
    progress: 32,
    status: 'in_progress',
    icon: 'dns',
  },
  {
    title: 'CSS Architecture',
    detail: 'Tailwind, design tokens, responsive',
    progress: 90,
    status: 'done',
    icon: 'palette',
  },
  {
    title: 'Testing & CI/CD',
    detail: 'Vitest, Playwright, GitHub Actions',
    progress: 12,
    status: 'planned',
    icon: 'science',
  },
];

export const skills = [
  { name: 'JavaScript / TypeScript', level: 78 },
  { name: 'React & Ecosystem', level: 70 },
  { name: 'CSS & Design Systems', level: 82 },
  { name: 'Node.js & REST', level: 45 },
  { name: 'Git & CI/CD', level: 55 },
];

export const timeline = [
  {
    period: '01.2024',
    title: 'Bước đầu chạm chân vào web',
    detail: 'Mở trình duyệt lần đầu, học HTML & CSS cơ bản qua freeCodeCamp.',
  },
  {
    period: '03.2024',
    title: 'Chinh phục JavaScript',
    detail: 'Hiểu rõ biến, hàm, vòng lặp, DOM và bắt đầu thực hành với dự án nhỏ.',
  },
  {
    period: '06.2024',
    title: 'Va chạm React.js',
    detail: 'Component, JSX, State & Props. Viết lại trang blog cá nhân lần đầu tiên.',
  },
  {
    period: '09.2024',
    title: 'Biết Git và GitHub',
    detail: 'Dự án đầu tiên được public, học cách viết commit message rõ ràng.',
  },
  {
    period: '11.2024',
    title: 'Mở sổ tay Nhật Ký Lập Trình',
    detail: 'Quyết định chia sẻ hành trình học tập công khai cho cộng đồng.',
  },
];

export function findPost(id) {
  return posts.find((p) => p.id === Number(id));
}

export function adjacentPosts(id) {
  const index = posts.findIndex((p) => p.id === Number(id));
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function allTagNames() {
  return [...new Set(posts.flatMap((p) => p.tags))].sort();
}