import fs from 'fs';
import { toUpperSnakeCase } from '../../src/helpers/string';
import * as calls from '../../src/api';

const apiCallNames = Object.keys(calls).reduce((acc, name) => {
  const constantName = toUpperSnakeCase(name);
  acc[constantName] = name;
  return acc;
}, {});

console.log('Updating callNames from the keys at src/api');
let fileContents = `
${Object.keys(apiCallNames)
  .sort()
  .reduce(
    (acc, key) => `${acc}export const ${key} = '${apiCallNames[key]}';\n`,
    ''
  )}`;

console.log('Writing to file: src/api/callNames.js...');
fs.writeFile('./src/api/callNames.js', fileContents, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Saved new callNames on src/api/callNames.js');
  }
});
