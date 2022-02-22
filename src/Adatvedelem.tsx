import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Adatvedelem = () => {
  return (
    <div className="relative w-2/5 mx-auto font-mono">
      <h1 className="text-5xl text-center font-bold uppercase mt-24 mb-24">
        Adatvédelem
      </h1>
      <p
        className="w-2/3 mx-auto text-justify"
        style={{ textAlignLast: "center" }}
      >
        Az oldal alapértelmezetten anonim adatokat gyűjt a felhasználókról
        kizárólag statisztikai célokból. Amennyiben ezt nem szeretnéd, kérlek
        használd az alábbi gombokat.
      </p>
      <div className="flex justify-center items-center my-10">
        <button className="px-8 py-3 m-2 text-lg font-medium font-mono rounded border-2 border-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-red-500/60 transition-all duration-100 first-letter:uppercase">
          Hagyj ki engem!
        </button>
        <button className="px-8 py-3 m-2 text-lg font-medium font-mono rounded border-2 border-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-teal-300/60 transition-all duration-100 first-letter:uppercase">
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
  );
};

export default Adatvedelem;
