export enum Stage {
  YEAR,
  PHASE,
  DIFFICULTY,
  SUBJECT,
  DLOAD,
}

export interface StageProps {
  stage: number;
  setStage: (num: number) => void;
}

export interface ExamData {
  year: number;
  phase: "fall" | "spring";
  difficulty: "mid" | "high";
  subject: string; // TODO subject list
}
