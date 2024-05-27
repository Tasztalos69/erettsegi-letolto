import { IconSearch, IconSquare, IconSquareCheck } from "@tabler/icons-react";
import StageDiv from "components/StageDiv";
import { useContext, useMemo, useState } from "react";
import { SubjectCategory, categorizedSubjects } from "resources/subjects";
import ExamContext from "context/ExamContext";
import { AnimatePresence } from "framer-motion";
import { BoxWrapper } from "components/Legend";
import type { HeldExams } from "types";
import PickerButton from "components/PickerButton";
import _allExams from "resources/held-exams.json";
import { useNavigate } from "react-router-dom";

const allExams: HeldExams = _allExams as HeldExams;

const SubjectStage = () => {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<SubjectCategory>(SubjectCategory.Alap);
  const [system, setSystem] = useState<"2012" | "2020">("2012");

  const { year, phase, difficulty } = useContext(ExamContext);

  const toggleSystem = () => {
    setSystem(system === "2020" ? "2012" : "2020");
  };

  const heldExams = useMemo(() => {
    if (!year || !phase || !difficulty) return {};

    return allExams[year.toString()][phase][difficulty];
  }, [year, phase, difficulty]);

  const availableExams = Object.entries(categorizedSubjects[cat])
    .filter(([code]) => {
      return (
        heldExams[code] &&
        (heldExams[code] === "all" || heldExams[code]?.includes(system))
      );
    })
    .filter(([_code, name]) =>
      name.toLowerCase().includes(search.toLowerCase())
    );

  if (!year || !phase || !difficulty) return null;

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
          {Object.values(SubjectCategory).map(category => (
            <button
              key={category}
              type="button"
              className={`uppercase font-semibold font-mono mx-2 decoration-dotted underline-offset-4 outline-none ${
                cat === category && "dark:text-teal-500 text-teal-500 underline"
              }`}
              onClick={() => setCat(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {year > 2021 && (
        <div
          className="relative mt-2 mb-10 w-min mx-auto whitespace-nowrap cursor-pointer"
          onClick={toggleSystem}
        >
          {/* Checkbox */}
          <AnimatePresence initial={false}>
            {system === "2020" ? (
              <BoxWrapper key="check">
                <IconSquareCheck className="text-teal-500" />
              </BoxWrapper>
            ) : (
              <BoxWrapper key="square">
                <IconSquare />
              </BoxWrapper>
            )}
          </AnimatePresence>
          <p className="uppercase font-semibold ml-10">Új NAT</p>
        </div>
      )}

      {availableExams.length > 0 ? (
        availableExams.map(([code, name]) => (
          <PickerButton
            key={code}
            onClick={() => nav(`./${code}${system === "2020" ? "-v2020" : ""}`)}
          >
            {name}
          </PickerButton>
        ))
      ) : (
        <p className="mt-3 font-mono opacity-60">Ilyen tantárgy nincs. 🤫</p>
      )}
    </StageDiv>
  );
};

export default SubjectStage;
