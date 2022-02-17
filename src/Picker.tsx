import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import PickerButton from "./components/PickerButton";
import { Stage } from "./types";

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

const StageDiv = (props: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0, duration: 0.2 }}
    {...props}
  />
);

interface PickerProps {
  stage: number;
  setStage: (num: number) => void;
}

const Picker = ({ stage, setStage }: PickerProps): ReactElement => {
  const [data, setData] = useState<Partial<ExamData>>({});

  useEffect(() => {
    if (stage === Stage.DLOAD) {
      window.location.href = urlConstructor(data);
    }
  }, [stage, data]);

  const getStage = () => {
    switch (stage) {
      case Stage.YEAR:
        return (
          <StageDiv key="year">
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
          </StageDiv>
        );
      case Stage.PHASE:
        return (
          <StageDiv key="phase">
            <PickerButton
              key="tavasz"
              onClick={() => {
                setData({ ...data, phase: "spring" });
                setStage(stage + 1);
              }}
            >
              Tavasz
            </PickerButton>
            <PickerButton
              key="osz"
              onClick={() => {
                setData({ ...data, phase: "fall" });
                setStage(stage + 1);
              }}
            >
              Ősz
            </PickerButton>
          </StageDiv>
        );
      case Stage.DIFFICULTY:
        return (
          <StageDiv key="diff">
            <PickerButton
              key="kozep"
              onClick={() => {
                setData({ ...data, difficulty: "mid" });
                setStage(stage + 1);
              }}
            >
              Középszint
            </PickerButton>
            <PickerButton
              key="emelt"
              onClick={() => {
                setData({ ...data, difficulty: "high" });
                setStage(stage + 1);
              }}
            >
              Emelt szint
            </PickerButton>
          </StageDiv>
        );

      case Stage.SUBJECT:
        return (
          <StageDiv key="subject">
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
          </StageDiv>
        );
      case Stage.DLOAD:
        return <div>Downloading...</div>;
      default:
        return <h2>App error!</h2>;
    }
  };

  return (
    <div className="text-center">
      <AnimatePresence initial={false} exitBeforeEnter>
        {getStage()}
      </AnimatePresence>
    </div>
  );
};

export default Picker;
