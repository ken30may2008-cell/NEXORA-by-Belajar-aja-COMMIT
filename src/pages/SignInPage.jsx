"use client";
import { useState } from "react";

/* ---------- Komponen Maskot 3D Cyan-Lime (Gambar Asli + Auto-Fallback SVG Identik) ---------- */
function GlossyMascot({
  src = "/NexoraCyanlimeMascot.png",
  className = "w-[260px] h-[260px]",
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {!imgError ? (
        <img
          src= "./mascot-iconstate.svg"
          alt="Nexora · Cyan-lime mascot"
          className="h-full w-full object-contain drop-shadow-[0_13px_16px_rgba(8,110,112,0.18)]"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Vektor 3D Glossy Pawn Identik jika file PNG belum dipindahkan ke folder public/ */
        <svg
          viewBox="0 0 220 220"
          className="h-full w-full overflow-visible drop-shadow-[0_13px_16px_rgba(8,110,112,0.22)]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="signInFloorShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(12, 85, 102, 0.36)" />
              <stop offset="65%" stopColor="rgba(12, 85, 102, 0.12)" />
              <stop offset="100%" stopColor="rgba(12, 85, 102, 0)" />
            </radialGradient>

            <radialGradient id="signInBodyGrad" cx="38%" cy="24%" r="70%">
              <stop offset="0%" stopColor="#F4FFCC" />
              <stop offset="22%" stopColor="#9CF7C4" />
              <stop offset="55%" stopColor="#08B8C8" />
              <stop offset="88%" stopColor="#057A9E" />
              <stop offset="100%" stopColor="#099BB8" />
            </radialGradient>

            <linearGradient id="signInHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            <radialGradient id="signInBottomGlow" cx="55%" cy="82%" r="40%">
              <stop offset="0%" stopColor="#E9FF99" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#72E5A8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#08B8C8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Bayangan bawah maskot */}
          <ellipse cx="110" cy="198" rx="68" ry="13" fill="url(#signInFloorShadow)" />

          {/* Lengan Kiri */}
          <path
            d="M 65 104 C 35 112, 22 145, 30 166 C 36 178, 52 176, 58 165 C 65 148, 72 126, 78 112 Z"
            fill="url(#signInBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          <ellipse
            cx="45"
            cy="132"
            rx="10"
            ry="22"
            transform="rotate(24 45 132)"
            fill="url(#signInHighlight)"
          />

          {/* Lengan Kanan */}
          <path
            d="M 155 104 C 185 112, 198 145, 190 166 C 184 178, 168 176, 162 165 C 155 148, 148 126, 142 112 Z"
            fill="url(#signInBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          <ellipse
            cx="175"
            cy="132"
            rx="10"
            ry="22"
            transform="rotate(-24 175 132)"
            fill="url(#signInHighlight)"
          />

          {/* Badan Utama */}
          <path
            d="M 74 98 C 52 114, 44 152, 50 176 C 55 190, 82 195, 110 195 C 138 195, 165 190, 170 176 C 176 152, 168 114, 146 98 Z"
            fill="url(#signInBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          <path
            d="M 74 98 C 52 114, 44 152, 50 176 C 55 190, 82 195, 110 195 C 138 195, 165 190, 170 176 C 176 152, 168 114, 146 98 Z"
            fill="url(#signInBottomGlow)"
          />
          <ellipse cx="92" cy="134" rx="28" ry="24" fill="url(#signInHighlight)" />

          {/* Kepala */}
          <circle
            cx="110"
            cy="62"
            r="44"
            fill="url(#signInBodyGrad)"
            stroke="#067794"
            strokeWidth="3.5"
          />
          <ellipse
            cx="102"
            cy="42"
            rx="26"
            ry="18"
            transform="rotate(-10 102 42)"
            fill="url(#signInHighlight)"
          />
        </svg>
      )}
    </div>
  );
}

/* ---------- Komponen Gelembung Kaca Frutiger Aero ---------- */
function GlassBubble({ className = "", shineClass = "w-2.5 h-1 top-1.5 left-2" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-white/80 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.9), rgba(255,255,255,0.22) 45%, rgba(165,228,250,0.2) 75%, rgba(255,255,255,0.6) 100%)",
        boxShadow:
          "inset 0 0 10px rgba(255,255,255,0.8), 0 4px 10px rgba(15,95,125,0.08)",
      }}
    >
      {/* Pantulan titik cahaya di dalam gelembung */}
      <div
        className={`absolute -rotate-12 rounded-full bg-white/85 blur-[0.3px] ${shineClass}`}
      />
    </div>
  );
}

/* ---------- Halaman Utama Sign In ---------- */
export default function NexoraSignIn({
  onSignInSuccess,
  onGoToSignUp,
  onBackToLanding,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignInSuccess) {
      onSignInSuccess({ email, rememberMe });
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center px-4 py-8 font-[Inter,system-ui,sans-serif]"
      style={{
        backgroundImage:
          "url('/SunlitAeroLandscape.png'), url('/SkyGrassAndAquaWavesReferenceArtwork.png'), url('/BG-barbel.svg'), linear-gradient(180deg, #0ea5e9 0%, #bae6fd 58%, #65a30d 100%)",
      }}
    >
      {/* Ornamen Gelembung Latar Belakang (Kiri & Kanan Layar) */}
      <GlassBubble className="left-[1%] top-[24%] h-24 w-24 opacity-80" shineClass="w-5 h-2 top-3 left-4" />
      <GlassBubble className="left-[0.5%] bottom-[26%] h-20 w-20 opacity-75" shineClass="w-4 h-1.5 top-3 left-3.5" />
      <GlassBubble className="right-[2%] top-[25%] h-20 w-20 opacity-80" shineClass="w-4 h-1.5 top-3 left-3.5" />
      <GlassBubble className="right-[8%] top-[41%] h-11 w-11 opacity-75" shineClass="w-2.5 h-1 top-2 left-2" />
      <GlassBubble className="right-[10%] top-[47%] h-5 w-5 opacity-70" shineClass="w-1 h-0.5 top-1 left-1" />
      <GlassBubble className="right-[2%] bottom-[3%] h-28 w-28 opacity-85" shineClass="w-6 h-2.5 top-4 left-5" />

      {/* ================= KARTU UTAMA SIGN IN (1040px x 640px di Desktop) ================= */}
      <div className="relative z-10 grid w-full max-w-[1040px] grid-cols-1 items-center gap-6 overflow-hidden rounded-[28px] border-[1.5px] border-white/95 bg-white/82 p-[18px] shadow-[0_20px_60px_rgba(15,77,97,0.22),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-xl md:min-h-[640px] md:grid-cols-[472px_1fr] md:gap-[52px] md:pr-[60px]">
        
        {/* ================= KOLOM KIRI: PANEL MASKOT ================= */}
        <div
          className="relative flex h-full min-h-[520px] w-full flex-col items-center justify-between overflow-hidden rounded-[20px] border border-white/85 px-6 py-[30px] text-center md:min-h-[604px]"
          style={{
            background: "linear-gradient(129deg, #BCE8F7 13.79%, #DDF4E8 82.76%)",
          }}
        >
          {/* Radial Glow Putih di Belakang Maskot */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[85px] h-[366px] w-[366px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 100%)",
            }}
          />

          {/* Kapsul Atas: A LITTLE STRONGER, A LITTLE MORE BALANCED */}
          <div className="relative z-10 flex h-[34px] w-full max-w-[422px] items-center justify-center rounded-full border border-white/80 bg-white/55 px-4 shadow-[0_2px_8px_rgba(20,90,115,0.05)] backdrop-blur-md">
            <p className="text-center text-[9px] font-semibold uppercase tracking-[0.06em] text-[#285E68]">
              A LITTLE STRONGER, A LITTLE MORE BALANCED
            </p>
          </div>

          {/* Area Maskot Tengah + 4 Gelembung Kaca Sesuai Koordinat Figma */}
          <div className="relative z-10 my-auto flex h-[320px] w-full items-center justify-center">
            {/* 4 Gelembung Mengelilingi Maskot */}
            <GlassBubble
              className="left-[6%] top-[12%] h-[43px] w-[43px]"
              shineClass="w-[11px] h-[5px] left-[9px] top-[6px]"
            />
            <GlassBubble
              className="right-[6%] top-[4%] h-[57px] w-[57px]"
              shineClass="w-[14px] h-[7px] left-[12px] top-[9px]"
            />
            <GlassBubble
              className="left-[9%] bottom-[8%] h-[20px] w-[20px]"
              shineClass="w-[5px] h-[2px] left-[4px] top-[3px]"
            />
            <GlassBubble
              className="right-[9%] bottom-[13%] h-[27px] w-[27px]"
              shineClass="w-[7px] h-[3px] left-[6px] top-[4px]"
            />

            {/* Gambar Maskot Utama */}
            <GlossyMascot
              src="/NexoraCyanlimeMascot.png"
              className="h-[270px] w-[270px] sm:h-[300px] sm:w-[300px]"
            />
          </div>

          {/* Teks Bawah Panel Kiri */}
          <div className="relative z-10 max-w-[380px] pb-2">
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-[#163A4A]">
              Feel good. Spend smart.
            </h2>
            <p className="mt-3 text-sm leading-[22px] text-[#5A7B8C]">
              Manage your student fitness budget, workouts, and recovery in one fresh space.
            </p>
          </div>
        </div>

        {/* ================= KOLOM KANAN: FORM WELCOME BACK ================= */}
        <div className="flex w-full max-w-[438px] flex-col justify-center mx-auto py-4 md:py-0">
          
          {/* Brand Logo Kecil (Klik untuk kembali ke Landing Page) */}
          <button
            type="button"
            onClick={onBackToLanding}
            className="group flex w-fit cursor-pointer items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="h-[34px] w-[34px]">
              <GlossyMascot
                src="/GlossyAquaBrandMascot.png"
                className="h-[34px] w-[34px] transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-[25px] font-semibold leading-none tracking-tight text-[#163A4A] group-hover:text-[#1A7BA6]">
              Nexora
            </span>
          </button>

          {/* Judul & Subjudul */}
          <h1 className="mt-7 text-[34px] font-semibold leading-tight tracking-tight text-[#163A4A]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[#5A7B8C]">
            Sign in to continue your healthy routine.
          </p>

          {/* Form Sign In */}
          <form onSubmit={handleSubmit} className="mt-7">
            
            {/* 1. Student Email */}
            <div>
              <label className="block text-[13px] font-medium text-[#163A4A]">
                Student Email
              </label>
              <input
                type="email"
               
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="mt-2 h-12 w-full rounded-xl border border-[#C4DCE4] bg-white/75 px-4 text-sm text-[#163A4A] placeholder-[#728D99] transition focus:border-[#2689B2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38A3D1]/20"
              />
            </div>

            {/* 2. Password */}
            <div className="mt-5">
              <label className="block text-[13px] font-medium text-[#163A4A]">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-[#C4DCE4] bg-white/75 pl-4 pr-11 text-sm text-[#163A4A] placeholder-[#728D99] transition focus:border-[#2689B2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38A3D1]/20"
                />
                {/* Tombol Ikon Mata (Show/Hide Password) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-3.5 flex cursor-pointer items-center text-[#5A7B8C] hover:text-[#163A4A]"
                >
                  <svg
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.666992 6.50002C0.666992 6.50002 3.58366 0.666687 9.00033 0.666687C14.417 0.666687 17.3337 6.50002 17.3337 6.50002C17.3337 6.50002 14.417 12.3334 9.00033 12.3334C3.58366 12.3334 0.666992 6.50002 0.666992 6.50002Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.5 6.5C11.5 7.88071 10.3807 9 9 9C7.61929 9 6.5 7.88071 6.5 6.5C6.5 5.11929 7.61929 4 9 4C10.3807 4 11.5 5.11929 11.5 6.5Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 3. Remember Me & Forgot Password */}
            <div className="mt-5 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2.5 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-[17px] w-[17px] cursor-pointer rounded border border-[#A4C5D2] bg-white/85 accent-[#1A7BA6]"
                />
                <span className="text-xs text-[#5A7B8C]">Remember me</span>
              </label>

              <button
                type="button"
                className="cursor-pointer text-xs font-medium text-[#1A7BA6] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* 4. Tombol Utama: Sign In → (Frutiger Aero Glossy Pill) */}
            <button
              type="submit"
              className="relative mt-5 h-[49px] w-full cursor-pointer overflow-hidden rounded-full border border-[#2689B2] text-[15px] font-semibold text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_5px_12px_rgba(23,124,164,0.24)] transition-all hover:brightness-105 active:scale-[0.99]"
              style={{
                background: "linear-gradient(180deg, #38A3D1 0%, #1A7BA6 100%)",
              }}
            >
              {/* Kilauan Kaca Atas */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1.5 right-1.5 top-[3px] h-[21px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              />
              <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,55,85,0.35)]">
                Sign In →
              </span>
            </button>
          </form>

          {/* 5. Pembatas "or" */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#CADFE5]" />
            <span className="text-xs text-[#728D99]">or</span>
            <div className="h-px flex-1 bg-[#CADFE5]" />
          </div>

          {/* 6. Tombol Continue with Google */}
          <button
            type="button"
            onClick={onSignInSuccess}
            className="mt-5 flex h-[47px] w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-[#C5DDE5] bg-white/65 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] transition hover:bg-white/90 active:scale-[0.99]"
          >
            {/* Ikon Google Resmi */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.8483 6.34684H14.2483V6.15934H7.49831V9.15934H11.7358C11.3942 10.0546 10.7758 10.8175 9.97052 11.3369C9.16525 11.8563 8.2152 12.1051 7.25873 12.047C6.30225 11.9889 5.38928 11.6271 4.65275 11.0141C3.91623 10.4011 3.39461 9.56898 3.16385 8.63895C2.93309 7.70891 3.00523 6.72949 3.36978 5.8433C3.73433 4.95712 4.37225 4.21044 5.19064 3.71199C6.00904 3.21354 6.96518 2.98935 7.91984 3.07206C8.8745 3.15477 9.77784 3.54007 10.4983 4.17184L12.6358 2.03434C11.3836 0.857685 9.76528 0.146699 8.05161 0.0203206C6.33795 -0.106058 4.63285 0.359835 3.22156 1.34007C1.81026 2.3203 0.778349 3.75541 0.298445 5.40536C-0.181459 7.0553 -0.0802516 8.81999 0.585137 10.4043C1.25052 11.9885 2.43974 13.2962 3.95385 14.1087C5.46796 14.9212 7.21514 15.1891 8.90312 14.8676C10.5911 14.5461 12.1175 13.6548 13.227 12.3427C14.3365 11.0306 14.9618 9.37727 14.9983 7.65934C14.9983 7.20934 14.9608 6.75934 14.8483 6.34684Z"
                fill="#FFC107"
              />
              <path
                d="M0.863281 4.01108L3.33828 5.81108C3.59526 5.13281 4.01238 4.52671 4.55412 4.04441C5.09585 3.56211 5.74615 3.2179 6.44959 3.04112C7.15304 2.86434 7.8888 2.86022 8.59419 3.0291C9.29957 3.19799 9.95367 3.53488 10.5008 4.01108L12.6383 1.87358C11.7851 1.08805 10.7613 0.511094 9.64741 0.188057C8.53354 -0.134979 7.35993 -0.195295 6.21882 0.0118504C5.0777 0.218996 4.00017 0.687958 3.07091 1.38188C2.14165 2.0758 1.38598 2.97578 0.863281 4.01108Z"
                fill="#FF3D00"
              />
              <path
                d="M7.49844 15.0001C9.44844 15.0001 11.2484 14.2501 12.5609 13.0126L10.2359 11.0626C9.67299 11.4937 9.01614 11.7857 8.31892 11.9147C7.62171 12.0438 6.90388 12.0062 6.22392 11.8052C5.54396 11.6041 4.92116 11.2452 4.40625 10.7577C3.89134 10.2703 3.4989 9.66802 3.26094 9.00009L0.785938 10.9126C1.41722 12.1481 2.37888 13.1843 3.56393 13.906C4.74898 14.6276 6.11097 15.0063 7.49844 15.0001Z"
                fill="#4CAF50"
              />
              <path
                d="M14.8483 6.34688H14.2483V6.15938H7.49829V9.15938H11.7358C11.4451 9.97714 10.9242 10.6934 10.2358 11.2219L12.5608 13.1719C13.3281 12.473 13.9411 11.6218 14.3608 10.6727C14.7805 9.72349 14.9977 8.6972 14.9983 7.65938C14.9983 7.20938 14.9608 6.75938 14.8483 6.34688Z"
                fill="#1976D2"
              />
            </svg>
            <span className="text-[13px] font-medium text-[#163A4A]">
              Continue with Google
            </span>
          </button>

          {/* 7. Tautan Bawah ke Halaman Sign Up */}
          <p className="mt-6 text-center text-xs text-[#728D99]">
            New to Nexora?{" "}
            <button
              type="button"
              onClick={onGoToSignUp}
              className="cursor-pointer font-semibold text-[#1A7BA6] hover:underline"
            >
              Create a student account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}