# @pikku/addon-math

## 0.2.0

### Minor Changes

- 99d7625: New `@pikku/addon-math` addon — evaluate mathematical expressions, take symbolic
  derivatives, and simplify algebraically, powered by [mathjs](https://mathjs.org).
  No external services.

  - `math:evaluate` — evaluate an expression covering arithmetic, trigonometry,
    units, and functions, with an optional named-variable `scope`.
  - `math:derivative` — take the symbolic derivative of an expression w.r.t. a
    variable.
  - `math:simplify` — algebraically simplify an expression.

  `math:evaluate` is the runnable target for n8n's LangChain Calculator tool.
