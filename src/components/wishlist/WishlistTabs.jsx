import { useState } from "react";
import { IconPlus } from "../account/icons";

const tabs = [
  { id: "all", label: "All items" },
  { id: "summer", label: "Summer 2026" },
  { id: "gifts", label: "Gift Ideas" },
];

export default function WishlistTabs({ activeTab = "all", onTabChange }) {
  const [internalTab, setInternalTab] = useState(activeTab);
  const currentTab = onTabChange ? activeTab : internalTab;

  const handleSelect = (id) => {
    if (onTabChange) {
      onTabChange(id);
    } else {
      setInternalTab(id);
    }
  };

  return (
    <div className="border-b border-nova-border">
      <div className="flex flex-wrap items-center gap-6" role="tablist" aria-label="Wishlist lists">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(tab.id)}
              className={[
                "relative pb-3 text-sm font-medium transition-colors",
                isActive
                  ? "text-nova-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-nova-black"
                  : "text-nova-gray hover:text-nova-black",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}

        <button
          type="button"
          className="inline-flex items-center gap-1.5 pb-3 text-sm font-medium text-nova-accent transition-colors hover:text-indigo-700"
        >
          <IconPlus />
          New list
        </button>
      </div>
    </div>
  );
}
