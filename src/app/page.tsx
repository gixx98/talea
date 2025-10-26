'use client';

import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import storiesData from "@/data/stories.json";
import { useState } from "react";
import { Story } from "@/types/story";

// Pill categories as shown in your image
const PILL_CATEGORIES = [
  "Bedtime favorites",
  "Quick 5-Minute Reads",
  "Animal Adventures",
  "Toddler Time",
  "Learning Fun",
  "Giggle Time",
  "Adventure Seekers",
];

export default function Page() {
  const { stories } = storiesData as { stories: Story[] };
  const [selected, setSelected] = useState<string | null>(null);

  // Filter stories based on selected pill
  const filteredStories =
    selected === null
      ? stories
      : stories.filter((story) => story.category === selected);

  return (
    <>
      <h1 className="px-6 pt-6 max-w-5xl mx-auto text-center text-2xl font-bold text-balance">
        Interactive stories for kids
      </h1>
      <p className="px-6 max-w-5xl mx-auto text-center text-balance mb-6">
        Beautiful, audio-enhanced stories that parents and children can enjoy together.
        Watch their eyes light up when animals speak and stories sing.
      </p>

      {/* Pill Filter */}
      <div className="flex gap-3 mb-8 max-w-5xl mx-auto px-6 justify-start overflow-x-auto py-2 scrollbar-hide">
        {PILL_CATEGORIES.map((pill) => (
          <button
            key={pill}
            className={`flex-shrink-0 px-5 py-2 rounded-full border whitespace-nowrap ${
              selected === pill
                ? "bg-white border-red-400 text-red-900"
                : "border-pink-100 bg-white text-red-900"
            } text-base font-medium transition-all`}
            onClick={() => setSelected(selected === pill ? null : pill)}
          >
            {pill}
          </button>
        ))}
      </div>

      <main className="grid p-4 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <Link key={story.id} href={`/stories/${story.id}`}>
              <StoryCard story={story} />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No stories found.</p>
        )}
      </main>
    </>
  );
}
