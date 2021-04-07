
export type EngineId = 'ada' | 'babbage' | 'curie' | 'curie-instruct-beta' | 'davinci' | 'davinci-instruct-beta';

export type CompletionRequest = {
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

// https://beta.openai.com/docs/api-reference/searches/create
export type SearchRequest = {
	documents?: string[];
	file?: string;
	query: string;
	max_rerank?: number;
	return_metadata?: boolean;
};

export type ClassificationRequest = {
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
}

export type AnswerRequest = {
	model?: EngineId;
	question: string;
	examples: string[][];
	examples_context: string;
	documents?: string[];
	file?: string;
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
