import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, X, Sparkles, Clock, TrendingUp } from "lucide-react";
import { mockProducts } from "../../data/mockProducts";

const BADGE_STYLES = {
  success: "bg-emerald-50 text-emerald-700",
  dark: "bg-gray-900 text-white",
};

function normalizeProduct(product) {
  let badge = null;
  let badgeTone = null;

  if (product.discount) {
    badge = `-${product.discount}%`;
    badgeTone = "success";
  } else if (product.isNew) {
    badge = "New";
    badgeTone = "dark";
  }

  const finalPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  return {
    ...product,
    badge,
    badgeTone,
    price: `$${finalPrice}`,
    disabled: false,
    status: null,
  };
}

function deriveSearchMeta(products) {
  const brands = [...new Set(products.map((p) => p.brand))].sort().slice(0, 4);

  const suggestions = [];
  if (products.some((p) => p.category === "men" && /sneaker/i.test(p.name))) {
    suggestions.push("sneakers in Men");
  }
  if (products.some((p) => p.category === "women" && /sneaker/i.test(p.name))) {
    suggestions.push("sneakers in Women");
  }
  if (products.some((p) => p.discount)) {
    suggestions.push("sneakers Sale");
  }

  const recentSearches = [];
  const dressProduct = products.find((p) => /dress/i.test(p.name));
  const bagProduct = products.find((p) => /bag|wallet/i.test(p.name));

  if (dressProduct) recentSearches.push("White dress");
  if (bagProduct) recentSearches.push("Leather bag");

  const trending = [...products]
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 3)
    .map((p) => {
      const words = p.name.split(" ");
      return words.length > 2 ? words.slice(-2).join(" ") : p.name;
    });

  const aiHintProduct =
    products.find((p) => /dress/i.test(p.name) && p.price < 50) ||
    [...products].sort((a, b) => a.price - b.price)[0];

  const aiHint = aiHintProduct
    ? `try: ${aiHintProduct.name.toLowerCase()} under $${Math.ceil(aiHintProduct.price)}`
    : "try: new arrivals";

  return { brands, suggestions, recentSearches, trending, aiHint };
}

function matchesQuery(product, rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return false;

  if (q === "sneakers in men") {
    return product.category === "men" && /sneaker/i.test(product.name);
  }

  if (q === "sneakers in women") {
    return product.category === "women" && /sneaker/i.test(product.name);
  }

  if (q.includes("sale")) {
    return Boolean(product.discount);
  }

  if (q === "white dress") {
    return (
      /dress/i.test(product.name) ||
      product.colors?.some((color) => color.toLowerCase().includes("white"))
    );
  }

  if (q === "leather bag") {
    return /bag/i.test(product.name) || /leather/i.test(product.name);
  }

  return (
    product.name.toLowerCase().includes(q) ||
    product.brand.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q)
  );
}

function filterProducts(products, query) {
  const q = query.trim();
  if (!q) return [];

  return products
    .filter((product) => matchesQuery(product, q))
    .map(normalizeProduct);
}

function ProductImage({ product }) {
  const { image, name, badge, badgeTone, status, disabled } = product;

  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
      <img
        src={image}
        alt={name}
        className={`w-full h-full object-cover ${disabled ? "grayscale opacity-70" : ""}`}
      />
      {badge && (
        <span
          className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-1 rounded-full ${
            BADGE_STYLES[badgeTone] || BADGE_STYLES.dark
          }`}
        >
          {badge}
        </span>
      )}
      {status && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <span className="text-[10px] font-semibold tracking-wide text-gray-700 bg-white px-2.5 py-1 rounded-full shadow-sm">
            {status}
          </span>
        </div>
      )}
    </div>
  );
}

const SEARCH_META = deriveSearchMeta(mockProducts);

export default function SearchOverlay({ onClose, initialQuery }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [recentSearches, setRecentSearches] = useState(
    SEARCH_META.recentSearches,
  );
  const initialQueryFromUrl = searchParams.get("q") || initialQuery || "sneak";
  const [query, setQuery] = useState(initialQueryFromUrl);

  const filteredProducts = useMemo(
    () => filterProducts(mockProducts, query),
    [query],
  );

  const handleViewAll = () => {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAiHint = () => {
    const hintProduct =
      mockProducts.find((p) => /dress/i.test(p.name) && p.price < 50) ||
      [...mockProducts].sort((a, b) => a.price - b.price)[0];

    if (hintProduct) {
      setQuery(hintProduct.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 font-sans bg-white flex flex-col min-h-screen overflow-y-auto">
      <div className="flex items-center gap-5 px-6 py-5 lg:px-8 lg:py-6 border-b border-gray-100 shrink-0 mt-16 sm:mt-[72px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="text-gray-500 hover:text-gray-900 transition-colors shrink-0"
        >
          <X size={24} strokeWidth={1.75} />
        </button>

        <span className="font-bold tracking-widest text-xl lg:text-2xl shrink-0 select-none">
          NOVA
        </span>

        <div className="flex-1 flex items-center gap-3 border border-indigo-400 rounded-lg px-4 py-3 max-w-2xl focus-within:ring-2 focus-within:ring-indigo-100">
          <Search
            size={20}
            className="text-gray-400 shrink-0"
            strokeWidth={2}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-base lg:text-lg text-gray-800 placeholder-gray-400 bg-transparent"
            placeholder="Search products, brands..."
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-gray-400 hover:text-gray-600 shrink-0"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleAiHint}
          className="hidden md:flex items-center gap-2 bg-indigo-50 text-indigo-600 text-sm font-medium px-4 py-2.5 rounded-full whitespace-nowrap shrink-0 hover:bg-indigo-100 transition-colors"
        >
          <Sparkles size={15} strokeWidth={2} />
          {SEARCH_META.aiHint}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] gap-0">
        <div className="px-6 py-8 lg:px-8 md:border-r border-gray-100 flex flex-col gap-9">
          {SEARCH_META.suggestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-400 mb-4">
                SUGGESTIONS
              </p>
              <ul className="flex flex-col gap-4">
                {SEARCH_META.suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => setQuery(suggestion)}
                      className="flex items-center gap-3 text-base text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                      <Search
                        size={16}
                        className="text-gray-400"
                        strokeWidth={2}
                      />
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 mb-4">
              BRANDS
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SEARCH_META.brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setQuery(brand)}
                  className="text-sm lg:text-base text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:border-gray-400 transition-colors"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {recentSearches.length > 0 && (
            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold tracking-widest text-gray-400">
                  RECENT SEARCHES
                </p>
                <button
                  type="button"
                  onClick={() => setRecentSearches([])}
                  className="text-xs text-gray-400 underline hover:text-gray-600"
                >
                  Clear All
                </button>
              </div>
              <ul className="flex flex-col gap-4">
                {recentSearches.map((recent) => (
                  <li key={recent}>
                    <button
                      type="button"
                      onClick={() => setQuery(recent)}
                      className="flex items-center gap-3 text-base text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                      <Clock
                        size={16}
                        className="text-gray-400"
                        strokeWidth={2}
                      />
                      {recent}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-gray-400 mb-4">
              <TrendingUp size={14} strokeWidth={2.25} />
              TRENDING NOW
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SEARCH_META.trending.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="text-sm lg:text-base text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-8 lg:px-10 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-semibold tracking-widest text-gray-400">
              PRODUCT MATCHES
            </p>
            {filteredProducts.length > 0 && (
              <button
                type="button"
                onClick={handleViewAll}
                className="text-sm lg:text-base font-medium text-gray-800 underline underline-offset-2 hover:text-indigo-600 flex items-center gap-1"
              >
                View all {filteredProducts.length} results
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-base text-gray-400">
              No products found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
              {filteredProducts.slice(0, 10).map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleProductClick(product.id)}
                  disabled={product.disabled}
                  className={`text-left group ${product.disabled ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <div className="rounded-lg overflow-hidden mb-3 border border-gray-100 group-hover:border-gray-300 transition-colors">
                    <ProductImage product={product} />
                  </div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-gray-400 mb-0.5">
                    {product.brand}
                  </p>
                  <p className="text-base text-gray-900 font-medium leading-snug">
                    {product.name}
                  </p>
                  <p className="text-base text-gray-900 mt-1 font-medium">
                    {product.price}
                  </p>
                </button>
              ))}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="mt-auto pt-10 pb-4 text-center">
              <button
                type="button"
                onClick={handleViewAll}
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-indigo-600 transition-colors"
              >
                View all {filteredProducts.length} results
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
