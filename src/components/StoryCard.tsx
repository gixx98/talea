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
    <div className="rounded-2xl hover:scale-103 transition-transform  cursor-pointer">
      <Image
        src={story.coverImage}
        alt={story.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-xl mb-1"
      />
      <h2 className="text-lg font-semibold">{story.title}</h2>
      <p className="text-sm text-gray-700">
        {story.readingTime} · Ages {story.ageRange}
      </p>
    </div>
  );
}
