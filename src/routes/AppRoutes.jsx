import { Routes, Route, useParams } from "react-router-dom";
import AccountLayout from "../layouts/AccountLayout";
import MainLayout from "../layouts/MainLayout";

import SearchResults from "../pages/products/SearchResults";
import WomenDresses from "../pages/products/WomenDresses";

import ShoppingCart from "../pages/cart/ShoppingCart";

import OrderHistory from "../pages/account/OrderHistory";
import Wishlist from "../pages/account/Wishlist";

import HelpCenter from "../pages/support/HelpCenter";
import ReturnExchangeWizard from "../pages/support/ReturnExchangeWizard";

import EmptyStateShowcase from "../pages/showcase/EmptyStateShowcase";

import SearchOverlay from "../pages/products/SearchOverlay";

function SearchOverlayRedirect() {
  const { searchTerm } = useParams();
  return (
    <SearchOverlay
      onClose={() => window.history.back()}
      initialQuery={searchTerm}
    />
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="search" element={<SearchResults />} />
        <Route path="women/dresses" element={<WomenDresses />} />

        <Route path="cart" element={<ShoppingCart />} />

        <Route element={<AccountLayout />}>
          <Route path="account/orders" element={<OrderHistory />} />

          <Route path="account/wishlist" element={<Wishlist />} />
        </Route>

        <Route path="support" element={<HelpCenter />} />
        <Route
          path="support/return-exchange"
          element={<ReturnExchangeWizard />}
        />

        <Route path="empty-state" element={<EmptyStateShowcase />} />
      </Route>
      <Route
        path="search/overlay"
        element={<SearchOverlay onClose={() => window.history.back()} />}
      />
      <Route path=":searchTerm" element={<SearchOverlayRedirect />} />
    </Routes>
  );
}
