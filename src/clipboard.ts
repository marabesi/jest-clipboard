import { Blob } from 'buffer';

export function setUpClipboard() {
  let clipboardItems = [new Blob([], { type: 'text/plain' })]
  Object.assign(global.navigator,
    {
      clipboard: {
        async write(data: ClipboardItems): Promise<void> {
          for (const clipboardItem of data) {
            for (const type in clipboardItem) {
              // @ts-ignore
              const clipboardItemElement: Blob = clipboardItem[type];
              clipboardItems = [clipboardItemElement]
            }
          }

          return Promise.resolve()
        },
        async writeText(text: string) {
          clipboardItems = [new Blob([text], { type: 'text/plain' })]
          return text;
        },
        async read() {
          return Promise.resolve([
            {
              [clipboardItems[0].type]: clipboardItems[0],
              types: [ clipboardItems[0].type ],
              getType: () => clipboardItems[0]
            }
          ]);
        },
        async readText(): Promise<string> {
          return Promise.resolve(
            clipboardItems[0].text()
          )
        },
      },
    });
}

export function tearDownClipboard() {
  Object.assign(global.navigator, {
    clipboard: null
  });
}
