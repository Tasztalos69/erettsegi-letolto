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
