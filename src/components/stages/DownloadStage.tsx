import { useContext } from "react";
import SUBJECTS, {
  SubjectCategory,
  categorizedSubjects,
} from "resources/subjects";
import PickerButton from "components/PickerButton";
import urlConstructor from "utils/urlConstructor";
import { SrcType } from "types";
import StageDiv from "components/StageDiv";
import ExamContext from "context/ExamContext";

import { phaseStr } from "./PhaseStage";
import { diffStr } from "./DifficultyStage";

const Sep = () =>
  window.innerWidth >= 1280 ? (
    <span className="hidden lg:inline w-1.5 h-1.5 mx-5 translate-y-0.5 bg-zinc-500 rounded-full" />
  ) : (
    <br />
  );

const forrasSubjects = new Set([
  "inf",
  "hang",
  "infoism",
  "irodaiugyv",
  "irodugyv",
  "tavkozl",
  "ugyvit",
]);

const audioSubjects = Object.keys(categorizedSubjects[SubjectCategory.Nyelvek]);

const DownloadStage = () => {
  const examData = useContext(ExamContext);

  const { year, phase, difficulty, subject } = examData;

  console.log(subject);

  if (!subject) return null;

  const subjectName = SUBJECTS[subject];
  const isLongName = subjectName.length > 25;

  return (
    <StageDiv key="dl" className="text-center">
      <h2
        className={`relative block lg:flex ${
          isLongName && "flex-wrap"
        } items-center justify-center w-min mx-auto mb-16 font-mono font-medium lg:whitespace-nowrap text-2xl capitalize`}
      >
        {year}
        <Sep />
        {phaseStr[phase!].split("(")[0]}
        <Sep />
        {diffStr[difficulty!]}
        {isLongName ? (
          <>
            <br />
            <div className="w-full md:whitespace-nowrap">{subjectName}</div>
          </>
        ) : (
          <>
            <Sep />
            {subjectName}
          </>
        )}
        <span className="absolute hidden w-4/5 h-1 -translate-x-1/2 bg-teal-400 rounded-full lg:block -bottom-3 left-1/2 opacity-60" />
      </h2>
      {subject !== "tarspr" && (
        <PickerButton
          key="fl"
          onClick={() => window.open(urlConstructor(examData, SrcType.Fl))}
        >
          Feladatlap
        </PickerButton>
      )}
      {forrasSubjects.has(subject) && (
        <>
          <PickerButton
            key="for"
            onClick={() => window.open(urlConstructor(examData, SrcType.For))}
          >
            Forrás
          </PickerButton>
          <PickerButton
            key="mintmeg"
            onClick={() => window.open(urlConstructor(examData, SrcType.Meg))}
          >
            Mintamegoldás
          </PickerButton>
        </>
      )}
      {audioSubjects.includes(subject) && (
        <PickerButton
          key="hang"
          onClick={() => window.open(urlConstructor(examData, SrcType.Hang))}
        >
          Hanganyag
        </PickerButton>
      )}
      <PickerButton
        key="ut"
        onClick={() => window.open(urlConstructor(examData, SrcType.Ut))}
      >
        {subject === "tarspr" ? "Útmutató" : "Megoldás"}
      </PickerButton>
    </StageDiv>
  );
};

export default DownloadStage;
