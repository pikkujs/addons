# @pikku/addon-execution

## 0.2.0

### Minor Changes

- 99d7625: New `@pikku/addon-execution` addon — run shell commands and spawn processes from
  a workflow. Dependency-free (built on Node's `child_process`).

  - `execution:execute` — run a shell command string, capturing `stdout`,
    `stderr`, and `exitCode` (with optional `cwd` / `timeout`).
  - `execution:spawnCommand` — spawn a program with an argument array and no shell
    (injection-proof), same captured output.

  Neither throws on a non-zero exit — the exit code is returned for the caller to
  handle.
