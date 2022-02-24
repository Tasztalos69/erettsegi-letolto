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
      <div className="relative container mx-auto min-h-[75vh] xl:min-h-[80vh]">
        <h1 className="lg:text-5xl text-3xl font-mono text-center font-bold uppercase xl:mt-24 mt-12">
          Érettségi letöltő
        </h1>
        <div className="container relative w-11/12 lg:w-3/5 mx-auto mt-20">
          <Picker stage={stage} setStage={setStage} />
          <Legend stage={stage} setStage={setStage} />
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
                className="block lg:absolute lg:-left-4 lg:bottom-auto lg:top-0 lg:-translate-x-full mx-auto text-lg font-mono font-semibold uppercase underline"
              >
                Vissza
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <footer className="absolute xl:bottom-0 translate-y-full xl:translate-y-none -bottom-4 left-1/2 -translate-x-1/2 text-zinc-400 font-mono text-center">
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
          {window.innerWidth >= 680 ? "•" : <br />}
          <Link to="/adatvedelem" className="mx-4">
            Adatvédelem
          </Link>
        </footer>
      </div>
    </>
  );
};

export default App;
