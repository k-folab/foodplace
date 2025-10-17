"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/home/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!formRef.current) return;

    // front-end validation
    const form = formRef.current;
    const fd = new FormData(form);
    const name = (fd.get("from_name") as string) || "";
    const email = (fd.get("from_email") as string) || "";
    const phone = (fd.get("phone") as string) || "";

    const message = (fd.get("message") as string) || "";

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all fields including phone number.",
      });
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_trrmhnh",
        "template_8z1ogio",
        formRef.current,
        "gPV72eYyWYmuok__T"
      );
      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ type: "error", message: "Failed to send. Try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-12 px-4">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <h2 className="text-4xl font-bold text-black mb-2 pl-20">
            Get in Touch
          </h2>
        </motion.div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <p className="text-gray-600 mb-6 text-md">
              We are here to assist you with any inquiries or feedback. Reach
              out to us through the contact form or via the provided contact
              details.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  name="from_name"
                  type="text"
                  className="w-full border text-black placeholder-gray-400 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  name="from_email"
                  type="email"
                  className="w-full border text-black placeholder-gray-400 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full border text-black placeholder-gray-400 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full border text-black placeholder-gray-400 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center justify-center px-6 py-2 rounded bg-orange-500 w-full text-white font-medium hover:bg-orange-600 transition ${
                    loading ? "opacity-80 cursor-wait" : ""
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                  <div
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT: Map & Contact card */}
          <div className="space-y-6 shadow-2xl">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-3xl text-black font-semibold mb-2">
                Our Contact Information
              </h3>
              <p className="text-gray-600 mb-4">
                Reach us via phone, email, or drop by our office.
              </p>

              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm">Phone</div>
                    <div className="text-xs text-gray-500">
                      +234 704 983 4715
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm">Email</div>
                    <div className="text-xs text-gray-500">
                      emmanuelkehinde235@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm">Address</div>
                    <div className="text-xs text-gray-500">
                      OAU Campus, Ile-Ife, Osun
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <iframe
                title="Our location"
                src="https://www.google.com/maps?q=Ikeja%20Lagos%20Nigeria&output=embed"
                className="w-full h-80"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="pt-28 text-center">
          <div className="text-3xl font-bold text-black">
            What Our Customers Say
          </div>
          <div className="text-gray-500 text-sm pt-2">
            Real Reviews from our Amazing Customers
          </div>
          <div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">Alvin Delio</h3>
                  <p className="text-gray-500 text-sm">2023-09-15</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                The focus was absolutely delicious! I ordered the bulk filled
                and was cooked to perfection. The flavor were authentic and the
                service was excellent. Highly recommend!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">Chukwadi Okwo</h3>
                  <p className="text-gray-500 text-sm">2023-09-22</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                I enjoyed the variety of dishes offered. The legal document
                featured full four items pointing a bit apart for the price.
                Overall a good experience.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  F
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">Fatima Hasan</h3>
                  <p className="text-gray-500 text-sm">2023-05-30</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                Knowing food and grass service? I tried the big award
                transmission facility. The staff was friendly and helpful. Will
                definitely be ordering again.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="pt-12 flex items-center justify-center gap-6 text-gray-600">
          <Link
            href="https://www.instagram.com/_omokehinde._"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-transform duration-300 hover:scale-110"
          >
            <Instagram size={24} />
          </Link>

          <Link
            href="https://x.com/Kehinde34345081"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-transform duration-300 hover:scale-110"
          >
            <Twitter size={24} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/kehinde-afolabi-3bab072b2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-transform duration-300 hover:scale-110"
          >
            <Linkedin size={24} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
