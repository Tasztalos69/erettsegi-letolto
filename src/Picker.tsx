import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useState } from "react";

import PickerButton from "./components/PickerButton";
import { ExamData, Indexable, Stage, StageProps } from "./types";
import urlConstructor from "./utils/urlConstructor";

import missingExams from "./missing-exams.json";
import { IconSearch } from "@tabler/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { agazatok, alapTargyak, allSubjects } from "./subjects";

// TODO Add upcoming years
const maxYear =
  new Date().getFullYear() - Number(!(new Date().getMonth() >= 5));
export const YEARS = Array(maxYear - 2005 + 1)
  .fill(0)
  .map((x, i) => x + 2005 + i);

const humanPhase: Indexable = {
  osz: "ősz (október-november)",
  tavasz: "tavasz (május-június)",
};

const humanDiff: Indexable = {
  kozep: "középszint",
  emelt: "emelt szint",
};

const audioSubjects = [
  "angol",
  "nemet",
  "francia",
  "spanyol",
  "orosz",
  "olasz",
];

const forrasSubjects = [
  "inf",
  "hang",
  "infoism",
  "irodaiugyv",
  "irodugyv",
  "tavkozl",
  "ugyvit",
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

const Picker = ({
  stage,
  setStage,
  data,
  setData,
}: StageProps): ReactElement => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<"Alap tárgyak" | "Ágazatok">("Alap tárgyak");
  const loc = useLocation();
  const nav = useNavigate();
  const path = loc.pathname.split("/");
  path.shift();

  const replaceUrl = (part: string) => {
    nav(path.join("/") + "/" + part);
  };

  const addData = (newData: Partial<ExamData>, newPart: string) => {
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
            {YEARS.map((y) => (
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
              {humanPhase["tavasz"]}
            </PickerButton>
            <PickerButton
              key="osz"
              onClick={() => addData({ phase: "osz" }, "osz")}
            >
              {humanPhase["osz"]}
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
              {humanDiff["kozep"]}
            </PickerButton>
            <PickerButton
              key="emelt"
              onClick={() => addData({ difficulty: "emelt" }, "emelt")}
            >
              {humanDiff["emelt"]}
            </PickerButton>
          </StageDiv>
        );

      //* SUBJECT
      case Stage.SUBJECT:
        const filteredMissingExams = missingExams.filter(
          (e) =>
            e.year === data.year &&
            e.phase === data.phase &&
            e.difficulty === data.difficulty
        );
        const filteredMissingExamNames = filteredMissingExams.map(
          (e) => e.subject
        );
        const filtered = Object.entries(
          cat === "Alap tárgyak" ? alapTargyak : agazatok
        )
          .filter((s) => !filteredMissingExamNames.includes(s[0]))
          .filter((s) =>
            search.length > 0
              ? s[1].toLowerCase().includes(search.toLowerCase())
              : s
          )
          .filter((s) =>
            data.difficulty === "emelt" ? s[0] !== "tarspr" : s[0] !== "tars"
          );
        return (
          <StageDiv key="subject">
            <div className="relative flex items-center justify-center mb-8">
              <input
                autoFocus={window.innerWidth >= 1024}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono w-60 placeholder:font-mono outline-none border-b-2 border-black dark:border-gray-50 rounded-none bg-inherit"
                placeholder="Keress itt"
              />
              <IconSearch className="ml-2" />
              <div className="relative mx-6 w-1">
                <span className="block absolute h-12 w-0.5 rounded-full top-1/2 -translate-y-1/2 bg-black dark:bg-gray-50" />
              </div>
              <div>
                {["Alap tárgyak", "Ágazatok"].map((b) => (
                  <button
                    key={b}
                    className={`uppercase font-semibold font-mono mx-2 decoration-dotted ${
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
              filtered.map((s) => {
                return (
                  !filteredMissingExams.some((e) => e.subject === s[0]) && (
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
            {forrasSubjects.includes(data.subject!) && (
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
