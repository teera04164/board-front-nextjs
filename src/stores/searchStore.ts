import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { SearchState } from "./types";

interface SearchStore {
  searchState: SearchState;

  setSearchText: (text: string) => void;
  toggleCommunity: (communityId: string) => void;
  clearSearch: () => void;
  resetSearch: () => void;
  setSearching: (isSearching: boolean) => void;
}

const initialState: SearchState = {
  searchText: "",
  communityId: "",
  isSearching: false,
};

export const useSearchStore = create<SearchStore>()(
  devtools(
    (set) => ({
      searchState: initialState,

      setSearchText: (text: string) =>
        set(
          (state) => ({
            searchState: {
              ...state.searchState,
              searchText: text,
              isSearching: text.length > 0,
            },
          }),
          false,
          "setSearchText",
        ),

      setSearching: (isSearching: boolean) =>
        set(
          (state) => ({
            searchState: {
              ...state.searchState,
              isSearching,
            },
          }),
          false,
          "setSearching",
        ),

      toggleCommunity: (communityId: string) =>
        set(
          (state) => ({
            searchState: {
              ...state.searchState,
              communityId: state.searchState.communityId === communityId ? "" : communityId,
            },
          }),
          false,
          "toggleCommunity",
        ),

      clearSearch: () =>
        set(
          (state) => ({
            searchState: {
              ...state.searchState,
              searchText: "",
              isSearching: false,
            },
          }),
          false,
          "clearSearch",
        ),

      resetSearch: () => set({ searchState: initialState }, false, "resetSearch"),
    }),
    { name: "search-store" },
  ),
);
