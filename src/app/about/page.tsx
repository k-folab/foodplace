"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/home/navbar/Navbar";
import Footer from "../components/footer/Footer";

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
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3">
            Our Story
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-normal max-w-3xl">
            Celebrating The Heart and Soul of{" "}
            <span className="text-orange-500">Nigerian</span> Cuisine
          </p>
        </motion.div>
      </div>
      <div className="pt-12 bg-white">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pt-16 md:pt-24 text-center px-4">
            <div className="font-bold text-2xl md:text-4xl lg:text-4xl text-black">
              A Culinary Journey Through Nigeria
            </div>
            <div className="pt-8 md:pt-12 text-gray-400 w-full md:w-4/5 lg:w-1/2 mx-auto text-sm md:text-base leading-relaxed">
              At Taste of Nigeria, our journey began with a simple yet profound
              love for Nigerian cuisine. Founded by{" "}
              <span className="text-orange-500 font-medium">Chef Adunni</span>,
              a passionate advocate for authentic flavors, our mission is to
              bring the rich tapestry of Nigerian dishes to your table. From the
              bustling markets of Lagos to the serene landscapes of the
              countryside, we source the finest ingredients to create meals that
              are both traditional and innovative.
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pt-16 md:pt-24 text-center px-4">
            <div className="font-bold text-2xl md:text-4xl lg:text-4xl text-black">
              Our Philosophy
            </div>
            <div className="pt-8 md:pt-12 text-gray-400 w-full md:w-4/5 lg:w-1/2 mx-auto text-sm md:text-base leading-relaxed">
              We believe that food is more than just sustenance; it is a
              celebration of culture, heritage, and community. Our dishes are
              prepared with time-honored techniques passed down through
              generations, ensuring that every bite is a taste of home. We are
              committed to using sustainable practices and supporting local
              farmers, reflecting our respect for the environment and our
              community.
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pt-16 md:pt-24 text-center px-4 pb-24">
            <div className="font-bold text-2xl md:text-4xl lg:text-4xl text-black">
              Meet The Team Behind Olobe
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-32 pt-6">
              <div>
                <div className="w-40 h-40 bg-gray-100 rounded-full border border-orange-500 flex items-center justify-center text-gray-600 overflow-hidden shadow-2xl">
                  <Image
                    src="/woman.jpg"
                    alt="Profile picture"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full p-2"
                  />
                </div>
                <div className="pt-6 text-md text-black">Chef Adunni</div>
                <div className="text-orange-500 text-sm">
                  Founder $ Executive
                </div>
              </div>
              <div>
                <div className="w-40 h-40 bg-gray-100 rounded-full border border-orange-500 flex items-center justify-center text-gray-600 overflow-hidden shadow-2xl">
                  <Image
                    src="/man.png"
                    alt="Profile picture"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full p-2"
                  />
                </div>
                <div className="pt-6 text-md text-black">Chef Adebayo</div>
                <div className="text-orange-500 text-sm">
                  Head of Operations
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
