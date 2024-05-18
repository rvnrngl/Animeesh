import { create } from "zustand";

export const useAnimeStore = create((set) => ({
  currentEpisode: undefined,
  setCurrentEpisode: (data) => set({ currentEpisode: data }),
  removeCurrentEpisode: () => set({ currentEpisode: undefined }),
}));
