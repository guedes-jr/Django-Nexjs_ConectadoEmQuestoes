export default function QuestionCard() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>CESPE • Direito Constitucional • 2022</span>
        <span className="text-blue-600 dark:text-blue-400 cursor-pointer">
          Ver detalhes
        </span>
      </div>

      <p className="text-slate-800 dark:text-slate-200">
        Assinale a alternativa correta acerca dos direitos e garantias
        fundamentais previstos na Constituição Federal.
      </p>

      <div className="space-y-2">
        {["A", "B", "C", "D", "E"].map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            <input type="radio" name="question" />
            <span className="text-slate-700 dark:text-slate-200">
              Alternativa {opt}
            </span>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button className="text-sm text-slate-500 dark:text-slate-400">
          Anular
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
          Confirmar
        </button>
      </div>
    </div>
  );
}
