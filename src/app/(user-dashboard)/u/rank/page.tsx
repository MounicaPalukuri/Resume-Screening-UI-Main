import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

const candidates = [
  {
    name: "John Doe",
    score: 92,
    skills: ["Java", "React", "SQL"],
    status: "Excellent match",
  },
  {
    name: "Jane Smith",
    score: 87,
    skills: ["Python", "Data Analysis", "SQL"],
    status: "Strong fit",
  },
  {
    name: "Alex Johnson",
    score: 81,
    skills: ["JavaScript", "React", "Communication"],
    status: "Good potential",
  },
];

export default function RankPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F8F1] via-white to-[#D6F3E4] dark:from-[#081919] dark:via-[#081919] dark:to-[#0f2623] px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Candidate Ranking</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Explore the top candidate matches with score details and skills alignment.
            </p>
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            Refresh Match
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <Card
              key={candidate.name}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {candidate.name}
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  {candidate.status}
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-4 space-y-5">
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-300">Match Score</span>
                  <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">{candidate.score}%</span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">Skills Matched</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Fit recommendation</p>
                  <p className="mt-2 text-base text-slate-700 dark:text-slate-200">
                    {candidate.name} is a great candidate for positions requiring strong technical and communication skills.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
