import fs from "fs";
import path from "path";

const [rules, updates] = fs
  .readFileSync(path.join(__dirname, "./data/day5.txt"))
  .toString()
  .split("\n\n");

const rulesMap = rules.split("\n").reduce((acc, rule) => {
  const [x, y] = rule.split("|");
  if (!acc[x]) acc[x] = new Set();
  acc[x].add(y);
  return acc;
}, {} as Record<string, Set<string>>);

function isValidUpdate(pages: string[]): boolean {
  const seen: string[] = [];
  for (const page of pages) {
    const rules = rulesMap[page];
    if (seen.some((s) => rules.has(s))) return false;
    seen.push(page);
  }
  return true;
}

function part1() {
  let sum = 0;
  for (const update of updates.split("\n")) {
    const pages = update.split(",");

    if (isValidUpdate(pages)) {
      sum += parseInt(pages[Math.floor(pages.length / 2)]);
    }
  }
  console.log("Part1:", sum);
}

function fixPageOrder(pages: string[]): string[] {
  const seen: string[] = [];
  for (const [i, page] of pages.entries()) {
    const rules = rulesMap[page];
    for (const seenPage of seen) {
      if (rules.has(seenPage)) {
        const update: string[] = [...pages];
        update[i - 1] = page;
        update[i] = seen.slice(-1)[0];
        // Check again with offending page shifted one position to the left
        return fixPageOrder(update);
      }
    }
    seen.push(page);
  }
  return seen;
}

function part2() {
  let sum = 0;
  for (const update of updates.split("\n")) {
    const pages = update.split(",");

    if (!isValidUpdate(pages)) {
      const updatedPages = fixPageOrder(pages);
      sum += parseInt(updatedPages[Math.floor(updatedPages.length / 2)]);
    }
  }
  console.log("Part2:", sum);
}

part1();
part2();
