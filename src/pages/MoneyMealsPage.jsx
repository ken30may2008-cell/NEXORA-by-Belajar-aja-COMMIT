"use client";
import React, { useState } from "react";

/* ---------- Konstanta & Data Awal (Sesuai Desain Figma) ---------- */
const TOTAL_BUDGET = 250;

const INITIAL_CATEGORIES = [
  {
    name: "Gym membership",
    budget: 40,
    icon: "dumbbell",
    iconBg: "bg-[#E3F3FA] text-[#227CA2] border-[#CBE6F2]",
    barGrad: "linear-gradient(90deg, #F4B63F 0%, #DF8B1C 100%)",
  },
  {
    name: "Supplements",
    budget: 25,
    icon: "bottle",
    iconBg: "bg-[#EFEKFB] bg-[#F1EEFC] text-[#7866B8] border-[#DFD9F7]",
    barGrad: "linear-gradient(90deg, #F4B63F 0%, #DF8B1C 100%)",
  },
  {
    name: "High-protein meal prep",
    budget: 185,
    icon: "fork",
    iconBg: "bg-[#EAF6E3] text-[#4C8A3A] border-[#D2EBC6]",
    barGrad: "linear-gradient(90deg, #98D65C 0%, #64B438 100%)",
  },
];

const INITIAL_EXPENSES = [
  {
    id: 1,
    date: "May 18, 2026",
    name: "Chicken, rice & frozen vegetables",
    cat: "High-protein meal prep",
    amount: 28.5,
  },
  {
    id: 2,
    date: "May 15, 2026",
    name: "Whey protein refill",
    cat: "Supplements",
    amount: 20.0,
  },
  {
    id: 3,
    date: "May 13, 2026",
    name: "Eggs, oats & Greek yogurt",
    cat: "High-protein meal prep",
    amount: 36.0,
  },
  {
    id: 4,
    date: "May 8, 2026",
    name: "Weekly meal-prep groceries",
    cat: "High-protein meal prep",
    amount: 45.5,
  },
  {
    id: 5,
    date: "May 1, 2026",
    name: "Campus fitness monthly pass",
    cat: "Gym membership",
    amount: 35.0,
  },
];

const CAT_BADGE_STYLE = {
  "High-protein meal prep":
    "border-[#D5ECC8] bg-[#ECF7E6] text-[#3B6E2C]",
  Supplements:
    "border-[#DFD9F6] bg-[#F1EEFB] text-[#5E5294]",
  "Gym membership":
    "border-[#CBE5F4] bg-[#E5F3FA] text-[#236584]",
};

const money = (n) => `$${Number(n).toFixed(2)}`;

/* ---------- Ikon SVG Bersih ---------- */
function Icon({ name, className = "h-4 w-4" }) {
  const paths = {
    dumbbell:
      "m6.5 6.5 11 11M3 10l3-3m-1 5 4-4m6 10 4-4m-1 5 3-3M17.5 3.5l3 3M3.5 17.5l3 3",
    bottle:
      "M9 3h6M10 3v3l-2 3v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9l-2-3V3M8 13h8M12 11.5v3M10.5 13h3",
    fork:
      "M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2.5 6 0 8v10",
    bell:
      "M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Zm4 4a2 2 0 0 0 4 0",
    chev:
      "m9 6 6 6-6 6",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
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

/* ---------- Komponen Utama Money & Meals ---------- */
export default function MoneyMeals({ onNavigate }) {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("High-protein meal prep");
  const [newAmount, setNewAmount] = useState("");

  // Navigasi ke halaman lain (Calendar, Notification, User)
  const triggerNav = (targetPage) => {
    if (onNavigate) onNavigate(targetPage);
    window.location.hash = targetPage;
    window.dispatchEvent(
      new CustomEvent("nexora-navigate", { detail: targetPage })
    );
  };

  // Perhitungan dinamis total pengeluaran & sisa budget
  const spent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const left = Math.max(0, TOTAL_BUDGET - spent);
  const leftPct = Math.round((left / TOTAL_BUDGET) * 100);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const val = parseFloat(newAmount);
    if (!newName.trim() || isNaN(val) || val <= 0) return;

    setExpenses((prev) => [
      {
        id: Date.now(),
        date: "May 18, 2026",
        name: newName.trim(),
        cat: newCat,
        amount: val,
      },
      ...prev,
    ]);

    setNewName("");
    setNewAmount("");
    setShowAddModal(false);
  };

  // Class kartu kaca berbingkai biru-toska tipis sesuai Figma
  const aeroCard =
    "rounded-[18px] border border-[#6BA5BD]/80 bg-white/92 shadow-[0_10px_28px_rgba(18,82,104,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-md";

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed px-4 pt-6 pb-12 font-[Inter,system-ui,sans-serif] text-[#154658] select-none md:px-10"
      style={{
        backgroundImage:
          "url('/BG-barbel.svg'), url('/bg-frutiger.png'), linear-gradient(180deg, #4cc3f7 0%, #a8e8ff 52%, #6ec732 100%)",
      }}
    >
      {/* Ornamen Gelembung Latar Belakang */}
      <AeroBubble className="left-4 top-8 h-16 w-16 opacity-85" />
      <AeroBubble className="right-6 bottom-44 h-20 w-20 opacity-80" />
      <AeroBubble className="left-10 bottom-3 h-24 w-24 opacity-85" />

      <main className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-col gap-5">
        
        {/* ================= 1. TOP HEADER BAR ================= */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          {/* Kotak Judul Kiri */}
          <div className="min-w-[235px] rounded-[14px] border border-[#3B768C]/70 bg-white/95 px-5 py-2.5 shadow-[0_4px_12px_rgba(20,85,105,0.08)]">
            <h1 className="text-[20px] font-bold leading-tight text-[#144659]">
              Money &amp; meals
            </h1>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#5A808E]">
              MONDAY, MAY 18, 2026
            </p>
          </div>

          {/* Kontrol Kanan: Bulan, Notifikasi, Student Plan, Avatar */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => triggerNav("calendar")}
              className="flex w-[165px] cursor-pointer items-center justify-between rounded-[10px] border border-white/90 bg-white/85 px-3.5 py-2 text-xs font-medium text-[#235466] shadow-xs backdrop-blur-md transition hover:bg-white"
            >
              <span>May 2026</span>
              <Icon name="chev" className="h-3.5 w-3.5 text-[#588190]" />
            </button>

            <button
              type="button"
              onClick={() => triggerNav("notification")}
              aria-label="Notifications"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-white/90 bg-white/85 text-[#235466] shadow-xs backdrop-blur-md transition hover:bg-white"
            >
              <Icon name="bell" className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => triggerNav("user")}
              className="cursor-pointer rounded-[8px] border border-[#A6CA7E] bg-gradient-to-b from-[#F4FBEF] to-[#DCEFD0] px-4 py-2 text-xs font-semibold text-[#3C6C2C] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:brightness-105"
            >
              Student plan
            </button>

            {/* Avatar Mini 3D */}
            <button
              type="button"
              onClick={() => triggerNav("user")}
              aria-label="User profile"
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white bg-[radial-gradient(circle_at_35%_28%,#e3fff6,#38c4bc_55%,#14758f_100%)] shadow-sm transition hover:scale-105"
            >
              <span className="h-3 w-3 -translate-y-0.5 rounded-full bg-white/80" />
            </button>
          </div>
        </header>

        {/* ================= 2. BARIS ATAS: HEALTHY BUDGET & COST PER PROTEIN ================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.85fr_1fr]">
          
          {/* Kartu Kiri: A healthy budget */}
          <section className={`${aeroCard} flex flex-col justify-between p-6`}>
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#144659]">
                A healthy budget
              </h2>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5A808E]">
                MAY 2026
              </p>
            </div>

            <div className="mt-3 grid grid-cols-1 items-center gap-6 sm:grid-cols-[176px_1fr_175px]">
              
              {/* Lingkaran Indikator Air Bergelombang ($85.00 budget left) */}
              <div className="relative mx-auto flex h-[174px] w-[174px] shrink-0 items-center justify-center rounded-full border-[5px] border-[#79C7EE] bg-white p-1 shadow-[0_6px_18px_rgba(30,130,180,0.16),inset_0_2px_6px_rgba(20,95,130,0.1)]">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-[#BAE3F7] bg-gradient-to-b from-[#FFFFFF] to-[#F2FAFD]">
                  
                  {/* Air Bergelombang di Bagian Bawah Lingkaran */}
                  <div
                    className="absolute inset-x-0 bottom-0 transition-all duration-500"
                    style={{ height: `${Math.max(18, Math.min(85, leftPct + 4))}%` }}
                  >
                    {/* Permukaan Gelombang SVG */}
                    <svg
                      viewBox="0 0 200 24"
                      preserveAspectRatio="none"
                      className="absolute -top-3 left-0 h-4 w-full"
                    >
                      <path
                        d="M0,12 Q50,0 100,12 T200,12 L200,24 L0,24 Z"
                        fill="#78C6EC"
                      />
                      <path
                        d="M0,12 Q50,0 100,12 T200,12"
                        fill="none"
                        stroke="#2580AC"
                        strokeWidth="2.2"
                      />
                    </svg>
                    {/* Isi Air Gradasi Biru */}
                    <div
                      className="h-full w-full"
                      style={{
                        background:
                          "linear-gradient(180deg, #78C6EC 0%, #3FA1D6 55%, #2687BE 100%)",
                      }}
                    />
                  </div>

                  {/* Teks di Tengah & Bawah Lingkaran */}
                  <div className="relative z-10 flex h-full flex-col items-center justify-center pt-3 text-center">
                    <p className="text-[28px] font-bold leading-none tracking-tight text-[#144659]">
                      {money(left)}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-[#3A6878]">
                      budget left
                    </p>
                    <p className="mt-7 text-[10px] font-semibold text-[#104256]">
                      {leftPct}% remaining
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Tengah: $165 spent */}
              <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <div>
                  <p className="text-[16px] font-bold text-[#144659]">
                    ${spent % 1 === 0 ? spent : spent.toFixed(2)} spent
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-[#557D8C]">
                    of ${TOTAL_BUDGET} this month
                  </p>
                </div>

                <span
                  className="mt-1 inline-flex w-[112px] items-center justify-center rounded-[6px] border border-[#A6CA7E] py-1 text-[10.5px] font-semibold text-[#356327] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  style={{
                    background:
                      "linear-gradient(180deg, #F3FAEC 0%, #D9EECE 100%)",
                  }}
                >
                  {left >= 0 ? "On budget" : "Over budget"}
                </span>

                <p className="mt-0.5 text-[11px] font-medium text-[#4D7786]">
                  13 days to go
                </p>
              </div>

              {/* Kanan: Kapsul "Eat smart, spend smart!" & Maskot Duduk */}
              <div className="flex flex-col items-center justify-end">
                <div className="mb-2 rounded-full border border-[#6DA5BE] bg-[#F5FBFD] px-4 py-1.5 text-[11px] font-medium whitespace-nowrap text-[#1E4F61] shadow-2xs">
                  Eat smart, spend smart!
                </div>
                <img
                  src="/mascot-sit.svg"
                  alt="Nexora Mascot with water bottle"
                  onError={(e) => {
                    e.currentTarget.src = "/mascot-stretching.svg";
                  }}
                  className="h-[125px] w-auto object-contain drop-shadow-[0_8px_14px_rgba(16,88,110,0.22)]"
                />
              </div>
            </div>
          </section>

          {/* Kartu Kanan: Cost per 10g protein */}
          <section className={`${aeroCard} flex flex-col justify-between p-6`}>
            <div>
              <h2 className="text-[16px] font-bold text-[#144659]">
                Cost per 10g protein
              </h2>

              <div className="mt-3.5 flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#D2EBC6] bg-[#EAF6E3] text-[#4C8A3A]">
                <Icon name="fork" className="h-4 w-4" />
              </div>

              <p className="mt-3 text-[34px] font-bold leading-none tracking-tight text-[#144659]">
                $0.42
              </p>
              <p className="mt-2 text-xs font-medium text-[#3F6B7B]">
                Your food budget, working harder.
              </p>

              <span
                className="mt-3.5 inline-block rounded-[6px] border border-[#A6CA7E] px-3 py-1 text-[10.5px] font-semibold text-[#356327] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                style={{
                  background:
                    "linear-gradient(180deg, #F3FAEC 0%, #D9EECE 100%)",
                }}
              >
                ↓ $0.06 vs. last month
              </span>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-[#557D8C]">
              Based on $110 meal prep spend
              <br />
              and 2,620g protein this month.
            </p>
          </section>
        </div>

        {/* ================= 3. BARIS TENGAH: 3 KARTU KATEGORI ================= */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {INITIAL_CATEGORIES.map((c) => {
            const used = expenses
              .filter((e) => e.cat === c.name)
              .reduce((sum, e) => sum + e.amount, 0);
            const pct = Math.min(100, Math.round((used / c.budget) * 100));
            const catLeft = Math.max(0, c.budget - used);

            return (
              <section
                key={c.name}
                className={`${aeroCard} flex flex-col justify-between gap-3 p-5`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-[8px] border ${c.iconBg}`}
                  >
                    <Icon name={c.icon} className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#235466]">
                    {c.name}
                  </h3>
                </div>

                <p className="mt-1 text-[25px] font-bold leading-none text-[#144659]">
                  {money(used)}{" "}
                  <span className="ml-1 text-[11.5px] font-normal text-[#557D8C]">
                    of ${c.budget} budget
                  </span>
                </p>

                {/* Progress Bar Kategori */}
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#E8F1F5] p-[1px] shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      background: c.barGrad,
                    }}
                  />
                </div>

                <p className="text-[11px] font-medium text-[#4D7786]">
                  {pct}% used · ${catLeft % 1 === 0 ? catLeft : catLeft.toFixed(2)} left
                </p>
              </section>
            );
          })}
        </div>

        {/* ================= 4. BARIS BAWAH: TABEL RECENT EXPENSES ================= */}
        <section className={`${aeroCard} flex flex-col gap-3 p-6`}>
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#144659]">
              Recent expenses
            </h2>

            {/* Tombol Glossy "+ Add expense" */}
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="relative flex h-[34px] cursor-pointer items-center justify-center overflow-hidden rounded-[8px] border border-[#147FA8] px-4 text-xs font-semibold text-white shadow-[0_3px_8px_rgba(20,125,170,0.28),inset_0_1px_1px_rgba(255,255,255,0.9)] transition hover:brightness-105 active:scale-95"
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
                + Add expense
              </span>
            </button>
          </div>

          <div className="mt-1 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3EFF4] text-[10px] font-bold uppercase tracking-wider text-[#557D8C]">
                  <th className="w-[150px] py-2.5">DATE</th>
                  <th className="py-2.5">EXPENSE</th>
                  <th className="w-[210px] py-2.5">CATEGORY</th>
                  <th className="w-[120px] py-2.5 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6F1F5]">
                {expenses.map((e) => (
                  <tr
                    key={e.id}
                    className="transition-colors hover:bg-[#F3FAFD]/70"
                  >
                    <td className="py-3.5 text-[11.5px] text-[#557D8C]">
                      {e.date}
                    </td>
                    <td className="py-3.5 text-[13px] font-medium text-[#1D4E60]">
                      {e.name}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block w-[160px] rounded-[7px] border py-1 text-center text-[10.5px] font-medium ${
                          CAT_BADGE_STYLE[e.cat] ||
                          "border-[#CBE5F4] bg-[#E5F3FA] text-[#236584]"
                        }`}
                      >
                        {e.cat}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-[13px] font-semibold text-[#144659]">
                      {money(e.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Text Halus di Atas Rumput */}
        <footer className="mt-1 flex justify-between px-2 text-[10px] font-medium text-[#1D4E60]/85 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
          <span>A little balance goes a long way.</span>
          <span>Your wellness, at your pace. ♡</span>
        </footer>
      </main>

      {/* ================= MODAL TAMBAH PENGELUARAN ("+ Add expense") ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d3545]/35 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-white bg-[#F2FAFD] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#144659]">
                Add New Expense
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="cursor-pointer text-sm font-bold text-[#5A808E] hover:text-[#144659]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="mt-4 space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#235466]">
                  Expense Item
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Chicken breast & broccoli"
                  className="w-full rounded-lg border border-[#BCE0EC] bg-white px-3 py-2 text-xs text-[#144659] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#235466]">
                    Category
                  </label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full rounded-lg border border-[#BCE0EC] bg-white px-2.5 py-2 text-xs text-[#144659] focus:outline-none"
                  >
                    <option value="High-protein meal prep">
                      High-protein meal prep
                    </option>
                    <option value="Supplements">Supplements</option>
                    <option value="Gym membership">Gym membership</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#235466]">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="e.g. 15.00"
                    className="w-full rounded-lg border border-[#BCE0EC] bg-white px-3 py-2 text-xs text-[#144659] focus:outline-none"
                  />
                </div>
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}