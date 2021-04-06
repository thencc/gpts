/*
	demo:
	install `ts-node` and run `ts-node index.ts` or built this file and run in js
*/

// import lib
import { inject, search } from '../src';

import * as fs from 'fs'; // needs "@types/node": "^14.14.37",
import * as path from 'path';

// playground
const f = fs.readFileSync(path.join(__dirname, '../demo/prompts/artist.txt'), 'utf8');
// console.log('f', f);
let f2 = inject(f, '123', '456');
console.log('f2', f2);


search();
