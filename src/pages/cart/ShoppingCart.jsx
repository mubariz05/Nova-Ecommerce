import ProductCard from "../../components/product/ProductCard";

const cartProducts = [
  {
    id: 1,
    name: "Cashmere Blend Knit",
    price: "$320.00",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80",
    badge: "Price dropped 15%",
    badgeTone: "success",
  },
  {
    id: 2,
    name: "Aura Crossbody Bag",
    price: "$450.00",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80",
    badge: "Back in stock!",
    badgeTone: "dark",
  },
  {
    id: 3,
    name: "Monolith Lamp",
    price: "$145.00",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80",
    status: "Out of stock",
    disabled: true,
  },
  {
    id: 4,
    name: "Slim Cardholder",
    price: "$85.00",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80",
  },
];

const ShoppingCart = () => {
  return (
    <main className="shopping-cart-page" aria-label="Shopping cart">
      <section className="cart-product-grid">
        {cartProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default ShoppingCart;
