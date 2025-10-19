import { notFound } from "next/navigation";
import storiesData from "@/data/stories.json";
import StoryReader from "../../../components/StoryReader";

interface AudioMarker {
  position: number;
  sound: string;
  label: string;
}

interface Story {
  id: string;
  title: string;
  content: string;
  audioMarkers: AudioMarker[];
  readingTime: string;
  ageRange: string;
  coverImage: string;
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = (storiesData.stories as Story[]).find((s) => s.id === id);
  if (!story) return notFound();

  return <StoryReader story={story} />;
}
