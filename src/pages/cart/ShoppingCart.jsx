import { useState } from "react";
import { Minus, Plus, Lock, RotateCcw } from "lucide-react";
import { useCart } from "../../context/CartContext";

const savedForLaterItems = [
  {
    id: "belt-01",
    name: "Classic Leather Belt",
    price: 55.0,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=200&h=200&fit=crop",
  },
  {
    id: "trousers-01",
    name: "Stockholm Trousers",
    price: 180.0,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop",
  },
];

const recommendedItems = [
  {
    id: "bag-01",
    name: "Canvas Tote Bag",
    price: 85.0,
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300&h=300&fit=crop",
  },
  {
    id: "hoops-01",
    name: "Essential Hoops",
    price: 149.0,
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&h=300&fit=crop",
  },
  {
    id: "sweater-01",
    name: "Alpaca Knit Sweater",
    price: 180.0,
    image:
      "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=300&h=300&fit=crop",
  },
  {
    id: "beanie-01",
    name: "Ribbed Beanie",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=300&fit=crop",
  },
];

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_FLAT_RATE = 15;
const DISCOUNT_CODE_AMOUNT = 15;

const formatPrice = (value) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function ShoppingCart() {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const [saved, setSaved] = useState(savedForLaterItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(true);

  const updateQty = (id, delta) => updateQuantity(id, delta);

  const moveToCart = (id) => {
    const item = saved.find((s) => s.id === id);
    if (!item) return;
    addItem(item);
    setSaved((prev) => prev.filter((s) => s.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );
  const shippingCost = amountToFreeShipping === 0 ? 0 : SHIPPING_FLAT_RATE;
  const discount = couponApplied ? DISCOUNT_CODE_AMOUNT : 0;
  const total = subtotal + shippingCost - discount;

  return (
    <div className="full-bleed-layout flex min-h-screen w-full flex-col bg-[#FAF9F7]">
      <main className="flex-1 px-4 pb-10 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="mb-5 text-xl font-semibold text-neutral-900 sm:mb-6 sm:text-2xl">
            Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[1fr_340px]">
            <div className="min-w-0">
              <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
                <div className="mb-5 sm:mb-6">
                  {amountToFreeShipping > 0 ? (
                    <p className="mb-2 text-xs text-neutral-700 sm:text-sm">
                      Add{" "}
                      <span className="font-semibold">
                        ${formatPrice(amountToFreeShipping)}
                      </span>{" "}
                      more for FREE shipping
                    </p>
                  ) : (
                    <p className="mb-2 text-xs font-medium text-emerald-700 sm:text-sm">
                      You've unlocked FREE shipping!
                    </p>
                  )}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                    <div
                      className="h-full rounded-full bg-neutral-900 transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                <ul className="divide-y divide-neutral-200">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 py-4 first:pt-0 sm:gap-4 sm:py-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 flex-shrink-0 rounded-lg border border-neutral-200 object-cover sm:h-20 sm:w-20"
                      />

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2 sm:gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-neutral-900 sm:text-base">
                              {item.name}
                            </p>
                            {item.variant && (
                              <p className="mt-0.5 truncate text-xs text-neutral-500 sm:text-sm">
                                {item.variant}
                              </p>
                            )}
                            {item.lowStock && (
                              <p className="mt-1 text-xs font-medium text-amber-600">
                                Only {item.lowStock} left!
                              </p>
                            )}
                          </div>
                          <p className="whitespace-nowrap text-sm font-medium text-neutral-900 sm:text-base">
                            ${formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center rounded-full border border-neutral-300">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, -1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                            <button
                              type="button"
                              className="text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline"
                            >
                              Save for later
                            </button>
                            <span className="text-neutral-300">|</span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}

                  {items.length === 0 && (
                    <li className="py-10 text-center text-sm text-neutral-500">
                      Your cart is empty.
                    </li>
                  )}
                </ul>
              </div>

              {saved.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h2 className="mb-3 text-sm font-semibold text-neutral-900 sm:mb-4 sm:text-base">
                    Saved for later ({saved.length})
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {saved.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-neutral-200 bg-white p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="mb-3 h-20 w-full rounded-lg object-cover sm:h-24"
                        />
                        <p className="truncate text-xs font-medium text-neutral-900 sm:text-sm">
                          {item.name}
                        </p>
                        <p className="mb-2 text-xs text-neutral-500 sm:text-sm">
                          ${formatPrice(item.price)}
                        </p>
                        <button
                          type="button"
                          onClick={() => moveToCart(item.id)}
                          className="text-xs font-medium text-neutral-900 underline-offset-2 hover:underline sm:text-sm"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 sm:mt-8">
                <h2 className="mb-3 text-sm font-semibold text-neutral-900 sm:mb-4 sm:text-base">
                  You may also like
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {recommendedItems.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="mb-3 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="truncate text-xs font-medium text-neutral-900 sm:text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-500 sm:text-sm">
                        ${formatPrice(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 lg:sticky lg:top-24">
                <h2 className="mb-4 text-sm font-semibold text-neutral-900 sm:text-base">
                  Order Summary
                </h2>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="text-neutral-900">
                      ${formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated shipping</span>
                    <span className="text-neutral-900">
                      {shippingCost === 0
                        ? "FREE"
                        : `$${formatPrice(shippingCost)}`}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount (SUMMER15)</span>
                      <span>-${formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <div className="my-4 border-t border-neutral-200" />

                <div className="mb-5 flex justify-between text-sm font-semibold text-neutral-900 sm:text-base">
                  <span>Total</span>
                  <span>${formatPrice(total)}</span>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  />
                  <button
                    type="button"
                    onClick={() => setCouponApplied(!!couponCode)}
                    className="shrink-0 whitespace-nowrap rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    Apply
                  </button>
                </div>

                <button
                  type="button"
                  className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Proceed to Checkout
                </button>

                <button
                  type="button"
                  className="mt-3 w-full text-center text-sm text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline"
                >
                  or continue as guest
                </button>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Lock size={13} />
                    Secure checkout
                  </span>
                  <span className="hidden text-neutral-300 sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <RotateCcw size={13} />
                    30-day returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
