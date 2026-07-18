import { cartItems } from "../../data/cardItems";
import OrderSummary from "./OrderSummary";

function PaymentStep({
  paymentMethod,
  setPaymentMethod,
  card,
  setCard,
  billingSame,
  setBillingSame,
  saveCard,
  setSaveCard,
  onBack,
  onContinue,
  shippingCost,
  discount,
}) {
  const updateCard = (field) => (e) =>
    setCard((c) => ({ ...c, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      paymentMethod === "card" &&
      (!card.number || !card.expiry || !card.cvv || !card.name)
    )
      return;
    onContinue();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-sm font-bold text-nova-black">Payment Method</h2>

        <label
          className={[
            "flex flex-col gap-4 rounded-xl border-2 p-4 transition-colors duration-200",
            paymentMethod === "card"
              ? "border-nova-accent"
              : "border-nova-border",
          ].join(" ")}
        >
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-3 text-sm font-medium text-nova-black">
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="accent-nova-accent"
              />
              Credit or Debit Card
            </span>
            <span className="text-xs font-semibold text-nova-gray">
              VISA · MC
            </span>
          </span>

          {paymentMethod === "card" ? (
            <div className="flex flex-col gap-3 pl-6">
              <div>
                <label className="mb-1 block text-xs font-medium text-nova-gray">
                  Card Number
                </label>
                <input
                  placeholder="0000 0000 0000 0000"
                  value={card.number}
                  onChange={updateCard("number")}
                  className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-nova-gray">
                    Expiration Date
                  </label>
                  <input
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={updateCard("expiry")}
                    className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-nova-gray">
                    Security Code (CVV)
                  </label>
                  <input
                    placeholder="123"
                    value={card.cvv}
                    onChange={updateCard("cvv")}
                    className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-nova-gray">
                  Name on Card
                </label>
                <input
                  placeholder="Jane Doe"
                  value={card.name}
                  onChange={updateCard("name")}
                  className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-nova-black">
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={(e) => setBillingSame(e.target.checked)}
                  className="accent-nova-accent"
                />
                Billing address same as shipping
              </label>
              <label className="flex items-center gap-2 text-sm text-nova-black">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="accent-nova-accent"
                />
                Save this card for future purchases
              </label>
            </div>
          ) : null}
        </label>

        <label
          className={[
            "flex items-center gap-3 rounded-xl border-2 p-4 text-sm font-medium text-nova-black transition-colors duration-200",
            paymentMethod === "paypal"
              ? "border-nova-accent"
              : "border-nova-border",
          ].join(" ")}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
            className="accent-nova-accent"
          />
          PayPal
        </label>

        <label
          className={[
            "flex items-center gap-3 rounded-xl border-2 p-4 text-sm text-nova-black transition-colors duration-200",
            paymentMethod === "klarna"
              ? "border-nova-accent"
              : "border-nova-border",
          ].join(" ")}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === "klarna"}
            onChange={() => setPaymentMethod("klarna")}
            className="accent-nova-accent"
          />
          <span>
            <span className="block font-medium">Klarna</span>
            <span className="block text-xs text-nova-gray">
              4 interest-free payments of $32.13
            </span>
          </span>
        </label>

        <div className="flex items-center justify-between border-t border-nova-border pt-6">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-nova-gray hover:text-nova-black"
          >
            ← Back to shipping
          </button>
          <button
            type="submit"
            className="rounded-lg bg-nova-black px-6 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
          >
            Continue to Review
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

export default PaymentStep;
