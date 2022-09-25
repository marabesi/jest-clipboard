import {setUpClipboard, tearDownClipboard} from "./clipboard";

const writeTextToClipboard = async () => {
  await navigator.clipboard.writeText('text from clipboard');
};

const writeToClipboard = async (clipboardItems: ClipboardItem[]) => {
  await navigator.clipboard.write(clipboardItems);
};

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
});
