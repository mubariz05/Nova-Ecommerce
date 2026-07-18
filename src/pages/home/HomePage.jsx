import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Gem } from "lucide-react";
import { mockProducts } from "../../data/mockProducts";

const toteProduct = mockProducts.find((p) => p.id === 14);
const ceramicProduct = mockProducts.find((p) => p.id === 31);
const livingRoomProduct = mockProducts.find((p) => p.id === 34);

const categories = [
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Electronics", value: "electronics" },
  { label: "Home", value: "home" },
].map((c) => ({
  ...c,
  img: mockProducts.find((p) => p.category === c.value)?.image,
  count: mockProducts.filter((p) => p.category === c.value).length,
}));

export default function HomePage() {
  const [dot, setDot] = useState(0);
  const categoriesRef = useRef(null);

  const scrollCategories = (direction) => {
    const node = categoriesRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.6;
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white">
      <section className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
          alt="Summer Collection model"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-4 right-4 sm:left-10 sm:right-10 text-white">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/80 mb-1">
            Editorial
          </p>
          <h1 className="text-2xl sm:text-4xl font-semibold leading-snug mb-3 max-w-md">
            Summer Collection 2026
          </h1>
          <button className="flex items-center gap-1.5 bg-white text-neutral-900 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-full">
            Shop Now
            <ArrowRight size={13} />
          </button>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setDot(i)}
              className={`h-1 rounded-full transition-all ${
                dot === i ? "w-4 bg-white" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-semibold text-neutral-900 flex items-center gap-1.5">
              <span className="text-neutral-400">✦</span> All Curated Picks
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-4">
            {toteProduct && (
              <Link
                to={`/product/${toteProduct.id}`}
                className="row-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden h-[19.5rem] lg:h-[26rem]"
              >
                <img
                  src={toteProduct.image}
                  alt={toteProduct.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-medium text-sm">{toteProduct.name}</p>
                  <p className="text-[11px] text-white/75 leading-tight mt-0.5">
                    {toteProduct.brand} · structural elegance for the modern
                    professional.
                  </p>
                  <p className="text-sm font-semibold mt-1.5">
                    ${toteProduct.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            )}

            {ceramicProduct && (
              <Link
                to={`/product/${ceramicProduct.id}`}
                className="relative rounded-2xl overflow-hidden h-[6.75rem] lg:h-[12.5rem] bg-neutral-100"
              >
                <img
                  src={ceramicProduct.image}
                  alt={ceramicProduct.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white/90 rounded-md px-2 py-1">
                  <p className="text-[10px] font-medium leading-tight text-neutral-900">
                    {ceramicProduct.name}
                  </p>
                  <p className="text-[10px] text-neutral-500 leading-tight">
                    ${ceramicProduct.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            )}

            <Link
              to="/search?curated=premium"
              className="rounded-2xl bg-neutral-900 text-white p-3 h-[9.5rem] lg:h-[12.5rem] flex flex-col justify-between lg:col-start-2 lg:row-start-2"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <Gem size={14} />
              </div>
              <div>
                <p className="text-xs font-medium leading-tight mb-1">
                  Premium Curations
                </p>
                <p className="text-[10px] text-white/60 leading-tight mb-2">
                  Discover pieces crafted for the minimalist taste.
                </p>
                <span className="text-[10px] font-medium underline underline-offset-2">
                  Explore
                </span>
              </div>
            </Link>

            {livingRoomProduct && (
              <Link
                to={`/product/${livingRoomProduct.id}`}
                className="col-span-2 lg:col-span-1 lg:row-span-2 relative rounded-2xl overflow-hidden h-28 lg:h-[26rem]"
              >
                <img
                  src={livingRoomProduct.image}
                  alt={livingRoomProduct.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-medium px-2 py-0.5 rounded-full text-neutral-900">
                  ${livingRoomProduct.price.toFixed(2)}
                </span>
              </Link>
            )}
          </div>
        </section>

        <section className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm sm:text-base font-semibold text-neutral-900">
              Shop by Category
            </h2>
            <div className="flex items-center gap-2 text-neutral-400">
              <button
                type="button"
                onClick={() => scrollCategories("left")}
                aria-label="Scroll categories left"
                className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center transition-colors duration-200 hover:border-neutral-400 hover:text-neutral-700"
              >
                <ArrowLeft size={12} />
              </button>
              <button
                type="button"
                onClick={() => scrollCategories("right")}
                aria-label="Scroll categories right"
                className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center transition-colors duration-200 hover:border-neutral-400 hover:text-neutral-700"
              >
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
          <div
            ref={categoriesRef}
            className="flex w-full max-w-full justify-between sm:justify-start sm:gap-10 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => (
              <Link
                key={c.value}
                to={`/search?category=${c.value}`}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-neutral-100">
                  {c.img && (
                    <img
                      src={c.img}
                      alt={c.label}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <span className="text-[11px] sm:text-sm text-neutral-600">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
