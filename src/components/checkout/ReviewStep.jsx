import { cartItems } from "../../data/cardItems";
import { shippingOptions } from "../../data/shippingOptions";
import subtotalOf from "../../utils/subTotalOf";

function ReviewStep({
  contact,
  address,
  shippingMethod,
  card,
  paymentMethod,
  promoCode,
  setPromoCode,
  promoApplied,
  applyPromo,
  agreeTerms,
  setAgreeTerms,
  onEditShipping,
  onEditPayment,
  onPlaceOrder,
  shippingCost,
  discount,
  isPlacing,
}) {
  const method = shippingOptions.find((s) => s.id === shippingMethod);
  const subtotal = subtotalOf(cartItems);
  const taxes = subtotal * 0.08;
  const total = subtotal + shippingCost + taxes - discount;

  const paymentLabel =
    paymentMethod === "card"
      ? `Ending in ${card.number.slice(-4).padStart(4, "•") || "••••"}`
      : paymentMethod === "paypal"
        ? "PayPal"
        : "Klarna";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold text-nova-black">Review Your Order</h2>

        <div className="rounded-xl border border-nova-border bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-nova-gray">
              Contact &amp; Shipping Address
            </p>
            <button
              type="button"
              onClick={onEditShipping}
              className="text-xs font-semibold text-nova-accent hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="mt-2 text-sm font-semibold text-nova-black">
            {address.firstName} {address.lastName}
          </p>
          <p className="text-sm text-nova-gray">{contact}</p>
          <p className="text-sm text-nova-gray">{address.address1}</p>
          <p className="text-sm text-nova-gray">
            {address.city}, {address.postalCode}
          </p>
          <p className="text-sm text-nova-gray">{address.country}</p>
        </div>

        <div className="rounded-xl border border-nova-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-nova-gray">
              Shipping Method
            </p>
            <button
              type="button"
              onClick={onEditShipping}
              className="text-xs font-semibold text-nova-accent hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="font-medium text-nova-black">
              {method?.label} Shipping
            </span>
            <span className="text-nova-gray">
              {method?.cost === 0 ? "Free" : `$${method?.cost.toFixed(2)}`}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-nova-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-nova-gray">
              Payment Method
            </p>
            <button
              type="button"
              onClick={onEditPayment}
              className="text-xs font-semibold text-nova-accent hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="mt-2 text-sm font-medium text-nova-black">
            {paymentLabel}
          </p>
          <p className="text-xs text-nova-gray">Billing same as shipping</p>
        </div>

        <div className="rounded-xl border border-nova-border bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-nova-gray">
            Items in Order
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div
                  className={`h-12 w-12 shrink-0 rounded-lg ${item.color}`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-nova-black">
                    {item.name}
                  </p>
                  <p className="text-xs text-nova-gray">{item.variant}</p>
                </div>
                <p className="text-sm font-medium text-nova-black">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-nova-border bg-white p-5">
          <h2 className="text-sm font-bold text-nova-black">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-nova-gray">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-nova-gray">
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-nova-gray">
              <span>Tax</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            {promoApplied ? (
              <div className="flex justify-between text-nova-accent">
                <span>Discount (Promo)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            ) : null}
          </div>

          {!promoApplied ? (
            <div className="mt-3 flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="rounded-lg border border-nova-border px-3 py-2 text-xs font-semibold text-nova-black hover:bg-gray-50"
              >
                Apply
              </button>
            </div>
          ) : null}

          <div className="mt-4 flex items-end justify-between border-t border-nova-border pt-4">
            <span className="text-sm font-bold text-nova-black">Total</span>
            <span className="text-xl font-bold text-nova-black">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <label className="flex items-start gap-2 text-xs text-nova-gray">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 accent-nova-accent"
          />
          <span>
            I agree to the{" "}
            <span className="font-semibold text-nova-black hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-semibold text-nova-black hover:underline">
              Privacy Policy
            </span>
          </span>
        </label>

        <button
          type="button"
          disabled={!agreeTerms || isPlacing}
          onClick={onPlaceOrder}
          className="rounded-lg bg-nova-accent px-4 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPlacing ? "Placing order…" : `Place Order — $${total.toFixed(2)}`}
        </button>
        <p className="text-center text-[11px] text-nova-gray">
          🔒 Secure encrypted checkout
        </p>
      </div>
    </div>
  );
}
export default ReviewStep;
