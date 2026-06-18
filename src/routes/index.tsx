import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import wallpaper from "@/assets/wallpaper.jpg";
import desktopBgAsset from "@/assets/desktop-bg.jpg.asset.json";
import gallery1 from "@/assets/gallery/photo-1.jpg.asset.json";
import gallery2 from "@/assets/gallery/photo-2.jpg.asset.json";
import gallery3 from "@/assets/gallery/photo-3.jpg.asset.json";
import gallery4 from "@/assets/gallery/photo-4.jpg.asset.json";
import gallery5 from "@/assets/gallery/photo-5.jpg.asset.json";
import gallery6 from "@/assets/gallery/photo-6.jpg.asset.json";
import memoji from "@/assets/memoji.jpg";
import iconPhotosAsset from "@/assets/icon-photos-new.png.asset.json";
import iconFigmaAsset from "@/assets/icon-figma-new.png.asset.json";
import mailIconAsset from "@/assets/mail-icon.svg.asset.json";
const mailIcon = mailIconAsset.url;
const iconPhotos = iconPhotosAsset.url;
const iconFigma = iconFigmaAsset.url;
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
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
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
  "в",
  "и",
  "а",
  "у",
  "о",
  "с",
  "к",
  "я",
  "на",
  "по",
  "до",
  "из",
  "от",
  "не",
  "но",
  "со",
  "во",
  "об",
  "за",
  "то",
  "та",
  "те",
  "же",
  "бы",
  "ли",
  "мы",
  "ты",
  "вы",
  "или",
  "для",
  "при",
  "что",
  "как",
  "без",
  "под",
  "над",
  "перед",
  "через",
  "про",
  "ещё",
  "уже",
  "это",
  "эти",
  "том",
  "там",
  "тут",
]);
function nbsp(input: string): string {
  return input.replace(/(^|[\s(«"])([A-Za-zА-Яа-яЁё]{1,5}) (?=[A-Za-zА-Яа-яЁё0-9])/g, (m, pre, w) => {
    return SHORT_WORDS.has(w.toLowerCase()) ? `${pre}${w}\u00A0` : m;
  });
}

// Wraps a subtree and post-processes its text nodes to remove hanging prepositions.
function TypoScope({
  children,
  as: As = "div",
  className,
}: {
  children: ReactNode;
  as?: "div" | "span";
  className?: string;
}) {
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
  return (
    <As ref={ref as never} className={className}>
      {children}
    </As>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Дарья Верескунова — Продуктовый дизайнер" },
      {
        name: "description",
        content: "Портфолио продуктового дизайнера. B2B/B2C, SaaS, дизайн-системы, мобильные приложения.",
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

const FIGMA_URL =
  "https://www.figma.com/design/tPwY5DNw9Q20JQzMyMVldC/Design-System-%7C-Ui-Kit?node-id=403-674&p=f&t=aq5IZpO7bMZti4sO-0";

// Case folders are clustered in the upper-right "projects" cloud so the
// hierarchy reads: «папки = кейсы», even when the rest is scattered.
const FOLDER_BLUE = "#9CC4E4";
const items: DesktopItem[] = [
  // === Case folders (center → right) ===
  { id: "orien", label: "Сryptowallet 2025-26", icon: "folder", color: FOLDER_BLUE, x: 54, y: 27, rot: -4 },
  { id: "fourdev", label: "4Dev.tech 2023-25", icon: "folder", color: FOLDER_BLUE, x: 69, y: 41, rot: 3 },
  { id: "debtor", label: "Должник прав 2023", icon: "folder", color: FOLDER_BLUE, x: 86, y: 52, rot: -2 },
  // === Tools (bottom-left cluster) ===
  { id: "gallery", label: "Галерея", icon: "gallery", x: 13, y: 63, rot: -5 },
  { id: "figma", label: "Figma", icon: "figma", x: 26, y: 74, rot: 4, href: FIGMA_URL },
  { id: "cv", label: "CV", icon: "pdf", x: 41, y: 60, rot: -3 },
];

type DockIconKey = "mail" | "figma" | "ps" | "ai" | "id" | "in";
const dockItems: {
  id: DockIconKey | "gallery";
  label: string;
  icon: DockIconKey;
  disabled?: boolean;
  href?: string;
}[] = [
  { id: "mail", label: "Почта", icon: "mail", href: "mailto:vereskunovadaria@gmail.com" },
  { id: "figma", label: "Figma", icon: "figma", href: FIGMA_URL },
  { id: "ps", label: "Adobe Photoshop", icon: "ps", disabled: true },
  { id: "ai", label: "Adobe Illustrator", icon: "ai", disabled: true },
  { id: "id", label: "Adobe After Effects", icon: "id", disabled: true },
  { id: "in", label: "Adobe InDesign", icon: "in", disabled: true },
];
const dockIconMap: Record<DockIconKey, string> = {
  mail: mailIcon,
  figma: iconFigma,
  ps: iconPs,
  ai: iconAi,
  id: iconId,
  in: iconIn,
};

const POS_STORAGE_KEY = "desktop-icon-positions-v4";
type Pos = { x: number; y: number };

function Desktop() {
  const [open, setOpen] = useState<WindowId[]>([]);
  const [focus, setFocus] = useState<WindowId | null>(null);
  const [phoneMode, setPhoneMode] = useState(false);
  const [positions, setPositions] = useState<Record<string, Pos>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(POS_STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setPhoneMode(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(POS_STORAGE_KEY, JSON.stringify(positions));
    } catch {}
  }, [positions]);

  const openWindow = (id: WindowId) => {
    setOpen((s) => (s.includes(id) ? s : [...s, id]));
    setFocus(id);
  };
  const closeWindow = (id: WindowId) => setOpen((s) => s.filter((i) => i !== id));

  const handleMove = (id: string, p: Pos) => setPositions((prev) => ({ ...prev, [id]: p }));

  return (
    <div className={`fixed inset-0 overflow-hidden ${phoneMode ? "block" : "block"}`}>
      <div
        ref={desktopRef}
        className={`relative overflow-hidden font-sans text-ink select-none ${
          phoneMode ? "w-full h-full" : "w-full h-full"
        }`}
        style={
          phoneMode
            ? {
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }
            : {
                backgroundImage: `url(${desktopBgAsset.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
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
              className="absolute top-16 left-4 md:left-12 w-[360px] md:w-[520px] p-5 md:p-6 bg-note shadow-2xl"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
            >
              <h1 className="font-display text-2xl md:text-[34px] leading-tight font-semibold">
                Привет! <span className="text-coral">🌸</span>
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed">
                Меня зовут <b>Дарья</b>, я проектирую цифровые продукты, которые решают реальные бизнес-задачи.
                Специализируюсь на <i>B2B/B2C</i>, SaaS, внутренних инструментах и системах автоматизации.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                Контакты:{" "}
                <a href="https://t.me/Darialud" target="_blank" rel="noreferrer" className="underline hover:text-coral">
                  @Darialud
                </a>{" "}
                ·{" "}
                <a href="mailto:vereskunova@gmail.com" className="underline hover:text-coral">
                  vereskunova@gmail.com
                </a>
              </p>
              <p className="mt-1 text-[15px]">Локация: Москва, РФ</p>
            </motion.div>

            <LocationWidget />

            {items.map((item, i) => {
              const pos = positions[item.id] ?? { x: item.x, y: item.y };
              return (
                <DesktopIcon
                  key={item.id}
                  item={item}
                  position={pos}
                  delay={0.5 + i * 0.05}
                  containerRef={desktopRef}
                  isDragging={draggingId === item.id}
                  onDragStart={() => setDraggingId(item.id)}
                  onDragEnd={() => setDraggingId(null)}
                  onMove={handleMove}
                  onOpen={() => {
                    if (item.disabled) return;
                    if (item.href) {
                      window.open(item.href, "_blank", "noopener,noreferrer");
                      return;
                    }
                    if (item.id === "cv") {
                      window.open(
                        "https://docs.google.com/document/d/12Lyzo4MLM1DhmpTNTif1u9eAyQeliljbuUQ1dLv_KlE/edit?tab=t.0",
                        "_blank",
                        "noopener,noreferrer",
                      );
                      return;
                    }
                    openWindow(item.id as WindowId);
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Windows overlay layer — fixed on top of everything, both mobile & desktop */}
      {!phoneMode && open.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[290] pointer-events-none"
        />
      )}
      <AnimatePresence>
        {open.map((id, i) => (
          <Window
            key={id}
            id={id}
            zIndex={(phoneMode ? 400 : 300) + i + (focus === id ? 20 : 0)}
            onClose={() => closeWindow(id)}
            onFocus={() => setFocus(id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function LocationWidget() {
  const [stamp, setStamp] = useState({ time: "", date: "" });
  useEffect(() => {
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setStamp({
        time: `${hh}:${mm}`,
        date: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`,
      });
    };
    tick();
    const id = setInterval(tick, 30 * 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 20 }}
      className="absolute top-14 right-6 md:right-10 w-[210px] rounded-3xl p-4 bg-white/45 border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[60]"
      style={{ backdropFilter: "blur(20px) saturate(160%)" }}
    >
      <div className="flex items-center gap-2 text-ink/70 text-[11px] font-medium uppercase tracking-wider">
        <span className="grid place-items-center size-5 rounded-full bg-coral/90 text-white text-[10px]">📍</span>
        Локация
      </div>
      <div className="mt-2 font-display text-[26px] leading-none font-semibold text-ink">Москва</div>
      <div className="mt-1 text-[12px] text-ink/60">{stamp.date} · MSK · UTC+3</div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="tabular-nums font-display text-[28px] font-semibold text-ink leading-none">{stamp.time}</span>
        <span className="text-[11px] text-ink/50">сейчас</span>
      </div>
    </motion.div>
  );
}

/**
 * ProductAssembly — 5 abstract shapes drift in from different directions
 * and assemble into a single centered square, symbolising «сборка продукта
 * из кусочков». Sits under the welcome sticky note.
 */
function ProductAssembly() {
  // Each piece has a starting offset (scattered) and a final position
  // inside the 220×220 assembled square. The final layout is a 2x2 grid
  // with one accent piece on top of the seam.
  const SIZE = 220;
  const pieces = [
    // [from x, from y, fromRotate, finalX, finalY, w, h, color, radius]
    { fx: -260, fy: -120, fr: -35, x: 0, y: 0, w: 110, h: 110, color: "#9CC4E4", r: 14 },
    { fx: 300, fy: -160, fr: 40, x: 110, y: 0, w: 110, h: 110, color: "#F5B7A3", r: 14 },
    { fx: -300, fy: 180, fr: 25, x: 0, y: 110, w: 110, h: 110, color: "#E8D5A8", r: 14 },
    { fx: 280, fy: 200, fr: -28, x: 110, y: 110, w: 110, h: 110, color: "#B8D4C2", r: 14 },
    // Accent: small centered square overlapping the seam
    { fx: 0, fy: -260, fr: 180, x: 70, y: 70, w: 80, h: 80, color: "#2B2B2B", r: 12 },
  ];

  return (
    <div className="absolute pointer-events-none z-[5]" style={{ left: 56, top: 420, width: SIZE, height: SIZE }}>
      {/* Soft halo that appears once pieces unite */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0, 0.9, 0.7, 0.9, 0.7], scale: [0.6, 0.6, 1, 1, 1, 1] }}
        transition={{ duration: 6, times: [0, 0.45, 0.7, 0.82, 0.92, 1], repeat: Infinity, repeatDelay: 1.2 }}
      />

      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute shadow-[0_8px_24px_rgba(60,80,110,0.18)]"
          style={{
            width: p.w,
            height: p.h,
            borderRadius: p.r,
            background: p.color,
            left: p.x,
            top: p.y,
          }}
          initial={{ x: p.fx, y: p.fy, rotate: p.fr, opacity: 0 }}
          animate={{
            x: [p.fx, p.fx * 0.35, 0, 0, p.fx, p.fx],
            y: [p.fy, p.fy * 0.35, 0, 0, p.fy, p.fy],
            rotate: [p.fr, p.fr * 0.4, 0, 0, p.fr, p.fr],
            opacity: [0, 1, 1, 1, 0, 0],
          }}
          transition={{
            duration: 6,
            times: [0, 0.35, 0.55, 0.8, 0.95, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.2,
            delay: i * 0.08,
          }}
        />
      ))}
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

  type MobileFolder =
    | { id: WindowId; label: string; href?: undefined; iconKind?: undefined }
    | { id: string; label: string; href: string; iconKind?: "figma" };
  const folders: MobileFolder[] = [
    { id: "orien", label: "Crypto" },
    { id: "fourdev", label: "4Dev" },
    { id: "debtor", label: "Должник" },
    { id: "gallery", label: "Галерея" },
    { id: "figma", label: "Figma", href: FIGMA_URL, iconKind: "figma" },
    {
      id: "cv",
      label: "CV",
      href: "https://docs.google.com/document/d/12Lyzo4MLM1DhmpTNTif1u9eAyQeliljbuUQ1dLv_KlE/edit?tab=t.0",
    },
  ];

  return (
    <div className="absolute inset-0 flex flex-col desktop-bg overflow-hidden">
      <div className="relative z-[5] flex-1 flex flex-col px-4 pt-8 pb-3 gap-3">
        {/* Sticky note — desktop style */}
        <motion.div
          initial={{ opacity: 0, y: -10, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="self-start w-[88%] p-3 bg-note shadow-2xl"
          style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.20)" }}
        >
          <h1 className="font-display text-[20px] leading-tight font-semibold">
            Привет! <span className="text-coral">🌸</span>
          </h1>
          <p className="mt-2 text-[16px] leading-snug">
            Меня зовут <b>Дарья</b>, я&nbsp;проектирую цифровые продукты, которые решают реальные бизнес-задачи.
          </p>
          <p className="mt-2 text-[16px] leading-snug">
            <a href="https://t.me/Darialud" target="_blank" rel="noreferrer" className="underline">
              @Darialud
            </a>{" "}
            ·{" "}
            <a href="mailto:vereskunova@gmail.com" className="underline">
              e-mail
            </a>
          </p>
        </motion.div>

        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="self-end -mt-2 rounded-2xl px-3 py-2 bg-white/85 border border-white/80 backdrop-blur-xl shadow-md"
          style={{ minWidth: 124 }}
        >
          <div className="flex items-center gap-1.5 text-ink/80 text-[10px] font-semibold uppercase tracking-wider">
            <span className="grid place-items-center size-4 rounded-full bg-coral text-white text-[8px]">📍</span>
            Локация
          </div>
          <div className="mt-0.5 font-display text-[16px] leading-none font-semibold text-ink">Москва</div>
          <div className="mt-0.5 text-[10px] text-ink/70 tabular-nums">{time} · MSK</div>
        </motion.div>

        {/* Folder grid — desktop blue folders, no emblems */}
        <div className="relative z-[10] grid grid-cols-3 gap-x-1 gap-y-1 w-full mt-1">
          {folders.map((f, i) => (
            <motion.button
              key={f.id}
              type="button"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.06, type: "spring", stiffness: 220, damping: 18 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                playTap();
                if (f.href) {
                  window.open(f.href, "_blank", "noopener,noreferrer");
                  return;
                }
                onOpen(f.id as WindowId);
              }}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              className="relative z-[10] flex flex-col items-center gap-0.5 cursor-pointer select-none"
            >
              <div className="w-[110px] h-[80px] grid place-items-center overflow-visible pointer-events-none">
                {f.iconKind === "figma" ? (
                  <img src={iconFigma} alt="" className="w-[72px] h-[72px] object-contain drop-shadow-xl" draggable={false} />
                ) : f.id === "gallery" ? (
                  <img src={iconPhotos} alt="" className="w-[72px] h-[72px] object-contain drop-shadow-xl" draggable={false} />
                ) : f.id === "cv" ? (
                  <IconGraphic icon="pdf" size={72} />
                ) : (
                  <IconGraphic icon="folder" color={FOLDER_BLUE} size={88} />
                )}
              </div>

              <span className="text-ink text-[11px] font-semibold leading-tight text-center pointer-events-none">{f.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 min-h-0" />

        {/* Search pill */}
        <div className="mx-auto px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-xl text-ink text-[13px] flex items-center gap-2 border border-white/60">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Поиск
        </div>

        {/* Dock — quick contacts */}
        <div className="mt-2 rounded-[28px] bg-white/45 backdrop-blur-2xl border border-white/60 px-3 py-3 flex justify-around items-center shadow-xl">
          {[
            { src: sysIcon1, label: "Телефон", href: "tel:+79109076181", contain: false },
            { src: mailIcon, label: "Почта", href: "mailto:vereskunovadaria@gmail.com", contain: true },
            { src: sysAqua, label: "Telegram", href: "https://t.me/DariaIud", contain: false },
          ].map((d, i) => {
            const inner = (
              <img
                src={d.src}
                alt={d.label}
                className={`w-[56px] h-[56px] rounded-[14px] ${d.contain ? "object-contain p-1" : "object-cover"}`}
                draggable={false}
              />
            );
            return (
              <motion.a
                key={i}
                whileTap={{ scale: 0.9 }}
                href={d.href}
                target={d.href?.startsWith("http") ? "_blank" : undefined}
                rel={d.href?.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => playTap()}
                aria-label={d.label}
              >
                {inner}
              </motion.a>
            );
          })}
        </div>

        {/* Home indicator */}
        <div className="mx-auto w-32 h-1 rounded-full bg-ink/70" />
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
          <img src={dockIconMap[it.icon]} alt={it.label} className="w-11 h-11 rounded-[22%] object-cover drop-shadow" />
          <span className="absolute -top-8 px-2 py-1 rounded bg-black/75 text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {it.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}

function MenuBar({ focused: _focused }: { focused: WindowId | null }) {
  void _focused;
  const [stamp, setStamp] = useState("");
  useEffect(() => {
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
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
  item,
  position,
  delay,
  containerRef,
  isDragging,
  onDragStart,
  onDragEnd,
  onMove,
  onOpen,
}: {
  item: DesktopItem;
  position: Pos;
  delay: number;
  containerRef: RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onMove: (id: string, p: Pos) => void;
  onOpen: () => void;
}) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
    pid: number;
  } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (item.disabled) return;
    if (e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: position.x,
      origY: position.y,
      moved: false,
      pid: e.pointerId,
    };
    btnRef.current?.setPointerCapture(e.pointerId);
    onDragStart();
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const st = dragRef.current;
    if (!st) return;
    const dx = e.clientX - st.startX;
    const dy = e.clientY - st.startY;
    if (!st.moved && Math.hypot(dx, dy) > 4) st.moved = true;
    if (st.moved) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = Math.max(4, Math.min(96, st.origX + (dx / rect.width) * 100));
      const ny = Math.max(8, Math.min(94, st.origY + (dy / rect.height) * 100));
      onMove(item.id, { x: nx, y: ny });
    }
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const st = dragRef.current;
    dragRef.current = null;
    try {
      btnRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
    onDragEnd();
    if (st && !st.moved) {
      if (!item.disabled) playTap();
      onOpen();
    }
  };

  return (
    <motion.button
      ref={btnRef}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={item.disabled || isDragging ? undefined : { scale: 1.07, y: -3 }}
      whileTap={item.disabled ? undefined : { scale: 0.95 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      disabled={item.disabled}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${item.rot ?? 0}deg)`,
        zIndex: isDragging ? 80 : 10,
        touchAction: "none",
      }}
      className={`absolute flex flex-col items-center gap-2 w-36 text-base font-normal group ${
        item.disabled ? "cursor-default opacity-90" : isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <IconGraphic icon={item.icon} color={item.color} />
      <div className="text-center px-2 py-0.5 rounded text-ink text-[15px] leading-tight font-semibold drop-shadow-sm group-hover:bg-coral/80 group-hover:text-white transition-colors">
        {item.label}
        {item.sublabel && <div className="text-[12px] opacity-80">{item.sublabel}</div>}
      </div>
    </motion.button>
  );
}

function IconGraphic({
  icon,
  color,
  size,
}: {
  icon: DesktopItem["icon"];
  color?: string;
  emblem?: string;
  size?: number;
}) {
  const sizeStyle = size ? { width: size, height: (size * 128) / 144 } : undefined;
  if (icon === "folder") {
    const base = color || "#9CC4E4";
    // SVG fragment ids can't contain "#" — strip it so url(#fb-XXXXXX) parses correctly
    const slug = base.replace(/[^a-zA-Z0-9]/g, "");
    return (
      <div
        className={size ? "relative group/folder" : "relative w-36 h-32 group/folder"}
        style={sizeStyle}
      >
        <svg
          viewBox="0 0 144 128"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 6px 10px rgba(120,160,200,0.25))" }}
        >
          <defs>
            <linearGradient id={`fb-${slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={base} stopOpacity="0.9" />
              <stop offset="1" stopColor={base} stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id={`ff-${slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={base} />
              <stop offset="1" stopColor={base} />
            </linearGradient>
            <linearGradient id={`gloss-${slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Back tab */}
          <path d="M6 22 Q6 12 16 12 L52 12 L64 22 L128 22 Q138 22 138 32 L138 44 L6 44 Z" fill={`url(#fb-${slug})`} />
          {/* Inside (papers) */}
          <rect x="18" y="34" width="108" height="60" rx="3" fill="#fafaf6" opacity="0.95" />
          <rect x="24" y="40" width="80" height="3" rx="1.5" fill="#000" opacity="0.06" />
          <rect x="24" y="48" width="60" height="3" rx="1.5" fill="#000" opacity="0.05" />
          {/* Front body — flat, no darkening */}
          <path
            d="M6 44 L138 44 L138 108 Q138 120 126 120 L18 120 Q6 120 6 108 Z"
            fill={`url(#ff-${slug})`}
            className="origin-bottom transition-transform duration-300 group-hover/folder:[transform:rotateX(8deg)_translateY(-2px)]"
            style={{ transformOrigin: "50% 100%" }}
          />
          {/* Top gloss */}
          <path d="M6 44 L138 44 L138 62 Q72 76 6 62 Z" fill={`url(#gloss-${slug})`} />
          {/* Edge highlight */}
          <path d="M6 44 L138 44" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }
  if (icon === "gallery") {
    return (
      <div className="w-32 h-32 grid place-items-center">
        <img src={iconPhotos} alt="" className="w-32 h-32 drop-shadow-xl object-contain" />
      </div>
    );
  }
  if (icon === "figma") {
    return (
      <div className="w-32 h-32 grid place-items-center">
        <img src={iconFigma} alt="" className="w-32 h-32 drop-shadow-xl object-contain" />
      </div>
    );
  }
  if (icon === "photoshop") {
    return (
      <div className="w-32 h-32 grid place-items-center">
        <img src={iconPs} alt="" className="w-28 h-28 drop-shadow-xl rounded-[22%] object-contain" />
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
    const pdfStyle = size ? { width: (size * 28) / 36, height: (size * 32) / 36 } : undefined;
    return (
      <div
        className={
          size
            ? "bg-white shadow-xl rounded-md relative drop-shadow-xl overflow-hidden"
            : "w-28 h-32 bg-white shadow-xl rounded-md relative drop-shadow-xl overflow-hidden"
        }
        style={pdfStyle}
      >
        <div
          className="absolute top-0 right-0 w-8 h-8 bg-ink/10"
          style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0)" }}
        />
        <div className="absolute inset-x-3 top-10 space-y-2">
          <div className="h-[2px] bg-ink/30 w-full" />
          <div className="h-[2px] bg-ink/20 w-5/6" />
          <div className="h-[2px] bg-ink/20 w-full" />
          <div className="h-[2px] bg-ink/20 w-2/3" />
          <div className="h-[2px] bg-ink/20 w-full" />
          <div className="h-[2px] bg-ink/20 w-4/6" />
        </div>
        <div className="absolute bottom-2 inset-x-0 text-center text-[11px] font-bold tracking-wider text-coral">
          DOC
        </div>
      </div>
    );
  }
  return (
    <div
      className="w-24 h-24 rounded-2xl shadow-xl grid place-items-center text-4xl drop-shadow-xl"
      style={{ background: color || "linear-gradient(135deg, var(--coral), #f4a261)" }}
    >
      ✨
    </div>
  );
}

function Window({
  id,
  zIndex,
  onClose,
  onFocus,
}: {
  id: WindowId;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
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
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 499 }}
          className="fixed inset-0 bg-black/30"
          onClick={onClose}
        />
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          onMouseDown={onFocus}
          onPointerDown={onFocus}
          style={{ zIndex: 500, touchAction: "pan-y" }}
          className="fixed inset-0 bg-white flex flex-col pointer-events-auto"
        >
          <div className="h-14 px-3 pt-3 flex items-center gap-2 border-b border-ink/10">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 text-[15px] text-[#007aff] font-medium px-2 py-1 -ml-2 active:opacity-60"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m15 6-6 6 6 6" />
              </svg>
              Назад
            </button>
            <div className="flex-1 text-center text-[14px] font-semibold text-ink truncate px-2">{config.title}</div>
            <div className="w-14" />
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 pb-10">{config.body}</div>
        </motion.div>
      </>
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
      <div className="overflow-y-auto max-h-[calc(82vh-2.25rem)] p-6 md:p-8">{config.body}</div>
    </motion.div>
  );
}

const windowConfig: Record<WindowId, { title: string; body: ReactNode }> = {
  about: {
    title: "Обо мне.txt — TextEdit",
    body: (
      <div className="font-mono text-sm space-y-3 leading-relaxed">
        <p className="font-display text-2xl not-italic">Привет! Меня зовут Дарья.</p>
        <p>
          Я проектирую цифровые продукты, которые решают реальные бизнес-задачи. Специализируюсь на{" "}
          <span className="bg-note px-1">B2B/B2C, SaaS</span>, внутренних инструментах и системах автоматизации.
        </p>
        <p>
          За моими плечами — успешный опыт работы как в продуктовых стартапах (быстрая итеративность), так и в
          агентствах.
        </p>
        <p>
          В своей работе активно использую AI-инструменты: <i>Monterey.ai, Lovable, Whimsical AI, NotebookLM</i>.
        </p>
        <p className="text-ink/60">
          —{" "}
          <a className="underline hover:text-coral" href="mailto:vereskunova@gmail.com">
            vereskunova@gmail.com
          </a>{" "}
          ·{" "}
          <a className="underline hover:text-coral" href="https://t.me/Darialud">
            @Darialud
          </a>{" "}
          · Москва, РФ
        </p>
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
    body: (
      <CaseStudy
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
          {
            src: debtor2,
            cap: "Фактически анкета была «скрытым обязательным шагом», который откладывался пользователями, вызывал большое количество уточняющих звонков, замедлял запуск оплаченного дела и увеличивал нагрузку на менеджеров.",
          },
          {
            src: debtor4,
            cap: "Проблемы → Гипотезы → Реализация: обязательный шаг онбординга, прогресс-бар, подсказки внутри формы, автосохранение данных",
          },
        ]}
        results={[
          "Conversion to Payment: +8 п.п. (с 41% до 49%) — за счёт упрощённого экрана оплаты и прозрачного статуса счёта",
          "Completion Rate анкеты: +22% (с 55% до 67%) — разбивка на этапы, progress bar, сохранение промежуточных данных",
          "Среднее время прохождения анкеты: −18%",
          "Количество входящих обращений на клиента: −27% — прозрачные этапы в «Моё дело», встроенные комментарии, структурированная загрузка документов",
          "Time to Case Start: −24% — быстрее оплата, выше completion анкеты, меньше ручных уточнений",
        ]}
      />
    ),
  },
  skills: {
    title: "Skills.app",
    body: (
      <div className="space-y-6">
        {Object.entries({
          "UX-исследования и продукт": [
            "CustDev",
            "Глубинные интервью",
            "JTBD",
            "CJM",
            "User Flow",
            "Юзабилити-тестирование",
            "Метрики",
            "MVP",
            "User Story Mapping",
            "Продуктовое мышление",
          ],
          "Дизайн и инструменты": [
            "Figma",
            "Auto layout",
            "Компоненты",
            "Токены",
            "Прототипирование",
            "Дизайн-системы",
            "Atomic Design",
            "Miro",
            "HTML/CSS",
          ],
          "Процессы и коммуникация": ["Agile", "Design Review", "Аргументация решений", "Кросс-функциональная работа"],
        }).map(([group, list]) => (
          <div key={group}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-3">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {list.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-ink/5 border border-ink/10 text-sm hover:bg-coral hover:text-white hover:border-coral transition-colors cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="pt-4 border-t border-ink/10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-3">Образование</h3>
          <p className="text-sm">
            Bang Bang Education — <span className="italic">Арт-дирекшн цифрового продукта</span>
          </p>
          <p className="text-sm">
            СГУ им. Н.Г. Чернышевского — <span className="italic">Магистр, филология и журналистика</span>
          </p>
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
            <a
              key={c.l}
              href={c.h}
              className="flex items-center justify-between p-4 rounded-lg border border-ink/10 hover:bg-ink hover:text-paper hover:border-ink transition-all group"
            >
              <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">
                {c.l}
              </span>
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
            <p>
              <b>Опыт:</b> 4DEV.tech · Crypto Orien.AI · Должник прав
            </p>
            <p>
              <b>Стек:</b> Figma · Дизайн-системы · UX-исследования · Прототипирование
            </p>
            <p>
              <b>Email:</b> vereskunova@gmail.com
            </p>
            <p>
              <b>TG:</b> @Darialud
            </p>
            <p className="pt-2 italic">Полный CV доступен по запросу.</p>
          </div>
        </div>
        <a
          href="mailto:vereskunova@gmail.com?subject=CV request"
          className="block text-center py-3 rounded-lg bg-ink text-paper hover:bg-coral transition-colors"
        >
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
            <p className="text-[13px] text-ink/50 mt-0.5">6 фото · 2025</p>
          </div>
          <div className="size-9 rounded-full bg-white/80 backdrop-blur grid place-items-center text-ink/70 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>
        </div>
        {/* Squircle grid */}
        <div className="px-3 pb-5 grid grid-cols-2 gap-1.5">
          {[
            { src: gallery1.url, cap: "Устойчивость на любой «доске» — будь то лонгборд или рабочие задачи." },
            { src: gallery2.url, cap: "Не боюсь «белой воды» и крутых поворотов." },
            { src: gallery3.url, cap: "Вдохновляюсь культурой, где каждая деталь имеет значение." },
            { src: gallery4.url, cap: "Умею высматривать детали там, где другие проходят мимо." },
            { src: gallery5.url, cap: "Умею создать уют и порядок даже в лесу." },
            { src: gallery6.url, cap: "Расширяю границы возможного. Если страшно — значит, надо делать." },
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
              <img
                src={p.src}
                alt={p.cap}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <figcaption className="absolute bottom-2 left-3 text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
                {p.cap}
              </figcaption>
            </motion.figure>
          ))}
        </div>
        {/* iOS tab bar */}
        <div className="mx-3 mb-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm px-2 py-2 flex justify-around text-[10px] text-ink/60">
          {["Библиотека", "Для вас", "Альбомы", "Поиск"].map((t, i) => (
            <div
              key={t}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl ${i === 0 ? "text-coral" : ""}`}
            >
              <div className="w-4 h-4 rounded-sm bg-current opacity-70" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

interface CaseSection {
  h: string;
  p: string;
}
interface GalleryItem {
  src: string;
  cap: string;
}

function FourDevCase() {
  const cap = "text-ink/60 font-medium text-gray-500 font-sans text-center text-sm";
  const h4 = "font-mono text-xs uppercase tracking-widest text-ink/60 mb-2 font-semibold";
  const fullImg = "w-full rounded-lg border border-ink/10";

  return (
    <TypoScope className="space-y-6">
      {/* Cover image first */}
      <div className="px-[20px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden border border-ink/10 bg-ink/5"
        >
          <img src={caseFourdev} alt="Дашборд продаж 4DEV" className="w-full h-auto block" />
        </motion.div>
      </div>

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
          4DEV — это IT-экосистема для автоматизации девелопмента, которая помогает застройщикам, банкам и ритейлерам
          управлять продажами недвижимости. Платформа уже интегрирована с 35 внешними сервисами и насчитывает 65
          клиентов по всей России, экономя им свыше 1 млн рублей на автоматизации.
        </p>
        <p className="mt-3 text-sm leading-relaxed italic text-ink/70 border-l-2 border-coral pl-3">
          Продукт работает в сложной правовой среде: любая сделка с недвижимостью требует проверок со стороны банков и
          Росреестра, что создаёт естественные паузы и риски срывов. Именно в этих точках возникает напряжение у
          пользователей — как у профессиональных менеджеров отдела продаж, так и у конечных клиентов-покупателей.
        </p>
      </div>

      {/* Page 2 — клиенты + donut */}
      <div className="px-[20px]">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={fourdev2}
          alt="Реестр клиентов и аналитика"
          loading="lazy"
          className={fullImg}
        />
      </div>

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
        <div className="px-[20px]">
          <motion.img
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src={fourdev3}
            alt="Карточная система управления гарантийными заявками"
            loading="lazy"
            className={fullImg}
          />
        </div>
        <figcaption className={cap}>1. Карточная система управления гарантийными заявками</figcaption>
      </figure>

      <div>
        <h4 className={h4}>Ключевые решения</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2">
            <span className="text-coral">→</span>Цветной статус как основной якорь
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Показ только операционно важных данных
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Быстрые действия внутри карточки
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Сортировка и фильтрация без перестройки интерфейса
          </li>
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ Результат</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Просроченные заявки сократились на <b>11%</b>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Среднее время реакции снизилось с 3,2 дней до <b>1,9 дней</b>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Руководители тратят на контроль статусов на{" "}
            <b>15% меньше времени</b>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Удовлетворённость внутренних пользователей выросла с 6,5 до{" "}
            <b>8,4/10</b>
          </li>
        </ul>
      </div>

      {/* Page 4 — Шахматка */}
      <figure className="space-y-2">
        <div className="px-[20px]">
          <motion.img
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src={fourdev4}
            alt="Шахматка выбора квартир"
            loading="lazy"
            className={fullImg}
          />
        </div>
        <figcaption className={cap}>2. Шахматка как основная модель выбора квартиры</figcaption>
      </figure>

      <p className="leading-relaxed text-ink/80 text-base">👉 Менеджер мыслит этажами и секциями, а не строками.</p>

      <div>
        <h4 className={h4}>Ключевые решения</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2">
            <span className="text-coral">→</span>Цветовая система статусов
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Фильтрация до взаимодействия (площадь, комнаты)
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Модальное окно без потери контекста
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Акцент на цене, статусе и площади
          </li>
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ Результат</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Время подбора сократилось с 7–10 минут до <b>4 минут</b>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Ошибки при бронировании снизились с 12% до <b>5,5%</b>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Количество кликов до бронирования уменьшилось на <b>6%</b>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Увеличение скорости обработки лида на <b>15%</b>
          </li>
        </ul>
      </div>

      {/* Вывод */}
      <div className="space-y-3 pt-2 border-t border-ink/10">
        <h3 className="font-display text-2xl">Вывод</h3>
        <p className="leading-relaxed text-ink/80 text-base">
          После внедрения система стала основным рабочим инструментом для отделов продаж и эксплуатации. Время подбора
          квартиры сократилось более чем в два раза — с 7–10 минут до 4 минут, что напрямую повлияло на скорость
          обработки входящих лидов и позволило увеличить операционную эффективность отдела на 15%.
        </p>
        <p className="leading-relaxed text-ink/80 text-base">
          Количество ошибок при бронировании снизилось с 12% до 5,5%, что уменьшило внутренние потери времени и снизило
          нагрузку на административные процессы. В блоке гарантийных заявок просрочки сократились на 11%, а среднее
          время реакции уменьшилось почти вдвое — с 3,2 до 1,9 дней.
        </p>
        <p className="leading-relaxed text-ink/80 text-base">
          Для руководителей система стала инструментом прозрачного контроля: время на мониторинг статусов сократилось на
          45%, а субъективная оценка удобства работы выросла с 6,8 до 8,4 из 10.
        </p>
        <p className="leading-relaxed text-ink/80 text-base">
          Интерфейс начал влиять на ключевые бизнес-метрики: скорость операций, количество ошибок, нагрузку на
          административные процессы и удовлетворённость пользователей.
        </p>
      </div>
    </TypoScope>
  );
}

function OrienCase() {
  const h4 = "font-mono text-xs uppercase tracking-widest text-ink/60 mb-2 font-semibold";
  const fullImg = "w-full rounded-lg border border-ink/10 block";
  return (
    <TypoScope className="space-y-6">
      <div className="px-[20px]">
        <motion.img
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={cryptoCover}
          alt="Crypto Orien.AI — обложка"
          className={fullImg}
        />
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <span className="px-2 py-1 rounded bg-coral/15 text-coral">Криптокошелёк · part-time</span>
        <span className="px-2 py-1 rounded bg-ink/5 text-ink/70">2025 — 2026</span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl leading-tight font-semibold">
        Crypto Orien.AI — мобильный криптокошелёк
      </h2>

      <div>
        <h4 className={h4}>КОНТЕКСТ И ЗАДАЧИ</h4>
        <p className="leading-relaxed text-ink/80 text-base">
          Crypto Orien.AI — мобильный криптокошелёк ранней стадии, созданный в условиях высокой конкуренции и низкого
          пользовательского доверия к новым Web3-продуктам. Основная аудитория — пользователи, уже знакомые с
          криптовалютой, но не удовлетворённые сложностью и перегруженностью существующих решений.
        </p>
      </div>

      <div>
        <h4 className={h4}>ПРОБЛЕМЫ</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2">
            <span className="text-coral">→</span>Пользователи останавливались на этапе создания кошелька
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Страх юзеров подтверждать операции
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>Мало пользователей доходили до целевых действий
          </li>
        </ul>
      </div>

      <div>
        <h4 className={h4}>ЗАДАЧИ</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li>Спроектировать end-to-end user flow от регистрации до первой операции.</li>
          <li>Проработать нештатные сценарии: ошибки, задержки, отклонения.</li>
          <li>Оптимизировать шаги до первой финансовой операции.</li>
          <li>Снизить когнитивную нагрузку на этапе подтверждения.</li>
          <li>Встроить элементы, усиливающие ощущение контроля (история, прогресс, подтверждение статуса).</li>
          <li>Спроектировать информационную архитектуру с учётом будущих ролей и функций.</li>
          <li>Создать систему токенов и переменных для тем и состояний.</li>
          <li>Заложить масштабируемый UI-kit как основу дизайн-системы.</li>
          <li>Обеспечить консистентность паттернов для роста продукта.</li>
        </ul>
      </div>

      <div>
        <h4 className={h4}>МОЯ РОЛЬ</h4>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li>
            Провела бенчмаркинг: изучила самые популярные приложения отрасли с похожими фичами, выявила их сильные и
            слабые стороны;
          </li>
          <li>
            Детально разобрала путь пользователя — от регистрации до первой реальной операции с деньгами. Было важно
            понять не только позитивные сценарии, но и все моменты, где что-то может пойти не так.
          </li>
          <li>
            Спроектировала user flow, рассматривала разные роли, точки принятия решений, системные события и возвраты.
          </li>
          <li>Разработала систему статусов и состояний;</li>
          <li>Создала масштабируемый UI-кит.</li>
        </ul>
      </div>

      <p className="font-display text-xl md:text-2xl leading-snug text-ink/90">
        Визуально продукт строился вокруг спокойствия и фокуса.
      </p>

      <div className="px-[20px]">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={cryptoBM}
          alt="Бенчмаркинг hot wallets"
          loading="lazy"
          className={fullImg}
        />
      </div>

      <div className="px-[20px]">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={cryptoMaket}
          alt="Ключевые экраны приложения"
          loading="lazy"
          className={fullImg}
        />
      </div>

      <div>
        <h4 className={h4}>ТЕМЫ И СОСТОЯНИЯ</h4>
        <p className="leading-relaxed text-ink/80 text-base">
          Тёмная тема стала основной — она лучше подходит для работы с финансовыми данными и длительного использования.
          Все экраны я сразу проектировала с расчётом на:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2">
            <span className="text-coral">→</span>перевод цветов и состояний в дизайн-токены;
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>использование variables для тем;
          </li>
          <li className="flex gap-2">
            <span className="text-coral">→</span>дальнейшее масштабирование в дизайн-систему.
          </li>
        </ul>
      </div>

      <div className="px-[20px]">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={cryptoThemes}
          alt="Светлая и тёмная темы"
          loading="lazy"
          className={fullImg}
        />
      </div>

      <div className="px-[20px]">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={cryptoColors}
          alt="Дизайн-токены и примитивы"
          loading="lazy"
          className={fullImg}
        />
      </div>

      <div className="px-[20px]">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={cryptoDetails}
          alt="Детали интерфейса"
          loading="lazy"
          className={fullImg}
        />
      </div>

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ РЕЗУЛЬТАТЫ</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Спроектирован end-to-end путь пользователя с прозрачными
            статусами операций, учитывающий ошибки, задержки и проверки.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Внедрена единая система статусов и UI-kit, готовая к
            масштабированию новых функций и ролей.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Интерфейс снижает неопределённость и когнитивную нагрузку,
            повышая доверие к финансовым операциям.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span>Подготовлена архитектура для последующего роста конверсии и
            уменьшения drop-off при запуске продукта с нуля.
          </li>
        </ul>
      </div>
    </TypoScope>
  );
}

function CaseStudy({
  cover,
  tag,
  period,
  lead,
  sections = [],
  image,
  imageCaption,
  problems,
  did,
  gallery = [],
  results,
}: {
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
        <div className="px-[20px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg overflow-hidden border border-ink/10 bg-ink/5"
          >
            <img src={cover} alt={lead} className="w-full h-auto block" />
          </motion.div>
        </div>
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
          <div className="px-[20px]">
            <motion.img
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={image}
              alt={imageCaption || ""}
              loading="lazy"
              className="w-full rounded-lg border border-ink/10"
            />
          </div>
          {imageCaption && (
            <figcaption className="text-ink/60 font-medium text-gray-500 font-sans text-center text-sm">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {problems && (
        <div className="p-4 rounded-lg bg-note/60 border-l-4 border-coral">
          <h4 className="font-mono text-xs uppercase tracking-widest text-ink/70 mb-2">⚠️ Проблемы</h4>
          <ul className="space-y-1.5 text-sm">
            {problems.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-ink/40">·</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">Моя роль</h4>
        <ul className="space-y-1.5 text-sm">
          {did.map((d, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-coral">→</span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      {gallery.length > 0 && (
        <div className="space-y-3">
          {gallery.map((g, i) => (
            <figure key={i} className="space-y-2">
              <div className="px-[20px]">
                <motion.img
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src={g.src}
                  alt={g.cap}
                  loading="lazy"
                  className="w-full rounded-lg border border-ink/10"
                />
              </div>
              <figcaption className="text-ink/60 font-medium text-gray-500 font-sans text-center text-sm">
                {g.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-800 mb-2">★ Результат</h4>
        <ul className="space-y-1.5 text-sm text-emerald-950">
          {results.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </TypoScope>
  );
}
