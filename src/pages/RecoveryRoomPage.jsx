"use client";
import React, { useEffect, useState } from "react";

/* ---------- Data Tidur (Menit Tidur per Malam) ---------- */
const GOAL_MIN = 8 * 60; // 480 menit (8 jam)
const SLEEP = [
  { day: "Tue 12", min: 6 * 60 + 36 },
  { day: "Wed 13", min: 7 * 60 + 12 },
  { day: "Thu 14", min: 7 * 60 },
  { day: "Fri 15", min: 7 * 60 + 48 },
  { day: "Sat 16", min: 7 * 60 + 18 },
  { day: "Sun 17", min: 8 * 60 + 6 },
  { day: "Mon 18", min: 7 * 60 + 42 },
];

const fmtHM = (min) =>
  `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}m`;
const fmtMS = (sec) =>
  `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

const AVG = Math.round(SLEEP.reduce((a, s) => a + s.min, 0) / SLEEP.length);
const NIGHTS_AT_GOAL = SLEEP.filter((s) => s.min >= GOAL_MIN).length;

/* ---------- Data Soundtrack ---------- */
const SOUNDTRACKS = [
  {
    id: "piano",
    name: "Piano",
    meta: "Soft keys · 12 tracks · 48 min",
    title: "Clair de lune",
    artist: "Claude Debussy · Suite bergamasque",
    duration: 303, // 5:03
  },
  {
    id: "classical",
    name: "Classical",
    meta: "Gentle strings · 10 tracks · 52 min",
    title: "Air on the G String",
    artist: "Johann Sebastian Bach · Orchestral Suite No. 3",
    duration: 320, // 5:20
  },
];

const CHART_H = 126; // Tinggi area bar (px)
const CHART_MAX_MIN = 8.5 * 60;

/* ---------- Komponen Cover Album Musik ---------- */
function Cover({ className = "" }) {
  const [src, setSrc] = useState("/CalmPianoAlbumArtwork.png");
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[10px] border border-white/85 shadow-sm ${className}`}
      style={{
        background:
          "radial-gradient(circle at 75% 25%, #fff9c4 0%, #80deea 38%, #26a69a 72%, #1b5e20 100%)",
      }}
    >
      {!failed && (
        <img
          src={src}
          alt="Calm soundtrack cover"
          className="h-full w-full object-cover"
          onError={() => {
            if (src !== "/calm-cover.jpg") {
              setSrc("/calm-cover.jpg");
            } else {
              setFailed(true);
            }
          }}
        />
      )}
    </div>
  );
}

/* ---------- Komponen Maskot Tidur 3D Glossy (Gambar + Fallback SVG Persis Desain) ---------- */
function SleepingMascot() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Kapsul Zzz di Kanan Atas Maskot */}
      <span className="absolute -top-3 right-1 z-20 rounded-full border border-white bg-white/90 px-3.5 py-1 text-[11px] font-semibold text-[#3C6A78] shadow-[0_3px_10px_rgba(20,85,105,0.12)]">
        Zzz
      </span>

      {!imgFailed ? (
        <img
          src="/mascor-sleep.svg"
          alt="Sleeping Nexora Mascot"
          className="h-[130px] w-auto object-contain drop-shadow-[0_10px_16px_rgba(15,85,105,0.25)]"
        />
      ) : (
        /* Vektor 3D Glossy Maskot Tidur di atas Matras (Tampil otomatis jika /sleep-mascot.png belum ada) */
        <svg
          viewBox="0 0 240 135"
          className="h-[130px] w-[225px] overflow-visible drop-shadow-[0_10px_16px_rgba(15,85,105,0.22)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="matGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4F2E7" />
              <stop offset="50%" stopColor="#ECFBF4" />
              <stop offset="100%" stopColor="#C5EADF" />
            </linearGradient>
            <radialGradient id="sleepBodyGrad" cx="35%" cy="25%" r="70%">
              <stop offset="0%" stopColor="#F2FFCC" />
              <stop offset="28%" stopColor="#8CF2C2" />
              <stop offset="65%" stopColor="#14B8C4" />
              <stop offset="100%" stopColor="#097994" />
            </radialGradient>
            <linearGradient id="sleepGloss" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Matras Tidur Miring */}
          <polygon
            points="28,96 202,96 224,116 12,116"
            fill="url(#matGrad)"
            stroke="#FFFFFF"
            strokeWidth="2"
             strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="116"
            x2="222"
            y2="116"
            stroke="#8CC7B8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Bayangan Badan di Atas Matras */}
          <ellipse cx="122" cy="103" rx="68" ry="8" fill="rgba(12, 90, 108, 0.25)" />

          {/* Badan Melingkar Tidur */}
          <ellipse
            cx="138"
            cy="78"
            rx="44"
            ry="27"
            transform="rotate(-6 138 78)"
            fill="url(#sleepBodyGrad)"
            stroke="#08758F"
            strokeWidth="2.5"
          />
          {/* Kilau Badan */}
          <ellipse
            cx="134"
            cy="64"
            rx="28"
            ry="12"
            transform="rotate(-6 134 64)"
            fill="url(#sleepGloss)"
          />

          {/* Kaki Belakang Mungil */}
          <ellipse
            cx="176"
            cy="90"
            rx="16"
            ry="11"
            transform="rotate(12 176 90)"
            fill="url(#sleepBodyGrad)"
            stroke="#08758F"
            strokeWidth="2.2"
          />

          {/* Tangan Menumpu Pipi */}
          <ellipse
            cx="108"
            cy="94"
            rx="18"
            ry="9"
            transform="rotate(-14 108 94)"
            fill="url(#sleepBodyGrad)"
            stroke="#08758F"
            strokeWidth="2.2"
          />

          {/* Kepala Maskot */}
          <circle
            cx="78"
            cy="68"
            r="32"
            fill="url(#sleepBodyGrad)"
            stroke="#08758F"
            strokeWidth="2.5"
          />
          {/* Kilau Kepala */}
          <ellipse
            cx="72"
            cy="52"
            rx="19"
            ry="12"
            transform="rotate(-15 72 52)"
            fill="url(#sleepGloss)"
          />

          {/* Mata Terpejam Damai */}
          <path
            d="M 62 72 Q 68 77 74 72"
            fill="none"
            stroke="#075B70"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M 80 74 Q 86 79 92 74"
            fill="none"
            stroke="#075B70"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

/* ---------- Halaman Utama Recovery Room ---------- */
export default function RecoveryRoom() {
  // State Music Player
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(102); // 1:42
  const [volume, setVolume] = useState(65);
  const track = SOUNDTRACKS[trackIdx];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setPos((p) => {
        if (p + 1 >= track.duration) {
          setPlaying(false);
          return track.duration;
        }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, track.duration]);

  function pickTrack(i) {
    setTrackIdx(i);
    setPos(0);
    setPlaying(true);
  }

  // State Wind-down Timer
  const [windMin, setWindMin] = useState(15);
  const [windLeft, setWindLeft] = useState(15 * 60);
  const [windRunning, setWindRunning] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (!windRunning) return;
    const id = setInterval(() => {
      setWindLeft((s) => {
        if (s <= 1) {
          setWindRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [windRunning]);

  function pickWind(m) {
    setWindRunning(false);
    setWindMin(m);
    setWindLeft(m * 60);
  }

  const goalLineBottom = (GOAL_MIN / CHART_MAX_MIN) * CHART_H;
  const trackProgressPct = Math.min(100, (pos / track.duration) * 100);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed px-4 pt-7 pb-16 font-[Inter,system-ui,sans-serif] text-[#17485B] select-none md:px-10"
      style={{
        backgroundImage:
          "url('/BG-barbel.svg'), url('/bg-frutiger.png'), linear-gradient(180deg, #4cc3f7 0%, #a8e8ff 52%, #6ec732 100%)",
      }}
    >
      <main className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-col gap-5">
        
        {/* ================= 1. HEADER ================= */}
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#144456]">
              Recovery room
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-[#2F6173]">
              A softer ending. A stronger tomorrow.
            </p>
          </div>
          <p className="text-xs font-semibold text-[#245565]">
            May 12 – 18, 2026
          </p>
        </div>

        {/* ================= 2. HERO PANEL (MASkOT TIDUR & SLEEP SCORE) ================= */}
        <section
          className="grid grid-cols-1 items-center gap-6 rounded-[18px] border border-white/85 px-6 py-5 backdrop-blur-md lg:grid-cols-[1.05fr_1.35fr_0.95fr]"
          style={{
            background:
              "linear-gradient(180deg, rgba(214, 240, 250, 0.86) 0%, rgba(170, 218, 236, 0.8) 100%)",
            boxShadow:
              "0 12px 30px rgba(16, 78, 98, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
          }}
        >
          {/* Kiri: Let the day drift away */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#3A6878]">
              REST IS PART OF THE ROUTINE
            </p>
            <h2 className="text-[24px] font-bold leading-tight text-[#154456]">
              Let the day drift away.
            </h2>
            <p className="max-w-[245px] text-xs leading-relaxed text-[#2F5E70]">
              Breathe out, slow down, and give yourself room to recover.
            </p>
            <span
              className="mt-1 w-fit rounded-[6px] border border-[#AECB9F] px-3 py-1 text-[10px] font-semibold text-[#2A583C] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
              style={{
                background: "linear-gradient(180deg, #F4FBEF 0%, #DCEFD0 100%)",
              }}
            >
              ↗ Good sleep quality
            </span>
          </div>

          {/* Tengah: Maskot Tidur + Bola Kaca Sleep Score 86/100 */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:flex-nowrap">
            <SleepingMascot />

            {/* Bola Kaca 50/50 Horizon Split */}
            <div
              className="relative flex h-[148px] w-[148px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 shadow-[0_10px_24px_rgba(20,105,145,0.22),inset_0_2px_5px_rgba(255,255,255,0.95)]"
              style={{
                background:
                  "linear-gradient(180deg, #CBEBFA 0%, #86CBEB 49%, #44A4D6 51%, #74C4EA 100%)",
              }}
            >
              <div className="relative z-10 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#265A6E]">
                  SLEEP SCORE
                </p>
                <p className="mt-0.5 text-[28px] font-bold leading-tight text-[#144456]">
                  86 <span className="text-[18px] font-semibold">/ 100</span>
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-[#1F5368]">
                  Rested &amp; recharged
                </p>
              </div>
            </div>
          </div>

          {/* Kanan: Sleep, beautifully. 7h 42m */}
          <div className="flex flex-col gap-1 lg:pl-4">
            <h3 className="text-[17px] font-bold text-[#154456]">
              Sleep, beautifully.
            </h3>
            <p className="text-[32px] font-bold leading-tight text-[#154456]">
              7h 42m
            </p>
            <p className="text-[10.5px] font-medium text-[#3B6878]">
              Last night · 18 min to your 8h goal
            </p>

            <div className="mt-2.5 flex gap-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#497585]">
                  BEDTIME
                </p>
                <p className="mt-0.5 text-[13px] font-semibold text-[#154456]">
                  11:00 pm
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#497585]">
                  WAKE TIME
                </p>
                <p className="mt-0.5 text-[13px] font-semibold text-[#154456]">
                  6:42 am
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. YOUR WEEK OF REST ================= */}
        <section
          className="grid grid-cols-1 gap-6 rounded-[18px] border border-white/95 bg-[#F6FCFE]/95 p-6 shadow-[0_12px_28px_rgba(16,78,98,0.14),inset_0_1px_1px_rgba(255,255,255,0.95)] lg:grid-cols-[1fr_230px]"
        >
          {/* Kiri: Bar Chart Tidur Mingguan */}
          <div className="flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#17495B]">
                Your week of rest
              </h2>
              <p className="text-[9.5px] font-semibold uppercase tracking-wider text-[#4D7786]">
                12 – 18 MAY · HOURS ASLEEP
              </p>
            </div>

            {/* Label Jam di Atas Batang */}
            <div className="ml-8 grid grid-cols-7 gap-3 text-center text-[10.5px] font-medium text-[#356373]">
              {SLEEP.map((s) => (
                <span key={s.day}>{fmtHM(s.min)}</span>
              ))}
            </div>

            {/* Area Grafik Batang + Garis 8h */}
            <div className="relative ml-8" style={{ height: CHART_H }}>
              <span
                className="absolute -left-8 text-[10.5px] font-medium text-[#4D7786]"
                style={{ bottom: goalLineBottom - 7 }}
              >
                8h
              </span>
              <span className="absolute -left-8 bottom-0 text-[10.5px] font-medium text-[#4D7786]">
                0h
              </span>

              {/* Garis Target 8 Jam */}
              <div
                className="absolute inset-x-0 z-10 border-t border-[#7FA8B8]/60"
                style={{ bottom: goalLineBottom }}
              />

              {/* 7 Batang Tidur */}
              <div className="absolute inset-0 grid grid-cols-7 items-end gap-3">
                {SLEEP.map((s, i) => {
                  const isToday = i === SLEEP.length - 1;
                  return (
                    <div key={s.day} className="flex justify-center">
                      <div
                        className="w-10 rounded-[7px] border border-white/80 shadow-xs transition-all sm:w-11"
                        style={{
                          height: (s.min / CHART_MAX_MIN) * CHART_H,
                          background: isToday
                            ? "linear-gradient(180deg, #52C3DF 0%, #2496B8 100%)"
                            : "linear-gradient(180deg, #BCCCEB 0%, #9AB1DF 100%)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Label Hari di Bawah Batang */}
            <div className="ml-8 grid grid-cols-7 gap-3 text-center text-[10.5px] font-medium text-[#356373]">
              {SLEEP.map((s) => (
                <span key={s.day}>{s.day}</span>
              ))}
            </div>

            <p className="mt-1 text-[11px] text-[#3B6878]">
              Aim for 8 hours · A regular bedtime helps your body find its rhythm.
            </p>
          </div>

          {/* Kanan: Weekly Average */}
          <div className="flex flex-col justify-center gap-2 border-t border-[#DFEEF3] pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
            <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#4D7786]">
              WEEKLY AVERAGE
            </p>
            <p className="text-[30px] font-bold leading-none text-[#154456]">
              {fmtHM(AVG)}
            </p>
            <span
              className="mt-1 w-fit rounded-[6px] border border-[#AECB9F] px-2.5 py-1 text-[10px] font-semibold text-[#2A583C]"
              style={{
                background: "linear-gradient(180deg, #F4FBEF 0%, #DCEFD0 100%)",
              }}
            >
              ↗ 32 min from last week
            </span>
            <p className="mt-2 text-xs font-medium text-[#1E4F61]">
              {NIGHTS_AT_GOAL} of 7 nights reached 8h
            </p>
            <p className="text-[11.5px] leading-relaxed text-[#3F6B7B]">
              Try winding down at 10:30 pm for a gentler start tomorrow.
            </p>
          </div>
        </section>

        {/* ================= 4. YOUR MOMENT OF CALM + WIND-DOWN ================= */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1fr_285px]">
          
          {/* Kiri: Nexora Media Player */}
          <section
            className="flex flex-col justify-between gap-4 rounded-[18px] border border-white/85 p-6 backdrop-blur-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(212, 238, 248, 0.82) 0%, rgba(178, 220, 206, 0.78) 100%)",
              boxShadow:
                "0 12px 30px rgba(16, 78, 98, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#17495B]">
                Your moment of calm
              </h2>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#3B6878]">
                NEXORA MEDIA PLAYER
              </p>
            </div>

            {/* Info Lagu Aktif */}
            <div className="flex items-center gap-4">
              <Cover className="h-[64px] w-[64px]" />
              <div className="flex flex-col gap-0.5">
                <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#3B6878]">
                  NOW PLAYING · {track.name.toUpperCase()}
                </p>
                <p className="text-[20px] font-bold leading-tight text-[#144456]">
                  {track.title}
                </p>
                <p className="text-xs font-medium text-[#2F5E70]">
                  {track.artist}
                </p>
                <p className="text-[11px] text-[#3F6B7B]">
                  Let a little quiet in.
                </p>
              </div>
            </div>

            {/* Slider Progress Lagu */}
            <div className="flex flex-col gap-1.5">
              <div className="relative flex items-center">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/80 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#38A8D8] to-[#1D88B8]"
                    style={{ width: `${trackProgressPct}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={track.duration}
                  value={pos}
                  onChange={(e) => setPos(Number(e.target.value))}
                  aria-label="Seek track"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <span
                  className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-[#2799C8] shadow"
                  style={{ left: `${trackProgressPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-medium text-[#2F5E70]">
                <span>{fmtMS(pos)}</span>
                <span>{fmtMS(track.duration)}</span>
              </div>
            </div>

            {/* Deretan Kontrol Musik & Volume (Sesuai Gambar Figma) */}
            <div className="flex flex-wrap items-center gap-4 text-[#2C677C]">
              {/* Shuffle */}
              <button
                type="button"
                aria-label="Shuffle"
                className="cursor-pointer opacity-75 transition hover:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                </svg>
              </button>

              {/* Previous */}
              <button
                type="button"
                onClick={() => setPos(0)}
                aria-label="Previous"
                className="cursor-pointer opacity-80 transition hover:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="19 20 9 12 19 4 19 20" />
                  <line x1="5" y1="19" x2="5" y2="5" />
                </svg>
              </button>

              {/* Tombol Bulat Play / Pause Glossy */}
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white text-sm text-white shadow-[0_4px_10px_rgba(20,120,165,0.3),inset_0_1px_2px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(180deg, #8AE0FA 0%, #35AEDF 50%, #1789BC 100%)",
                }}
              >
                {playing ? "❚❚" : "▶"}
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={() => pickTrack((trackIdx + 1) % SOUNDTRACKS.length)}
                aria-label="Next"
                className="cursor-pointer opacity-80 transition hover:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
              </button>

              {/* Repeat */}
              <button
                type="button"
                onClick={() => setPos(0)}
                aria-label="Repeat"
                className="cursor-pointer opacity-75 transition hover:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m17 2 4 4-4 4" />
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                  <path d="m7 22-4-4 4-4" />
                  <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                </svg>
              </button>

              {/* Pause Small Icon */}
              <button
                type="button"
                onClick={() => setPlaying(false)}
                aria-label="Pause track"
                className="cursor-pointer text-xs font-bold opacity-75 transition hover:opacity-100"
              >
                ❚❚
              </button>

              {/* Volume Control */}
              <div className="ml-2 flex items-center gap-2 text-[11px] font-medium text-[#245565]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>

                <div className="relative flex w-[88px] items-center">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/80">
                    <div
                      className="h-full rounded-full bg-[#299AC8]"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    aria-label="Volume"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <span
                    className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-full border border-white bg-[#299AC8] shadow-2xs"
                    style={{ left: `${volume}%` }}
                  />
                </div>
                <span>{volume}%</span>
              </div>
            </div>

            {/* Pilihan Soundtrack: Piano & Classical */}
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#2F5E70]">
                CHOOSE YOUR SOUNDTRACK
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SOUNDTRACKS.map((t, i) => {
                  const active = i === trackIdx;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => pickTrack(i)}
                      className={`flex cursor-pointer items-center gap-3 rounded-[11px] border p-2.5 text-left transition ${
                        active
                          ? "border-[#38A8D8] bg-white shadow-[0_4px_12px_rgba(20,90,115,0.12)]"
                          : "border-white/90 bg-white/85 hover:bg-white"
                      }`}
                    >
                      <Cover className="h-9 w-9 rounded-[8px]" />
                      <span>
                        <span className="block text-[13px] font-semibold text-[#17485B]">
                          {t.name}
                        </span>
                        <span className="block text-[10px] text-[#527C8B]">
                          {t.meta}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Kanan: Wind-down Card */}
          <section className="flex flex-col justify-between gap-3 rounded-[18px] border border-white/95 bg-[#F6FCFE]/95 p-5 shadow-[0_12px_28px_rgba(16,78,98,0.14),inset_0_1px_1px_rgba(255,255,255,0.95)]">
            <div>
              <h2 className="text-[16px] font-bold text-[#17495B]">Wind-down</h2>
              <p className="mt-0.5 text-[11px] text-[#4C7584]">
                A small pause, just for you.
              </p>
            </div>

            {/* Kotak Timer 15:00 (Horizon Split Gloss) */}
            <div
              className="rounded-[12px] border border-[#96CBE0] py-4 text-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)]"
              style={{
                background:
                  "linear-gradient(180deg, #E3F5FC 0%, #C2E5F4 49%, #A6D7EC 51%, #CBEAF7 100%)",
              }}
            >
              <p className="text-[32px] font-bold leading-none tabular-nums text-[#154456]">
                {fmtMS(windLeft)}
              </p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wider text-[#356373]">
                MINUTES TO UNWIND
              </p>
            </div>

            {/* Tombol Pilihan 5 min | 15 min | 30 min */}
            <div className="grid grid-cols-3 gap-2">
              {[5, 15, 30].map((m) => {
                const active = windMin === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => pickWind(m)}
                    className={`h-[32px] cursor-pointer rounded-[7px] border text-[11px] font-semibold transition active:scale-95 ${
                      active
                        ? "border-[#147FA8] text-white shadow-[0_2px_6px_rgba(20,125,170,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                        : "border-[#9DC3D4] text-[#245565] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]"
                    }`}
                    style={{
                      background: active
                        ? "linear-gradient(180deg, #8CE0FA 0%, #39B0DF 48%, #158CBF 52%, #43B7E2 100%)"
                        : "linear-gradient(180deg, #FFFFFF 0%, #E3F1F7 48%, #CFE6F0 52%, #EAF5FA 100%)",
                    }}
                  >
                    {m} min
                  </button>
                );
              })}
            </div>

            {/* Tombol Start relax timer */}
            <button
              type="button"
              onClick={() => setWindRunning((r) => !r)}
              disabled={windLeft === 0}
              className="relative h-[36px] w-full cursor-pointer overflow-hidden rounded-[8px] border border-[#147FA8] text-xs font-semibold text-white shadow-[0_3px_8px_rgba(20,125,170,0.26),inset_0_1px_1px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95 disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(180deg, #8CE0FA 0%, #39B0DF 48%, #158CBF 52%, #43B7E2 100%)",
              }}
            >
              {windRunning ? "❚❚ Pause relax timer" : "▶ Start relax timer"}
            </button>

            <p className="text-[10.5px] leading-snug text-[#3F6B7B]">
              Settle in. Drop your shoulders. Take one slow breath.
            </p>

            {/* Tombol Log last night's sleep */}
            <button
              type="button"
              onClick={() => setLogged(true)}
              className="relative h-[36px] w-full cursor-pointer overflow-hidden rounded-[8px] border border-[#147FA8] text-xs font-semibold text-white shadow-[0_3px_8px_rgba(20,125,170,0.26),inset_0_1px_1px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, #8CE0FA 0%, #39B0DF 48%, #158CBF 52%, #43B7E2 100%)",
              }}
            >
              {logged ? "✓ Sleep logged (7h 42m)" : "Log last night's sleep"}
            </button>

            <p className="text-[10.5px] text-[#3F6B7B]">
              Your rest matters, every single day.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}