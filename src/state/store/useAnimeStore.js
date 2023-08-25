import { create } from "zustand";

const useAnimeStore = create((set) => ({
  anime: null,
  setAnime: (newAnime) => set({ anime: newAnime }),
}));

export default useAnimeStore;
