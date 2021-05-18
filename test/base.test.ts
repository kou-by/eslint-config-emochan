import { readFileSync } from 'fs';
import { CLIEngine } from 'eslint';
import * as config from '../index';

function isObject(obj: unknown) {
  return typeof obj === 'object' && obj !== null;
}

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: '.eslintrc.json',
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
  test('returns errors & warning', () => {
    const expectedErrors = 5;
    const expectedWarns = 4;
    const executed = cli.executeOnText(wrongSample);

    expect(executed.errorCount).toBe(expectedErrors);
    expect(executed.warningCount).toBe(expectedWarns);
  });

  test('returns no error & no warning', () => {
    const noError = 0;
    const executed = cli.executeOnText(rightSample);

    expect(executed.errorCount).toBe(noError);
    expect(executed.warningCount).toBe(noError);
  });
});
