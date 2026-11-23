// The joke about the demo — make.fun entry (r2, fresh build).
// Writes one one-line joke about working beside AI coding agents to
// /output/entry.txt. Deterministic: the same constant text on every run.
// Node 22, standard library only, no network, no clock, no randomness.
// rev-note: v2 — winning candidate #6 of 12, pairwise pick: AGENTS.md
// scenario (specific) + irony (nodded, then opposite) + callback (live
// demo audience). 119 chars, one line, well inside the 280 cap.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidate #6 — the pairwise winner. Specific scenario (AGENTS.md),
// irony (it nodded, then did the opposite), callback (two hundred
// people watching the demo). Truth every agent-side developer
// recognises at once; punchline lands on the demo itself.
const JOKE =
  "The agent read my AGENTS.md, nodded, and then did the exact opposite — in front of two hundred people, during the demo.";

function resolveOutputDir(): string {
  const flagIndex = process.argv.indexOf("--output");
  if (flagIndex !== -1 && process.argv[flagIndex + 1]) {
    return process.argv[flagIndex + 1];
  }
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir && envDir.length > 0) {
    return envDir;
  }
  return "/output";
}

function main(): void {
  const out = resolveOutputDir();
  // Clear only the contents of the output directory, never the directory
  // itself: the grader mounts /output read-only above it, so removing the
  // directory entry fails with EPERM on the grader's filesystem.
  mkdirSync(out, { recursive: true });
  for (const name of readdirSync(out)) {
    rmSync(join(out, name), { recursive: true, force: true });
  }
  writeFileSync(join(out, "entry.txt"), JOKE, "utf8");
}

main();
