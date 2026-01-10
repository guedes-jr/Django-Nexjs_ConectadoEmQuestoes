import QuestionHeader from "./components/QuestionHeader";
import QuestionFilters from "./components/QuestionFilters";
import QuestionCard from "./components/QuestionCard";
import Pagination from "./components/Pagination";

export default function QuestoesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <QuestionHeader />
        <QuestionFilters />

        <div className="space-y-4">
          {[1, 2, 3, 4].map((q) => (
            <QuestionCard key={q} />
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
}
