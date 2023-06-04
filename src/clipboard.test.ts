import 'blob-polyfill';

import {
  readFromClipboard,
  readTextFromClipboard,
  setUpClipboard,
  tearDownClipboard, writeItemsToClipboard,
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

  it('write text to clipboard with write method', async () => {
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
  });

  it('should read from clipboard (readText)', async () => {
    await writeTextToClipboard('text from clipboard')
    const readFromClipboard = await readTextFromClipboard()

    expect(readFromClipboard).toBe('text from clipboard');
  });

  describe('write', () => {
    it('should write image to clipboard', async () => {
      const imagePng = 'image/png';
      const base64Image ='iVBORw0KGgoAAAANSUhEUgAAAEYAAABACAIAAAAoFZbOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaElEQVRoge3PQQ3AIADAQMAQD4J/azOxZOlyp6Cd+9zxL+vrgPdZKrBUYKnAUoGlAksFlgosFVgqsFRgqcBSgaUCSwWWCiwVWCqwVGCpwFKBpQJLBZYKLBVYKrBUYKnAUoGlAksFlgoeg2ABFxfCv1QAAAAASUVORK5CYII='
      const buffer = Buffer.from(base64Image, 'base64');
      const blob = new Blob([buffer]);

      const clipboardItem: ClipboardItem = {
        types: [imagePng],
        getType(type: string): Promise<Blob> {
          return new Promise((resolve) => {
            resolve(blob)
          });
        }
      };

      const clipboardItems: ClipboardItems = [clipboardItem]
      await writeItemsToClipboard(clipboardItems);

      const items = await readFromClipboard();

      const type1 = await items[0].getType(imagePng);

      expect(type1.size).toBe(182);
    });
  });
});
