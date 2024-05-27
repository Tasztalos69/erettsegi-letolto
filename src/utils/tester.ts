/* eslint-disable max-depth */

/*
! This file exists on its own. It's meant to be ran with node (or bun).

This is the tester, which will ping oktatas.hu for every possible exam, and note whether it was held or not.
*/

import fs from "node:fs";
import process from "node:process";

import chalk from "chalk";
import ora from "ora";
import axios, { type AxiosError } from "axios";
import { YEARS } from "resources/years";
import {
  SrcType,
  Phase,
  Difficulty,
  type ExamData,
  type RecursivePartial,
  type HeldExams,
  type StoredSystem,
  type System,
} from "types";
import SUBJECTS from "resources/subjects";

import urlConstructor from "./urlConstructor";
import sum from "./sum";

const { log } = console;
const { green, red, cyan } = chalk;

// Count of all exams to be tested
const LENGTH = YEARS.map(y => {
  return (
    Object.values(Phase).length *
    Object.values(Difficulty).length *
    Object.keys(SUBJECTS).length *
    (y > 2021 ? 2 : 1)
  );
}).reduce(sum, 0);

const spinner = ora(`Sending requests... (0/${LENGTH})`);
let success = 0;
let fail = 0;

const exams: RecursivePartial<HeldExams> = {};

// ------------ HELPERS

/**
 * Stringify an exam response
 * @param e The exam to stringify
 * @param code The status code of the response
 * @returns A stringified version of the exam response
 */
const examStr = (e: ExamData, code: number | undefined) =>
  "[" +
  (code === 200 ? green(code) : red(code)) +
  "] " +
  cyan(e.year) +
  " " +
  e.phase.padEnd(8) +
  e.difficulty.padEnd(6) +
  e.subject.padEnd(12) +
  (e.system === "all" ? "" : `v${e.system}`);

/**
 * Test if an exam was held, by pinging its URL
 * @param exam The exam to test
 * @returns Status code of the response
 */
const requestExam = async (exam: ExamData) => {
  const URL = urlConstructor(exam, SrcType.Ut);
  let code: number | undefined;
  try {
    const res = await axios.head(URL);
    code = res.status;
    success++;
    spinner.text = `Sending requests... (${success + fail}/${LENGTH}) - ${examStr(exam, code)}`;
  } catch (error) {
    code = (error as AxiosError).response?.status;
    fail++;
    spinner.text = `Sending requests... (${success + fail}/${LENGTH}) - ${examStr(exam, code)}`;
  }

  return code;
};

/**
 * Save the results to a file
 */
const save = () => {
  fs.writeFileSync("./held-exams.json", JSON.stringify(exams));
  log(green("Held exams successfully written to file."));
};

/**
 * Save on early exit too
 */
process.on("SIGINT", function () {
  log("Caught interrupt signal");
  save();
  process.exit();
});

// ------------ MAIN
spinner.start();

// Traverse the exam tree, and test every exam whether it exists
for (const year of YEARS) {
  exams[year] = {};

  for (const phase of Object.values(Phase)) {
    exams[year]![phase] = {};

    for (const difficulty of Object.values(Difficulty)) {
      exams[year]![phase]![difficulty] = {};

      for (const subject of Object.keys(SUBJECTS)) {
        // After 2021, there are two systems, test all of them
        if (year > 2021) {
          const res12 = await requestExam({
            year,
            phase,
            difficulty,
            subject,
            system: "2012",
          });
          const stored12 = res12 === 200 ? "2012" : undefined;

          const res20 = await requestExam({
            year,
            phase,
            difficulty,
            subject,
            system: "2020",
          });
          const stored20 = res20 === 200 ? "2020" : undefined;

          if (stored12 !== undefined || stored20 !== undefined) {
            exams[year]![phase]![difficulty]![subject] = [
              stored12,
              stored20,
            ].filter(Boolean) as StoredSystem;
          }
        } else {
          const res = await requestExam({
            year,
            phase,
            difficulty,
            subject,
            system: "all",
          });
          if (res === 200) {
            exams[year]![phase]![difficulty]![subject] = "all";
          }
        }
      }
    }
  }
}

spinner.succeed("Requests sent!");

log(
  green(success + " OK, ") +
    red(fail + " error, ") +
    (success + fail) +
    " total"
);

save();
