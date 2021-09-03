export enum ObjectType {
	'engine',
	'list',
	'text_completion',
	'search_result',
	'classification',
	'answer',
	'file',
}

export type BasicResponse = {
	object: ObjectType;
};

export type BasicRequest = {
	engineId: EngineId;
};

export type EngineId =
	| 'ada'
	| 'babbage'
	| 'curie'
	| 'curie-instruct-beta'
	| 'davinci'
	| 'davinci-instruct-beta'
	// undocumented:
	| 'content-filter-alpha-c4'
	| 'content-filter-dev'
	| 'cursing-filter-v6'
	| string; // new engines and custom fine-tuned engines will come out all the time...

export type Engine = {
	id: EngineId;
	object: ObjectType.engine;
	owner: string; // 'openai',
	ready: boolean;
	// undocumented:
	created: null;
	max_replicas: null;
	permissions: null;
	ready_replicas: null;
	replicas: null;
};

export type EngineListResponse = {
	data: Engine[];
	object: ObjectType.list;
};

export type EngineRetrieveResponse = Engine;

export type CompletionRequest = BasicRequest & {
	prompt?: string | string[];
	max_tokens?: number; // 16
	temperature?: number;
	top_p?: number;
	n?: number; // How many completions to generate for each prompt
	stream?: boolean;
	logprobs?: boolean;
	echo?: boolean;
	stop?: string | string[];
	presence_penalty?: number;
	frequency_penalty?: number;
	best_of?: number;
	logit_bias?: any; // Record<string, number> // to tinker with
};

export type CompletionResponse = {
	id: string;
	object: ObjectType.text_completion;
	created: number; // timestamp
	model: string; // ex: 'davinci:2020-05-03'
	choices: {
		text: string;
		index: number;
		logprobs: null;
		finish_reason: string; // 'length' | 'stop' etc...
	}[];
};

export type SearchRequest = BasicRequest & {
	documents?: string[];
	file?: string;
	query: string;
	max_rerank?: number;
	return_metadata?: boolean;
};

export type SearchResponse = {
	data: SearchResult[];
	object: ObjectType.list;
	// undocumented
	model: string; // 'ada:2020-05-03'
};

export type SearchResult = {
	document: number; // index
	object: ObjectType.search_result;
	score: number; // 215.412
};

export type ClassificationRequest = BasicRequest & {
	model?: EngineId; // ID of the engine to use for completion
	query: string;
	examples?: string[][];
	file?: string;
	labels?: string[];
	search_model?: EngineId; // ID of the engine to use for semantic search
	temperature?: number;
	logprobs?: number;
	max_examples?: number;
	logit_bias?: any;
	return_prompt?: boolean;
	return_metadata?: boolean;
	expand?: string[];
};

export type ClassificationResponse = {
	completion: string; // 'cmpl-2euN7lUVZ0d4RKbQqRV79IiiE6M1f',
	label: string; // 'Negative',
	model: string; // 'curie:2020-05-03',
	object: ObjectType.classification;
	search_model: EngineId;
	selected_examples: {
		document: number;
		label: string;
		text: string;
	}[];
};

export type AnswerRequestBase = BasicRequest & {
	model?: EngineId; // engineId == model?
	question: string;
	examples: string[][];
	examples_context: string;
	search_model?: EngineId;
	max_rerank?: number;
	temperature?: number;
	logprobs?: number;
	max_tokens?: number;
	stop?: string | string[];
	n?: number;
	logit_bias?: any;
	return_metadata?: boolean;
	return_prompt?: boolean;
	expand?: string[];
};

export type AnswerRequestDocuments = AnswerRequestBase & {
	documents: string[];
};

export type AnswerRequestFile = AnswerRequestBase & {
	file: string;
};

// "You should specify either documents or a file, but not both." (https://beta.openai.com/docs/api-reference/answers/create)
export type AnswerRequest = AnswerRequestDocuments | AnswerRequestFile;

export type AnswerResponse = {
	answers: string[];
	completion: string; // 'cmpl-2euVa1kmKUuLpSX600M41125Mo9NI',
	model: string; // 'curie:2020-05-03',
	object: ObjectType.answer;
	search_model: EngineId;
	selected_documents: {
		document: number;
		text: string;
	}[];
};

export type File = {
	id: string; // 'file-ccdDZrC3iZVNiQVeEA6Z66wf',
	object: ObjectType.file;
	bytes: number; // 175,
	created_at: number; // 1613677385,
	filename: string; // 'train.jsonl',
	format?: string; // 'TEXT_HASH_JSONL' // 'TEXT_JSONL'
	purpose: 'answers' | 'classifications' | 'search'; // 'search'
	status?: string; // 'uploaded' | 'processed' | more...? deleted
};

export type FileListResponse = {
	data: File[];
	object: ObjectType.list;
};

export type FileUploadResponse = File;

export type FileRetrieveResponse = File;
