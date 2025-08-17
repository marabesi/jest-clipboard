# Contributing to jest-clipboard

Thank you for your interest in improving jest-clipboard! This guide helps you get set up, make changes confidently, and
open a pull request (PR) that we can review quickly. New contributors and experienced maintainers are equally welcome.

## Ways to contribute

- Fix bugs or edge cases
- Improve docs (README, examples, this guide)
- Add or refine tests
- Tackle open issues or propose enhancements

If you’re unsure where to start, open an issue to discuss your idea first.

## Getting started

1. Fork the repository on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/jest-clipboard.git
   cd jest-clipboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feat/your-short-description
   ```

## Development workflow

- Build (if applicable):
  ```bash
  npm run build
  ```
- Lint:
  ```bash
  npm run lint
  ```
- Test (single run):
  ```bash
  npm test
  ```
- Coverage (optional, helpful before a PR):
  ```bash
  npm run coverage
  ```

Notes:
- The project uses Jest (with jsdom) and TypeScript. If TypeScript shows DOM type errors, ensure your editor/tsconfig includes the "dom" lib.
- Keep your changes small and focused. Make separate PRs for unrelated changes.

## Writing and updating tests

- Add or update tests for any behavior you change.
- Prefer clear, intention-revealing test names and assertions.
- Ensure tests pass locally before you push.

## Coding standards

- Keep code simple and readable.
- Run the linter and fix warnings:
  ```bash
  npm run lint
  ```
- If you add public APIs or change behavior, update the README accordingly.

## Commit messages

Use concise, descriptive messages. Conventional Commits are welcome but not required:
- feat: add new helper to reset clipboard
- fix: handle undefined navigator.clipboard in setup
- docs: clarify jsdom requirement
- test: add coverage for readTextFromClipboard

## Opening a Pull Request

1. Push your branch to your fork:
   ```bash
   git push -u origin feat/your-short-description
   ```
2. Open a PR from your branch to the main repository’s `main` branch.
3. In the PR description, include:
    - What problem it solves and how
    - Any trade-offs
    - Instructions to test the change (if not obvious)
4. Ensure:
    - All checks pass (lint, tests)
    - Coverage does not drop significantly (CI will report coverage)

We’ll review your PR, suggest changes if needed, and merge when it’s ready. Thank you!

## Issue reports and feature requests

- Use the issue tracker to report bugs or request features.
- Include steps to reproduce, expected vs. actual behavior, and environment details.
- For features, explain the use case and proposed API changes.

## Troubleshooting

- Tests fail with “navigator.clipboard is undefined”:
    - Ensure tests run in a DOM-like environment (jsdom).
    - Confirm clipboard setup helpers are called where needed.
- Type errors referencing DOM types:
    - Include "dom" in your TypeScript configuration’s lib settings.
- Lint errors:
    - Run `npm run lint` and apply suggested fixes.
    - Fixes auto-fixable problems `npm run lint -- --fix`.

## Community and conduct

Be respectful and constructive. We value inclusive collaboration. If something is unclear, ask questions—maintainers are happy to help.

## License

By contributing, you agree that your contributions will be licensed under the project’s