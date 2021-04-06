export * from './utils';

// in case this is not the web import fetch
import fetch from 'node-fetch';

export class Chronology {
	hello = 'world';
	apiKey: string;

	constructor(apiKey: string) {
		// console.log('Chronolgy constructed');
		this.apiKey = apiKey;
	}

	func(): void {
		console.log('func');
	}

	async search(): Promise<any> {
		console.log('search started');

		// intro
		// const res = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
		return await fetch('https://api.openai.com/v1/engines/davinci/completions', {
			body: '{"prompt": "This is a test", "max_tokens": 5}',
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});

		// console.log('res', res);

	}
}
export default Chronology;
