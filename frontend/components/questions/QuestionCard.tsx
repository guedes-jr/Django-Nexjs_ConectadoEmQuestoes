type Props = {
  question: {
    banca: string;
    year: number;
    discipline: string;
    statement: string;
    options: string[];
  };
};

export function QuestionCard({ question }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="text-sm text-slate-500">
        {question.banca} • {question.discipline} • {question.year}
      </div>

      <p className="font-medium text-slate-900 dark:text-slate-100">
        {question.statement}
      </p>

      <ul className="space-y-2">
        {question.options.map((opt, idx) => (
          <li
            key={idx}
            className="rounded-md border px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}
