"use client";
import { useState } from "react";

/* ---------- Daftar Path File di Folder public/ ---------- */
const IMG = {
  logo: "/mascot-icon.svg",
  natureBg: "/BG-barbel.svg", // Background utama alam + barbel kaca + gelembung
  dashboardBg: "/dashboard-bg.svg", // Bisa otomatis fallback ke BG-barbel.svg
  mascotStretch: "/mascot-stretching.svg", // Maskot pemanasan di Hero & Preview
  mascotSit: "/mascot-sit.svg", // Maskot duduk di Why Section & Recovery Room
  mascotBarbell: "/mascot-barbel.svg", // Maskot angkat barbel di FAQ
  recovery: "/Image5.png", // Background kartu Recovery Room kecil
  album: "/CalmPianoAlbumArtwork.png", // Cover lagu Clair de lune
};

/* ---------- Gradient & Shadow Frutiger Aero ---------- */
const G = {
  panel:
    "linear-gradient(180deg, #EFFAFF 0%, #A6DAEF 14%, #8FCBE5 52%, #B9E9EF 100%)",
  glass:
    "linear-gradient(180deg, rgba(248,253,255,0.88) 0%, rgba(238,250,255,0.68) 65%, rgba(228,245,252,0.78) 100%)",
  primary:
    "linear-gradient(180deg, #B6EAFF 0%, #5DB7E2 47%, #168CC3 50%, #48BCE4 100%)",
  secondary:
    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(236,246,252,0.88) 47%, rgba(201,224,239,0.85) 50%, rgba(201,224,239,0.95) 100%)",
  money:
    "linear-gradient(180deg, #F0FAFC 0%, #6AD668 14%, #45C65A 52%, #A4DB73 100%)",
  move:
    "linear-gradient(180deg, #F0FAFC 0%, #65C7E5 14%, #35B9D8 55%, #B0DAFF 100%)",
  rest:
    "linear-gradient(180deg, #F0FAFC 5%, #D5E4E8 18%, #AFC8CC 53%, #C2E5EC 100%)",
  step01:
    "linear-gradient(180deg, #D6F4FF 0%, #74CBE8 48%, #42A8CE 50%, #7ED5F0 100%)",
  step02:
    "linear-gradient(180deg, #E8F8D8 0%, #9BC472 48%, #77A04F 50%, #AED487 100%)",
  step03:
    "linear-gradient(180deg, #E2ECFA 0%, #86AAD6 48%, #5D83B5 50%, #98BAE3 100%)",
  bar: "linear-gradient(180deg, #B8C8E6 0%, #9CB4D9 100%)",
  barToday: "linear-gradient(180deg, #58BBD8 0%, #258EBA 100%)",
};

const SHADOW = {
  glass:
    "0 4px 12px rgba(28, 92, 118, 0.14), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
  panel:
    "0 8px 24px rgba(36, 95, 120, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.9)",
  card:
    "0 6px 16px rgba(25, 85, 110, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
  innerSubCard:
    "0 3px 10px rgba(20, 75, 95, 0.14), inset 0 1px 2px rgba(255, 255, 255, 0.85)",
  soft: "0 6px 20px rgba(63, 129, 151, 0.12)",
};

/* ---------- Komponen Primitif ---------- */
const Panel = ({ className = "", style, children }) => (
  <div
    className={`rounded-[14px] border border-[#5B93B0] backdrop-blur-md ${className}`}
    style={{ background: G.panel, boxShadow: SHADOW.panel, ...style }}
  >
    {children}
  </div>
);

const Glass = ({ className = "", style, children }) => (
  <div
    className={`rounded-[9px] border border-white/90 backdrop-blur-md ${className}`}
    style={{ background: G.glass, boxShadow: SHADOW.glass, ...style }}
  >
    {children}
  </div>
);

const Eyebrow = ({ children, className = "" }) => (
  <p className={`text-[10px] font-bold uppercase tracking-wider text-[#245565] ${className}`}>
    {children}
  </p>
);

const PrimaryButton = ({ children, onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative cursor-pointer overflow-hidden whitespace-nowrap rounded-[9px] border border-[#087DA3] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(22,140,195,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)] transition-all hover:brightness-105 active:scale-95 ${className}`}
    style={{ background: G.primary }}
  >
    <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,65,95,0.4)]">
      {children}
    </span>
  </button>
);

const SecondaryButton = ({ children, onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer whitespace-nowrap rounded-[9px] border border-[#6E99B3]/90 px-5 py-2.5 text-sm font-medium text-[#245565] shadow-[0_1px_3px_rgba(52,94,120,0.14),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all hover:brightness-105 active:scale-95 ${className}`}
    style={{ background: G.secondary }}
  >
    {children}
  </button>
);

/* Gambar Pintar dengan Fallback Otomatis jika file di public/ beda nama */
function SmartImage({ src, fallbackSrc, alt = "", className = "", fallbackNode = null }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  if (error && fallbackNode) return fallbackNode;

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        } else {
          setError(true);
        }
      }}
    />
  );
}

/* Fallback Maskot Gel 3D via CSS jika file gambar belum ada di public/ */
function CssMascot({ className = "h-28 w-28" }) {
  const body =
    "bg-[radial-gradient(circle_at_30%_25%,#e0fff6,#46d3c2_45%,#188ba4_100%)] shadow-[inset_-5px_-6px_12px_rgba(10,85,115,0.35),0_6px_14px_rgba(20,115,135,0.28)]";
  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">
      <div className={`absolute left-[24%] top-0 h-[36%] w-[52%] rounded-full ${body}`} />
      <div className={`absolute left-[10%] top-[30%] h-[50%] w-[80%] rounded-[45%] ${body}`} />
      <div className={`absolute left-[2%] top-[38%] h-[18%] w-[22%] rounded-full ${body}`} />
      <div className={`absolute right-[2%] top-[38%] h-[18%] w-[22%] rounded-full ${body}`} />
      <div className={`absolute bottom-0 left-[22%] h-[20%] w-[25%] rounded-full ${body}`} />
      <div className={`absolute bottom-0 right-[22%] h-[20%] w-[25%] rounded-full ${body}`} />
    </div>
  );
}

const Icon = ({ d, color = "currentColor", size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 11 11"
    fill="none"
    stroke={color}
    strokeWidth="1.08"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  wallet:
    "M8.568 2.898V1.48a.945.945 0 0 0-.945-.945H1.48a.945.945 0 0 0-.945.945v6.615c0 .52.425.945.945.945h7.088V2.898H1.48a.945.945 0 0 1-.945-.945",
  moon: "M9.022 5.166A4.2 4.2 0 0 1 4.391.536 4.2 4.2 0 1 0 9.022 5.166Z",
  leaf: "M7.379.7C1.237-.245-.653 3.062 1.237 5.897c1.89 2.835 6.615 1.417 6.142-5.197ZM.535 5.733 5.26.536",
  dumbbell:
    "M2.425 2.426l.945.945m0-1.89-.945.945-.945.945m1.89.945 3.78 3.78m-3.78-3.78-.945.945m.945-.945.945-.945m2.835 4.725.945.945m-.945-.945-.945.945m.945-.945.945-.945m-.945 1.89-.945.945m.945-.945.945-.945M.535 2.426 2.425.536m5.67 9.45 1.89-1.89",
};

/* ---------- Data ---------- */
const NAV = [
  { label: "Why Nexora", href: "#why-nexora" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

const WHY = [
  ["1", "Less switching. More living.", "Keep your spending, nutrition, workouts, and recovery in one place."],
  ["2", "A routine that fits real life.", "See what works for your time, energy, and budget — not someone else’s."],
  ["3", "Progress, without the pressure.", "Notice small wins and make room for rest along the way."],
];

const STEPS = [
  ["01", "Make it yours", "Start with your wellness budget, movement goals, and the routine you want to build.", G.step01],
  ["02", "Shape your week", "Make space for meals, workouts, and rest. Keep your plan realistic, not perfect.", G.step02],
  ["03", "Check in. Keep growing.", "Visit your overview, notice what feels good, and adjust your next step as life changes.", G.step03],
];

const BENEFITS = [
  ["Spend with intention", "Keep health essentials and everyday costs visible."],
  ["Build a rhythm, not a streak", "Plan movement and recovery together."],
  ["See the whole you", "Your budget and well-being share the same space."],
];

const FAQ = [
  ["What is Nexora?", "Nexora is your everyday wellness overview: a place to bring your budget, meals, workouts, sleep, and moments of calm together."],
  ["Who is it designed for?", "Anyone building a more balanced routine — especially students juggling busy schedules, wellness goals, and a budget."],
  ["Do I need a perfect routine to start?", "Not at all. Start with one part of your day, plan around your own pace, and make room for both progress and rest."],
];

const WEEK = [
  ["M", "Move"], ["T", "Rest"], ["W", "Move"], ["T", "Rest"],
  ["F", "Move"], ["S", "Rest"], ["S", "Move"],
];

const DAYS = [
  ["MON", 18, "Upper", true], ["TUE", 19, "Rest"], ["WED", 20, "Lower"],
  ["THU", 21, "Rest"], ["FRI", 22, "Pull"], ["SAT", 23, "Full"], ["SUN", 24, "Rest"],
];

const SLEEP_BARS = [27, 31, 29, 34, 30, 36, 33];

const EXPENSES = [
  ["Gym membership", "Campus fitness · renews May 28", "$35.00", "dumbbell", "#2E97B6", "#E5F4FC"],
  ["High-protein meal prep", "Groceries · 4 weekly shops", "$110.00", "leaf", "#6F9D50", "#EEF7E8"],
  ["Supplements", "Whey protein · monthly supply", "$20.00", "wallet", "#817BB9", "#F0EFFB"],
];

/* ---------- Sections ---------- */
function Header({ onLogin, onBegin }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#B8DCE8]/80 bg-[#F0FAFC]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[80px] max-w-[1380px] items-center justify-between gap-4 px-5 md:h-[92px] md:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <SmartImage
            src={IMG.logo}
            alt="Nexora logo"
            className="h-11 w-auto object-contain md:h-[56px]"
            fallbackNode={
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[radial-gradient(circle_at_30%_25%,#d9fff4,#2bb5b0_60%,#167a92)] shadow-md" />
            }
          />
          <span className="text-2xl font-bold tracking-tight text-[#245565] md:text-[27px]">
            Nexora
          </span>
        </a>

        <nav className="hidden items-center gap-11 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-medium text-[#245565] transition-colors hover:text-[#087DA3]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SecondaryButton onClick={onLogin} className="hidden sm:block !px-6 !py-2">
            Login
          </SecondaryButton>
          <PrimaryButton onClick={onBegin} className="!px-6 !py-2">
            Begin →
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}

/* 1. HERO SECTION (Interaktif & 100% Sesuai Desain Figma) */
function Hero({ onBegin }) {
  return (
    <section
      className="relative w-full overflow-hidden border-b border-[#88B8C8]/60 bg-cover bg-center px-4 py-8 md:px-10 md:py-12"
      style={{
        backgroundImage: `url('${IMG.natureBg}'), url('${IMG.dashboardBg}'), linear-gradient(180deg, #4bc4f5 0%, #9ee6ff 55%, #78ce3b 100%)`,
      }}
    >
      {/* Container Kaca Utama di dalam Hero */}
      <div
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[22px] border border-white/85 p-6 md:p-11 backdrop-blur-[6px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(235,250,255,0.86) 0%, rgba(220,246,255,0.62) 48%, rgba(255,255,255,0.22) 100%)",
          boxShadow: "0 12px 34px rgba(18, 82, 108, 0.22), inset 0 1px 2px rgba(255,255,255,0.95)",
        }}
      >
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
          {/* Kolom Kiri: Teks & Tombol */}
          <div className="relative z-10">
            <Eyebrow className="text-[#2C697A]">LIVE WELL. FIND BALANCE.</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold leading-[1.12] tracking-tight text-[#1A4B5C] sm:text-5xl md:text-[54px]">
              Feel good.
              <br />
              Spend smart.
              <br />
              Find your balance.
            </h1>

            <p className="mt-4 max-w-[490px] rounded-lg bg-white/45 p-2.5 text-sm font-medium leading-[1.5] text-[#1E4E5E] backdrop-blur-xs md:bg-transparent md:p-0">
              Your budget, meals, movement, and rest — together in one calm space.
              Build a healthier everyday that fits your life and your wallet.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <PrimaryButton onClick={onBegin} className="!px-7 !py-2.5 text-base">
                Begin →
              </PrimaryButton>
              <a
                href="#features"
                className="cursor-pointer rounded-[9px] border border-white/90 bg-white/75 px-5 py-2.5 text-xs font-semibold text-[#245565] shadow-sm backdrop-blur-md transition hover:bg-white"
              >
                Explore your everyday toolkit ↓
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Maskot Stretching & Kapsul Kaca */}
          <div className="relative flex min-h-[240px] flex-col items-center justify-end md:min-h-[300px]">
            <div className="relative z-10 mb-6 flex items-center justify-center">
              <SmartImage
                src={IMG.mascotStretch}
                fallbackSrc="/mascot-strectching.svg"
                alt="Nexora Stretching Mascot"
                className="h-48 w-auto drop-shadow-[0_12px_20px_rgba(16,95,120,0.32)] md:h-60"
                fallbackNode={<CssMascot className="h-44 w-44" />}
              />
            </div>

            {/* Badge Kaca Kanan Bawah */}
            <Glass className="self-end px-4 py-2.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#2B6E7D]">
                A LITTLE BALANCE GOES A LONG WAY.
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[#1B4E5F]">
                Small steps. A calmer everyday.
              </p>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. WHY NEXORA SECTION (Lengkap dengan Maskot Duduk di Pojok Kanan Bawah) */
function WhySection() {
  return (
    <section
      id="why-nexora"
      className="w-full border-b border-[#88B8C8]/50 bg-[#F0FAFC] px-4 py-10 md:px-[54px]"
    >
      <Panel className="relative mx-auto grid max-w-[1320px] gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div className="flex flex-col gap-3.5">
          <Glass className="w-fit px-3 py-1">
            <Eyebrow>WHY NEXORA EXISTS?</Eyebrow>
          </Glass>
          <Glass className="flex-1 p-6 md:p-7">
            <h2 className="text-3xl font-bold leading-[1.25] text-[#245565] md:text-[36px]">
              Healthy living shouldn’t feel like another assignment.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#245565]/90">
              Between classes, commitments, and a limited budget, looking after yourself can
              slip down the list. Nexora brings the little things together, so taking care of
              you feels more manageable.
            </p>
          </Glass>
        </div>

        <div className="relative flex flex-col gap-3.5 lg:justify-center">
          {WHY.map(([n, title, desc]) => (
            <Glass key={n} className="flex items-center gap-5 px-5 py-4">
              <span className="w-6 text-center text-lg font-bold text-[#245565]">{n}</span>
              <div>
                <h3 className="text-lg font-bold text-[#245565]">{title}</h3>
                <p className="mt-0.5 text-sm text-[#245565]/90">{desc}</p>
              </div>
            </Glass>
          ))}

          {/* Maskot Duduk di Pojok Kanan Bawah Panel (Sesuai Gambar Figma) */}
          <div className="pointer-events-none absolute -bottom-12 -right-6 z-20 hidden sm:block">
            <SmartImage
              src={IMG.mascotSit}
              alt="Mascot resting with bottle"
              className="h-28 w-auto drop-shadow-[0_8px_14px_rgba(20,90,115,0.3)]"
              fallbackNode={<CssMascot className="h-24 w-24" />}
            />
          </div>
        </div>
      </Panel>
    </section>
  );
}

/* 3. TOOLKIT SECTION (3 Kartu Fitur Glossy) */
function ToolkitCard({ gradient, label, title, desc, bottomBg, children }) {
  return (
    <div
      className="flex flex-col justify-between overflow-hidden rounded-[20px] border border-[#35B9D8] p-5"
      style={{ background: gradient, boxShadow: SHADOW.card }}
    >
      <div>
        <Glass className="w-fit px-2.5 py-1">
          <Eyebrow className="!text-[9px]">{label}</Eyebrow>
        </Glass>
        <Glass className="mt-3 min-h-[155px] p-4">
          <h3 className="text-[22px] font-bold leading-[1.28] text-[#245565]">{title}</h3>
          <p className="mt-2.5 text-xs leading-[1.45] text-[#245565]/90">{desc}</p>
        </Glass>
      </div>

      <div
        className="mt-5 rounded-xl border border-white/80 p-4"
        style={{ background: bottomBg, boxShadow: SHADOW.innerSubCard }}
      >
        {children}
      </div>
    </div>
  );
}

function ToolkitSection() {
  return (
    <section
      id="features"
      className="w-full border-b border-[#88B8C8]/50 bg-[#F0FAFC] px-4 py-10 md:px-[40px]"
    >
      <Panel className="mx-auto max-w-[1340px] p-6 md:p-11">
        <Glass className="w-fit px-3 py-1">
          <Eyebrow>YOUR EVERYDAY TOOLKIT</Eyebrow>
        </Glass>
        <Glass className="mt-3 w-fit px-4 py-2.5">
          <h2 className="text-2xl font-bold text-[#245565] md:text-[34px]">
            Different needs. One balanced routine.
          </h2>
        </Glass>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* 01 Money & meals */}
          <ToolkitCard
            gradient={G.money}
            label="01 / MONEY & MEALS"
            title="Nourish yourself. Not your money worries."
            desc="Keep meal prep, protein goals, and everyday health expenses in view. Make choices that fit your budget."
            bottomBg="linear-gradient(180deg, #B8E888 0%, #98D663 100%)"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#245565]">
              MONTHLY WELLNESS BUDGET
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-[26px] font-bold leading-none text-[#245565]">$85 left</p>
              <p className="text-[11px] font-medium text-[#245565]">of $250 planned</p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full border border-white/60 bg-[#E2F5D0]">
              <div className="h-full w-[66%] rounded-full bg-gradient-to-r from-[#2B99B8] to-[#35B9D8]" />
            </div>
          </ToolkitCard>

          {/* 02 Workout planner */}
          <ToolkitCard
            gradient={G.move}
            label="02 / WORKOUT PLANNER"
            title="Make room for movement."
            desc="Give each workout a place in your week, with planned sessions and rest days that fit around life."
            bottomBg="linear-gradient(180deg, #74D0EC 0%, #52B9DC 100%)"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#184858]">
              A PLAN FOR YOUR WEEK
            </p>
            <div className="mt-2.5 grid grid-cols-7 gap-1.5">
              {WEEK.map(([d, s], i) => {
                const isMove = s === "Move";
                return (
                  <div
                    key={i}
                    className={`flex h-[54px] flex-col items-center justify-center rounded-lg border text-center shadow-2xs ${
                      isMove
                        ? "border-[#1B7FA3] bg-gradient-to-b from-[#49B6DA] to-[#238EB3] text-white"
                        : "border-white bg-[#F0FAFC] text-[#245565]"
                    }`}
                  >
                    <span className="text-xs font-bold">{d}</span>
                    <span className="text-[9px] font-medium">{s}</span>
                  </div>
                );
              })}
            </div>
          </ToolkitCard>

          {/* 03 Recovery */}
          <ToolkitCard
            gradient={G.rest}
            label="03 / RECOVERY ROOM"
            title="Rest is part of the routine."
            desc="Reflect on your sleep, find your moment of calm, and give recovery the attention it deserves."
            bottomBg="linear-gradient(180deg, #FFFFFF 0%, #EAF6F9 100%)"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#245565]">
              SLEEP, BEAUTIFULLY.
            </p>
            <div className="mt-2.5 flex items-center justify-between gap-3">
              <p className="text-[26px] font-bold leading-none text-[#245565]">7h 42m</p>
              <p className="max-w-[155px] text-[11px] leading-snug text-[#245565]/90">
                A softer ending.
                <br />A stronger tomorrow.
              </p>
            </div>
          </ToolkitCard>
        </div>
      </Panel>
    </section>
  );
}

/* 4. DASHBOARD MOCKUP SECTION ("Your day, at a glance.") */
function StatCard({ label, value, note, noteColor, icon, iconColor }) {
  return (
    <div
      className="rounded-[10px] border border-[#497F9B]/70 p-3 backdrop-blur-xs"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(243,251,252,0.85))",
        boxShadow: SHADOW.soft,
      }}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-medium text-[#587D8B]">{label}</p>
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#EDF7F8]">
          <Icon d={ICONS[icon]} color={iconColor} size={12} />
        </span>
      </div>
      <p className="mt-1 text-lg font-bold text-[#1E5363]">{value}</p>
      <p className="mt-0.5 text-[9px] font-medium" style={{ color: noteColor }}>
        {note}
      </p>
    </div>
  );
}

function DashboardSection({ onBegin }) {
  return (
    <section className="w-full border-b border-[#88B8C8]/50 bg-[#F0FAFC] px-4 py-10 md:px-[40px]">
      <Panel className="mx-auto max-w-[1340px] p-6 md:p-11">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <div>
            <Glass className="w-fit px-3 py-1">
              <Eyebrow>A CLEARER PICTURE</Eyebrow>
            </Glass>
            <Glass className="mt-3 w-fit px-4 py-2">
              <h2 className="text-2xl font-bold text-[#245565] md:text-[34px]">
                Your day, at a glance.
              </h2>
            </Glass>
            <p className="mt-3 text-sm font-medium text-[#245565]">
              Less piecing things together. More knowing where to begin.
            </p>
          </div>
          <Eyebrow className="text-[#245565]/80">A look inside Nexora · Example week</Eyebrow>
        </div>

        {/* Bingkai Browser Kaca */}
        <div className="mx-auto mt-7 max-w-[980px] overflow-hidden rounded-[20px] border border-[#35B9D8] bg-[#F0FAFC]/95 p-3 shadow-lg md:p-5">
          <Eyebrow className="mb-2.5 !text-[10px] text-[#456D7E]">Nexora / My overview</Eyebrow>

          <div
            className="relative overflow-hidden rounded-xl border border-white/80"
            style={{ background: "linear-gradient(180deg,#DBF2FC,#F0FAF0)" }}
          >
            <SmartImage
              src={IMG.dashboardBg}
              fallbackSrc={IMG.natureBg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="relative flex flex-col gap-3.5 p-4 md:p-6 lg:px-14">
              {/* Top Bar Mini Overview */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="rounded-lg border border-[#183F50]/40 bg-white/90 px-3 py-1 shadow-2xs">
                  <p className="text-sm font-bold text-[#183F50]">My Overview</p>
                  <p className="text-[7px] font-semibold text-[#6B8A95]">MONDAY, MAY 18, 2026</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-[#CAE3EC] bg-[#F7FCFF]/90 px-3 py-1 text-[9px] font-medium text-[#456D7E]">
                    May 18 – 24, 2026 ›
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#CAE3EC] bg-[#F7FCFF]/90 text-[10px] text-[#456D7E]">
                    🔔
                  </span>
                  <span className="rounded-md border border-[#A3BD8E] bg-gradient-to-r from-[#FAFFF4] to-[#D6EAC4] px-2.5 py-1 text-[9px] font-semibold text-[#648549]">
                    Student plan
                  </span>
                  <span className="h-6 w-6 rounded-full border border-white bg-[radial-gradient(circle_at_35%_30%,#d9fff4,#2bb5b0_60%,#167a92)] shadow-xs" />
                </div>
              </div>

              {/* Banner Mini dengan Maskot Stretching */}
              <div
                className="relative flex items-center justify-between overflow-hidden rounded-xl border border-white/85 p-5 backdrop-blur-xs"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(233,250,255,0.92) 0%, rgba(195,238,255,0.68) 60%, rgba(233,250,255,0.35) 100%)",
                }}
              >
                <div className="relative z-10">
                  <p className="text-[8px] font-bold text-[#327D83]">
                    A LITTLE STRONGER. A LITTLE MORE BALANCED.
                  </p>
                  <p className="mt-1 text-xl font-bold text-[#144F60]">Feel good. Spend smart.</p>
                  <p className="mt-1 max-w-[250px] text-[10px] text-[#406E7C]">
                    Your goals, your routine, your own pace. Make room for a healthier kind of everyday.
                  </p>
                  <button
                    type="button"
                    onClick={onBegin}
                    className="mt-3 cursor-pointer rounded-md border border-[#087DA3] px-3 py-1.5 text-[10px] font-semibold text-white shadow-xs"
                    style={{ background: G.primary }}
                  >
                    Plan my week →
                  </button>
                </div>

                {/* Maskot & Pill di dalam Mockup */}
                <div className="hidden items-end gap-3 sm:flex">
                  <SmartImage
                    src={IMG.mascotStretch}
                    fallbackSrc="/mascot-strectching.svg"
                    alt=""
                    className="h-24 w-auto drop-shadow-md"
                    fallbackNode={<CssMascot className="h-20 w-20" />}
                  />
                  <span className="rounded-md border border-white bg-white/85 px-2.5 py-1.5 text-[8px] font-semibold text-[#356955] shadow-2xs">
                    🌱 A fresh start, every day.
                  </span>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatCard label="Budget remaining" value="$85.00" note="of $250 monthly budget" noteColor="#087C9F" icon="wallet" iconColor="#087C9F" />
                <StatCard label="Workouts this week" value="0 / 4" note="A fresh week starts here" noteColor="#328B64" icon="dumbbell" iconColor="#328B64" />
                <StatCard label="Average sleep" value="7h 42m" note="↑ 32 min from last week" noteColor="#7774B2" icon="moon" iconColor="#7774B2" />
                <StatCard label="Daily protein" value="96 / 120 g" note="24 g to reach your goal" noteColor="#4C8C3B" icon="leaf" iconColor="#4C8C3B" />
              </div>

              {/* Budget + Workout */}
              <div className="grid gap-3.5 md:grid-cols-[1fr_1.05fr]">
                <div
                  className="rounded-xl border border-white/85 bg-white/85 p-4 backdrop-blur-xs"
                  style={{ boxShadow: SHADOW.soft }}
                >
                  <div className="flex justify-between">
                    <p className="text-[11px] font-bold text-[#214F61]">A healthy budget</p>
                    <p className="text-[8px] font-semibold text-[#6D8C98]">MAY 2026</p>
                  </div>
                  <div className="mt-1.5 flex items-end justify-between">
                    <p className="text-[19px] font-bold text-[#1C5668]">
                      $165 <span className="text-[9px] font-normal text-[#74939E]">/ $250 spent</span>
                    </p>
                    <span className="rounded-[4px] border border-[#A3BD8E] bg-[#EAF5DF] px-2 py-0.5 text-[8px] font-semibold text-[#4B7F40]">
                      $85 left to use
                    </span>
                  </div>
                  <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-[#E6EFF2]">
                    <div className="h-full w-[14%] bg-[#36A9CF]" />
                    <div className="h-full w-[44%] bg-[#8DC963]" />
                    <div className="h-full w-[8%] bg-[#9CA4DF]" />
                  </div>
                  <div className="mt-3 flex justify-between text-[8px] font-bold text-[#79929D]">
                    <span>MONTHLY ESSENTIALS</span>
                    <span>AMOUNT</span>
                  </div>
                  <ul className="mt-1.5">
                    {EXPENSES.map(([name, sub, amt, icon, color, bg]) => (
                      <li key={name} className="flex items-center gap-2 border-b border-[#EDF3F5] py-1.5 last:border-0">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: bg }}>
                          <Icon d={ICONS[icon]} color={color} size={12} />
                        </span>
                        <div className="flex-1">
                          <p className="text-[10px] font-semibold text-[#325C6D]">{name}</p>
                          <p className="text-[8px] text-[#7F98A2]">{sub}</p>
                        </div>
                        <p className="text-[10px] font-bold text-[#315C6D]">{amt}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-center text-[9px] font-semibold text-[#1986A5]">+ Add expense</p>
                </div>

                <div
                  className="relative rounded-xl border border-white/85 p-4 backdrop-blur-xs"
                  style={{
                    background:
                      "linear-gradient(180deg,rgba(239,250,255,.88),rgba(166,218,239,.72) 12%,rgba(143,203,229,.52) 50%,rgba(185,233,239,.75))",
                    boxShadow: "0 4px 12px rgba(36,93,123,.2), inset 0 1px 1px rgba(255,255,255,.92)",
                  }}
                >
                  <div className="flex justify-between">
                    <p className="text-[11px] font-bold text-[#173E59]">Make time for movement</p>
                    <p className="text-[8px] font-semibold text-[#1D6084]">Edit plan ↗</p>
                  </div>
                  <div className="mt-2.5 grid grid-cols-7 gap-1">
                    {DAYS.map(([d, n, t, active]) => (
                      <div
                        key={d}
                        className={`flex flex-col items-center rounded-[5px] border py-1.5 ${
                          active
                            ? "border-[#327CA6] text-white"
                            : "border-white/80 text-[#587A90]"
                        }`}
                        style={{
                          background: active
                            ? "linear-gradient(180deg,#68C5F0,#2695CC 50%,#1979AC)"
                            : "linear-gradient(180deg,rgba(255,255,255,.85),rgba(218,234,244,.7))",
                        }}
                      >
                        <span className="text-[7px] font-bold">{d}</span>
                        <span className="text-[11px] font-bold">{n}</span>
                        <span className="text-[7px]">{t}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[8px] font-bold text-[#6F929E]">TODAY’S SESSION</p>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-[#22566A]">Upper body</p>
                      <p className="text-[8px] text-[#7A96A2]">6 exercises · Chest, shoulders &amp; arms</p>
                    </div>
                    <div className="rounded-[5px] border border-[#81ABC4]/65 bg-[#E3F2FA] px-2.5 py-1 text-center">
                      <p className="text-xs font-bold text-[#267B98]">50:00</p>
                      <p className="text-[6px] text-[#6B939F]">45–60 min target</p>
                    </div>
                  </div>
                  <div className="mt-2.5 rounded-[5px] border border-[#A3BD8E]/65 bg-[#EAF5DF] px-2.5 py-1.5 text-[8px] font-medium text-[#648549]">
                    🚶 Finish fresh: 5-min treadmill walk to cool down
                  </div>
                  <div className="mt-2.5 flex gap-2">
                    <button
                      type="button"
                      onClick={onBegin}
                      className="flex-[2] cursor-pointer rounded-[5px] border border-[#236587] py-1.5 text-[9px] font-semibold text-white"
                      style={{ background: G.primary }}
                    >
                      ▶ Start workout
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-[5px] border border-[#6E99B3]/90 py-1.5 text-[8px] font-medium text-[#447D92]"
                      style={{ background: G.secondary }}
                    >
                      View exercises →
                    </button>
                  </div>
                </div>
              </div>

              {/* Recovery Mini */}
              <div
                className="grid overflow-hidden rounded-xl border border-white bg-white/90 md:grid-cols-[200px_1fr_1fr]"
                style={{ boxShadow: SHADOW.soft }}
              >
                <div className="relative min-h-[140px] overflow-hidden bg-gradient-to-b from-[#668c97] to-[#245565]">
                  <SmartImage src={IMG.recovery} fallbackSrc={IMG.mascotSit} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg,rgba(8,75,91,.18),rgba(7,61,77,.82))" }}
                  />
                  <div className="relative flex h-full flex-col justify-between p-3.5 text-white">
                    <p className="text-[7px] font-bold tracking-wider text-white/80">THE RECOVERY ROOM</p>
                    <div>
                      <p className="text-sm font-bold leading-tight">
                        Rest is part
                        <br />
                        of the routine.
                      </p>
                      <p className="mt-1 text-[8px] text-[#DEF7EB]">A softer ending. A stronger tomorrow.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5">
                  <p className="text-[11px] font-bold text-[#214F61]">Sleep, beautifully.</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-lg font-bold text-[#245E72]">
                      7h 42m <span className="text-[8px] font-normal text-[#7F99A5]">last night</span>
                    </p>
                    <span className="rounded-full bg-[#EAF4E5] px-2 py-0.5 text-[7px] font-semibold text-[#628C47]">
                      ↗ Good quality
                    </span>
                  </div>
                  <p className="mt-1.5 text-[8px] text-[#8199A5]">Your week of rest</p>
                  <div className="mt-1.5 flex items-end justify-between gap-2 px-1">
                    {SLEEP_BARS.map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="flex h-10 w-[14px] items-end rounded-[4px] bg-[#E8EFF5] p-[1px]">
                          <div
                            className="w-full rounded-[3px]"
                            style={{ height: h, background: i === SLEEP_BARS.length - 1 ? G.barToday : G.bar }}
                          />
                        </div>
                        <span className="text-[7px] font-semibold text-[#8399A7]">
                          {["T", "W", "T", "F", "S", "S", "M"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 rounded-[4px] bg-[#F3F8FB] px-2 py-1 text-[7px] text-[#6C8798]">
                    Aim for 8 hours · Wind down at 10:30 pm
                  </p>
                </div>

                <div className="border-t border-[#E4EEF1] p-3.5 md:border-l md:border-t-0">
                  <p className="text-[11px] font-bold text-[#214F61]">Your moment of calm</p>
                  <div className="mt-2 flex items-center gap-2">
                    <SmartImage
                      src={IMG.album}
                      alt="Calm piano album"
                      className="h-8 w-8 rounded-md object-cover"
                      fallbackNode={<div className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-300 to-emerald-500" />}
                    />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-[#2A5A6A]">Clair de lune</p>
                      <p className="text-[8px] text-[#7A95A0]">Claude Debussy · Piano</p>
                    </div>
                    <span className="rounded-full bg-[#E9F5EE] px-2 py-0.5 text-[6px] font-bold text-[#638C70]">
                      PIANO &amp; PEACE
                    </span>
                  </div>
                  <div className="mt-2.5 h-[3px] w-full rounded bg-[#DFEDF0]">
                    <div className="h-full w-[35%] rounded bg-[#55A9B9]" />
                  </div>
                  <div className="mt-1 flex justify-between text-[7px] text-[#88A1AB]">
                    <span>1:42</span>
                    <span>5:03</span>
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-3 text-[9px] text-[#457E94]">
                    <span>🔀</span>
                    <span>⏮</span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white text-white shadow-xs"
                      style={{ background: "linear-gradient(180deg,#6DCCDD,#198CAE)" }}
                    >
                      ▶
                    </span>
                    <span>⏭</span>
                    <span>🔁</span>
                  </div>
                  <p className="mt-1.5 text-center text-[7px] text-[#7E9BA6]">
                    Unplug for a while. You’ve earned it.
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-[8px] font-medium text-white drop-shadow-xs">
                <span>A little balance goes a long way.</span>
                <span>Your wellness, at your pace. ♡</span>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}

/* 5. STEPS SECTION ("Small steps. Your own pace.") */
function StepsSection() {
  return (
    <section id="how-it-works" className="w-full bg-[#F0FAFC] px-5 py-12 md:px-20">
      <div className="mx-auto max-w-[1280px]">
        <Eyebrow className="text-[#527D8D]">A GENTLER WAY TO GET STARTED</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold text-[#245565] md:text-[36px]">
          Small steps. Your own pace.
        </h2>

        <div className="mt-9 grid gap-8 md:grid-cols-3 md:gap-14">
          {STEPS.map(([n, title, desc, grad]) => (
            <div key={n}>
              <div
                className="flex h-11 w-13 items-center justify-center rounded-[12px] border border-[#497F9B] text-base font-bold text-[#1B4958] shadow-[0_3px_8px_rgba(36,85,101,0.16),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                style={{ background: grad }}
              >
                {n}
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#245565]">{title}</h3>
              <p className="mt-2 max-w-[360px] text-sm leading-relaxed text-[#245565]/90">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. BENEFITS SECTION ("Big ambitions. A real-life budget.") */
function BenefitsSection() {
  return (
    <section className="flex w-full justify-center bg-[#F0FAFC] px-4 py-6 md:px-20">
      <Panel className="grid w-full max-w-[1280px] gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="flex flex-col justify-center">
          <Glass className="w-fit px-3 py-1">
            <Eyebrow>MADE FOR YOUR EVERYDAY</Eyebrow>
          </Glass>
          <Glass className="mt-3 w-fit p-5">
            <h2 className="text-3xl font-bold leading-[1.22] text-[#245565] md:text-[36px]">
              Big ambitions.
              <br />A real-life budget.
            </h2>
          </Glass>
          <p className="mt-5 max-w-[480px] text-[15px] leading-[1.5] text-[#245565]">
            From student schedules to busy weeks, looking after yourself doesn’t have to be all or nothing.
          </p>
        </div>

        <div className="flex flex-col justify-center divide-y divide-[#35B9D8]/60">
          {BENEFITS.map(([t, d]) => (
            <div key={t} className="py-4 first:pt-0 last:pb-0">
              <h3 className="text-lg font-bold text-[#245565]">{t}</h3>
              <p className="mt-1 text-xs text-[#245565]/90">{d}</p>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

/* 7. FAQ SECTION ("Good questions. Simple answers.") */
function FaqSection() {
  return (
    <section className="w-full bg-[#F0FAFC] px-5 py-14 md:px-20">
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 lg:grid-cols-[360px_1fr] lg:gap-[120px]">
        <Panel className="relative min-h-[270px] p-6">
          <Glass className="w-fit px-2.5 py-1">
            <Eyebrow>A LITTLE MORE CLARITY</Eyebrow>
          </Glass>
          <Glass className="mt-3 p-4">
            <h2 className="text-2xl font-bold leading-[1.25] text-[#245565] md:text-[32px]">
              Good questions.
              <br />
              Simple answers.
            </h2>
          </Glass>
          <p className="mt-5 max-w-[230px] text-sm leading-relaxed text-[#245565]">
            Get to know your space for a more balanced everyday.
          </p>

          {/* Maskot Angkat Barbel di Pojok Kanan Bawah Panel FAQ */}
          <div className="pointer-events-none absolute -bottom-14 -right-10 z-20">
            <img
              src= "/mascot-barbel.svg"
              alt="Mascot lifting barbell"
              className="w-[155px] drop-shadow-[0_10px_16px_rgba(20,90,115,0.28)] md:w-[175px]"
            />
          </div>
        </Panel>

        <div className="flex flex-col divide-y divide-[#35B9D8]/70">
          {FAQ.map(([q, a]) => (
            <div key={q} className="py-5 first:pt-0">
              <h3 className="text-lg font-bold text-[#245565]">{q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#245565]/90">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8. BOTTOM CTA BANNER ("Make room for a healthier kind of everyday.") */
function CtaSection({ onBegin }) {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-[#88B8C8]/60 bg-cover bg-bottom px-4 py-12 md:px-20 md:py-16"
      style={{
        backgroundImage: `url('${IMG.natureBg}'), url('${IMG.dashboardBg}'), linear-gradient(180deg, #5fd0f8 0%, #78ce3b 100%)`,
      }}
    >
      <div
        className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 rounded-[20px] border border-white/90 p-7 backdrop-blur-md md:flex-row md:items-center md:p-11"
        style={{
          background:
            "linear-gradient(90deg, rgba(240,252,255,0.9) 0%, rgba(230,248,255,0.78) 65%, rgba(240,252,255,0.85) 100%)",
          boxShadow: "0 10px 30px rgba(20, 85, 110, 0.2), inset 0 1px 2px rgba(255,255,255,0.95)",
        }}
      >
        <div>
          <Eyebrow className="text-[#3C7686]">START YOUR BALANCE WITH NEXORA</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold leading-[1.2] text-[#1D4E5F] md:text-[34px]">
            Make room for a
            <br />
            healthier kind of everyday.
          </h2>
          <p className="mt-2.5 text-xs font-medium text-[#3B6978]">
            Your goals, your routine, your own pace.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <PrimaryButton onClick={onBegin} className="!px-10 !py-3 text-base">
            Begin →
          </PrimaryButton>
          <span className="text-[10px] font-medium text-[#3B6978]">
            Free to try · Built for everyday life
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-[#CBE4EC] bg-[#F0FAFC]">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-16">
        <div>
          <a href="#" className="flex items-center gap-2">
            <img
              src="/mascot-icon.svg"
              alt="Nexora logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-[#245565]">Nexora</span>
          </a>
          <p className="mt-1.5 text-[10px] font-semibold tracking-wider text-[#245565]/80">
            LIVE WELL. FIND BALANCE.
          </p>
        </div>

        <nav className="flex gap-9 text-xs font-medium text-[#245565]">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="hover:underline">
              {n.label}
            </a>
          ))}
        </nav>

        <p className="text-[11px] text-[#245565]/80">Your wellness, at your pace. ♡</p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export default function NexoraLandingPage({ onLogin, onBegin }) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F0FAFC] font-[Inter,system-ui,sans-serif]">
      <Header onLogin={onLogin} onBegin={onBegin} />
      <Hero onBegin={onBegin} />
      <WhySection />
      <ToolkitSection />
      <DashboardSection onBegin={onBegin} />
      <StepsSection />
      <BenefitsSection />
      <FaqSection />
      <CtaSection onBegin={onBegin} />
      <Footer />
    </div>
  );
}