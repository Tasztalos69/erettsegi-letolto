import { ReactElement, useEffect, useState } from "react";
import PickerButton from "./components/PickerButton";

const YEARS = Array(2021 - 2005 + 1)
  .fill(0)
  .map((x, i) => x + 2005 + i);

const SUBJECTS = {
  mat: "Matematika",
  magyir: "Magyar nyelv és irodalom",
  inf: "Informatika",
};

interface ExamData {
  year: number;
  phase: "fall" | "spring";
  difficulty: "mid" | "high";
  subject: string; // TODO subject list
}

enum Stage {
  YEAR,
  PHASE,
  DIFFICULTY,
  SUBJECT,
  DLOAD,
}

const urlConstructor = (data: Partial<ExamData>, isKey = false): string => {
  if (!data.difficulty || !data.phase || !data.subject || !data.year)
    throw Error("Not enough parameters!");
  const year = data.year.toString();
  const phase = data.phase === "fall" ? "osz" : "tavasz";
  const month = data.phase === "fall" ? "okt" : "maj";
  const diff = data.difficulty === "mid" ? "kozep" : "emelt";
  const type = isKey ? "ut" : "fl";

  return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${year}${phase}_${diff}/${diff.substring(
    0,
    1
  )}_${data.subject}_${year.substring(2, 4)}${month}_${type}.pdf`;
};

const Picker = (): ReactElement => {
  const [data, setData] = useState<Partial<ExamData>>({});
  const [stage, setStage] = useState<Stage>(0);

  useEffect(() => {
    if (stage === Stage.DLOAD) {
      window.location.href = urlConstructor(data);
    }
  }, [stage, data]);

  const getStage = () => {
    switch (stage) {
      case Stage.YEAR:
        return (
          <div>
            {YEARS.map((y) => (
              <PickerButton
                key={y}
                onClick={() => {
                  setData({ ...data, year: y });
                  setStage(stage + 1);
                }}
              >
                {y}
              </PickerButton>
            ))}
          </div>
        );
      case Stage.PHASE:
        return (
          <div>
            <PickerButton
              onClick={() => {
                setData({ ...data, phase: "fall" });
                setStage(stage + 1);
              }}
            >
              Ősz
            </PickerButton>
            <PickerButton
              onClick={() => {
                setData({ ...data, phase: "spring" });
                setStage(stage + 1);
              }}
            >
              Tavasz
            </PickerButton>
          </div>
        );
      case Stage.DIFFICULTY:
        return (
          <div>
            <PickerButton
              onClick={() => {
                setData({ ...data, difficulty: "mid" });
                setStage(stage + 1);
              }}
            >
              Középszint
            </PickerButton>
            <PickerButton
              onClick={() => {
                setData({ ...data, difficulty: "high" });
                setStage(stage + 1);
              }}
            >
              Emelt szint
            </PickerButton>
          </div>
        );

      case Stage.SUBJECT:
        return (
          <div>
            {Object.entries(SUBJECTS).map((s) => (
              <PickerButton
                key={s[0]}
                onClick={() => {
                  setData({ ...data, subject: s[0] });
                  setStage(stage + 1);
                }}
              >
                {s[1]}
              </PickerButton>
            ))}
          </div>
        );
      case Stage.DLOAD:
        return <div>Downloading...</div>;
      default:
        return <h2>App error!</h2>;
    }
  };

  return (
    <div className="flex justify-center items-center flex-wrap w-2/3 mx-auto mt-20">
      {getStage()}
    </div>
  );
};

export default Picker;
