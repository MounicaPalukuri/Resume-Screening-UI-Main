"use client";
import Navbar from "@/src/app/(Landing-Page)/NavBar";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/src/components/Footer";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#eceeed] text-gray-900 dark:bg-[#121212] dark:text-white flex flex-col items-center justify-center px-6 py-16 mt-12 relative z-[1]">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          Meet the Developer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl text-lg md:text-xl">
          This project is built and maintained by one developer.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-white dark:bg-[#2a2a2a] shadow-2xl dark:shadow-gray-700 p-8 md:p-10 rounded-3xl text-center"
        >
          <div className="w-28 h-28 mx-auto mb-5 rounded-full border-4 border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src="/Photos/Mounica.jpeg"
              alt="PALUKURI MOUNICA"
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-3xl font-semibold dark:text-gray-100">
            PALUKURI MOUNICA
          </h2>
          <p className="text-green-700 dark:text-green-400 font-medium mt-2">
            Frontend Developer
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            Focused on building clean, responsive, and intuitive user
            interfaces for the resume screening experience.
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
