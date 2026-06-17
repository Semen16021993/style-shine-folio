import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import wallpaper from "@/assets/wallpaper.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import memoji from "@/assets/memoji.jpg";
import iconPhotos from "@/assets/icon-photos.png";
import iconGal from "@/assets/icon-gal.svg";
import iconFigma from "@/assets/icon-figma-color.svg";
import iconPs from "@/assets/icon-ps.svg";
import iconAi from "@/assets/icon-ai.svg";
import iconId from "@/assets/icon-id.svg";
import iconIn from "@/assets/icon-in.svg";
import caseOrien from "@/assets/case-orien.jpg";
import mobileDarya from "@/assets/mobile/darya-photo.jpg";
import appCrypto from "@/assets/mobile/app-crypto.svg";
import app4dev from "@/assets/mobile/app-4dev.svg";
import appDebtor from "@/assets/mobile/app-debtor.svg";
import appEateasy from "@/assets/mobile/app-eateasy.svg";
import sysIcon1 from "@/assets/mobile/sys-1.svg";
import sysIcon2 from "@/assets/mobile/sys-2.svg";
import sysIcon3 from "@/assets/mobile/sys-3.svg";
import sysAqua from "@/assets/mobile/sys-aqua.svg";
import orien2 from "@/assets/orien-2.jpg";
import caseFourdev from "@/assets/case-fourdev.jpg";
import fourdev2 from "@/assets/fourdev-2.jpg";
import fourdev3 from "@/assets/fourdev-3.jpg";
import fourdev4 from "@/assets/fourdev-4.jpg";
import fourdev5 from "@/assets/fourdev-5.png";
import fourdev6 from "@/assets/fourdev-6.png";
import fourdev7 from "@/assets/fourdev-7.png";
import fourdev8 from "@/assets/fourdev-8.png";
import caseDebtor from "@/assets/case-debtor.jpg";
import debtor2 from "@/assets/debtor-2.jpg";
import debtor3 from "@/assets/debtor-3.jpg";
import debtor4 from "@/assets/debtor-4.jpg";
import cryptoCover from "@/assets/crypto-cover.png";
import cryptoBM from "@/assets/crypto-bm.png";
import cryptoMaket from "@/assets/crypto-maket.png";
import cryptoThemes from "@/assets/crypto-themes.png";
import cryptoColors from "@/assets/crypto-colors.png";
import cryptoDetails from "@/assets/crypto-details.png";

// Click sound feedback — iOS-style soft tap (Web Audio, no asset needed)
let _audioCtx: AudioContext | null = null;
function playTap() {
  if (typeof window === "undefined") return;
  try {
    _audioCtx ??= new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = _audioCtx!;
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    // iOS-style tap: soft sine tone + micro "click" brightness
    const toneOsc = ctx.createOscillator();
    const toneGain = ctx.createGain();
    toneOsc.type = "sine";
    toneOsc.frequency.setValueAtTime(900, now);
    toneOsc.frequency.exponentialRampToValueAtTime(380, now + 0.07);
    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.exponentialRampToValueAtTime(0.14, now + 0.003);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.10);
    toneOsc.connect(toneGain).connect(ctx.destination);
    toneOsc.start(now);
    toneOsc.stop(now + 0.11);

    // Subtle click layer for that crisp iOS feel
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "sine";
    clickOsc.frequency.setValueAtTime(1600, now);
    clickOsc.frequency.exponentialRampToValueAtTime(800, now + 0.02);
    clickGain.gain.setValueAtTime(0.0001, now);
    clickGain.gain.exponentialRampToValueAtTime(0.06, now + 0.001);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
    clickOsc.connect(clickGain).connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.03);
  } catch {}
}

// Typography: prevent dangling short prepositions/conjunctions ("висящие предлоги")
// by joining them to the next word with a non-breaking space.
const SHORT_WORDS = new Set([
  "в","и","а","у","о","с","к","я",
  "на","по","до","из","от","не","но","со","во","об","за","то","та","те","же","бы","ли","мы","ты","вы",
  "или","для","при","что","как","без","под","над","перед","через","про","ещё","уже","это","эти","том","там","тут",
]);
function nbsp(input: string): string {
  return input.replace(/(^|[\s(«"])([A-Za-zА-Яа-яЁё]{1,5}) (?=[A-Za-zА-Яа-яЁё0-9])/g, (m, pre, w) => {
    return SHORT_WORDS.has(w.toLowerCase()) ? `${pre}${w}\u00A0` : m;
  });
}

// Wraps a subtree and post-processes its text nodes to remove hanging prepositions.
function TypoScope({ children, as: As = "div", className }: { children: ReactNode; as?: "div" | "span"; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const toFix: Text[] = [];
    let n: Node | null = walker.nextNode();
    while (n) {
      if (n.nodeValue && /\s/.test(n.nodeValue)) toFix.push(n as Text);
      n = walker.nextNode();
    }
    for (const t of toFix) {
      const fixed = nbsp(t.nodeValue || "");
      if (fixed !== t.nodeValue) t.nodeValue = fixed;
    }
  });
  return <As ref={ref as never} className={className}>{children}</As>;
}


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
  emblem?: string;
  x: number;
  y: number;
  rot?: number;
  disabled?: boolean;
  href?: string;
}

const FIGMA_URL = "https://www.figma.com/design/tPwY5DNw9Q20JQzMyMVldC/Design-System-%7C-Ui-Kit?node-id=403-674&p=f&t=aq5IZpO7bMZti4sO-0";

// Case folders are clustered in the upper-right "projects" cloud so the
// hierarchy reads: «папки = кейсы», even when the rest is scattered.
const items: DesktopItem[] = [
  // === Cluster: case folders (upper-right) ===
  { id: "orien",   label: "Сryptowallet 2025-26", icon: "folder", color: "#7FB3D5", emblem: "₿",  x: 72, y: 24, rot: -4 },
  { id: "fourdev", label: "4Dev.tech 2023-25",    icon: "folder", color: "#A8C9A8", emblem: "</>", x: 86, y: 32, rot: 3 },
  { id: "debtor",  label: "Должник прав 2023",    icon: "folder", color: "#E5B97F", emblem: "⚖",  x: 78, y: 48, rot: -2 },
  // === Scattered tools ===
  { id: "gallery", label: "Галерея", icon: "gallery", x: 18, y: 38, rot: -5 },
  { id: "figma",   label: "Figma",   icon: "figma",   x: 32, y: 68, rot: 4, href: FIGMA_URL },
  { id: "cv",      label: "CV",      icon: "pdf",     x: 58, y: 78, rot: -3 },
];



type DockIconKey = "gal" | "figma" | "ps" | "ai" | "id" | "in";
const dockItems: { id: DockIconKey | "gallery"; label: string; icon: DockIconKey; disabled?: boolean; href?: string }[] = [
  { id: "gallery", label: "Галерея", icon: "gal" },
  { id: "figma", label: "Figma", icon: "figma", href: FIGMA_URL },
  { id: "ps", label: "Adobe Photoshop", icon: "ps", disabled: true },
  { id: "ai", label: "Adobe Illustrator", icon: "ai", disabled: true },
  { id: "id", label: "Adobe After Effects", icon: "id", disabled: true },
  { id: "in", label: "Adobe InDesign", icon: "in", disabled: true },
];
const dockIconMap: Record<DockIconKey, string> = {
  gal: iconGal,
  figma: iconFigma,
  ps: iconPs,
  ai: iconAi,
  id: iconId,
  in: iconIn,
};

function Desktop() {
  const [open, setOpen] = useState<WindowId[]>([]);
  const [focus, setFocus] = useState<WindowId | null>(null);
  const [phoneMode, setPhoneMode] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setPhoneMode(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const openWindow = (id: WindowId) => {
    setOpen((s) => (s.includes(id) ? s : [...s, id]));
    setFocus(id);
  };
  const closeWindow = (id: WindowId) =>
    setOpen((s) => s.filter((i) => i !== id));

  return (
    <div className={`fixed inset-0 overflow-hidden ${phoneMode ? "flex items-center justify-center bg-zinc-950" : "block"}`}>
      <div
        className={`relative overflow-hidden font-sans text-ink select-none ${
          phoneMode
            ? "rounded-[44px] ring-[10px] ring-black shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            : "w-full h-full"
        }`}
        style={
          phoneMode
            ? {
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "min(92vw, calc(92vh * 9 / 19.5))",
                aspectRatio: "9 / 19.5",
              }
            : {
                background:
                  "radial-gradient(ellipse at top, #e9e4dc 0%, #d8d2c7 55%, #c8c1b4 100%)",
              }
        }
      >
        {phoneMode ? (
          <MobileHome onOpen={openWindow} />
        ) : (
          <>
            <MenuBar focused={focus} />

            {/* Welcome sticky note */}
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-14 left-4 md:left-12 w-[280px] md:w-[340px] p-5 bg-note shadow-2xl"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
            >
              <h1 className="font-display text-2xl md:text-3xl leading-tight font-semibold">
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

            {items.map((item, i) => (
              <DesktopIcon
                key={item.id}
                item={item}
                delay={0.5 + i * 0.05}
                onOpen={() => {
                  if (item.disabled) return;
                  if (item.href) {
                    window.open(item.href, "_blank", "noopener,noreferrer");
                    return;
                  }
                  if (item.id === "cv") {
                    window.open("https://docs.google.com/document/d/12Lyzo4MLM1DhmpTNTif1u9eAyQeliljbuUQ1dLv_KlE/edit?tab=t.0", "_blank", "noopener,noreferrer");
                    return;
                  }
                  openWindow(item.id as WindowId);
                }}
              />
            ))}

            <ZoomCall />
          </>
        )}

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
    </div>
  );
}

function MobileHome({ onOpen }: { onOpen: (id: WindowId) => void }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  const apps: { id: WindowId; label: string; icon: string }[] = [
    { id: "orien", label: "Crypto", icon: appCrypto },
    { id: "fourdev", label: "4Dev", icon: app4dev },
    { id: "debtor", label: "Должник прав", icon: appDebtor },
    { id: "gallery", label: "EatEasy", icon: appEateasy },
  ];

  const dock: { src: string; label: string; href?: string; action?: "gallery" }[] = [
    { src: sysIcon1, label: "Телефон", href: "tel:+79109076181" },
    { src: sysIcon3, label: "Почта", href: "mailto:vereskunovadaria@gmail.com" },
    { src: sysIcon2, label: "Фото", action: "gallery" },
    { src: sysAqua, label: "Telegram", href: "https://t.me/DariaIud" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Dynamic island */}
      <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full bg-black z-[200]" />

      {/* Status bar */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-3 text-white text-[14px] font-semibold tabular-nums drop-shadow">
        <span>{time}</span>
        <span className="flex items-center gap-1 text-[11px]">
          <span>•••</span>
          <span>5G</span>
          <span className="ml-1 w-6 h-2.5 rounded-sm border border-white/80 relative">
            <span className="absolute inset-0.5 bg-white rounded-[1px]" />
          </span>
        </span>
      </div>

      {/* Background photo — full cover */}
      <img
        src={mobileDarya}
        alt=""
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center z-0 select-none"
        draggable={false}
      />

      {/* Content area */}
      <div className="relative z-[5] flex-1 flex flex-col px-4 pt-8 pb-4 gap-4">
        {/* Notes widget — iOS style with yellow header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="rounded-[22px] overflow-hidden shadow-lg bg-white/95 backdrop-blur"
          style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.22)" }}
        >
          <div className="bg-[#FFC93D] px-4 py-2.5 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
            </svg>
            <span className="text-white text-[15px] font-semibold leading-none">Заметки</span>
          </div>
          <div className="px-4 py-2 text-[13px] text-ink leading-snug border-b border-ink/10">
            Привет, я&nbsp;Дарья! Проектирую сложные цифровые продукты, которые решают реальные бизнес-задачи.
          </div>
          <div className="px-4 py-2 text-[13px] text-ink/90 flex items-center justify-between">
            <span>Новая заметка</span>
            <span className="w-6 h-6 rounded-md bg-ink/5 grid place-items-center text-ink/40 text-[12px]">✎</span>
          </div>
        </motion.div>

        {/* "Заметки" label centered under widget */}
        <div className="text-center text-white text-[11px] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] -mt-2">
          Заметки
        </div>

        {/* App row — 4 in a single row */}
        <div className="grid grid-cols-4 gap-2 w-full">
          {apps.map((a, i) => (
            <motion.button
              key={a.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 220, damping: 18 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => { playTap(); onOpen(a.id); }}
              className="flex flex-col items-center gap-1 group"
            >
              <img
                src={a.icon}
                alt={a.label}
                className="w-[60px] h-[60px] rounded-[14px] object-cover shadow-md"
              />
              <span className="text-white text-[11px] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] leading-tight text-center max-w-[72px] truncate">
                {a.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Search pill */}
        <div className="mx-auto px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-xl text-white text-[13px] flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          Поиск
        </div>

        {/* Dock */}
        <div className="mt-2 rounded-[28px] bg-white/25 backdrop-blur-2xl border border-white/30 px-3 py-3 flex justify-around items-center shadow-xl">
          {dock.map((d, i) => {
            const inner = (
              <img
                src={d.src}
                alt={d.label}
                className="w-[60px] h-[60px] rounded-[14px] object-cover"
                draggable={false}
              />
            );
            const common = "block";
            if (d.action === "gallery") {
              return (
                <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => { playTap(); onOpen("gallery"); }} className={common} aria-label={d.label}>
                  {inner}
                </motion.button>
              );
            }
            return (
              <motion.a
                key={i}
                whileTap={{ scale: 0.9 }}
                href={d.href}
                target={d.href?.startsWith("http") ? "_blank" : undefined}
                rel={d.href?.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => playTap()}
                className={common}
                aria-label={d.label}
              >
                {inner}
              </motion.a>
            );
          })}
        </div>

        {/* Home indicator */}
        <div className="mx-auto w-32 h-1 rounded-full bg-white/80" />
      </div>
    </div>
  );
}

function Dock({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 22 }}
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[90] flex items-end gap-2 px-3 py-2 rounded-2xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl"
      style={{ boxShadow: "0 15px 50px rgba(0,0,0,0.25)" }}
    >
      {dockItems.map((it) => (
        <motion.button
          key={it.id}
          whileHover={{ scale: 1.25, y: -8 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          onClick={() => {
            playTap();
            if (it.disabled) return;
            if (it.href) {
              window.open(it.href, "_blank", "noopener,noreferrer");
              return;
            }
            onOpen(it.id as WindowId);
          }}
          className="relative size-12 flex items-center justify-center group"
          title={it.label}
        >
          <img
            src={dockIconMap[it.icon]}
            alt={it.label}
            className="w-11 h-11 rounded-[22%] object-cover drop-shadow"
          />
          <span className="absolute -top-8 px-2 py-1 rounded bg-black/75 text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {it.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}

function ZoomCall() {
  const [visible, setVisible] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 180, damping: 20 }}
          drag
          dragMomentum={false}
          className="absolute bottom-32 left-6 md:left-12 w-[420px] md:w-[480px] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-white/10 z-[55] cursor-grab active:cursor-grabbing"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
        >
          {/* Header */}
          <div className="h-7 px-3 flex items-center justify-between bg-[#2d2d2d] text-white/80 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-medium">Zoom Meeting · 00:{mm}:{ss}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
          </div>
          {/* Stage */}
          <div className="p-1 bg-black">
            <div
              className="relative aspect-video rounded-md flex items-center justify-center overflow-hidden ring-2 ring-[#28c840]"
              style={{ background: "linear-gradient(135deg, #e85d75, #e85d7599)" }}
            >
              <div className="size-16 rounded-full bg-white/90 grid place-items-center font-display text-3xl text-ink shadow">
                Д
              </div>
              <div className="absolute bottom-1.5 left-2 text-[11px] text-white font-medium drop-shadow">
                Дарья (вы)
              </div>
              <div className="absolute bottom-1.5 right-2 flex items-end gap-0.5 h-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 bg-[#28c840] rounded-full"
                    animate={{ height: ["30%", "100%", "50%", "80%", "30%"] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur text-white text-[10px] font-medium flex items-center gap-1.5">
                <motion.span
                  className="size-1.5 rounded-full bg-white/80"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                Ожидание участников…
              </div>
            </div>
          </div>
          {/* Controls */}
          <div className="h-11 px-3 flex items-center justify-center gap-2 bg-[#2d2d2d] border-t border-white/5">
            {[
              { icon: "🎙", bg: "bg-white/10" },
              { icon: "💬", bg: "bg-white/10" },
              { icon: "🖥", bg: "bg-white/10" },
              { icon: "✋", bg: "bg-white/10" },
            ].map((b, i) => (
              <button
                key={i}
                className={`size-7 rounded-md ${b.bg} hover:bg-white/20 transition-colors grid place-items-center text-[12px]`}
              >
                {b.icon}
              </button>
            ))}
            <button
              onClick={() => { playTap(); setVisible(false); }}
              className="size-7 rounded-md bg-red-500 hover:bg-red-600 transition-colors grid place-items-center text-[12px] shadow-[0_0_0_2px_rgba(239,68,68,0.35)]"
              aria-label="Завершить звонок"
              title="Завершить звонок"
            >
              📞
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuBar({ focused: _focused }: { focused: WindowId | null }) {
  void _focused;
  const [stamp, setStamp] = useState("");
  useEffect(() => {
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря",
    ];
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setStamp(`${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 1000 * 15);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute top-0 inset-x-0 z-[100] h-8 bg-white/40 backdrop-blur-2xl border-b border-white/30 flex items-center justify-between px-4 text-xs text-ink">
      <div className="flex items-center gap-3">
        <img src={memoji} alt="" className="size-6 rounded-full object-cover" />
        <span>
          <span className="font-normal">Дарья Верескунова</span>
          <span className="mx-1.5 text-ink/40">·</span>
          <span className="font-semibold">Product designer</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="tabular-nums font-semibold">{stamp}</span>
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
      onClick={() => { if (!item.disabled) playTap(); onOpen(); }}
      disabled={item.disabled}
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 w-36 drop-shadow-xl rounded-[22%] text-base font-normal group ${item.disabled ? "cursor-default opacity-90" : "cursor-pointer"}`}
    >
      <IconGraphic icon={item.icon} color={item.color} />
      <div className="text-center px-2 py-0.5 rounded text-ink text-[15px] leading-tight font-semibold drop-shadow-sm group-hover:bg-coral/80 group-hover:text-white transition-colors">
        {item.label}
        {item.sublabel && <div className="text-[12px] opacity-80">{item.sublabel}</div>}
      </div>
    </motion.button>
  );
}

function IconGraphic({ icon, color }: { icon: DesktopItem["icon"]; color?: string }) {
  if (icon === "folder") {
    return (
      <svg viewBox="0 0 64 52" className="w-36 h-32 drop-shadow-xl">
        <path d="M2 10 Q2 4 8 4 L22 4 L28 10 L56 10 Q62 10 62 16 L62 44 Q62 50 56 50 L8 50 Q2 50 2 44 Z" fill={color || "#7FB3D5"} stroke="rgba(0,0,0,0.15)" />
        <path d="M2 18 L62 18" stroke="rgba(255,255,255,0.4)" />
      </svg>
    );
  }
  if (icon === "gallery") {
    return (
      <div className="w-32 h-32 grid place-items-center">
        <img src={iconPhotos} alt="" className="w-32 h-32 drop-shadow-xl rounded-[22%] object-contain" />
      </div>
    );
  }
  if (icon === "figma") {
    return (
      <div className="w-32 h-32 grid place-items-center">
        <img src={iconFigma} alt="" className="w-32 h-32 drop-shadow-xl rounded-[22%] object-contain" />
      </div>
    );
  }
  if (icon === "photoshop") {
    return (
      <div className="w-32 h-32 grid place-items-center">
        <img src={iconPs} alt="" className="w-32 h-32 drop-shadow-xl rounded-[22%] object-contain" />
      </div>
    );
  }
  if (icon === "note") {
    return (
      <div className="w-32 h-32 bg-white shadow-xl p-3 flex flex-col gap-1.5 -rotate-2 drop-shadow-xl">
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
      <div className="w-28 h-32 bg-white shadow-xl rounded-md relative drop-shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-ink/10" style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0)" }} />
        <div className="absolute inset-x-3 top-10 space-y-2">
          <div className="h-[2px] bg-ink/30 w-full" />
          <div className="h-[2px] bg-ink/20 w-5/6" />
          <div className="h-[2px] bg-ink/20 w-full" />
          <div className="h-[2px] bg-ink/20 w-2/3" />
          <div className="h-[2px] bg-ink/20 w-full" />
          <div className="h-[2px] bg-ink/20 w-4/6" />
        </div>
        <div className="absolute bottom-2 inset-x-0 text-center text-[11px] font-bold tracking-wider text-coral">DOC</div>
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        onMouseDown={onFocus}
        style={{ zIndex }}
        className="absolute inset-0 bg-white flex flex-col"
      >
        <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full bg-black z-[10]" />
        <div className="h-14 px-3 pt-3 flex items-center gap-2 border-b border-ink/10">
          <button onClick={onClose} className="flex items-center gap-1 text-[15px] text-[#007aff] font-medium px-2 py-1 -ml-2 active:opacity-60">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 6-6 6 6 6"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[14px] font-semibold text-ink truncate px-2">{config.title}</div>
          <div className="w-14" />
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 pb-10">
          {config.body}
        </div>
        <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-black/80" />
      </motion.div>
    );
  }

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
      style={{ zIndex }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(820px,92vw)] max-h-[82vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-ink/10"
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
    body: <FourDevCase />,
  },
  orien: {
    title: "Crypto Orien.AI 2025–2026 — Crypto Wallet",
    body: <OrienCase />,
  },
  debtor: {
    title: "Должник прав 2023 — Mobile App",
      body: <CaseStudy
      cover={caseDebtor}
      tag="Юридическое мобильное приложение · part-time"
      period="2023"
      lead="Должник прав — цифровой юрист в кармане. Мобильное приложение для клиентов в сложной финансовой ситуации; работа строится через персональных менеджеров."
      sections={[
        {
          h: "Контекст",
          p: "Компания оказывает юридическую помощь людям с долговой нагрузкой. \n\nБизнес-модель двухэтапная: \n1) пользователь оплачивает тариф; \n2) после оплаты открывается дело и начинается сопровождение. \n\nКлючевая точка роста — конверсия в оплату и дальнейшее удержание клиента в процессе сопровождения.\n",
        },
        {
          h: "Задачи",
          p: "Через дизайн повлиять на ключевые бизнес-метрики: увеличить Conv. to Pay и Completion Rate анкеты, снизить число обращений к менеджерам по статусам и документам, повысить ощущение контроля и прозрачности у клиента, упростить работу персональных менеджеров.",
        },
        {
          h: "Анкета как «скрытый обязательный шаг»",
          p: "Для запуска сопровождения требовалось заполнение подробной анкеты. Раньше она открывалась после регистрации и частично — уже в коммуникации с менеджером: пользователи откладывали её, возникали уточняющие звонки, оплаченное дело стартовало медленнее, росла нагрузка на менеджеров. Гипотеза: если встроить анкету в онбординг, объяснить ценность, разбить на этапы, добавить progress bar и автосохранение — пользователи будут чаще доводить её до конца, а Time to Case Start сократится.",
        },
      ]}
      image={debtor3}
      imageCaption="Ключевые экраны, с которыми чаще всего взаимодействует пользователь"
      problems={[
        "Пользователи не всегда понимали статус своего дела",
        "Анкеты заполнялись не с первого раза, к ним часто возвращались",
        "До 40% первичных звонков менеджеру были связаны с заполнением анкеты",
        "Менеджеры тратили много времени на телефонные консультации и уточнения",
        "Оплата — критичная бизнес-точка — не была достаточно прозрачной",
        "Бизнес терял конверсию в оплату, скорость онбординга и операционную эффективность",
      ]}
      did={[
        "Провела анализ бизнес-процессов",
        "Участвовала в подготовке UX-исследования",
        "Разработала пользовательские сценарии",
        "Спроектировала структуру приложения",
        "Продумала логику оплаты и анкеты",
        "Сформировала прототипы ключевых экранов",
        "Участвовала в анализе результатов тестирования",
      ]}
      gallery={[
        { src: debtor2, cap: "Фактически анкета была «скрытым обязательным шагом», который откладывался пользователями, вызывал большое количество уточняющих звонков, замедлял запуск оплаченного дела и увеличивал нагрузку на менеджеров." },
        { src: debtor4, cap: "Проблемы → Гипотезы → Реализация: обязательный шаг онбординга, прогресс-бар, подсказки внутри формы, автосохранение данных" },
      ]}
      results={[
        "Conversion to Payment: +8 п.п. (с 41% до 49%) — за счёт упрощённого экрана оплаты и прозрачного статуса счёта",
        "Completion Rate анкеты: +22% (с 55% до 67%) — разбивка на этапы, progress bar, сохранение промежуточных данных",
        "Среднее время прохождения анкеты: −18%",
        "Количество входящих обращений на клиента: −27% — прозрачные этапы в «Моё дело», встроенные комментарии, структурированная загрузка документов",
        "Time to Case Start: −24% — быстрее оплата, выше completion анкеты, меньше ручных уточнений",
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
    title: "Фото",
    body: (
      <div className="-m-6 bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-b-2xl">
        {/* iOS 26 Photos header */}
        <div className="px-5 pt-5 pb-3 flex items-end justify-between">
          <div>
            <h2 className="text-[34px] leading-tight font-semibold tracking-tight text-ink">Недавние</h2>
            <p className="text-[13px] text-ink/50 mt-0.5">4 фото · 2025</p>
          </div>
          <div className="size-9 rounded-full bg-white/80 backdrop-blur grid place-items-center text-ink/70 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </div>
        </div>
        {/* Squircle grid */}
        <div className="px-3 pb-5 grid grid-cols-2 gap-1.5">
          {[
            { src: gallery1, cap: "Готовимся к большому выступлению с Шерханом, Раджой, Диего и Тигрой" },
            { src: gallery2, cap: "Усердно тренируемся три раза по 2-3 часа каждый день" },
            { src: gallery3, cap: "Наконец-то добрались" },
            { src: gallery4, cap: "Отдыхаем в Камакуре" },
          ].map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 22 }}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-[22px] aspect-square cursor-pointer group"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
            >
              <img src={p.src} alt={p.cap} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <figcaption className="absolute bottom-2 left-3 text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">{p.cap}</figcaption>
            </motion.figure>
          ))}
        </div>
        {/* iOS tab bar */}
        <div className="mx-3 mb-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm px-2 py-2 flex justify-around text-[10px] text-ink/60">
          {["Библиотека","Для вас","Альбомы","Поиск"].map((t,i) => (
            <div key={t} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl ${i===0?"text-coral":""}`}>
              <div className="w-4 h-4 rounded-sm bg-current opacity-70" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

interface CaseSection { h: string; p: string }
interface GalleryItem { src: string; cap: string }

function FourDevCase() {
  const cap = "text-ink/60 font-medium text-gray-500 font-sans text-center text-sm";
  const h4 = "font-mono text-xs uppercase tracking-widest text-ink/60 mb-2 font-semibold";
  const fullImg = "w-full rounded-lg border border-ink/10 -mx-2 md:-mx-4 max-w-[calc(100%+2rem)]";

  return (
    <TypoScope className="space-y-6">

      {/* Cover image first */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg overflow-hidden border border-ink/10 bg-ink/5 -mx-2 md:-mx-4"
      >
        <img src={caseFourdev} alt="Дашборд продаж 4DEV" loading="lazy" className="w-full h-auto block" />
      </motion.div>

      {/* Tag row — unified with other cases */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <span className="px-2 py-1 rounded bg-coral/15 text-coral">{nbsp("SaaS для девелопмента · full-time")}</span>
        <span className="px-2 py-1 rounded bg-ink/5 text-ink/70">2023 — 2025</span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl leading-tight font-semibold">
        {nbsp("Экосистема для автоматизации девелопмента")}
      </h2>

      {/* Контекст и задачи */}
      <div>
        <h4 className={h4}>Контекст и задачи</h4>
        <p className="leading-relaxed text-ink/80 text-base">
          4DEV — это IT-экосистема для автоматизации девелопмента, которая помогает застройщикам, банкам и ритейлерам управлять продажами недвижимости. Платформа уже интегрирована с 35 внешними сервисами и насчитывает 65 клиентов по всей России, экономя им свыше 1 млн рублей на автоматизации.
        </p>
        <p className="mt-3 text-sm leading-relaxed italic text-ink/70 border-l-2 border-coral pl-3">
          Продукт работает в сложной правовой среде: любая сделка с недвижимостью требует проверок со стороны банков и Росреестра, что создаёт естественные паузы и риски срывов. Именно в этих точках возникает напряжение у пользователей — как у профессиональных менеджеров отдела продаж, так и у конечных клиентов-покупателей.
        </p>
      </div>

      {/* Page 2 — клиенты + donut */}
      <motion.img
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={fourdev2}
        alt="Реестр клиентов и аналитика"
        loading="lazy"
        className={fullImg}
      />

      {/* Анализ текущего продукта */}
      <div>
        <h4 className={h4}>Анализ текущего продукта показал</h4>
        <ol className="space-y-1.5 text-sm list-decimal pl-5 text-ink/80">
          <li>Низкая прозрачность сделок: статусы не обновлялись &gt;24 часов, CSI — 6,5/10.</li>
          <li>12% ошибок в бронировании.</li>
          <li>До 34% гарантийных заявок становились просроченными; реакция — 3,2 дня.</li>
          <li>Интерфейс не учитывал реальные сбои, что приводило к повторным действиям.</li>
          <li>Отсутствие единой UI-системы ограничивало масштабирование продукта.</li>
        </ol>
      </div>

      {/* Моя роль в проекте */}
      <div>
        <h4 className={h4}>Моя роль в проекте</h4>
        <ol className="space-y-1.5 text-sm list-decimal pl-5 text-ink/80">
          <li>Провела пользовательские интервью с менеджерами продаж, РОПом, специалистами по гарантии;</li>
          <li>Анализировала операционные сценарии;</li>
          <li>Формировала UX-гипотезы;</li>
          <li>Проектировала новую информационную архитектуру;</li>
          <li>Разработала систему статусов и состояний;</li>
          <li>Создала масштабируемый UI-кит;</li>
          <li>Сопровождала внедрения и оценку метрик.</li>
        </ol>
      </div>

      {/* Highlighted teaser */}
      <p className="text-ink/60 font-medium text-left font-sans text-sm text-stone-500 mx-[40px] my-[20px] bg-zinc-50">
        Вот несколько наглядных примеров UX-решений, которые привели к успеху!
      </p>

      {/* Page 3 — Карточная система */}
      <figure className="space-y-2">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={fourdev3}
          alt="Карточная система управления гарантийными заявками"
          loading="lazy"
          className={fullImg}
        />
        <figcaption className={cap}>1. Карточная система управления гарантийными заявками</figcaption>
      </figure>

      <div>
        <h4 className={h4}>Ключевые решения</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2"><span className="text-coral">→</span>Цветной статус как основной якорь</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Показ только операционно важных данных</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Быстрые действия внутри карточки</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Сортировка и фильтрация без перестройки интерфейса</li>
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ Результат</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Просроченные заявки сократились на <b>11%</b></li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Среднее время реакции снизилось с 3,2 дней до <b>1,9 дней</b></li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Руководители тратят на контроль статусов на <b>15% меньше времени</b></li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Удовлетворённость внутренних пользователей выросла с 6,5 до <b>8,4/10</b></li>
        </ul>
      </div>

      {/* Page 4 — Шахматка */}
      <figure className="space-y-2">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={fourdev4}
          alt="Шахматка выбора квартир"
          loading="lazy"
          className={fullImg}
        />
        <figcaption className={cap}>2. Шахматка как основная модель выбора квартиры</figcaption>
      </figure>

      <p className="leading-relaxed text-ink/80 text-base">👉 Менеджер мыслит этажами и секциями, а не строками.</p>

      <div>
        <h4 className={h4}>Ключевые решения</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2"><span className="text-coral">→</span>Цветовая система статусов</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Фильтрация до взаимодействия (площадь, комнаты)</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Модальное окно без потери контекста</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Акцент на цене, статусе и площади</li>
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ Результат</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Время подбора сократилось с 7–10 минут до <b>4 минут</b></li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Ошибки при бронировании снизились с 12% до <b>5,5%</b></li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Количество кликов до бронирования уменьшилось на <b>6%</b></li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Увеличение скорости обработки лида на <b>15%</b></li>
        </ul>
      </div>

      {/* Вывод */}
      <div className="space-y-3 pt-2 border-t border-ink/10">
        <h3 className="font-display text-2xl">Вывод</h3>
        <p className="leading-relaxed text-ink/80 text-base">
          После внедрения система стала основным рабочим инструментом для отделов продаж и эксплуатации. Время подбора квартиры сократилось более чем в два раза — с 7–10 минут до 4 минут, что напрямую повлияло на скорость обработки входящих лидов и позволило увеличить операционную эффективность отдела на 15%.
        </p>
        <p className="leading-relaxed text-ink/80 text-base">
          Количество ошибок при бронировании снизилось с 12% до 5,5%, что уменьшило внутренние потери времени и снизило нагрузку на административные процессы. В блоке гарантийных заявок просрочки сократились на 11%, а среднее время реакции уменьшилось почти вдвое — с 3,2 до 1,9 дней.
        </p>
        <p className="leading-relaxed text-ink/80 text-base">
          Для руководителей система стала инструментом прозрачного контроля: время на мониторинг статусов сократилось на 45%, а субъективная оценка удобства работы выросла с 6,8 до 8,4 из 10.
        </p>
        <p className="leading-relaxed text-ink/80 text-base">
          Интерфейс начал влиять на ключевые бизнес-метрики: скорость операций, количество ошибок, нагрузку на административные процессы и удовлетворённость пользователей.
        </p>
      </div>
    </TypoScope>

  );
}

function OrienCase() {
  const h4 = "font-mono text-xs uppercase tracking-widest text-ink/60 mb-2 font-semibold";
  const fullImg = "w-full rounded-lg border border-ink/10 -mx-2 md:-mx-4 max-w-[calc(100%+2rem)]";
  return (
    <TypoScope className="space-y-6">

      <motion.img
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src={cryptoCover}
        alt="Crypto Orien.AI — обложка"
        loading="lazy"
        className={fullImg}
      />

      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <span className="px-2 py-1 rounded bg-coral/15 text-coral">Криптокошелёк · part-time</span>
        <span className="px-2 py-1 rounded bg-ink/5 text-ink/70">2025 — 2026</span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl leading-tight font-semibold">
        Crypto Orien.AI — мобильный криптокошелёк
      </h2>

      <div>
        <h4 className={h4}>Контекст и задачи</h4>
        <p className="leading-relaxed text-ink/80 text-base">
          Crypto Orien.AI — мобильный криптокошелёк ранней стадии, созданный в условиях высокой конкуренции и низкого пользовательского доверия к новым Web3-продуктам. Основная аудитория — пользователи, уже знакомые с криптовалютой, но не удовлетворённые сложностью и перегруженностью существующих решений.
        </p>
      </div>

      <div>
        <h4 className={h4}>Проблемы</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2"><span className="text-coral">→</span>Пользователи останавливались на этапе создания кошелька</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Страх юзеров подтверждать операции</li>
          <li className="flex gap-2"><span className="text-coral">→</span>Мало пользователей доходили до целевых действий</li>
        </ul>
      </div>

      <div>
        <h4 className={h4}>Задачи</h4>
        <ol className="space-y-1.5 text-sm list-decimal pl-5 text-ink/80">
          <li>Спроектировать end-to-end user flow от регистрации до первой операции.</li>
          <li>Проработать нештатные сценарии: ошибки, задержки, отклонения.</li>
          <li>Оптимизировать шаги до первой финансовой операции.</li>
          <li>Снизить когнитивную нагрузку на этапе подтверждения.</li>
          <li>Встроить элементы, усиливающие ощущение контроля (история, прогресс, подтверждение статуса).</li>
          <li>Спроектировать информационную архитектуру с учётом будущих ролей и функций.</li>
          <li>Создать систему токенов и переменных для тем и состояний.</li>
          <li>Заложить масштабируемый UI-kit как основу дизайн-системы.</li>
          <li>Обеспечить консистентность паттернов для роста продукта.</li>
        </ol>
      </div>

      <div>
        <h4 className={h4}>Моя роль</h4>
        <ol className="space-y-1.5 text-sm list-decimal pl-5 text-ink/80">
          <li>Провела бенчмаркинг: изучила самые популярные приложения отрасли с похожими фичами, выявила их сильные и слабые стороны;</li>
          <li>Детально разобрала путь пользователя — от регистрации до первой реальной операции с деньгами. Было важно понять не только позитивные сценарии, но и все моменты, где что-то может пойти не так.</li>
          <li>Спроектировала user flow, рассматривала разные роли, точки принятия решений, системные события и возвраты.</li>
          <li>Разработала систему статусов и состояний;</li>
          <li>Создала масштабируемый UI-кит.</li>
        </ol>
      </div>

      <motion.img
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={cryptoBM}
        alt="Бенчмаркинг hot wallets"
        loading="lazy"
        className={fullImg}
      />

      <p className="font-display text-xl md:text-2xl leading-snug text-ink/90">
        Визуально продукт строился вокруг спокойствия и фокуса.
      </p>

      <motion.img
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={cryptoMaket}
        alt="Ключевые экраны приложения"
        loading="lazy"
        className={fullImg}
      />

      <div>
        <h4 className={h4}>Темы и состояния</h4>
        <p className="leading-relaxed text-ink/80 text-base">
          Тёмная тема стала основной — она лучше подходит для работы с финансовыми данными и длительного использования. Все экраны я сразу проектировала с расчётом на:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2"><span className="text-coral">→</span>перевод цветов и состояний в дизайн-токены;</li>
          <li className="flex gap-2"><span className="text-coral">→</span>использование variables для тем;</li>
          <li className="flex gap-2"><span className="text-coral">→</span>дальнейшее масштабирование в дизайн-систему.</li>
        </ul>
      </div>

      <motion.img
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={cryptoThemes}
        alt="Светлая и тёмная темы"
        loading="lazy"
        className={fullImg}
      />

      <motion.img
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={cryptoColors}
        alt="Дизайн-токены и примитивы"
        loading="lazy"
        className={fullImg}
      />

      <motion.img
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={cryptoDetails}
        alt="Детали интерфейса"
        loading="lazy"
        className={fullImg}
      />

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ Результаты</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Спроектирован end-to-end путь пользователя с прозрачными статусами операций, учитывающий ошибки, задержки и проверки.</li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Внедрена единая система статусов и UI-kit, готовая к масштабированию новых функций и ролей.</li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Интерфейс снижает неопределённость и когнитивную нагрузку, повышая доверие к финансовым операциям.</li>
          <li className="flex gap-2"><span className="text-emerald-600">✓</span>Подготовлена архитектура для последующего роста конверсии и уменьшения drop-off при запуске продукта с нуля.</li>
        </ul>
      </div>
    </TypoScope>

  );
}




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
    <TypoScope className="space-y-6">

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
      <p className="font-display text-2xl md:text-3xl leading-tight font-semibold">{lead}</p>

      {sections.map((s) => (
        <div key={s.h}>
          <h4 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2 font-semibold">{s.h}</h4>
          <p className="leading-relaxed text-ink/80 text-base whitespace-pre-line">{s.p}</p>
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
          {imageCaption && <figcaption className="text-ink/60 font-medium text-gray-500 font-sans text-center text-sm">{imageCaption}</figcaption>}
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
              <figcaption className="text-ink/60 font-medium text-gray-500 font-sans text-center text-sm">{g.cap}</figcaption>
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
    </TypoScope>

  );
}
