import { useState } from "react";
import { mockProducts } from "../../data/mockProducts";
import {
  IconChevronDown,
  IconHeart,
  IconLayoutGrid,
  IconList,
  IconX,
} from "../../assets/icons/index";

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-black text-[11px] leading-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < count ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

function ProductCard({ p }) {
  const imageSrc = p.image || p.img || "";

  let badge = "";
  if (p.isNew) badge = "NEW";
  else if (p.discount && p.discount > 0) badge = "SALE";

  const rating = p.stars ?? 0;
  const reviews = p.reviews ?? 0;

  let oldPrice = p.oldPrice || null;
  if (!oldPrice && p.discount && p.discount > 0) {
    oldPrice = Math.round((p.price / (1 - p.discount / 100)) * 100) / 100;
  }

  const colorDots = p.colors ? p.colors.slice(0, 3) : [];

  return (
    <div className="group cursor-pointer max-w-[260px] mx-auto">
      <div className="relative aspect-[3/4] bg-white overflow-hidden mb-3">
        <img
          src={imageSrc}
          alt={p.name}
          className="w-full h-full object-cover"
        />
        {badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold tracking-wide px-2 py-1 rounded-sm ${
              badge === "NEW" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {badge}
          </span>
        )}
        <button
          aria-label="Sevimlilərə əlavə et"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
        >
          <IconHeart size={15} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex items-center gap-1.5 mb-1">
        <Stars count={rating} />
        <span className="text-[11px] text-neutral-400">({reviews})</span>
      </div>
      <p className="text-[11px] tracking-wide text-neutral-500 font-medium mb-0.5">
        {p.brand}
      </p>
      <h3 className="text-[14px] text-neutral-900 mb-1.5">{p.name}</h3>
      <div className="flex items-center gap-2">
        <span
          className={`text-[14px] font-semibold ${
            oldPrice ? "text-red-600" : "text-neutral-900"
          }`}
        >
          ${p.price}
        </span>
        {oldPrice && (
          <span className="text-[13px] text-neutral-400 line-through">
            ${oldPrice}
          </span>
        )}
      </div>
      {colorDots.length > 0 && (
        <div className="flex gap-1 mt-2">
          {colorDots.map((c, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border border-neutral-200"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="border-b border-neutral-200 py-5">
      <h4 className="text-[11px] tracking-wider font-semibold text-neutral-500 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function WomenDresses() {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 200, max: 700 });
  const [sortBy, setSortBy] = useState("Relevance");
  const [viewMode, setViewMode] = useState("grid");

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    "#000000",
    "#0f0d0d",
    "#d9c9ae",
    "#2b2b3d",
    "#5b4bff",
    "#c0392b",
  ];
  const sortOptions = [
    "Relevance",
    "Price: Low to High",
    "Price: High to Low",
    "Name",
  ];

  const clearAllFilters = () => {
    setSelectedSize("S");
    setSelectedColor(null);
    setPriceRange({ min: 200, max: 700 });
  };

  const handleSortChange = () => {
    const currentIndex = sortOptions.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortBy(sortOptions[nextIndex]);
  };

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        #root { width: 100%; overflow-x: hidden; }
        body { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
      `}</style>

      <div className="w-full max-w-full px-4 sm:px-6 lg:px-10 py-8 flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white flex-1 overflow-x-hidden">
        <aside className="w-full lg:w-[220px] shrink-0 lg:sticky lg:top-4 lg:self-start">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[15px]">Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-[12px] text-neutral-400 hover:text-neutral-700"
            >
              Clear all
            </button>
          </div>

          <FilterSection title="CATEGORY">
            <ul className="space-y-2 text-[13px]">
              <li className="flex justify-between text-blue-600 font-medium">
                <span>Dresses</span>
                <span>(342)</span>
              </li>
              <li className="flex justify-between text-neutral-600 pl-3">
                <span>Mini Dresses</span>
                <span className="text-neutral-400">(120)</span>
              </li>
              <li className="flex justify-between text-neutral-600 pl-3">
                <span>Midi Dresses</span>
                <span className="text-neutral-400">(150)</span>
              </li>
              <li className="flex justify-between text-neutral-600 pl-3">
                <span>Maxi Dresses</span>
                <span className="text-neutral-400">(72)</span>
              </li>
              <li className="flex justify-between text-neutral-700">
                <span>Tops</span>
                <span className="text-neutral-400">(415)</span>
              </li>
              <li className="flex justify-between text-neutral-700">
                <span>Pants</span>
                <span className="text-neutral-400">(210)</span>
              </li>
            </ul>
          </FilterSection>

          <FilterSection title="PRICE">
            <div className="h-1 bg-neutral-200 rounded-full mb-4 relative">
              <div className="absolute left-[15%] right-[35%] h-1 bg-neutral-900 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={priceRange.min}
                className="w-full border border-neutral-300 rounded px-2 py-1.5 text-[13px] bg-white text-black"
              />
              <span className="text-neutral-400">-</span>
              <input
                readOnly
                value={priceRange.max}
                className="w-full border border-neutral-300 rounded px-2 py-1.5 text-[13px] bg-white text-black"
              />
            </div>
          </FilterSection>

          <FilterSection title="SIZE">
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-9 h-9 text-[13px] rounded border transition ${
                    selectedSize === s
                      ? "bg-black text-white border-black"
                      : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="COLOR">
            <div className="flex flex-wrap gap-2">
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    selectedColor === c
                      ? "border-black ring-2 ring-offset-1 ring-neutral-300"
                      : "border-neutral-200 hover:ring-2 hover:ring-neutral-300"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </FilterSection>
        </aside>

        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="text-[12px] text-neutral-400 mb-3">
            Home <span className="mx-1">›</span> Women{" "}
            <span className="mx-1">›</span>{" "}
            <span className="text-neutral-700">Dresses</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-black">
                Women's Dresses
              </h1>
              <p className="text-[13px] text-neutral-500">342 products</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSortChange}
                className="flex items-center gap-2 border border-neutral-300 rounded-lg px-4 py-2 text-[13px] whitespace-nowrap hover:bg-neutral-50 transition"
              >
                Sort by: {sortBy} <IconChevronDown size={14} />
              </button>
              <div className="hidden sm:flex border border-neutral-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition ${viewMode === "grid" ? "bg-neutral-200" : "hover:bg-neutral-100"}`}
                >
                  <IconLayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition ${viewMode === "list" ? "bg-neutral-200" : "hover:bg-neutral-100"}`}
                >
                  <IconList size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="flex items-center gap-1.5 bg-neutral-100 text-[12px] px-3 py-1.5 rounded-full">
              Size: {selectedSize}{" "}
              <IconX
                size={12}
                className="cursor-pointer"
                onClick={() => setSelectedSize("S")}
              />
            </span>
            <span className="flex items-center gap-1.5 bg-neutral-100 text-[12px] px-3 py-1.5 rounded-full">
              ${priceRange.min} - ${priceRange.max}{" "}
              <IconX
                size={12}
                className="cursor-pointer"
                onClick={() => setPriceRange({ min: 200, max: 700 })}
              />
            </span>
            {selectedColor && (
              <span className="flex items-center gap-1.5 bg-neutral-100 text-[12px] px-3 py-1.5 rounded-full">
                <span
                  className="inline-block w-3 h-3 rounded-full border border-neutral-300"
                  style={{ backgroundColor: selectedColor }}
                />
                <IconX
                  size={12}
                  className="cursor-pointer"
                  onClick={() => setSelectedColor(null)}
                />
              </span>
            )}
          </div>

          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px]"
                : "grid-cols-1 gap-[6px]"
            }`}
          >
            {mockProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-[13px] text-neutral-400 mb-4">
              Showing 4 of 342 products
            </p>
            <button className="border border-neutral-300 rounded-lg px-8 py-2.5 text-[13px] font-medium bg-white text-black hover:bg-black hover:text-white transition-colors">
              Load More
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
