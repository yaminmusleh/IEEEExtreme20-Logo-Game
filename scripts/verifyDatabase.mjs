// Run: npm run verify           (offline checks)
//      npm run verify:remote    (also checks that every logo URL loads; needs internet)

import fs from "node:fs";
import path from "node:path";
import { logoDatabase } from "../src/data/logoDatabase.js";
import { gameConfig } from "../src/config/gameConfig.js";
import { selectRandomLogos, getBand } from "../src/utils/selectRandomLogos.js";
import { isAnswerCorrect } from "../src/utils/normalizeAnswer.js";

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures += 1;
};

const { rules } = gameConfig;

// 1. Database structure
check(logoDatabase.length >= 100, `database has ${logoDatabase.length} entries (need >= 100)`);
const ids = logoDatabase.map((l) => l.id);
check(new Set(ids).size === ids.length, "all ids are unique");
const validShape = logoDatabase.every(
  (l) =>
    l.id && l.name && l.image && l.category &&
    Array.isArray(l.aliases) &&
    Number.isInteger(l.difficulty) && l.difficulty >= 1 && l.difficulty <= 5
);
check(validShape, "every entry has id, name, image, aliases, category and difficulty 1-5");

const bands = { easy: 0, medium: 0, hard: 0 };
logoDatabase.forEach((l) => (bands[getBand(l.difficulty)] += 1));
console.log(`INFO  difficulty pool: easy=${bands.easy}, medium=${bands.medium}, hard=${bands.hard}`);

// 2. Selection (200 simulated sessions)
let selectionOk = true;
let balanceOk = true;
const firstLogos = new Set();
for (let i = 0; i < 200; i += 1) {
  const picked = selectRandomLogos(logoDatabase, rules);
  if (picked.length !== rules.totalRounds || new Set(picked.map((l) => l.id)).size !== picked.length) {
    selectionOk = false;
  }
  const counts = { easy: 0, medium: 0, hard: 0 };
  picked.forEach((l) => (counts[getBand(l.difficulty)] += 1));
  if (counts.easy !== rules.easyCount || counts.medium !== rules.mediumCount || counts.hard !== rules.hardCount) {
    balanceOk = false;
  }
  firstLogos.add(picked[0].id);
}
check(selectionOk, `selection returns ${rules.totalRounds} unique logos every time`);
check(balanceOk, "difficulty distribution matches config");
check(firstLogos.size > 10, `first round varies between sessions (${firstLogos.size} different first logos in 200 runs)`);

// Shortage handling: tiny database must not duplicate or crash
const tiny = logoDatabase.slice(0, 6);
const tinyPick = selectRandomLogos(tiny, rules);
check(tinyPick.length === 6 && new Set(tinyPick.map((l) => l.id)).size === 6, "small database yields unique logos without duplicates");

// 3. Answer matching
const gh = logoDatabase.find((l) => l.id === "github");
const cpp = logoDatabase.find((l) => l.id === "cplusplus");
const c = logoDatabase.find((l) => l.id === "c");
check(["GitHub", "github", "GITHUB", "  GitHub  ", "git   hub"].every((a) => isAnswerCorrect(a, gh)), "GitHub matches case/space variants");
check(isAnswerCorrect("github.com", gh), "alias matches");
check(!isAnswerCorrect("", gh) && !isAnswerCorrect("   ", gh), "empty answers never match");
check(!isAnswerCorrect("hub", gh) && !isAnswerCorrect("github enterprise server", gh), "no substring matching");
check(isAnswerCorrect("c++", cpp) && !isAnswerCorrect("c++", c) && !isAnswerCorrect("c", cpp), "C and C++ stay distinct");

// 4. Image sources
if (rules.totalRounds > logoDatabase.length) console.log("WARN  fewer logos than rounds");

if (gameConfig.logos.source === "local") {
  const missing = logoDatabase.filter((l) => !fs.existsSync(path.join("public", l.image)));
  check(missing.length === 0, `all local logo files exist (${missing.length} missing)`);
  missing.forEach((l) => console.log(`      missing: public${l.image}`));
}

if (process.argv.includes("--remote") && gameConfig.logos.source !== "local") {
  console.log("INFO  checking remote logo URLs...");
  const bad = [];
  const queue = [...logoDatabase];
  const worker = async () => {
    while (queue.length) {
      const l = queue.shift();
      try {
        const res = await fetch(l.image);
        if (!res.ok) bad.push(`${l.id} -> HTTP ${res.status}`);
      } catch (err) {
        bad.push(`${l.id} -> ${err.message}`);
      }
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));
  check(bad.length === 0, `all remote logos load (${bad.length} failed)`);
  bad.forEach((b) => console.log(`      ${b}`));
  if (bad.length) console.log("      Remove or fix these entries in src/data/logoDatabase.js, or download local copies.");
  const healthy = logoDatabase.length - bad.length;
  check(healthy >= 100, `${healthy} working logos remain (need >= 100)`);
}

console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);