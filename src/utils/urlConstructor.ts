import { ExamData, SrcType } from "../types";

const urlConstructor = (data: Partial<ExamData>, srcType: SrcType): string => {
  if (!data.difficulty || !data.phase || !data.subject || !data.year)
    throw Error("Not enough parameters!");
  const year = data.year.toString();
  const { phase, difficulty: diff } = data;
  let month = data.phase === "osz" ? "okt" : "maj";

  // IT is named info instead of inf until 2011
  if (
    data.subject === "inf" &&
    (data.year < 2011 || (data.year === 2011 && data.phase === "tavasz"))
  ) {
    data.subject = "info";
  }

  // Fiz is fizika in 2008 AND 2005 fall
  if (
    (data.year === 2008 || data.year === 2005) &&
    data.phase === "osz" &&
    data.subject === "fiz"
  ) {
    data.subject = "fizika";
  }

  // Kem is kemia before 2008 AND in 2010 fall
  if (
    (data.year <= 2008 && data.subject === "kem") ||
    (data.year === 2010 && data.phase === "osz" && data.subject === "kem")
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
    data.phase === "osz" &&
    novemberSubjectsIn2005.includes(data.subject)
  ) {
    month = "nov";
  }

  let filetype;
  let extension = "";
  switch (srcType) {
    case "for":
      filetype = "zip";
      extension = "for";
      srcType = "fl";
      break;
    case "meg":
      filetype = "zip";
      extension = "meg";
      srcType = "ut";
      break;
    case "fl":
    case "ut":
      filetype = "pdf";
      break;
    case "hang":
      filetype = "mp3";
      srcType = "fl";
      break;
  }

  const subject = data.subject + extension;

  // 2012 custom scheme #1
  if (data.year === 2012 && data.phase === "osz")
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${diff}_${year}${phase}/${diff.substring(
      0,
      1
    )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.${filetype}`;

  // 2012 custom scheme #2
  if (data.year === 2012 && data.phase === "tavasz")
    return `https://www.oktatas.hu/pub_bin/dload/kozoktatas/erettsegi/feladatok${year}${phase}/${diff}/${diff.substring(
      0,
      1
    )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.${filetype}`;

  // First exam custom scheme
  if (data.year === 2005 && data.phase === "tavasz")
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${phase}/${diff}/${diff.substring(
      0,
      1
    )}_${subject}_${srcType}.${filetype}`;

  // Old scheme before 2012
  if (data.year < 2012)
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${phase}/${diff}/${diff.substring(
      0,
      1
    )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.${filetype}`;

  // New scheme from 2013
  return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${year}${phase}_${diff}/${diff.substring(
    0,
    1
  )}_${subject}_${year.substring(2, 4)}${month}_${srcType}.${filetype}`;
};

export default urlConstructor;
