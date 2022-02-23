import { useState } from "react";

const useForceUpdate = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  return [forceUpdate, () => setForceUpdate(forceUpdate + 1)];
};
export default useForceUpdate;
