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

// in case this is not the web, import fetch for node
import fetch from 'node-fetch';

export class GpTs {
	// hello = 'world';
	origin: string; // origin as var for if/when api changes
	apiKey: string;

	private headers = {
		get: {
			Authorization: 'Bearer'
		},
		post: {
			Authorization: 'Bearer',
			'Content-Type': 'application/json'
		}
	}

	constructor(apiKey: string, origin = 'https://api.openai.com/') {
		// console.log('GpTs constructed');
		this.origin = origin;
		this.setApiKey(apiKey);
	}

	private setApiKey(apiKey: string) {
		this.apiKey = apiKey;
		this.headers.get.Authorization = `Bearer ${this.apiKey}`;
		this.headers.post.Authorization = `Bearer ${this.apiKey}`;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private async request(endpoint: string, method: 'GET' | 'POST' = 'GET', reqOptions?: any): Promise<any> {
		const url = `${this.origin}${endpoint}`; // ex: https://api.openai.com/v1/engines
		const res = await fetch(url, {
			method: method,
			headers: method == 'GET' ? this.headers.get : this.headers.post,
			body: method == 'GET' ? null : JSON.stringify(reqOptions || {})
		});
		if (res.status == 401) {
			throw 'invalid api key';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json = await res.json();
			return json;
		}
	}

	async listEngines(): Promise<ListEnginesResponse> {
		// const res = await fetch('https://api.openai.com/v1/engines', {
		// 	headers: this.getHeaders
		// });
		// if (res.status == 401) {
		// 	throw 'no api auth';
		// } else if (res.status !== 200) {
		// 	throw 'request err';
		// } else {
		// 	const json: ListEnginesResponse = await res.json();
		// 	return json;
		// }
		//
		// const res: ListEnginesResponse = await this.request('v1/engines');
		// const res = <ListEnginesResponse>await this.request('v1/engines');
		// return res;
		//
		return await this.request('v1/engines') as ListEnginesResponse;
		// return <ListEnginesResponse>await this.request('v1/engines');
	}

	// async retrieveEngine(engineId: EngineId): Promise<RetrieveEngineResponse> {
	// 	const res = await fetch(`https://api.openai.com/v1/engines/${engineId}`, {
	// 		headers: this.getHeaders
	// 	});
	// 	if (res.status == 401) {
	// 		throw 'no api auth';
	// 	} else if (res.status !== 200) {
	// 		throw 'request err';
	// 	} else {
	// 		const json: RetrieveEngineResponse = await res.json();
	// 		return json;
	// 	}
	// }

	// the completion endpoint is unique in that the options arg is optional
	async createCompletion(
		engineId: EngineId,
		options?: CompletionRequest
	): Promise<CompletionResponse> {
		// const res = await fetch(`https://api.openai.com/v1/engines/${engineId}/completions`, {
		// 	body: JSON.stringify(options || {}),
		// 	headers: this.postHeaders,
		// 	method: 'POST'
		// });
		// if (res.status == 401) {
		// 	throw 'no api auth';
		// } else if (res.status !== 200) {
		// 	throw 'request err';
		// } else {
		// 	const json: CompletionResponse = await res.json();
		// 	return json;
		// }

		return await this.request(
			`v1/engines/${engineId}/completions`,
			'POST',
			options
		) as CompletionResponse;
	}

	// TODO: https://beta.openai.com/docs/api-reference/completions/create-via-get
	async createCompletionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any> {
		console.log('TODO');
		return;
	}

	// async createSearch(engineId: EngineId, options: SearchRequest): Promise<SearchResponse> {
	// 	const res = await fetch(`https://api.openai.com/v1/engines/${engineId}/search`, {
	// 		body: JSON.stringify(options),
	// 		headers: this.postHeaders,
	// 		method: 'POST'
	// 	});
	// 	if (res.status == 401) {
	// 		throw 'no api auth';
	// 	} else if (res.status !== 200) {
	// 		throw 'request err';
	// 	} else {
	// 		const json: SearchResponse = await res.json();
	// 		return json;
	// 	}
	// }

	// async createClassification(engineId: EngineId, options: ClassificationRequest): Promise<ClassificationResponse> {
	// 	const bod = {
	// 		model: engineId,
	// 		...options
	// 	};
	// 	const res = await fetch('https://api.openai.com/v1/classifications', {
	// 		body: JSON.stringify(bod),
	// 		headers: this.postHeaders,
	// 		method: 'POST'
	// 	});
	// 	if (res.status == 401) {
	// 		throw 'no api auth';
	// 	} else if (res.status !== 200) {
	// 		throw 'request err';
	// 	} else {
	// 		const json: ClassificationResponse = await res.json();
	// 		return json;
	// 	}
	// }

	// // async createAnswer(engineId: EngineId, options: Partial<AnswerRequest>): Promise<any> {
	// // 	const bod = {
	// // 		model: engineId,
	// // 		...options
	// // 	} as AnswerRequest;
	// async createAnswer(engineId: EngineId, options: AnswerRequest): Promise<AnswerResponse> {
	// 	const bod = {
	// 		model: engineId,
	// 		...options
	// 	};
	// 	const res = await fetch('https://api.openai.com/v1/answers', {
	// 		body: JSON.stringify(bod),
	// 		headers: this.postHeaders,
	// 		method: 'POST'
	// 	});
	// 	if (res.status == 401) {
	// 		throw 'no api auth';
	// 	} else if (res.status !== 200) {
	// 		throw 'request err';
	// 	} else {
	// 		const json: AnswerResponse = await res.json();
	// 		return json;
	// 	}
	// }

	// TODO files
	// https://beta.openai.com/docs/api-reference/files/list
}
export default GpTs;
