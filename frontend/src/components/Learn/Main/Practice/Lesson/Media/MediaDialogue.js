import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { ImVolumeMedium } from "react-icons/im";
import LessonContext from "../../../../../../context/LessonContext";
import WordMeaningPopUp from "./WordMeaningPopUp.js";

const MediaDialogue = ({ dialogue }) => {
  const { playSound } = useContext(LessonContext);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const lines = useMemo(() => dialogue?.lines || [], [dialogue]);
  const lineRefs = useRef([]);

  // --- Word meaning popup state ---
  const [popupWord, setPopupWord] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0, width: 0 });

  // compute max character name length to align names
  const maxNameLen = useMemo(
    () => Math.max(0, ...lines.map((l) => l.character?.name?.length || 0)),
    [lines]
  );
  const reservedWidth = `${maxNameLen + 1}ch`;

  // Play video 500ms after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false; // unmute if you want sound after autoplay
        videoRef.current.play().catch(() => { });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Highlight line while video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video || lines.length === 0) return;

    const handleTimeUpdate = () => {
      const currentTimeMs = video.currentTime * 1000;
      const index = lines.findIndex(
        (line) =>
          currentTimeMs >= line.start_time_ms &&
          currentTimeMs < line.end_time_ms
      );
      if (index !== -1) setCurrentLineIndex(index);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [lines]);

  // Toggle play/pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  // Jump to line
  const goToLine = (startTimeMs, endTimeMs) => {
    const video = videoRef.current;
    if (!video) return;

    // Jump to start time
    video.currentTime = startTimeMs / 1000;
    video.play();

    // Clear any previous timeout to avoid conflicts
    if (video.stopTimeout) clearTimeout(video.stopTimeout);

    // Stop video after duration of the line
    const duration = (endTimeMs - startTimeMs) / 1000;
    video.stopTimeout = setTimeout(() => {
      video.pause();
    }, duration * 1000);
  };

  // scroll to current line
  useEffect(() => {
    if (lineRefs.current[currentLineIndex]) {
      lineRefs.current[currentLineIndex].scrollIntoView({
        behavior: "smooth", // smooth scrolling
        block: "center",    // center the element vertically
      });
    }
  }, [currentLineIndex]);

  // Close popup on outside click or scroll
  useEffect(() => {
    const close = () => setPopupWord(null);
    if (popupWord) {
      window.addEventListener("scroll", close, true);
      window.addEventListener("click", close, true);
    }
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("click", close, true);
    };
  }, [popupWord]);

  return (
    <div className="relative" ref={containerRef}>
      <div>
        {/* Title */}
        <h3 className="px-1 font-bold">{dialogue?.video?.title}</h3>

        {/* VIDEO */}
        <video
          ref={videoRef}
          src={dialogue?.video?.url}
          className="w-full shadow cursor-pointer"
          onClick={togglePlayPause}
          muted
        />
      </div>
      {/* DIALOGUE LINES */}
      <div className="mt-2 space-y-2 overflow-y-auto h-[14dvh]">
        {lines.map((line, i) => {
          const isFirstOfBlock =
            i === 0 || line.character?.id !== lines[i - 1].character?.id;

          // --- Render sentence with clickable words ---
          let sentenceContent = line.sentence?.written_form;
          let words = line.sentence?.words || [];
          // If words exist, render each word as a span
          if (words.length > 0) {
            sentenceContent = (
              <span>
                {words.map((word, wi) => (
                  <span
                    key={word.id}
                    className="inline-block cursor-pointer hover:bg-blue-100 rounded px-1"
                    onClick={e => {
                      if (word.audio_url) playSound(word.audio_url);
                      e.stopPropagation();
                      const rect = e.target.getBoundingClientRect();
                      const containerRect = containerRef.current.getBoundingClientRect();
                      setPopupWord(word);
                      setPopupPos({
                        top: rect.bottom, // relative to container
                        left: rect.left - containerRect.left - ((popupWord?.written_form?.length || 6) * 5) / 2, // relative to container
                        width: rect.width,
                      });
                    }}
                  >
                    {word.written_form}
                  </span>
                ))}
              </span>
            );
          }

          return (
            <div
              key={line.start_time_ms}
              ref={(el) => (lineRefs.current[i] = el)}
              className={`p-1 rounded cursor-pointer flex items-center ${i === currentLineIndex
                ? "bg-blue-200 font-bold"
                : "bg-gray-100"
                }`}
              onClick={() => goToLine(line.start_time_ms, line.end_time_ms)}
              dir="auto"
            >
              {/* Character name column */}
              <strong
                className="text-right"
                style={{ width: reservedWidth }}
              >
                {isFirstOfBlock ? `${line.character?.name}:` : ""}
              </strong>

              {/* Sentence (with clickable words if available) */}
              <span className="flex-1">{sentenceContent}</span>

              {/* English equivalent */}
              {line.sentence?.english_equivalent && (
                <span className="mx-2 italic text-gray-600">
                  {line.sentence.english_equivalent}
                </span>
              )}

              {/* Audio button */}
              {line.sentence && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound?.(
                      line.sentence.audio_url || line.sentence.audio
                    );
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <ImVolumeMedium />
                </button>
              )}
            </div>
          );
        })}
      </div>
      {/* WordMeaningPopUp */}
      {popupWord && (
        <WordMeaningPopUp
          word={popupWord}
          style={{
            position: "absolute",
            top: popupPos.top - 28, // small offset below the word
            left: popupPos.left,
            minWidth: popupPos.width,
            maxWidth: 240,
            zIndex: 50,
          }}
        />
      )}
    </div>
  );
};

export default MediaDialogue;
