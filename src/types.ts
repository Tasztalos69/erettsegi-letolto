export enum Stage {
  YEAR,
  PHASE,
  DIFFICULTY,
  SUBJECT,
  DLOAD,
}

export type StageProps = {
  stage: Stage;
  setStage: (num: number) => void;
  data: Partial<ExamData>;
  setData: (data: Partial<ExamData>) => void;
};

export type ExamData = {
  year: number;
  phase: "osz" | "tavasz";
  difficulty: "kozep" | "emelt";
  subject: string;
};

export type Indexable = Record<string, string>;

export type SrcType = "fl" | "ut" | "for" | "meg" | "hang";

export type Nullable<T> = T | null;
