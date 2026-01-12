import { mockExams } from "@/lib/mocks/exams";
import { ExamRow } from "./ExamRow";

export function ExamsList() {
  return (
    <div className="space-y-3">
      {mockExams.map((exam) => (
        <ExamRow key={exam.id} exam={exam} />
      ))}
    </div>
  );
}
