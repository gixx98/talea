import Image from 'next/image';

interface Story {
  id: string;
  title: string;
  content: string;
  readingTime: string;
  ageRange: string;
  coverImage: string;
}

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div className="rounded-2xl cursor-pointer">
      <div className="overflow-hidden rounded-xl mb-1">
        <Image
          src={story.coverImage}
          alt={story.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h2 className="text-base font-medium custom-color-text">{story.title}</h2>
      <p className="text-sm text-[var(--foreground-secondary)]">
        {story.readingTime} · Ages {story.ageRange}
      </p>
    </div>
  );
}

