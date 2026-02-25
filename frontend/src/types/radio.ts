// frontend/src/types/radio.ts
export type RadioCategory = 'INTERNACIONAL' | 'NACIONAL' | 'PROVINCIAL' | 'MUNICIPAL';

export interface Radio {
  id: string;
  title: string;
  category: RadioCategory;
  audioUrl: string;
  country: string;
  province?: string;
  municipality?: string;
  active: boolean;
  imageUrl?: string;
  description?: string;
}