# jest-clipboard

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c5447940689d43dabf57dad7c4d031df)](https://www.codacy.com/gh/marabesi/jest-clipboard/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marabesi/jest-clipboard&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/marabesi/jest-clipboard/badge.svg?branch=main)](https://coveralls.io/github/marabesi/jest-clipboard?branch=main)

jest-clipboard provides a easy way to test code against the [clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

## Usage

```typescript
// your implementation  
import {readTextFromClipboard} from "jest-clipboard";

const thisFunctionWritesToClipboard = async () => {
    await navigator.clipboard.writeText('text from clipboard');
};

// your implementation to read from the clipboard
const thisFunctionReadContentFromClipboard = async (): Promise<ClipboardItems> => {
    return navigator.clipboard.read();
}

describe('Clipboard', () => {
    beforeEach(() => {
        setUpClipboard();
    });

    afterEach(() => {
        tearDownClipboard();
    });

    it('should use text from clipboard', async () => {
        await writeTextToClipboard('I want this to be in the transfer area');

        expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('text from clipboard');
        // or
        expect(await readTextFromClipboard()).toEqual('I want this to be in the transfer area');
    });
});
```

## Projects using jest-clipboard

- [json-tool](https://github.com/marabesi/json-tool) uses jest-clipboard to setup a scenario for tests [have a look at this file](https://github.com/marabesi/json-tool/blob/5c21086602c2fa8160a4a5d2962455fddb0a39bc/src/__test__/Clipboard.test.tsx)

## Further reading

- [Unblocking clipboard access](https://web.dev/async-clipboard)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
