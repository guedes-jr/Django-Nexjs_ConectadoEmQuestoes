type Props = {
  currentPage?: number;
  totalPages?: number;
  onChange?: (page: number) => void;
};

export default function Pagination({
  currentPage = 1,
  totalPages = 10,
  onChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onChange?.(p);
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        type="button"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      {pages.map((p) => {
        const active = p === currentPage;

        return (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            className={`h-9 w-9 rounded-lg border text-sm font-semibold transition ${
              active
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  );
}
