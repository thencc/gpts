/*
	demo:
	install `ts-node` and run `ts-node index.ts` or built this file and run js w node
*/

import { GpTs } from '../src';

(async () => {
	const openai_apiKey = '';

	const c = new GpTs(openai_apiKey);
	// console.log('c', c);

	// try {
	// 	// const s = await c.listEngines();
	// 	const s = await c.retrieveEngine('ada');
	// 	console.log('s:', s);
	// } catch (e) {
	// 	console.log('err:', e);
	// }

	// const s = await c.createCompletion('ada', {
	// 	prompt: 'whats for lunch?'
	// });

	// const s = await c.createSearch('ada', {
	// 	documents: ['mango', 'apple', 'pear'],
	// 	query: 'sweetest'
	// });

	// const s = await c.createClassification('ada', {
	// 	'examples': [
	// 		['A happy moment', 'Positive'],
	// 		['I am sad.', 'Negative'],
	// 		['I am feeling awesome', 'Positive']
	// 	],
	// 	query: 'It is a raining day: (',
	// });

	const s = await c.createAnswer('ada', {
		'examples': [
			['A happy moment', 'Positive'],
			['I am sad.', 'Negative'],
			['I am feeling awesome', 'Positive']
		],
		question: 'What is the meaning of life?',
		'examples_context': 'In 2017, U.S. life expectancy was 78.6 years.',
		'documents': ['Puppy A is happy.', 'Puppy B is sad.'],
	});

	console.log('s', s);

})();
