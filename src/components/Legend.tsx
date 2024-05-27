import { IconSquare, IconSquareCheck } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";
import ExamContext from "../context/ExamContext";

const { theme } = resolveConfig(tailwindConfig);

const stageNames = ["Év", "Időszak", "Szint", "Tantárgy", "Letöltés"];

export const BoxWrapper = ({ children }: { readonly children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0, duration: 0.5 }}
    className="absolute left-0 origin-center -translate-y-1/2 top-1/2"
  >
    {children}
  </motion.div>
);

const Legend = () => {
  const examData = useContext(ExamContext);
  const loc = useLocation();
  const nav = useNavigate();

  const stage = Object.values(examData).filter(Boolean).length;
  return (
    <div className="absolute top-0 hidden translate-x-full -right-6 lg:block">
      <ul>
        {stageNames.map((name, i) => {
          const completed = stage > i || stage === stageNames.length - 1;

          return (
            <li
              key={name}
              className={`relative pl-8 flex items-center font-mono font-semibold text-xl my-8 first:mt-2 text-zinc-400 ${
                completed && "text-teal-500 cursor-pointer"
              } transition-all duration-700`}
              onClick={() => {
                if (completed) {
                  const path = loc.pathname
                    .split("/")
                    .slice(1, i + 1)
                    .join("/");

                  nav("/" + path);
                }
              }}
            >
              {/* Checkbox */}
              <AnimatePresence initial={false}>
                {completed ? (
                  <BoxWrapper key="check">
                    <IconSquareCheck className="text-teal-500" />
                  </BoxWrapper>
                ) : (
                  <BoxWrapper key="square">
                    <IconSquare />
                  </BoxWrapper>
                )}
              </AnimatePresence>

              {/* The title */}
              <motion.span
                animate={{
                  color: completed ? theme.colors.teal[500] : undefined,
                }}
              >
                {name}
              </motion.span>

              {/* Connecting dots */}
              {i < stageNames.length - 1 && (
                <span
                  className={`block absolute h-6 left-[10px] -bottom-7 border-l-4 border-dotted ${
                    completed ? "border-teal-500" : "border-zinc-300"
                  } transition-full duration-700`}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Legend;
