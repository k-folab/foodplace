"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black p-5 text-sm mt-11 text-white">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 text-center md:text-left">
        <ul className="flex flex-col gap-4 mt-2 text-base space-y-2 font-medium">
          <Link href="/">
            <li className="hover:text-orange-600 transition-colors duration-300">
              Home
            </li>
          </Link>
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
        <div className="space-y-3 pt-16 text-gray-300">
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

          <div>
            Designed and Developed by{" "}
            <span>
              {" "}
              <Link
                href="https://www.linkedin.com/in/kehinde-afolabi-3bab072b2"
                target="_blank"
                className="hover:text-orange-300 text-orange-500"
              >
                Kehinde Afolabi
              </Link>
            </span>
          </div>
          <div className="flex justify-center gap-1">
            <div>© {new Date().getFullYear()}. </div>
            <div>All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
