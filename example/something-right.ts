const x1f = /u001f/;

console.log(x1f);

export const myname = 'emochan';

const barVal = 1;

export enum Foo {
  bar = barVal,
}

export const obj = {
  myname: myname,
};

export function createFuture(x: string): string {
  return `is ${x}`;
}
