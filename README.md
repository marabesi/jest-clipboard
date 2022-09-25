# jest-clipboard

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c5447940689d43dabf57dad7c4d031df)](https://www.codacy.com/gh/marabesi/jest-clipboard/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marabesi/jest-clipboard&amp;utm_campaign=Badge_Grade)

jest-clipboard provides a easy way to test code against the [clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API￧).

## Usage

```typescript
// your implementation  
import {readTextFromClipboard} from "./clipboard";

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

## Limitation

Currently the supported methods from the clipboard api are related to the text mode only.

## Further reading

- [Unblocking clipboard access](https://web.dev/async-clipboard)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
