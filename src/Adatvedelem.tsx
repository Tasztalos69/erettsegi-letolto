import { IconCheck } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Adatvedelem = ({
  update,
}: {
  readonly update: Dispatch<SetStateAction<void>>;
}) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) setTimeout(() => setShowPopup(false), 2000);
  }, [showPopup]);

  return (
    <>
      <div className="relative w-10/12 mx-auto font-mono lg:w-2/5">
        <h1 className="mt-24 mb-24 text-3xl font-bold text-center uppercase lg:text-5xl">
          Adatvédelem
        </h1>
        <p
          className="mx-auto text-justify lg:w-4/5"
          style={{ textAlignLast: "center" }}
        >
          Az oldal alapértelmezetten anonim adatokat gyűjt a felhasználókról
          kizárólag statisztikai célokból. Amennyiben ezt nem szeretnéd, azt az
          alábbi gombbal jelezheted.
        </p>
        <div className="flex flex-col items-center justify-center my-10 xl:flex-row whitespace-nowrap">
          <button
            type="button"
            className="px-8 py-3 m-2 font-mono text-lg font-medium transition-all duration-100 border-2 border-gray-900 rounded dark:border-gray-50 xl:hover:scale-105 xl:hover:shadow-lg xl:hover:shadow-red-500/60 first-letter:uppercase"
            onClick={() => {
              setShowPopup(true);
              localStorage.setItem("disable-data-collection", "true");
              update();
            }}
          >
            Hagyj ki engem!
          </button>
          <button
            type="button"
            className="px-8 py-3 m-2 font-mono text-lg font-medium transition-all duration-100 border-2 border-gray-900 rounded dark:border-gray-50 xl:hover:scale-105 xl:hover:shadow-lg xl:hover:shadow-teal-300/60 first-letter:uppercase"
            onClick={() => {
              setShowPopup(true);
              localStorage.removeItem("disable-data-collection");
              update();
            }}
          >
            Részemről rendben van.
          </button>
        </div>
        <Link
          to="/"
          className="absolute font-mono text-lg font-semibold underline uppercase transition-all duration-200 -translate-x-1/2 left-1/2 hover:text-teal-400"
        >
          Vissza
        </Link>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute flex items-center justify-center h-16 -translate-x-1/2 bg-white border-2 border-black rounded-lg shadow-md bottom-4 left-1/2 w-80 dark:border-none shadow-teal-400/60 dark:shadow-none"
          >
            <IconCheck />
            <p className="ml-2 font-mono font-medium">
              A változásokat mentettük.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Adatvedelem;
