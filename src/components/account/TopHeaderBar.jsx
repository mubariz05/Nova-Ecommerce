import { Link } from "react-router-dom";
import { IconCart, IconClose, IconMenu, IconSearch } from "./icons";

export default function TopHeaderBar({
  title = "Nova Commerce - My Wishlist",
  sidebarOpen,
  onToggleSidebar,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-nova-border bg-white px-4 py-3 shadow-sm lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-nova-gray transition-all duration-200 hover:bg-gray-100 hover:text-nova-black active:scale-95"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <IconClose /> : <IconMenu />}
          </button>
          <p className="truncate text-sm font-semibold text-nova-black">{title}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Link
            to="/search"
            className="rounded-lg p-2 text-nova-gray transition-all duration-200 hover:bg-gray-100 hover:text-nova-black active:scale-95"
            aria-label="Search"
          >
            <IconSearch />
          </Link>
          <Link
            to="/cart"
            className="rounded-lg p-2 text-nova-gray transition-all duration-200 hover:bg-gray-100 hover:text-nova-black active:scale-95"
            aria-label="Shopping cart"
          >
            <IconCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
