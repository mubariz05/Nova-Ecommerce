export default function ProductCard({ product, onAddToCart }) {
  const { name, price, image, badge, badgeTone, status, disabled } = product;

  const badgeToneClasses =
    badgeTone === "success"
      ? "text-emerald-600 bg-emerald-100"
      : badgeTone === "dark"
        ? "text-white bg-[#151329]"
        : "text-neutral-900 bg-neutral-100";

  return (
    <article
      className={`flex h-full min-w-0 flex-col box-border p-2 rounded-[10px] border border-[rgba(234,231,232,0.95)] bg-white/[0.86] shadow-[0_18px_38px_rgba(24,19,31,0.06)] text-left`}
    >
      <div className="relative w-full aspect-[4/5] shrink-0 overflow-hidden rounded-lg bg-[#f2eeee]">
        {badge ? (
          <span
            className={`absolute z-10 top-3.5 left-3.5 h-6 max-w-[calc(100%-24px)] whitespace-nowrap inline-flex items-center justify-center rounded-full px-2.5 text-xs font-bold leading-none ${badgeToneClasses}`}
          >
            {badge}
          </span>
        ) : null}

        {status ? (
          <span className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[54px] max-w-[calc(100%-24px)] whitespace-nowrap inline-flex items-center justify-center rounded-full border border-[#e6e1e4] bg-white/95 px-7 text-sm font-medium text-[#a29aa4] shadow-[0_10px_22px_rgba(47,39,55,0.08)]">
            {status}
          </span>
        ) : null}

        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`absolute inset-0 block h-full w-full object-cover object-center ${
            disabled ? "opacity-20 grayscale-[0.35]" : ""
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <h2 className="mb-1 min-h-[2.5em] text-[15px] font-bold leading-[1.25] text-[#11101a] line-clamp-2">
          {name}
        </h2>
        <p className="m-0 text-sm leading-[1.35] text-[#5f5965]">{price}</p>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onAddToCart?.(product)}
        className={`mx-4 mb-4 mt-auto min-h-[48px] w-[calc(100%-32px)] rounded-lg border font-bold text-sm leading-none transition-[transform,background-color,border-color] duration-150 ease-in-out focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[rgba(25,23,43,0.24)] focus-visible:outline-offset-[3px] ${
          disabled
            ? "cursor-not-allowed border-[#dfdadd] bg-white text-[#a8a2aa]"
            : "cursor-pointer border-[#19172b] bg-[#19172b] text-white hover:-translate-y-px hover:bg-[#24213d] hover:border-[#24213d]"
        }`}
      >
        {disabled ? "Notify me" : "Add to cart"}
      </button>
    </article>
  );
}
