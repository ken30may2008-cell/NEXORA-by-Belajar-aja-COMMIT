"use client";
import { useState, useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef(null);

  // Inisialisasi YouTube IFrame API secara otomatis
  useEffect(() => {
    // Muat script YouTube IFrame API jika belum ada
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-bg-player", {
        height: "0",
        width: "0",
        videoId: "Cz2YCRmDOFk", // ID Video Frutiger Aero Playlist
        playerVars: {
          autoplay: 0, // Tidak autoplay langsung demi kebijakan browser
          loop: 1,
          playlist: "Cz2YCRmDOFk", // Diperlukan agar loop berfungsi di YouTube API
          controls: 0,
        },
        events: {
          onReady: () => setIsLoaded(true),
          onStateChange: (event) => {
            // Jika video selesai/ended, putar ulang (loop pengaman)
            if (event.data === window.YT.PlayerState.ENDED) {
              playerRef.current.playVideo();
            }
          },
        },
      });
    };

    // Jika API sudah siap sebelumnya
    if (window.YT && window.YT.Player && !playerRef.current) {
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isLoaded) return;
    
    try {
      const state = playerRef.current.getPlayerState();
      // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, -1 = UNSTARTED
      if (state === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.log("Error mengontrol pemutar YouTube:", e);
    }
  };

  return (
    <>
      {/* Elemen Iframe YouTube Tersembunyi */}
      <div id="youtube-bg-player" className="hidden" />

      {/* Floating Widget Music Player di Pojok Kanan Bawah */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-white/80 bg-white/90 px-4 py-2 shadow-xl backdrop-blur-md transition-all hover:bg-white">
        {/* Tombol Play/Pause */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#1279a8] bg-gradient-to-b from-[#69ccf2] to-[#1574a6] text-white shadow-xs transition hover:scale-105 active:scale-95 text-xs"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        {/* Info Playlist */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold text-[#144F60]">Frutiger Aero Playlist</span>
          <span className="text-[8.5px] text-[#7a98a1]">
            {isPlaying ? "Playing background vibe..." : "Click play to vibe"}
          </span>
        </div>
      </div>
    </>
  );
}
