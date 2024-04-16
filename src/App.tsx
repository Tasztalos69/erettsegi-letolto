import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";
import Footer from "components/Footer";

import tailwindConfig from "../tailwind.config";

import Legend from "./components/Legend";
import Picker from "./components/Picker";
import { type ExamData, Stage } from "./types";
import propagatePath from "./utils/propagatePath";

const { theme } = resolveConfig(tailwindConfig);

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
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-gray-50">
      <h1 className="mt-12 font-mono text-3xl font-bold uppercase lg:text-5xl xl:mt-24">
        Érettségi letöltő
      </h1>
      <div className="relative flex-grow  mt-20 w-[90%] md:w-4/5 lg:w-3/5">
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
                color: theme.colors.teal[400],
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
      <Footer />
    </div>
  );
};

export default App;
