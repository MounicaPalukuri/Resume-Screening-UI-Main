"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

interface RegisterUser {
  fullName: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please check and try again.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }

    try {
      const savedUsers = localStorage.getItem("smartHireUsers");
      const users: RegisterUser[] = savedUsers ? JSON.parse(savedUsers) : [];

      if (users.some((user) => user.email === email.trim().toLowerCase())) {
        setErrorMessage("A user with this email already exists. Please log in.");
        return;
      }

      const newUser: RegisterUser = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      localStorage.setItem("smartHireUsers", JSON.stringify([...users, newUser]));
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 700);
    } catch (error) {
      setErrorMessage("Unable to save your account. Please try again.");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Create your SmartHire account</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Sign up to start screening resumes, ranking candidates, and booking interviews.
        </p>

        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
            />
          </div>

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

          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>

          <div className="pt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
