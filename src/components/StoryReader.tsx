"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AudioButton from "./AudioButton";
import { Story } from "@/types/story";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function StoryReader({ story }: { story: Story }) {
  const router = useRouter();

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
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="cursor-pointer text-[#EF503D] bg-transparent hover:bg-[#ffebeb] text-sm font-medium mb-2 flex items-center gap-1 transition-colors rounded-lg px-2 py-2"
      >
        <ArrowLeft size={16} />
        Back to stories
      </button>




      <Image
        src={story.coverImage}
        alt={story.title}
        width={300}
        height={200}
        className="w-full h-64 object-cover rounded-2xl"
      />

      <header>
        <h1 className="text-3xl font-bold mb-1">{story.title}</h1>
        <p className="text-sm custom-color-text">
          {story.readingTime} • Ages {story.ageRange}
        </p>
      </header>

      <div className="prose prose-lg leading-relaxed custom-color-text">
        {parsedContent}
      </div>
    </article>
  );
}
