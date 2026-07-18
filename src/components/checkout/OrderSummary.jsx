import subtotalOf from "../../utils/subTotalOf";

function OrderSummary({
  items,
  shippingCost,
  discount,
  title = "Order Summary",
}) {
  const subtotal = subtotalOf(items);
  const taxes = subtotal * 0.08;
  const total = subtotal + shippingCost + taxes - discount;

  return (
    <div className="rounded-xl border border-nova-border bg-white p-5">
      <h2 className="text-sm font-bold text-nova-black">{title}</h2>
      <p className="mt-0.5 text-xs text-nova-gray">Complete your purchase</p>

      <div className="mt-4 flex flex-col gap-3 border-t border-nova-border pt-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className={`h-10 w-10 shrink-0 rounded-lg ${item.color}`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-nova-black">{item.name}</p>
              <p className="text-xs text-nova-gray">{item.variant}</p>
            </div>
            <p className="text-sm font-medium text-nova-black">
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-nova-border pt-4 text-sm">
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
          <span>Taxes</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between text-nova-accent">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-nova-border pt-4">
        <span className="text-sm font-bold text-nova-black">Total</span>
        <span className="text-xl font-bold text-nova-black">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
export default OrderSummary;
