import { argv } from 'bun';

export const verboseLog = <const T extends readonly unknown[]>(...args: T) => {
  if (argv.includes('--verbose')) {
    console.log(...args);
  }
};
