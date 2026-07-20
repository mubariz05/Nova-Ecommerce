import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import {
  IconAddresses,
  IconOrders,
  IconOverview,
  IconPayment,
  IconReviews,
  IconSettings,
  IconWishlist,
} from "./icons";

const navItems = [
  { label: "Overview", to: "/account", icon: IconOverview, end: true },
  { label: "Orders", to: "/account/orders", icon: IconOrders },
  { label: "Wishlist", to: "/account/wishlist", icon: IconWishlist },
  { label: "Addresses", to: "/account/addresses", icon: IconAddresses },
  { label: "Checkout", to: "/account/checkout", icon: IconPayment },
  { label: "Reviews", to: "/account/reviews", icon: IconReviews },
  { label: "Settings", to: "/account/profile", icon: IconSettings },
  { label: "Help Center", to: "/support", icon: HelpCircle },
];

export default function Sidebar({ isOpen, onClose, isLoggedIn = false }) {
  const asideRef = useRef(null);
  useEffect(() => {
    const node = asideRef.current;
    if (!node) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      node.inert = false;
      return;
    }

    node.inert = !isOpen;
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-in-out lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
        aria-label="Close sidebar overlay"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        ref={asideRef}
        className={[
          "fixed inset-y-0 left-0 z-50 flex overflow-hidden border-r border-nova-border bg-white",
          "transition-[width,transform] duration-300 ease-in-out",
          "lg:sticky lg:inset-y-auto lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)] lg:shrink-0",
          isOpen
            ? "w-[220px] translate-x-0"
            : "w-0 -translate-x-full border-r-0 lg:translate-x-0 lg:w-0",
        ].join(" ")}
      >
        <div className="flex w-[220px] min-w-[220px] flex-1 flex-col">
          <div className="px-5 pb-6 pt-8">
            <p className="text-[22px] font-bold leading-tight text-nova-black">
              Nova
              <br />
              Commerce
            </p>
            <p className="mt-1 text-xs text-nova-gray">Premium Account</p>
          </div>

          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-3"
            aria-label="Account navigation"
          >
            {navItems.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-nova-lavender text-nova-black"
                      : "text-nova-gray hover:bg-gray-50 hover:text-nova-black",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <span
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-nova-accent transition-all duration-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <Icon />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-nova-border px-5 py-5">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nova-lavender text-sm font-semibold text-nova-accent"
                  aria-hidden="true"
                >
                  U
                </div>
                <div>
                  <p className="text-sm font-bold text-nova-black">
                    User Profile
                  </p>
                  <button
                    type="button"
                    className="mt-0.5 text-xs text-nova-gray transition-colors duration-200 hover:text-nova-black"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nova-lavender text-sm font-semibold text-nova-accent"
                  aria-hidden="true"
                >
                  U
                </div>
                <div>
                  <NavLink
                    to="/login"
                    onClick={onClose}
                    className="block text-sm font-bold text-nova-black hover:underline"
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={onClose}
                    className="mt-0.5 block text-xs text-nova-gray transition-colors duration-200 hover:text-nova-black"
                  >
                    Register
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
