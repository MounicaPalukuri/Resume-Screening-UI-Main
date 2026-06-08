"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const serviceLinks = [
  { label: "AI Resume Screening", href: "/u/resume" },
  { label: "Smart Candidate Matching", href: "/u/rank" },
  { label: "Automated Interview Scheduling", href: "/u/schedule" },
  { label: "Employer-Candidate Chat", href: "/u/dashboard" },
  { label: "HR Analytics Dashboard", href: "/u/dashboard" },
];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Trigger */}
      <div className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:rounded-lg px-1.5 py-1 transition-colors duration-150">
        <div className="font-semibold text-gray-800 dark:text-white transition-colors duration-150">
          Services
        </div>
        <Image
          className={`transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
          src={isOpen ? "/assets/chevron-up-solid.svg" : "/assets/chevron-down-solid.svg"}
          width={12}
          height={12}
          alt="Dropdown"
        />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 duration-150 pt-2 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`w-72 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 z-10 transition-opacity duration-150 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } ${isOpen ? "border border-gray-300 dark:border-gray-700" : ""}`}
        >
          <p className="text-gray-700 dark:text-gray-300 font-bold px-3 py-2">
            SERVICES
          </p>
          <ul className="space-y-2">
            {serviceLinks.map((item) => (
              <li
                key={item.href}
                className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-150"
                onClick={() => handleSelect(item.href)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
