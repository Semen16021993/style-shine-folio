import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Дарья Верескунова — Продуктовый дизайнер" },
      {
        name: "description",
        content:
          "Продуктовый дизайнер. B2B/B2C, SaaS, дизайн-системы, мобильные приложения. Портфолио и кейсы.",
      },
      { property: "og:title", content: "Дарья Верескунова — Продуктовый дизайнер" },
      {
        property: "og:description",
        content: "Проектирую сложные цифровые продукты, которые решают реальные бизнес-задачи.",
      },
    ],
  }),
  component: Portfolio,
});

const experiences = [
  {
    company: "Orien.AI",
    role: "Продуктовый дизайнер",
    period: "май 2025 — январь 2026",
    type: "part-time",
    tag: "Крипто-кошелёк",
    desc: "End-to-end путь пользователя для цифровых активов: прозрачные статусы операций, обработка ошибок и задержек. Заложила масштабируемую дизайн-систему с токенами для тем и состояний.",
    metrics: ["Система токенов", "End-to-end UX", "UI-kit с нуля"],
  },
  {
    company: "4DEV.tech",
    role: "Продуктовый дизайнер",
    period: "декабрь 2023 — март 2025",
    type: "full-time",
    tag: "IT-экосистема для девелопмента",
    desc: "Проектировала SaaS-сервисы для автоматизации девелоперского бизнеса. Архитектура, UX-гипотезы, масштабируемый UI-кит и сопровождение внедрения.",
    metrics: ["−45% времени на мониторинг", "Оценка UX 6.8 → 8.4", "Основной инструмент команды"],
  },
  {
    company: "Должник прав",
    role: "Продуктовый дизайнер",
    period: "февраль 2023 — декабрь 2023",
    type: "part-time",
    tag: "Финансовая защита",
    desc: "Мобильное приложение для юридической компании. Анализ бизнес-процессов, сценарии, логика оплаты и анкеты, прототипы ключевых экранов.",
    metrics: ["+8 п.п. конверсия в оплату", "+22% завершение анкеты", "−27% обращений к менеджерам"],
  },
  {
    company: "Integver.tech",
    role: "UX/UI дизайнер",
    period: "апрель 2021 — февраль 2023",
    type: "full-time",
    tag: "Студия полного цикла",
    desc: "Более 20 проектов: нефтегаз, агросектор, госуслуги, образование. Личные кабинеты, корпоративные сайты, интернет-магазины. Стандартизация передачи дизайна в разработку.",
    metrics: ["20+ проектов", "От пресейла до релиза", "Кросс-функциональность"],
  },
];

const skills = {
  "UX и продукт": [
    "CustDev", "Глубинные интервью", "JTBD", "CJM", "User Flow",
    "Юзабилити-тестирование", "Метрики", "MVP", "User Story Mapping",
  ],
  "Дизайн и инструменты": [
    "Figma", "Auto layout", "Компоненты", "Токены", "Прототипирование",
    "Дизайн-системы", "Atomic Design", "Miro", "HTML/CSS",
  ],
  "Процессы": [
    "Agile", "Design Review", "Аргументация решений", "Кросс-функциональная работа",
  ],
};

function Portfolio() {
  return (
    <div className="grain min-h-screen bg-paper text-ink overflow-x-hidden">
      <Cursor />
      <TopBar />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const x = useSpring(0, { stiffness: 400, damping: 40 });
  const y = useSpring(0, { stiffness: 400, damping: 40 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-coral mix-blend-difference" />
    </motion.div>
  );
}

function TopBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-ink/10 bg-paper/70 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 md:px-10 h-12 text-xs font-mono uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-coral animate-blink" />
          <span>Daria V.</span>
          <span className="hidden sm:inline text-muted-foreground">/ Product Designer</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#work" className="hover:text-coral transition-colors">Работы</a>
          <a href="#about" className="hover:text-coral transition-colors">О себе</a>
          <a href="#skills" className="hover:text-coral transition-colors">Навыки</a>
          <a href="#contact" className="hover:text-coral transition-colors">Контакты</a>
        </nav>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground hidden sm:inline">Рязань</span>
          <span>{time}</span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-5 md:px-10 min-h-screen flex flex-col justify-between">
      <motion.div style={{ y, opacity }}>
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest mb-8">
          <span className="size-1.5 rounded-full bg-ink" />
          <span>Доступна для проектов · 2026</span>
        </div>

        <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.88] tracking-tight">
          {"Дарья".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
          <br />
          <span className="italic text-coral">
            {"Верескунова".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl"
      >
        <div className="md:col-span-2">
          <p className="font-display text-2xl md:text-4xl leading-snug">
            Проектирую сложные цифровые продукты,
            <span className="italic text-muted-foreground"> которые решают реальные бизнес-задачи.</span>
          </p>
        </div>
        <div className="text-sm space-y-3 self-end font-mono">
          <div className="flex justify-between border-b border-ink/20 pb-2">
            <span className="text-muted-foreground">Роль</span>
            <span>Product Designer</span>
          </div>
          <div className="flex justify-between border-b border-ink/20 pb-2">
            <span className="text-muted-foreground">Фокус</span>
            <span>B2B · SaaS · Mobile</span>
          </div>
          <div className="flex justify-between border-b border-ink/20 pb-2">
            <span className="text-muted-foreground">Опыт</span>
            <span>5+ лет</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Product Design", "★", "Design Systems", "★", "UX Research", "★", "SaaS", "★", "Mobile", "★", "B2B", "★"];
  return (
    <div className="border-y border-ink/15 py-6 overflow-hidden bg-ink text-paper">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-display text-5xl md:text-7xl mx-8 italic">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-5 md:px-10 py-24 md:py-40 grid md:grid-cols-12 gap-8">
      <div className="md:col-span-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground sticky top-20">
          (01) О себе
        </p>
      </div>
      <div className="md:col-span-9 space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl md:text-5xl leading-tight"
        >
          Специализируюсь на <span className="italic text-coral">B2B/B2C</span>, SaaS,
          внутренних инструментах и системах автоматизации.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          За моими плечами — успешный опыт работы как в продуктовых стартапах с быстрой
          итеративностью, так и в агентствах. От ресёрча и гипотез до дизайн-системы и
          авторского надзора в разработке.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          {[
            { n: "20+", l: "Запущенных проектов" },
            { n: "5", l: "Лет в продукте" },
            { n: "+22%", l: "Completion Rate" },
            { n: "−45%", l: "Время на мониторинг" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t border-ink/30 pt-4"
            >
              <div className="font-display text-4xl md:text-5xl">{s.n}</div>
              <div className="text-xs font-mono uppercase text-muted-foreground mt-2">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="work" className="px-5 md:px-10 py-24 md:py-32 border-t border-ink/15">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (02) Опыт работы
          </p>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-5xl md:text-7xl leading-none">
            Избранные <span className="italic">проекты</span>
          </h2>
        </div>
      </div>

      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <ExperienceRow key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceRow({ exp, index }: { exp: (typeof experiences)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border-t border-ink/20 py-8 md:py-12 cursor-pointer relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-ink -z-0"
        initial={{ y: "100%" }}
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className={`relative z-10 grid md:grid-cols-12 gap-6 items-start transition-colors duration-500 ${hovered ? "text-paper" : ""}`}>
        <div className="md:col-span-1 font-mono text-xs opacity-60">
          0{index + 1}
        </div>
        <div className="md:col-span-4">
          <h3 className="font-display text-3xl md:text-5xl leading-tight">
            {exp.company}
          </h3>
          <p className={`text-sm mt-1 ${hovered ? "text-paper/70" : "text-muted-foreground"}`}>{exp.tag}</p>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm md:text-base leading-relaxed">{exp.desc}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.metrics.map((m, j) => (
              <span
                key={j}
                className={`text-xs font-mono px-2 py-1 rounded-full border ${hovered ? "border-paper/30 text-paper/80" : "border-ink/30"}`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-3 md:text-right font-mono text-xs uppercase tracking-wider">
          <div>{exp.role}</div>
          <div className={`mt-1 ${hovered ? "text-paper/60" : "text-muted-foreground"}`}>{exp.period}</div>
          <div className={`mt-1 ${hovered ? "text-paper/60" : "text-muted-foreground"}`}>{exp.type}</div>
        </div>
      </div>
    </motion.article>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-5 md:px-10 py-24 md:py-32 border-t border-ink/15 bg-ink text-paper">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
            (03) Навыки
          </p>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-5xl md:text-7xl leading-none">
            Инструментарий <span className="italic text-coral">designer'а</span>
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {Object.entries(skills).map(([group, items], gi) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-paper/60 mb-6 border-b border-paper/20 pb-3">
              {group}
            </h3>
            <ul className="space-y-3">
              {items.map((s) => (
                <li
                  key={s}
                  className="font-display text-2xl md:text-3xl leading-snug hover:text-coral hover:italic transition-all cursor-default"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="px-5 md:px-10 py-24 md:py-32 border-t border-ink/15">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (04) Образование
          </p>
        </div>
        <div className="md:col-span-9 space-y-10">
          {[
            {
              place: "Bang Bang Education",
              prog: "Арт-дирекшн цифрового продукта",
              year: "Курс",
            },
            {
              place: "Саратовский Государственный Университет им. Н.Г. Чернышевского",
              prog: "Институт филологии и журналистики",
              year: "Магистр",
            },
          ].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-ink/20 pb-6"
            >
              <div>
                <h3 className="font-display text-2xl md:text-4xl">{e.place}</h3>
                <p className="text-muted-foreground mt-1">{e.prog}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {e.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-5 md:px-10 py-32 md:py-48 border-t border-ink/15 relative overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12"
      >
        (05) Контакты — давайте поговорим
      </motion.p>

      <h2 className="font-display text-[16vw] md:text-[12vw] leading-[0.85] tracking-tight">
        <span className="italic text-coral">Let's</span><br />
        <a
          href="mailto:vereskunovadaria@gmail.com"
          className="inline-block hover:italic transition-all relative group"
        >
          create
          <span className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-1 bg-coral transition-all duration-500" />
        </a>
        <br />
        together.
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl">
        {[
          { l: "Email", v: "vereskunovadaria@gmail.com", h: "mailto:vereskunovadaria@gmail.com" },
          { l: "Telegram", v: "@dariayud", h: "https://t.me/dariayud" },
          { l: "Локация", v: "Рязань, Россия", h: "#" },
        ].map((c, i) => (
          <motion.a
            key={i}
            href={c.h}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="block p-6 rounded-2xl border border-ink/20 bg-card hover:bg-ink hover:text-paper hover:border-ink transition-all"
          >
            <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
              {c.l}
            </div>
            <div className="font-display text-2xl">{c.v}</div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-5 md:px-10 py-8 border-t border-ink/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
      <div>© 2026 Daria Vereskunova</div>
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-coral animate-blink" />
        Designed & coded with care
      </div>
    </footer>
  );
}
