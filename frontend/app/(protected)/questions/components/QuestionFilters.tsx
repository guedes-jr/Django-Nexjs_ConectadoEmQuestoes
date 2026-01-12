export default function QuestionFilters() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {["Disciplina", "Banca", "Órgão", "Ano", "Nível"].map((label) => (
          <select
            key={label}
            className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3"
          >
            <option>{label}</option>
          </select>
        ))}
      </div>

      <div className="flex justify-between">
        <button className="text-sm text-blue-600 dark:text-blue-400">
          Limpar filtros
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold">
          Filtrar
        </button>
      </div>
    </div>
  );
}
