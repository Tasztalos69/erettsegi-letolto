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
  data: Partial<ExamData>;
  setData: (data: Partial<ExamData>) => void;
}

export interface ExamData {
  year: number;
  phase: "osz" | "tavasz";
  difficulty: "kozep" | "emelt";
  subject: string; // TODO subject list
}

export interface Indexable {
  [key: string]: string;
}

export type SrcType = "fl" | "ut" | "for" | "meg" | "hang";
