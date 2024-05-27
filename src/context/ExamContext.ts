import { createContext } from "react";
import type { ExamData } from "types";

const ExamContext = createContext<Partial<ExamData>>({});

export default ExamContext;
