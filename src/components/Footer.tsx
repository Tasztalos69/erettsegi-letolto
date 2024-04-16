import resolveConfig from "tailwindcss/resolveConfig";
import { Link } from "react-router-dom";

import tailwindConfig from "../../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

const Footer = () => {
  return (
    <footer className="py-6 font-mono text-center text-zinc-400 dark:bg-gray-900">
      <a
        target="_blank"
        rel="noreferrer"
        href="mailto:bmk@wanter.dev"
        className="mx-4"
      >
        Elérhetőség
      </a>
      •
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Tasztalos69/erettsegi-letolto/issues/new"
        className="mx-4"
      >
        Hibajelentés
      </a>
      {window.innerWidth >= Number.parseInt(theme.screens.sm, 10) ? (
        "•"
      ) : (
        <br />
      )}
      <Link to="/adatvedelem" className="mx-4">
        Adatvédelem
      </Link>
    </footer>
  );
};

export default Footer;
