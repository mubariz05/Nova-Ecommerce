import { create } from "zustand";

export const useWishlistStore = create((set, get) => ({
  items: [],

  toggleItem: (product) =>
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);

      if (exists) {
        return {
          items: state.items.filter((item) => item.id !== product.id),
        };
      }

      return {
        items: [...state.items, product],
      };
    }),

  isInWishlist: (id) =>
    get().items.some((item) => item.id === id),
}));