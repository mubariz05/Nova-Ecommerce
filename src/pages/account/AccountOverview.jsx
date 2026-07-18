import { NavLink } from "react-router-dom";
import { mockOrders } from "../../data/mockOrders";

const activeOrdersCount = mockOrders.filter(
  (o) => o.status === "Processing" || o.status === "Shipped",
).length;

const latestOrder = [...mockOrders].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
)[0];

const orderSteps = ["Processing", "Shipped", "Delivered"];

function getStepIndex(status) {
  const idx = orderSteps.indexOf(status);
  return idx === -1 ? 0 : idx;
}

const stats = [
  { label: "Active Orders", value: String(activeOrdersCount), icon: "cart" },
  { label: "Wishlist", value: "12", suffix: "items", icon: "heart" },
  { label: "Reward Points", value: "2,450", icon: "coin" },
  { label: "Coupons", value: "3", suffix: "available", icon: "ticket" },
];

const recentlyViewed = [
  { name: "Prisma Shades", price: "$240.00", color: "bg-stone-200" },
  { name: "Chronos Mesh", price: "$185.00", color: "bg-neutral-800" },
  { name: "Forma Vase", price: "$95.00", color: "bg-stone-300" },
];

const recommended = [
  {
    name: "Cashmere Blend Knit",
    price: "$320.00",
    color: "bg-stone-200",
    badge: null,
  },
  {
    name: "Slim Cardholder",
    price: "$85.00",
    color: "bg-amber-800",
    badge: null,
  },
  {
    name: "Monolith Lamp",
    price: "$145.00",
    color: "bg-stone-100",
    badge: "New",
  },
  {
    name: "Santal Essence",
    price: "$110.00",
    color: "bg-neutral-900",
    badge: null,
  },
];

function StatIcon({ type }) {
  const common = "h-5 w-5";
  switch (type) {
    case "cart":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "heart":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      );
    case "coin":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 16.5v.5" />
        </svg>
      );
    case "ticket":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
        </svg>
      );
    default:
      return null;
  }
}

function ProductCard({ name, price, color, badge }) {
  return (
    <div className="group relative rounded-xl border border-nova-border bg-white p-3 transition-shadow duration-200 hover:shadow-md">
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-lg ${color}`}
      >
        {badge ? (
          <span className="absolute left-2 top-2 rounded-full bg-nova-accent px-2 py-0.5 text-[10px] font-semibold text-white">
            {badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label={`Add ${name} to wishlist`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-nova-gray shadow-sm transition-colors duration-200 hover:text-nova-accent"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>
      <p className="mt-3 text-sm font-medium text-nova-black">{name}</p>
      <p className="mt-0.5 text-sm text-nova-gray">{price}</p>
    </div>
  );
}

export default function AccountOverview() {
  const userName = "Mubariz";
  const isGoldMember = true;
  const firstItem = latestOrder?.items?.[0];
  const extraItemsCount =
    latestOrder?.items?.length > 1 ? latestOrder.items.length - 1 : 0;
  const isCancelled = latestOrder?.status === "Cancelled";
  const currentStepIndex = getStepIndex(latestOrder?.status);

  return (
    <div className="flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-nova-black">
          Hi, {userName}
          <span aria-hidden="true">👋</span>
          {isGoldMember ? (
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
              ★ Gold member
            </span>
          ) : null}
        </h1>
        <p className="mt-1 text-sm text-nova-gray">
          Welcome back to your premium dashboard.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-nova-border bg-white p-4"
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-nova-gray">
              <StatIcon type={s.icon} />
              {s.label}
            </div>
            <p className="mt-3 text-2xl font-bold text-nova-black">
              {s.value}
              {s.suffix ? (
                <span className="ml-1 text-xs font-medium text-nova-gray">
                  {s.suffix}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-xl border border-nova-border bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-nova-black">
                Latest order
              </h2>
              <p className="mt-0.5 text-xs text-nova-gray">
                Order #{latestOrder?.id ?? "—"}
              </p>
            </div>
            <NavLink
              to="/account/orders"
              className="rounded-lg border border-nova-border px-3 py-1.5 text-xs font-semibold text-nova-black transition-colors duration-200 hover:bg-gray-50"
            >
              Track order
            </NavLink>
          </div>

          {firstItem ? (
            <div className="mt-4 flex gap-3">
              <img
                src={firstItem.image}
                alt={firstItem.name}
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-nova-black">
                  {firstItem.name}
                </p>
                <p className="text-xs text-nova-gray">
                  {firstItem.brand} • Qty: {firstItem.quantity}
                  {extraItemsCount > 0 ? ` • +${extraItemsCount} more` : ""}
                </p>
              </div>
            </div>
          ) : null}

          {isCancelled ? (
            <div className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              This order was cancelled.
            </div>
          ) : (
            <div className="mt-6 flex items-center">
              {orderSteps.map((step, i) => (
                <div
                  key={step}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={[
                        "flex h-6 w-6 items-center justify-center rounded-full text-white",
                        i <= currentStepIndex
                          ? "bg-nova-accent"
                          : "bg-nova-border text-nova-gray",
                      ].join(" ")}
                    >
                      {i <= currentStepIndex ? "✓" : ""}
                    </div>
                    <span className="text-[11px] font-medium text-nova-gray">
                      {step}
                    </span>
                  </div>
                  {i < orderSteps.length - 1 ? (
                    <div
                      className={[
                        "mx-2 h-0.5 flex-1",
                        i < currentStepIndex
                          ? "bg-nova-accent"
                          : "bg-nova-border",
                      ].join(" ")}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-nova-border bg-white p-5">
          <h2 className="text-sm font-bold text-nova-black">Recently viewed</h2>
          <div className="mt-4 flex flex-col gap-3">
            {recentlyViewed.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 shrink-0 rounded-lg ${item.color}`}
                />
                <div>
                  <p className="text-sm font-medium text-nova-black">
                    {item.name}
                  </p>
                  <p className="text-xs text-nova-gray">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-nova-black">
            Recommended for you
          </h2>
          <NavLink
            to="/search"
            className="text-xs font-semibold text-nova-accent hover:underline"
          >
            View all
          </NavLink>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recommended.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
