# jest-clipboard

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c5447940689d43dabf57dad7c4d031df)](https://www.codacy.com/gh/marabesi/jest-clipboard/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marabesi/jest-clipboard&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/marabesi/jest-clipboard/badge.svg?branch=main)](https://coveralls.io/github/marabesi/jest-clipboard?branch=main)

jest-clipboard provides an easy, reliable way to test code that uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) in Jest.

## Why this library exists

Testing clipboard interactions is tricky because:
- The Clipboard API is not available in Node by default (the environment Jest runs in).
- Hand-rolling mocks for `navigator.clipboard` is repetitive and error-prone.
- You want confidence that your app reads and writes clipboard content the way browsers do.

jest-clipboard offers tiny, focused helpers that set up a realistic clipboard mock for your tests, so you can write clear, intention-revealing assertions without boilerplate.

## Installation

Using npm:

```bash
npm install --save-dev jest-clipboard
```
Requirements:
- Jest (with the jsdom test environment recommended)
- TypeScript or JavaScript projects are both supported

Ensure your Jest environment is set to jsdom (or similar DOM-like env):
```ts
// jest.config.ts
import type {Config} from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  // Optional but recommended to avoid repeating setup in every test file:
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
```
Optional global setup file:
```ts
// jest.setup.ts
import { setUpClipboard, tearDownClipboard } from 'jest-clipboard';

beforeEach(() => setUpClipboard());
afterEach(() => tearDownClipboard());
```

## Quick start

- If you use a global setup file (recommended), you can write tests straight away:
- 
```typescript
import { writeTextToClipboard, readTextFromClipboard } from 'jest-clipboard';

it('reads and writes clipboard text', async () => {
  await writeTextToClipboard('Hello clipboard!');
  await expect(readTextFromClipboard()).resolves.toBe('Hello clipboard!');
});
```
- If you prefer per-test setup, call the helpers inside your test file:
- 
```typescript
import { setUpClipboard, tearDownClipboard, writeTextToClipboard, readTextFromClipboard } from 'jest-clipboard';

describe('Clipboard', () => {
  beforeEach(() => setUpClipboard());
  afterEach(() => tearDownClipboard());

  it('uses text from clipboard', async () => {
    await writeTextToClipboard('I want this to be in the transfer area');

    // Your app code might call navigator.clipboard.writeText('text from clipboard')
    // You can still assert against the clipboard content directly:
    await expect(readTextFromClipboard()).resolves.toEqual(
      'I want this to be in the transfer area'
    );
  });
});
```
## API

- `setUpClipboard()`: Installs a mock `navigator.clipboard` with read/write support. Call before tests that need the clipboard.
- `tearDownClipboard()`: Restores the previous clipboard state. Call after tests to avoid cross-test leaks.
- `writeTextToClipboard(text: string)`: Programmatically writes text into the mocked clipboard.
- `readTextFromClipboard(): Promise<string>`: Reads text from the mocked clipboard (mirrors the async Clipboard API).

Tip: You can still spy on `navigator.clipboard.writeText` or `readText` if you want to make call-based assertions in addition to state-based checks.

## Example

```typescript
import { setUpClipboard, tearDownClipboard, writeTextToClipboard, readTextFromClipboard } from 'jest-clipboard';

describe('copy feature', () => {
  beforeEach(() => setUpClipboard());
  afterEach(() => tearDownClipboard());

  it('copies selected content', async () => {
    // simulate your app copying content
    await writeTextToClipboard('Copied!');

    // assert the resulting clipboard content
    await expect(readTextFromClipboard()).resolves.toBe('Copied!');
  });
});
```
## Troubleshooting

- navigator.clipboard is undefined
  - Ensure Jest uses a DOM-like environment:
    - In your Jest config: `testEnvironment: 'jsdom'`.
  - Verify `setUpClipboard()` is called before your test (either via a global setup file or in `beforeEach`).

- My tests pass locally but fail in CI
  - Confirm your CI uses the same Jest config and includes the setup file in `setupFilesAfterEnv`.
  - Make sure no test skips `tearDownClipboard()`; use `afterEach` to avoid cross-test contamination.

- TypeScript type errors for Clipboard types
  - Make sure your `tsconfig.json` includes `"dom"` in `compilerOptions.lib` so TS knows about Web APIs:
    ```json
    {
      "compilerOptions": {
        "lib": ["es2020", "dom"]
      }
    }
    ```

- Spies on navigator.clipboard.* never get called
  - If you’re spying directly on `navigator.clipboard.writeText`, ensure the spy is created after `setUpClipboard()` (because the clipboard is installed during setup).
  - Alternatively, assert via `readTextFromClipboard()` to check the resulting clipboard state.

- I need to reset clipboard between tests
  - Use `beforeEach(setUpClipboard)` and `afterEach(tearDownClipboard)`. Do not reuse state across tests.

## Projects using jest-clipboard

- [json-tool](https://github.com/marabesi/json-tool) uses jest-clipboard to set up clipboard scenarios for tests.

## Further reading

- [Unblocking clipboard access](https://web.dev/async-clipboard)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
