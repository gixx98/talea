'use client';

import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import storiesData from "@/data/stories.json";
import { useState } from "react";
import { Story } from "@/types/story";

// Pill categories as shown in your image
const PILL_CATEGORIES = [
  "All",
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
  const [selected, setSelected] = useState<string>("All");

  const filteredStories =
    selected === "All" || !selected
      ? stories
      : stories.filter((story) => story.category === selected);

  return (
    <>
      {/* <h1 className="px-6 pt-6 mb-1 max-w-5xl mx-auto text-center text-2xl font-bold text-balance">
        Interactive stories for kids
      </h1>
      <p className="px-6 max-w-5xl mx-auto text-center text-balance mb-6">
        Beautiful, audio-enhanced stories that parents and children can enjoy together.
      </p> */}

      {/* Pill Filter */}
      <p className="px-4 max-w-5xl mx-auto text-2xl font-medium text-balance my-3">
        Stories
      </p>
      <div className="flex gap-2 max-w-5xl mx-auto px-4 justify-start overflow-x-auto py-1 scrollbar-hide">
        {PILL_CATEGORIES.map((pill) => (
          <button
            key={pill}
            className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full border whitespace-nowrap cursor-pointer hover:bg-red-50 custom-pill 
              ${selected === pill
                ? "custom-pill-active"
                : "custom-pill-inactive"
              } text-base font-medium transition-all`}
            onClick={() => setSelected(pill)}
          >
            {pill}
          </button>
        ))}
      </div>

      <main className="grid p-4 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
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
