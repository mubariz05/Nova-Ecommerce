import { Routes, Route, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import SearchResults from "../pages/products/SearchResults";
import WomenDresses from "../pages/products/WomenDresses";
import ShoppingCart from "../pages/cart/ShoppingCart";
import AccountOverview from "../pages/account/AccountOverview";
import OrderHistory from "../pages/account/OrderHistory";
import OrderDetails from "../pages/account/OrderDetails";
import Wishlist from "../pages/account/Wishlist";
import AccountAddresses from "../pages/account/AccountAddresses";
import AccountPayment from "../pages/account/AccountPayment";
import AccountProfile from "../pages/account/AccountProfile";
import HelpCenter from "../pages/support/HelpCenter";
import ReturnExchangeWizard from "../pages/support/ReturnExchangeWizard";
import EmptyStateShowcase from "../pages/showcase/EmptyStateShowcase";
import SearchOverlay from "../pages/products/SearchOverlay";
import NovaCommerceAuth from "../pages/LoginRegister/LoginRegister";

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
        <Route index element={<HomePage />} />

        <Route path="search" element={<SearchResults />} />
        <Route path="women/dresses" element={<WomenDresses />} />
        <Route path="shopping/cart" element={<ShoppingCart />} />

        <Route path="account" element={<AccountOverview />} />
        <Route path="account/orders" element={<OrderHistory />} />
        <Route path="account/orders/:orderId" element={<OrderDetails />} />
        <Route path="account/wishlist" element={<Wishlist />} />
        <Route path="account/addresses" element={<AccountAddresses />} />
        <Route path="account/checkout" element={<AccountPayment />} />
        <Route path="account/reviews" element={<OrderDetails />} />
        <Route path="account/profile" element={<AccountProfile />} />

        <Route path="support" element={<HelpCenter />} />
        <Route
          path="support/return-exchange"
          element={<ReturnExchangeWizard />}
        />

        <Route path="empty-state" element={<EmptyStateShowcase />} />
        <Route
          path="search/overlay"
          element={<SearchOverlay onClose={() => window.history.back()} />}
        />
        <Route path=":searchTerm" element={<SearchOverlayRedirect />} />
      </Route>
      <Route path="login" element={<NovaCommerceAuth />} />
      <Route
        path="login/register"
        element={<NovaCommerceAuth initialTab="signup" />}
      />
    </Routes>
  );
}
