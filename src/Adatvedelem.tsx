import { IconCheck } from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Adatvedelem = ({ update }: { update: any }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) setTimeout(() => setShowPopup(false), 2000);
  }, [showPopup]);

  return (
    <>
      <div className="relative w-10/12 lg:w-2/5 mx-auto font-mono">
        <h1 className="lg:text-5xl text-3xl text-center font-bold uppercase mt-24 mb-24">
          Adatvédelem
        </h1>
        <p
          className="lg:w-4/5  mx-auto text-justify"
          style={{ textAlignLast: "center" }}
        >
          Az oldal alapértelmezetten anonim adatokat gyűjt a felhasználókról
          kizárólag statisztikai célokból. Amennyiben ezt nem szeretnéd, kérlek
          használd az alábbi gombokat.
        </p>
        <div className="flex xl:flex-row flex-col justify-center items-center my-10 whitespace-nowrap">
          <button
            className="px-8 py-3 m-2 text-lg font-medium font-mono rounded border-2 border-gray-900 xl:hover:scale-105 xl:hover:shadow-lg xl:hover:shadow-red-500/60 transition-all duration-100 first-letter:uppercase"
            onClick={() => {
              setShowPopup(true);
              localStorage.setItem("disable-data-collection", "true");
              update();
            }}
          >
            Hagyj ki engem!
          </button>
          <button
            className="px-8 py-3 m-2 text-lg font-medium font-mono rounded border-2 border-gray-900 xl:hover:scale-105 xl:hover:shadow-lg xl:hover:shadow-teal-300/60 transition-all duration-100 first-letter:uppercase"
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
          className="absolute left-1/2 -translate-x-1/2 text-lg font-mono font-semibold uppercase underline hover:text-teal-400 transition-all duration-200"
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
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-80 h-16 bg-white rounded-lg border-2 border-black shadow-md shadow-teal-400/60"
          >
            <IconCheck />
            <p className="font-mono font-medium ml-2">
              A változásokat mentettük.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Adatvedelem;
