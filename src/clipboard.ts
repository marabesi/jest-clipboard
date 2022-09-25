import { Blob } from 'buffer';

export function setUpClipboard(text: string) {
  Object.assign(global.navigator,
    {
      clipboard: {
        async write(): Promise<void> {
          return Promise.resolve()
        },
        async writeText(text: string) {
          return text;
        },
        async read() {
          const blob = new Blob([text], { type: 'text/plain' });

          return Promise.resolve([
            {
              [blob.type]: blob,
              types: [ blob.type ],
              getType: () => blob
            }
          ]);
        },
        async readText(): Promise<string> {
          return Promise.resolve(text)
        },
      },
    });
}

export function tearDownClipboard() {
  Object.assign(global.navigator, {
    clipboard: null
  });
}
