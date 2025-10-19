import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import storiesData from "@/data/stories.json";

export default function Page() {
  const { stories } = storiesData;

  return (
    <main className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <Link key={story.id} href={`/stories/${story.id}`}>
          <StoryCard story={story} />
        </Link>
      ))}
    </main>
  );
}
