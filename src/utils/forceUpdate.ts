import { type Dispatch, type SetStateAction, useState } from "react";

const useForceUpdate = (): [number, Dispatch<SetStateAction<void>>] => {
  const [forceUpdate, setForceUpdate] = useState(0);
  return [forceUpdate, () => setForceUpdate(forceUpdate + 1)];
};

export default useForceUpdate;
