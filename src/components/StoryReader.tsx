"use client";

import { useMemo } from "react";
import AudioButton from "./AudioButton";
import { Story } from "@/types/story"
import Image from 'next/image';


export default function StoryReader({ story }: { story: Story }) {
  const parsedContent = useMemo(() => {
    const parts = story.content.split(/\[sound:(.*?)\]/g);
    return parts.map((part, i) => {
      const marker = story.audioMarkers.find((m) => m.sound === part.trim());
      if (marker)
        return (
          <AudioButton
            key={i}
            label={marker.label}
            filePath={marker.url}
          />
        );
      return <span key={i}>{part}</span>;
    });
  }, [story]);

    return (
        <article className="max-w-2xl mx-auto p-6 space-y-6">
        <Image
        src={story.coverImage}
        alt={story.title}
        className="w-full h-64 object-cover rounded-2xl"
      />
        <header>
            <h1 className="text-3xl font-bold mb-1">{story.title}</h1>
            <p className="text-gray-600 text-sm">
            {story.readingTime} · Ages {story.ageRange}
            </p>
        </header>
        <div className="prose prose-lg text-gray-800 leading-relaxed">
            {parsedContent}
        </div>
        </article>
    );
    }
