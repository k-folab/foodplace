"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  return (
    <div className="bg-black p-5 text-sm mt-11 text-white">
      <div className="flex justify-between">
        <ul className="flex flex-col gap-4 mt-2 text-sm font-medium">
          <a href="/">
            <li className="hover:text-orange-600 transition-colors duration-300">
              Home
            </li>
          </a>
          <a href="/menu">
            <li className="hover:text-orange-600 transition-colors duration-300">
              Menu
            </li>
          </a>
          <a href="order">
            <li className="hover:text-orange-600 transition-colors duration-300">
              Order
            </li>
          </a>
          <a href="about">
            <li className="hover:text-orange-600 transition-colors duration-300">
              About Us
            </li>
          </a>
          <a href="contact">
            <li className="hover:text-orange-600 transition-colors duration-300">
              Contact
            </li>
          </a>
        </ul>
        <div className="space-y-3  text-gray-300">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="text-white">Olobe</div>
          </motion.div>

          <div>Designed and Developed by Kehinde Afolabi</div>
          <div className=" ">© 2025. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
