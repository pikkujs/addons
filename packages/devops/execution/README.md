# @pikku/addon-execution

Run shell commands and spawn processes from a Pikku workflow, capturing
`stdout`, `stderr`, and the process `exitCode`. Dependency-free — built on
Node's `child_process`.

## Functions

- **`execution:execute`** — run a shell command string (`exec`). Supports `cwd`
  and `timeout`. Returns `{ stdout, stderr, exitCode }`.
- **`execution:spawnCommand`** — spawn a program with an argument array and **no
  shell** (injection-proof). Supports `cwd` and `timeout`. Returns
  `{ stdout, stderr, exitCode }`.

Neither function throws on a non-zero exit — the exit code is returned so the
caller decides how to handle failure.
