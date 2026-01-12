import { mockQuestions } from "@/lib/mocks/questions";
import { QuestionCard } from "./QuestionCard";

export function QuestionsList() {
  return (
    <div className="space-y-6">
      {mockQuestions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
}
