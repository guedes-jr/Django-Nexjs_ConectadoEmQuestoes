"use client";

import { useState } from "react";
import { BillingCycle } from "@/types/plans";
import { PLANS } from "@/lib/mocks/plans";
import { FAQS } from "@/lib/mocks/faqs";
import BillingToggle from "@/components/plans/BillingToggle";
import PlanCard from "@/components/plans/PlanCard";
import FAQ from "@/components/plans/FAQ";
import WhoWeAre from "@/components/plans/WhoWeAre";

export default function PlansPage() {
  const [cycle, setCycle] = useState<BillingCycle>("mensal");

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-10">
        <div className="text-center">
          <p className="text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
            Planos e Assinatura
          </p>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Escolha um dos nossos planos
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Acelere sua aprovação com acesso total à nossa plataforma.
          </p>

          <BillingToggle value={cycle} onChange={setCycle} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch">
          {PLANS.map((p) => (
            <PlanCard key={p.key} plan={p} cycle={cycle} />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white px-6 py-5 text-center text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-200 dark:ring-slate-800">
          Escolha entre <span className="font-semibold">cobrança mensal</span>,{" "}
          <span className="font-semibold">semestral</span> com desconto ou{" "}
          <span className="font-semibold">anual</span> com desconto maior. Você
          pode cancelar sua assinatura a qualquer momento e continuar usando até
          o final do período já pago.
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sua dúvida não está aqui?{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Fale com a gente
            </span>
          </p>
        </div>

        <FAQ items={FAQS} />

        <div className="mt-16">
          <WhoWeAre />
        </div>
      </section>
    </main>
  );
}
