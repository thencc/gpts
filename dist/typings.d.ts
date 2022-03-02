export declare enum ObjectType {
    'engine' = 0,
    'list' = 1,
    'text_completion' = 2,
    'search_result' = 3,
    'classification' = 4,
    'answer' = 5,
    'file' = 6,
    'embedding' = 7
}
export declare type BasicResponse = {
    object: ObjectType;
};
export declare type BasicRequest = {
    engineId: EngineId;
};
export declare type EngineId = 'ada' | 'babbage' | 'curie' | 'davinci' | 'ada-code-search-code' | 'ada-code-search-text' | 'babbage-code-search-code' | 'babbage-code-search-text' | 'code-cushman-001' | 'code-davinci-001' | 'cushman-codex' | 'davinci-codex' | 'ada-instruct-beta' | 'babbage-instruct-beta' | 'curie-instruct-beta' | 'curie-instruct-beta-v2' | 'davinci-instruct-beta' | 'davinci-instruct-beta-v3' | 'ada-search-document' | 'ada-search-query' | 'ada-similarity' | 'babbage-search-document' | 'babbage-search-query' | 'babbage-similarity' | 'curie-search-document' | 'curie-search-query' | 'curie-similarity' | 'davinci-search-document' | 'davinci-search-query' | 'davinci-similarity' | 'text-similarity-ada-001' | 'text-similarity-babbage-001' | 'text-similarity-curie-001' | 'text-similarity-davinci-001' | 'text-search-ada-doc-001' | 'text-search-ada-query-001' | 'text-search-babbage-doc-001' | 'text-search-babbage-query-001' | 'text-search-curie-doc-001' | 'text-search-curie-query-001' | 'text-search-davinci-doc-001' | 'text-search-davinci-query-001' | 'code-search-ada-code-001' | 'code-search-ada-text-001' | 'code-search-babbage-code-001' | 'code-search-babbage-text-001' | 'text-ada-001' | 'text-babbage-001' | 'text-curie-001' | 'text-davinci-001' | 'content-filter-alpha-c4' | 'content-filter-dev' | 'cursing-filter-v6' | string;
export declare type Engine = {
    id: EngineId;
    object: ObjectType.engine;
    owner: string;
    ready: boolean;
    created: null;
    max_replicas: null;
    permissions: null;
    ready_replicas: null;
    replicas: null;
};
export declare type EngineListResponse = {
    data: Engine[];
    object: ObjectType.list;
};
export declare type EngineRetrieveResponse = Engine;
export declare type CompletionRequest = BasicRequest & {
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
    object: ObjectType.text_completion;
    created: number;
    model: string;
    choices: {
        text: string;
        index: number;
        logprobs: null;
        finish_reason: string;
    }[];
};
export declare type SearchRequest = BasicRequest & {
    documents?: string[];
    file?: string;
    query: string;
    max_rerank?: number;
    return_metadata?: boolean;
};
export declare type SearchResponse = {
    data: SearchResult[];
    object: ObjectType.list;
    model: string;
};
export declare type SearchResult = {
    document: number;
    object: ObjectType.search_result;
    score: number;
};
export declare type ClassificationRequest = BasicRequest & {
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
    object: ObjectType.classification;
    search_model: EngineId;
    selected_examples: {
        document: number;
        label: string;
        text: string;
    }[];
};
export declare type AnswerRequestBase = BasicRequest & {
    model?: EngineId;
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
export declare type AnswerRequestDocuments = AnswerRequestBase & {
    documents: string[];
};
export declare type AnswerRequestFile = AnswerRequestBase & {
    file: string;
};
export declare type AnswerRequest = AnswerRequestDocuments | AnswerRequestFile;
export declare type AnswerResponse = {
    answers: string[];
    completion: string;
    model: string;
    object: ObjectType.answer;
    search_model: EngineId;
    selected_documents: {
        document: number;
        text: string;
    }[];
};
export declare type File = {
    id: string;
    object: ObjectType.file;
    bytes: number;
    created_at: number;
    filename: string;
    format?: string;
    purpose: 'answers' | 'classifications' | 'search';
    status?: string;
};
export declare type FileListResponse = {
    data: File[];
    object: ObjectType.list;
};
export declare type FileUploadResponse = File;
export declare type FileRetrieveResponse = File;
export declare type EmbeddingsRequest = BasicRequest & {
    input: string | string[];
    user?: string;
};
export declare type EmbeddingsResponse = {
    object: ObjectType.list;
    model: string;
    data: {
        object: ObjectType.embedding;
        index: number;
        embedding: number[];
    }[];
};
