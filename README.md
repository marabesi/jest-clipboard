# jest-clipboard

jest-clipboard provides a easy way to test code against the [clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API￧).

## Usage

```typescript
const writeToClipboard = async () => {
  await navigator.clipboard.writeText('text from clipboard');
};
  
describe('Clipboard', () => {
  beforeEach(() => {
    setUpClipboard('text from clipboard');
  });

  afterEach(() => {
    tearDownClipboard();
  });
  
  it('should use text from clipboard', async () => {
    jest.spyOn(global.navigator.clipboard, 'writeText');
    
    await writeToClipboard();

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('text from clipboard');
  });
});
```

## Further reading

- [Unblocking clipboard access](https://web.dev/async-clipboard)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
