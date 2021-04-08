export declare type EngineId = 'ada' | 'babbage' | 'curie' | 'curie-instruct-beta' | 'davinci' | 'davinci-instruct-beta';
export declare type Engine = {
    id: EngineId;
    object: 'engine';
    owner: string;
    ready: boolean;
    created: null;
    max_replicas: null;
    permissions: null;
    ready_replicas: null;
    replicas: null;
};
export declare type ListEnginesResponse = {
    data: Engine[];
    object: 'list';
};
export declare type RetrieveEngineResponse = Engine;
export declare type CompletionRequest = {
    prompt?: string | string[];
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    logprobs?: boolean;
    echo?: boolean;
    stop?: string | string[];
    presence_penalty?: number;
    frequency_penalty?: number;
    best_of?: number;
    logit_bias?: any;
};
export declare type CompletionResponse = {
    id: string;
    object: 'text_completion';
    created: number;
    model: string;
    choices: {
        text: string;
        index: number;
        logprobs: null;
        finish_reason: string;
    }[];
};
export declare type SearchRequest = {
    documents?: string[];
    file?: string;
    query: string;
    max_rerank?: number;
    return_metadata?: boolean;
};
export declare type SearchResponse = {
    data: SearchResult[];
    object: 'list';
    model: string;
};
export declare type SearchResult = {
    document: number;
    object: 'search_result';
    score: number;
};
export declare type ClassificationRequest = {
    model?: EngineId;
    query: string;
    examples?: string[][];
    file?: string;
    labels?: string[];
    search_model?: EngineId;
    temperature?: number;
    logprobs?: number;
    max_examples?: number;
    logit_bias?: any;
    return_prompt?: boolean;
    return_metadata?: boolean;
    expand?: string[];
};
export declare type ClassificationResponse = {
    completion: string;
    label: string;
    model: string;
    object: 'classification';
    search_model: EngineId;
    selected_examples: {
        document: number;
        label: string;
        text: string;
    }[];
};
export declare type AnswerRequest = {
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
export declare type AnswerResponse = {
    answers: string[];
    completion: string;
    model: string;
    object: 'answer';
    search_model: EngineId;
    selected_documents: {
        document: number;
        text: string;
    }[];
};
