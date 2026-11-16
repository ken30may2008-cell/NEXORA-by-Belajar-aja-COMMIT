"use client";
import React, { useState } from "react";

/* ---------- Data Kalender Mei 2026 (Persis Sesuai UI Figma) ---------- */
const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const INITIAL_CALENDAR_CELLS = [
  // Baris 1 (27-30 April + 1-3 Mei)
  { day: 27, muted: true, tag: null },
  { day: 28, muted: true, tag: null },
  { day: 29, muted: true, tag: null },
  { day: 30, muted: true, tag: null },
  { day: 1, muted: false, tag: "Pull Day" },
  { day: 2, muted: false, tag: "Push Day" },
  { day: 3, muted: false, tag: null },

  // Baris 2 (4-10 Mei)
  { day: 4, muted: false, tag: "Upper Body" },
  { day: 5, muted: false, tag: null },
  { day: 6, muted: false, tag: "Lower Body" },
  { day: 7, muted: false, tag: null },
  { day: 8, muted: false, tag: "Pull Day" },
  { day: 9, muted: false, tag: "Push Day" },
  { day: 10, muted: false, tag: null },

  // Baris 3 (11-17 Mei)
  { day: 11, muted: false, tag: "Upper Body" },
  { day: 12, muted: false, tag: null },
  { day: 13, muted: false, tag: "Lower Body" },
  { day: 14, muted: false, tag: null },
  { day: 15, muted: false, tag: "Pull Day" },
  { day: 16, muted: false, tag: "Push Day" },
  { day: 17, muted: false, tag: null },

  // Baris 4 (18-24 Mei -> 18 adalah TODAY)
  { day: 18, muted: false, isToday: true, tag: "Upper Body" },
  { day: 19, muted: false, tag: null },
  { day: 20, muted: false, tag: "Lower Body" },
  { day: 21, muted: false, tag: null },
  { day: 22, muted: false, tag: "Pull Day" },
  { day: 23, muted: false, tag: "Push Day" },
  { day: 24, muted: false, tag: null },

  // Baris 5 (25-31 Mei)
  { day: 25, muted: false, tag: "Upper Body" },
  { day: 26, muted: false, tag: null },
  { day: 27, muted: false, tag: "Lower Body" },
  { day: 28, muted: false, tag: null },
  { day: 29, muted: false, tag: "Pull Day" },
  { day: 30, muted: false, tag: "Push Day" },
  { day: 31, muted: false, tag: null },
];

const INITIAL_TODAY_EVENTS = [
  {
    id: 1,
    time: "12:30 PM",
    title: "Lunch & meal prep",
    desc: "Nourish your afternoon",
  },
  {
    id: 2,
    time: "5:00 PM",
    title: "Upper Body",
    desc: "45 min · Chest, shoulders & arms",
  },
  {
    id: 3,
    time: "9:30 PM",
    title: "Wind down",
    desc: "Make a little room for rest",
  },
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

export default function Calendar() {
  const [cells, setCells] = useState(INITIAL_CALENDAR_CELLS);
  const [selectedDay, setSelectedDay] = useState(18);
  const [todayEvents, setTodayEvents] = useState(INITIAL_TODAY_EVENTS);

  // State Modal "+ Add event"
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventDay, setNewEventDay] = useState(18);
  const [newEventTag, setNewEventTag] = useState("");
  const [newEventTime, setNewEventTime] = useState("7:00 PM");
  const [newEventDesc, setNewEventDesc] = useState("Personal wellness session");

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTag.trim()) return;

    // 1. Masukkan badge ke tanggal yang dipilih di kalender
    setCells((prev) =>
      prev.map((c) =>
        !c.muted && c.day === Number(newEventDay)
          ? { ...c, tag: newEventTag.trim() }
          : c
      )
    );

    // 2. Tambahkan juga ke daftar jadwal bawah jika tanggal 18 ( atau jadwal hari aktif )
    setTodayEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        time: newEventTime || "7:00 PM",
        title: newEventTag.trim(),
        desc: newEventDesc.trim() || "Scheduled routine",
      },
    ]);

    setNewEventTag("");
    setShowAddModal(false);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed px-4 pt-7 pb-14 font-[Inter,system-ui,sans-serif] select-none md:px-10"
      style={{
        backgroundImage:
          "url('/BG-barbel.svg'), url('/bg-frutiger.png'), linear-gradient(180deg, #4cc3f7 0%, #a8e8ff 52%, #6ec732 100%)",
      }}
    >
      {/* Gelembung Dekorasi Latar Belakang */}
      <AeroBubble className="left-3 top-28 h-20 w-20 opacity-85" />
      <AeroBubble className="-left-4 top-[52%] h-24 w-24 opacity-80" />
      <AeroBubble className="left-14 bottom-4 h-16 w-16 opacity-85" />
      <AeroBubble className="right-8 top-44 h-16 w-16 opacity-75" />

      <main className="relative z-10 mx-auto max-w-[1060px]">
        {/* ================= 1. HEADER BAR: TITLE & "+ Add event" ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#154456]">
              Calendar
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-[#376678]">
              A little structure. More room for you.
            </p>
          </div>

          {/* Tombol Glossy "+ Add event" */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
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
              + Add event
            </span>
          </button>
        </div>

        {/* ================= 2. PANEL UTAMA: "Your month at a glance" ================= */}
        <section
          className="mt-6 rounded-[18px] border border-white/85 p-5 backdrop-blur-md md:p-7"
          style={{
            background:
              "linear-gradient(180deg, rgba(215, 240, 250, 0.84) 0%, rgba(190, 228, 238, 0.76) 55%, rgba(176, 220, 206, 0.78) 100%)",
            boxShadow:
              "0 14px 34px rgba(16, 78, 98, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.92)",
          }}
        >
          {/* Baris Atas Panel: Judul & Navigasi Bulan */}
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#17495B]">
              Your month at a glance
            </h2>

            <div className="flex items-center gap-3 text-xs font-semibold text-[#2E5E70]">
              <button
                type="button"
                className="cursor-pointer px-1 text-[#4E7B8C] hover:text-[#154456]"
                aria-label="Previous month"
              >
                ‹
              </button>
              <span>May 2026</span>
              <button
                type="button"
                className="cursor-pointer px-1 text-[#4E7B8C] hover:text-[#154456]"
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          {/* Header Nama Hari (MON - SUN) */}
          <div className="mt-5 grid grid-cols-7 gap-2 text-center">
            {DAYS_OF_WEEK.map((dayName) => (
              <div
                key={dayName}
                className="text-[10px] font-bold uppercase tracking-wider text-[#3B6878]"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Grid 35 Kotak Tanggal (5 Baris x 7 Kolom) */}
          <div className="mt-2.5 grid grid-cols-7 gap-2.5">
            {cells.map((cell, idx) => {
              const isToday = Boolean(cell.isToday);
              const isSelected = !cell.muted && cell.day === selectedDay;

              return (
                <div
                  key={idx}
                  onClick={() => !cell.muted && setSelectedDay(cell.day)}
                  className={`relative flex min-h-[68px] flex-col justify-between rounded-[9px] border p-2 transition-all md:min-h-[74px] ${
                    cell.muted
                      ? "border-white/45 bg-white/35 text-[#759AA8]"
                      : isToday
                      ? "cursor-pointer border-[#2B8FBE] text-[#12465B] shadow-[0_3px_10px_rgba(25,130,180,0.22),inset_0_1px_1px_rgba(255,255,255,0.85)]"
                      : isSelected
                      ? "cursor-pointer border-[#3CA3CE] bg-white/85 text-[#17495B] shadow-xs"
                      : "cursor-pointer border-white/75 bg-white/60 text-[#235363] hover:bg-white/80"
                  }`}
                  style={
                    isToday
                      ? {
                          background:
                            "linear-gradient(180deg, #A3DFF8 0%, #5AB8E5 100%)",
                        }
                      : !cell.muted
                      ? {
                          background:
                            "linear-gradient(180deg, rgba(246,252,255,0.82) 0%, rgba(214,237,245,0.68) 100%)",
                          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.85)",
                        }
                      : undefined
                  }
                >
                  {/* Angka Tanggal */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold leading-none">
                      {cell.day}
                    </span>
                    {isToday && (
                      <span className="text-[9.5px] font-bold uppercase tracking-tight text-[#154A60]">
                        · TODAY
                      </span>
                    )}
                  </div>

                  {/* Pill Badge Latihan (Pull Day, Push Day, Upper Body, Lower Body) */}
                  {cell.tag && (
                    <div
                      className="mt-auto flex h-[22px] w-full items-center justify-center rounded-[5px] border border-[#AECB9F] px-1.5 text-center text-[9.5px] font-semibold text-[#2A583C] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                      style={{
                        background: isToday
                          ? "linear-gradient(180deg, #F6FCFD 0%, #E0F2EC 100%)"
                          : "linear-gradient(180deg, #F4FBEF 0%, #DCEFD0 100%)",
                      }}
                    >
                      <span className="truncate">{cell.tag}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Catatan Kaki Panel Atas */}
          <p className="mt-4 text-[11px] font-medium text-[#356373]">
            Movement planned. Space for everything else.
          </p>
        </section>

        {/* ================= 3. PANEL BAWAH: "Today · Monday, May 18" ================= */}
        <section
          className="mt-5 rounded-[18px] border border-white/85 p-5 backdrop-blur-md md:p-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(210, 238, 248, 0.84) 0%, rgba(175, 218, 205, 0.8) 100%)",
            boxShadow:
              "0 12px 30px rgba(15, 75, 92, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.9)",
          }}
        >
          <h2 className="text-[16px] font-bold text-[#17495B]">
            Today · Monday, May {selectedDay}
          </h2>

          <div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
            {todayEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex min-h-[104px] flex-col justify-center rounded-[11px] border border-white/90 px-5 py-4 shadow-[0_4px_12px_rgba(20,80,100,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(247, 253, 255, 0.94) 0%, rgba(232, 246, 250, 0.88) 100%)",
                }}
              >
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#527988]">
                  {ev.time}
                </p>
                <h3 className="mt-1.5 text-[15px] font-semibold text-[#235163]">
                  {ev.title}
                </h3>
                <p className="mt-1.5 text-[11px] text-[#4C7584]">{ev.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= MODAL TAMBAH EVENT ("+ Add event") ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d3545]/35 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-white bg-[#F2FAFD] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#154456]">
                Add New Event (May 2026)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="cursor-pointer text-sm font-bold text-[#5A7E8A] hover:text-[#154456]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#245565]">
                    Date (May 1 – 31)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newEventDay}
                    onChange={(e) => setNewEventDay(e.target.value)}
                    className="w-full rounded-lg border border-[#BCE0EC] bg-white px-3 py-2 text-xs text-[#154456] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#245565]">
                    Time
                  </label>
                  <input
                    type="text"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="e.g. 4:00 PM"
                    className="w-full rounded-lg border border-[#BCE0EC] bg-white px-3 py-2 text-xs text-[#154456] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#245565]">
                  Event / Workout Title
                </label>
                <input
                  type="text"
                  required
                  value={newEventTag}
                  onChange={(e) => setNewEventTag(e.target.value)}
                  placeholder="e.g. Upper Body, Cardio, Meal Prep"
                  className="w-full rounded-lg border border-[#BCE0EC] bg-white px-3 py-2 text-xs text-[#154456] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#245565]">
                  Short Note
                </label>
                <input
                  type="text"
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="e.g. 45 min · Chest & shoulders"
                  className="w-full rounded-lg border border-[#BCE0EC] bg-white px-3 py-2 text-xs text-[#154456] focus:outline-none"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer rounded-lg border border-[#B3D4E0] bg-white px-4 py-2 text-xs font-semibold text-[#376678]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg border border-[#147FA8] px-5 py-2 text-xs font-semibold text-white shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, #6FD6F7 0%, #168EC0 100%)",
                  }}
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}