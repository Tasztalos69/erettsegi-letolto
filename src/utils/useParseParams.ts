/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SUBJECTS from "resources/subjects";
import { YEARS } from "resources/years";
import { Difficulty, Phase, type ExamData } from "types";

type IncomingParams = {
  year?: string;
  phase?: string;
  difficulty?: string;
  subject?: string;
};

const useParseParams = (): Partial<ExamData> => {
  const {
    year,
    phase,
    difficulty,
    subject: _subject,
  } = useParams<IncomingParams>();
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
    if (!_subject) return obj;

    const splitted = _subject.split("-");

    let subject;

    if (splitted.length > 1 && splitted.at(1) === "v2020") {
      subject = splitted.at(0)!;
      obj.system = "2020";
    } else {
      subject = _subject;
      obj.system = "2012";
    }

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
