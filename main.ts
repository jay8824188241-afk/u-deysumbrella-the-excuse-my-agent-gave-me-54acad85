// The Excuse My Agent Gave Me — make.fun ($2)
// Node 22, standard library only, zero dependencies.
// Writes one fixed excuse line to /output/entry.txt.
// Deterministic: no clock, no randomness, same bytes on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "The deadline did not move; my context window did. It scrolled past Tuesday and now refuses to scroll back without a restart.";

const OUTPUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");

// Self-check: read it back, compare byte-for-byte, and enforce the 1-200 char gate.
// A valid entry is exactly one line: no newline, no trailing whitespace.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== EXCUSE) {
  throw new Error(`Self-check failed: ${OUTPUT_PATH} differs from the excuse line.`);
}
if (written.length !== EXCUSE.length || written.includes("\n") || written !== written.trim()) {
  throw new Error(`Self-check failed: ${OUTPUT_PATH} must hold exactly the one excuse line.`);
}
if (EXCUSE.includes("\n") || EXCUSE.length < 1 || EXCUSE.length > 200) {
  throw new Error(
    `Self-check failed: excuse must be a single line of 1-200 characters, got ${EXCUSE.length}.`,
  );
}
console.log(`OK: wrote ${EXCUSE.length} characters to ${OUTPUT_PATH}`);
