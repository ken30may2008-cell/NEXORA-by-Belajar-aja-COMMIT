"use client";
import React, { useState } from "react";

/* ---------- Data Awal Notifikasi (Sesuai Desain UI Figma) ---------- */
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    category: "WORKOUT",
    title: "Your next session is coming up",
    body: "Upper Body starts at 5:00 PM. You've got this.",
    time: "10 min ago",
    accentColor: "#19A596", // Garis vertikal toska
    unread: true,
  },
  {
    id: 2,
    category: "MEALS",
    title: "Make a little time for meal prep",
    body: "Your weekly meal plan is ready for a fresh start.",
    time: "1 hour ago",
    accentColor: "#19A596", // Garis vertikal toska
    unread: true,
  },
  {
    id: 3,
    category: "RECOVERY",
    title: "Pause. Breathe. Reset.",
    body: "A five-minute break can make a big difference.",
    time: "2 hours ago",
    accentColor: "#19A596", // Garis vertikal toska
    unread: true,
  },
  {
    id: 4,
    category: "PROGRESS",
    title: "Small steps are adding up",
    body: "You completed 4 workouts last week. Keep it going.",
    time: "Yesterday",
    accentColor: "#66C24F", // Garis vertikal hijau limau
    unread: false,
  },
  {
    id: 5,
    category: "MONEY",
    title: "Your weekly budget is ready",
    body: "Take a moment to check in with your spending.",
    time: "Yesterday",
    accentColor: "#66C24F", // Garis vertikal hijau limau
    unread: false,
  },
];

const INITIAL_REMINDERS = [
  { id: "workouts", label: "Workouts & movement", enabled: true },
  { id: "meals", label: "Meals & budget", enabled: true },
  { id: "rest", label: "Rest & recovery", enabled: true },
];

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

export default function Notification() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'unread'
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const displayedNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  // Fungsi tombol "Mark all as read"
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Klik kartu notifikasi untuk mengubah status baca
  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  // Toggle tombol On/Off pada pengingat di kolom kanan
  const handleToggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed px-4 pt-7 pb-14 font-[Inter,system-ui,sans-serif] select-none md:px-10"
      style={{
        backgroundImage:
          "url('/BG-barbel.svg'), url('/bg-frutiger.png'), linear-gradient(180deg, #4cc3f7 0%, #a8e8ff 52%, #6ec732 100%)",
      }}
    >
      {/* Ornamen Gelembung Latar Belakang */}
      <AeroBubble className="left-3 top-28 h-20 w-20 opacity-85" />
      <AeroBubble className="-left-4 top-[52%] h-24 w-24 opacity-80" />
      <AeroBubble className="left-16 bottom-3 h-20 w-20 opacity-85" />

      <main className="relative z-10 mx-auto max-w-[1060px]">
        {/* ================= 1. HEADER: TITLE & "Mark all as read" ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#154456]">
              Notifications
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-[#376678]">
              A little nudge for a healthier everyday.
            </p>
          </div>

          {/* Tombol Glossy "Mark all as read" */}
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="relative flex h-[44px] min-w-[190px] cursor-pointer items-center justify-center overflow-hidden rounded-[11px] border border-[#147FA8] px-7 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(18,120,165,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all hover:brightness-105 active:scale-95"
            style={{
              background:
                "linear-gradient(180deg, #8EE0F9 0%, #3BB1DF 48%, #168EC0 52%, #44B8E3 100%)",
            }}
          >
            {/* Kilau Kaca Atas */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-1 top-0.5 h-[44%] rounded-t-[9px] bg-gradient-to-b from-white/65 to-white/5"
            />
            <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,65,95,0.4)]">
              Mark all as read
            </span>
          </button>
        </div>

        {/* ================= 2. GRID UTAMA 2 KOLOM ================= */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.58fr_1fr]">
          
          {/* ---------------- KOLOM KIRI: "Your updates" ---------------- */}
          <section
            className="rounded-[18px] border border-white/85 p-5 backdrop-blur-md md:p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(215, 240, 250, 0.84) 0%, rgba(190, 228, 238, 0.78) 55%, rgba(176, 220, 206, 0.8) 100%)",
              boxShadow:
                "0 14px 34px rgba(16, 78, 98, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
            }}
          >
            {/* Judul Panel & Jumlah Unread */}
            <div className="flex items-center justify-between px-0.5">
              <h2 className="text-[18px] font-bold text-[#17495B]">
                Your updates
              </h2>
              <span className="text-xs font-medium text-[#2E5E70]">
                {unreadCount} new
              </span>
            </div>

            {/* Bar Filter: All notifications | Unread (3) */}
            <div className="relative mt-3.5 flex items-center gap-9 overflow-hidden rounded-[11px] border border-white/95 bg-[#F3FAFC]/90 px-4 pt-2.5 pb-2 shadow-[0_2px_8px_rgba(20,85,105,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)]">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`relative cursor-pointer pb-1 text-xs font-medium transition-colors ${
                  activeTab === "all"
                    ? "font-semibold text-[#17495B]"
                    : "text-[#4D7786] hover:text-[#17495B]"
                }`}
              >
                All notifications
                {activeTab === "all" && (
                  <span className="absolute inset-x-0 -bottom-2 h-[3px] rounded-full bg-[#159AB2]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("unread")}
                className={`relative cursor-pointer pb-1 text-xs font-medium transition-colors ${
                  activeTab === "unread"
                    ? "font-semibold text-[#17495B]"
                    : "text-[#4D7786] hover:text-[#17495B]"
                }`}
              >
                Unread ({unreadCount})
                {activeTab === "unread" && (
                  <span className="absolute inset-x-0 -bottom-2 h-[3px] rounded-full bg-[#159AB2]" />
                )}
              </button>
            </div>

            {/* Subheader Tanggal */}
            <p className="mt-4 px-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#3B6878]">
              TODAY · MONDAY, MAY 18
            </p>

            {/* Daftar 5 Kartu Notifikasi */}
            <div className="mt-2.5 space-y-3">
              {displayedNotifications.length === 0 ? (
                <div className="rounded-[11px] border border-white/90 bg-[#F7FDFF]/90 p-6 text-center text-xs text-[#4C7584]">
                  No unread notifications right now. You&apos;re all caught up!
                </div>
              ) : (
                displayedNotifications.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleToggleRead(item.id)}
                    title="Click to toggle read/unread"
                    className="relative flex cursor-pointer items-stretch overflow-hidden rounded-[11px] border border-white/95 bg-[#F6FCFE]/95 px-4 py-3.5 shadow-[0_3px_10px_rgba(18,80,102,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] transition hover:bg-white"
                  >
                    {/* Garis Vertikal Warna di Sisi Kiri */}
                    <span
                      aria-hidden="true"
                      className=" my-0.5 mr-3.5 w-[3.5px] shrink-0 rounded-full"
                      style={{
                        backgroundColor: item.accentColor,
                        opacity: item.unread ? 1 : 0.65,
                      }}
                    />

                    {/* Konten Teks Notifikasi */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#497383]">
                          {item.category}
                        </span>
                        <span className="text-[10.5px] font-medium text-[#4C7584]">
                          {item.time}
                        </span>
                      </div>

                      <h3 className="mt-1 text-[14px] font-semibold leading-snug text-[#1D4C5E]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[11.5px] text-[#3F6B7B]">
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Catatan Bawah Panel Kiri */}
            <p className="mt-4 px-0.5 text-[11px] font-medium text-[#1D4C5E]">
              You&apos;re all caught up with earlier updates.
            </p>
          </section>

          {/* ---------------- KOLOM KANAN: REMINDERS & INFO CARD ---------------- */}
          <div className="flex flex-col gap-5">
            
            {/* Kartu Kanan Atas: "Your reminders" */}
            <section
              className="rounded-[18px] border border-white/85 p-6 backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(180deg, rgba(215, 241, 250, 0.88) 0%, rgba(168, 218, 236, 0.78) 100%)",
                boxShadow:
                  "0 12px 30px rgba(16, 78, 98, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
              }}
            >
              <h2 className="text-[18px] font-bold text-[#17495B]">
                Your reminders
              </h2>
              <p className="mt-1 text-[11.5px] text-[#3B6878]">
                Gentle nudges, on your terms.
              </p>

              <div className="mt-6 space-y-5">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-xs font-medium text-[#225264]">
                      {rem.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleReminder(rem.id)}
                      className={`min-w-[54px] cursor-pointer rounded-full border px-4 py-1 text-xs font-semibold transition-all active:scale-95 ${
                        rem.enabled
                          ? "border-[#6DA8BE] bg-gradient-to-b from-[#FFFFFF] to-[#E5F4FA] text-[#1D4E60] shadow-[0_2px_5px_rgba(20,85,110,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                          : "border-white/70 bg-white/45 text-[#5D8594]"
                      }`}
                    >
                      {rem.enabled ? "On" : "Off"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Kartu Kanan Bawah: "A calmer everyday" */}
            <section
              className="rounded-[18px] border border-white/85 p-6 backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(180deg, rgba(236, 249, 238, 0.9) 0%, rgba(196, 224, 193, 0.82) 100%)",
                boxShadow:
                  "0 12px 30px rgba(25, 85, 65, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
              }}
            >
              <h2 className="text-[18px] font-bold text-[#17495B]">
                A calmer everyday
              </h2>
              <p className="mt-3 text-[12.5px] leading-[1.55] text-[#2F5B6B]">
                Only the things that matter. Your reminders help you make space
                for movement, meals, and a little rest.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}