import { useEffect, useMemo, useState } from "react";
import { mockProducts } from "../../data/mockProducts";
import { useCart } from "../../context/CartContext";

const CATEGORY_LABELS = {
  men: "Men",
  women: "Women",
  electronics: "Electronics",
  home: "Home",
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function useCountdown(durationSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    const targetTimestamp = Date.now() + durationSeconds * 1000;

    const tick = () => {
      setSecondsLeft(
        Math.max(Math.round((targetTimestamp - Date.now()) / 1000), 0),
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [durationSeconds]);

  return {
    days: Math.floor(secondsLeft / 86400),
    hours: Math.floor((secondsLeft % 86400) / 3600),
    minutes: Math.floor((secondsLeft % 3600) / 60),
    seconds: secondsLeft % 60,
  };
}

function HeroCountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-nova-black text-lg font-bold text-white sm:h-14 sm:w-14 sm:text-xl">
        {pad(value)}
      </div>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-white/80">
        {label}
      </span>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const originalPrice = product.discount
    ? product.price / (1 - product.discount / 100)
    : null;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        {product.discount ? (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white">
            -{product.discount}%
          </span>
        ) : null}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pt-3">
        <h3 className="text-sm font-semibold leading-snug text-nova-black">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400">{product.brand}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold text-nova-black">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice ? (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onAddToCart?.(product)}
        className="mx-2 mb-2 mt-3 rounded-lg bg-nova-black py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}

function UpcomingDealCard({ product, unlockInSeconds }) {
  const { hours, minutes, seconds } = useCountdown(unlockInSeconds);
  const totalHours =
    hours +
    (unlockInSeconds >= 86400 ? 24 * Math.floor(unlockInSeconds / 86400) : 0);

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
      <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40 blur-[2px] grayscale"
        />
        <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
          Unlocks in
        </span>
        <span className="relative z-10 rounded-md bg-white/90 px-3 py-1 text-sm font-bold text-nova-black">
          {pad(totalHours)}:{pad(minutes)}:{pad(seconds)}
        </span>
      </div>

      <div className="px-2 pt-3">
        <h3 className="text-sm font-medium text-nova-black">{product.name}</h3>
      </div>

      <button
        type="button"
        className="mx-2 mb-2 mt-3 rounded-lg border border-gray-300 py-2.5 text-xs font-semibold text-nova-black transition hover:border-nova-black"
      >
        Notify Me
      </button>
    </div>
  );
}

export default function SalePage() {
  const { addToCart } = useCart();

  const saleProducts = useMemo(
    () => mockProducts.filter((product) => product.discount),
    [],
  );

  const upcomingProducts = useMemo(
    () => mockProducts.filter((product) => !product.discount).slice(0, 3),
    [],
  );

  const filters = useMemo(() => {
    const categories = new Set(
      saleProducts.map(
        (product) => CATEGORY_LABELS[product.category] || product.category,
      ),
    );
    return ["All Items", ...categories];
  }, [saleProducts]);

  const [activeFilter, setActiveFilter] = useState("All Items");

  const SALE_DURATION_SECONDS = 2 * 86400 + 14 * 3600 + 45 * 60 + 25;
  const countdown = useCountdown(SALE_DURATION_SECONDS);

  const visibleProducts =
    activeFilter === "All Items"
      ? saleProducts
      : saleProducts.filter(
          (product) =>
            (CATEGORY_LABELS[product.category] || product.category) ===
            activeFilter,
        );

  return (
    <div className="w-full bg-[#fafafa] pb-16">
      <div className="relative flex min-h-[320px] flex-col items-center justify-between gap-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 px-8 py-12 text-white sm:px-12 sm:flex-row lg:min-h-[340px]">
        <div>
          <h1 className="text-4xl font-black italic leading-none sm:text-5xl">
            MEGA
            <br />
            FLASH
            <br />
            SALE
          </h1>
          <p className="mt-4 text-sm font-semibold tracking-wide sm:text-base">
            SAVE UP TO 70%
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Limited Time Only
          </span>
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
            Mega Sale Up To 70%
          </h2>

          <div className="flex items-center gap-3 sm:gap-4">
            <HeroCountdownBox value={countdown.days} label="Days" />
            <span className="pb-4 text-lg font-bold text-white/60">:</span>
            <HeroCountdownBox value={countdown.hours} label="Hours" />
            <span className="pb-4 text-lg font-bold text-white/60">:</span>
            <HeroCountdownBox value={countdown.minutes} label="Minutes" />
            <span className="pb-4 text-lg font-bold text-white/60">:</span>
            <HeroCountdownBox value={countdown.seconds} label="Seconds" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mt-8 flex flex-wrap items-center gap-6 border-b border-gray-200 pb-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "relative pb-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                activeFilter === filter
                  ? "text-nova-black after:absolute after:left-0 after:-bottom-[13px] after:h-[2px] after:w-full after:bg-nova-black"
                  : "text-gray-400 hover:text-nova-black",
              ].join(" ")}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-lg font-bold text-nova-black">Upcoming Deals</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {upcomingProducts.map((product, index) => (
              <UpcomingDealCard
                key={product.id}
                product={product}
                unlockInSeconds={(index + 1) * 4 * 3600}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
