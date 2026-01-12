type Props = {
  exam: {
    title: string;
    banca: string;
    year: number;
    questionsCount: number;
  };
};

export function ExamRow({ exam }: Props) {
  return (
    <div className="flex justify-between items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
      <div>
        <h3 className="font-medium text-blue-600 dark:text-blue-400">
          {exam.banca} - {exam.title} - {exam.year}
        </h3>
        <p className="text-sm text-slate-500">
          {exam.questionsCount} questões
        </p>
      </div>
      <span className="text-slate-400">›</span>
    </div>
  );
}
