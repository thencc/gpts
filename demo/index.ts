/*
	demo:
	install `ts-node` and run `ts-node index.ts` or built this file and run js w node
*/

import { GpTs } from '../src';

(async () => {
	const openai_apiKey = '';

	const c = new GpTs(openai_apiKey);
	// console.log('c', c);

	try {
		// const s = await c.listEngines();

		// const s = await c.retrieveEngine('ada');

		// const s = await c.completion({
		// 	engineId: 'ada',
		// 	prompt: 'whats for lunch?'
		// });

		// hmmm, an empty prompt completion why not
		// const s = await c.completion({
		// 	engineId: 'ada'
		// });

		// const s = await c.search({
		// 	engineId: 'ada',
		// 	documents: ['mango', 'apple', 'pear'],
		// 	query: 'sweetest'
		// });

		// const s = await c.classification({
		// 	engineId: 'ada',
		// 	examples: [
		// 		['A happy moment', 'Positive'],
		// 		['I am sad.', 'Negative'],
		// 		['I am feeling awesome', 'Positive']
		// 	],
		// 	query: 'It is a raining day: (',
		// });

		const s = await c.answer({
			engineId: 'ada',
			examples: [
				['A happy moment', 'Positive'],
				['I am sad.', 'Negative'],
				['I am feeling awesome', 'Positive']
			],
			question: 'What is the meaning of life?',
			examples_context: 'In 2017, U.S. life expectancy was 78.6 years.',
			documents: ['Puppy A is happy.', 'Puppy B is sad.'],
			// file: 'test'
		});

		console.log('s:', s);
	} catch (e) {
		console.log('err:', e);
	}
})();
