export function ExamsFilters() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 grid gap-4 md:grid-cols-5">
      <input
        placeholder="Buscar prova ou cargo..."
        className="col-span-2 rounded-md border px-3 py-2 bg-transparent"
      />
      <select className="rounded-md border px-3 py-2 bg-transparent">
        <option>Todas as Bancas</option>
      </select>
      <select className="rounded-md border px-3 py-2 bg-transparent">
        <option>Todos os Anos</option>
      </select>
      <select className="rounded-md border px-3 py-2 bg-transparent">
        <option>Todas as Disciplinas</option>
      </select>
    </div>
  );
}
