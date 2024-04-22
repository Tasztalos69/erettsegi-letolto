import { YEARS } from "../components/Picker";
import SUBJECTS from "../resources/subjects";
import type { Difficulty, ExamData, Phase } from "../types";

const propagatePath = (
  path: string[],
  initialData: Partial<ExamData> = {}
): [Partial<ExamData>, number, string] => {
  let data: Partial<ExamData> = structuredClone(initialData);
  let stage = 0;
  const currentPath: string[] = [];
  let cont = true;

  if (
    path[0] &&
    Number(path[0]) &&
    Number(path[0]) >= 2005 &&
    Math.max(...YEARS) >= Number(path[0])
  ) {
    data = { ...data, year: Number(path[0]) };
    stage++;
    currentPath.push(path[0]);
  } else {
    cont = false;
  }

  if (cont && path[1] && (path[1] === "osz" || path[1] === "tavasz")) {
    data = { ...data, phase: path[1] as Phase };
    stage++;
    currentPath.push(path[1]);
  } else {
    cont = false;
  }

  if (cont && path[2] && (path[2] === "kozep" || path[2] === "emelt")) {
    data = { ...data, difficulty: path[2] as Difficulty };
    stage++;
    currentPath.push(path[2]);
  } else {
    cont = false;
  }

  if (cont && path[3] && Object.keys(SUBJECTS).includes(path[3])) {
    data = { ...data, subject: path[3] };
    stage++;
    currentPath.push(path[3]);
  } else {
    cont = false;
  }

  return [data, stage, "/" + currentPath.join("/")];
};

export default propagatePath;
