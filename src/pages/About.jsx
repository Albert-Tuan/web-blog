import { AUTHOR, skills, timeline } from '../data/content';

function About() {
  return (
    <div className="max-w-[1120px] mx-auto w-full px-gutter py-space-lg flex flex-col gap-space-xl">
      {/* Header ledger */}
      <header className="relative mb-space-xl pb-space-md border-b-2 border-outline-variant/70 flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold px-space-xs py-0.5 bg-secondary-container/40 rounded">
              Tập Ghi Chép Số 01
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              § Mục Giới Thiệu Nhân Vật
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight flex items-center gap-space-sm">
            <span>📖 Về tôi &amp; Nhật Ký Lập Trình</span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant italic max-w-xl">
            Tản mạn về bước ngoặt chuyển ngành, những đêm thức cùng console.log và
            hành trình tự học một ngôn ngữ mới từ số 0.
          </p>
        </div>
        <div className="flex items-center gap-space-md self-start md:self-end">
          <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-2 rounded-lg shadow-sm border border-outline-variant/60">
            <span className="material-symbols-outlined text-primary text-[20px]">
              calendar_today
            </span>
            <span className="font-label-md text-label-md text-on-surface">
              Khởi tạo: {AUTHOR.since}
            </span>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-2 rounded-lg shadow-sm border border-outline-variant/60">
            <span className="material-symbols-outlined text-secondary text-[20px]">location_on</span>
            <span className="font-label-md text-label-md text-on-surface">{AUTHOR.location}</span>
          </div>
        </div>
      </header>

      {/* Two-page notebook spread */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-lg bg-surface-container-lowest rounded-xl shadow-paper-lg border border-outline-variant/70 overflow-hidden">
        {/* Central spine accent (desktop) */}
        <div
          className="hidden lg:block absolute inset-y-0 left-[41.666667%] w-px bg-gradient-to-b from-outline-variant/20 via-outline-variant/90 to-outline-variant/20 z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* LEFT PAGE: Profile */}
        <aside className="lg:col-span-5 p-space-lg md:p-space-xl flex flex-col justify-between bg-surface-container-low/40 relative">
          <div className="absolute inset-0 opacity-25 pointer-events-none notebook-lines" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Polaroid frame */}
            <div className="relative group my-space-sm transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Washi tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-primary-fixed/60 backdrop-blur-sm border-l-2 border-r-2 border-dashed border-outline-variant/60 shadow-sm z-20 pointer-events-none transform -rotate-2" />

              <div className="bg-surface-container-lowest p-3 pb-5 rounded shadow-paper-lg border border-outline-variant/60 max-w-[280px]">
                <div className="w-[240px] h-[240px] overflow-hidden rounded-sm bg-surface-container-high relative">
                  <img
                    alt={`${AUTHOR.name} — Coding in Hanoi portrait`}
                    className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] filter hover:scale-105 transition-transform duration-500"
                    src={AUTHOR.avatar}
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none" />
                </div>
                <p className="font-label-md text-label-md text-on-surface-variant font-bold mt-3 tracking-wide flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">
                    edit
                  </span>
                  {AUTHOR.name} — Hanoi, 2024
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-space-lg text-left w-full space-y-space-md">
              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-[20px]">waving_hand</span>
                <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Xin chào bạn đọc,
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                Tôi là <strong className="text-primary font-semibold">{AUTHOR.name}</strong>. Một
                người rẽ lối chuyển ngành đang miệt mài theo đuổi đam mê lập trình web từ{' '}
                {AUTHOR.since}.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Trang web này đóng vai trò như một cuốn sổ tay bìa cứng mở toang: nơi tôi
                ghi lại từng hàm lệnh nhỏ, những góc suy ngẫm sau màn hình terminal và cả
                các bài học đắt giá mỗi khi gõ nhầm dấu chấm phẩy.
              </p>

              {/* Metadata index slips */}
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-sm bg-surface-container rounded border border-outline-variant/60">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                    Vai trò chính
                  </span>
                  <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                    Self-taught Dev
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container rounded border border-outline-variant/60">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                    Triết lý học
                  </span>
                  <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                    Learn in Public
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rubber stamp motto */}
          <div className="relative z-10 mt-space-xl p-space-md bg-secondary-container/20 rounded-lg border-2 border-dashed border-secondary/50 text-center transform rotate-1 shadow-sm">
            <div className="flex items-center justify-center gap-1 text-secondary mb-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-sm text-label-sm tracking-widest uppercase font-bold text-secondary">
                Phương châm cốt lõi
              </span>
            </div>
            <p className="font-headline-sm text-[18px] text-on-secondary-fixed-variant italic leading-snug">
              "{AUTHOR.motto}"
            </p>
            <span className="block mt-1 font-label-sm text-[10px] text-secondary tracking-widest uppercase">
              Verified Entry § 2024
            </span>
          </div>
        </aside>

        {/* RIGHT PAGE: Timeline + Skills */}
        <section className="lg:col-span-7 p-space-lg md:p-space-xl flex flex-col gap-space-xl bg-surface-container-lowest">
          {/* Vertical timeline */}
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">history</span>
              Hành trình chuyển ngành
            </h2>
            <div className="relative pl-space-lg border-l-2 border-outline-variant/60 space-y-space-md">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[calc(0.625rem+1px)] top-1 w-3 h-3 rounded-full bg-primary-container border-2 border-surface" />
                  <div className="font-label-sm text-label-sm text-primary font-bold mb-0.5">
                    {item.period}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-semibold">
                    {item.title}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">psychology</span>
              Kỹ năng hiện tại
            </h2>
            <div className="space-y-space-md">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-label-md text-label-md text-on-surface">{skill.name}</span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary-container"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currently learning panel */}
          <div className="relative bg-surface-container-low rounded-xl p-space-md border border-outline-variant/60 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none notebook-lines" />
            <div className="relative z-10">
              <div className="flex items-center gap-space-xs mb-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">auto_stories</span>
                <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-bold">
                  Đang học
                </span>
              </div>
              <div className="flex flex-wrap gap-space-sm">
                {['React Hooks', 'REST APIs', 'PostgreSQL', 'Docker', 'TypeScript'].map((t) => (
                  <span
                    key={t}
                    className="px-space-sm py-1 rounded bg-secondary-container/30 border border-secondary/50 text-secondary font-label-sm text-label-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;