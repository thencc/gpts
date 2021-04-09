export * from './utils';
export * from './typings'; // for use elswehere

import {
	AnswerRequest,
	AnswerResponse,
	ClassificationRequest,
	ClassificationResponse,
	CompletionRequest,
	CompletionResponse,
	EngineId,
	ListEnginesResponse,
	RetrieveEngineResponse,
	SearchRequest,
	SearchResponse
} from './typings';

// in case this is not the web import fetch
import fetch from 'node-fetch';

// consideration: should required params be part of method args so options is always optional? (like completion endpoint)

export class GpTs {
	// hello = 'world';
	apiKey: string;
	getHeaders = {
		Authorization: 'Bearer'
	};
	postHeaders = {
		Authorization: 'Bearer',
		'Content-Type': 'application/json'
	}

	constructor(apiKey: string) {
		// console.log('Chronolgy constructed');
		this.apiKey = apiKey;
		this.getHeaders.Authorization = `Bearer ${this.apiKey}`;
		this.postHeaders.Authorization = `Bearer ${this.apiKey}`;
	}

	async listEngines(): Promise<ListEnginesResponse> {
		const res = await fetch('https://api.openai.com/v1/engines', {
			headers: this.getHeaders
		});
		if (res.status == 401) {
			throw 'no api auth';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json: ListEnginesResponse = await res.json();
			return json;
		}
	}

	async retrieveEngine(engineId: EngineId): Promise<RetrieveEngineResponse> {
		const res = await fetch(`https://api.openai.com/v1/engines/${engineId}`, {
			headers: this.getHeaders
		});
		if (res.status == 401) {
			throw 'no api auth';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json: RetrieveEngineResponse = await res.json();
			return json;
		}
	}

	// the completion endpoint is unique in that the options arg is optional
	async createCompletion(engineId: EngineId, options?: CompletionRequest): Promise<CompletionResponse> {
		const res = await fetch(`https://api.openai.com/v1/engines/${engineId}/completions`, {
			body: JSON.stringify(options || {}),
			headers: this.postHeaders,
			method: 'POST'
		});
		if (res.status == 401) {
			throw 'no api auth';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json: CompletionResponse = await res.json();
			return json;
		}
	}

	// TODO: https://beta.openai.com/docs/api-reference/completions/create-via-get
	async createCompletionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any> {
		console.log('TODO');
		return;
	}

	async createSearch(engineId: EngineId, options: SearchRequest): Promise<SearchResponse> {
		const res = await fetch(`https://api.openai.com/v1/engines/${engineId}/search`, {
			body: JSON.stringify(options),
			headers: this.postHeaders,
			method: 'POST'
		});
		if (res.status == 401) {
			throw 'no api auth';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json: SearchResponse = await res.json();
			return json;
		}
	}

	async createClassification(engineId: EngineId, options: ClassificationRequest): Promise<ClassificationResponse> {
		const bod = {
			model: engineId,
			...options
		};
		const res = await fetch('https://api.openai.com/v1/classifications', {
			body: JSON.stringify(bod),
			headers: this.postHeaders,
			method: 'POST'
		});
		if (res.status == 401) {
			throw 'no api auth';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json: ClassificationResponse = await res.json();
			return json;
		}
	}

	// async createAnswer(engineId: EngineId, options: Partial<AnswerRequest>): Promise<any> {
	// 	const bod = {
	// 		model: engineId,
	// 		...options
	// 	} as AnswerRequest;
	async createAnswer(engineId: EngineId, options: AnswerRequest): Promise<AnswerResponse> {
		const bod = {
			model: engineId,
			...options
		};
		const res = await fetch('https://api.openai.com/v1/answers', {
			body: JSON.stringify(bod),
			headers: this.postHeaders,
			method: 'POST'
		});
		if (res.status == 401) {
			throw 'no api auth';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json: AnswerResponse = await res.json();
			return json;
		}
	}

	// TODO files
	// https://beta.openai.com/docs/api-reference/files/list
}
export default GpTs;
