import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  "Overview",
  "Money & meals",
  "Workout planner",
  "Recovery room",
  "My progress",
  "Notifications",
  "Calendar",
];

// Pemetaan nama menu ke nama state page di App.jsx
const ROUTE_MAP = {
  "Overview": "overview",
  "Money & meals": "money",
  "Workout planner": "workout",
  "Recovery room": "recovery",
  "My progress": "progress",
  "Notifications": "notification",
  "Calendar": "calendar",
};

export default function NexoraUserPage({ onBack, onNavigate, onSignOut }) {
  const [profile, setProfile] = useState(() => {
    // Ambil data tersimpan dari localStorage jika ada
    const saved = localStorage.getItem("nexora_user_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback ke default jika gagal parse
      }
    }
    return {
      fullName: "Student Member",
      university: "Universitas Gadjah Mada",
      monthlyBudget: "1.500.000",
      proteinTarget: "120",
      weeklyWorkouts: "4 sessions",
      sleepGoal: "8 hours",
    };
  });

  const [savedNotice, setSavedNotice] = useState(false);

  // Fungsi navigasi serbaguna (mendukung prop onBack, onNavigate, dan CustomEvent)
  const goToRoute = (routeKey) => {
    if (routeKey === "overview" && onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate(routeKey);
    }
    window.location.hash = routeKey;
    window.dispatchEvent(new CustomEvent("nexora-navigate", { detail: routeKey }));
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    if (savedNotice) setSavedNotice(false);
  };

  const handleSave = () => {
    // Simpan data profile ke localStorage
    localStorage.setItem("nexora_user_profile", JSON.stringify(profile));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleSignOutClick = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      goToRoute("landing");
    }
  };

  return (
    <div
      className="min-h-screen w-full font-inter text-[#163A4A] bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage:
          "url('/bg-frutiger.png'), url('/BG-barbel.svg'), linear-gradient(180deg, #32b7f0 0%, #8be0ff 55%, #73cb36 100%)",
      }}
    >
      
      {/* MAIN CONTAINER */}
      <main className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 pt-10 pb-14 flex-1 flex flex-col">
        {/* 2. PAGE TITLE, BACK BUTTON & SAVE CHANGES CTA */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-9">
          <div>
            {/* Tombol Kembali ke Overview */}
            <button
              type="button"
              onClick={() => goToRoute("overview")}
              className="mb-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/90 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#163A4A] shadow-xs backdrop-blur-md transition hover:bg-white active:scale-95"
            >
              ← Back to Overview
            </button>

            <h1 className="text-[#163A4A] text-3xl sm:text-4xl font-bold tracking-tight">
              My Profile
            </h1>
            <p className="text-[#163A4A]/85 text-base mt-2">
              Manage your student plan, health targets, and preferences.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {savedNotice && (
              <span className="text-xs font-semibold text-[#247657] bg-[#DAF3E5] px-3.5 py-2 rounded-full">
                ✓ Saved!
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="cursor-pointer inline-flex items-center justify-center px-9 py-3.5 rounded-[26px] border-[1.5px] border-[#E2FAFF] bg-gradient-to-b from-[#8DE5F6] via-[#2CB7DE] to-[#087EAF] shadow-[0_5px_14px_0_rgba(5,92,133,0.20),inset_0_2px_2px_rgba(255,255,255,0.65)] hover:brightness-105 active:scale-[0.99] transition-all text-white text-base font-semibold whitespace-nowrap"
            >
              Save changes
            </button>
          </div>
        </section>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* 3. LEFT COLUMN: PROFILE CARD + MONTHLY OVERVIEW */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Student Profile Summary Card */}
            <div className="rounded-3xl border-[1.5px] border-white bg-[rgba(255,255,255,0.85)] backdrop-blur-md shadow-[0_10px_30px_0_rgba(15,64,77,0.10)] p-8 flex flex-col items-center text-center">
              <div className="w-[136px] h-[136px] rounded-full border-4 border-white shadow-[0_4px_15px_0_rgba(13,102,102,0.12)] bg-[#E4F6F8] overflow-hidden flex items-center justify-center">
                <img
                  src="/mascot-iconstate.svg"
                  alt="Nexora mascot avatar"
                  onError={(e) => {
                    e.currentTarget.src = "/mascot-stretching.svg";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-[#163A4A] text-[26px] font-semibold mt-5">
                {profile.fullName || "Student Member"}
              </h2>
              <p className="text-[#5A7B8C] text-[15px] mt-1">
                student@mail.ugm.ac.id
              </p>

              <div className="mt-5 inline-flex items-center gap-2.5 px-5 py-2 rounded-[18px] bg-[#DAF3E5]">
                <span className="text-[#247657] text-[15px] font-semibold">
                  ✓
                </span>
                <span className="text-[#247657] text-sm font-semibold">
                  Student Plan Active
                </span>
              </div>

              <div className="w-full h-px bg-[#D4E5E5] my-6" />

              <p className="text-[#5A7B8C] text-[13px]">
                A little balance, every day.
              </p>
            </div>

            {/* Monthly Overview Card */}
            <div className="rounded-[20px] border-[1.5px] border-white bg-[rgba(224,250,240,0.92)] backdrop-blur-md shadow-[0_10px_30px_0_rgba(15,64,77,0.10)] p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[#163A4A] text-[21px] font-semibold">
                  Monthly overview
                </h3>
                <p className="text-[#5A7B8C] text-[13px] mt-1">
                  Your month, in a healthy balance.
                </p>

                {/* 3-Column Metrics */}
                <div className="grid grid-cols-3 items-center my-7">
                  <div className="pr-3">
                    <p className="text-[#163A4A] text-[24px] font-semibold leading-tight">
                      12
                    </p>
                    <p className="text-[#5A7B8C] text-[13px] mt-1">Workouts</p>
                  </div>

                  <div className="px-3 border-x border-[#BFDCD2]">
                    <p className="text-[#163A4A] text-[20px] font-semibold leading-tight whitespace-nowrap">
                      Rp 1.500k
                    </p>
                    <p className="text-[#5A7B8C] text-[13px] mt-1">Budget</p>
                  </div>

                  <div className="pl-3">
                    <p className="text-[#163A4A] text-[23px] font-semibold leading-tight whitespace-nowrap">
                      7h 45m
                    </p>
                    <p className="text-[#5A7B8C] text-[13px] mt-1">Avg Sleep</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full h-px bg-[#C9E3D9] mb-4" />
                <p className="text-[#247657] text-xs font-medium">
                  November 2026
                </p>
              </div>
            </div>
          </div>

          {/* 4. RIGHT COLUMN: PERSONAL & FITNESS TARGETS FORM */}
          <section className="lg:col-span-8 rounded-3xl border-[1.5px] border-white bg-[rgba(255,255,255,0.85)] backdrop-blur-md shadow-[0_10px_30px_0_rgba(15,64,77,0.10)] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-[#163A4A] text-2xl font-semibold">
                Personal &amp; Fitness Targets
              </h2>
              <p className="text-[#5A7B8C] text-sm mt-1">
                Make your plan work for your campus life.
              </p>

              <div className="w-full h-px bg-[#D2E4E8] my-6" />

              {/* 2x3 Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-6">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="text-[#5A7B8C] text-[13px] font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="h-14 px-4 rounded-xl border border-[#C6DEE5] bg-[rgba(255,255,255,0.90)] text-[#163A4A] text-base font-medium focus:outline-none focus:border-[#36B9DC] transition-colors"
                  />
                  <span className="text-[#5A7B8C] text-xs mt-2">
                    The name shown on your profile.
                  </span>
                </div>

                {/* University / Campus */}
                <div className="flex flex-col">
                  <label className="text-[#5A7B8C] text-[13px] font-medium mb-2">
                    University / Campus
                  </label>
                  <input
                    type="text"
                    value={profile.university}
                    onChange={(e) => handleChange("university", e.target.value)}
                    className="h-14 px-4 rounded-xl border border-[#C6DEE5] bg-[rgba(255,255,255,0.90)] text-[#163A4A] text-base font-medium focus:outline-none focus:border-[#36B9DC] transition-colors"
                  />
                  <span className="text-[#5A7B8C] text-xs mt-2">
                    Your student community.
                  </span>
                </div>

                {/* Monthly Fitness Budget */}
                <div className="flex flex-col">
                  <label className="text-[#5A7B8C] text-[13px] font-medium mb-2">
                    Monthly Fitness Budget (Rp)
                  </label>
                  <div className="h-14 px-4 rounded-xl border border-[#C6DEE5] bg-[rgba(255,255,255,0.90)] flex items-center justify-between focus-within:border-[#36B9DC] transition-colors">
                    <input
                      type="text"
                      value={profile.monthlyBudget}
                      onChange={(e) =>
                        handleChange("monthlyBudget", e.target.value)
                      }
                      className="w-full bg-transparent text-[#163A4A] text-base font-medium focus:outline-none"
                    />
                    <span className="text-[#5A7B8C] text-[13px] ml-2 shrink-0">
                      Rp
                    </span>
                  </div>
                  <span className="text-[#5A7B8C] text-xs mt-2">
                    For meals, movement, and feeling good.
                  </span>
                </div>

                {/* Daily Protein Target */}
                <div className="flex flex-col">
                  <label className="text-[#5A7B8C] text-[13px] font-medium mb-2">
                    Daily Protein Target (g)
                  </label>
                  <div className="h-14 px-4 rounded-xl border border-[#C6DEE5] bg-[rgba(255,255,255,0.90)] flex items-center justify-between focus-within:border-[#36B9DC] transition-colors">
                    <input
                      type="text"
                      value={profile.proteinTarget}
                      onChange={(e) =>
                        handleChange("proteinTarget", e.target.value)
                      }
                      className="w-full bg-transparent text-[#163A4A] text-base font-medium focus:outline-none"
                    />
                    <span className="text-[#5A7B8C] text-[13px] ml-2 shrink-0 whitespace-nowrap">
                      g / day
                    </span>
                  </div>
                  <span className="text-[#5A7B8C] text-xs mt-2">
                    A daily goal to support your recovery.
                  </span>
                </div>

                {/* Weekly Workout Target */}
                <div className="flex flex-col">
                  <label className="text-[#5A7B8C] text-[13px] font-medium mb-2">
                    Weekly Workout Target
                  </label>
                  <input
                    type="text"
                    value={profile.weeklyWorkouts}
                    onChange={(e) =>
                      handleChange("weeklyWorkouts", e.target.value)
                    }
                    className="h-14 px-4 rounded-xl border border-[#C6DEE5] bg-[rgba(255,255,255,0.90)] text-[#163A4A] text-base font-medium focus:outline-none focus:border-[#36B9DC] transition-colors"
                  />
                  <span className="text-[#5A7B8C] text-xs mt-2">
                    Small, consistent steps add up.
                  </span>
                </div>

                {/* Sleep Goal */}
                <div className="flex flex-col">
                  <label className="text-[#5A7B8C] text-[13px] font-medium mb-2">
                    Sleep Goal
                  </label>
                  <input
                    type="text"
                    value={profile.sleepGoal}
                    onChange={(e) => handleChange("sleepGoal", e.target.value)}
                    className="h-14 px-4 rounded-xl border border-[#C6DEE5] bg-[rgba(255,255,255,0.90)] text-[#163A4A] text-base font-medium focus:outline-none focus:border-[#36B9DC] transition-colors"
                  />
                  <span className="text-[#5A7B8C] text-xs mt-2">
                    Rest is part of the plan.
                  </span>
                </div>
              </div>
            </div>

            {/* Privacy Info Banner */}
            <div className="mt-8 rounded-[14px] bg-[rgba(235,247,246,0.95)] px-5 py-3.5 flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#DDF1F0] flex items-center justify-center shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#397A78"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <p className="text-[#326F70] text-[13px] font-semibold">
                  Your goals, kept personal.
                </p>
                <p className="text-[#5A7B8C] text-xs mt-0.5">
                  Only you can see and update these targets.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* 5. FOOTER BAR */}
        <footer className="mt-8 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#163A4A] text-[13px] font-medium">
            Built around your student life.
          </p>

          <button
            type="button"
            onClick={handleSignOutClick}
            className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3 rounded-3xl border border-[#DFA7A5] bg-[rgba(255,243,242,0.93)] hover:bg-[#FFE6E4] transition-colors text-[#A44A4D] text-sm font-medium"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 12.75V15H3V3H7.5V5.25M6.75 9H15.75M12.75 12L15.75 9L12.75 6"
                stroke="#AA5052"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sign out
          </button>
        </footer>
      </main>
    </div>
  );
}