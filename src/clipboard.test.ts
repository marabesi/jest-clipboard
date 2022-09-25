import {
  readFromClipboard,
  readTextFromClipboard,
  setUpClipboard,
  tearDownClipboard,
  writeTextToClipboard,
  writeToClipboard
} from './clipboard';

describe('Clipboard', () => {
  beforeEach(() => {
    setUpClipboard();
  });

  afterEach(() => {
    tearDownClipboard();
  });

  it('by default reads from the setup', async () => {
    const readFromClipboard = await readTextFromClipboard()

    expect(readFromClipboard).toBe('')
  });

  it('write to clipboard (writeText)', async () => {
    await writeTextToClipboard('another text');

    const readFromClipboard = await readTextFromClipboard()

    expect(readFromClipboard).toBe('another text')
  });

  it('write to clipboard (write)', async () => {
    await writeToClipboard('this is a blob');

    const items = await readFromClipboard();
    const type1 = await items[0].getType('text/plain');

    expect((await type1.text())).toBe('this is a blob')
  });

  it('should read from clipboard (read)', async () => {
    await writeTextToClipboard('text from clipboard')
    const fromClipboard = await readFromClipboard()

    const actual = await fromClipboard[0].getType("text/plain");
    expect(await actual.text()).toBe('text from clipboard');
  })

  it('should read from clipboard (readText)', async () => {
    await writeTextToClipboard('text from clipboard')
    const readFromClipboard = await readTextFromClipboard()

    expect(readFromClipboard).toBe('text from clipboard');
  })
});
