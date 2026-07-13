import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import CartDropdown from "../CartDropdown";
import { useCart } from "../../context/CartContext";
import { IconShare } from "../account/icons";

export default function WishlistContentHeader({ itemCount = 12 }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-nova-black">
        My Wishlist ({itemCount})
      </h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {items.length}
              </span>
            )}
          </button>
          <CartDropdown
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-nova-border bg-white px-4 py-2 text-sm font-medium text-nova-black transition-colors hover:bg-gray-50"
        >
          <IconShare />
          Share
        </button>
      </div>
    </div>
  );
}
