import { useMemo, useState } from "react";
import { Search, ChevronDown, Truck, CheckCircle2, Clock } from "lucide-react";
import { mockOrders } from "../../data/mockOrders";

const orders = mockOrders.map((o) => ({
  ...o,
  itemCount: o.items.reduce((sum, l) => sum + l.quantity, 0),
}));

const STATUS_META = {
  processing: {
    label: "Processing",
    icon: Clock,
    bg: "bg-[#FAEEDA]",
    fg: "text-[#854F0B]",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    bg: "bg-[#E6F1FB]",
    fg: "text-[#0C447C]",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    bg: "bg-[#EAF3DE]",
    fg: "text-[#27500A]",
  },
  cancelled: {
    label: "Cancelled",
    icon: Clock,
    bg: "bg-[#FCEBEB]",
    fg: "text-[#791F1F]",
  },
};

const TABS = [
  { key: "all", label: "All" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const formatMoney = (n) => `$${n.toFixed(2)}`;

function StatusBadge({ status }) {
  const meta = STATUS_META[status.toLowerCase()];
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-[3px] rounded-full text-xs font-medium ${meta.bg} ${meta.fg}`}
    >
      <Icon size={12} strokeWidth={2.25} />
      {meta.label}
    </span>
  );
}

function OrderThumbs({ items }) {
  const shown = items.slice(0, 3);
  return (
    <div className="relative w-24 h-24 shrink-0">
      {shown.map((item, i) => (
        <img
          key={item.productId}
          src={item.image}
          alt={item.name}
          className="absolute w-[72px] h-[72px] object-cover rounded-xl border-[3px] border-[#FAF9F6] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          style={{
            left: i * 14,
            top: i * 6,
            zIndex: shown.length - i,
          }}
        />
      ))}
    </div>
  );
}

function OrderActions({ status, expanded, onToggleDetails }) {
  const s = status.toLowerCase();
  let primaryLabel = null;
  if (s === "shipped") primaryLabel = "Track order";
  if (s === "delivered") primaryLabel = "Buy again";

  return (
    <div className="flex gap-2.5 shrink-0">
      <button
        onClick={onToggleDetails}
        className="px-[18px] py-2.5 rounded-[10px] border border-[#E4E1D8] bg-white text-sm font-medium text-[#1A1A18] cursor-pointer"
      >
        {expanded ? "Hide details" : "View details"}
      </button>
      {primaryLabel && (
        <button className="px-[18px] py-2.5 rounded-[10px] border border-[#171716] bg-[#171716] text-sm font-medium text-white cursor-pointer">
          {primaryLabel}
        </button>
      )}
    </div>
  );
}

function OrderDetails({ order }) {
  const addr = order.shippingAddress;

  return (
    <div className="mt-4 pt-4 border-t border-[#ECE9E1] grid grid-cols-2 gap-6 w-full">
      <div>
        <div className="text-[13px] font-semibold text-[#171716] mb-1">
          Items
        </div>
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between py-2 text-[13.5px]"
          >
            <span className="text-[#8A8879]">
              {item.name} {item.quantity > 1 ? `x${item.quantity}` : ""}
            </span>
            <span className="text-[#171716] font-medium text-right">
              {formatMoney(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div>
        <div className="text-[13px] font-semibold text-[#171716] mb-1">
          Order info
        </div>
        <div className="flex justify-between py-2 text-[13.5px]">
          <span className="text-[#8A8879]">Payment</span>
          <span className="text-[#171716] font-medium text-right">
            {order.paymentMethod}
          </span>
        </div>
        <div className="flex justify-between py-2 text-[13.5px]">
          <span className="text-[#8A8879]">Shipping</span>
          <span className="text-[#171716] font-medium text-right">
            {order.shippingMethod}
          </span>
        </div>
        {order.trackingNumber && (
          <div className="flex justify-between py-2 text-[13.5px]">
            <span className="text-[#8A8879]">Tracking</span>
            <span className="text-[#171716] font-medium text-right">
              {order.trackingNumber}
            </span>
          </div>
        )}
        {order.estimatedDelivery && (
          <div className="flex justify-between py-2 text-[13.5px]">
            <span className="text-[#8A8879]">Est. delivery</span>
            <span className="text-[#171716] font-medium text-right">
              {formatDate(order.estimatedDelivery)}
            </span>
          </div>
        )}
        <div className="flex justify-between py-2 text-[13.5px]">
          <span className="text-[#8A8879]">Ship to</span>
          <span className="text-[#171716] font-medium text-right">
            {addr.name}, {addr.address}, {addr.city}, {addr.country}
          </span>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-[#ECE9E1] rounded-2xl px-6 py-5 flex flex-col">
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-5 min-w-[280px]">
          <OrderThumbs items={order.items} />
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-[17px] font-semibold text-[#171716]">
                Order #{order.id}
              </span>
              <StatusBadge status={order.status} />
            </div>
            <div className="text-sm text-[#8A8879] mb-1">
              Placed on {formatDate(order.date)}
            </div>
            <div className="text-sm text-[#57564F]">
              {order.itemCount} {order.itemCount === 1 ? "item" : "items"}{" "}
              &bull; {formatMoney(order.total)}
            </div>
          </div>
        </div>
        <OrderActions
          status={order.status}
          expanded={expanded}
          onToggleDetails={() => setExpanded((v) => !v)}
        />
      </div>
      {expanded && <OrderDetails order={order} />}
    </div>
  );
}

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesTab =
        activeTab === "all" || o.status.toLowerCase() === activeTab;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.items.some((item) => item.name.toLowerCase().includes(q));
      return matchesTab && matchesQuery;
    });
  }, [activeTab, query]);

  const visibleOrders = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="flex flex-col w-full min-h-screen font-sans text-[#171716]">
      <main className="flex-1 min-w-0 mt-16 sm:mt-[72px] px-4 sm:px-6 lg:px-10 py-8">
        <h1 className="text-[34px] font-bold tracking-[-0.5px] mb-6 text-black">
          Order history
        </h1>

        <div className="flex items-center justify-between gap-4 mb-7 flex-wrap">
          <div className="flex gap-6 border-b border-[#ECE9E1] flex-1 min-w-[280px]">
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setVisibleCount(3);
                  }}
                  className={`bg-transparent border-none cursor-pointer pb-3 text-sm border-b-2 ${
                    active
                      ? "font-semibold text-[#171716] border-[#171716]"
                      : "font-normal text-[#8A8879] border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2.5">
            <div className="flex items-center gap-2 bg-white border border-[#E4E1D8] rounded-[10px] px-3.5 py-2.5 w-60">
              <Search size={16} color="#8A8879" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by order # or product"
                className="border-none outline-none text-sm w-full bg-transparent text-[#171716]"
              />
            </div>
            <button className="flex items-center gap-1.5 bg-white border border-[#E4E1D8] rounded-[10px] px-3.5 py-2.5 text-sm text-[#171716] cursor-pointer">
              Date range
              <ChevronDown size={15} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {visibleOrders.length === 0 && (
            <div className="bg-white border border-dashed border-[#E4E1D8] rounded-2xl px-6 py-12 text-center text-[#8A8879] text-sm">
              No orders match that search.
            </div>
          )}
          {visibleOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-7">
            <button
              onClick={() => setVisibleCount((c) => c + 3)}
              className="bg-transparent border-none text-[#57564F] text-sm font-medium cursor-pointer underline"
            >
              Load more orders
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
