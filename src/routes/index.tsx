import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import wallpaper from "@/assets/wallpaper.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

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

type WindowId = "about" | "orien" | "fourdev" | "debtor" | "integver" | "skills" | "contact" | "cv" | "gallery";

interface DesktopItem {
  id: WindowId;
  label: string;
  sublabel?: string;
  icon: "folder" | "note" | "pdf" | "app" | "gallery";
  color?: string;
  x: number; // percent
  y: number; // percent
}

// Note occupies top-left (≈ x 2–40%, y 8–44%) — keep icons outside that zone.
const items: DesktopItem[] = [
  { id: "orien", label: "Orien.AI", sublabel: "(2025–2026)", icon: "folder", color: "var(--coral)", x: 88, y: 16 },
  { id: "fourdev", label: "4DEV.tech", sublabel: "(2023–2025)", icon: "folder", color: "#7FB3D5", x: 88, y: 36 },
  { id: "debtor", label: "Должник прав", sublabel: "(2023)", icon: "folder", color: "#A8C49D", x: 88, y: 56 },
  { id: "integver", label: "Integver.tech", sublabel: "(2021–2023)", icon: "folder", color: "#D7BDE2", x: 88, y: 76 },
  { id: "gallery", label: "Галерея", sublabel: "(фото)", icon: "gallery", color: "#F4A261", x: 70, y: 84 },
  { id: "about", label: "About me.txt", icon: "note", x: 50, y: 84 },
  { id: "skills", label: "Skills.app", icon: "app", x: 12, y: 56 },
  { id: "contact", label: "Get in touch", icon: "app", x: 30, y: 72 },
  { id: "cv", label: "CV_2025.pdf", icon: "pdf", x: 12, y: 84 },
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
        className="absolute top-16 left-4 md:left-12 w-[280px] md:w-[340px] p-5 bg-note shadow-2xl"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
      >
        <h1 className="font-display text-2xl md:text-3xl leading-tight">
          Hi, I'm Daria! <span className="text-coral">🌸</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed">
          Product Designer with 5+ years in mobile & web,{" "}
          <span className="italic">B2B & B2C</span>.
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          Worked at{" "}
          <button onClick={() => openWindow("orien")} className="underline hover:text-coral">Orien.AI</button>,{" "}
          <button onClick={() => openWindow("fourdev")} className="underline hover:text-coral">4DEV</button>,{" "}
          <button onClick={() => openWindow("debtor")} className="underline hover:text-coral">Должник прав</button>,{" "}
          <button onClick={() => openWindow("integver")} className="underline hover:text-coral">Integver</button>.
        </p>
        <p className="mt-3 text-sm">
          Let's chat →{" "}
          <a href="https://t.me/dariayud" className="underline hover:text-coral">Telegram</a>{" "}
          or{" "}
          <a href="mailto:vereskunovadaria@gmail.com" className="underline hover:text-coral">Email ✉</a>
        </p>
      </motion.div>

      {/* Desktop icons */}
      {items.map((item, i) => (
        <DesktopIcon
          key={item.id}
          item={item}
          delay={0.5 + i * 0.05}
          onOpen={() => openWindow(item.id)}
        />
      ))}

      {/* Eyes decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-3"
        aria-hidden
      >
        <Eye />
        <Eye />
      </motion.div>

      {/* Trash */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 right-6 text-center"
      >
        <div className="text-5xl">🗑️</div>
        <div className="text-xs text-white/90 mt-1 font-mono drop-shadow">Don't look<br/>in here</div>
      </motion.div>

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

function Eye() {
  return (
    <div className="size-7 rounded-full bg-white grid place-items-center shadow-md">
      <motion.div
        animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="size-3 rounded-full bg-ink"
      />
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
      <div className="flex items-center gap-5">
        <span className="font-display text-base leading-none">🍎</span>
        <span className="font-semibold">Daria Vereskunova</span>
        <span className="hidden sm:inline text-ink/70">{focused ? `— ${focused}` : "Finder"}</span>
      </div>
      <div className="flex items-center gap-4 font-mono">
        <a href="https://t.me/dariayud" className="hover:text-coral">TG</a>
        <a href="mailto:vereskunovadaria@gmail.com" className="hover:text-coral">✉</a>
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
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.94 }}
      onDoubleClick={onOpen}
      onClick={onOpen}
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 w-24 group cursor-pointer"
    >
      <IconGraphic icon={item.icon} color={item.color} />
      <div className="text-center px-2 py-0.5 rounded text-white text-[11px] leading-tight font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] group-hover:bg-coral/80 transition-colors">
        {item.label}
        {item.sublabel && <div className="text-[10px] opacity-80">{item.sublabel}</div>}
      </div>
    </motion.button>
  );
}

function IconGraphic({ icon, color }: { icon: DesktopItem["icon"]; color?: string }) {
  if (icon === "folder") {
    return (
      <svg viewBox="0 0 64 52" className="w-14 h-12 drop-shadow-lg">
        <path d="M2 10 Q2 4 8 4 L22 4 L28 10 L56 10 Q62 10 62 16 L62 44 Q62 50 56 50 L8 50 Q2 50 2 44 Z" fill={color || "#7FB3D5"} stroke="rgba(0,0,0,0.15)" />
        <path d="M2 18 L62 18" stroke="rgba(255,255,255,0.4)" />
      </svg>
    );
  }
  if (icon === "note") {
    return (
      <div className="w-14 h-14 bg-white shadow-lg p-1.5 flex flex-col gap-0.5 -rotate-2">
        <div className="h-0.5 bg-ink/30 w-full" />
        <div className="h-0.5 bg-ink/20 w-3/4" />
        <div className="h-0.5 bg-ink/20 w-full" />
        <div className="h-0.5 bg-ink/20 w-2/3" />
        <div className="h-0.5 bg-ink/20 w-full" />
      </div>
    );
  }
  if (icon === "pdf") {
    return (
      <div className="w-12 h-14 bg-white shadow-lg rounded-sm relative flex items-end justify-center pb-1">
        <div className="absolute top-1 right-1 w-3 h-3 bg-ink/10" />
        <span className="text-[9px] font-bold text-coral">PDF</span>
      </div>
    );
  }
  return (
    <div className="w-14 h-14 rounded-2xl shadow-lg grid place-items-center text-2xl"
      style={{ background: color || "linear-gradient(135deg, var(--coral), #f4a261)" }}>
      ✨
    </div>
  );
}

function Window({ id, zIndex, onClose, onFocus }: {
  id: WindowId; zIndex: number; onClose: () => void; onFocus: () => void;
}) {
  const config = windowConfig[id];
  // Initial offset based on id for stagger
  const offsets: Record<WindowId, { x: number; y: number }> = {
    about: { x: -200, y: -100 }, orien: { x: -180, y: -120 },
    fourdev: { x: -160, y: -80 }, debtor: { x: -220, y: -60 },
    integver: { x: -140, y: -140 }, skills: { x: -240, y: -90 },
    contact: { x: -120, y: -100 }, cv: { x: -200, y: -110 },
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
      className="absolute w-[min(640px,90vw)] max-h-[80vh] bg-paper/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-white/40"
    >
      {/* Title bar - drag handle */}
      <div className="h-9 px-3 flex items-center gap-2 bg-gradient-to-b from-white/80 to-white/50 border-b border-ink/10 cursor-grab active:cursor-grabbing">
        <button onClick={onClose} className="size-3 rounded-full bg-[#ff5f57] hover:opacity-80" aria-label="Close" />
        <button className="size-3 rounded-full bg-[#febc2e]" aria-label="Min" />
        <button className="size-3 rounded-full bg-[#28c840]" aria-label="Max" />
        <div className="flex-1 text-center text-xs font-medium text-ink/70">{config.title}</div>
        <div className="w-12" />
      </div>
      {/* Content */}
      <div className="overflow-y-auto max-h-[calc(80vh-2.25rem)] p-6 md:p-8">
        {config.body}
      </div>
    </motion.div>
  );
}

const windowConfig: Record<WindowId, { title: string; body: ReactNode }> = {
  about: {
    title: "About me.txt — TextEdit",
    body: (
      <div className="font-mono text-sm space-y-3 leading-relaxed">
        <p className="font-display text-2xl not-italic">Привет, я Даша.</p>
        <p>Продуктовый дизайнер из Рязани. Проектирую сложные цифровые продукты, которые решают реальные бизнес-задачи.</p>
        <p>Специализируюсь на <span className="bg-note px-1">B2B/B2C, SaaS</span>, внутренних инструментах и системах автоматизации.</p>
        <p>За плечами — опыт работы как в продуктовых стартапах (быстрая итеративность), так и в агентствах.</p>
        <p className="text-ink/60">— vereskunovadaria@gmail.com</p>
      </div>
    ),
  },
  orien: {
    title: "Orien.AI — Crypto Wallet",
    body: <CaseStudy
      tag="Криптовалютный кошелёк · part-time"
      period="май 2025 — январь 2026"
      lead="End-to-end путь пользователя для цифровых активов с прозрачными статусами операций."
      did={[
        "Проработала нештатные сценарии: ошибки, задержки, отклонения",
        "Оптимизировала шаги до первой финансовой операции",
        "Заложила масштабируемый UI-kit как основу дизайн-системы",
        "Обеспечила консистентность паттернов для роста продукта",
      ]}
      results={[
        "End-to-end путь пользователя с прозрачными статусами",
        "Система токенов и переменных для тем и состояний",
        "Архитектура для роста конверсии и уменьшения drop-off",
      ]}
    />,
  },
  fourdev: {
    title: "4DEV.tech — IT-экосистема",
    body: <CaseStudy
      tag="SaaS для девелопмента · full-time"
      period="декабрь 2023 — март 2025"
      lead="Комплексная автоматизация девелоперского бизнеса: интерфейсы, архитектура, дизайн-система."
      did={[
        "Разрабатывала интерфейсы и архитектуру SaaS-сервисов",
        "Анализировала операционные сценарии и формировала UX-гипотезы",
        "Проектировала новую информационную архитектуру",
        "Создала масштабируемый UI-кит и сопровождала внедрения",
      ]}
      results={[
        "Стала основным рабочим инструментом отделов продаж и эксплуатации",
        "Время на мониторинг статусов сократилось на 45%",
        "Оценка удобства работы выросла с 6.8 до 8.4 из 10",
      ]}
    />,
  },
  debtor: {
    title: "Должник прав — Mobile App",
    body: <CaseStudy
      tag="Юридическая компания · part-time"
      period="февраль 2023 — декабрь 2023"
      lead="Мобильное приложение для услуг финансовой защиты."
      did={[
        "Провела анализ бизнес-процессов",
        "Участвовала в подготовке UX-исследования",
        "Разработала пользовательские сценарии и структуру приложения",
        "Продумала логику оплаты и анкеты, прототипы ключевых экранов",
      ]}
      results={[
        "Conversion to Payment: +8 п.п. (с 41% до 49%)",
        "Completion Rate анкеты: +22% (с 55% до 67%)",
        "Количество входящих обращений на клиента: −27%",
        "Time to Case Start: −24%",
      ]}
    />,
  },
  integver: {
    title: "Integver.tech — Studio",
    body: <CaseStudy
      tag="Студия полного цикла · full-time"
      period="апрель 2021 — февраль 2023"
      lead="Более 20 проектов: нефтегаз, агросектор, госсектор, образование."
      did={[
        "Личные кабинеты, корпоративные сайты, интернет-магазины",
        "Оптимизация процессов передачи дизайна в разработку",
        "Стандартизация ТЗ, взаимодействие с командами разработчиков",
        "Участие на всех этапах от пресейла до релиза",
      ]}
      results={[
        "20+ запущенных проектов",
        "Опыт работы с крупными клиентами B2B/B2G",
        "Маркетплейс для рынка Ямайки — мобильное приложение",
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
    title: "Get in touch",
    body: (
      <div className="space-y-4">
        <p className="font-display text-3xl">Let's create something together.</p>
        <p className="text-ink/70">Открыта к продуктовым проектам, консалтингу и менторству.</p>
        <div className="grid gap-3 mt-6">
          {[
            { l: "Email", v: "vereskunovadaria@gmail.com", h: "mailto:vereskunovadaria@gmail.com" },
            { l: "Telegram", v: "@dariayud", h: "https://t.me/dariayud" },
            { l: "Локация", v: "Рязань, Россия", h: "#" },
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
    title: "CV_2025.pdf — Preview",
    body: (
      <div className="space-y-4">
        <div className="aspect-[1/1.4] bg-white shadow-inner border border-ink/10 p-8 font-mono text-[10px] leading-relaxed">
          <div className="text-center mb-4">
            <div className="font-display text-2xl">Дарья Верескунова</div>
            <div className="text-ink/60 mt-1">Продуктовый дизайнер · Рязань</div>
          </div>
          <div className="space-y-2 text-ink/80">
            <p><b>Опыт:</b> Orien.AI · 4DEV.tech · Должник прав · Integver.tech</p>
            <p><b>Стек:</b> Figma · Дизайн-системы · UX-исследования · Прототипирование</p>
            <p><b>Email:</b> vereskunovadaria@gmail.com</p>
            <p><b>TG:</b> @dariayud</p>
            <p className="pt-2 italic">Полный CV доступен по запросу.</p>
          </div>
        </div>
        <a href="mailto:vereskunovadaria@gmail.com?subject=CV request" className="block text-center py-3 rounded-lg bg-ink text-paper hover:bg-coral transition-colors">
          Запросить полный PDF →
        </a>
      </div>
    ),
  },
};

function CaseStudy({ tag, period, lead, did, results }: {
  tag: string; period: string; lead: string; did: string[]; results: string[];
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <span className="px-2 py-1 rounded bg-coral/15 text-coral">{tag}</span>
        <span className="px-2 py-1 rounded bg-ink/5 text-ink/70">{period}</span>
      </div>
      <p className="font-display text-2xl md:text-3xl leading-tight">{lead}</p>
      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">Что делала</h4>
        <ul className="space-y-1.5 text-sm">
          {did.map((d, i) => <li key={i} className="flex gap-2"><span className="text-coral">→</span>{d}</li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">Результат</h4>
        <ul className="space-y-1.5 text-sm">
          {results.map((r, i) => <li key={i} className="flex gap-2"><span className="text-coral">★</span>{r}</li>)}
        </ul>
      </div>
    </div>
  );
}
