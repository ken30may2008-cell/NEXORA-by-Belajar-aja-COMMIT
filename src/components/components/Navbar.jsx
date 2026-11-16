import React from "react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "money", label: "Money & meals", icon: "wallet" },
  { id: "workout", label: "Workout planner", icon: "dumbbell" },
  { id: "recovery", label: "Recovery room", icon: "moon" },
  { id: "progress", label: "My progress", icon: "chart" },
  { id: "notification", label: "Notification", icon: null },
  { id: "calendar", label: "Calendar", icon: null },
];

function NavIcon({ name, active }) {
  if (!name) return null;
  const strokeColor = active ? "#FFFFFF" : "#1F6E8C";

  switch (name) {
    case "grid":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.5" />
          <rect x="9" y="2" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.5" />
          <rect x="2" y="9" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.5" />
          <rect x="9" y="9" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );
    case "wallet":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.5 4.5A1.5 1.5 0 0 1 4 3h8.5v2M2.5 4.5v7A1.5 1.5 0 0 0 4 13h9.5a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5H4a1.5 1.5 0 0 1-1.5-1.5Zm9 4.5h1.5"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "dumbbell":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m4.5 4.5 7 7M2 7l2-2m-.5 3.5 3-3m3.5 6.5 3-3M11 14l2-2M11.5 2.5l2 2M2.5 11.5l2 2"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "moon":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.5 9.8A5.5 5.5 0 0 1 6.2 2.5a5.5 5.5 0 1 0 7.3 7.3Z"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.5 2.5v11h11M5 10l2.5-2.5 2 2L13 6"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar({ currentPage = "overview", onNavigate }) {
  const handleSelect = (targetRoute) => {
    if (onNavigate) {
      onNavigate(targetRoute);
    }
    window.location.hash = targetRoute;
    window.dispatchEvent(new CustomEvent("nexora-navigate", { detail: targetRoute }));
  };

  return (
    <header
      className="w-full border-b border-[#CBE4EE] px-6 pt-7 pb-5 font-[Inter,system-ui,sans-serif] select-none md:px-12"
      style={{
        background: "linear-gradient(180deg, #F6FCFE 0%, #E7F6FA 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* 1. Bagian Atas: Ikon Daun Glossy + Nama Nexora */}
        <div className="flex flex-col items-start">
          <button
            type="button"
            onClick={() => handleSelect("overview")}
            className="group flex cursor-pointer items-center gap-3 text-left focus:outline-none"
          >
            {/* Kotak Ikon Daun Frutiger Aero */}
            <img
              src="/.mascot-icon.svg"
              alt="Nexora Mascot Icon"
              className="relative h-[38px] w-[38px] rounded-[10px] "
            />
            <span className="text-[28px] font-bold leading-none tracking-tight text-[#144B5E]">
              Nexora
            </span>
          </button>

          {/* Tagline di bawah logo */}
          <p className="mt-2.5 text-[8.5px] font-semibold uppercase tracking-[0.08em] text-[#456E7D]">
            LIVE WELL. FIND BALANCE.
          </p>
        </div>

        {/* 2. Label YOUR SPACE */}
        <p className="mt-6 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#5B8190]">
          YOUR SPACE
        </p>

        {/* 3. Baris Menu Navigasi (7 Item) */}
        <nav
          aria-label="Workspace Navigation"
          className="mt-2.5 flex flex-wrap items-center justify-between gap-y-3 gap-x-4"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;

            if (isActive) {
              /* Tampilan Tombol Aktif: Frutiger Aero Glossy Blue Button (Persis seperti tombol Notification di gambar) */
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className="relative flex min-w-[155px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-[#1482AC] px-6 py-2.5 text-[15px] font-semibold text-white shadow-[0_3px_10px_rgba(24,138,184,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all"
                  style={{
                    background:
                      "linear-gradient(180deg, #8FE2FA 0%, #3DB4E0 48%, #1B95C4 52%, #49BDE5 100%)",
                  }}
                >
                  {/* Efek Kilau Kaca Atas */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-1 top-0.5 h-[44%] rounded-t-[8px] bg-gradient-to-b from-white/65 to-white/5"
                  />
                  <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_1px_rgba(0,65,95,0.35)]">
                    <NavIcon name={item.icon} active={true} />
                    {item.label}
                  </span>
                </button>
              );
            }

            /* Tampilan Menu Tidak Aktif */
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className="flex cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2 text-sm font-medium text-[#245565] transition-colors hover:bg-white/60 hover:text-[#113F4E]"
              >
                <NavIcon name={item.icon} active={false} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}