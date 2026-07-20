import { ShoppingCart, Heart, UserX, Archive } from "lucide-react";

const EMPTY_STATES = [
  {
    icon: ShoppingCart,
    title: "Your cart is empty",
    description: "Looks like you haven't added anything to your cart yet.",
    action: { label: "Start shopping", variant: "solid" },
  },
  {
    icon: Heart,
    title: "Your wishlist is lonely",
    description: "Save items you love to revisit them later.",
    action: { label: "Explore trending", variant: "outline" },
  },
  {
    icon: UserX,
    title: "No results found",
    description: "Try different keywords or browse our top categories.",
    tags: ["Sneakers", "Dresses", "Accessories"],
  },
  {
    icon: Archive,
    title: "No orders yet",
    description:
      "Ready to make your first purchase? Use the code above for 10% off.",
    badge: "WELCOME10",
    action: { label: "Place your first order", variant: "solid" },
  },
];

function EmptyStateCard({
  icon: Icon,
  title,
  description,
  action,
  tags,
  badge,
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-nova-lavender text-nova-accent">
        <Icon size={24} strokeWidth={1.8} />
      </span>

      {badge && (
        <span className="mt-4 rounded-full border border-nova-accent/30 bg-nova-lavender px-3 py-1 text-[10px] font-semibold tracking-wide text-nova-accent">
          {badge}
        </span>
      )}

      <h3 className="mt-4 text-base font-semibold text-nova-black">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-gray-500">{description}</p>

      {tags && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {action && (
        <button
          type="button"
          className={
            action.variant === "solid"
              ? "mt-5 rounded-full bg-nova-black px-5 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800"
              : "mt-5 rounded-full border border-gray-300 px-5 py-2.5 text-xs font-medium text-nova-black transition hover:border-nova-black"
          }
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export default function EmptyStateShowcase() {
  return (
    <div className="w-full bg-[#fafafa] pb-16">
      <div className="mx-auto w-full max-w-6xl px-6 pt-12 text-center sm:px-10">
        <h1 className="text-3xl font-bold text-nova-black sm:text-4xl">
          Empty State Patterns
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Consistent messaging for various empty scenarios
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {EMPTY_STATES.map((state) => (
            <EmptyStateCard key={state.title} {...state} />
          ))}
        </div>
      </div>
    </div>
  );
}
