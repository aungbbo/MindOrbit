import { useState, useRef, useEffect } from "react";
import "./App.css";
import lofiChillGif from "./assets/lofi-chill.gif";
import lofiChillMp3 from "./assets/lofi-chill.mp3";
import lofiCozyGif from "./assets/lofi-cozy.gif";
import lofiCozyMp3 from "./assets/lofi-cozy.mp3";
import lofiSpringGif from "./assets/lofi-spring.gif";
import lofiSpringMp3 from "./assets/lofi-spring.mp3";
import lofiStudyGif from "./assets/lofi-study.gif";
import lofiStudyMp3 from "./assets/lofi-study.mp3";
import lofiWinterGif from "./assets/lofi-winter.gif";
import lofiWinterMp3 from "./assets/lofi-winter.mp3";

interface Track {
  id: number;
  title: string;
  gif: string;
  audio: string;
}

const tracks: Track[] = [
  { id: 1, title: "Lofi Chill", gif: lofiChillGif, audio: lofiChillMp3 },
  { id: 2, title: "Lofi Cozy", gif: lofiCozyGif, audio: lofiCozyMp3 },
  { id: 3, title: "Lofi Spring", gif: lofiSpringGif, audio: lofiSpringMp3 },
  { id: 4, title: "Lofi Study", gif: lofiStudyGif, audio: lofiStudyMp3 },
  { id: 5, title: "Lofi Winter", gif: lofiWinterGif, audio: lofiWinterMp3 },
];

function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];
  const otherTracks = tracks.filter((_, index) => index !== currentTrackIndex);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    // Prevent scrolling when music player is mounted
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling when component unmounts
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="music-player-container">
      <audio ref={audioRef} src={currentTrack.audio} onEnded={handleNext} />

      {/* Main Player */}
      <div className="main-player">
        <div className="player-gif-container">
          <img
            src={currentTrack.gif}
            alt={currentTrack.title}
            className="player-gif"
          />
        </div>

        <h2 className="player-title">{currentTrack.title}</h2>

        <div className="player-controls">
          <button
            className="control-btn"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            className="control-btn play-btn"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            className="control-btn"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Other Tracks List */}
      <div className="tracks-list">
        <h3 className="tracks-list-title">Other Tracks</h3>
        <div className="tracks-grid">
          {otherTracks.map((track) => {
            const originalIndex = tracks.findIndex((t) => t.id === track.id);
            return (
              <div
                key={track.id}
                className="track-item"
                onClick={() => handleTrackSelect(originalIndex)}
              >
                <img
                  src={track.gif}
                  alt={track.title}
                  className="track-thumbnail"
                />
                <div className="track-info">
                  <span className="track-name">{track.title}</span>
                </div>
                <button
                  className="track-play-btn"
                  aria-label={`Play ${track.title}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
