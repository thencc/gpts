import {
	AnswerRequest,
	AnswerResponse,
	ClassificationRequest,
	ClassificationResponse,
	CompletionRequest,
	CompletionResponse,
	EngineId,
	FileListResponse,
	EngineListResponse,
	EngineRetrieveResponse,
	SearchRequest,
	SearchResponse,
	FileUploadResponse,
	FileRetrieveResponse,
} from './typings';

// in case this is not the web, import fetch for node
// if (!window) {
// 	import fetch from 'node-fetch';
// }
// import * as NodeFetch from 'node-fetch';
// let fetch: typeof NodeFetch | typeof window.fetch;
let fetch: any;
const go = async () => {
	if (typeof window !== 'undefined') {
		console.log('is browser');
		fetch = window.fetch;
	} else {
		console.log('is node.js');
		// fetch = NodeFetch;
		fetch = await import('node-fetch');
	}
};
go();

// console.log('client-side?', !!(window));
// if (window) {
// 	fetch = window.fetch;
// } else {
// 	fetch = NodeFetch;
// }

// for file uploading
import * as fs from 'fs'; // needs "@types/node": "^14.14.37",
import * as FormData from 'form-data';

export class GpTs {
	// hello = 'world';
	origin: string; // origin as var for if/when api changes
	// apiVersion: string; // v1
	apiKey: string;

	private headers = {
		get: {
			Authorization: 'Bearer',
		},
		post: {
			Authorization: 'Bearer',
			'Content-Type': 'application/json',
		},
	};

	constructor(apiKey: string, origin = 'https://api.openai.com/v1', apiVersion = '/v1') {
		// console.log('GpTs constructed');
		this.origin = origin;
		// this.apiVersion = apiVersion;
		this.setApiKey(apiKey);
	}

	private setApiKey(apiKey: string) {
		this.apiKey = apiKey;
		// TODO update to work for custom endpoint WITHOUT bearer prefixed
		this.headers.get.Authorization = `Bearer ${this.apiKey}`;
		this.headers.post.Authorization = `Bearer ${this.apiKey}`;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private async request(
		endpoint: string,
		method: 'GET' | 'POST' | 'DELETE' = 'GET',
		reqOptions?: any
	): Promise<any> {
		// const url = `${this.origin}${this.apiVersion}/${endpoint}`; // ex: https://api.openai.com/v1/engines
		const url = `${this.origin}/${endpoint}`; // ex: https://api.openai.com/v1/engines
		const res = await fetch(url, {
			method: method,
			// headers: method == 'POST' ? this.headers.post : this.headers.get,
			headers: this.headers.post,
			body: method == 'POST' ? JSON.stringify(reqOptions || {}) : null,
		});

		if (res.status == 401) {
			throw 'invalid api key';
		} else if (res.status == 403) {
			throw 'no access to this';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json = await res.json();
			return json;
		}
	}

	async engineList(): Promise<EngineListResponse> {
		return (await this.request('engines')) as EngineListResponse;
	}

	async engineRetrieve(engineId: EngineId): Promise<EngineRetrieveResponse> {
		return (await this.request(`engines/${engineId}`)) as EngineRetrieveResponse;
	}

	async completion(options: CompletionRequest): Promise<CompletionResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
		return (await this.request(
			`engines/${engineId}/completions`,
			'POST',
			options
		)) as CompletionResponse;
	}

	// TODO: https://beta.openai.com/docs/api-reference/completions/create-via-get
	async completionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any> {
		console.log('TODO');
		return;
	}

	async search(options: SearchRequest): Promise<SearchResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
		return (await this.request(
			`engines/${engineId}/search`,
			'POST',
			options
		)) as SearchResponse;
	}

	async classification(options: ClassificationRequest): Promise<ClassificationResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
		// openai mixes up model / engineId here?
		const opts = {
			model: engineId,
			...options,
		};
		return (await this.request('classifications', 'POST', opts)) as ClassificationResponse;
	}

	async answer(options: AnswerRequest): Promise<AnswerResponse> {
		const engineId = options.engineId;
		delete options.engineId; // some endpoints err if you pass in this
		// openai mixes up model / engineId here?
		const opts = {
			model: engineId,
			...options,
		};
		return (await this.request('answers', 'POST', opts)) as AnswerResponse;
	}

	async fileList(): Promise<FileListResponse> {
		return (await this.request('files')) as FileListResponse;
	}

	// backend: file is fs.ReadStream (node.js)
	// frontend: file is ...
	async fileUpload(
		file: fs.ReadStream,
		purpose: 'answers' | 'classifications' | 'search'
	): Promise<FileUploadResponse> {
		const formData = new FormData();
		formData.append('purpose', purpose);
		formData.append('file', file);
		// console.log('formData', formData);

		// const res = await fetch(`${this.origin}${this.apiVersion}/files`, {
		const res = await fetch(`${this.origin}/files`, {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				// removing content-type header makes file upload work... strange
				// 'Content-Type': 'multipart/form-data'
			},
		});
		// console.log('res', res);

		if (res.status == 401) {
			throw 'invalid api key';
		} else if (res.status !== 200) {
			throw 'request err';
		} else {
			const json: FileUploadResponse = await res.json();
			return json;
		}
	}

	async fileRetrieve(fileId: string): Promise<FileRetrieveResponse> {
		return (await this.request(`files/${fileId}`)) as FileRetrieveResponse;
	}

	// "Only owners of organizations can delete files currently." (https://beta.openai.com/docs/api-reference/files/delete)
	// not sure about the return type here as i am not an org owner
	async fileDelete(fileId: string): Promise<void> {
		return (await this.request(`files/${fileId}`, 'DELETE')) as void;
	}
}
export default GpTs;
