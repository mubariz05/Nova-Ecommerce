import { useState } from "react";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    isDefault: true,
    name: "Jane Doe",
    line1: "123 Nordic Way",
    city: "Oslo",
    postalCode: "0152",
    country: "Norway",
  },
  {
    id: 2,
    label: "Work",
    isDefault: false,
    name: "Jane Doe",
    line1: "45 Business Ave",
    city: "Oslo",
    postalCode: "0150",
    country: "Norway",
  },
];

const initialPaymentMethods = [
  {
    id: 1,
    brand: "visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: 2,
    brand: "mastercard",
    last4: "8888",
    expiry: "05/25",
    isDefault: false,
  },
];

function HomeIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CardBrandMark({ brand }) {
  if (brand === "visa") {
    return (
      <span className="text-base font-black italic tracking-tight text-nova-black">
        VISA
      </span>
    );
  }
  if (brand === "mastercard") {
    return (
      <div className="flex" aria-label="Mastercard">
        <span className="h-5 w-5 rounded-full bg-red-500" />
        <span className="-ml-2.5 h-5 w-5 rounded-full bg-amber-400 mix-blend-multiply" />
      </div>
    );
  }
  return null;
}

function AddCard({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[176px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-nova-border bg-white text-nova-gray transition-colors duration-200 hover:border-nova-accent hover:text-nova-accent"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
        <PlusIcon />
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function AddressForm({ onCancel, onSave }) {
  const [form, setForm] = useState({
    label: "",
    name: "",
    line1: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.label || !form.name || !form.line1) return;
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-nova-border bg-white p-5"
    >
      <h3 className="text-sm font-bold text-nova-black">Add new address</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          value={form.label}
          onChange={update("label")}
          placeholder="Label (e.g. Home, Work)"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
        />
        <input
          value={form.name}
          onChange={update("name")}
          placeholder="Full name"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
        />
        <input
          value={form.line1}
          onChange={update("line1")}
          placeholder="Street address"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none sm:col-span-2"
        />
        <input
          value={form.city}
          onChange={update("city")}
          placeholder="City"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
        />
        <input
          value={form.postalCode}
          onChange={update("postalCode")}
          placeholder="Postal code"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
        />
        <input
          value={form.country}
          onChange={update("country")}
          placeholder="Country"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none sm:col-span-2"
        />
      </div>
      <div className="mt-1 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-nova-accent px-4 py-2 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
        >
          Save address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-nova-border px-4 py-2 text-sm font-semibold text-nova-black transition-colors duration-200 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function PaymentForm({ onCancel, onSave }) {
  const [form, setForm] = useState({ brand: "visa", last4: "", expiry: "" });
  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.last4.length !== 4 || !form.expiry) return;
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-nova-border bg-white p-5"
    >
      <h3 className="text-sm font-bold text-nova-black">Add payment method</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <select
          value={form.brand}
          onChange={update("brand")}
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black focus:border-nova-accent focus:outline-none"
        >
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
        </select>
        <input
          value={form.last4}
          onChange={update("last4")}
          placeholder="Last 4 digits"
          maxLength={4}
          inputMode="numeric"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
        />
        <input
          value={form.expiry}
          onChange={update("expiry")}
          placeholder="MM/YY"
          className="rounded-lg border border-nova-border bg-white px-3 py-2 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
        />
      </div>
      <div className="mt-1 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-nova-accent px-4 py-2 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
        >
          Save card
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-nova-border px-4 py-2 text-sm font-semibold text-nova-black transition-colors duration-200 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AccountAddresses() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const setDefaultAddress = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const setDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev.map((p) => ({ ...p, isDefault: p.id === id })),
    );
  };

  const addAddress = (form) => {
    setAddresses((prev) => [
      ...prev,
      { id: Date.now(), isDefault: prev.length === 0, ...form },
    ]);
    setShowAddressForm(false);
  };

  const addPaymentMethod = (form) => {
    setPaymentMethods((prev) => [
      ...prev,
      { id: Date.now(), isDefault: prev.length === 0, ...form },
    ]);
    setShowPaymentForm(false);
  };

  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-nova-black">
          Addresses &amp; Payment Methods
        </h1>
        <p className="mt-1 text-sm text-nova-gray">
          Manage your saved addresses and payment options for faster checkout.
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-bold text-nova-black">Addresses</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex flex-col rounded-xl border border-nova-border bg-white p-5"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-nova-black">
                {addr.label.toLowerCase() === "home" ? (
                  <HomeIcon />
                ) : (
                  <BriefcaseIcon />
                )}
                {addr.label}
                {addr.isDefault ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                    Default
                  </span>
                ) : null}
              </div>
              <div className="mt-3 border-t border-nova-border pt-3 text-sm text-nova-gray">
                <p className="font-medium text-nova-black">{addr.name}</p>
                <p>{addr.line1}</p>
                <p>
                  {addr.city}, {addr.postalCode}
                </p>
                <p>{addr.country}</p>
              </div>
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => setDefaultAddress(addr.id)}
                  className="mt-4 text-left text-xs font-semibold uppercase tracking-wide text-nova-accent hover:underline"
                >
                  Set as default
                </button>
              ) : (
                <div className="mt-4 h-[1px]" aria-hidden="true" />
              )}
            </div>
          ))}

          {showAddressForm ? (
            <div className="sm:col-span-2 lg:col-span-1">
              <AddressForm
                onCancel={() => setShowAddressForm(false)}
                onSave={addAddress}
              />
            </div>
          ) : (
            <AddCard
              label="Add new address"
              onClick={() => setShowAddressForm(true)}
            />
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold text-nova-black">
          Payment methods
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((card) => (
            <div
              key={card.id}
              className="flex flex-col rounded-xl border border-nova-border bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <CardBrandMark brand={card.brand} />
                {card.isDefault ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                    Default
                  </span>
                ) : null}
              </div>
              <div className="mt-6 flex items-end justify-between text-sm">
                <span className="tracking-widest text-nova-black">
                  •••• {card.last4}
                </span>
                <div className="text-right">
                  <p className="text-xs text-nova-gray">EXP {card.expiry}</p>
                  {!card.isDefault ? (
                    <button
                      type="button"
                      onClick={() => setDefaultPayment(card.id)}
                      className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-nova-accent hover:underline"
                    >
                      Set as default
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {showPaymentForm ? (
            <div className="sm:col-span-2 lg:col-span-1">
              <PaymentForm
                onCancel={() => setShowPaymentForm(false)}
                onSave={addPaymentMethod}
              />
            </div>
          ) : (
            <AddCard
              label="Add payment method"
              onClick={() => setShowPaymentForm(true)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
