export function QuestionsFilters() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 grid gap-4 md:grid-cols-4">
      <input placeholder="Buscar questão..." className="rounded-md border px-3 py-2 bg-transparent" />
      <select className="rounded-md border px-3 py-2 bg-transparent">
        <option>Banca</option>
      </select>
      <select className="rounded-md border px-3 py-2 bg-transparent">
        <option>Ano</option>
      </select>
      <select className="rounded-md border px-3 py-2 bg-transparent">
        <option>Disciplina</option>
      </select>
    </div>
  );
}
