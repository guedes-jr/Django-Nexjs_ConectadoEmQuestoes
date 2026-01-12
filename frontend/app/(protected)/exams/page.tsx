"use client";

import { ExamsFilters } from "@/components/exams/ExamsFilters";
import { ExamsList } from "@/components/exams/ExamsList";

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Provas de Concursos Públicos
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Acesse questões organizadas por prova, instituição e cargo.
          </p>
        </header>

        <ExamsFilters />
        <ExamsList />
      </div>
    </div>
  );
}
