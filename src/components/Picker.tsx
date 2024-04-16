import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { agazatok, alapTargyak, allSubjects } from "resources/subjects";

import {
  type ExamData,
  type Indexable,
  Stage,
  type StageProps,
} from "../types";
import urlConstructor from "../utils/urlConstructor";
import missingExams from "../resources/missing-exams.json";

import PickerButton from "./PickerButton";

// TODO Add upcoming years
const maxYear =
  new Date().getFullYear() - Number(!(new Date().getMonth() >= 5));

const nulled = Array.from({ length: maxYear - 2005 + 1 }).fill(0) as Array<0>;
export const Years: number[] = nulled.map((x, i) => x + 2005 + i);

const humanPhase: Indexable = {
  osz: "ősz (október-november)",
  tavasz: "tavasz (május-június)",
};

const humanDiff: Indexable = {
  kozep: "középszint",
  emelt: "emelt szint",
};

const audioSubjects = new Set([
  "angol",
  "nemet",
  "francia",
  "spanyol",
  "orosz",
  "olasz",
]);

const forrasSubjects = new Set([
  "inf",
  "hang",
  "infoism",
  "irodaiugyv",
  "irodugyv",
  "tavkozl",
  "ugyvit",
]);

const StageDiv = (props: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0, duration: 0.2 }}
    {...props}
  />
);

const Picker = ({ stage, setStage, data, setData }: StageProps) => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<"Alap tárgyak" | "Ágazatok">("Alap tárgyak");
  const loc = useLocation();
  const nav = useNavigate();
  const path = loc.pathname.split("/");
  path.shift();

  const replaceUrl = (part: string | number) => {
    nav(path.join("/") + "/" + part);
  };

  const addData = (newData: Partial<ExamData>, newPart: string | number) => {
    // Handle if only one phase is available
    let additionalData: Partial<ExamData> = {};
    let plusStage = 1;
    if (
      newData.year === new Date().getFullYear() &&
      new Date().getMonth() < 10
    ) {
      additionalData = { phase: "tavasz" };
      plusStage++;
      newPart += "/tavasz";
    }

    setData({ ...data, ...newData, ...additionalData });
    replaceUrl(newPart);
    setStage(stage + plusStage);
  };

  const getStage = () => {
    switch (stage) {
      //* YEAR
      case Stage.YEAR:
        return (
          <StageDiv key="year">
            {Years.map(y => (
              <PickerButton key={y} onClick={() => addData({ year: y }, y)}>
                {y}
              </PickerButton>
            ))}
          </StageDiv>
        );

      //* PHASE
      case Stage.PHASE:
        return (
          <StageDiv key="phase">
            <PickerButton
              key="tavasz"
              onClick={() => addData({ phase: "tavasz" }, "tavasz")}
            >
              {humanPhase.tavasz}
            </PickerButton>
            <PickerButton
              key="osz"
              onClick={() => addData({ phase: "osz" }, "osz")}
            >
              {humanPhase.osz}
            </PickerButton>
          </StageDiv>
        );

      //* DIFFICULTY
      case Stage.DIFFICULTY:
        return (
          <StageDiv key="diff">
            <PickerButton
              key="kozep"
              onClick={() => addData({ difficulty: "kozep" }, "kozep")}
            >
              {humanDiff.kozep}
            </PickerButton>
            <PickerButton
              key="emelt"
              onClick={() => addData({ difficulty: "emelt" }, "emelt")}
            >
              {humanDiff.emelt}
            </PickerButton>
          </StageDiv>
        );

      //* SUBJECT
      case Stage.SUBJECT:
        const filteredMissingExams = missingExams.filter(
          e =>
            e.year === data.year &&
            e.phase === data.phase &&
            e.difficulty === data.difficulty
        );
        const filteredMissingExamNames = new Set(
          filteredMissingExams.map(e => e.subject)
        );
        const filtered = Object.entries(
          cat === "Alap tárgyak" ? alapTargyak : agazatok
        )
          .filter(s => !filteredMissingExamNames.has(s[0]))
          .filter(s =>
            search.length > 0
              ? s[1].toLowerCase().includes(search.toLowerCase())
              : s
          )
          .filter(s =>
            data.difficulty === "emelt" ? s[0] !== "tarspr" : s[0] !== "tars"
          );
        return (
          <StageDiv key="subject">
            <div className="relative flex items-center justify-center mb-8">
              <input
                autoFocus={window.innerWidth >= 1024}
                type="text"
                value={search}
                className="font-mono border-b-2 border-black rounded-none outline-none w-60 placeholder:font-mono dark:border-gray-50 bg-inherit"
                placeholder="Keress itt"
                onChange={e => setSearch(e.target.value)}
              />
              <IconSearch className="ml-2" />
              <div className="relative w-1 mx-6">
                <span className="block absolute h-12 w-0.5 rounded-full top-1/2 -translate-y-1/2 bg-black dark:bg-gray-50" />
              </div>
              <div>
                {["Alap tárgyak", "Ágazatok"].map(b => (
                  <button
                    key={b}
                    type="button"
                    className={`uppercase font-semibold font-mono mx-2 decoration-dotted underline-offset-4 ${
                      cat === b && "dark:text-teal-500 text-teal-500 underline"
                    }`}
                    onClick={() => setCat(b as "Alap tárgyak" | "Ágazatok")}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            {filtered.length > 0 ? (
              filtered.map(s => {
                return (
                  !filteredMissingExams.some(e => e.subject === s[0]) && (
                    <PickerButton
                      key={s[0]}
                      onClick={() => addData({ subject: s[0] }, s[0])}
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

      //* DOWNLOAD
      case Stage.DLOAD:
        const Sep = () =>
          window.innerWidth >= 1280 ? (
            <span className="hidden lg:inline w-1.5 h-1.5 mx-5 translate-y-0.5 bg-zinc-500 rounded-full" />
          ) : (
            <br />
          );
        const subjectName = allSubjects[data.subject!];
        const isLongName = subjectName.length > 25;
        return (
          <StageDiv key="dl" className="text-center">
            <h2
              className={`relative block lg:flex ${
                isLongName && "flex-wrap"
              } items-center justify-center w-min mx-auto mb-16 font-mono font-medium lg:whitespace-nowrap text-2xl capitalize`}
            >
              {data.year}
              <Sep />
              {humanPhase[data.phase!].split("(")[0]}
              <Sep />
              {humanDiff[data.difficulty!]}
              {isLongName ? (
                <>
                  <br />
                  <div className="w-full md:whitespace-nowrap">
                    {subjectName}
                  </div>
                </>
              ) : (
                <>
                  <Sep />
                  {subjectName}
                </>
              )}
              <span className="absolute hidden w-4/5 h-1 -translate-x-1/2 bg-teal-400 rounded-full lg:block -bottom-3 left-1/2 opacity-60" />
            </h2>
            {data.subject !== "tarspr" && (
              <PickerButton
                key="fl"
                onClick={() => window.open(urlConstructor(data, "fl"))}
              >
                Feladatlap
              </PickerButton>
            )}
            {forrasSubjects.has(data.subject!) && (
              <>
                <PickerButton
                  key="for"
                  onClick={() => window.open(urlConstructor(data, "for"))}
                >
                  Forrás
                </PickerButton>
                <PickerButton
                  key="mintmeg"
                  onClick={() => window.open(urlConstructor(data, "meg"))}
                >
                  Mintamegoldás
                </PickerButton>
              </>
            )}
            {audioSubjects.has(data.subject!) && (
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
    }
  };

  return (
    <div className="mb-24 text-center lg:mb-0">
      <AnimatePresence initial={false} mode="wait">
        {getStage()}
      </AnimatePresence>
    </div>
  );
};

export default Picker;
