"use client";

import { useMemo, useState } from "react";
import { ChatMessages } from "./ChatMessages";
import { ChatComposer } from "./ChatComposer";
import { ChatToolsPanel, ToolAction } from "./ChatToolsPanel";
import { mockExams } from "@/lib/mocks/exams";
import { mockQuestions } from "@/lib/mocks/questions";
import { mockUserStats } from "@/lib/mocks/userStats";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

function buildStatsSummary() {
  const s = mockUserStats;
  const best = s.bestDisciplines.map((d) => `• ${d.name}: ${d.correctRate}%`).join("\n");
  const weak = s.weakDisciplines.map((d) => `• ${d.name}: ${d.correctRate}%`).join("\n");

  return [
    `Resumo do usuário`,
    `- Questões resolvidas: ${s.totalQuestions}`,
    `- Taxa de acerto: ${s.correctRate}%`,
    `- Streak atual: ${s.streakDays} dias`,
    ``,
    `Melhores disciplinas:`,
    best,
    ``,
    `Pontos de atenção:`,
    weak,
  ].join("\n");
}

export function ChatShell() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "Olá! Posso te ajudar a estudar: mencionar provas/questões, gerar resumo de estatísticas e montar planos de estudo. O que você quer fazer agora?",
    },
  ]);

  const examsCount = useMemo(() => mockExams.length, []);
  const questionsCount = useMemo(() => mockQuestions.length, []);

  const pushUser = (text: string) => {
    setMessages((m) => [...m, { id: uid(), role: "user", content: text }]);
  };

  const pushAssistant = (text: string) => {
    setMessages((m) => [...m, { id: uid(), role: "assistant", content: text }]);
  };

  const onSend = (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    pushUser(clean);

    // Simulação de resposta (depois vira backend)
    pushAssistant(
      `Entendi. (mock)\n\nSe você quiser, eu também posso:\n- citar uma prova específica\n- citar uma questão\n- gerar resumo das suas estatísticas\n\nUse o painel de Ferramentas ao lado.`
    );
  };

  const onToolAction = (action: ToolAction) => {
    if (action.type === "mention_exam") {
      const exam = mockExams.find((e) => e.id === action.examId);
      if (!exam) return;

      const text = `Mencione a prova: ${exam.banca} - ${exam.title} - ${exam.year} (${exam.questionsCount} questões).`;
      pushUser(text);
      pushAssistant(`Perfeito. (mock) Vou considerar essa prova como contexto para o que você pedir em seguida.`);
      return;
    }

    if (action.type === "mention_question") {
      const q = mockQuestions.find((x) => x.id === action.questionId);
      if (!q) return;

      const text = `Mencione a questão: [${q.banca} • ${q.discipline} • ${q.year}] ${q.statement}`;
      pushUser(text);
      pushAssistant(`Ok. (mock) Posso explicar, sugerir abordagem ou montar um simulado com questões parecidas.`);
      return;
    }

    if (action.type === "stats_summary") {
      pushUser("Gere um resumo das minhas estatísticas.");
      pushAssistant(buildStatsSummary());
      return;
    }

    if (action.type === "study_plan") {
      pushUser("Monte um plano de estudos com base nas minhas estatísticas.");
      pushAssistant(
        `Plano de estudos (mock)\n\n1) Prioridade (pontos fracos)\n- Direito Constitucional: 3 blocos/semana\n- Informática: 2 blocos/semana\n\n2) Manutenção (pontos fortes)\n- Português: 1 bloco/semana\n- Raciocínio Lógico: 1 bloco/semana\n\n3) Meta semanal\n- 120 questões\n- revisão 24h + 7 dias\n\n(Depois conectamos isso no backend.)`
      );
      return;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Chat de Estudos
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {examsCount} provas • {questionsCount} questões • ferramentas extras
                </p>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Sessão local (mock)
              </div>
            </div>
          </div>

          <ChatMessages messages={messages} />

          <div className="border-t border-slate-200 dark:border-slate-800">
            <ChatComposer onSend={onSend} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <ChatToolsPanel onAction={onToolAction} />
      </div>
    </div>
  );
}
