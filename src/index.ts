export * from './utils';
import { AnswerRequest, ClassificationRequest, CompletionRequest, EngineId, SearchRequest } from './typings';

// in case this is not the web import fetch
import fetch from 'node-fetch';

export class Chronology {
	hello = 'world';
	apiKey: string;

	constructor(apiKey: string) {
		// console.log('Chronolgy constructed');
		this.apiKey = apiKey;
	}

	async listEngines(): Promise<any> {
		return await fetch('https://api.openai.com/v1/engines', {
			headers: {
				Authorization: `Bearer ${this.apiKey}`
			}
		});
	}

	async retrieveEngine(engineId: EngineId): Promise<any> {
		return await fetch(`https://api.openai.com/v1/engines/${engineId}`, {
			headers: {
				Authorization: `Bearer ${this.apiKey}`
			}
		});
	}

	async createCompletion(engineId: EngineId, options: CompletionRequest): Promise<any> {
		return await fetch(`https://api.openai.com/v1/engines/${engineId}/completions`, {
			body: JSON.stringify(options),
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
	}

	// TODO: https://beta.openai.com/docs/api-reference/completions/create-via-get
	async createCompletionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any> {
		console.log('TODO');
		return;
	}

	async createSearch(engineId: EngineId, options: SearchRequest): Promise<any> {
		return await fetch(`https://api.openai.com/v1/engines/${engineId}/search`, {
			body: JSON.stringify(options),
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
	}

	async createClassification(engineId: EngineId, options: ClassificationRequest): Promise<any> {
		const bod = {
			model: engineId,
			...options
		};
		return await fetch('https://api.openai.com/v1/classifications', {
			body: JSON.stringify(bod),
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
	}

	// async createAnswer(engineId: EngineId, options: Partial<AnswerRequest>): Promise<any> {
	// 	const bod = {
	// 		model: engineId,
	// 		...options
	// 	} as AnswerRequest;
	async createAnswer(engineId: EngineId, options: AnswerRequest): Promise<any> {
		const bod = {
			model: engineId,
			...options
		};
		return await fetch('https://api.openai.com/v1/answers', {
			body: JSON.stringify(bod),
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
	}

	// TODO files
	// https://beta.openai.com/docs/api-reference/files/list
}
export default Chronology;
