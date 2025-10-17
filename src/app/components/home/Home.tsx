"use client";

import React from "react"; // for React components
import Image from "next/image"; // for optimized images
import { motion } from "framer-motion";
import hero from "public/homefood.png";
import Link from "next/link"; // for navigation
// import { motion } from "framer-motion"; // optional (for animations)

const Home = () => {
  return (
    <div className="relative w-full h-screen font-poppins pt-36">
      {/* Background Image */}
      <Image
        src="/homefood.jpg"
        alt="homeimg"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated Content */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-snug">
          Taste The Authentic Flavours Of{" "}
          <span className="text-orange-500">Nigeria</span>
        </h1>

        <p className="mt-4 md:mt-6 text-white w-full md:w-4/5 lg:w-1/2 mx-auto text-sm md:text-base leading-relaxed">
          Experience the rich culinary heritage of Nigeria with our exquisite
          dishes prepared with passion and tradition.
        </p>

        <a
          href="/menu"
          className="mt-8 bg-orange-500 text-sm md:text-base text-white px-8 py-3 md:py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
        >
          Order Now
        </a>
      </motion.div>
    </div>
  );
};

export default Home;
