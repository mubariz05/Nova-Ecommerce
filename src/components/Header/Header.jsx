import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const { items } = useCart();
  const cartCount =
    items?.reduce((sum, item) => sum + (item.quantity ?? 1), 0) ?? 0;

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm px-4 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-4">
      <Link
        to="/"
        className="text-2xl font-bold text-nova-black hover:text-blue-600 transition tracking-wide"
      >
        NOVA COMMERCE
      </Link>

      <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-nova-black/80 flex-wrap justify-center">
        <Link to="/women/dresses" className="hover:text-blue-600 transition">
          WOMEN
        </Link>
        <Link to="/" className="hover:text-blue-600 transition">
          MEN
        </Link>
        <Link to="/" className="hover:text-blue-600 transition">
          ELECTRONICS
        </Link>
        <Link to="/" className="hover:text-blue-600 transition">
          HOME
        </Link>
        <Link to="/" className="hover:text-blue-600 transition">
          SALE
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="sneakers"
            className="w-40 sm:w-56 pl-4 pr-9 py-2 rounded-full border border-gray-300 bg-gray-50 text-sm text-nova-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <button
          type="button"
          className="text-nova-black/80 hover:text-blue-600 transition"
          aria-label="Wishlist"
        >
          <Heart size={20} />
        </button>

        <Link
          to="/shopping/cart"
          className="relative text-nova-black/80 hover:text-blue-600 transition"
          aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold leading-none text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/login"
          className="text-nova-black/80 hover:text-blue-600 transition"
          aria-label="Account"
        >
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}
