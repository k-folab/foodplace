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
      <Image src="/homefood.jpg" alt="homeimg" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white text-center p-4">
          <h1 className="text-5xl font-bold ">
            Taste The Authentic Flavours Of Nigeria
          </h1>
          <div className="text-lg  font-medium">
            Experience the rich culinary heritage of Nigeria with our exquisite
            dishes, <br /> prepared withpassion and tradition
          </div>
          <a
            href="/menu"
            className="bg-orange-500 text-sm text-white px-8 py-5 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
          >
            Order Now
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
