import { cartItems } from "../../data/cardItems";
import { shippingOptions } from "../../data/shippingOptions";
import OrderSummary from "./OrderSummary";

function ShippingStep({
  contact,
  setContact,
  address,
  setAddress,
  shippingMethod,
  setShippingMethod,
  onContinue,
  shippingCost,
  discount,
}) {
  const update = (field) => (e) =>
    setAddress((a) => ({ ...a, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !contact ||
      !address.firstName ||
      !address.lastName ||
      !address.address1
    )
      return;
    onContinue();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-nova-black">Contact</h2>
            <p className="text-xs text-nova-gray">
              Already have an account?{" "}
              <span className="font-semibold text-nova-accent hover:underline">
                Log in
              </span>
            </p>
          </div>
          <input
            type="email"
            required
            placeholder="Email address"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-3 w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
          />
        </div>

        <div>
          <h2 className="text-sm font-bold text-nova-black">
            Shipping address
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="First name"
              value={address.firstName}
              onChange={update("firstName")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
            />
            <input
              required
              placeholder="Last name"
              value={address.lastName}
              onChange={update("lastName")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
            />
            <input
              required
              placeholder="Address"
              value={address.address1}
              onChange={update("address1")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none sm:col-span-2"
            />
            <input
              placeholder="Apartment, suite, etc. (optional)"
              value={address.address2}
              onChange={update("address2")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none sm:col-span-2"
            />
            <input
              placeholder="City"
              value={address.city}
              onChange={update("city")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
            />
            <input
              placeholder="Postal code"
              value={address.postalCode}
              onChange={update("postalCode")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
            />
            <select
              value={address.state}
              onChange={update("state")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black focus:border-nova-accent focus:outline-none"
            >
              <option value="">State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
            </select>
            <select
              value={address.country}
              onChange={update("country")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black focus:border-nova-accent focus:outline-none"
            >
              <option value="United States">United States</option>
              <option value="Norway">Norway</option>
              <option value="Poland">Poland</option>
            </select>
            <input
              placeholder="Phone"
              value={address.phone}
              onChange={update("phone")}
              className="rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none sm:col-span-2"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-nova-black">Shipping method</h2>
          <div className="mt-3 flex flex-col gap-2">
            {shippingOptions.map((opt) => (
              <label
                key={opt.id}
                className={[
                  "flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors duration-200",
                  shippingMethod === opt.id
                    ? "border-nova-accent bg-nova-lavender/40"
                    : "border-nova-border hover:bg-gray-50",
                ].join(" ")}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === opt.id}
                    onChange={() => setShippingMethod(opt.id)}
                    className="accent-nova-accent"
                  />
                  <span>
                    <span className="block font-medium text-nova-black">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-nova-gray">
                      {opt.detail}
                    </span>
                  </span>
                </span>
                <span className="font-medium text-nova-black">
                  {opt.cost === 0 ? "Free" : `$${opt.cost.toFixed(2)}`}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-nova-border pt-6">
          <button
            type="button"
            className="text-sm font-medium text-nova-gray hover:text-nova-black"
          >
            ← Return to cart
          </button>
          <button
            type="submit"
            className="rounded-lg bg-nova-black px-6 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
          >
            Continue to Payment
          </button>
        </div>
      </form>

      <div className="h-fit">
        <OrderSummary
          items={cartItems}
          shippingCost={shippingCost}
          discount={discount}
        />
      </div>
    </div>
  );
}

export default ShippingStep;
