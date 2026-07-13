import { useCart } from "../context/CartContext";
import { X } from "lucide-react";

export default function CartDropdown({ isOpen, onClose }) {
  const { items, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-xl z-50">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-semibold">Səbət ({items.length})</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-gray-500">
          Səbətiniz boşdur.
        </div>
      ) : (
        <>
          <ul className="max-h-60 overflow-y-auto px-4 py-2 divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Cəmi</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={clearCart}
              className="mt-2 w-full rounded bg-black py-2 text-sm text-white hover:bg-gray-800"
            >
              Səbəti təmizlə
            </button>
          </div>
        </>
      )}
    </div>
  );
}
