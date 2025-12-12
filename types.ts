export interface PhotoStyle {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface GeneratedImage {
  styleId: string;
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

export type GenerationStatusMap = Record<string, GeneratedImage>;