export interface AudioMarker {
  position: number;
  sound: string;
  label: string;
  url: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  audioMarkers: AudioMarker[];
  readingTime: string;
  ageRange: string;
  coverImage: string;
  category:string
}

export interface AudioButtonProps {
  label: string;
  filePath: string;
}
