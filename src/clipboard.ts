import 'blob-polyfill';

import { ClipboardItemJest } from './types';

class Clipboard {
  private clipboardItems: ClipboardItem[] = []

  async write(data: ClipboardItems): Promise<void> {
    for (const clipboardItem of data) {
      for (const type in clipboardItem) {
        this.clipboardItems = [clipboardItem]
      }
    }

    return Promise.resolve()
  }

  async writeText(text: string): Promise<string> {
    const clipboardItem: ClipboardItemJest = {
      presentationStyle: 'inline',
      types: ['text/plain'],
      getType(type: string): Promise<Blob> {
        return new Promise((resolve) => {
          resolve(new Blob([text], { type: 'text/plain' }))
        });
      }
    };
    this.clipboardItems = [clipboardItem];

    return text;
  }

  async read() {
    return Promise.resolve(this.clipboardItems);
  }

  async readText(): Promise<string> {
    if (this.clipboardItems.length === 0) {
      return Promise.resolve('')
    }

    const blob = await this.clipboardItems[0].getType('text/plain');
    return blob.text();
  }
}

const clipboard = new Clipboard();

export function setUpClipboard() {
  Object.assign(global.navigator,
    {
      clipboard,
    });
}

export function tearDownClipboard() {
  Object.assign(global.navigator, {
    clipboard: null
  });
}


export const writeTextToClipboard = async (writeToClipboard: string) => {
  await navigator.clipboard.writeText(writeToClipboard);
  await clipboard.writeText(writeToClipboard);
};

export const writeToClipboard = async (text: string) => {
  const a: ClipboardItemJest = {
    presentationStyle: 'inline',
    types: ['text/plain'],
    getType(type: string): Promise<Blob> {
      const myBlob = new Blob([text], { type: 'text/plain' })
      return Promise.resolve(myBlob);
    },
  };

  const data = [a];

  await clipboard.write(data);

  return navigator.clipboard.write(data);
};

export const writeItemsToClipboard = async (items: ClipboardItems) => {
  await clipboard.write(items);
  return navigator.clipboard.write(items);
};


export const readFromClipboard = async(): Promise<ClipboardItems> => {
  await navigator.clipboard.read();
  return clipboard.read();
}

export const readTextFromClipboard = async () => {
  await navigator.clipboard.readText()
  return clipboard.readText()
}
