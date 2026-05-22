import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import wallpaper from "@/assets/wallpaper.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import memoji from "@/assets/memoji.jpg";
import iconPhotos from "@/assets/icon-photos.png";
import iconPhotoshop from "@/assets/icon-photoshop.png";
import iconFigma from "@/assets/icon-figma.png";
import caseOrien from "@/assets/case-orien.jpg";
import orien2 from "@/assets/orien-2.jpg";
import caseFourdev from "@/assets/case-fourdev.jpg";
import fourdev2 from "@/assets/fourdev-2.jpg";
import fourdev3 from "@/assets/fourdev-3.jpg";
import fourdev4 from "@/assets/fourdev-4.jpg";
import caseDebtor from "@/assets/case-debtor.jpg";
import debtor2 from "@/assets/debtor-2.jpg";
import debtor3 from "@/assets/debtor-3.jpg";
import debtor4 from "@/assets/debtor-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Дарья Верескунова — Продуктовый дизайнер" },
      {
        name: "description",
        content:
          "Портфолио продуктового дизайнера. B2B/B2C, SaaS, дизайн-системы, мобильные приложения.",
      },
    ],
  }),
  component: Desktop,
});

type WindowId = "about" | "orien" | "fourdev" | "debtor" | "skills" | "contact" | "cv" | "gallery";

interface DesktopItem {
  id: WindowId | "figma" | "photoshop";
  label: string;
  sublabel?: string;
  icon: "folder" | "note" | "pdf" | "app" | "gallery" | "figma" | "photoshop";
  color?: string;
  x: number;
  y: number;
  disabled?: boolean;
}

const items: DesktopItem[] = [
  // Top-right corner — tools
  { id: "photoshop", label: "Adobe Photoshop 2026", icon: "photoshop", x: 95, y: 10, disabled: true },
  { id: "figma", label: "Figma", icon: "figma", x: 95, y: 26, disabled: true },
  // Center-right column — case folders
  { id: "orien", label: "Crypto", icon: "folder", color: "#7FB3D5", x: 60, y: 32 },
  { id: "fourdev", label: "4dev", icon: "folder", color: "#7FB3D5", x: 60, y: 52 },
  { id: "debtor", label: "Должник прав", icon: "folder", color: "#7FB3D5", x: 60, y: 72 },
  // Center-left column
  { id: "cv", label: "CV", icon: "folder", color: "#7FB3D5", x: 38, y: 62 },
  { id: "gallery", label: "Галерея", icon: "gallery", x: 38, y: 82 },
];

function Desktop() {
  const [open, setOpen] = useState<WindowId[]>([]);
  const [focus, setFocus] = useState<WindowId | null>(null);

  const openWindow = (id: WindowId) => {
    setOpen((s) => (s.includes(id) ? s : [...s, id]));
    setFocus(id);
  };
  const closeWindow = (id: WindowId) =>
    setOpen((s) => s.filter((i) => i !== id));

  return (
    <div
      className="fixed inset-0 overflow-hidden font-sans text-ink select-none"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MenuBar focused={focus} />

      {/* Welcome sticky note */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-14 left-4 md:left-12 w-[280px] md:w-[340px] p-5 bg-note shadow-2xl"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
      >
        <h1 className="font-display text-2xl md:text-3xl leading-tight">
          Привет! <span className="text-coral">🌸</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed">
          Меня зовут <b>Дарья</b>, я проектирую цифровые продукты, которые решают реальные бизнес-задачи. Специализируюсь на <i>B2B/B2C</i>, SaaS, внутренних инструментах и системах автоматизации.
        </p>
        <p className="mt-3 text-sm leading-relaxed">
          Контакты:{" "}
          <a href="https://t.me/Darialud" target="_blank" rel="noreferrer" className="underline hover:text-coral">@Darialud</a>{" "}·{" "}
          <a href="mailto:vereskunova@gmail.com" className="underline hover:text-coral">vereskunova@gmail.com</a>
        </p>
        <p className="mt-1 text-sm">Локация: Москва, РФ</p>
      </motion.div>

      {/* Desktop icons */}
      {items.map((item, i) => (
        <DesktopIcon
          key={item.id}
          item={item}
          delay={0.5 + i * 0.05}
          onOpen={() => {
            if (!item.disabled) openWindow(item.id as WindowId);
          }}
        />
      ))}

      {/* Windows */}
      <AnimatePresence>
        {open.map((id, i) => (
          <Window
            key={id}
            id={id}
            zIndex={50 + i + (focus === id ? 20 : 0)}
            onClose={() => closeWindow(id)}
            onFocus={() => setFocus(id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function MenuBar({ focused }: { focused: WindowId | null }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute top-0 inset-x-0 z-[100] h-8 bg-white/40 backdrop-blur-2xl border-b border-white/30 flex items-center justify-between px-4 text-xs text-ink">
      <div className="flex items-center gap-3">
        <img src={memoji} alt="" className="size-6 rounded-full object-cover" />
        <span className="font-semibold">Daria Vereskunova</span>
        <span className="hidden sm:inline text-ink/70">{focused ? `— ${focused}` : "Finder"}</span>
      </div>
      <div className="flex items-center gap-4 font-mono">
        <a href="https://t.me/Darialud" className="hover:text-coral">TG</a>
        <a href="mailto:vereskunova@gmail.com" className="hover:text-coral">✉</a>
        <span>{time}</span>
      </div>
    </div>
  );
}

function DesktopIcon({
  item, delay, onOpen,
}: { item: DesktopItem; delay: number; onOpen: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ scale: item.disabled ? 1 : 1.08, y: item.disabled ? 0 : -2 }}
      whileTap={{ scale: item.disabled ? 1 : 0.94 }}
      onDoubleClick={onOpen}
      onClick={onOpen}
      disabled={item.disabled}
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 w-40 group ${item.disabled ? "cursor-default opacity-90" : "cursor-pointer"}`}
    >
      <IconGraphic icon={item.icon} color={item.color} />
      <div className="text-center px-2 py-0.5 rounded text-white text-[14px] leading-tight font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] group-hover:bg-coral/80 transition-colors">
        {item.label}
        {item.sublabel && <div className="text-[12px] opacity-80">{item.sublabel}</div>}
      </div>
    </motion.button>
  );
}

function IconGraphic({ icon, color }: { icon: DesktopItem["icon"]; color?: string }) {
  if (icon === "folder") {
    return (
      <svg viewBox="0 0 64 52" className="w-28 h-24 drop-shadow-xl">
        <path d="M2 10 Q2 4 8 4 L22 4 L28 10 L56 10 Q62 10 62 16 L62 44 Q62 50 56 50 L8 50 Q2 50 2 44 Z" fill={color || "#7FB3D5"} stroke="rgba(0,0,0,0.15)" />
        <path d="M2 18 L62 18" stroke="rgba(255,255,255,0.4)" />
      </svg>
    );
  }
  if (icon === "gallery") {
    return <img src={iconPhotos} alt="" className="w-24 h-24 drop-shadow-xl rounded-[22%] object-cover" />;
  }
  if (icon === "figma") {
    return (
      <div className="w-20 h-24 rounded-2xl bg-white shadow-xl grid place-items-center drop-shadow-xl">
        <svg viewBox="0 0 38 57" className="w-12 h-16">
          <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
          <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
          <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
          <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
          <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
        </svg>
      </div>
    );
  }
  if (icon === "photoshop") {
    return <img src={iconPhotoshop} alt="" className="w-24 h-24 drop-shadow-xl rounded-[22%] object-cover" />;
  }
  if (icon === "note") {
    return (
      <div className="w-24 h-24 bg-white shadow-xl p-2.5 flex flex-col gap-1.5 -rotate-2 drop-shadow-xl">
        <div className="h-1 bg-ink/30 w-full" />
        <div className="h-1 bg-ink/20 w-3/4" />
        <div className="h-1 bg-ink/20 w-full" />
        <div className="h-1 bg-ink/20 w-2/3" />
        <div className="h-1 bg-ink/20 w-full" />
        <div className="h-1 bg-ink/20 w-1/2" />
        <div className="h-1 bg-ink/20 w-3/4" />
      </div>
    );
  }
  if (icon === "pdf") {
    return (
      <div className="w-20 h-24 bg-white shadow-xl rounded-sm relative flex items-end justify-center pb-2 drop-shadow-xl">
        <div className="absolute top-2 right-2 w-5 h-5 bg-ink/10" />
        <span className="text-[13px] font-bold text-coral">PDF</span>
      </div>
    );
  }
  return (
    <div className="w-24 h-24 rounded-2xl shadow-xl grid place-items-center text-4xl drop-shadow-xl"
      style={{ background: color || "linear-gradient(135deg, var(--coral), #f4a261)" }}>
      ✨
    </div>
  );
}

function Window({ id, zIndex, onClose, onFocus }: {
  id: WindowId; zIndex: number; onClose: () => void; onFocus: () => void;
}) {
  const config = windowConfig[id];
  const offsets: Record<WindowId, { x: number; y: number }> = {
    about: { x: -200, y: -120 }, orien: { x: -180, y: -140 },
    fourdev: { x: -160, y: -100 }, debtor: { x: -220, y: -80 },
    skills: { x: -240, y: -90 },
    contact: { x: -120, y: -110 }, cv: { x: -200, y: -120 },
    gallery: { x: -260, y: -130 },
  };
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onMouseDown={onFocus}
      style={{
        zIndex,
        left: `calc(50% + ${offsets[id].x}px)`,
        top: `calc(50% + ${offsets[id].y}px)`,
      }}
      className="absolute w-[min(720px,92vw)] max-h-[82vh] bg-paper/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-white/40"
    >
      <div className="h-9 px-3 flex items-center gap-2 bg-gradient-to-b from-white/80 to-white/50 border-b border-ink/10 cursor-grab active:cursor-grabbing">
        <button onClick={onClose} className="size-3 rounded-full bg-[#ff5f57] hover:opacity-80" aria-label="Close" />
        <button className="size-3 rounded-full bg-[#febc2e]" aria-label="Min" />
        <button className="size-3 rounded-full bg-[#28c840]" aria-label="Max" />
        <div className="flex-1 text-center text-xs font-medium text-ink/70">{config.title}</div>
        <div className="w-12" />
      </div>
      <div className="overflow-y-auto max-h-[calc(82vh-2.25rem)] p-6 md:p-8">
        {config.body}
      </div>
    </motion.div>
  );
}

const windowConfig: Record<WindowId, { title: string; body: ReactNode }> = {
  about: {
    title: "Обо мне.txt — TextEdit",
    body: (
      <div className="font-mono text-sm space-y-3 leading-relaxed">
        <p className="font-display text-2xl not-italic">Привет! Меня зовут Дарья.</p>
        <p>Я проектирую цифровые продукты, которые решают реальные бизнес-задачи. Специализируюсь на <span className="bg-note px-1">B2B/B2C, SaaS</span>, внутренних инструментах и системах автоматизации.</p>
        <p>За моими плечами — успешный опыт работы как в продуктовых стартапах (быстрая итеративность), так и в агентствах.</p>
        <p>В своей работе активно использую AI-инструменты: <i>Monterey.ai, Lovable, Whimsical AI, NotebookLM</i>.</p>
        <p className="text-ink/60">— <a className="underline hover:text-coral" href="mailto:vereskunova@gmail.com">vereskunova@gmail.com</a> · <a className="underline hover:text-coral" href="https://t.me/Darialud">@Darialud</a> · Москва, РФ</p>
      </div>
    ),
  },
  fourdev: {
    title: "4Dev 2023–2025 — Экосистема для автоматизации девелопмента",
    body: <CaseStudy
      cover={caseFourdev}
      tag="SaaS для девелопмента · full-time"
      period="2023 — 2025"
      lead="Экосистема для автоматизации девелопмента, которая помогает застройщикам, банкам и ритейлерам управлять продажами недвижимости."
      sections={[
        {
          h: "Контекст и задачи",
          p: "4DEV — IT-экосистема для автоматизации девелопмента. Уже интегрирована с 35 внешними сервисами и насчитывает 65 клиентов по всей России, экономя им свыше 1 млн рублей на автоматизации. Продукт работает в сложной правовой среде: любая сделка с недвижимостью требует проверок со стороны банков и Росреестра, что создаёт естественные паузы и риски срывов.",
        },
      ]}
      image={fourdev2}
      imageCaption="Анализ текущего продукта показал ключевые проблемы интерфейса"
      did={[
        "Провела пользовательские интервью с менеджерами продаж, РОПом, специалистами по гарантии",
        "Анализировала операционные сценарии и формировала UX-гипотезы",
        "Проектировала новую информационную архитектуру и систему статусов",
        "Создала масштабируемый UI-кит, сопровождала внедрения и оценку метрик",
      ]}
      problems={[
        "Низкая прозрачность сделок: статусы не обновлялись >24 часов, CSI — 6,5/10",
        "12% ошибок в бронировании",
        "До 34% гарантийных заявок становились просроченными; реакция — 3,2 дня",
        "Интерфейс не учитывал реальные сбои → повторные действия",
        "Отсутствие единой UI-системы ограничивало масштабирование",
      ]}
      gallery={[
        { src: fourdev3, cap: "1. Карточная система управления гарантийными заявками" },
        { src: fourdev4, cap: "2. Шахматка как основная модель выбора квартиры" },
      ]}
      results={[
        "Просроченные заявки сократились на 11%",
        "Среднее время реакции снизилось с 3,2 до 1,9 дней",
        "Время подбора квартиры — с 7–10 минут до 4 минут",
        "Ошибки при бронировании снизились с 12% до 5,5%",
        "Время руководителей на контроль статусов −45%",
        "Оценка удобства работы выросла с 6,8 до 8,4/10",
      ]}
    />,
  },
  orien: {
    title: "Crypto Orien.AI 2025–2026 — Crypto Wallet",
    body: <CaseStudy
      cover={caseOrien}
      tag="Криптокошелёк · part-time"
      period="2025 — 2026"
      lead="Мобильный криптокошелёк ранней стадии: end-to-end путь пользователя от регистрации до первой операции."
      sections={[
        {
          h: "Контекст и задачи",
          p: "Crypto Orien.AI — мобильный криптокошелёк ранней стадии, созданный в условиях высокой конкуренции и низкого пользовательского доверия к новым Web3-продуктам. Основная аудитория — пользователи, уже знакомые с криптовалютой, но не удовлетворённые сложностью существующих решений.",
        },
      ]}
      image={orien2}
      imageCaption="Swap и Buy/Sell — экраны ключевых финансовых операций"
      problems={[
        "Пользователи останавливались на этапе создания кошелька",
        "Страх подтверждать операции",
        "Мало пользователей доходили до целевых действий",
      ]}
      did={[
        "Спроектировала end-to-end user flow от регистрации до первой операции",
        "Проработала нештатные сценарии: ошибки, задержки, отклонения",
        "Оптимизировала шаги до первой финансовой операции",
        "Снизила когнитивную нагрузку на этапе подтверждения",
        "Создала систему токенов и переменных для тем и состояний",
        "Заложила масштабируемый UI-kit как основу дизайн-системы",
      ]}
      results={[
        "Спроектирован end-to-end путь с прозрачными статусами операций",
        "Внедрена единая система статусов и UI-kit, готовая к масштабированию",
        "Интерфейс снижает неопределённость и повышает доверие к финансовым операциям",
        "Подготовлена архитектура для роста конверсии и уменьшения drop-off",
      ]}
    />,
  },
  debtor: {
    title: "Должник прав 2023 — Mobile App",
    body: <CaseStudy
      cover={caseDebtor}
      tag="Юридическое мобильное приложение · part-time"
      period="2023"
      lead="Мобильное приложение для клиентов в сложной финансовой ситуации. Работа строится через персональных менеджеров."
      sections={[
        {
          h: "Бизнес-модель",
          p: "Двухэтапная: 1) пользователь оплачивает тариф; 2) после оплаты открывается дело и начинается сопровождение. Ключевая точка роста — конверсия в оплату и дальнейшее удержание клиента в процессе сопровождения.",
        },
      ]}
      image={debtor3}
      imageCaption="Мои документы · Оплата услуг · Моё дело — ключевые экраны клиента"
      problems={[
        "Пользователи не всегда понимали статус своего дела",
        "Анкеты заполнялись не с первого раза, к ним часто возвращались",
        "Менеджеры тратили много времени на телефонные консультации",
        "Оплата не была достаточно прозрачной и понятной",
      ]}
      did={[
        "Провела анализ бизнес-процессов",
        "Участвовала в подготовке UX-исследования",
        "Разработала пользовательские сценарии и структуру приложения",
        "Продумала логику оплаты и анкеты",
        "Сформировала прототипы ключевых экранов",
        "Участвовала в анализе результатов тестирования",
      ]}
      gallery={[
        { src: debtor2, cap: "Новая точка входа в анкету — встроена в онбординг" },
        { src: debtor4, cap: "Проблемы → Гипотезы → Реализация" },
      ]}
      results={[
        "Conversion to Payment: +8 п.п. (с 41% до 49%)",
        "Completion Rate анкеты: +22% (с 55% до 67%)",
        "Среднее время прохождения анкеты: −18%",
        "Количество входящих обращений на клиента: −27%",
        "Time to Case Start: −24%",
      ]}
    />,
  },
  skills: {
    title: "Skills.app",
    body: (
      <div className="space-y-6">
        {Object.entries({
          "UX-исследования и продукт": ["CustDev", "Глубинные интервью", "JTBD", "CJM", "User Flow", "Юзабилити-тестирование", "Метрики", "MVP", "User Story Mapping", "Продуктовое мышление"],
          "Дизайн и инструменты": ["Figma", "Auto layout", "Компоненты", "Токены", "Прототипирование", "Дизайн-системы", "Atomic Design", "Miro", "HTML/CSS"],
          "Процессы и коммуникация": ["Agile", "Design Review", "Аргументация решений", "Кросс-функциональная работа"],
        }).map(([group, list]) => (
          <div key={group}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-3">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {list.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-ink/5 border border-ink/10 text-sm hover:bg-coral hover:text-white hover:border-coral transition-colors cursor-default">{s}</span>
              ))}
            </div>
          </div>
        ))}
        <div className="pt-4 border-t border-ink/10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-3">Образование</h3>
          <p className="text-sm">Bang Bang Education — <span className="italic">Арт-дирекшн цифрового продукта</span></p>
          <p className="text-sm">СГУ им. Н.Г. Чернышевского — <span className="italic">Магистр, филология и журналистика</span></p>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Связаться",
    body: (
      <div className="space-y-4">
        <p className="font-display text-3xl">Давайте создадим что-то вместе.</p>
        <p className="text-ink/70">Открыта к продуктовым проектам, консалтингу и менторству.</p>
        <div className="grid gap-3 mt-6">
          {[
            { l: "Email", v: "vereskunova@gmail.com", h: "mailto:vereskunova@gmail.com" },
            { l: "Telegram", v: "@Darialud", h: "https://t.me/Darialud" },
            { l: "Локация", v: "Москва, РФ", h: "#" },
          ].map((c) => (
            <a key={c.l} href={c.h} className="flex items-center justify-between p-4 rounded-lg border border-ink/10 hover:bg-ink hover:text-paper hover:border-ink transition-all group">
              <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">{c.l}</span>
              <span className="font-medium">{c.v} →</span>
            </a>
          ))}
        </div>
      </div>
    ),
  },
  cv: {
    title: "CV_2026.pdf — Preview",
    body: (
      <div className="space-y-4">
        <div className="aspect-[1/1.4] bg-white shadow-inner border border-ink/10 p-8 font-mono text-[10px] leading-relaxed">
          <div className="text-center mb-4">
            <div className="font-display text-2xl">Дарья Верескунова</div>
            <div className="text-ink/60 mt-1">Продуктовый дизайнер · Москва</div>
          </div>
          <div className="space-y-2 text-ink/80">
            <p><b>Опыт:</b> 4DEV.tech · Crypto Orien.AI · Должник прав</p>
            <p><b>Стек:</b> Figma · Дизайн-системы · UX-исследования · Прототипирование</p>
            <p><b>Email:</b> vereskunova@gmail.com</p>
            <p><b>TG:</b> @Darialud</p>
            <p className="pt-2 italic">Полный CV доступен по запросу.</p>
          </div>
        </div>
        <a href="mailto:vereskunova@gmail.com?subject=CV request" className="block text-center py-3 rounded-lg bg-ink text-paper hover:bg-coral transition-colors">
          Запросить полный PDF →
        </a>
      </div>
    ),
  },
  gallery: {
    title: "Галерея — Preview",
    body: (
      <div className="space-y-4">
        <p className="font-display text-2xl">Несколько кадров из жизни ✨</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { src: gallery1, cap: "Утро" },
            { src: gallery2, cap: "Записки" },
            { src: gallery3, cap: "Свет" },
            { src: gallery4, cap: "Небо" },
          ].map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, rotate: i % 2 ? 1 : -1 }}
              className="bg-white p-2 pb-6 shadow-md relative"
            >
              <img src={p.src} alt={p.cap} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              <figcaption className="absolute bottom-1 inset-x-0 text-center font-mono text-[10px] text-ink/60">{p.cap}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    ),
  },
};

interface CaseSection { h: string; p: string }
interface GalleryItem { src: string; cap: string }

function CaseStudy({ cover, tag, period, lead, sections = [], image, imageCaption, problems, did, gallery = [], results }: {
  cover?: string;
  tag: string;
  period: string;
  lead: string;
  sections?: CaseSection[];
  image?: string;
  imageCaption?: string;
  problems?: string[];
  did: string[];
  gallery?: GalleryItem[];
  results: string[];
}) {
  return (
    <div className="space-y-6">
      {cover && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden border border-ink/10 bg-ink/5 -mx-2 md:-mx-4"
        >
          <img src={cover} alt={lead} loading="lazy" className="w-full h-auto block" />
        </motion.div>
      )}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <span className="px-2 py-1 rounded bg-coral/15 text-coral">{tag}</span>
        <span className="px-2 py-1 rounded bg-ink/5 text-ink/70">{period}</span>
      </div>
      <p className="font-display text-2xl md:text-3xl leading-tight">{lead}</p>

      {sections.map((s) => (
        <div key={s.h}>
          <h4 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">{s.h}</h4>
          <p className="text-sm leading-relaxed text-ink/80">{s.p}</p>
        </div>
      ))}

      {image && (
        <figure className="space-y-2">
          <motion.img
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src={image}
            alt={imageCaption || ""}
            loading="lazy"
            className="w-full rounded-lg border border-ink/10 -mx-2 md:-mx-4 max-w-[calc(100%+2rem)]"
          />
          {imageCaption && <figcaption className="text-xs font-mono text-ink/60 text-center">{imageCaption}</figcaption>}
        </figure>
      )}

      {problems && (
        <div className="p-4 rounded-lg bg-note/60 border-l-4 border-coral">
          <h4 className="font-mono text-xs uppercase tracking-widest text-ink/70 mb-2">⚠️ Проблемы</h4>
          <ul className="space-y-1.5 text-sm">
            {problems.map((p, i) => <li key={i} className="flex gap-2"><span className="text-ink/40">·</span>{p}</li>)}
          </ul>
        </div>
      )}

      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">Моя роль</h4>
        <ul className="space-y-1.5 text-sm">
          {did.map((d, i) => <li key={i} className="flex gap-2"><span className="text-coral">→</span>{d}</li>)}
        </ul>
      </div>

      {gallery.length > 0 && (
        <div className="space-y-3">
          {gallery.map((g, i) => (
            <figure key={i} className="space-y-2">
              <motion.img
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                src={g.src}
                alt={g.cap}
                loading="lazy"
                className="w-full rounded-lg border border-ink/10 -mx-2 md:-mx-4 max-w-[calc(100%+2rem)]"
              />
              <figcaption className="text-xs font-mono text-ink/60 text-center">{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ Результат</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          {results.map((r, i) => <li key={i} className="flex gap-2"><span className="text-emerald-600">✓</span>{r}</li>)}
        </ul>
      </div>
    </div>
  );
}
