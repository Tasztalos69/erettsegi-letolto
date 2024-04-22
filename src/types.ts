export enum Stage {
  YEAR,
  PHASE,
  DIFFICULTY,
  SUBJECT,
  DLOAD,
}

export enum Phase {
  Osz = "osz",
  Tavasz = "tavasz",
}

export enum Difficulty {
  Kozep = "kozep",
  Emelt = "emelt",
}

export type System = 2012 | 2020 | "all";

export type ExamData = {
  year: number;
  phase: Phase;
  difficulty: Difficulty;
  subject: string;
  system: System;
};

export type Indexable = Record<string, string>;

export enum SrcType {
  Fl = "fl",
  Ut = "ut",
  For = "for",
  Meg = "meg",
  Hang = "hang",
}

export type Nullable<T> = T | null;
