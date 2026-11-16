"use client";
import React, { useState } from "react";

/* ---------- Data 28 Hari: Apr 27 – May 24, 2026 (4 Minggu) ---------- */
// s: "w" (Workout) | "r" (Rest day) | "m" (Missed)
const DAYS = [
  // Minggu 1
  { d: 27, s: "w" }, { d: 28, s: "r" }, { d: 29, s: "w" }, { d: 30, s: "w" },
  { d: 1, s: "r" },  { d: 2, s: "w" },  { d: 3, s: "w" },
  // Minggu 2
  { d: 4, s: "m" },  { d: 5, s: "r" },  { d: 6, s: "w" },  { d: 7, s: "r" },
  { d: 8, s: "m" },  { d: 9, s: "w" },  { d: 10, s: "w" },
  // Minggu 3
  { d: 11, s: "r" }, { d: 12, s: "m" }, { d: 13, s: "w" }, { d: 14, s: "r" },
  { d: 15, s: "w" }, { d: 16, s: "r" }, { d: 17, s: "w" },
  // Minggu 4 (Minggu Ini)
  { d: 18, s: "w" }, { d: 19, s: "r" }, { d: 20, s: "w" }, { d: 21, s: "r" },
  { d: 22, s: "w" }, { d: 23, s: "w" }, { d: 24, s: "r" },
];

const THIS_WEEK = DAYS.slice(21);
const WEEK_WORKOUTS = THIS_WEEK.filter((x) => x.s === "w").length; // 4
const WEEK_REST = THIS_WEEK.filter((x) => x.s === "r").length;     // 3
const WEEK_DONE = WEEK_WORKOUTS + WEEK_REST;                       // 7
const WEEK_PCT = Math.round((WEEK_DONE / 7) * 100);                // 100%

const MILESTONES = [
  {
    big: "7",
    title: "7-day streak",
    sub: "Unlocked · Keep showing up",
    locked: false,
  },
  {
    big: "30",
    title: "30 workouts",
    sub: "Locked · 24 / 30 workouts",
    locked: true,
  },
  {
    big: "1",
    title: "First rest day logged",
    sub: "Unlocked · Recovery is progress",
    locked: false,
  },
];

/* ---------- Komponen Maskot Kecil di Tile Rest Day ---------- */
function MiniMascot({ className = "h-6 w-6" }) {
  const [src, setSrc] = useState("/mascot-sit.svg");
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="mm-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dffef4" />
            <stop offset="1" stopColor="#1ca3b8" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="17" rx="6" ry="5.5" fill="url(#mm-body)" />
        <circle cx="12" cy="8" r="5" fill="url(#mm-body)" />
        <ellipse cx="10.4" cy="6.4" rx="1.4" ry="0.9" fill="white" opacity="0.85" />
      </svg>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={`${className} object-contain drop-shadow-[0_2px_4px_rgba(12,75,95,0.25)]`}
      onError={() => {
        if (src !== "/mini-mascot.png") {
          setSrc("/mini-mascot.png");
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

/* ---------- Komponen Maskot Angkat Barbel di Hero Banner ---------- */
function BarbellMascot({ className = "h-[165px] w-auto" }) {
  const [src, setSrc] = useState("/Gemini_generated_image_no8u94no8u94no8u2.png");
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <svg viewBox="0 0 200 180" className={className} aria-hidden="true">
        <defs>
          <radialGradient id="bm-grad" cx="35%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#F2FFCC" />
            <stop offset="30%" stopColor="#84F2C2" />
            <stop offset="70%" stopColor="#14B8C4" />
            <stop offset="100%" stopColor="#08758F" />
          </radialGradient>
        </defs>
        {/* Barbel */}
        <line x1="20" y1="42" x2="180" y2="42" stroke="#7CC7E8" strokeWidth="6" strokeLinecap="round" />
        <rect x="24" y="20" width="14" height="44" rx="5" fill="#5CB8E4" stroke="#fff" strokeWidth="2" />
        <rect x="162" y="20" width="14" height="44" rx="5" fill="#5CB8E4" stroke="#fff" strokeWidth="2" />
        {/* Badan Maskot */}
        <ellipse cx="100" cy="132" rx="34" ry="36" fill="url(#bm-grad)" />
        <circle cx="100" cy="78" r="26" fill="url(#bm-grad)" />
      </svg>
    );
  }

  return (
    <img
      src="/mascot-barbel.svg"
      alt="Nexora mascot lifting barbell"
      className={`${className} object-contain drop-shadow-[0_10px_18px_rgba(14,82,104,0.28)]`}
    />
  );
}

/* ---------- Sel Tanggal Aktivitas (Workout / Rest / Missed) ---------- */
function DayCell({ d, s }) {
  const base =
    "relative flex h-[38px] items-center justify-between overflow-hidden rounded-[8px] border px-2.5 text-xs font-semibold transition-transform hover:scale-[1.02]";

  // 1. Workout Day (Hijau Muda Glossy)
  if (s === "w") {
    return (
      <div
        className={`${base} border-[#BBD9AC] text-[#23503A] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]`}
        style={{
          background: "linear-gradient(180deg, #F4FBEF 0%, #DFEFD2 100%)",
        }}
      >
        <span>{d}</span>
        <span className="text-[10px] font-bold text-[#357A4D]">✓</span>
      </div>
    );
  }

  // 2. Rest Day (Biru Horizon Split Glossy + Maskot Kecil)
  if (s === "r") {
    return (
      <div
        className={`${base} border-[#3495C6] text-[#0E3F52] shadow-[0_2px_6px_rgba(25,130,180,0.2),inset_0_1px_1px_rgba(255,255,255,0.85)]`}
        style={{
          background:
            "linear-gradient(180deg, #9EE0FA 0%, #5EC0EC 48%, #34A0D8 52%, #6AC6EE 100%)",
        }}
      >
        <span className="relative z-10">{d}</span>
        <MiniMascot className="relative z-10 h-6 w-6 -mr-0.5" />
      </div>
    );
  }

  // 3. Missed Day (Abu-abu Kebiruan)
  return (
    <div
      className={`${base} border-[#B2C7D2] text-[#355A68] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]`}
      style={{
        background: "linear-gradient(180deg, #DCE7EE 0%, #C6D6E0 100%)",
      }}
    >
      <span>{d}</span>
      <span className="text-[11px] font-bold text-[#5A7B8A]">–</span>
    </div>
  );
}

/* ---------- Ornamen Gelembung Frutiger Aero ---------- */
function AeroBubble({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-white/75 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.92), rgba(255,255,255,0.22) 40%, rgba(150,225,255,0.22) 72%, rgba(255,255,255,0.6) 100%)",
        boxShadow:
          "inset 0 0 14px rgba(255,255,255,0.8), 0 6px 16px rgba(18,95,125,0.14)",
      }}
    />
  );
}

/* ---------- Halaman Utama My Progress ---------- */
export default function MyProgress({ onNavigate }) {
  const unlocked = MILESTONES.filter((m) => !m.locked).length;

  const triggerNav = (targetPage) => {
    if (onNavigate) onNavigate(targetPage);
    window.location.hash = targetPage;
    window.dispatchEvent(
      new CustomEvent("nexora-navigate", { detail: targetPage })
    );
  };

  const whiteAeroCard =
    "rounded-[18px] border border-[#6BA5BD]/80 bg-[#F7FCFE]/95 shadow-[0_10px_28px_rgba(18,82,104,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-md";

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed px-4 pt-6 pb-16 font-[Inter,system-ui,sans-serif] text-[#154658] select-none md:px-10"
      style={{
        backgroundImage:
          "url('/BG-barbel.svg'), url('/bg-frutiger.png'), linear-gradient(180deg, #4cc3f7 0%, #a8e8ff 52%, #6ec732 100%)",
      }}
    >
      {/* Ornamen Gelembung Latar Belakang */}
      <AeroBubble className="-left-3 top-6 h-20 w-20 opacity-85" />
      <AeroBubble className="left-16 top-16 h-6 w-6 opacity-80" />
      <AeroBubble className="right-4 bottom-24 h-16 w-16 opacity-75" />

      <main className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-col gap-5">
        
        {/* ================= 1. HEADER ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[24px] font-bold leading-tight tracking-tight text-[#144456]">
              My progress
            </h1>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#356475]">
              WEEK OF MAY 18–24, 2026
            </p>
          </div>

          <button
            type="button"
            onClick={() => triggerNav("calendar")}
            className="flex min-w-[145px] cursor-pointer items-center justify-between gap-3 rounded-[10px] border border-white/90 bg-white/85 px-4 py-2 text-[11.5px] font-medium text-[#235466] shadow-xs backdrop-blur-md transition hover:bg-white"
          >
            <span>May 18 – 24, 2026</span>
            <span className="text-sm leading-none text-[#588190]">›</span>
          </button>
        </div>

        {/* ================= 2. HERO BANNER ("Small steps. Lasting progress.") ================= */}
        <section
          className="relative flex flex-col justify-between gap-6 overflow-visible rounded-[18px] border border-white/85 px-7 py-6 backdrop-blur-md md:flex-row md:items-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(212, 239, 250, 0.88) 0%, rgba(154, 210, 233, 0.82) 100%)",
            boxShadow:
              "0 12px 30px rgba(16, 78, 98, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
          }}
        >
          <div className="flex max-w-[440px] flex-col gap-2">
            <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#316273]">
              A LITTLE STRONGER. EVERY DAY.
            </p>
            <h2 className="text-[30px] font-bold leading-tight tracking-tight text-[#144456] sm:text-[33px]">
              Small steps. Lasting progress.
            </h2>
            <p className="mt-0.5 text-xs leading-relaxed text-[#29596B]">
              You&apos;ve shown up for 12 days — movement and recovery included.
              <br />
              Rest is part of your routine, not a break from it.
            </p>

            {/* Tombol Glossy "View my plan →" */}
            <button
              type="button"
              onClick={() => triggerNav("workout")}
              className="relative mt-2 flex h-[36px] w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[8px] border border-[#147FA8] px-5 text-xs font-semibold text-white shadow-[0_3px_8px_rgba(20,125,170,0.28),inset_0_1px_1px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, #8CE0FA 0%, #39B0DF 48%, #158CBF 52%, #43B7E2 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-1 top-0.5 h-[44%] rounded-t-[6px] bg-gradient-to-b from-white/60 to-transparent"
              />
              <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,60,90,0.35)]">
                View my plan →
              </span>
            </button>
          </div>

          {/* Kanan: Maskot Angkat Barbel + Kapsul Putih "12-day streak" */}
          <div className="relative mr-4 flex h-[135px] w-[220px] shrink-0 items-center justify-center self-center md:self-auto">
            {/* Kapsul Putih Melayang di Atas Barbel */}
            <div className="absolute -top-6 z-20 rounded-full border border-white bg-white/95 px-6 py-2 text-center shadow-[0_6px_18px_rgba(16,80,102,0.16)]">
              <p className="text-[15px] font-bold leading-tight text-[#144456]">
                12-day streak
              </p>
              <p className="text-[10px] font-medium text-[#4D7786]">
                Recovery counts, too
              </p>
            </div>

            {/* Gambar Maskot Angkat Barbel */}
            <div className="mt-8">
              <BarbellMascot className="h-[155px] w-auto" />
            </div>
          </div>
        </section>

        {/* ================= 3. YOUR ACTIVITY + WEEKLY CONSISTENCY ================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_275px]">
          
          {/* Kiri: Your activity (Grid 28 Hari) */}
          <section className={`${whiteAeroCard} flex flex-col justify-between gap-3 p-6`}>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold text-[#144659]">
                  Your activity
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#557D8C]">
                  APR 27 – MAY 24, 2026
                </p>
              </div>
              <p className="mt-1 text-xs text-[#3F6B7B]">
                Every green or blue day is a step forward.
              </p>

              {/* Header Hari & Grid 28 Sel */}
              <div className="mt-4 grid grid-cols-7 gap-2.5">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                  <p
                    key={d}
                    className="pb-0.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#4D7786]"
                  >
                    {d}
                  </p>
                ))}
                {DAYS.map((x, idx) => (
                  <DayCell key={`${x.d}-${idx}`} d={x.d} s={x.s} />
                ))}
              </div>
            </div>

            {/* Legend & Catatan Bawah */}
            <div className="mt-2">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-2 text-[11px] font-medium text-[#356373]">
                <span className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-[4px] border border-[#BBD9AC]"
                    style={{
                      background: "linear-gradient(180deg, #F4FBEF 0%, #DFEFD2 100%)",
                    }}
                  />
                  Workout
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-[4px] border border-[#3495C6]"
                    style={{
                      background:
                        "linear-gradient(180deg, #9EE0FA 0%, #34A0D8 100%)",
                    }}
                  />
                  Rest day
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-[4px] border border-[#B2C7D2]"
                    style={{
                      background: "linear-gradient(180deg, #DCE7EE 0%, #C6D6E0 100%)",
                    }}
                  />
                  Missed
                </span>
              </div>

              <p className="mt-2.5 text-[11px] text-[#4D7786]">
                Planned recovery keeps your streak alive.
              </p>
            </div>
          </section>

          {/* Kanan: Weekly consistency */}
          <section className={`${whiteAeroCard} flex flex-col justify-between gap-3 p-6`}>
            <div>
              <h2 className="text-[17px] font-bold text-[#144659]">
                Weekly consistency
              </h2>
              <p className="mt-0.5 text-[11px] text-[#557D8C]">
                May 18–24, 2026
              </p>

              {/* 100% & Lingkaran 7/7 */}
              <div className="mt-5 flex items-center justify-between">
                <p className="text-[32px] font-bold leading-none text-[#144659]">
                  {WEEK_PCT}%
                </p>
                <span
                  className="flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#CBE4B9] text-xs font-bold text-[#2B5A38] shadow-inner"
                  style={{
                    background:
                      "linear-gradient(180deg, #F4FBEF 0%, #E0F1D4 100%)",
                  }}
                >
                  {WEEK_DONE} / 7
                </span>
              </div>

              {/* Progress Bar Hijau Lembut */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#EBF3F6] p-[1px]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${WEEK_PCT}%`,
                    background:
                      "linear-gradient(90deg, #D5ECC6 0%, #EDEFC8 100%)",
                  }}
                />
              </div>

              <p className="mt-3 text-xs font-semibold text-[#1E4F61]">
                All planned days, completed.
              </p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#4D7786]">
                {WEEK_WORKOUTS} workouts + {WEEK_REST} recovery days
                <br />A balanced week is a consistent week.
              </p>
            </div>

            {/* Kotak Info Bawah dengan Maskot Duduk */}
            <div
              className="mt-2 flex items-center gap-2.5 rounded-[11px] border border-[#CBE4F0] p-2.5"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #E1F2FA 100%)",
              }}
            >
              <MiniMascot className="h-9 w-9 shrink-0" />
              <p className="text-[10px] leading-snug font-medium text-[#2F5E70]">
                Rest days are planned recovery. They never break your streak.
              </p>
            </div>
          </section>
        </div>

        {/* ================= 4. MILESTONES ("Little wins, big momentum") ================= */}
        <section className={`${whiteAeroCard} flex flex-col gap-4 p-6`}>
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#144659]">
              Little wins, big momentum
            </h2>
            <p className="text-[11px] font-medium text-[#557D8C]">
              {unlocked} of {MILESTONES.length} milestones unlocked
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {MILESTONES.map((m) => (
              <div
                key={m.title}
                className={`flex items-center gap-4 rounded-[12px] border p-4 transition ${
                  m.locked
                    ? "border-[#DCE8EE] bg-[#F2F7FA]/80 opacity-65"
                    : "border-[#96CBE0] shadow-[0_3px_10px_rgba(20,90,115,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                }`}
                style={
                  !m.locked
                    ? {
                        background:
                          "linear-gradient(180deg, #FFFFFF 0%, #E2F2FA 100%)",
                      }
                    : undefined
                }
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-bold ${
                    m.locked
                      ? "border-[#D5E2E8] bg-[#E8F0F4] text-[#7A98A6]"
                      : "border-[#C5E2B2] text-[#245565] shadow-inner"
                  }`}
                  style={
                    !m.locked
                      ? {
                          background:
                            "linear-gradient(180deg, #F3FAEC 0%, #DCEFD0 100%)",
                        }
                      : undefined
                  }
                >
                  {m.big}
                </span>
                <div>
                  <p className="text-[14px] font-bold text-[#17485B]">
                    {m.title}
                  </p>
                  <p className="mt-0.5 text-[10.5px] text-[#4D7786]">{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 5. YOUR WEEK, IN BALANCE ================= */}
        <section className="flex flex-col gap-3.5">
          {/* Bar Judul Putih Kaca */}
          <div className="flex items-center justify-between rounded-[10px] border border-[#6BA5BD]/80 bg-[#F7FCFE]/95 px-4 py-2 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#144659]">
              Your week, in balance
            </h2>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#557D8C]">
              MAY 18–24, 2026
            </p>
          </div>

          {/* 3 Kartu Ringkasan Bawah */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Workouts */}
            <div className={`${whiteAeroCard} flex flex-col justify-between gap-1.5 p-5`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#3F6B7B]">Workouts</p>
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#CBE6D8] bg-[#E6F5EC] text-[#2B7A58]">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6.5 6.5 11 11" />
                    <path d="m21 21-1-1M3 3l1 1m14 18 4-4M2 6l4-4m-3 8 7-7m4 18 7-7" />
                  </svg>
                </span>
              </div>
              <p className="text-[26px] font-bold leading-tight text-[#144659]">
                {WEEK_WORKOUTS} / 4
              </p>
              <p className="text-[10.5px] text-[#4D7786]">
                Workouts completed · {WEEK_REST} recovery days
              </p>
            </div>

            {/* Spending */}
            <div className={`${whiteAeroCard} flex flex-col justify-between gap-1.5 p-5`}>
              <p className="text-xs font-medium text-[#3F6B7B]">Spending</p>
              <p className="text-[26px] font-bold leading-tight text-[#144659]">
                $41.25
              </p>
              <p className="text-[10.5px] text-[#4D7786]">
                $165 of $250 monthly budget used
              </p>
            </div>

            {/* Sleep */}
            <div className={`${whiteAeroCard} flex flex-col justify-between gap-1.5 p-5`}>
              <p className="text-xs font-medium text-[#3F6B7B]">Sleep</p>
              <p className="text-[26px] font-bold leading-tight text-[#144659]">
                7h 42m
              </p>
              <p className="text-[10.5px] text-[#4D7786]">
                Average per night · ↑ 32 min
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}