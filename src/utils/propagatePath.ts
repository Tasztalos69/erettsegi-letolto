import { YEARS } from "../Picker";
import { allSubjects } from "../subjects";
import { ExamData } from "../types";

const propagatePath = (path: string[]): [Partial<ExamData>, number, string] => {
  let data: Partial<ExamData> = {};
  let stage = 0;
  let currentPath: string[] = [];
  let cont = true;

  if (
    path[0] &&
    Number(path[0]) &&
    2005 <= Number(path[0]) &&
    Math.max(...YEARS) >= Number(path[0])
  ) {
    data = { ...data, year: Number(path[0]) };
    stage++;
    currentPath.push(path[0]);
  } else {
    cont = false;
  }

  if (cont && path[1] && (path[1] === "osz" || path[1] === "tavasz")) {
    data = { ...data, phase: path[1] };
    stage++;
    currentPath.push(path[1]);
  } else {
    cont = false;
  }

  if (cont && path[2] && (path[2] === "kozep" || path[2] === "emelt")) {
    data = { ...data, difficulty: path[2] };
    stage++;
    currentPath.push(path[2]);
  } else {
    cont = false;
  }

  if (cont && path[3] && Object.keys(allSubjects).includes(path[3])) {
    data = { ...data, subject: path[3] };
    stage++;
    currentPath.push(path[3]);
  } else {
    cont = false;
  }

  return [data, stage, "/" + currentPath.join("/")];
};

export default propagatePath;
