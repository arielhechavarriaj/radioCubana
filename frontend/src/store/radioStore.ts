import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Radio } from '../types/radio';
import { radios } from '../data/radios';

interface RadioStore {
  radios: Radio[];
  currentRadio: Radio | null;
  isPlaying: boolean;
  volume: number;
  searchQuery: string;
  selectedCategory: string;
  selectedProvince: string;
  favorites: string[];
  layout: 'list' | 'grid';
  theme: 'light' | 'dark';
  play: (radio: Radio) => void;
  pause: () => void;
  stop: () => void;
  setVolume: (vol: number) => void;
  toggleFavorite: (radioId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedProvince: (prov: string) => void;
  setLayout: (layout: 'list' | 'grid') => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useRadioStore = create<RadioStore>()(
  persist(
    (set, get) => ({
      radios,
      currentRadio: null,
      isPlaying: false,
      volume: 0.7,
      searchQuery: '',
      selectedCategory: 'TODAS',
      selectedProvince: 'TODAS',
      favorites: [],
      layout: 'list',
      theme: 'dark',
      play: (radio) => set({ currentRadio: radio, isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      stop: () => set({ currentRadio: null, isPlaying: false }),
      setVolume: (vol) => set({ volume: vol }),
      toggleFavorite: (radioId) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(radioId)
            ? favorites.filter(id => id !== radioId)
            : [...favorites, radioId],
        });
      },
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),
      setSelectedProvince: (prov) => set({ selectedProvince: prov }),
      setLayout: (layout) => set({ layout }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'radio-storage',
      partialize: (state) => ({
       favorites: state.favorites,
       volume: state.volume,
       layout: state.layout,
       theme: state.theme,
        }),
    }
  )
);