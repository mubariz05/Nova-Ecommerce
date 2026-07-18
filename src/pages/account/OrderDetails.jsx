import { useParams } from "react-router-dom";

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHelp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M9.5 9a2.5 2.5 0 115 .5c0 1.5-2 1.75-2 3.25M12 17h.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconPin({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 105 9.5C5 14.9 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="9.5"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconCard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

const STATUS_STEPS = [
  "Order placed",
  "Processing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const MOCK_ORDER = {
  id: "NV-284916",
  placedOn: "Jul 05, 2024",
  status: "Shipped",
  statusIndex: 2,
  statusTimestamp: "Jul 07, 10:34 AM",
  carrier: "FedEx",
  trackingNumber: "784291934821",
  origin: "Milan, IT",
  destination: "Oslo, ND",
  items: [
    {
      id: "atelier-leather-tote",
      name: "Atelier Leather Tote",
      variant: "Caramel / One Size",
      price: 850.0,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
    },
    {
      id: "geometric-silk-scarf",
      name: "Geometric Silk Scarf",
      variant: "Navy/White / Standard",
      price: 265.0,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&h=200&fit=crop",
    },
  ],
  deliveryAddress: {
    name: "Jane Doe",
    line1: "123 Nordic Way",
    line2: "Oslo, 0152",
    country: "Norway",
  },
  payment: {
    subtotal: 1115.0,
    shipping: 0,
    tax: 0,
    total: 1115.0,
    cardLast4: "4242",
  },
};

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function TrackingStepper({ steps, currentIndex, currentTimestamp }) {
  return (
    <div className="flex items-start">
      {steps.map((step, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isFilled = isDone || isCurrent;
        const isLast = i === steps.length - 1;

        return (
          <div
            key={step}
            className={[
              "flex items-center",
              isLast ? "flex-none" : "flex-1",
            ].join(" ")}
          >
            <div className="flex flex-col items-center">
              <div
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200",
                  isFilled
                    ? "border-nova-accent bg-nova-accent text-white"
                    : "border-nova-border bg-white text-transparent",
                ].join(" ")}
              >
                {isDone ? (
                  <IconCheck />
                ) : isCurrent ? (
                  <span className="h-2 w-2 rounded-full bg-white" />
                ) : null}
              </div>
              <p
                className={[
                  "mt-2 whitespace-nowrap text-xs font-medium",
                  isFilled ? "text-nova-black" : "text-nova-gray",
                ].join(" ")}
              >
                {step}
              </p>
              {isCurrent && currentTimestamp ? (
                <p className="mt-0.5 text-[11px] text-nova-gray">
                  {currentTimestamp}
                </p>
              ) : null}
            </div>

            {!isLast ? (
              <div
                className={[
                  "mx-2 mt-[-18px] h-0.5 flex-1 rounded-full transition-colors duration-200",
                  i < currentIndex ? "bg-nova-accent" : "bg-nova-border",
                ].join(" ")}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function RouteMap({ origin, destination }) {
  return (
    <div className="relative h-full min-h-[120px] w-full overflow-hidden rounded-lg bg-[#eef0f4]">
      <iframe
        title="Shipment route map"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(
          destination || origin || "",
        )}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 120 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-nova-gray shadow-sm">
        <IconPin className="h-3 w-3 text-nova-accent" />
        Origin: {origin}
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-nova-gray shadow-sm">
        <IconPin className="h-3 w-3 text-nova-black" />
        Dest: {destination}
      </div>
    </div>
  );
}

function OrderItemRow({ item }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-nova-border py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="h-14 w-14 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-nova-black">
            {item.name}
          </p>
          <p className="text-xs text-nova-gray">{item.variant}</p>
          <p className="mt-1 text-sm font-semibold text-nova-black">
            {formatCurrency(item.price)}{" "}
            <span className="font-normal text-nova-gray">
              · Qty: {item.qty}
            </span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-nova-border px-3 py-1.5 text-xs font-medium text-nova-black transition-colors duration-200 hover:bg-gray-50"
        >
          Return
        </button>
        <button
          type="button"
          className="rounded-md border border-nova-border px-3 py-1.5 text-xs font-medium text-nova-black transition-colors duration-200 hover:bg-gray-50"
        >
          Review
        </button>
        <button
          type="button"
          className="rounded-md bg-nova-black px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-nova-black/90"
        >
          Buy again
        </button>
      </div>
    </div>
  );
}

export default function OrderDetails() {
  const { orderId } = useParams();
  const order = { ...MOCK_ORDER, id: orderId ?? MOCK_ORDER.id };

  return (
    <div className="px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-nova-black">
            Order #{order.id}
          </h1>
          <p className="mt-1 text-sm text-nova-gray">
            Placed on {order.placedOn}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-nova-lavender px-3 py-1 text-xs font-semibold text-nova-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-nova-accent" />
          {order.status}
        </span>
      </div>

      <section className="mb-6 rounded-xl border border-nova-border bg-white p-6">
        <h2 className="mb-6 text-sm font-bold text-nova-black">
          Tracking Status
        </h2>
        <TrackingStepper
          steps={STATUS_STEPS}
          currentIndex={order.statusIndex}
          currentTimestamp={order.statusTimestamp}
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-nova-border p-4">
            <p className="text-xs font-medium text-nova-gray">Carrier</p>
            <p className="mt-1 text-sm font-semibold text-nova-black">
              {order.carrier}
            </p>
            <p className="mt-3 text-xs font-medium text-nova-gray">
              Tracking Number
            </p>
            <p className="mt-1 text-sm font-semibold text-nova-black">
              {order.trackingNumber}
            </p>
          </div>
          <RouteMap origin={order.origin} destination={order.destination} />
        </div>
      </section>

      <section className="mb-6 rounded-xl border border-nova-border bg-white p-6">
        <h2 className="mb-2 text-sm font-bold text-nova-black">
          Items in this order
        </h2>
        <div>
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>
      </section>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-nova-border bg-white p-6">
          <h2 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-nova-black">
            <IconPin className="h-4 w-4 text-nova-gray" />
            Delivery Address
          </h2>
          <p className="text-sm font-semibold text-nova-black">
            {order.deliveryAddress.name}
          </p>
          <p className="mt-1 text-sm text-nova-gray">
            {order.deliveryAddress.line1}
          </p>
          <p className="text-sm text-nova-gray">
            {order.deliveryAddress.line2}
          </p>
          <p className="text-sm text-nova-gray">
            {order.deliveryAddress.country}
          </p>
        </section>

        <section className="rounded-xl border border-nova-border bg-white p-6">
          <h2 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-nova-black">
            <IconCard />
            Payment Summary
          </h2>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-nova-gray">Subtotal</dt>
              <dd className="text-nova-black">
                {formatCurrency(order.payment.subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-nova-gray">Shipping</dt>
              <dd className="text-nova-black">
                {order.payment.shipping === 0
                  ? "Free"
                  : formatCurrency(order.payment.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-nova-gray">Tax</dt>
              <dd className="text-nova-black">
                {formatCurrency(order.payment.tax)}
              </dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-nova-border pt-2">
              <dt className="font-bold text-nova-black">Total</dt>
              <dd className="font-bold text-nova-black">
                {formatCurrency(order.payment.total)}
              </dd>
            </div>
          </dl>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-nova-gray">
            <IconCard />
            Visa ending in {order.payment.cardLast4}
          </p>
        </section>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium text-nova-gray transition-colors duration-200 hover:text-nova-black"
        >
          <IconDownload />
          Download invoice (PDF)
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium text-nova-gray transition-colors duration-200 hover:text-nova-black"
        >
          <IconHelp />
          Need help?
        </button>
      </div>
    </div>
  );
}
