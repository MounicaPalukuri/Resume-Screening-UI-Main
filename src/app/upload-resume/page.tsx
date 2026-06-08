"use client";

import Navbar from "../(Landing-Page)/NavBar";
import { UploadCloud, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadResume() {
  return (
    <>
      <Navbar />
      <div className="pt-28 min-h-screen bg-gradient-to-r from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex flex-col md:flex-row items-center justify-center gap-10 px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-2xl border border-green-200 dark:border-green-800 p-8"
        >
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-4 text-center">
            Upload Your Resume
          </h2>
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-6">
            Demo-only UI. The upload controls are visual and do not trigger any backend action.
          </p>

          <div className="rounded-2xl border-2 border-dashed border-green-300 dark:border-green-700 bg-white/60 dark:bg-gray-950/30 p-8 text-center">
            <UploadCloud className="mx-auto mb-4 h-12 w-12 text-green-600 dark:text-green-400" />
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Drop your resume here
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              PDF, DOCX, or TXT - preview only for this demo.
            </p>
            <button
              type="button"
              onClick={() => {}}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
            >
              <FileText className="h-4 w-4" />
              Choose File
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-green-200 dark:border-green-800 bg-white/70 dark:bg-gray-950/40 p-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold text-gray-900 dark:text-gray-100">Preview panel</p>
            <p className="mt-1">This area is reserved for the resume preview in the full product.</p>
          </div>
        </motion.div>

        <div className="w-full max-w-lg text-center px-4">
          <h1 className="text-4xl font-extrabold text-green-900 dark:text-green-200 mb-4 leading-snug">
            Intelligent Resume Screening
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
            A clean frontend demo for showing the upload flow, preview cards, and dashboard handoff without any API calls.
          </p>
          <p className="mt-4 text-sm text-green-700 dark:text-green-400 italic">
            Designed for recruiters, optimized for speed.
          </p>
        </div>
      </div>
    </>
  );
}
