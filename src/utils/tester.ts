import fs from "node:fs";

import chalk from "chalk";
import ora from "ora";
import axios, { type AxiosError } from "axios";
import { YEARS } from "components/Picker";
import { SrcType, Phase, Difficulty, type ExamData, type System } from "types";
import SUBJECTS from "resources/subjects";

import urlConstructor from "./urlConstructor";

type ExamResponse = ExamData & {
  code?: number;
  url: string;
};

const examStr = (e: ExamResponse) =>
  "[" +
  (e.code === 200 ? chalk.green(e.code) : chalk.red(e.code)) +
  "] " +
  chalk.cyan(e.year) +
  " " +
  e.phase.padEnd(8) +
  e.difficulty.padEnd(6) +
  e.subject.padEnd(10) +
  (e.system === "all" ? "" : `v${e.system}`);

const exams: ExamResponse[] = YEARS.flatMap(year =>
  Object.values(Phase).flatMap(phase =>
    Object.values(Difficulty).flatMap(difficulty =>
      Object.keys(SUBJECTS).flatMap(subject => {
        if (year > 2021) {
          return ([2012, 2020] as System[]).flatMap(system => ({
            year,
            phase,
            difficulty,
            subject,
            system,
            url: urlConstructor(
              {
                year,
                phase,
                difficulty,
                subject,
                system,
              },
              SrcType.Ut
            ),
          }));
        }

        return [
          {
            year,
            phase,
            difficulty,
            subject,
            system: "all",
            url: urlConstructor(
              {
                year,
                phase,
                difficulty,
                subject,
                system: "all",
              },
              SrcType.Ut
            ),
          },
        ];
      })
    )
  )
);

const main = async () => {
  const spinner = ora(`Sending requests... (0/${exams.length})`).start();
  let spinnerCount = 0;
  for (const exam of exams) {
    try {
      const res = await axios.head(exam.url);
      exam.code = res.status;
      spinner.text = `Sending requests... (${spinnerCount++}/${exams.length}) - ${examStr(exam)}`;
    } catch (error) {
      exam.code = (error as AxiosError).response?.status;
      spinner.text = `Sending requests... (${spinnerCount++}/${exams.length}) - ${examStr(exam)}`;
    }
  }

  spinner.succeed("Requests sent!");

  exams.map(e => console.log(examStr(e)));

  console.log(
    chalk.green(exams.filter(e => e.code === 200).length + " OK, ") +
      chalk.red(exams.filter(e => e.code !== 200).length + " error, ") +
      exams.length +
      " total"
  );

  const missing: ExamData[] = exams
    .filter(e => e.code !== 200)
    .map(e => {
      const { url, code, ...exam } = e;
      return exam;
    });

  fs.writeFileSync("missing-exams.json", JSON.stringify(missing));
  console.log(chalk.green("Missing exams successfully written to file."));
};

void main();
