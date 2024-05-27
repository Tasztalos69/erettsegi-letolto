/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import type SUBJECTS from "resources/subjects";

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

export type System = "all" | "2012" | "2020";
export type StoredSystem = "all" | Array<"2012" | "2020">;

export enum SrcType {
  Fl = "fl",
  Ut = "ut",
  For = "for",
  Meg = "meg",
  Hang = "hang",
}

export type ExamData = {
  year: number;
  phase: Phase;
  difficulty: Difficulty;
  subject: keyof typeof SUBJECTS;
  system: System;
};

export type HeldExams = {
  [key: string]: {
    [key in Phase]: {
      [key in Difficulty]: {
        [key: keyof typeof SUBJECTS]: StoredSystem;
      };
    };
  };
};

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type Nullable<T> = T | null;
