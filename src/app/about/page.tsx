"use client";

import React from "react"; // for React components
import Image from "next/image"; // for optimized images
import { motion } from "framer-motion";
import Navbar from "../components/home/navbar/Navbar";
import Footer from "../components/footer/Footer";
import hero from "public/homefood.png";
import Link from "next/link"; // for navigation
// import { motion } from "framer-motion"; // optional (for animations)

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="relative w-full h-screen font-poppins pt-28 md:pt-36">
        <Image
          src="/homefood.jpg"
          alt="homeimg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              Our Story
            </h1>
            <div className="text-base md:text-lg lg:text-xl font-normal max-w-3xl">
              Celebrating The Heart and Soul of Nigerian Cuisine
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pt-16 md:pt-24 text-center px-4">
        <div className="font-bold text-2xl md:text-4xl lg:text-4xl">
          A Culinary Journey Through Nigeria
        </div>
        <div className="pt-8 md:pt-12 text-gray-400 w-full md:w-4/5 lg:w-1/2 mx-auto text-sm md:text-base leading-relaxed">
          At Taste of Nigeria, our journey began with a simple yet profound love
          for Nigerian cuisine. Founded by Chef Adunni, a passionate advocate
          for authentic flavors, our mission is to bring the rich tapestry of
          Nigerian dishes to your table. From the bustling markets of Lagos to
          the serene landscapes of the countryside, we source the finest
          ingredients to create meals that are both traditional and innovative.
        </div>
      </div>

      <div className="pt-16 md:pt-24 text-center px-4">
        <div className="font-bold text-2xl md:text-4xl lg:text-4xl">
          Our Philosophy
        </div>
        <div className="pt-8 md:pt-12 text-gray-400 w-full md:w-4/5 lg:w-1/2 mx-auto text-sm md:text-base leading-relaxed">
          We believe that food is more than just sustenance; it's a celebration
          of culture, heritage, and community. Our dishes are prepared with
          time-honored techniques passed down through generations, ensuring that
          every bite is a taste of home. We are committed to using sustainable
          practices and supporting local farmers, reflecting our respect for the
          environment and our community.
        </div>
      </div>

      <div className="pt-16 md:pt-24 text-center px-4 pb-24">
        <div className="font-bold text-2xl md:text-4xl lg:text-4xl">
          Meet The Team Behind Olobe
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
          <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
            ori eyan
          </div>
          <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
            Ori eyan
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
