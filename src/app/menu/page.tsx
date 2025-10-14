"use client";
import Navbar from "../components/home/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  price: number;
};

const STORAGE_KEY = "foodplace_cart";

function addToCartItem(item: Product) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const cart: (Product & { quantity?: number })[] = raw
      ? JSON.parse(raw)
      : [];
    const idx = cart.findIndex((c) => c.id === item.id);

    if (idx > -1) {
      cart[idx].quantity = (cart[idx].quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cart_updated"));
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}

/* --- Food Category Arrays --- */
const riceDishes: Product[] = [
  {
    id: "jollof-1",
    title: "Jollof Rice with Grilled Chicken",
    subtitle: "Spicy Jollof Rice served with perfectly grilled chicken",
    image: "/homefood.jpg",
    price: 2500,
  },
  {
    id: "fried-1",
    title: "Fried Rice",
    subtitle: "Mixed veggies & chicken",
    image: "/homefood.jpg",
    price: 3000,
  },
  {
    id: "coconut-1",
    title: "Coconut Rice",
    subtitle: "Coconut rice with veggies & chicken",
    image: "/homefood.jpg",
    price: 2000,
  },
];

const meats: Product[] = [
  {
    id: "goat-1",
    title: "Goat Meat Pepper Soup",
    subtitle: "Delicious spicy goat meat pepper soup",
    image: "/homefood.jpg",
    price: 2500,
  },
  {
    id: "suya-1",
    title: "Suya (Beef Skewers)",
    subtitle: "Tender grilled beef with pepper and spices",
    image: "/homefood.jpg",
    price: 1800,
  },
  {
    id: "chicken-1",
    title: "Grilled Chicken",
    subtitle: "Juicy grilled chicken with sauce",
    image: "/homefood.jpg",
    price: 2200,
  },
];

const soups: Product[] = [
  {
    id: "egusi-1",
    title: "Egusi Soup",
    subtitle: "Thick melon seed soup with assorted meat",
    image: "/homefood.jpg",
    price: 2000,
  },
  {
    id: "ogbono-1",
    title: "Ogbono Soup",
    subtitle: "Draw soup with assorted meat and fish",
    image: "/homefood.jpg",
    price: 2300,
  },
  {
    id: "efo-1",
    title: "Efo Riro",
    subtitle: "Vegetable soup with fish and meat",
    image: "/homefood.jpg",
    price: 2100,
  },
];

const swallows: Product[] = [
  {
    id: "pounded-1",
    title: "Pounded Yam",
    subtitle: "Soft pounded yam, best served with soup",
    image: "/homefood.jpg",
    price: 1500,
  },
  {
    id: "amala-1",
    title: "Amala",
    subtitle: "Yam flour swallow with ewedu and gbegiri",
    image: "/homefood.jpg",
    price: 1500,
  },
  {
    id: "semo-1",
    title: "Semovita",
    subtitle: "Smooth semo served with any soup of choice",
    image: "/homefood.jpg",
    price: 1400,
  },
];

export default function Menupage() {
  const renderCategory = (title: string, items: Product[]) => (
    <section className="pt-10">
      <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {items.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-orange-100 rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={p.image ?? "/placeholder.png"}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-black mt-3">
                {p.title}
              </h3>
              <p className="text-sm text-black">{p.subtitle}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="bg-orange-500 w-min p-2 rounded-full text-white">
                  ₦{p.price}
                </div>
                <button
                  onClick={() => addToCartItem(p)}
                  className="font-bold bg-orange-100 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-200 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div>
      <Navbar />
      <div className="font-poppins pt-24">
        <div className="text-center pt-10">
          <div className="font-bold text-5xl">Our Delicious Menu</div>
          <div className="text-md text-gray-500 pt-3">
            Discover the Rich Authentic flavors of Nigeria. Every dish is a
            story prepared
            <br />
            with love and the finest ingredients.
          </div>
        </div>

        <div className="pb-5 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold pt-8">All Dishes</h1>
            <Link
              href="/order"
              className="bg-orange-500 text-sm text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
            >
              View Order
            </Link>
          </div>
          <div className="w-[97%] mx-auto mt-3 border-b-2 border-orange-500"></div>
          <main className="p-6 max-w-6xl mx-auto">
            {renderCategory("Rice Dishes", riceDishes)}
            {renderCategory("Meat Dishes", meats)}
            {renderCategory("Soups", soups)}
            {renderCategory("Swallows", swallows)}
          </main>
        </div>
      </div>
    </div>
  );
}
