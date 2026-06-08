"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Trash2 } from "lucide-react";

interface InterviewBooking {
  id: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  time: string;
}

export default function SchedulePage() {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [scheduledInterviews, setScheduledInterviews] = useState<InterviewBooking[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("smartHireScheduledInterviews");
    if (saved) {
      setScheduledInterviews(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("smartHireScheduledInterviews", JSON.stringify(scheduledInterviews));
  }, [scheduledInterviews]);

  const handleSchedule = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!candidateName.trim() || !candidateEmail.trim() || !interviewDate || !interviewTime) {
      setErrorMessage("Please complete every field before scheduling.");
      return;
    }

    if (!candidateEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const newInterview = {
      id: Date.now().toString(),
      candidateName: candidateName.trim(),
      candidateEmail: candidateEmail.trim(),
      date: interviewDate,
      time: interviewTime,
    };

    setScheduledInterviews((current) => [...current, newInterview]);
    setCandidateName("");
    setCandidateEmail("");
    setInterviewDate("");
    setInterviewTime("");
    setSuccessMessage("Interview scheduled successfully.");
  };

  const removeInterview = (id: string) => {
    setScheduledInterviews((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FDF7] via-white to-[#D1F2E4] dark:from-[#071B1A] dark:via-[#071B1A] dark:to-[#0E2D2A] px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Interview Scheduling</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Schedule interviews with candidates quickly and store the details locally.
            </p>

            <div className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Candidate Name</Label>
                <Input
                  id="candidateName"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Alex Johnson"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="candidateEmail">Email</Label>
                <Input
                  id="candidateEmail"
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  placeholder="alex@example.com"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="interviewDate">Interview Date</Label>
                  <Input
                    id="interviewDate"
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewTime">Interview Time</Label>
                  <Input
                    id="interviewTime"
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                  />
                </div>
              </div>

              {errorMessage ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-600/40 dark:bg-red-950/30 dark:text-red-200">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/30 dark:text-emerald-200">
                  {successMessage}
                </div>
              ) : null}

              <Button className="w-full" onClick={handleSchedule}>
                Schedule Interview
              </Button>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Upcoming Interviews</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {scheduledInterviews.length} interview(s) scheduled.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {scheduledInterviews.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-400">
                  No interviews scheduled yet.
                </div>
              ) : (
                scheduledInterviews.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950/40"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.candidateName}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.candidateEmail}</p>
                      </div>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{item.date} · {item.time}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        Scheduled
                      </span>
                      <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => removeInterview(item.id)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
