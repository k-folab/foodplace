"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/home/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import { Trash, ShoppingCart } from "lucide-react";

type CartItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string; // e.g. "/jollof.png"
  price: number;
  quantity?: number;
};

const STORAGE_KEY = "foodplace_cart";

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    // ensure qty
    return parsed.map((p) => ({ quantity: 1, ...p }));
  } catch {
    return [];
  }
}

function writeCart(cart: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to write cart", e);
  }
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(500); // example delivery fee (₦)

  useEffect(() => {
    // sync function
    const sync = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        // ensure quantity default
        const normalized = parsed.map((p: any) => ({ quantity: 1, ...p }));
        setCart(normalized);
        console.log("Order page synced cart:", normalized);
      } catch (e) {
        console.error("Order sync error", e);
        setCart([]);
      }
    };

    // initial load
    sync();

    // listeners for updates:
    window.addEventListener("cart_updated", sync); // custom event from addToCartItem
    window.addEventListener("storage", sync); // updates from other tabs/windows

    return () => {
      window.removeEventListener("cart_updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    // persist on cart change
    writeCart(cart);
  }, [cart]);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + (it.price ?? 0) * (it.quantity ?? 1), 0),
    [cart]
  );

  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  function handleRemove(id: string) {
    if (!confirm("Remove this item from your cart?")) return;
    setCart((c) => c.filter((it) => it.id !== id));
  }

  function changeQty(id: string, qty: number) {
    if (qty < 1) return;
    setCart((c) =>
      c.map((it) => (it.id === id ? { ...it, quantity: qty } : it))
    );
  }

  function clearCart() {
    if (!confirm("Clear entire cart?")) return;
    setCart([]);
  }

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!deliveryAddress.trim() || !phone.trim()) {
      alert("Please enter delivery address and phone number.");
      return;
    }

    // example checkout action (replace with real checkout logic)
    const order = {
      cart,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress,
      phone,
      date: Date.now(),
    };
    console.log("Proceed to order:", order);

    // optionally clear cart after ordering:
    // setCart([]);
    alert("Order placed (demo). Check console for order object.");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Order</h1>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">Items in cart</div>
            <div>
              <ShoppingCart className="text-orange-400 w-5" />
            </div>
            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              {cart.length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: items list (2/3 width) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-400 p-6 shadow-sm">
              <h2 className="font-semibold mb-4">Items in Cart</h2>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Your cart is empty.
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center gap-4 border border-gray-400 rounded-lg p-3 hover:shadow-sm transition"
                    >
                      <div className="w-24 h-20 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        {it.image ? (
                          // if image exists under /public
                          <Image
                            src={it.image}
                            alt={it.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center text-sm text-gray-500">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex-1 ">
                        <div className="flex items-start  justify-between">
                          <div>
                            <div className="font-semibold text-lg text-gray-800">
                              {it.title}
                            </div>
                            {it.subtitle && (
                              <div className="text-sm text-gray-500 mt-1">
                                {it.subtitle}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-800">
                              ₦{it.price}
                            </div>
                            <div className="text-sm text-gray-500">each</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center border border-gray-400 rounded-md overflow-hidden">
                            <button
                              onClick={() =>
                                changeQty(it.id, (it.quantity ?? 1) - 1)
                              }
                              className="px-3 py-1"
                              aria-label="decrease"
                            >
                              −
                            </button>
                            <div className="px-4 py-1 min-w-[44px] text-center">
                              {it.quantity ?? 1}
                            </div>
                            <button
                              onClick={() =>
                                changeQty(it.id, (it.quantity ?? 1) + 1)
                              }
                              className="px-3 py-1"
                              aria-label="increase"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemove(it.id)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove{" "}
                            <Trash className="inline-block mb-1 w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Clear cart
                  </button>
                </div>
              )}
            </div>

            {/* Delivery details */}
            <form
              onSubmit={handleCheckout}
              className="bg-white rounded-lg border border-gray-400 p-6 shadow-sm"
            >
              <h3 className="font-semibold mb-4">Delivery Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">
                    Delivery Address
                  </label>
                  <input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your full address"
                    className="mt-1 w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-1 w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>

              {/* <div className="mt-6 flex justify-end">
                <a
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                >
                  Proceed to Checkout
                </a>
              </div> */}
            </form>
          </section>

          {/* RIGHT: order summary (sticky) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-lg border border-gray-400 p-6 shadow-sm">
                <h3 className="font-semibold mb-3">Order Summary</h3>

                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>₦{subtotal}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee}</span>
                </div>

                <div className="border-t mt-3 pt-3 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-xl font-bold">₦{total}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <a
                    onClick={(e) => {
                      e.preventDefault();

                      if (cart.length === 0) {
                        alert("Your cart is empty.");
                        return;
                      }

                      if (!deliveryAddress.trim() || !phone.trim()) {
                        alert(
                          "Please fill in your delivery address and phone number before proceeding."
                        );
                        return;
                      }

                      // ✅ Save details for checkout page
                      localStorage.setItem("deliveryAddress", deliveryAddress);
                      localStorage.setItem("phone", phone);

                      // ✅ Redirect to checkout page
                      window.location.href = "/checkout";
                    }}
                    href="/menu"
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              </div>

              {/* small help card */}
              <div className="bg-white rounded-lg border border-gray-400 p-4 text-sm text-gray-600 shadow-sm">
                <div className="font-medium mb-1">Need help?</div>
                <div>Contact: +234 704 983 4715</div>
                <div className="mt-2 text-xs text-gray-500">
                  You can remove items using the Remove button.
                </div>
              </div>
              <div>
                <a
                  href="/menu"
                  className="bg-orange-500 text-sm text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
                >
                  Back To Menu
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}
