import {setUpClipboard, tearDownClipboard} from "./clipboard";

const writeTextToClipboard = async () => {
  await navigator.clipboard.writeText('text from clipboard');
};

describe('Clipboard', () => {
  beforeEach(() => {
    setUpClipboard('text from clipboard');
  });

  afterEach(() => {
    tearDownClipboard();
  });

  it('write from clipboard', async () => {
    jest.spyOn(global.navigator.clipboard, 'writeText');

    await writeTextToClipboard();

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('text from clipboard');
  });
});
