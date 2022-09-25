import { Blob } from 'buffer';
import {setUpClipboard, tearDownClipboard} from "./clipboard";

const writeTextToClipboard = async (writeToClipboard: string) => {
  return await navigator.clipboard.writeText(writeToClipboard);
};

const writeToClipboard = async (text: string) => {
  const myBlob = new Blob([text], { type: 'text/plain' })
  const clipboardItem = {
    'text/plain': myBlob,
  };

  // @ts-ignore
  return navigator.clipboard.write([ clipboardItem ]);
};

const readFromClipBoard = async(): Promise<ClipboardItems> => {
  return navigator.clipboard.read();
}

const readTextFromClipBoard = async () => {
  return await navigator.clipboard.readText()
}

describe('Clipboard', () => {
  beforeEach(() => {
    setUpClipboard();
  });

  afterEach(() => {
    tearDownClipboard();
  });

  it('by default reads from the setup', async () => {
    const readFromClipboard = await readTextFromClipBoard()

    expect(readFromClipboard).toBe('')
  });

  it('write to clipboard (writeText)', async () => {
    await writeTextToClipboard('another text');

    const readFromClipboard = await readTextFromClipBoard()

    expect(readFromClipboard).toBe('another text')
  });

  it('write to clipboard (write)', async () => {
    await writeToClipboard('this is a blob');

    const items = await readFromClipBoard();
    const type1 = await items[0].getType('text/plain');

    expect((await type1.text())).toBe('this is a blob')
  });

  it('should read from clipboard (read)', async () => {
    await writeTextToClipboard('text from clipboard')
    const readFromClipboard = await readFromClipBoard()

    const actual = await readFromClipboard[0].getType("text/plain");
    expect(await actual.text()).toBe('text from clipboard');
  })

  it('should read from clipboard (readText)', async () => {
    await writeTextToClipboard('text from clipboard')
    const readFromClipboard = await readTextFromClipBoard()

    expect(readFromClipboard).toBe('text from clipboard');
  })
});
