import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";
import Footer from "components/Footer";
import ExamContext from "context/ExamContext";
import useParseParams from "utils/useParseParams";

import tailwindConfig from "../tailwind.config";

import Legend from "./components/Legend";
import Picker from "./components/Picker";

const { theme } = resolveConfig(tailwindConfig);

const BackButton = () => {
  const loc = useLocation();
  const nav = useNavigate();

  return (
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
        const path = loc.pathname.split("/").slice(1, -1).join("/");

        nav("/" + path);
      }}
    >
      Vissza
    </motion.button>
  );
};

const App = () => {
  const examData = useParseParams();

  return (
    <ExamContext.Provider value={examData}>
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-gray-50">
        <h1 className="mt-12 font-mono text-3xl font-bold uppercase lg:text-5xl xl:mt-24">
          Érettségi letöltő
        </h1>
        <div className="relative flex-grow  mt-20 w-[90%] md:w-4/5 lg:w-3/5">
          <Picker />
          <Legend />
          <AnimatePresence>{examData.year && <BackButton />}</AnimatePresence>
        </div>
        <Footer />
      </div>
    </ExamContext.Provider>
  );
};

export default App;
