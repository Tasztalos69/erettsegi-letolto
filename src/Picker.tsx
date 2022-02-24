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

const audioSubjects = [
  "angol",
  "nemet",
  "francia",
  "spanyol",
  "orosz",
  "olasz",
];

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
        const filtered = Object.entries(SUBJECTS)
          .filter((s) =>
            search.length > 0
              ? s[1].toLowerCase().includes(search.toLowerCase())
              : s
          )
          .filter((s) =>
            data.difficulty === "high" ? s[0] !== "tarspr" : s[0] !== "tars"
          );
        return (
          <StageDiv key="subject">
            <div className="flex justify-center mb-8">
              <input
                autoFocus={window.innerWidth >= 1024}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono w-60 placeholder:font-mono outline-none border-b-2 border-black rounded-none"
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
        const Sep = () =>
          window.innerWidth >= 1280 ? (
            <span className="hidden lg:block w-1.5 h-1.5 mx-5 translate-y-0.5 bg-zinc-500 rounded-full" />
          ) : (
            <br />
          );
        return (
          <StageDiv key="dl" className="text-center">
            <h2 className="relative block lg:flex items-center justify-center w-min mx-auto mb-16 font-mono font-medium lg:whitespace-nowrap text-2xl capitalize">
              {data.year}
              <Sep />
              {humanPhase[data.phase!]}
              <Sep />
              {humanDiff[data.difficulty!]}
              <Sep />
              {SUBJECTS[data.subject!]}
              <span className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-teal-400 opacity-60 rounded-full" />
            </h2>
            {data.subject !== "tarspr" && (
              <PickerButton
                key="fl"
                onClick={() => window.open(urlConstructor(data, "fl"))}
              >
                Feladatlap
              </PickerButton>
            )}
            {data.subject === "inf" && (
              <PickerButton
                key="for"
                onClick={() => window.open(urlConstructor(data, "for"))}
              >
                Forrás
              </PickerButton>
            )}
            {audioSubjects.includes(data.subject!) && (
              <PickerButton
                key="hang"
                onClick={() => window.open(urlConstructor(data, "hang"))}
              >
                Hanganyag
              </PickerButton>
            )}
            <PickerButton
              key="ut"
              onClick={() => window.open(urlConstructor(data, "ut"))}
            >
              {data.subject === "tarspr" ? "Útmutató" : "Megoldás"}
            </PickerButton>
          </StageDiv>
        );
      default:
        return <h2>App error!</h2>;
    }
  };

  return (
    <div className="text-center mb-24 lg:mb-0">
      <AnimatePresence initial={false} exitBeforeEnter>
        {getStage()}
      </AnimatePresence>
    </div>
  );
};

export default Picker;
