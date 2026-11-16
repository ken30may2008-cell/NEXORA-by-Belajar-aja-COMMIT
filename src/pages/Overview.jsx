"use client";
import { useState, useEffect } from "react";

/* ---------- Fungsi Navigasi Aman ---------- */
function triggerNav(targetPage, onNavigateProp) {
  if (onNavigateProp) {
    onNavigateProp(targetPage);
  }
  window.location.hash = targetPage;
  window.dispatchEvent(new CustomEvent("nexora-navigate", { detail: targetPage }));
}

/* ---------- Data ---------- */

const initialExpenses = [
  { id: 1, icon: "dumbbell", tone: "bg-sky-100/90 text-sky-700 border-sky-200", name: "Gym membership", sub: "Campus fitness · renews May 28", amount: 35 },
  { id: 2, icon: "fork", tone: "bg-lime-100/90 text-lime-700 border-lime-200", name: "High-protein meal prep", sub: "Groceries · 4 weekly shops", amount: 110 },
  { id: 3, icon: "bottle", tone: "bg-violet-100/90 text-violet-600 border-violet-200", name: "Supplements", sub: "Whey protein · monthly supply", amount: 20 },
];

const days = [
  { d: "MON", n: 18, s: "Upper" },
  { d: "TUE", n: 19, s: "Rest" },
  { d: "WED", n: 20, s: "Lower" },
  { d: "THU", n: 21, s: "Rest" },
  { d: "FRI", n: 22, s: "Pull" },
  { d: "SAT", n: 23, s: "Full" },
  { d: "SUN", n: 24, s: "Rest" },
];

const sessions = {
  Upper: { title: "Upper body", meta: "6 exercises · Chest, shoulders & arms", time: "50:00", target: "45–60 min target" },
  Lower: { title: "Lower body", meta: "5 exercises · Quads, glutes & calves", time: "45:00", target: "40–50 min target" },
  Pull: { title: "Pull day", meta: "5 exercises · Back & biceps", time: "45:00", target: "40–50 min target" },
  Full: { title: "Full body", meta: "7 exercises · Everything, gently", time: "55:00", target: "50–60 min target" },
  Rest: { title: "Rest day", meta: "Stretch, walk, hydrate", time: "—", target: "No target today" },
};

const sleepBars = [
  { l: "T", h: 58 },
  { l: "W", h: 66 },
  { l: "T", h: 56 },
  { l: "F", h: 74 },
  { l: "S", h: 64 },
  { l: "S", h: 76 },
  { l: "M", h: 70, active: true },
];

/* ---------- Primitives ---------- */

const ICONS = {
  wallet: "M3 7a2 2 0 0 1 2-2h12v3M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-1Zm13 6h2",
  dumbbell: "m6.5 6.5 11 11M3 10l3-3m-1 5 4-4m6 10 4-4m-1 5 3-3M17.5 3.5l3 3M3.5 17.5l3 3",
  moon: "M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z",
  leaf: "M5 19C5 9 11 5 20 4c0 9-4 15-14 15ZM5 19l9-9",
  fork: "M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2.5 6 0 8v10",
  bottle: "M9 3h6M10 3v3l-2 3v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9l-2-3V3M8 13h8",
  bell: "M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Zm4 4a2 2 0 0 0 4 0",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  walk: "M13 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM10 21l1.5-6L9 12.5l1-4 3.5 2.5 2.5.5M9 12.5 7 15",
  plus: "M12 5v14M5 12h14",
  shuffle: "M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
  prev: "M19 5v14L8 12l11-7ZM5 5v14",
  next: "M5 5v14l11-7L5 5ZM19 5v14",
  repeat: "m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
  chev: "m9 6 6 6-6 6",
  trend: "m7 17 10-10M8 7h9v9",
};

function Ico({ name, className = "h-4 w-4", fill = "none" }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

/* Panel kaca khas Frutiger Aero dengan specular border atas */
const glass =
  "border border-white/85 bg-white/75 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(20,90,110,0.16)]";

/* Tombol aqua glossy dengan kilau cahaya di bagian atas (SUDAH DIPERBAIKI) */
function GlossyButton({ children, onClick, disabled = false, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative cursor-pointer overflow-hidden border border-[#0b76a8] bg-gradient-to-b from-[#5cc4f2] via-[#178ec7] to-[#29a7de] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_4px_12px_rgba(16,120,170,0.32)] transition-all hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {/* Kilauan kaca bagian atas */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/55 to-white/10"
      />
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-[0_1px_1px_rgba(0,60,95,0.45)]">
        {children}
      </span>
    </button>
  );
}

const Caps = ({ children, className = "" }) => (
  <p className={`text-[9px] font-semibold uppercase tracking-wider ${className}`}>{children}</p>
);

/* ---------- Decorative ---------- */

function Bubble({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-white/80 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 25%, rgba(255,255,255,.95), rgba(255,255,255,.22) 36%, rgba(145,215,255,.25) 70%, rgba(255,255,255,.6))",
        boxShadow: "inset 0 0 18px rgba(255,255,255,.75), 0 6px 16px rgba(30,115,170,.22)",
      }}
    />
  );
}

/* Fallback CSS Maskot jika file SVG belum terbaca */
function FallbackMascot({ className = "", sitting = false }) {
  const body =
    "bg-[radial-gradient(circle_at_32%_25%,#e3fff6,#46d3c2_48%,#1b8fa8_100%)] shadow-[inset_-6px_-8px_14px_rgba(10,90,120,.35),0_8px_18px_rgba(20,120,140,.3)]";
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className={`absolute left-[24%] top-0 h-[36%] w-[52%] rounded-full ${body}`} />
      <div className={`absolute left-[10%] top-[30%] h-[50%] w-[80%] rounded-[45%] ${body}`} />
      <div className={`absolute left-[2%] top-[40%] h-[18%] w-[22%] rounded-full ${body}`} />
      <div className={`absolute right-[2%] top-[40%] h-[18%] w-[22%] rounded-full ${body}`} />
      {!sitting && (
        <>
          <div className={`absolute bottom-0 left-[22%] h-[20%] w-[25%] rounded-full ${body}`} />
          <div className={`absolute bottom-0 right-[22%] h-[20%] w-[25%] rounded-full ${body}`} />
        </>
      )}
    </div>
  );
}

/* Komponen gambar maskot dengan auto-fallback bila salah eja/path */
function MascotAsset({ primarySrc, altSrc, alt, className = "", sitting = false }) {
  const [src, setSrc] = useState(primarySrc);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <FallbackMascot className={className} sitting={sitting} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        if (altSrc && src !== altSrc) {
          setSrc(altSrc);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

/* ---------- Sections ---------- */

function Header({ onNavigate }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="rounded-2xl border border-[#144F60]/45 bg-white/85 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_12px_rgba(20,90,110,0.1)] backdrop-blur-md">
        <h1 className="text-xl font-bold leading-tight text-[#144F60]">My Overview</h1>
        <p className="text-[8px] font-semibold uppercase tracking-wider text-[#5b7f8a]">Monday, May 18, 2026</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Tombol Tanggal -> ke Calendar */}
        <button
          type="button"
          onClick={() => triggerNav("calendar", onNavigate)}
          className={`flex w-[195px] cursor-pointer items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-[#144F60] transition hover:bg-white/90 ${glass}`}
        >
          May 18 – 24, 2026
          <Ico name="chev" className="h-3.5 w-3.5 text-[#406E7C]" />
        </button>

        {/* Tombol Lonceng -> ke Notification */}
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => triggerNav("notification", onNavigate)}
          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-[#144F60] transition hover:bg-white/90 ${glass}`}
        >
          <Ico name="bell" />
        </button>

        {/* Tombol Student Plan -> ke User Page */}
        <button
          type="button"
          onClick={() => triggerNav("user", onNavigate)}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#96c963] bg-gradient-to-b from-[#e9f9cf] to-[#cdeaa2] py-1 pl-3.5 pr-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_4px_10px_rgba(50,110,40,0.14)] transition hover:brightness-105 active:scale-95"
        >
          <span className="text-xs font-semibold text-[#3a6826]">Student plan</span>
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/80 bg-[radial-gradient(circle_at_35%_28%,#e3fff6,#38c4bc_55%,#14758f_100%)] shadow-[inset_0_-2px_4px_rgba(10,60,80,0.4)]">
            <span className="h-2.5 w-2.5 -translate-y-0.5 rounded-full bg-white/75" />
          </span>
        </button>
      </div>
    </header>
  );
}

function Hero({ onQuickPlan }) {
  const [tipIndex, setTipIndex] = useState(0);
  const tips = [
    "A fresh start, every day.",
    "Stay hydrated! 2L water goal 💧",
    "Small steps, big energy! ✨",
  ];

  return (
    <section className="relative mt-4 overflow-hidden rounded-3xl border border-white/85 bg-gradient-to-r from-[#e3f8ff]/85 via-[#bdeeff]/65 to-[#9ee0ff]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_32px_rgba(20,95,120,0.16)] backdrop-blur-md">
      <div className="relative grid min-h-[195px] items-center gap-4 px-7 py-6 md:grid-cols-[1.15fr_1fr]">
        <div>
          <Caps className="text-[#2c7a82]">A little stronger. A little more balanced.</Caps>
          <h2 className="mt-1.5 text-[32px] font-bold leading-[1.18] tracking-tight text-[#144F60] sm:text-[36px]">
            Feel good. Spend smart.
          </h2>
          <p className="mt-2 text-sm leading-[1.45] text-[#3d6d7c]">
            Your goals, your routine, your own pace.
            <br />
            Make room for a healthier kind of everyday.
          </p>
          <GlossyButton onClick={onQuickPlan} className="mt-5 rounded-xl px-4 py-2.5 text-[13px]">
            Plan my week <span aria-hidden="true">→</span>
          </GlossyButton>
        </div>

        {/* Area Maskot Interaktif + Badge Kanan Bawah */}
        <div className="relative flex h-[165px] items-end justify-between md:justify-end">
          <button
            type="button"
            onClick={() => setTipIndex((i) => (i + 1) % tips.length)}
            title="Klik maskot untuk motivasi!"
            className="group relative mr-auto flex flex-col items-center focus:outline-none md:mr-44"
          >
            <div className="animate-aero-float transition-transform duration-300 group-hover:scale-105">
              <MascotAsset
                primarySrc="/mascot-stretching.svg"
                altSrc="/mascot-strectching.svg"
                alt="Nexora Mascot Stretching"
                className="h-36 w-auto drop-shadow-[0_10px_14px_rgba(18,105,125,0.28)]"
              />
            </div>
          </button>

          <div
            onClick={() => setTipIndex((i) => (i + 1) % tips.length)}
            className="cursor-pointer flex items-center gap-2 rounded-xl border border-white/95 bg-white/85 px-3.5 py-2.5 text-[11px] font-medium text-[#356955] shadow-[0_4px_14px_rgba(25,95,110,0.12)] backdrop-blur-md transition hover:bg-white"
          >
            <Ico name="leaf" className="h-4 w-4 text-[#4D924C]" />
            <span>{tips[tipIndex]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats({ budgetRemaining, workoutsDone }) {
  const statItems = [
    {
      label: "Budget remaining",
      value: `$${budgetRemaining.toFixed(2)}`,
      note: "of $250 monthly budget",
      icon: "wallet",
      tone: "bg-sky-100/90 text-sky-700 border-sky-200",
    },
    {
      label: "Workouts this week",
      value: `${workoutsDone} / 4`,
      note: workoutsDone === 0 ? "A fresh week starts here" : "Great momentum this week!",
      icon: "dumbbell",
      tone: "bg-emerald-100/90 text-emerald-700 border-emerald-200",
    },
    {
      label: "Average sleep",
      value: "7h 42m",
      note: "↑ 32 min from last week",
      icon: "moon",
      tone: "bg-indigo-100/90 text-indigo-600 border-indigo-200",
    },
    {
      label: "Daily protein",
      value: "96 / 120 g",
      note: "24 g to reach your goal",
      icon: "leaf",
      tone: "bg-lime-100/90 text-lime-700 border-lime-200",
    },
  ];

  return (
    <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((s) => (
        <article key={s.label} className={`rounded-2xl p-4 transition-transform hover:-translate-y-0.5 ${glass}`}>
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium text-[#406E7C]">{s.label}</p>
            <span className={`flex h-6 w-6 items-center justify-center rounded-lg border shadow-xs ${s.tone}`}>
              <Ico name={s.icon} className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-[26px] font-bold leading-tight tracking-tight text-[#144F60]">{s.value}</p>
          <p className="mt-2.5 text-[10px] font-medium text-[#2a8a8f]">{s.note}</p>
        </article>
      ))}
    </section>
  );
}

function Budget({ items, onAddExpense }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const totalBudget = 250;
  const spent = items.reduce((acc, item) => acc + item.amount, 0);
  const left = Math.max(0, totalBudget - spent);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!name.trim() || isNaN(val) || val <= 0) return;
    onAddExpense({
      id: Date.now(),
      icon: "leaf",
      tone: "bg-teal-100/90 text-teal-700 border-teal-200",
      name: name.trim(),
      sub: "Added today · student essential",
      amount: val,
    });
    setName("");
    setAmount("");
    setAdding(false);
  };

  return (
    <article className={`flex flex-col justify-between rounded-3xl p-6 ${glass} bg-white/80`}>
      <div>
        <div className="flex items-start justify-between">
          <h3 className="text-base font-bold text-[#144F60]">A healthy budget</h3>
          <Caps className="text-[#6b8c96]">May 2026</Caps>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <p className="text-[32px] font-bold leading-none text-[#144F60]">
            ${spent} <span className="text-xs font-normal text-[#6b8c96]">/ ${totalBudget} spent</span>
          </p>
          <span className="rounded-lg border border-[#a5cf6e] bg-gradient-to-b from-[#e7f8ca] to-[#ceeaa2] px-3 py-1.5 text-[10px] font-semibold text-[#3f6b2c] shadow-xs">
            ${left} left to use
          </span>
        </div>

        <div
          className="mt-3.5 flex h-2.5 overflow-hidden rounded-full border border-white/80 bg-slate-200/80 p-[1px] shadow-inner"
          role="img"
          aria-label={`$${spent} of $${totalBudget} spent`}
        >
          <span className="h-full w-[16%] rounded-l-full bg-gradient-to-b from-sky-400 to-sky-600" />
          <span className="h-full w-[44%] bg-gradient-to-b from-lime-500 to-lime-700" />
          <span className="h-full w-[8%] rounded-r-full bg-gradient-to-b from-indigo-300 to-indigo-500" />
        </div>

        <div className="mt-5 flex justify-between">
          <Caps className="text-[#6b8c96]">Monthly essentials</Caps>
          <Caps className="text-[#6b8c96]">Amount</Caps>
        </div>

        <ul className="mt-2 divide-y divide-slate-200/70">
          {items.map((e) => (
            <li key={e.id} className="flex items-center gap-3 py-2.5">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-xs ${e.tone}`}>
                <Ico name={e.icon} />
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#144F60]">{e.name}</p>
                <p className="text-[10px] text-[#7a98a1]">{e.sub}</p>
              </div>
              <p className="text-xs font-bold text-[#144F60]">${e.amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>

      {adding ? (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-3">
          <input
            type="text"
            placeholder="Item (e.g. Oats)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-w-[110px] flex-1 rounded-lg border border-sky-200 bg-white/90 px-2.5 py-1.5 text-xs text-[#144F60] focus:border-sky-500 focus:outline-none"
          />
          <input
            type="number"
            step="0.01"
            placeholder="$10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-20 rounded-lg border border-sky-200 bg-white/90 px-2.5 py-1.5 text-xs text-[#144F60] focus:border-sky-500 focus:outline-none"
          />
          <button type="submit" className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700">
            Save
          </button>
          <button type="button" onClick={() => setAdding(false)} className="text-xs text-slate-500 hover:underline">
            Cancel
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 border-t border-slate-200/70 pt-3 text-[11px] font-semibold text-[#168CC3] hover:underline"
        >
          <Ico name="plus" className="h-3.5 w-3.5" /> Add expense
        </button>
      )}
    </article>
  );
}

function Movement({ onStartWorkout, workoutStarted, onViewExercises, onEditPlan }) {
  const [active, setActive] = useState(0);
  const day = days[active];
  const session = sessions[day.s];
  const isRest = day.s === "Rest";

  return (
    <article className="flex flex-col justify-between rounded-3xl border border-white/85 bg-gradient-to-b from-[#bae3f6]/85 via-[#e2f3fa]/75 to-[#d5edd7]/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(20,90,110,0.16)] backdrop-blur-md">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#144F60]">Make time for movement</h3>
          <button
            type="button"
            onClick={onEditPlan}
            className="cursor-pointer text-[10px] font-semibold text-[#144F60] hover:underline"
          >
            Edit plan ↗
          </button>
        </div>

        <div className="mt-3.5 rounded-2xl border border-white/80 bg-white/45 p-3.5 shadow-inner">
          <div className="grid grid-cols-7 gap-1.5" role="tablist" aria-label="Weekly plan">
            {days.map((x, i) => {
              const on = i === active;
              return (
                <button
                  key={x.d}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`relative cursor-pointer overflow-hidden rounded-xl border py-2 text-center transition-all ${
                    on
                      ? "border-[#1474a6] bg-gradient-to-b from-[#66c5ef] via-[#289ad4] to-[#177bb3] text-white shadow-[0_4px_10px_rgba(23,123,179,0.35)]"
                      : "border-white/90 bg-white/65 text-[#406E7C] hover:bg-white/95"
                  }`}
                >
                  {on && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent"
                    />
                  )}
                  <span className="relative block text-[8px] font-bold">{x.d}</span>
                  <span className="relative block text-lg font-bold leading-tight">{x.n}</span>
                  <span className="relative block text-[9px] font-medium">{x.s}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-end justify-between gap-3 px-1">
            <div>
              <Caps className="text-[#6b8c96]">Today’s session</Caps>
              <p className="mt-1 text-2xl font-bold text-[#144F60]">{session.title}</p>
              <p className="mt-1 text-[10px] text-[#6b8c96]">{session.meta}</p>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-sky-200/90 bg-sky-100/80 px-3.5 py-2 shadow-xs">
              <Ico name="clock" className="h-4 w-4 text-sky-600" />
              <div>
                <p className="text-lg font-bold leading-none text-[#144F60]">{session.time}</p>
                <p className="mt-0.5 text-[8px] text-[#5c7f8a]">{session.target}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#b8dc8e] bg-gradient-to-r from-[#e3f4cf]/90 to-[#eef8df]/90 px-3.5 py-2 text-[10px] font-medium text-[#3f6b2c]">
            <Ico name="walk" className="h-3.5 w-3.5 shrink-0" />
            Finish fresh: 5-min treadmill walk to cool down
          </div>
        </div>
      </div>

      {/* Baris 2 Tombol Bawah: Start workout (Biru Glossy) & View exercises (Putih) */}
      <div className="mt-3.5 grid grid-cols-[1.6fr_1fr] gap-2.5">
        <GlossyButton
          onClick={onStartWorkout}
          disabled={isRest}
          className="rounded-xl py-2.5 text-[11px]"
        >
          <span aria-hidden="true">▶</span> {workoutStarted ? "Session active (50:00)" : "Start workout"}
        </GlossyButton>

        {/* TOMBOL PUTIH VIEW EXERCISES */}
        <button
          type="button"
          onClick={onViewExercises}
          className="cursor-pointer rounded-xl border border-white/90 bg-white/80 py-2.5 text-[11px] font-semibold text-[#144F60] shadow-xs transition hover:bg-white active:scale-95"
        >
          View exercises →
        </button>
      </div>
    </article>
  );
}

function Recovery() {
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(102); // 1:42
  const totalSeconds = 303; // 5:03

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setSeconds((s) => (s >= totalSeconds ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [playing]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPct = Math.round((seconds / totalSeconds) * 100);

  return (
    <section className={`mt-4 grid overflow-hidden rounded-3xl lg:grid-cols-[290px_1fr_1fr] ${glass} bg-white/75`}>
      <div className="relative flex min-h-[245px] flex-col justify-between overflow-hidden bg-gradient-to-b from-[#668c97]/75 via-[#3f6c79]/80 to-[#22515f]/85 p-5 text-white backdrop-blur-md">
        <Caps className="relative z-10 text-white/75">The recovery room</Caps>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-3">
          <MascotAsset
            primarySrc="/mascot-sit.svg"
            altSrc="/mascot-sitting.svg"
            alt="Mascot Resting"
            sitting={true}
            className="h-44 w-auto opacity-85 drop-shadow-[0_8px_16px_rgba(10,45,55,0.4)]"
          />
        </div>

        <div className="relative z-10 mt-auto">
          <p className="text-[23px] font-semibold leading-tight drop-shadow-sm">
            Rest is part
            <br />
            of the routine.
          </p>
          <p className="mt-1.5 text-[10px] text-white/80">A softer ending. A stronger tomorrow.</p>
        </div>
      </div>

      {/* Sleep */}
      <div className="border-b border-slate-200/70 p-6 lg:border-b-0 lg:border-r">
        <h3 className="text-base font-bold text-[#144F60]">Sleep, beautifully.</h3>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-[32px] font-bold leading-none text-[#144F60]">
            7h 42m <span className="ml-1.5 text-[10px] font-normal text-[#7a98a1]">last night</span>
          </p>
          <span className="flex items-center gap-1 rounded-full border border-[#c3dfb7] bg-[#e5f2de] px-3 py-1 text-[9px] font-semibold text-[#457339]">
            <Ico name="trend" className="h-2.5 w-2.5" /> Good quality
          </span>
        </div>
        <p className="mt-3 text-[10px] text-[#7a98a1]">Your week of rest</p>

        <div className="mt-2.5 flex h-[86px] items-end justify-between gap-2.5 px-2">
          {sleepBars.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-[68px] w-full max-w-[22px] items-end overflow-hidden rounded-lg border border-white/80 bg-slate-200/55 p-[1px] shadow-inner">
                <div
                  className={`w-full rounded-md transition-all ${
                    b.active
                      ? "bg-gradient-to-b from-[#53c4f0] to-[#1685bd] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                      : "bg-gradient-to-b from-[#b7c8ee] to-[#98afe4]"
                  }`}
                  style={{ height: `${b.h}%` }}
                />
              </div>
              <span className="text-[8px] font-semibold text-[#7a98a1]">{b.l}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 rounded-lg border border-white/85 bg-white/65 px-3 py-1.5 text-[9px] font-medium text-[#6b8c96]">
          Aim for 8 hours · Wind down at 10:30 pm
        </p>
      </div>

      {/* Calm Music Player */}
      <div className="p-6">
        <h3 className="text-base font-bold text-[#144F60]">Your moment of calm</h3>

        <div className="mt-4 flex items-center gap-3">
          <div
            className="h-12 w-12 shrink-0 rounded-xl border border-white/80 bg-[radial-gradient(circle_at_30%_25%,#e0f7ff,#60c5e8_45%,#3c9d5c_100%)] shadow-sm"
            aria-hidden="true"
          />
          <div className="flex-1">
            <p className="text-sm font-bold text-[#144F60]">Clair de lune</p>
            <p className="text-[10px] text-[#7a98a1]">Claude Debussy · Piano</p>
          </div>
          <span className="rounded-full border border-slate-200/80 bg-slate-100/80 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wide text-[#406E7C]">
            Piano &amp; peace
          </span>
        </div>

        <div className="mt-4">
          <div className="relative h-1.5 rounded-full bg-slate-200/80 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 transition-all"
              style={{ width: `${progressPct}%` }}
            />
            <span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-500 bg-white shadow"
              style={{ left: `${progressPct}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[8px] font-medium text-[#7a98a1]">
            <span>{formatTime(seconds)}</span>
            <span>5:03</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-6 text-[#277ea1]">
          <button type="button" aria-label="Shuffle" className="hover:text-[#144F60]">
            <Ico name="shuffle" />
          </button>
          <button type="button" onClick={() => setSeconds(0)} aria-label="Previous" className="hover:text-[#144F60]">
            <Ico name="prev" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#1279a8] bg-gradient-to-b from-[#69ccf2] via-[#2196cc] to-[#1574a6] text-white shadow-[0_6px_14px_rgba(21,116,166,0.38),inset_0_1px_2px_rgba(255,255,255,0.85)] transition-transform hover:scale-105 active:scale-95"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-1 top-0.5 h-[45%] rounded-t-full bg-gradient-to-b from-white/60 to-transparent"
            />
            <span className="relative z-10 text-xs">{playing ? "❚❚" : "▶"}</span>
          </button>
          <button type="button" onClick={() => setSeconds(180)} aria-label="Next" className="hover:text-[#144F60]">
            <Ico name="next" />
          </button>
          <button type="button" aria-label="Repeat" className="hover:text-[#144F60]">
            <Ico name="repeat" />
          </button>
        </div>

        <p className="mt-3 text-center text-[9px] text-[#7a98a1]">Unplug for a while. You’ve earned it.</p>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function NatureHero({ onNavigate }) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [workoutsDone, setWorkoutsDone] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetRemaining = Math.max(0, 250 - spent);

  const handleStartWorkout = () => {
    if (!workoutStarted) {
      setWorkoutStarted(true);
      setWorkoutsDone((w) => Math.min(4, w + 1));
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundImage:
          "url('/BG-barbel.svg'), linear-gradient(180deg, #32b7f0 0%, #8be0ff 55%, #73cb36 100%)",
      }}
    >
      <style>{`
        @keyframes aeroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-aero-float {
          animation: aeroFloat 3.4s ease-in-out infinite;
        }
      `}</style>

      <Bubble className="left-5 top-8 h-14 w-14" />
      <Bubble className="left-0 top-[38%] h-12 w-8" />
      <Bubble className="bottom-[24%] right-6 h-20 w-20" />
      <Bubble className="bottom-6 left-6 h-28 w-28" />
      <Bubble className="bottom-10 right-24 h-8 w-8" />

      <main className="relative mx-auto max-w-[1080px] px-4 py-8">
        <Header onNavigate={onNavigate} />
        <Hero onQuickPlan={() => triggerNav("workout", onNavigate)} />
        <Stats budgetRemaining={budgetRemaining} workoutsDone={workoutsDone} />

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Budget
            items={expenses}
            onAddExpense={(newItem) => setExpenses((prev) => [...prev, newItem])}
          />
          <Movement
            workoutStarted={workoutStarted}
            onStartWorkout={handleStartWorkout}
            onEditPlan={() => triggerNav("workout", onNavigate)}
            onViewExercises={() => triggerNav("view-exercise", onNavigate)}
          />
        </div>

        <Recovery />

        <footer className="mt-4 flex justify-between px-2 text-[9px] font-medium text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
          <span>A little balance goes a long way.</span>
          <span>Your wellness, at your pace. ♡</span>
        </footer>
      </main>
    </div>
  );
}