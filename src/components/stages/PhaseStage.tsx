import PickerButton from "components/PickerButton";
import StageDiv from "components/StageDiv";
import { useNavigate } from "react-router-dom";
import type { Phase } from "types";

export const phaseStr: Record<Phase, string> = {
  osz: "ősz (október-november)",
  tavasz: "tavasz (május-június)",
};

const PhaseStage = () => {
  const nav = useNavigate();
  return (
    <StageDiv>
      <PickerButton key="tavasz" onClick={() => nav("./tavasz")}>
        {phaseStr.tavasz}
      </PickerButton>
      <PickerButton key="osz" onClick={() => nav("./osz")}>
        {phaseStr.osz}
      </PickerButton>
    </StageDiv>
  );
};

export default PhaseStage;
