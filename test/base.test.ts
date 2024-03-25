import { readFileSync } from 'fs';
import { ESLint } from 'eslint';
import * as config from '../index';

function isObject(obj: unknown) {
  return typeof obj === 'object' && obj !== null;
}

const cli = new ESLint({
  useEslintrc: false,
  overrideConfigFile: '.eslintrc.json',
});

const rightSample = readFileSync('example/something-right.ts', 'utf-8');
const wrongSample = readFileSync('example/something-wrong.ts', 'utf-8');

describe('test base of settings', () => {
  test('is a valid object', () => {
    expect(Array.isArray(config.extends)).toBe(true);
    expect(Array.isArray(config.plugins)).toBe(true);
    expect(isObject(config.env)).toBe(true);
    expect(isObject(config.rules)).toBe(true);
  });
});

describe('loading config in eslint', () => {
  test('returns errors & warning', async () => {
    const expectedErrors = 6;
    const expectedWarns = 2;
    const executed = await cli.lintText(wrongSample);

    expect(executed[0].errorCount).toBe(expectedErrors);
    expect(executed[0].warningCount).toBe(expectedWarns);
  });

  test('returns no error & no warning', async () => {
    const noError = 0;
    const executed = await cli.lintText(rightSample);

    expect(executed[0].errorCount).toBe(noError);
    expect(executed[0].warningCount).toBe(noError);
  });
});
