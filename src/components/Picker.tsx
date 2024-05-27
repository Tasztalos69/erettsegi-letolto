import { AnimatePresence } from "framer-motion";
import useParseParams from "utils/useParseParams";
import omit from "lodash/omit";

import YearStage from "./stages/YearStage";
import PhaseStage from "./stages/PhaseStage";
import DifficultyStage from "./stages/DifficultyStage";
import SubjectStage from "./stages/SubjectStage";
import DownloadStage from "./stages/DownloadStage";

const stages = [
  <YearStage key="year" />,
  <PhaseStage key="phase" />,
  <DifficultyStage key="difficulty" />,
  <SubjectStage key="subject" />,
  <DownloadStage key="download" />,
];

const Picker = () => {
  const params = useParseParams();
  const stage = Object.keys(omit(params, "system")).length;

  console.log(stage);

  return (
    <div className="mb-24 text-center lg:mb-0">
      <AnimatePresence initial={false} mode="wait">
        {stages[stage]}
      </AnimatePresence>
    </div>
  );
};

export default Picker;
