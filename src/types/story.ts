export interface AudioMarker {
  position: number;
  sound: string;
  label: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  readingTime: string;
  ageRange: string;
  coverImage: string;
  audioMarkers?: AudioMarker[];
}

export interface AudioButtonProps {
  sound: string;
  label: string;
  className?: string;
}
