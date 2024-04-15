import { IconSquare, IconSquareCheck } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavigateFunction } from "react-router-dom";

const stageNames = ["Év", "Időszak", "Szint", "Tantárgy", "Letöltés"];

const BoxWrapper = (props: any) => (
  <motion.div
    {...props}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0, duration: 0.7 }}
    className="absolute left-0 origin-center -translate-y-1/2 top-1/2"
  />
);

type LegendProps = {
  readonly stage: number;
  readonly nav: NavigateFunction;
  readonly path: string[];
};

const Legend = ({ stage, nav, path }: LegendProps) => {
  return (
    <div className="hidden lg:block w-1/5 absolute right-0 top-0 translate-x-[110%]">
      <ul>
        {stageNames.map((n, i) => {
          const completed = stage > i || stage === stageNames.length - 1;
          return (
            <li
              key={n}
              className={`relative pl-8 flex items-center font-mono font-semibold text-xl my-8 first:mt-2 text-zinc-400 ${
                completed && "text-teal-500 cursor-pointer"
              } transition-all duration-700`}
              onClick={() => {
                if (completed) {
                  path = path.slice(0, i);
                  nav(path.join("/"));
                }
              }}
            >
              <AnimatePresence initial={false}>
                {completed ? (
                  <BoxWrapper key="check">
                    <IconSquareCheck />
                  </BoxWrapper>
                ) : (
                  <BoxWrapper key="square">
                    <IconSquare />
                  </BoxWrapper>
                )}
              </AnimatePresence>
              {n}
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
