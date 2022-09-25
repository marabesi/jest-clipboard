import {setUpClipboard, tearDownClipboard} from "./clipboard";

const writeTextToClipboard = async () => {
  await navigator.clipboard.writeText('text from clipboard');
};

const writeToClipboard = async (clipboardItems: ClipboardItem[]) => {
  await navigator.clipboard.write(clipboardItems);
};

const readFromClipBoard = async(): Promise<Blob[]> => {
  const clipboardItems = await navigator.clipboard.read();
  const readFromClipboard = []
  for (const clipboardItem of clipboardItems) {
    for (const type of clipboardItem.types) {
      const blob = await clipboardItem.getType(type);
      readFromClipboard.push(blob)
    }
  }
  return readFromClipboard
}

const readTextFromClipBoard = async () => {
  return await navigator.clipboard.readText()
}

describe('Clipboard', () => {
  beforeEach(() => {
    setUpClipboard('text from clipboard');
  });

  afterEach(() => {
    tearDownClipboard();
  });

  it('write to clipboard (writeText)', async () => {
    jest.spyOn(global.navigator.clipboard, 'writeText');

    await writeTextToClipboard();

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('text from clipboard');
  });

  it('write to clipboard (write)', async () => {
    jest.spyOn(global.navigator.clipboard, 'write');
    const myBlob = new Blob(['this is a blob'])
    const clipboardItem: ClipboardItem = {
      types: [myBlob.type],
      getType(type: string): Promise<Blob> {
        if (type == myBlob.type) {
          return Promise.resolve(myBlob)
        }
        throw Error('blob given does not match type')
      }
    };

    await writeToClipboard([
      clipboardItem
    ]);

    expect(global.navigator.clipboard.write).toHaveBeenCalledWith([clipboardItem]);
  });

  it('should read from clipboard (read)', async () => {
    const readFromClipboard = await readFromClipBoard()

    expect(await readFromClipboard[0].text()).toBe('text from clipboard');
  })

  it('should read from clipboard (readText)', async () => {
    const readFromClipboard = await readTextFromClipBoard()

    expect(readFromClipboard).toBe('text from clipboard');
  })
});
