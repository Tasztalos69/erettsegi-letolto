import { useState } from "react";
import Legend from "./Legend";
import Picker from "./Picker";
import { Stage } from "./types";

const App = () => {
  const [stage, setStage] = useState<Stage>(0);
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-mono text-center font-bold uppercase mt-24">
        Érettségi letöltő
      </h1>
      <div className="container relative w-3/5 mx-auto mt-20">
        <Picker stage={stage} setStage={setStage} />
        <Legend stage={stage} setStage={setStage} />
      </div>
    </div>
  );
};

export default App;
