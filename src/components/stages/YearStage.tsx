import PickerButton from "components/PickerButton";
import StageDiv from "components/StageDiv";
import { useNavigate } from "react-router-dom";
import { YEARS } from "resources/years";

const Year = () => {
  const nav = useNavigate();

  return (
    <StageDiv key="year">
      {YEARS.map(y => (
        <PickerButton key={y} onClick={() => nav(`./${y}`)}>
          {y}
        </PickerButton>
      ))}
    </StageDiv>
  );
};

export default Year;
