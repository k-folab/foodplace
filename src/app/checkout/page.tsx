"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Navbar from "../components/home/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type CartItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  price: number;
  quantity?: number;
};

const STORAGE_KEY = "foodplace_cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(500);

  const checkoutRef = useRef<HTMLDivElement>(null);

  // Read cart + saved info
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const address = localStorage.getItem("deliveryAddress");
    const phoneNum = localStorage.getItem("phone");

    if (raw) setCart(JSON.parse(raw));
    if (address) setDeliveryAddress(address);
    if (phoneNum) setPhone(phoneNum);
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + (it.price ?? 0) * (it.quantity ?? 1), 0),
    [cart]
  );

  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  //   const handleDownloadPDF = async () => {
  //     if (!checkoutRef.current) return;
  //     const canvas = await html2canvas(checkoutRef.current, {
  //       useCORS: true,
  //       backgroundColor: "#ffffff", // ensures background rendering
  //       scale: 2, // sharper image
  //     });
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
  //     pdf.save("FoodPlace_Checkout.pdf");
  //   };

  return (
    <main className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-20" ref={checkoutRef}>
        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            Your cart is empty.
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-10">
              <h2 className="font-semibold text-lg mb-4 text-gray-800">
                Your Order
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border border-gray-200 rounded-lg p-3 hover:shadow transition"
                  >
                    <div className="w-24 h-20 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center text-sm text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ₦{item.price} × {item.quantity ?? 1}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-orange-600">
                      ₦{item.price * (item.quantity ?? 1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-10">
              <h2 className="font-semibold text-xl mb-4 text-gray-800">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <span className="font-medium ">Delivery Address:</span>
                  <div className="   mt-2 text-orange-700">
                    {deliveryAddress || "No address provided"}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Phone Number:</span>
                  <div className="   mt-2 text-orange-700 ">
                    {phone || "No phone number provided"}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-10">
              <h2 className="font-semibold text-lg mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span className="text-orange-600">₦{total}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <a
                href="/order"
                className=" bg-orange-500 text-white px-6 py-3 rounded-lg  hover:bg-orange-600 transition"
              >
                Back to Order
              </a>

              <button
                onClick={() => alert("Order placed successfully.")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition cursor-pointer"
              >
                Place Order
              </button>

              {/* <button
                onClick={handleDownloadPDF}
                className=" bg-gray-300 text-gray-800 px-6 py-3 rounded-lg  hover:bg-gray-400 transition"
              >
                Download PDF
              </button> */}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
