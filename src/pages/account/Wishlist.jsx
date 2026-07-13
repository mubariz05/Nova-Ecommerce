import { mockProducts } from "../../data/mockProducts";
import WishlistContentHeader from "../../components/wishlist/WishlistContentHeader";
import WishlistTabs from "../../components/wishlist/WishlistTabs";
import { useCart } from "../../context/CartContext";

const IconHeart = ({ size = 16, filled = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconBag = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

function badgeClasses(tone) {
  if (tone === "success") return "bg-emerald-50 text-emerald-700";
  if (tone === "dark") return "bg-black text-white";
  return "bg-neutral-100 text-neutral-700";
}

function WishlistCard({ product, onAddToCart, onRemove }) {
  const isOutOfStock = Boolean(product.disabled);

  return (
    <div
      className={`group relative flex h-full flex-col ${
        isOutOfStock ? "opacity-60" : ""
      }`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${badgeClasses(
              product.badgeTone,
            )}`}
          >
            {product.badge}
          </span>
        )}

        {isOutOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-neutral-900/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
            {product.status}
          </span>
        )}

        <button
          type="button"
          onClick={() => onRemove(product)}
          aria-label="Sevimlilərdən sil"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900 transition hover:bg-white"
        >
          <IconHeart size={15} filled />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <h3 className="text-[13px] leading-snug text-neutral-900">
          {product.name}
        </h3>
        <p className="mt-1 text-[14px] font-semibold text-neutral-900">
          {product.price}
        </p>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product)}
          className={`mt-auto flex items-center justify-center gap-2 rounded-lg py-2.5 text-[12px] font-medium transition ${
            isOutOfStock
              ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
              : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          <IconBag size={14} />
          {isOutOfStock ? "Stokda yoxdur" : "Səbətə əlavə et"}
        </button>
      </div>
    </div>
  );
}

export default function Wishlist() {
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    console.info("Add to cart:", product.name);
    addItem(product);
  };

  const handleRemove = (product) => {
    console.info("Remove from wishlist:", product.name);
  };

  return (
    <section aria-label="My Wishlist">
      <WishlistContentHeader itemCount={mockProducts.length} />
      <WishlistTabs />

      {mockProducts.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-3 py-16 text-center">
          <IconHeart size={28} />
          <p className="text-[14px] text-neutral-500">
            Sevimlilər siyahınız hələ boşdur.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {mockProducts.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}
