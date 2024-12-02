import fs from "fs";
import path from "path";

const data = fs
    .readFileSync(path.join(__dirname, "./data/day2.txt"))
    .toString();

const reports = data.split("\n");

function isSafe(levels: string[]): boolean {
    let last: null | number = null;
    let isDescending: null | boolean = null;
    for (const level of levels) {
        const parsedLevel = parseInt(level);
        if (last === null) {
            last = parsedLevel;
            continue;
        };
        if (last > parsedLevel) {
            if (isDescending !== null && !isDescending) {
                return false;
            }
            isDescending = true;
        } else if (last < parsedLevel) {
            if (isDescending !== null && isDescending) {

                return false;
            }
            isDescending = false;
        }

        const delta = Math.abs(parsedLevel - last);
        if (!delta || delta > 3) {
            return false;
        }
        last = parsedLevel;
    }
    return true;
}

function part1() {
    let numSafe = 0;

    for (const report of reports) {
        const levels = report.split(" ");
        if (isSafe(levels)) numSafe++;
    }

    console.log(numSafe);
}

function part2() {
    let numSafe = 0;

    for (const report of reports) {
        const levels = report.split(" ");
        if (isSafe(levels)) {
            numSafe++;
            continue;
        } else {
            for (let i = 0; i < levels.length; i++) {
                const withDampener = [...levels];
                withDampener.splice(i, 1);
                if (isSafe(withDampener)) {
                    numSafe++;
                    break;
                }
            }
        };
    }

    console.log(numSafe);

}

// part1();
part2();
