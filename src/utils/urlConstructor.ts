import { ExamData, SrcType } from "../types";

const urlConstructor = (data: Partial<ExamData>, srcType: SrcType): string => {
  if (!data.difficulty || !data.phase || !data.subject || !data.year)
    throw Error("Not enough parameters!");
  const year = data.year.toString();
  const phase = data.phase === "fall" ? "osz" : "tavasz";
  let month = data.phase === "fall" ? "okt" : "maj";
  const diff = data.difficulty === "mid" ? "kozep" : "emelt";

  // IT is named info instead of inf until 2011
  if (
    data.subject === "inf" &&
    (data.year < 2011 || (data.year === 2011 && data.phase === "spring"))
  ) {
    data.subject = "info";
  }

  // Fiz is fizika in 2008 AND 2005 fall
  if (
    (data.year === 2008 || data.year === 2005) &&
    data.phase === "fall" &&
    data.subject === "fiz"
  ) {
    data.subject = "fizika";
  }

  // Kem is kemia before 2008 AND in 2010 fall
  if (
    (data.year <= 2008 && data.subject === "kem") ||
    (data.year === 2010 && data.phase === "fall" && data.subject === "kem")
  ) {
    data.subject = "kemia";
  }

  // Naming was f*cked up in fall 2005
  const novemberSubjectsIn2005 = [
    "angol",
    "nemet",
    "francia",
    "spanyol",
    "orosz",
    "olasz",
    "fizika",
  ];
  if (
    data.year === 2005 &&
    data.phase === "fall" &&
    novemberSubjectsIn2005.includes(data.subject)
  ) {
    month = "nov";
  }

  let isFor = false;
  if (srcType === "for") {
    isFor = true;
    srcType = "fl";
  }

  const subject = data.subject + isFor ? "for" : "";

  // 2012 custom scheme #1
  if (data.year === 2012 && data.phase === "fall")
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${diff}_${year}${phase}/${diff.substring(
      0,
      1
    )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.pdf`;

  // 2012 custom scheme #2
  if (data.year === 2012 && data.phase === "spring")
    return `https://www.oktatas.hu/pub_bin/dload/kozoktatas/erettsegi/feladatok${year}${phase}/${diff}/${diff.substring(
      0,
      1
    )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.pdf`;

  // First exam custom scheme
  if (data.year === 2005 && data.phase === "spring")
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${phase}/${diff}/${diff.substring(
      0,
      1
    )}_${subject}_${srcType}.pdf`;

  // Old scheme before 2012
  if (data.year < 2012)
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${phase}/${diff}/${diff.substring(
      0,
      1
    )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.pdf`;

  // New scheme from 2013
  return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${year}${phase}_${diff}/${diff.substring(
    0,
    1
  )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.pdf`;
};

export default urlConstructor;
