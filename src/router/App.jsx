import { useState, useEffect } from "react";

// 1. Import Navbar dari folder components
import Navbar from "../components/components/Navbar.jsx";
import BackgroundMusic from "../components/Backgroundmusic.jsx";

// 2. Import halaman-halaman dari folder pages
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
  Jika file halaman buatan Baim & Ken lainnya sudah ada di src/pages/, 
  lepas komentar import di bawah ini dan sesuaikan nama filenya:
  
  import MoneyMeals from "../pages/MoneyMeals.jsx";
  import WorkoutPlanner from "../pages/WorkoutPlanner.jsx";
  import SleepSchedule from "../pages/SleepSchedule.jsx";
  import Progress from "../pages/Progress.jsx";
  import Notification from "../pages/Notification.jsx";
  import Calendar from "../pages/Calendar.jsx";
*/

export default function App() {
  const [page, setPage] = useState("landing");

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

  // Daftar halaman awal yang TIDAK memakai Navbar aplikasi
  const isPublicOrAuthPage =
    page === "landing" || page === "signup" || page === "signin";

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Tampilkan Navbar di semua halaman dalam aplikasi */}
      {!isPublicOrAuthPage && (
        <Navbar currentPage={page} onNavigate={goTo} />
      )}

      {!isPublicOrAuthPage && <BackgroundMusic />}
      <div classname="flex-1">
        {page === "overview" && <Overview onNavigate={goTo} />}
      </div>

      {/* 1. HALAMAN PUBLIK & AUTH */}
      {page === "landing" && (
        <LandingPage
          onBegin={() => goTo("signup")}
          onLogin={() => goTo("signin")}
        />
      )}

      {page === "signup" && (
        <SignUpPage
          onSignUpSuccess={() => goTo("overview")}
          onGoToSignIn={() => goTo("signin")}
          onBackToLanding={() => goTo("landing")}
        />
      )}

      {page === "signin" && (
        <SignInPage
          onSignInSuccess={() => goTo("overview")}
          onGoToSignUp={() => goTo("signup")}
          onBackToLanding={() => goTo("landing")}
        />
      )}

      {/* 2. HALAMAN DALAM APLIKASI (Otomatis berada di bawah Navbar) */}
      <div className="flex-1">
        {page === "overview" && <Overview onNavigate={goTo} />}
        
        {page ==="money" && <MoneyMeals onNavigate = {goTo} />}

        {page === "workout" && (
          <WorkoutPlanner
          onNavigate={goTo}
          onViewExercise={() => goTo("view-exercise")}
          />
        )}

        {page === "view-exercise" && (
          <ViewExercise 
          onBack={() => goTo("workout")} 
          onNavigate={goTo} 
          />
        )}

        {page === "recovery" &&  <RecoveryRoom onNavigate ={goTo} />}
        {page === "progress" && <MyProgress onNavigate ={goTo} />}
        {page === "notification" && <Notification onNavigate={goTo} />}
        {page === "calendar" && <Calendar onNavigate={goTo} />} 

        {page === "user" && (
          <UserPage
            onBack={() => goTo("overview")}
            onNavigate={goTo}
            onSignOut={() => goTo("landing")}
          />
        )}
          
        {page === "calendar" && <Calendar onNavigate={goTo}/>}

        {page === "notification" && <Notification onNavigate={goTo}/>}

        
      </div>
    </div>
  );
}