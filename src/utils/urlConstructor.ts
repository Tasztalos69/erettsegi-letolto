import { type ExamData, SrcType, Phase } from "../types";

// eslint-disable-next-line complexity
const urlConstructor = (data: Partial<ExamData>, srcType: SrcType): string => {
  if (!data.difficulty || !data.phase || !data.subject || !data.year)
    throw new Error("Not enough parameters!");
  const year = data.year.toString();
  const { phase, difficulty: diff } = data;
  let month = data.phase === Phase.Osz ? "okt" : "maj";
  let system = data.system === 2020 ? "uj" : "";

  // IT is named info instead of inf until 2011
  if (
    data.subject === "inf" &&
    (data.year < 2011 || (data.year === 2011 && data.phase === Phase.Tavasz))
  ) {
    data.subject = "info";
  }

  // Fiz is fizika in 2008 AND 2005 fall
  if (
    (data.year === 2008 || data.year === 2005) &&
    data.phase === Phase.Osz &&
    data.subject === "fiz"
  ) {
    data.subject = "fizika";
  }

  // Kem is kemia before 2008 AND in 2010 fall
  if (
    (data.year <= 2008 && data.subject === "kem") ||
    (data.year === 2010 && data.phase === Phase.Osz && data.subject === "kem")
  ) {
    data.subject = "kemia";
  }

  // Inf is digkult since the new system
  if (system === "uj" && data.subject === "inf") {
    data.subject = "digkult";
    system = "";
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
    data.phase === Phase.Osz &&
    novemberSubjectsIn2005.includes(data.subject)
  ) {
    month = "nov";
  }

  let filetype;
  let extension = "";
  switch (srcType) {
    case SrcType.For:
      filetype = "zip";
      extension = "for";
      srcType = SrcType.Fl;
      break;
    case SrcType.Meg:
      filetype = "zip";
      extension = "meg";
      srcType = SrcType.Ut;
      break;
    case SrcType.Fl:
    case SrcType.Ut:
      filetype = "pdf";
      break;
    case SrcType.Hang:
      filetype = "mp3";
      srcType = SrcType.Fl;
      break;
  }

  const subject = data.subject + extension;

  // 2012 custom scheme #1
  if (data.year === 2012 && data.phase === Phase.Osz)
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${diff}_${year}${phase}/${diff.slice(
      0,
      1
    )}_${subject}_${year.slice(2, 4)}${month}_${srcType}.${filetype}`;

  // 2012 custom scheme #2
  if (data.year === 2012 && data.phase === Phase.Tavasz)
    return `https://www.oktatas.hu/pub_bin/dload/kozoktatas/erettsegi/feladatok${year}${phase}/${diff}/${diff.slice(
      0,
      1
    )}_${subject}_${year.slice(2, 4)}${month}_${srcType}.${filetype}`;

  // First exam custom scheme
  if (data.year === 2005 && data.phase === Phase.Tavasz)
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${phase}/${diff}/${diff.slice(
      0,
      1
    )}_${subject}_${srcType}.${filetype}`;

  // Old scheme before 2012
  if (data.year < 2012)
    return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${phase}/${diff}/${diff.slice(
      0,
      1
    )}_${subject}_${year.slice(2, 4)}${month}_${srcType}.${filetype}`;

  // New scheme from 2013
  return `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${year}${phase}_${diff}/${diff.slice(
    0,
    1
  )}_${subject}${system}_${year.slice(2, 4)}${month}_${srcType}.${filetype}`;
};

export default urlConstructor;
