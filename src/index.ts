// utils
import { inject } from './utils';


let qwe = 'test {0} {1} and then some more'
qwe = inject(qwe, '123', '456');
console.log('qwe', qwe);
