"use client";
import { useState } from "react";

/* ---------- Komponen Maskot 3D Glossy (Identik dengan Desain) ---------- */
function GlossyAvatarMascot({ className = "h-full w-full object-contain drop-shadow-[0_13px_16px_rgba(8,110,112,0.18)]", imgSrc = "/mascot-barbel.svg" }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {!imgError ? (
        <img
          src={imgSrc}
          alt="Nexora Mascot"
          className="h-full w-full object-contain drop-shadow-[0_14px_20px_rgba(12,95,120,0.32)]"
          onError={() => setImgError(true)}
        />
      ) : (
        /* SVG 3D Frutiger Aero Pawn (Otomatis tampil persis jika PNG belum ada di public/) */
        <svg
          viewBox="0 0 220 220"
          className="h-full w-full overflow-visible drop-shadow-[0_14px_18px_rgba(12,95,120,0.28)]"
          aria-hidden="true"
        >
          <defs>
            {/* Bayangan lantai bawah maskot */}
            <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(15, 85, 105, 0.38)" />
              <stop offset="65%" stopColor="rgba(15, 85, 105, 0.12)" />
              <stop offset="100%" stopColor="rgba(15, 85, 105, 0)" />
            </radialGradient>

            {/* Gradasi Kepala & Tubuh Glossy Cyan-Lime */}
            <radialGradient id="aeroBodyGrad" cx="38%" cy="24%" r="70%">
              <stop offset="0%" stopColor="#F4FFCC" />
              <stop offset="22%" stopColor="#9CF7C4" />
              <stop offset="55%" stopColor="#08B8C8" />
              <stop offset="88%" stopColor="#057A9E" />
              <stop offset="100%" stopColor="#099BB8" />
            </radialGradient>

            {/* Kilau Kaca Atas */}
            <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Pantulan Cahaya Kuning-Hijau Bawah */}
            <radialGradient id="bottomGlow" cx="55%" cy="82%" r="40%">
              <stop offset="0%" stopColor="#E9FF99" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#72E5A8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#08B8C8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Bayangan elips di bawah maskot */}
          <ellipse cx="110" cy="198" rx="68" ry="13" fill="url(#floorShadow)" />

          {/* Lengan Kiri */}
          <path
            d="M 65 104 C 35 112, 22 145, 30 166 C 36 178, 52 176, 58 165 C 65 148, 72 126, 78 112 Z"
            fill="url(#aeroBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          <ellipse
            cx="45"
            cy="132"
            rx="10"
            ry="22"
            transform="rotate(24 45 132)"
            fill="url(#glassHighlight)"
          />

          {/* Lengan Kanan */}
          <path
            d="M 155 104 C 185 112, 198 145, 190 166 C 184 178, 168 176, 162 165 C 155 148, 148 126, 142 112 Z"
            fill="url(#aeroBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          <ellipse
            cx="175"
            cy="132"
            rx="10"
            ry="22"
            transform="rotate(-24 175 132)"
            fill="url(#glassHighlight)"
          />

          {/* Tubuh Utama (Torso) */}
          <path
            d="M 74 98 C 52 114, 44 152, 50 176 C 55 190, 82 195, 110 195 C 138 195, 165 190, 170 176 C 176 152, 168 114, 146 98 Z"
            fill="url(#aeroBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          <path
            d="M 74 98 C 52 114, 44 152, 50 176 C 55 190, 82 195, 110 195 C 138 195, 165 190, 170 176 C 176 152, 168 114, 146 98 Z"
            fill="url(#bottomGlow)"
          />
          {/* Kilau Kaca Torso */}
          <ellipse cx="92" cy="134" rx="28" ry="24" fill="url(#glassHighlight)" />

          {/* Kepala Bulat */}
          <circle
            cx="110"
            cy="62"
            r="44"
            fill="url(#aeroBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          {/* Kilau Glossy Atas Kepala */}
          <ellipse
            cx="102"
            cy="42"
            rx="26"
            ry="18"
            transform="rotate(-10 102 42)"
            fill="url(#glassHighlight)"
          />
        </svg>
      )}
    </div>
  );
}

/* ---------- Komponen Gelembung Transparan ---------- */
function AeroBubble({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-white/75 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.92), rgba(255,255,255,0.2) 42%, rgba(160,225,255,0.18) 72%, rgba(255,255,255,0.55) 100%)",
        boxShadow:
          "inset 0 0 10px rgba(255,255,255,0.75), 0 4px 10px rgba(20,105,140,0.08)",
      }}
    />
  );
}

/* ---------- Halaman Utama Sign Up ---------- */
export default function SignUpPage({ onSignUpSuccess, onGoToSignIn, onBackToLanding }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("Muscle Gain");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignUpSuccess) {
      onSignUpSuccess({ fullName, email, budget, goal });
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center px-4 py-8 font-[Inter,system-ui,sans-serif]"
      style={{
        backgroundImage:
          "url('/SkyGrassAndAquaWavesReferenceArtwork.png'), url('/BG-barbel.svg'), linear-gradient(180deg, #0ea5e9 0%, #bae6fd 58%, #65a30d 100%)",
      }}
    >
      {/* Ornamen Gelembung Latar Belakang (Cadangan bila gambar background belum dimuat) */}
      <AeroBubble className="left-[3%] top-[22%] h-24 w-24 opacity-80" />
      <AeroBubble className="left-[2%] bottom-[26%] h-20 w-20 opacity-75" />
      <AeroBubble className="right-[4%] top-[28%] h-20 w-20 opacity-80" />
      <AeroBubble className="right-[10%] top-[44%] h-10 w-10 opacity-70" />
      <AeroBubble className="right-[3%] bottom-[4%] h-28 w-28 opacity-85" />

      {/* Kartu Utama Sign Up */}
      <div className="relative z-10 grid w-full max-w-[900px] grid-cols-1 overflow-hidden rounded-[26px] border border-white bg-white/95 p-3.5 shadow-[0_24px_60px_rgba(8,60,85,0.28),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-xl sm:p-5 md:grid-cols-[0.92fr_1.08fr] md:gap-4">
        
        {/* ================= KOLOM KIRI: PANEL MASKOT ================= */}
        <div
          className="relative flex flex-col items-center justify-between overflow-hidden rounded-[20px] border border-white/90 px-6 py-7 text-center"
          style={{
            background:
              "linear-gradient(180deg, #CBEBF8 0%, #DCF3F9 48%, #E4F5EC 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.9)",
          }}
        >
          {/* Kapsul Atas: START YOUR FRESH ROUTINE */}
          <div className="w-full max-w-[300px] rounded-full border border-white/95 bg-white/85 px-4 py-2.5 shadow-[0_2px_8px_rgba(20,90,115,0.06)] backdrop-blur-md">
            <span className=" block text-[10px] font-bold uppercase tracking-[0.08em] text-[#244E5E]">
              START YOUR FRESH ROUTINE
            </span>
          </div>

          {/* Area Maskot Tengah + 4 Gelembung Kecil */}
          <div className="relative my-6 flex items-center justify-center py-2">
            {/* 4 Gelembung Kecil Mengelilingi Maskot */}
            <AeroBubble className="-left-6 top-6 h-7 w-7" />
            <AeroBubble className="-right-8 top-2 h-9 w-9" />
            <AeroBubble className="-left-8 bottom-8 h-3.5 w-3.5" />
            <AeroBubble className="-right-5 bottom-9 h-4 w-4" />

            <GlossyAvatarMascot className="h-44 w-44 sm:h-48 sm:w-48" />
          </div>

          {/* Teks Bawah Kolom Kiri */}
          <div className="max-w-[285px]">
            <h2 className="text-[22px] font-bold tracking-tight text-[#194150]">
              Build habits that last.
            </h2>
            <p className="mt-2 text-xs leading-[1.55] text-[#5D7F8C]">
              Set your monthly student budget, track protein goals, and schedule smarter workouts.
            </p>
          </div>
        </div>

        {/* ================= KOLOM KANAN: FORM CREATE ACCOUNT ================= */}
        <div className="flex flex-col justify-center px-4 py-4 sm:px-7 sm:py-5">
          
          {/* Brand Logo Kecil (Klik untuk kembali ke Landing Page) */}
          <button
            type="button"
            onClick={onBackToLanding}
            className="group flex w-fit items-center gap-2 text-left focus:outline-none"
          >
            <div className="h-7 w-7">
              <GlossyAvatarMascot className="h-7 w-7" />
            </div>
            <span className="text-[19px] font-bold tracking-tight text-[#1E4756] group-hover:text-[#168CC3]">
              Nexora
            </span>
          </button>

          {/* Judul Form */}
          <h1 className="mt-3.5 text-[28px] font-bold leading-tight tracking-tight text-[#173A48]">
            Create account
          </h1>
          <p className="mt-1 text-xs text-[#73919D]">
            Join Nexora to balance your fitness and finances.
          </p>

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            
            {/* 1. Full Name */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold text-[#2C5362]">
                Full Name
              </label>
              <input
                type="text"
                
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-[10px] border border-[#DCE8EE] bg-[#F9FCFD] px-3.5 py-2.5 text-xs text-[#194150] placeholder-[#9BB2BC] transition focus:border-[#38A3D0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38A3D0]/20"
              />
            </div>

            {/* 2. Student Email */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold text-[#2C5362]">
                Student Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full rounded-[10px] border border-[#DCE8EE] bg-[#F9FCFD] px-3.5 py-2.5 text-xs text-[#194150] placeholder-[#9BB2BC] transition focus:border-[#38A3D0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38A3D0]/20"
              />
            </div>

            {/* 3. Baris 2 Kolom: Monthly Budget (Rp) & Primary Goal */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold text-[#2C5362]">
                  Monthly Budget (Rp)
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 1,500,000"
                  className="w-full rounded-[10px] border border-[#DCE8EE] bg-[#F9FCFD] px-3.5 py-2.5 text-xs text-[#194150] placeholder-[#9BB2BC] transition focus:border-[#38A3D0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38A3D0]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold text-[#2C5362]">
                  Primary Goal
                </label>
                <div className="relative">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full appearance-none rounded-[10px] border border-[#DCE8EE] bg-[#F9FCFD] px-3.5 py-2.5 pr-8 text-xs font-medium text-[#2A5261] transition focus:border-[#38A3D0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38A3D0]/20"
                  >
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Stay Active">Stay Active</option>
                    <option value="Better Recovery">Better Recovery</option>
                  </select>
                  {/* Ikon Panah Dropdown */}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#7A98A4]">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Password */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold text-[#2C5362]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-[10px] border border-[#DCE8EE] bg-[#F9FCFD] px-3.5 py-2.5 pr-10 text-xs text-[#194150] placeholder-[#9BB2BC] transition focus:border-[#38A3D0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38A3D0]/20"
                />
                {/* Tombol Mata (Show/Hide Password) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-3 flex items-center text-[#94AEB9] hover:text-[#2C5362]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tombol Submit: Create Account → (Frutiger Aero Glossy Pill) */}
            <button
              type="submit"
              className="relative mt-2 w-full cursor-pointer overflow-hidden rounded-full border border-[#1273A6] py-3 text-xs font-bold text-white shadow-[0_6px_16px_rgba(22,130,185,0.38),inset_0_1px_1px_rgba(255,255,255,0.85)] transition-all hover:brightness-105 active:scale-[0.99]"
              style={{
                background:
                  "linear-gradient(180deg, #63C4EE 0%, #2B96CB 48%, #187DB3 52%, #2492C8 100%)",
              }}
            >
              {/* Pantulan Kaca Atas */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-0.5 h-[44%] rounded-full bg-gradient-to-b from-white/50 to-transparent"
              />
              <span className="relative z-10 tracking-wide drop-shadow-[0_1px_1px_rgba(0,60,90,0.4)]">
                Create Account →
              </span>
            </button>
          </form>

          {/* Footer Link ke Sign In */}
          <p className="mt-5 text-center text-[11px] text-[#73919D]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onGoToSignIn}
              className="cursor-pointer font-bold text-[#1982B6] hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}