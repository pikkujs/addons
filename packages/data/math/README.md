# @pikku/addon-math

Evaluate mathematical expressions, take symbolic derivatives, and simplify
algebraically — powered by [mathjs](https://mathjs.org). Covers arithmetic,
trigonometry, units, and calculus. No external services or API keys.

## Functions

| RPC                | Description                                                          |
| ------------------ | ------------------------------------------------------------------- |
| `math:evaluate`    | Evaluate an expression (arithmetic, trig, units, functions).        |
| `math:derivative`  | Take the symbolic derivative of an expression w.r.t. a variable.    |
| `math:simplify`    | Algebraically simplify an expression.                               |

`math:evaluate` is the drop-in replacement for n8n's LangChain **Calculator**
tool, and — being a full expression engine — also handles `cos(45 deg)`,
`12.7 cm to inch`, and named-variable scopes.

## Usage

```ts
import { wireAddon } from '#pikku'

wireAddon({ name: 'math', package: '@pikku/addon-math' })
```
