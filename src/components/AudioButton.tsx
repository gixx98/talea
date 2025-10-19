"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Volume2 } from "lucide-react";
import { AudioButtonProps } from "@/types/story";


export default function AudioButton({ label, filePath }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [filePath],
      preload: true,
      html5: true,
      onend: () => setIsPlaying(false),
    });
    return () => {
      soundRef.current?.unload();
    };
  }, [filePath]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.stop();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium transition"
      aria-label={`Play sound: ${label}`}
    >
      <Volume2 size={16} />
      {label}
    </button>
  );
}
