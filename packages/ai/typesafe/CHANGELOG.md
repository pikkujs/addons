# @pikku/addon-typesafe

## 0.2.1

### Patch Changes

- f406207: Bump @pikku/cli to 0.12.189, @pikku/core to 0.12.142 and @pikku/kysely to 0.13.37.

## 0.2.0

### Minor Changes

- 614dede: Add `@pikku/addon-typesafe`: TypeSafe System One as an addon, so calibrated
  judgments are available to any project as a workflow node or a `ref()` rather
  than as a service each app wires itself.
  
  `classifyTask` answers the two questions asked at the top of a piece of work —
  whether it is worth planning, and whether to build it as a function, a workflow
  or an agent — in one request. `ask` is the unopinionated door for everything
  else.
