"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";

interface ResumeMetadata {
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  score: number;
  skills: string[];
  experience: string;
  education: string;
}

const defaultAnalysis = {
  score: 78,
  skills: ["Java", "Python", "SQL", "React"],
  experience: "2 Years",
  education: "Bachelor of Technology",
};

export default function ResumePage() {
  const [fileInfo, setFileInfo] = useState<ResumeMetadata | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedFile = localStorage.getItem("smartHireResumeUpload");
    if (savedFile) {
      setFileInfo(JSON.parse(savedFile));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setSuccessMessage("");
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;
    const extensionMatch = selectedFile.name.match(/\.(pdf|docx|doc)$/i);
    if (!extensionMatch) {
      setErrorMessage("Only PDF and DOCX files are supported.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage("Please upload a file smaller than 5MB.");
      return;
    }

    const metadata: ResumeMetadata = {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type || "application/octet-stream",
      uploadedAt: new Date().toISOString(),
      score: defaultAnalysis.score,
      skills: defaultAnalysis.skills,
      experience: defaultAnalysis.experience,
      education: defaultAnalysis.education,
    };

    localStorage.setItem("smartHireResumeUpload", JSON.stringify(metadata));
    localStorage.setItem("smartHireResumeAnalysis", JSON.stringify(metadata));
    setFileInfo(metadata);
    setSuccessMessage("Resume uploaded successfully.");
  };

  return (
    <div className="space-y-6 p-6 min-h-screen w-full bg-gradient-to-r from-[#D8F9E6] to-[#ECFEF5] dark:from-[#0f1d1b] dark:to-[#132b27]">
      <Card className="bg-white dark:bg-[#1c2d2b] border border-[#CDEBD8] dark:border-[#2f4d49] rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-[#007F3B] dark:text-green-100">Upload Resume</CardTitle>
          <CardDescription className="text-[#3C6255] dark:text-green-200">
            Upload your resume as a PDF or DOCX file and save the metadata for analysis.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="resume-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-3xl cursor-pointer bg-green-50 dark:bg-[#2a4944] hover:bg-green-100 dark:hover:bg-[#2f4d49] border-[#CDEBD8] dark:border-[#3c5e58] transition-colors"
            >
              <Upload className="w-10 h-10 mb-4 text-[#5B8F77] dark:text-green-300" />
              <p className="mb-2 text-sm text-[#3C6255] dark:text-green-200">
                Click to upload or drag and drop your resume here.
              </p>
              <p className="text-xs text-[#4F7C66] dark:text-green-300">PDF, DOCX or DOC (MAX. 5MB)</p>
              <input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200">
                {errorMessage}
              </div>
            ) : null}
            {successMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200">
                {successMessage}
              </div>
            ) : null}

            {fileInfo ? (
              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Uploaded File Details</h2>
                <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <div className="flex justify-between">
                    <span className="font-medium">File name</span>
                    <span>{fileInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">File size</span>
                    <span>{(fileInfo.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">File type</span>
                    <span>{fileInfo.type.split("/")[1] || fileInfo.type}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-[#1c2d2b] border border-[#CDEBD8] dark:border-[#2f4d49] rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-[#007F3B] dark:text-green-100">Resume Analysis</CardTitle>
          <CardDescription className="text-[#3C6255] dark:text-green-200">
            Review your AI resume score and detected skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 p-6 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Resume Score</p>
              <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-slate-100">{fileInfo?.score ?? defaultAnalysis.score}%</p>
            </div>
            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 p-6 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{fileInfo?.education ?? defaultAnalysis.education}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Bachelor of Technology</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(fileInfo?.skills ?? defaultAnalysis.skills).map((skill) => (
              <div key={skill} className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-4 text-center">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-200">{skill}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Experience</p>
              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{fileInfo?.experience ?? defaultAnalysis.experience}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{fileInfo?.education ?? defaultAnalysis.education}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
