import { Indexable } from "./types";

export const alapTargyak: Indexable = {
  mat: "Matematika",
  magyir: "Magyar nyelv és irodalom",
  tort: "Történelem",
  inf: "Informatika",
  angol: "Angol",
  nemet: "Német",
  francia: "Francia",
  spanyol: "Spanyol",
  orosz: "Orosz",
  olasz: "Olasz",
  fldr: "Földrajz",
  kem: "Kémia",
  bio: "Biológia",
  fiz: "Fizika",
  enekzene: "Ének-zene",
  drama: "Dráma",
  muvtort: "Művészettörténet",
  filo: "Filozófia",
  tars: "Társadalomismeret",
  tarspr: "Társadalomismeret projekt",
};

export const agazatok: Indexable = {
  artist: "artista ismeretek",
  autorep: "autó- és repülőgép-szerelési ismeretek",
  automat: "automatikai és elektronikai ismeretek",
  banyamuv: "bányaművelési ismeretek",
  banyasz: "bányászat ismeretek",
  belrendism: "belügyi rendészeti ismeretek",
  egugy: "egészségügyi ismeretek",
  egugytech: "egészségügyi technikai ismeretek",
  egyh: "egyházzenész ismeretek",
  elekt: "elektronikai alapismeretek",
  elelm: "élelmiszeripari ismeretek",
  elelmgep: "élelmiszeripari gépésztechnikai ismeretek",
  epulgep: "épületgépészeti ismeretek",
  erdvad: "erdészeti és vadgazdálkodási ismeretek",
  epit: "építészeti és építési alapismeretek",
  faip: "faipari ismeretek",
  fodraszati: "fodrászati ismeretek",
  foldm: "földmérési ismeretek",
  gazipari: "gázipari és fluidumkitermelési ismeretek",
  gep: "gépészeti alapismeretek",
  gepgyartas: "gépgyártás-technológiai ismeretek",
  gyakszin: "gyakorlatosszínész-ismeretek",
  hajozasi: "hajózási technikai ismeretek",
  hang: "hang-, film- és színháztechnikai ismeretek", //!! for
  honvedelmi: "honvédelmi ismeretek",
  idnyeugyv: "idegennyelvű ügyviteli ismeretek",
  infoism: "informatikai ismeretek", //!! for 2008-nofor!
  irodaiugyv: "irodai ügyviteli ismeretek", //!! for
  irodugyv: "irodai ügyviteli ismeretek", //!! for DUPL!
  jazz: "jazz-zenész ismeretek",
  katism: "katonai ismeretek",
  kepz: "képző- és iparművészeti ismeretek",
  ker: "kereskedelmi ismeretek",
  kermark: "kereskedelmi és marketing alapismeretek",
  kert: "kertészeti és parképítési ismeretek",
  kiadvszerk: "kiadványszerkesztési ismeretek",
  klassz: "klasszikuszenész-ismeretek",
  kozmetikai: "kozmetikai ismeretek",
  konyip: "könnyűipari ismeretek",
  kornyviz: "környezetvédelem-vízgazdálkodás ismeretek",
  kornyved: "környezetvédelmi ismeretek",
  kozg: "közgazdasági ismeretek",
  kozgelm: "közgazdasági alapismeretek (elméleti gazdaságtan)",
  kozguzl: "közgazdasági alapismeretek (üzleti gazdaságtan)",
  kozgmark: "közgazdasági-marketing alapismeretek",
  kozl: "közlekedés ismeretek",
  kozlautmat: "közlekedésautomatikai ismeretek",
  kozlepit: "közlekedésépítő ismeretek",
  kozlgep: "közlekedésgépész ismeretek",
  kozltech: "közlekedési alapismeretek (közlekedéstechnika)",
  kozluzemv: "közlekedési alapismeretek (közlekedés-üzemvitel)",
  kozmuv: "közművelődési ismeretek",
  kozutilegi:
    "közúti és légi közlekedési, szállítmányozási és logisztikai ismeretek",
  magmelyep: "magas- és mélyépítési ismeretek",
  mechatron: "mechatronikai ismeretek",
  mezerdgep: "mezőgazdasági és erdészeti gépésztechnikai ismeretek",
  mezog: "mezőgazdasági ismeretek",
  mezogep: "mezőgazdasági gépész ismeretek",
  muvkom: "művelődési és kommunikációs alapismeretek",
  nepz: "népzenész-ismeretek",
  nyomd: "nyomdaipari technikai ismeretek",
  okt: "oktatási alapismeretek",
  opt: "optikai ismeretek",
  ped: "pedagógiai ismeretek",
  postaforg: "postaforgalmi ismeretek",
  rend: "rendészet ismeretek",
  rendkozsz: "rendészeti és közszolgálati ismeretek",
  sport: "sport ismeretek",
  szep: "szépészet ismeretek",
  szoc: "szociális ismeretek",
  szorak: "szórakoztatózenész-ismeretek",
  tanc: "táncos ismeretek",
  tavkozl: "távközlési ismeretek", //!! for
  termtud: "természettudomány",
  turiszt: "turisztikai ismeretek",
  ugyvit: "ügyvitel ismeretek", //!! for 2010-forras!
  utvasuthid: "út-, vasút- és hídépítési ismeretek",
  vasutgep: "vasútgépészeti ismeretek",
  vasutuzemi:
    "vasútüzemi közlekedési, szállítmányozási és logisztikai ismeretek",
  vegy: "vegyész ismeretek",
  vegyip: "vegyipari ismeretek",
  vend: "vendéglátóipari ismeretek",
  vendid: "vendéglátás-idegenforgalom alapismeretek",
  vill: "villamosipar és elektronika ismeretek",
  vizugyi: "vízügyi ismeretek",
};

export const allSubjects: Indexable = { ...alapTargyak, ...agazatok };
