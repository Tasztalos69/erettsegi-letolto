import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Legend from "./Legend";
import Picker from "./Picker";
import { Stage } from "./types";

const App = () => {
  const [stage, setStage] = useState<Stage>(0);
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-5xl font-mono text-center font-bold uppercase mt-24">
          Érettségi letöltő
        </h1>
        <div className="container relative w-3/5 mx-auto mt-20">
          <AnimatePresence>
            {stage > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0, duration: 0.2 }}
                whileHover={{
                  color: "rgb(45 212 191)",
                }}
                onClick={() => stage > 0 && setStage(stage - 1)}
                className="absolute -left-4 top-0 -translate-x-full text-lg font-mono font-semibold uppercase underline"
              >
                Vissza
              </motion.button>
            )}
          </AnimatePresence>
          <Picker stage={stage} setStage={setStage} />
          <Legend stage={stage} setStage={setStage} />
        </div>
      </div>
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-400 font-mono">
        <a href="mailto:tasztalos69@gmail.com" className="mx-4">
          Elérhetőség
        </a>
        •
        <a
          href="https://github.com/Tasztalos69/erettsegi-letolto/issues/new"
          className="mx-4"
        >
          Hibajelentés
        </a>
        •
        <Link to="/adatvedelem" className="mx-4">
          Adatvédelem
        </Link>
      </footer>
    </>
  );
};

export default App;
