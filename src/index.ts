// utils
import { inject } from './utils';


// let qwe = 'test {0} {1} and then some more';
// qwe = inject(qwe, '123', '456');
// console.log('qwe', qwe);

// needs "@types/node": "^14.14.37",
import * as fs from 'fs';
import * as path from 'path';

const f = fs.readFileSync(path.join(__dirname, '../demo/prompts/artist.txt'), 'utf8');
// console.log('f', f);
let f2 = inject(f, '123', '456');
console.log('f2', f2);
