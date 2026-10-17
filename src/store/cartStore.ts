import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  quantity: number;
  vendorId?: string;
};

type CartState = {
  items: CartItem[];
  addMany: (items: Omit<CartItem, "quantity">[], quantities: Record<string, number>) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addMany: (items, quantities) =>
    set((state) => {
      const next = [...state.items];
      for (const it of items) {
        const qty = quantities[it.id] ?? 0;
        if (qty <= 0) continue;
        const existing = next.find((x) => x.id === it.id);
        if (existing) existing.quantity += qty;
        else next.push({ ...it, quantity: qty });
      }
      return { items: next };
    }),
  increment: (id) =>
    set((state) => ({
      items: state.items.map((it) =>
        it.id === id ? { ...it, quantity: it.quantity + 1 } : it
      ),
    })),
  decrement: (id) =>
    set((state) => ({
      items: state.items
        .map((it) =>
          it.id === id ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0),
    })),
  remove: (id) =>
    set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
  clear: () => set({ items: [] }),
}));