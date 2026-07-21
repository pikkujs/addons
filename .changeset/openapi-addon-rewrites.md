---
'@pikku/addon-github': patch
'@pikku/addon-gitlab': patch
'@pikku/addon-quickchart': patch
'@pikku/addon-slack': patch
---

Replace the handcrafted implementations with OpenAPI-generated ones, widening
coverage to the full upstream API surface. These supersede the versions removed
in ee82d82 and pick up from the 0.1.1 already on npm.
