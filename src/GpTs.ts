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
		return await this.request('v1/engines') as ListEnginesResponse;
	}

	async retrieveEngine(engineId: EngineId): Promise<RetrieveEngineResponse> {
		return await this.request(`v1/engines/${engineId}`) as RetrieveEngineResponse;
	}

	async completion(options: CompletionRequest): Promise<CompletionResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
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

	async search(options: SearchRequest): Promise<SearchResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
		return await this.request(
			`v1/engines/${engineId}/search`,
			'POST',
			options
		) as SearchResponse;
	}

	async classification(options: ClassificationRequest): Promise<ClassificationResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
		// openai mixes up model / engineId here?
		const opts = {
			model: engineId,
			...options
		};
		return await this.request(
			'v1/classifications',
			'POST',
			opts
		) as ClassificationResponse;
	}

	async answer(options: AnswerRequest): Promise<AnswerResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
		// openai mixes up model / engineId here?
		const opts = {
			model: engineId,
			...options
		};
		return await this.request(
			'v1/answers',
			'POST',
			opts
		) as AnswerResponse;
	}

	// TODO files
	// https://beta.openai.com/docs/api-reference/files/list
}
export default GpTs;
