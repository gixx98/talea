'use client';


import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import storiesData from "@/data/stories.json";
import { useState } from "react";
import { Story } from "@/types/story";

export default function Page() {
  const { stories } = storiesData as { stories: Story[] };
  const [query, setQuery] = useState('');

  const filtered = stories.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <h1 className="px-6 pt-6 max-w-5xl mx-auto text-center text-2xl font-bold text-balance">
        Interactive stories for kids
      </h1>
      <p className="px-6 max-w-5xl mx-auto text-center text-balance mb-6">
        Beautiful, audio-enhanced stories that parents and children can enjoy together.
        Watch their eyes light up when animals speak and stories sing.
      </p>

      {/* Search Input */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <input
          type="text"
          placeholder="Search stories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <main className="grid p-4 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {filtered.length > 0 ? (
          filtered.map((story) => (
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