import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Legend from "./Legend";
import Picker from "./Picker";
import { type ExamData, Stage } from "./types";
import propagatePath from "./utils/propagatePath";

const App = () => {
  const [stage, setStage] = useState<Stage>(0);
  const [data, setData] = useState<Partial<ExamData>>({});
  const loc = useLocation();
  const nav = useNavigate();
  const path = loc.pathname.split("/");
  path.shift();

  useEffect(() => {
    const [newData, newStage, newPath] = propagatePath(path);
    setData(newData);
    setStage(newStage);

    if (path.length > 1) path.unshift("/");
    if (loc.pathname !== newPath) nav(newPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.pathname]);

  return (
    <div className="relative container mx-auto min-h-[75vh] xl:min-h-[80vh]">
      <h1 className="mt-12 font-mono text-3xl font-bold text-center uppercase lg:text-5xl xl:mt-24">
        Érettségi letöltő
      </h1>
      <div className="container relative w-11/12 mx-auto mt-20 lg:w-3/5">
        <Picker
          stage={stage}
          setStage={setStage}
          data={data}
          setData={setData}
        />
        <Legend stage={stage} nav={nav} path={path} />
        <AnimatePresence>
          {stage > Stage.YEAR && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0, duration: 0.2 }}
              whileHover={{
                color: "rgb(45 212 191)",
              }}
              className="block mx-auto font-mono text-lg font-semibold underline uppercase lg:absolute lg:-left-4 lg:bottom-auto lg:top-0 lg:-translate-x-full"
              onClick={() => {
                // Double back if no phase selection is available
                if (
                  path.includes(new Date().getFullYear().toString()) &&
                  ["osz", "tavasz"].includes(path.at(-1)!) &&
                  new Date().getMonth() < 10
                ) {
                  path.pop();
                }

                path.pop();
                nav(path.join("/"));
              }}
            >
              Vissza
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <footer className="absolute bottom-0 translate-y-full xl:translate-y-none left-1/2 -translate-x-1/2 text-zinc-400 font-mono text-center dark:bg-gray-900 py-6 w-[110vw]">
        <a href="mailto:sugarvedelem@icloud.com" className="mx-4">
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
  );
};

export default App;
