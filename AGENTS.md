# Repository guidance

This repository contains a small customer-support inbox built with Next.js,
React, TypeScript, and Tailwind CSS.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
```

Run `npm run check` before committing.

## Product constraints

- Keep the interface calm, compact, and immediately understandable.
- Use plain product language. Avoid promotional copy, gradients, decorative
  illustrations, and eyebrow text.
- Preserve the static-export build. Do not add a server, database, external
  service, or secret without an explicit requirement.
- Keep interactions accessible by keyboard and expose state through semantic
  HTML and ARIA attributes where needed.
- Add or update tests for user-visible behavior.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
