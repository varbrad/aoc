# AoC Super-Repo

Repository of AoC solutions written in TypeScript

I am using this as a base for the 2019 edition of Advent of Code, but am also going back to previous years and solving problems I didn't solve before (either because I was too dumb or just never got round to it).

### Rules

I've applied some self-imposed rules upon myself.

- A single test file cannot take more than 1 minute to run on my machine. If that happens, I am deeming my solution too inefficient.
- Must pass linting and cyclomatic complexity rules.
- Try and make code as TS friendly as possible.

### Running Solutions

All solutions are written in the relevant `src/YEAR/dayX/solution.ts` file.
As for the test cases, they can be run by doing something like `npm run test YEAR/dayX`.
