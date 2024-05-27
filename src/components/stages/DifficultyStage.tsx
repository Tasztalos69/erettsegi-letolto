import PickerButton from "components/PickerButton";
import StageDiv from "components/StageDiv";
import { useNavigate } from "react-router-dom";
import type { Difficulty } from "types";

export const diffStr: Record<Difficulty, string> = {
  kozep: "középszint",
  emelt: "emelt szint",
};

const DifficultyStage = () => {
  const nav = useNavigate();
  return (
    <StageDiv>
      <PickerButton key="kozep" onClick={() => nav("./kozep")}>
        {diffStr.kozep}
      </PickerButton>
      <PickerButton key="emelt" onClick={() => nav("./emelt")}>
        {diffStr.emelt}
      </PickerButton>
    </StageDiv>
  );
};

export default DifficultyStage;
