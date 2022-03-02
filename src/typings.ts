export enum ObjectType {
	'engine',
	'list',
	'text_completion',
	'search_result',
	'classification',
	'answer',
	'file',
	'embedding'
}

export type BasicResponse = {
	object: ObjectType;
};

export type BasicRequest = {
	engineId: EngineId;
};

export type EngineId =
	// main engines
	| 'ada'
	| 'babbage'
	| 'curie'
	| 'davinci'
	// codex
	| 'ada-code-search-code'
	| 'ada-code-search-text'
	| 'babbage-code-search-code'
	| 'babbage-code-search-text'
	| 'code-cushman-001'
	| 'code-davinci-001'
	| 'cushman-codex'
	| 'davinci-codex'
	// instruct
	| 'ada-instruct-beta'
	| 'babbage-instruct-beta'
	| 'curie-instruct-beta'
	| 'curie-instruct-beta-v2'
	| 'davinci-instruct-beta'
	| 'davinci-instruct-beta-v3'
	// embeddings (old)
	| 'ada-search-document'
	| 'ada-search-query'
	| 'ada-similarity'
	| 'babbage-search-document'
	| 'babbage-search-query'
	| 'babbage-similarity'
	| 'curie-search-document'
	| 'curie-search-query'
	| 'curie-similarity'
	| 'davinci-search-document'
	| 'davinci-search-query'
	| 'davinci-similarity'
	// similarity embeddings (https://beta.openai.com/docs/guides/embeddings/similarity-embeddings)
	| 'text-similarity-ada-001'
	| 'text-similarity-babbage-001'
	| 'text-similarity-curie-001'
	| 'text-similarity-davinci-001'
	// text search embeddings (https://beta.openai.com/docs/guides/embeddings/text-search-embeddings)
	| 'text-search-ada-doc-001'
	| 'text-search-ada-query-001'
	| 'text-search-babbage-doc-001'
	| 'text-search-babbage-query-001'
	| 'text-search-curie-doc-001'
	| 'text-search-curie-query-001'
	| 'text-search-davinci-doc-001'
	| 'text-search-davinci-query-001'
	// code search embeddings (https://beta.openai.com/docs/guides/embeddings/code-search-embeddings)
	| 'code-search-ada-code-001'
	| 'code-search-ada-text-001'
	| 'code-search-babbage-code-001'
	| 'code-search-babbage-text-001'
	// text embeddings? (undocumented)
	| 'text-ada-001'
	| 'text-babbage-001'
	| 'text-curie-001'
	| 'text-davinci-001'
	// others
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

export type EmbeddingsRequest = BasicRequest & {
	input: string | string[];
	user?: string;
};

export type EmbeddingsResponse = {
	object: ObjectType.list;
	model: string; // 'text-similarity-babbage:001'
	data: {
		object: ObjectType.embedding;
		index: number;
		embedding: number[]; // vector float array. for arr lengths see below
		/* FYI gpt3 embeddings:
			Ada (1024 dimensions)
			Babbage (2048 dimensions)
			Curie (4096 dimensions)
			Davinci (12288 dimensions)
		*/
	}[];
};