const x1f = /u001f/;

// eslint-disable-next-line no-console
console.log(x1f);

export const myname = 'emochan';

const barVal = 1;

export enum Foo {
  bar = barVal,
}

export const obj = { myname };

export function createFuture(x: string): string {
  return `is ${x}`;
}
