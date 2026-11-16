"use client";
import React, { useEffect, useState } from "react";

/* ---------- Data Template & Jadwal (Sesuai Desain Figma) ---------- */
const TEMPLATES = [
  {
    name: "Upper Body",
    minutes: 45,
    focus: "Chest, shoulders & arms",
    exercises: [
      ["Bench press", "3 × 10 reps"],
      ["Dumbbell shoulder press", "3 × 10 reps"],
      ["Lateral raises", "3 × 12 reps"],
      ["Triceps pushdown", "3 × 12 reps"],
    ],
  },
  {
    name: "Lower Body",
    minutes: 60,
    focus: "Legs & glutes",
    exercises: [
      ["Barbell squat", "4 × 8 reps"],
      ["Romanian deadlift", "3 × 10 reps"],
      ["Walking lunges", "3 × 12 reps"],
      ["Standing calf raises", "3 × 15 reps"],
    ],
  },
  {
    name: "Pull Day",
    minutes: 45,
    focus: "Back & biceps",
    exercises: [
      ["Lat pulldown", "3 × 10 reps"],
      ["Seated cable row", "3 × 10 reps"],
      ["Face pulls", "3 × 12 reps"],
      ["Dumbbell curls", "3 × 12 reps"],
    ],
  },
];

const WEEK = [
  { day: "MON", date: 18, plan: "Upper Body" },
  { day: "TUE", date: 19, plan: "Rest" },
  { day: "WED", date: 20, plan: "Lower Body" },
  { day: "THU", date: 21, plan: "Rest" },
  { day: "FRI", date: 22, plan: "Pull Day" },
  { day: "SAT", date: 23, plan: "Push Day" },
  { day: "SUN", date: 24, plan: "Rest" },
];

// Mei 2026: 35 sel kalender dimulai dari Senin, 27 April
const PLAN_BY_WEEKDAY = {
  0: "Upper Body", // MON
  2: "Lower Body", // WED
  4: "Pull Day",   // FRI
  5: "Push Day",   // SAT
};

const CALENDAR = Array.from({ length: 35 }, (_, i) => {
  const offset = i - 4; // Apr 27 = index 0 -> May 1 = index 4
  const inMonth = offset >= 0 && offset < 31;
  const prevMonthDays = [27, 28, 29, 30];
  const date = inMonth ? offset + 1 : prevMonthDays[i] ?? 0;
  const weekday = i % 7;
  return {
    date,
    inMonth,
    plan: inMonth ? PLAN_BY_WEEKDAY[weekday] : undefined,
    today: inMonth && date === 18,
  };
});

/* ---------- Ikon SVG ---------- */
function DumbbellIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2580A8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1M3 3l1 1m14 18 4-4M2 6l4-4m-3 8 7-7m4 18 7-7" />
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B7A3E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13" cy="4.5" r="1.5" />
      <path d="m10 21 1.5-6L9 12.5l1-4 3.5 2.5 2.5.5" />
      <path d="M9 12.5 7 15" />
      <path d="m13 15 2 6" />
    </svg>
  );
}

/* ---------- Komponen Utama Workout Planner ---------- */
export default function WorkoutPlanner({ onNavigate, onViewExercises }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [session, setSession] = useState(TEMPLATES[0]);
  const [totalMin, setTotalMin] = useState(45);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [running, setRunning] = useState(false);

  // Fungsi navigasi menuju halaman ViewExercise.jsx
  const goToExerciseList = () => {
    if (onViewExercises) {
      onViewExercises();
    } else if (onNavigate) {
      onNavigate("view-exercise");
    }
    window.location.hash = "view-exercise";
    window.dispatchEvent(
      new CustomEvent("nexora-navigate", { detail: "view-exercise" })
    );
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  function pickDuration(min) {
    setRunning(false);
    setTotalMin(min);
    setSecondsLeft(min * 60);
  }

  function useTemplate(t) {
    setSession(t);
    pickDuration(t.minutes);
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const progress = 1 - secondsLeft / (totalMin * 60);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed px-4 pt-7 pb-16 font-[Inter,system-ui,sans-serif] text-[#17485B] select-none md:px-10"
      style={{
        backgroundImage:
          "url('/BG-barbel.svg'), url('/bg-frutiger.png'), linear-gradient(180deg, #4cc3f7 0%, #a8e8ff 52%, #6ec732 100%)",
      }}
    >
      <main className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-col gap-6">
        
        {/* ================= 1. HEADER ================= */}
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#144456]">
              Workout planner
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-[#2F6173]">
              Make time for movement. Build a routine that feels good.
            </p>
          </div>
          <p className="text-xs font-semibold text-[#245565]">
            May 18 – 24, 2026
          </p>
        </div>

        {/* ================= 2. YOUR WEEK AT A GLANCE ================= */}
        <section
          className="flex flex-col gap-3.5 rounded-[18px] border border-white/85 px-6 py-5 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(214, 240, 250, 0.84) 0%, rgba(172, 220, 238, 0.78) 100%)",
            boxShadow:
              "0 12px 30px rgba(16, 78, 98, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
          }}
        >
          <h2 className="text-[17px] font-bold text-[#17495B]">
            Your week at a glance
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {WEEK.map((d, i) => {
              const active = i === selectedDay;
              const rest = d.plan === "Rest";

              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setSelectedDay(i)}
                  className={`relative flex cursor-pointer flex-col items-center justify-between overflow-hidden rounded-[11px] border p-2.5 transition-all ${
                    active
                      ? "border-[#2D8EBC] text-[#103F52] shadow-[0_4px_12px_rgba(25,130,180,0.24),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                      : "border-white/85 text-[#225264] hover:brightness-105"
                  }`}
                  style={{
                    background: active
                      ? "linear-gradient(180deg, #B5E5FA 0%, #7CC7EC 48%, #47A7DC 52%, #7CC9EC 100%)"
                      : "linear-gradient(180deg, rgba(244,251,254,0.9) 0%, rgba(210,235,244,0.78) 100%)",
                  }}
                >
                  <span className="text-[10px] font-semibold tracking-wider text-[#356475]">
                    {d.day}
                  </span>
                  <span className="my-1 text-[19px] font-bold leading-none text-[#164658]">
                    {d.date}
                  </span>

                  {/* Pill Nama Latihan / Rest */}
                  <span
                    className={`mt-1 w-full rounded-[5px] border py-1 text-center text-[10px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ${
                      rest
                        ? "border-[#BDD7E2] bg-gradient-to-b from-[#F7FCFE] to-[#DCECF2] text-[#3F6B7B]"
                        : "border-[#AECB9F] bg-gradient-to-b from-[#F4FBEF] to-[#DCEFD0] text-[#2A583C]"
                    }`}
                  >
                    {d.plan}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= 3. TEMPLATES + SESSION TIMER ================= */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1fr_315px]">
          
          {/* Kolom Kiri: Choose your template */}
          <section className="flex flex-col">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-[18px] font-bold text-[#154456]">
                Choose your template
              </h2>

              {/* Tombol Akses Cepat ke Halaman ViewExercise.jsx */}
              <button
                type="button"
                onClick={goToExerciseList}
                className="cursor-pointer rounded-full border border-white/90 bg-white/80 px-3.5 py-1 text-xs font-semibold text-[#167CA5] shadow-2xs backdrop-blur-xs transition hover:bg-white active:scale-95"
              >
                View exercise library →
              </button>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
              {TEMPLATES.map((t) => (
                <article
                  key={t.name}
                  className="flex flex-col justify-between rounded-[18px] border border-white/95 bg-[#F7FCFE]/95 p-5 shadow-[0_10px_24px_rgba(18,80,102,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                >
                  <div>
                    {/* Ikon Dumbbell di Kotak Biru Muda */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#CBE6F2] bg-[#E3F3FA]">
                      <DumbbellIcon />
                    </div>

                    <h3 className="mt-3.5 text-[19px] font-bold text-[#17485B]">
                      {t.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-medium text-[#4F7988]">
                      {t.minutes} min · {t.focus}
                    </p>

                    {/* Daftar Gerakan dengan Garis Pemisah */}
                    <ul className="mt-3.5 divide-y divide-[#E1EEF3]">
                      {t.exercises.map(([n, r]) => (
                        <li
                          key={n}
                          onClick={goToExerciseList}
                          title="Click to view exercise details"
                          className="cursor-pointer py-2 first:pt-0 last:pb-0 transition-colors hover:text-[#147FA8]"
                        >
                          <p className="text-[12.5px] font-semibold text-[#1E4F61]">
                            {n}
                          </p>
                          <p className="text-[10.5px] text-[#557E8D]">{r}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tombol Glossy "Use template →" */}
                  <button
                    type="button"
                    onClick={() => useTemplate(t)}
                    className="relative mt-5 flex h-[36px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[8px] border border-[#147FA8] text-xs font-semibold text-white shadow-[0_3px_8px_rgba(20,125,170,0.28),inset_0_1px_1px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95"
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
                      Use template →
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Kolom Kanan: Session timer */}
          <aside
            className="flex flex-col items-center justify-between rounded-[18px] border border-white/85 p-5 backdrop-blur-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(214, 240, 250, 0.86) 0%, rgba(164, 214, 235, 0.82) 100%)",
              boxShadow:
                "0 12px 30px rgba(16, 78, 98, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
            }}
          >
            <div className="w-full">
              <h2 className="text-[18px] font-bold text-[#17495B]">
                Session timer
              </h2>
              <p className="mt-2 text-center text-[11px] font-medium text-[#346374]">
                {session.name} · {running ? "In progress" : "Ready when you are"}
              </p>
            </div>

            {/* Bola Kaca 3D Timer (Horizon Split Frutiger Aero) */}
            <div
              className="relative my-4 flex h-[196px] w-[196px] items-center justify-center rounded-full border-2 border-white/90 shadow-[0_10px_25px_rgba(20,105,145,0.25),inset_0_2px_6px_rgba(255,255,255,0.95)]"
              style={{
                background:
                  "linear-gradient(180deg, #C9ECFA 0%, #83CBEB 49%, #3FA0D4 51%, #6BC0E8 100%)",
              }}
            >
              {/* Ring Progress Putih */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.85"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 95}
                  strokeDashoffset={2 * Math.PI * 95 * (1 - progress)}
                />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-[42px] font-bold leading-none tracking-tight tabular-nums text-[#154456]">
                  {mm}:{ss}
                </p>
                <p className="mt-2 text-[9.5px] font-semibold uppercase tracking-wider text-[#1E5368]">
                  MINUTES TO MOVE
                </p>
              </div>
            </div>

            {/* Grid 2x2 Tombol Kontrol Timer */}
            <div className="grid w-full grid-cols-2 gap-2.5">
              {[45, 60].map((m) => {
                const isSelected = totalMin === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => pickDuration(m)}
                    className={`relative h-[36px] cursor-pointer overflow-hidden rounded-[8px] border text-xs font-semibold transition active:scale-95 ${
                      isSelected
                        ? "border-[#147FA8] text-white shadow-[0_2px_6px_rgba(20,125,170,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                        : "border-[#8EBCD0] text-[#1D4E60] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]"
                    }`}
                    style={{
                      background: isSelected
                        ? "linear-gradient(180deg, #8CE0FA 0%, #39B0DF 48%, #158CBF 52%, #43B7E2 100%)"
                        : "linear-gradient(180deg, #F7FCFE 0%, #DCEEF5 48%, #C6E2EE 52%, #E5F4FA 100%)",
                    }}
                  >
                    {m} min
                  </button>
                );
              })}

              {/* Tombol Start */}
              <button
                type="button"
                onClick={() => setRunning(true)}
                disabled={secondsLeft === 0}
                className="relative h-[36px] cursor-pointer overflow-hidden rounded-[8px] border border-[#147FA8] text-xs font-semibold text-white shadow-[0_2px_6px_rgba(20,125,170,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95 disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(180deg, #8CE0FA 0%, #39B0DF 48%, #158CBF 52%, #43B7E2 100%)",
                }}
              >
                ▶ Start
              </button>

              {/* Tombol Pause */}
              <button
                type="button"
                onClick={() => setRunning(false)}
                className="relative h-[36px] cursor-pointer overflow-hidden rounded-[8px] border border-[#8EBCD0] text-xs font-semibold text-[#1D4E60] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(180deg, #F7FCFE 0%, #DCEEF5 48%, #C6E2EE 52%, #E5F4FA 100%)",
                }}
              >
                ❚❚ Pause
              </button>
            </div>
          </aside>
        </div>

        {/* ================= 4. RECOVERY BANNER ================= */}
        <section
          className="flex items-center justify-between rounded-[14px] border border-white/90 px-6 py-3.5 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(90deg, rgba(225, 244, 210, 0.9) 0%, rgba(242, 251, 232, 0.92) 55%, rgba(220, 241, 204, 0.9) 100%)",
            boxShadow:
              "0 8px 22px rgba(30, 90, 50, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
          }}
        >
          <div className="flex items-center gap-3.5">
            <WalkIcon />
            <div>
              <p className="text-[10.5px] font-medium text-[#3D6D58]">
                A little recovery goes a long way
              </p>
              <p className="text-[14px] font-semibold text-[#17485B]">
                Finish with a 10 min treadmill walk.
              </p>
            </div>
          </div>
          <p className="text-[15px] font-bold text-[#17485B]">10 min</p>
        </section>

        {/* ================= 5. YOUR MOVEMENT CALENDAR ================= */}
        <section
          className="flex flex-col gap-4 rounded-[18px] border border-white/85 p-6 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(215, 240, 250, 0.84) 0%, rgba(188, 226, 236, 0.78) 55%, rgba(176, 220, 206, 0.8) 100%)",
            boxShadow:
              "0 14px 34px rgba(16, 78, 98, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#17495B]">
              Your movement calendar
            </h2>
            <div className="flex items-center gap-3 text-xs font-semibold text-[#2E5E70]">
              <span>‹</span>
              <span>May 2026</span>
              <span>›</span>
            </div>
          </div>

          {/* Nama Hari */}
          <div className="mt-1 grid grid-cols-7 gap-2 text-center">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
              <p
                key={d}
                className="text-[10px] font-bold uppercase tracking-wider text-[#3B6878]"
              >
                {d}
              </p>
            ))}
          </div>

          {/* 35 Kotak Tanggal */}
          <div className="grid grid-cols-7 gap-2.5">
            {CALENDAR.map((c, i) => (
              <div
                key={i}
                className={`flex min-h-[66px] flex-col justify-between rounded-[9px] border p-2 ${
                  c.today
                    ? "border-[#2B8FBE] text-[#12465B] shadow-[0_3px_10px_rgba(25,130,180,0.22),inset_0_1px_1px_rgba(255,255,255,0.85)]"
                    : c.inMonth
                    ? "border-white/75 text-[#235363]"
                    : "border-white/45 bg-white/35 text-[#759AA8]"
                }`}
                style={
                  c.today
                    ? {
                        background:
                          "linear-gradient(180deg, #A3DFF8 0%, #5AB8E5 100%)",
                      }
                    : c.inMonth
                    ? {
                        background:
                          "linear-gradient(180deg, rgba(246,252,255,0.82) 0%, rgba(214,237,245,0.68) 100%)",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.85)",
                      }
                    : undefined
                }
              >
                <span className="text-[10px] font-bold leading-none">
                  {c.date}
                  {c.today ? " · TODAY" : ""}
                </span>

                {c.plan && (
                  <span
                    className="mt-auto flex h-[21px] w-full items-center justify-center rounded-[5px] border border-[#AECB9F] px-1 text-center text-[9.5px] font-semibold text-[#2A583C] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                    style={{
                      background:
                        "linear-gradient(180deg, #F4FBEF 0%, #DCEFD0 100%)",
                    }}
                  >
                    <span className="truncate">{c.plan}</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="mt-1 text-[11px] font-medium text-[#356373]">
            4 sessions a week · Rest on Tuesday, Thursday &amp; Sunday
          </p>
        </section>
      </main>
    </div>
  );
}
