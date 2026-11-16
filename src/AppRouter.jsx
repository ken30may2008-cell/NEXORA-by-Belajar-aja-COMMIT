import { useState, useEffect } from "react";

// Import halaman-halaman dari folder src/pages/
import LandingPage from "../pages/LandingPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import SignInPage from "../pages/SigninPage.jsx";
import Overview from "../pages/Overview.jsx";
import ViewExercise from "../pages/ViewExercise.jsx";
import UserPage from "../pages/UserPage.jsx";
import Calendar from "../pages/CalendarPages.jsx";
import Notification from "../pages/NotificationPage.jsx";
import WorkoutPlanner from "../pages/WorkoutPlannerPage.jsx";
import RecoveryRoom from "../pages/RecoveryRoomPage.jsx";
import MoneyMeals from "../pages/MoneyMealsPage.jsx";
import MyProgress from "../pages/MyProgressPage.jsx";
/* 
  Jika halaman lain dari Baim / Ken sudah dibuat di src/pages/, 
  lepas komentar (uncomment) import di bawah ini:
  
  import MoneyMealsPage from "../pages/MoneyMealsPage.jsx";
  import WorkoutPlannerPage from "../pages/WorkoutPlannerPage.jsx";
  import RecoveryRoomPage from "../pages/RecoveryRoomPage.jsx";
  import ProgressPage from "../pages/ProgressPage.jsx";
  import NotificationPage from "../pages/NotificationPage.jsx";
  import CalendarPage from "../pages/CalendarPage.jsx";
*/

/* ---------- Daftar Menu Navbar Sesuai Desain Figma ---------- */
const NAV_TABS = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "money", label: "Money & meals", icon: "wallet" },
  { id: "workout", label: "Workout planner", icon: "dumbbell" },
  { id: "recovery", label: "Recovery room", icon: "moon" },
  { id: "progress", label: "My progress", icon: "chart" },
  { id: "notification", label: "Notification", icon: null },
  { id: "calendar", label: "Calendar", icon: null },
];

/* ---------- Ikon SVG Menu ---------- */
function NavIcon({ name, active }) {
  if (!name) return null;
  const color = active ? "#FFFFFF" : "#1C6E8C";

  switch (name) {
    case "grid":
      return (
        <svg className="h-[15px] w-[15px] shrink-0" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="2" y="2" width="4.5" height="4.5" rx="1" />
          <rect x="9.5" y="2" width="4.5" height="4.5" rx="1" />
          <rect x="2" y="9.5" width="4.5" height="4.5" rx="1" />
          <rect x="9.5" y="9.5" width="4.5" height="4.5" rx="1" />
        </svg>
      );
    case "wallet":
      return (
        <svg className="h-[15px] w-[15px] shrink-0" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3.5" width="12" height="9.5" rx="1.8" />
          <path d="M2 6.5h12M11 9.8h1.5" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg className="h-[15px] w-[15px] shrink-0" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4.5 4.5 7 7M2.5 6.5l4-4M1.5 4.5l3-3M9.5 13.5l4-4M11.5 14.5l3-3" />
        </svg>
      );
    case "moon":
      return (
        <svg className="h-[15px] w-[15px] shrink-0" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.2 9.8A5.5 5.5 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7Z" />
        </svg>
      );
    case "chart":
      return (
        <svg className="h-[15px] w-[15px] shrink-0" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 2.5v11h11M5 10l2.5-2.5 2 2 3.5-4" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- Komponen Navbar Global (Persis Gambar Referensi) ---------- */
function NexoraNavbar({ currentPage, onNavigate }) {
  return (
    <header className="w-full border-b border-[#CDE6F0] bg-gradient-to-b from-[#F5FCFE] to-[#EBF7FC] px-6 pt-7 pb-4 font-[Inter,system-ui,sans-serif] select-none md:px-12">
      <div className="mx-auto max-w-[1360px]">
        
        {/* 1. Baris Logo Nexora & Slogan */}
        <div className="flex flex-col items-start">
          <button
            type="button"
            onClick={() => onNavigate("overview")}
            className="group flex cursor-pointer items-center gap-3 focus:outline-none"
          >
            {/* Kotak Ikon Daun Glossy Frutiger Aero */}
            <div
              className="relative flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] border border-[#2493A8] shadow-[0_3px_8px_rgba(20,130,155,0.25),inset_0_1px_1px_rgba(255,255,255,0.85)] transition-transform group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(180deg, #6CE3DC 0%, #2EC0C9 48%, #1597AD 100%)",
              }}
            >
              {/* Kilau kaca atas */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0.5 top-0.5 h-[42%] rounded-t-[8px] bg-gradient-to-b from-white/60 to-transparent"
              />
              {/* Ikon Daun Putih */}
              <svg
                className="relative z-10 h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18C6 9 11 5 19 5c0 8-4 13-13 13Z" />
                <path d="M6 18l7-7" />
              </svg>
            </div>

            <span className="text-[28px] font-bold leading-none tracking-tight text-[#154C61]">
              Nexora
            </span>
          </button>

          <p className="mt-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#4C707E]">
            LIVE WELL. FIND BALANCE.
          </p>
        </div>

        {/* 2. Label YOUR SPACE */}
        <p className="mt-7 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#5B7E8C]">
          YOUR SPACE
        </p>

        {/* 3. Baris Menu Navigasi (7 Tab) */}
        <nav
          aria-label="Workspace navigation"
          className="mt-2.5 flex flex-wrap items-center justify-between gap-y-2"
        >
          {NAV_TABS.map((tab) => {
            const isActive = currentPage === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className={`relative flex cursor-pointer items-center justify-center gap-2.5 transition-all ${
                  isActive
                    ? "min-w-[148px] overflow-hidden rounded-[10px] border border-[#127DA6] px-6 py-2.5 text-[15px] font-semibold text-white shadow-[0_4px_10px_rgba(20,130,180,0.28),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                    : "rounded-[10px] px-3 py-2 text-sm font-medium text-[#245565] hover:bg-white/60 hover:text-[#124252]"
                }`}
                style={
                  isActive
                    ? {
                        background:
                          "linear-gradient(180deg, #8CE0FF 0%, #44B6E6 46%, #1690C7 51%, #3BB5E8 100%)",
                      }
                    : undefined
                }
              >
                {/* Efek kilauan kaca bagian atas saat tab aktif */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-1 top-0.5 h-[44%] rounded-t-[8px] bg-gradient-to-b from-white/55 to-transparent"
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  <NavIcon name={tab.icon} active={isActive} />
                  <span className={isActive ? "drop-shadow-[0_1px_1px_rgba(0,65,95,0.35)]" : ""}>
                    {tab.label}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

/* ---------- Placeholder untuk Halaman yang Sedang Diintegrasikan ---------- */
function PlaceholderSection({ title, onBack }) {
  return (
    <div
      className="flex min-h-[calc(100vh-195px)] w-full items-center justify-center bg-cover bg-center p-6 font-[Inter,system-ui,sans-serif]"
      style={{
        backgroundImage:
          "url('/BG-barbel.svg'), linear-gradient(180deg, #32b7f0 0%, #8be0ff 55%, #73cb36 100%)",
      }}
    >
      <div className="max-w-md rounded-3xl border border-white/85 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-[#144F60]">{title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-[#406E7C]">
          Halaman <b>{title}</b> sudah terhubung dengan Navbar utama. Tinggal panggil komponen halamannya di <code>src/router/App.jsx</code>.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-5 cursor-pointer rounded-xl border border-[#087DA3] bg-gradient-to-b from-[#5cc4f2] to-[#178ec7] px-5 py-2 text-xs font-semibold text-white shadow-md hover:brightness-105"
        >
          ← Back to Overview
        </button>
      </div>
    </div>
  );
}

/* ---------- Komponen Utama App Router ---------- */
export default function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash || "landing";
  });

  const goTo = (targetPage) => {
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(targetPage);
  };

  useEffect(() => {
    const handleCustomNav = (e) => {
      if (e.detail) goTo(e.detail);
    };
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace("#", "");
      if (currentHash) setPage(currentHash);
    };

    window.addEventListener("nexora-navigate", handleCustomNav);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("nexora-navigate", handleCustomNav);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // 1. Halaman Luar / Auth (Tidak menampilkan Navbar "YOUR SPACE")
  if (page === "landing") {
    return (
      <LandingPage
        onBegin={() => goTo("signup")}
        onLogin={() => goTo("signin")}
      />
    );
  }

  if (page === "signup") {
    return (
      <SignUpPage
        onSignUpSuccess={() => goTo("overview")}
        onGoToSignIn={() => goTo("signin")}
        onBackToLanding={() => goTo("landing")}
      />
    );
  }

  if (page === "signin") {
    return (
      <SignInPage
        onSignInSuccess={() => goTo("overview")}
        onGoToSignUp={() => goTo("signup")}
        onBackToLanding={() => goTo("landing")}
      />
    );
  }

  // 2. Halaman Dalam Aplikasi (Otomatis menampilkan NexoraNavbar di bagian atas)
  return (
    <div className="min-h-screen w-full bg-[#EAF7FC]">
      {/* Navbar Global yang muncul di setiap page */}
      <NexoraNavbar currentPage={page} onNavigate={goTo} />

      {/* Konten Halaman */}
      {page === "overview" && <Overview onNavigate={goTo} />}

      {page === "view-exercise" && (
        <ViewExercise onBack={() => goTo("overview")} onNavigate={goTo} />
      )}

      {page === "user" && (
        <UserPage
          onBack={() => goTo("overview")}
          onNavigate={goTo}
          onSignOut={() => goTo("landing")}
        />
      )}

      {page === "money" && (
        <PlaceholderSection title="Money & meals" onBack={() => goTo("overview")} />
      )}

      {page === "workout" && (
        <PlaceholderSection title="Workout planner" onBack={() => goTo("overview")} />
      )}

      {page === "recovery" && (
        <PlaceholderSection title="Recovery room" onBack={() => goTo("overview")} />
      )}

      {page === "progress" && (
        <PlaceholderSection title="My progress" onBack={() => goTo("overview")} />
      )}

      {page === "notification" && (
        <PlaceholderSection title="Notification" onBack={() => goTo("overview")} />
      )}

      {page === "calendar" && (
        <PlaceholderSection title="Calendar" onBack={() => goTo("overview")} />
      )}
    </div>
  );
}