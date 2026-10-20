import { useState } from 'react';
import { AUTHOR } from '../data/content';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'feedback',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
  };

  const INFO_CARDS = [
    {
      icon: 'mail',
      label: 'Email',
      value: AUTHOR.email,
      href: `mailto:${AUTHOR.email}`,
      color: 'text-primary bg-primary-container/20',
    },
    {
      icon: 'code',
      label: 'GitHub',
      value: 'github.com/Albert-Tuan',
      href: AUTHOR.github,
      color: 'text-on-surface bg-surface-container-high',
    },
    {
      icon: 'rss_feed',
      label: 'RSS Feed',
      value: '/rss.xml',
      href: '#',
      color: 'text-secondary bg-secondary-container/20',
    },
    {
      icon: 'location_on',
      label: 'Vị trí',
      value: AUTHOR.location,
      href: null,
      color: 'text-tertiary bg-tertiary-fixed/20',
    },
  ];

  const FAQS = [
    {
      q: 'Tôi có thể hợp tác viết bài chung với bạn không?',
      a: 'Hoàn toàn có thể! Gửi email cho tôi với subject "Hợp tác viết bài" và chúng ta sẽ bàn luận chi tiết.',
    },
    {
      q: 'Mình muốn đóng góp sửa lỗi trong bài viết thì làm sao?',
      a: 'Bạn có thể gửi PR trên GitHub hoặc dùng form liên hệ bên dưới với subject "Góp ý bài viết".',
    },
    {
      q: 'Mình muốn đặt câu hỏi về bài viết cụ thể?',
      a: 'Để lại bình luận bên dưới bài viết hoặc gửi email trực tiếp — tôi sẽ trả lời sớm nhất có thể.',
    },
  ];

  return (
    <div className="max-w-[1120px] mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
      {/* Dispatch banner */}
      <div className="relative bg-surface-container-low p-space-lg rounded-xl shadow-sm overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-primary-fixed/30 blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-space-xs text-primary mb-space-xs">
              <span className="material-symbols-outlined text-[20px]">mark_as_unread</span>
              <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-bold">
                Bưu Cục Kỹ Thuật Số § Số Hiệu 404
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-xs tracking-tight">
              ✉️ Gửi Thư &amp; Liên Hệ
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic">
              Hãy gửi một mẩu tin nhắn nếu bạn có câu hỏi, lời góp ý hoặc muốn cùng chia
              sẻ hành trình code!
            </p>
          </div>
          <div className="flex items-center gap-space-md bg-surface-container-highest/80 px-space-md py-space-sm rounded-lg shadow-inner">
            <div className="flex flex-col text-right">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
                Trạm đón nhận tin
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none font-bold">
                {AUTHOR.location} · VN
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                AIR MAIL VIA TCP/IP
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-bold shadow-sm">
              {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* LEFT: Form */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <div className="relative bg-surface-container-lowest rounded-xl shadow-md p-space-lg md:p-space-xl overflow-hidden">
            {/* Airmail ribbon */}
            <div
              className="h-3 w-full -mx-space-lg md:-mx-space-xl -mt-space-lg mb-space-lg opacity-80"
              style={{
                background:
                  'repeating-linear-gradient(135deg, #bd4823, #bd4823 16px, #fff8f3 16px, #fff8f3 24px, #43682b 24px, #43682b 40px, #fff8f3 40px, #fff8f3 48px)',
              }}
              aria-hidden="true"
            />

            {/* Stationery header */}
            <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low/60 p-space-md rounded-lg">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-primary tracking-widest font-bold uppercase">
                  PHIẾU HÀNH KÝ TRUYỀN TIN
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Thư Tay Kỹ Thuật Số
                </span>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  ƯU TIÊN: BÌNH THƯỜNG
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-bold inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary" />SẴN SÀNG NHẬN
                </span>
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-space-xl gap-space-md text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px] text-secondary">check_circle</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Gửi thư thành công!
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant italic max-w-sm">
                  Cảm ơn bạn đã gửi tin nhắn. Tôi sẽ hồi âm sớm nhất có thể.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg" noValidate>
                {/* Name */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center justify-between" htmlFor="contact-name">
                    <span className="font-bold text-on-surface">1. Tên của bạn</span>
                    <span className="italic text-outline font-body-sm">(Họ tên hoặc biệt danh)</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn Code…"
                    required
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:bg-surface-container shadow-inner placeholder:text-outline/70 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant flex items-center justify-between" htmlFor="contact-email">
                    <span className="font-bold text-on-surface">2. Địa chỉ Email</span>
                    <span className="italic text-outline font-body-sm">(Để tôi hồi âm cho bạn)</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ban-la-ai@domain.vn"
                    required
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:bg-surface-container shadow-inner placeholder:text-outline/70 transition-all"
                  />
                </div>

                {/* Topic */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-bold" htmlFor="contact-topic">
                    3. Chủ đề trao đổi
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded focus:outline-none focus:bg-surface-container shadow-inner transition-all cursor-pointer"
                  >
                    <option value="feedback">📖 Góp ý bài viết &amp; Chia sẻ cảm nhận</option>
                    <option value="code">🐛 Hỏi về code, giải thuật &amp; bug</option>
                    <option value="collab">🤝 Hợp tác dự án &amp; Viết bài chung</option>
                    <option value="coffee">☕ Trò chuyện tự do &amp; Giao lưu Dev</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface font-bold" htmlFor="contact-message">
                      4. Nội dung thư gửi
                    </label>
                    <span className="font-label-sm text-label-sm text-tertiary">
                      Mực điện tử mực nâu
                    </span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden bg-surface-container-low shadow-inner p-2">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="7"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Chào Albert, mình vừa đọc bài viết của bạn về React Hooks và có thắc mắc…"
                      required
                      className="w-full bg-transparent text-on-surface font-body-md text-body-md p-space-sm focus:outline-none resize-y placeholder:text-outline/60"
                      style={{
                        backgroundImage:
                          'linear-gradient(to bottom, transparent 27px, #d1c5b2 28px)',
                        backgroundSize: '100% 28px',
                        lineHeight: '28px',
                      }}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                    Phản hồi trong vòng 48 giờ làm việc.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary-container font-label-md text-label-md px-space-xl py-2.5 rounded hover:bg-primary hover:text-on-primary transition-all shadow-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Gửi phiếu hành ký
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT: Info cards + FAQ */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Info cards */}
          <div className="grid grid-cols-2 gap-space-sm">
            {INFO_CARDS.map((card) =>
              card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-space-xs p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 hover:border-primary-container transition-all text-center group"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                    {card.label}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                    {card.value}
                  </span>
                </a>
              ) : (
                <div
                  key={card.label}
                  className="flex flex-col items-center gap-space-xs p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 text-center"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
                    <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                    {card.label}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface">{card.value}</span>
                </div>
              ),
            )}
          </div>

          {/* FAQ */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-paper border border-outline-variant/70">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[20px] text-primary">help</span>
              Câu hỏi thường gặp
            </h2>
            <div className="flex flex-col gap-space-md">
              {FAQS.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex items-center justify-between gap-space-sm cursor-pointer list-none font-label-md text-label-md text-on-surface hover:text-primary transition-colors">
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[18px] text-outline group-open:rotate-180 transition-transform flex-shrink-0">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-space-sm font-body-sm text-body-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/40 pt-space-sm">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;