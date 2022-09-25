import {setUpClipboard, tearDownClipboard} from "./clipboard";

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

  it('write from clipboard', async () => {
    jest.spyOn(global.navigator.clipboard, 'writeText');

    await writeToClipboard();

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('text from clipboard');
  });
});
