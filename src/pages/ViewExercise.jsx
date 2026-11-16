import React, { useState } from "react";

const EXERCISES_DATA = {
  "Upper Body": [
    { id: "01", name: "Dumbbell bench press", sets: "3 sets × 10–12 reps", muscle: "Chest", rest: "60s rest" },
    { id: "02", name: "Seated cable row", sets: "3 sets × 10–12 reps", muscle: "Back", rest: "60s rest" },
    { id: "03", name: "Dumbbell shoulder press", sets: "3 sets × 10–12 reps", muscle: "Shoulders", rest: "60s rest" },
    { id: "04", name: "Lat pulldown", sets: "3 sets × 10–12 reps", muscle: "Back", rest: "60s rest" },
    { id: "05", name: "Dumbbell bicep curl", sets: "3 sets × 10–12 reps", muscle: "Biceps", rest: "60s rest" },
    { id: "06", name: "Tricep rope pushdown", sets: "3 sets × 10–12 reps", muscle: "Triceps", rest: "60s rest" },
  ],
  "Lower Body": [
    { id: "01", name: "Barbell back squat", sets: "4 sets × 8–10 reps", muscle: "Quads", rest: "90s rest" },
    { id: "02", name: "Romanian deadlift", sets: "3 sets × 10–12 reps", muscle: "Hamstrings", rest: "75s rest" },
    { id: "03", name: "Walking dumbbell lunges", sets: "3 sets × 12 reps", muscle: "Glutes", rest: "60s rest" },
    { id: "04", name: "Leg extension machine", sets: "3 sets × 12–15 reps", muscle: "Quads", rest: "60s rest" },
    { id: "05", name: "Seated leg curl", sets: "3 sets × 12–15 reps", muscle: "Hamstrings", rest: "60s rest" },
    { id: "06", name: "Standing calf raises", sets: "4 sets × 15 reps", muscle: "Calves", rest: "45s rest" },
  ],
  "Pull-Day": [
    { id: "01", name: "Wide-grip lat pulldown", sets: "4 sets × 10–12 reps", muscle: "Lats", rest: "60s rest" },
    { id: "02", name: "Chest-supported row", sets: "3 sets × 10–12 reps", muscle: "Mid-Back", rest: "60s rest" },
    { id: "03", name: "Cable face pulls", sets: "3 sets × 15 reps", muscle: "Rear Delts", rest: "45s rest" },
    { id: "04", name: "Single-arm dumbbell row", sets: "3 sets × 10 reps", muscle: "Back", rest: "60s rest" },
    { id: "05", name: "Incline dumbbell curl", sets: "3 sets × 12 reps", muscle: "Biceps", rest: "60s rest" },
    { id: "06", name: "Hammer rope curls", sets: "3 sets × 12 reps", muscle: "Forearms", rest: "45s rest" },
  ],
};

const NAV_ITEMS = [
  "Overview",
  "Money & meals",
  "Workout planner",
  "Recovery room",
  "My progress",
  "Notifications",
  "Calendar",
];

export default function ViewExercises({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Upper Body");
  const [completedIds, setCompletedIds] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState("45 min");

  const toggleComplete = (id) => {
    const key = `${activeTab}-${id}`;
    setCompletedIds((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const currentExercises = EXERCISES_DATA[activeTab] || EXERCISES_DATA["Upper Body"];

  return (
    <div
      className="min-h-screen w-full font-inter text-[#163A4A] bg-cover bg-center bg-fixed flex flex-col"
      style={{
        // Pastikan file gambar background Frutiger Aero ditaruh di folder public/ dengan nama ini
        backgroundImage: "url('/BG-barbel.svg'), linear-gradient(180deg, #32b7f0 0%, #8be0ff 55%, #73cb36 100%)",
      }}
    >
    
      

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 pt-10 pb-16 flex-1">
        {/* 2. WORKOUT OVERVIEW HEADER */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
          <div>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("Workout planner")}
              className="cursor-pointer text-[#163A4A] hover:text-[#1494C4] text-sm font-medium inline-flex items-center gap-1.5 mb-3 transition-colors"
            >
              ← Back to Workout Planner
            </button>
            <h1 className="text-[#163A4A] text-3xl sm:text-4xl font-bold tracking-tight">
              {activeTab} — Exercise List
            </h1>
            <p className="text-[#5A7B8C] text-base mt-2">
              {currentExercises.length} exercises • 45–60 min target
            </p>
          </div>

          <button
            type="button"
            // TODO (Ken): Hubungkan ke mode aktif workout / timer countdown
            className="cursor-pointer self-start md:self-auto inline-flex items-center justify-center px-10 py-4 rounded-[27px] border border-[#BCEEF8] bg-gradient-to-b from-[#79DBF1] via-[#36B9DC] to-[#1494C4] shadow-[0_2px_2px_0_rgba(255,255,255,0.70)_inset,0_4px_10px_0_rgba(0,89,115,0.17)] hover:brightness-105 active:scale-[0.99] transition-all text-white text-base font-semibold"
          >
            Start workout →
          </button>
        </section>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* 3. LEFT COLUMN: SESSION EXERCISES (8 cols ~ 65%) */}
          <section className="lg:col-span-8 rounded-3xl border-[1.5px] border-[rgba(255,255,255,0.95)] bg-[rgba(255,255,255,0.85)] backdrop-blur-md shadow-[0_8px_30px_0_rgba(13,71,87,0.12)] p-7">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#163A4A] text-[23px] font-bold">
                Session Exercises
              </h2>
              <span className="text-[#5A7B8C] text-[10px] font-semibold tracking-[0.12em] uppercase">
                0{currentExercises.length} MOVEMENTS
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              {Object.keys(EXERCISES_DATA).map((tab) => {
                const isSelected = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer px-6 py-2 rounded-[18px] text-xs transition-all ${
                      isSelected
                        ? "bg-[#67CFE1] text-[#163A4A] font-semibold shadow-xs"
                        : "bg-[#F3FAFB] text-[#5A7B8C] font-medium hover:bg-[#E4F4F8]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Exercise Cards List */}
            <div className="flex flex-col gap-3.5">
              {currentExercises.map((ex) => {
                const isDone = completedIds.includes(`${activeTab}-${ex.id}`);
                return (
                  <div
                    key={ex.id}
                    className={`rounded-2xl border transition-all px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_2px_4px_0_rgba(18,77,92,0.04)] ${
                      isDone
                        ? "border-[#9CD9C8] bg-[rgba(238,248,244,0.85)]"
                        : "border-[#D9EAF0] bg-[rgba(255,255,255,0.83)]"
                    }`}
                  >
                    {/* Left: Number Badge + Title & Sets */}
                    <div className="flex items-center gap-4">
                      <div className="w-[42px] h-[42px] shrink-0 rounded-[13px] bg-[#E4F6F8] flex items-center justify-center text-[#238A9D] text-base font-semibold">
                        {ex.id}
                      </div>
                      <div>
                        <p
                          className={`text-[#163A4A] text-[17px] font-semibold ${
                            isDone ? "line-through opacity-70" : ""
                          }`}
                        >
                          {ex.name}
                        </p>
                        <p className="text-[#5A7B8C] text-sm mt-0.5">
                          {ex.sets}
                        </p>
                      </div>
                    </div>

                    {/* Right: Muscle Tag, Rest Pill & Checkbox */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 pl-14 sm:pl-0">
                      <span className="px-4 py-1.5 rounded-[13.5px] bg-[#EEF8F4] text-[#4A7F75] text-xs font-medium min-w-[92px] text-center">
                        {ex.muscle}
                      </span>

                      <span className="px-4 py-2 rounded-2xl bg-[#F0F8FB] text-[#5A7B8C] text-xs font-medium min-w-[88px] text-center">
                        {ex.rest}
                      </span>

                      <button
                        type="button"
                        aria-label={`Mark ${ex.name} complete`}
                        onClick={() => toggleComplete(ex.id)}
                        className={`cursor-pointer w-6 h-6 rounded-[7px] border-[1.5px] flex items-center justify-center transition-colors ${
                          isDone
                            ? "border-[#32988A] bg-[#32988A] text-white"
                            : "border-[#A8C5D0] bg-white hover:border-[#36B9DC]"
                        }`}
                      >
                        {isDone && (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. RIGHT COLUMN: TIMER & QUICK FORM TIPS (4 cols ~ 35%) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Session Timer & Cool-Down Card */}
            <div className="rounded-3xl border-[1.5px] border-[rgba(255,255,255,0.95)] bg-[rgba(255,255,255,0.85)] backdrop-blur-md shadow-[0_8px_30px_0_rgba(13,71,87,0.12)] p-7 flex flex-col">
              <h2 className="text-[#163A4A] text-[21px] font-bold">
                Session Timer &amp; Cool-Down
              </h2>
              <p className="text-[#5A7B8C] text-sm mt-1">
                Make time for a stronger you.
              </p>

              {/* Circular Aqua Timer Display */}
              <div className="my-7 mx-auto w-48 h-48 rounded-full border-[6px] border-[#BCEEF8] bg-gradient-to-b from-[#F4FCFE] to-[#E1F6FB] shadow-[0_6px_20px_rgba(54,185,220,0.15),inset_0_2px_6px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center">
                <span className="text-[#163A4A] text-[44px] font-semibold leading-none tracking-tight">
                  {selectedPreset === "60 min" ? "60:00" : "50:00"}
                </span>
                <span className="text-[#5A7B8C] text-[9px] font-semibold tracking-[0.1389em] mt-2.5">
                  READY WHEN YOU ARE
                </span>
              </div>

              {/* Preset Duration Pills */}
              <div className="flex items-center justify-center gap-3 mb-6">
                {["45 min", "60 min"].map((preset) => {
                  const active = selectedPreset === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSelectedPreset(preset)}
                      className={`cursor-pointer px-5 py-2 rounded-[17px] text-sm font-medium border transition-all ${
                        active
                          ? "border-[#83D6E3] bg-[#DBF5F8] text-[#257D90]"
                          : "border-[#DCEBF0] bg-[#F5FAFC] text-[#5A7B8C] hover:bg-[#EAF5F9]"
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>

              {/* Start Timer Glossy CTA */}
              <button
                type="button"
                // TODO (Ken): Hubungkan state countdown timer
                className="cursor-pointer w-full py-3.5 rounded-[26px] border border-[#B8F0FA] bg-gradient-to-b from-[#80DFF0] via-[#40BFDB] to-[#1699C5] shadow-[0_4px_8px_0_rgba(0,89,115,0.14),0_2px_2px_0_rgba(255,255,255,0.70)_inset] hover:brightness-105 active:scale-[0.99] transition-all text-white text-base font-semibold"
              >
                Start Timer
              </button>

              {/* Cool-Down Reminder Banner */}
              <div className="mt-5 rounded-[14px] bg-[#E3F7EC] px-4 py-3.5">
                <p className="text-[#357766] text-[13px] font-semibold">
                  Finish fresh:
                </p>
                <p className="text-[#397369] text-[13px] mt-0.5">
                  5-min treadmill walk to cool down
                </p>
              </div>
            </div>

            {/* Quick Form Tips Card */}
            <div className="rounded-[20px] border border-[#F6FFFA] bg-[rgba(229,248,238,0.95)] backdrop-blur-md p-7 shadow-[0_6px_20px_rgba(13,71,87,0.06)]">
              <h3 className="text-[#163A4A] text-[21px] font-bold mb-4">
                Quick Form Tips
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <span className="text-[#32988A] text-[19px] font-semibold leading-none mt-0.5">
                    •
                  </span>
                  <span className="text-[#406F70] text-[13px] font-medium leading-relaxed">
                    Keep your core engaged on every rep.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#32988A] text-[19px] font-semibold leading-none mt-0.5">
                    •
                  </span>
                  <span className="text-[#406F70] text-[13px] font-medium leading-relaxed">
                    Move slowly. Skip the momentum.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#32988A] text-[19px] font-semibold leading-none mt-0.5">
                    •
                  </span>
                  <span className="text-[#406F70] text-[13px] font-medium leading-relaxed">
                    Exhale as you push or pull.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}