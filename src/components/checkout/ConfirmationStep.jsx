import { cartItems } from "../../data/cardItems";
import { recommendedProducts } from "../../data/recommended Products";
import subtotalOf from "../../utils/subTotalOf";

function ConfirmationStep({
  address,
  orderNumber,
  shippingCost,
  discount,
  onContinueShopping,
}) {
  const subtotal = subtotalOf(cartItems);
  const taxes = subtotal * 0.08;
  const total = subtotal + shippingCost + taxes - discount;
  const firstName = address.firstName || "there";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-nova-accent text-nova-accent">
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-nova-black">
          Thank you, {firstName}!
        </h1>
        <p className="mt-1 text-sm text-nova-gray">Your order is confirmed.</p>
        <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-nova-black">
          ORDER NUMBER: {orderNumber}
        </span>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-nova-border bg-white p-5 text-left">
          <h2 className="text-sm font-bold text-nova-black">
            Delivery Details
          </h2>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-nova-gray">
            Estimated arrival
          </p>
          <p className="text-sm text-nova-black">Jul 8 – Jul 10</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-nova-gray">
            Shipping address
          </p>
          <p className="text-sm text-nova-black">
            {address.firstName} {address.lastName}
          </p>
          <p className="text-sm text-nova-gray">{address.address1}</p>
          <p className="text-sm text-nova-gray">
            {address.city}, {address.postalCode}
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-nova-border py-2 text-xs font-semibold text-nova-black hover:bg-gray-50"
          >
            Track your order
          </button>
        </div>

        <div className="rounded-xl border border-nova-border bg-white p-5 text-left">
          <h2 className="text-sm font-bold text-nova-black">
            Order Details ({cartItems.length})
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className={`h-9 w-9 shrink-0 rounded-lg ${item.color}`} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-nova-black">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-nova-gray">{item.variant}</p>
                </div>
                <p className="text-xs font-medium text-nova-black">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-1 border-t border-nova-border pt-3 text-xs text-nova-gray">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm font-bold text-nova-black">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl border border-nova-border bg-nova-lavender/30 p-5 text-left">
        <p className="text-sm font-semibold text-nova-black">
          Save your info for next time
        </p>
        <p className="mt-1 text-xs text-nova-gray">
          Create an account to track orders and skip checkout forms next time.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="password"
            placeholder="Create a password"
            className="flex-1 rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
          />
          <button
            type="button"
            className="rounded-lg bg-nova-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Create account
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinueShopping}
        className="rounded-lg border border-nova-border px-6 py-2.5 text-sm font-semibold text-nova-black hover:bg-gray-50"
      >
        Continue shopping
      </button>

      <div className="w-full text-left">
        <h2 className="text-sm font-bold text-nova-black">
          Recommended for you
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recommendedProducts.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-nova-border bg-white p-3"
            >
              <div className={`aspect-square w-full rounded-lg ${p.color}`} />
              <p className="mt-3 text-xs font-medium text-nova-black">
                {p.name}
              </p>
              <p className="text-xs text-nova-gray">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ConfirmationStep;
