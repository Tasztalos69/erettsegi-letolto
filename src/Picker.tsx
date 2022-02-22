import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useState } from "react";

import PickerButton from "./components/PickerButton";
import { ExamData, Stage, StageProps } from "./types";
import urlConstructor from "./utils/urlConstructor";

import missingExams from "./missing-exams.json";
import { IconSearch } from "@tabler/icons";

const YEARS = Array(2021 - 2005 + 1)
  .fill(0)
  .map((x, i) => x + 2005 + i);

interface Indexable {
  [key: string]: string;
}

const SUBJECTS: Indexable = {
  mat: "Matematika",
  magyir: "Magyar nyelv és irodalom",
  tort: "Történelem",
  inf: "Informatika",
  angol: "Angol",
  nemet: "Német",
  francia: "Francia",
  spanyol: "Spanyol",
  orosz: "Orosz",
  olasz: "Olasz",
  fldr: "Földrajz",
  kem: "Kémia",
  bio: "Biológia",
  fiz: "Fizika",
  enekzene: "Ének-zene",
  drama: "Dráma",
  muvtort: "Művészettörténet",
  filo: "Filozófia",
  tars: "Társadalomismeret",
  tarspr: "Társadalomismeret projekt",
};

const humanPhase: Indexable = {
  fall: "ősz",
  spring: "tavasz",
};

const humanDiff: Indexable = {
  mid: "középszint",
  high: "emelt szint",
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

const Picker = ({ stage, setStage }: StageProps): ReactElement => {
  const [data, setData] = useState<Partial<ExamData>>({});
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   if (stage === Stage.DLOAD) {
  //     window.location.href = urlConstructor(data);
  //   }
  // }, [stage, data]);

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
              {humanPhase["spring"]}
            </PickerButton>
            <PickerButton
              key="osz"
              onClick={() => {
                setData({ ...data, phase: "fall" });
                setStage(stage + 1);
              }}
            >
              {humanPhase["fall"]}
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
              {humanDiff["mid"]}
            </PickerButton>
            <PickerButton
              key="emelt"
              onClick={() => {
                setData({ ...data, difficulty: "high" });
                setStage(stage + 1);
              }}
            >
              {humanDiff["high"]}
            </PickerButton>
          </StageDiv>
        );

      case Stage.SUBJECT:
        const filtered = Object.entries(SUBJECTS).filter((s) =>
          search.length > 0
            ? s[1].toLowerCase().includes(search.toLowerCase())
            : s
        );
        return (
          <StageDiv key="subject">
            <div className="flex justify-center mb-8">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono w-60 placeholder:font-mono outline-none border-b-2 border-black"
                placeholder="Keress itt"
              />
              <IconSearch className="ml-2" />
            </div>
            {filtered.length > 0 ? (
              filtered.map((s) => {
                return (
                  !missingExams.some(
                    (e) =>
                      JSON.stringify(e) ===
                      JSON.stringify({
                        year: data.year || 0,
                        phase: data.phase || "fall",
                        difficulty: data.difficulty || "mid",
                        subject: s[0] || "",
                      })
                  ) && (
                    <PickerButton
                      key={s[0]}
                      onClick={() => {
                        setData({ ...data, subject: s[0] });
                        setStage(stage + 1);
                      }}
                    >
                      {s[1]}
                    </PickerButton>
                  )
                );
              })
            ) : (
              <p className="mt-3 font-mono opacity-60">
                Ilyen tantárgy nincs. 🤫
              </p>
            )}
          </StageDiv>
        );
      case Stage.DLOAD:
        const Sep = () => (
          <span className="block w-5 h-[3px] mx-7 translate-y-0.5 bg-zinc-500 rounded-full" />
        );
        return (
          <StageDiv key="dl">
            <h2 className="mb-10 font-mono font-semibold text-2xl flex items-center justify-center capitalize">
              {data.year}
              <Sep />
              {humanPhase[data.phase!]}
              <Sep />
              {humanDiff[data.difficulty!]}
              <Sep />
              {SUBJECTS[data.subject!]}
            </h2>
            <PickerButton
              key="fl"
              onClick={() => (window.location.href = urlConstructor(data))}
            >
              Feladatlap
            </PickerButton>
            <PickerButton
              key="ut"
              onClick={() =>
                (window.location.href = urlConstructor(data, true))
              }
            >
              Megoldás
            </PickerButton>
          </StageDiv>
        );
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
