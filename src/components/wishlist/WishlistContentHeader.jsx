import { IconShare } from "../account/icons";

export default function WishlistContentHeader({ itemCount = 12 }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-nova-black">
        My Wishlist ({itemCount})
      </h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-nova-border bg-white px-4 py-2 text-sm font-medium text-nova-black transition-colors hover:bg-gray-50"
        >
          <IconShare />
          Share
        </button>
      </div>
    </div>
  );
}
