"use client";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Pause, Volume2 } from "lucide-react";
import { AudioButtonProps } from "@/types/story";

export default function AudioButton({ label, filePath }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0 });
  const soundRef = useRef<Howl | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Measure button dimensions after mount
  useEffect(() => {
    if (buttonRef.current) {
      const updateDimensions = () => {
        if (buttonRef.current) {
          setButtonDimensions({
            width: buttonRef.current.offsetWidth,
            height: buttonRef.current.offsetHeight,
          });
        }
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [label]); // Re-measure if label changes

  useEffect(() => {
    soundRef.current = new Howl({
      src: [filePath],
      preload: true,
      html5: true,
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      },
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      soundRef.current?.unload();
    };
  }, [filePath]);

  useEffect(() => {
    const updateProgress = () => {
      if (!soundRef.current || !isPlaying) return;

      const seek = soundRef.current.seek() as number;
      const duration = soundRef.current.duration();

      if (duration > 0) {
        const newProgress = (seek / duration) * 100;
        setProgress(newProgress);
      }

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      updateProgress();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.stop();
      setIsPlaying(false);
      setProgress(0);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  // Generate SVG path for pill shape
  const pillPath = buttonDimensions.width > 0 && buttonDimensions.height > 0
    ? (() => {
        const { width, height } = buttonDimensions;
        const radius = height / 2;
        const straightWidth = width - height;

        // Start at top-left, move clockwise around the pill
        return [
          `M ${radius} 0`,
          `L ${radius + straightWidth} 0`,
          `A ${radius} ${radius} 0 0 1 ${radius + straightWidth} ${height}`,
          `L ${radius} ${height}`,
          `A ${radius} ${radius} 0 0 1 ${radius} 0`,
        ].join(" ");
      })()
    : "";

  // Calculate path length for the pill shape
  const pathLength = buttonDimensions.width > 0 && buttonDimensions.height > 0
    ? (() => {
        const { width, height } = buttonDimensions;
        const radius = height / 2;
        const straightWidth = width - height;
        const circumference = 2 * Math.PI * radius;
        return 2 * straightWidth + circumference;
      })()
    : 0;

  const strokeDashoffset = pathLength * (1 - progress / 100);

  return (
    <div className="relative inline-block" style={{ padding: '2px' }}>
      {/* Button */}
      <button
        ref={buttonRef}
        onClick={togglePlay}
        className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label={`${isPlaying ? "Pause" : "Play"} sound: ${label}`}
        aria-pressed={isPlaying}
      >
        {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />} {/* ← switch here */}
        {label}
      </button>

      {/* SVG overlay for progress stroke */}
      {pillPath && (
        <svg
          className="absolute pointer-events-none"
          style={{
            width: "calc(100% + 4px)",
            height: "calc(100% + 4px)",
            left: "-2px",
            top: "-2px",
          }}
          aria-hidden="true"
          viewBox={`-2 -2 ${buttonDimensions.width + 4} ${buttonDimensions.height + 4}`}
        >
          <path
            d={pillPath}
            fill="none"
            stroke="rgb(59 130 246)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: isPlaying ? "none" : "stroke-dashoffset 0.2s ease",
            }}
            transform="translate(0, 0)"
          />
        </svg>
      )}
    </div>
  );
}