"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { Menu, X } from "lucide-react"; // Beautiful hamburger icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Close the mobile menu when the route changes
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-200 text-black font-poppins shadow-md">
      <div className="flex justify-between items-center p-5 md:px-10">
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="font-bold text-lg md:text-xl">Olobe</div>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-gray-500 text-md font-medium gap-16">
          <a href="/">
            <li
              className={`${
                pathname === "/"
                  ? "text-orange-600"
                  : "text-gray-500 hover:text-orange-600"
              } active:text-orange-500 hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}
            >
              Home
            </li>
          </a>

          <a href="/menu">
            <li
              className={`${
                pathname === "/menu"
                  ? "text-orange-600"
                  : "text-gray-500 hover:text-orange-600"
              } active:text-orange-500 hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}
            >
              Menu
            </li>
          </a>

          <a href="/order">
            <li
              className={`${
                pathname === "/order"
                  ? "text-orange-600"
                  : "text-gray-500 hover:text-orange-600"
              } active:text-orange-500 hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}
            >
              Order
            </li>
          </a>

          <a href="/about">
            <li
              className={`${
                pathname === "/about"
                  ? "text-orange-600"
                  : "text-gray-500 hover:text-orange-600"
              } active:text-orange-500 hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}
            >
              About Us
            </li>
          </a>

          <a href="/contact">
            <li
              className={`${
                pathname === "/contact"
                  ? "text-orange-600"
                  : "text-gray-500 hover:text-orange-600"
              } hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}
            >
              Contact
            </li>
          </a>
        </ul>

        {/* Desktop Search + Order Button */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <div className="hidden md:flex gap-4 items-center">
            <div className="flex rounded-full max-w-md mx-auto font-poppins">
              {/* <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-64 pr-8 pl-5 text-sm rounded shadow focus:shadow-md focus:outline-none"
              /> */}
            </div>

            <a
              href="/menu"
              className="bg-orange-500 text-sm text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
            >
              Order Now
            </a>
          </div>
        </motion.div>

        {/* Hamburger (visible only on mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-300 transition"
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-gray-100 px-6 pb-6 space-y-4 text-gray-700 shadow-inner"
          >
            <ul className="flex flex-col gap-7 mt-2 text-base font-medium">
              <a href="/" onClick={() => setMenuOpen(false)}>
                <li
                  className={`${
                    pathname === "/"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-orange-600"
                  } active:text-orange-500 hover:scale-90 hover:-translate-x-1 transition-transform duration-300 cursor-pointer`}
                >
                  Home
                </li>
              </a>
              <a href="/menu" onClick={() => setMenuOpen(false)}>
                <li
                  className={`${
                    pathname === "/menu"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-orange-600"
                  } active:text-orange-500 hover:scale-90 hover:-translate-x-1 transition-transform duration-300 cursor-pointer`}
                >
                  Menu
                </li>
              </a>
              <a href="/order" onClick={() => setMenuOpen(false)}>
                <li
                  className={`${
                    pathname === "/order"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-orange-600"
                  } active:text-orange-500 hover:scale-90 hover:-translate-x-1 transition-transform duration-300 cursor-pointer`}
                >
                  Order
                </li>
              </a>
              <a href="/about" onClick={() => setMenuOpen(false)}>
                <li
                  className={`${
                    pathname === "/about"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-orange-600"
                  } active:text-orange-500 hover:scale-90 hover:-translate-x-1 transition-transform duration-300 cursor-pointer`}
                >
                  About Us
                </li>
              </a>
              <a href="/contact" onClick={() => setMenuOpen(false)}>
                <li
                  className={`${
                    pathname === "/contact"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-orange-600"
                  } active:text-orange-500 hover:scale-90 hover:-translate-x-1 transition-transform duration-300 cursor-pointer`}
                >
                  Contact
                </li>
              </a>
            </ul>

            <div className="pt-3 flex flex-col gap-3">
              {/* <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-64 pr-8 pl-5 text-sm rounded shadow focus:shadow-md focus:outline-none"
              /> */}
              <a
                href="/menu"
                className="bg-orange-500 text-sm text-white text-center px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
