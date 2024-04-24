/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { YEARS } from "components/Picker";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SUBJECTS from "resources/subjects";
import { Difficulty, Phase, type ExamData } from "types";

type IncomingParams = {
  year?: string;
  phase?: string;
  difficulty?: string;
  subject?: string;
};

const useParseParams = (): Partial<ExamData> => {
  const { year, phase, difficulty, subject } = useParams<IncomingParams>();
  const nav = useNavigate();
  const loc = useLocation();

  const [examData, setExamData] = useState<Partial<ExamData>>({});

  const getExamData = () => {
    const obj: Partial<ExamData> = {};

    // -------------------- Parse year
    if (!year) return obj;
    if (
      !Number(year) ||
      Number(year) < Math.min(...YEARS) ||
      Number(year) > Math.max(...YEARS)
    ) {
      nav("/");
      return obj;
    }

    obj.year = Number(year);

    // -------------------- Parse phase
    if (!phase) return obj;

    if (phase !== Phase.Osz && phase !== Phase.Tavasz) {
      nav(`/`);
      return obj;
    }

    obj.phase = phase;

    // -------------------- Parse difficulty
    if (!difficulty) return obj;

    if (difficulty !== Difficulty.Kozep && difficulty !== Difficulty.Emelt) {
      nav(`/`);
      return obj;
    }

    obj.difficulty = difficulty;

    // -------------------- Parse subject
    if (!subject) return obj;

    if (!Object.keys(SUBJECTS).includes(subject)) {
      nav(`/`);
      return obj;
    }

    obj.subject = subject;

    return obj;
  };

  useEffect(() => {
    setExamData(getExamData());
  }, [loc.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return examData;
};

export default useParseParams;
