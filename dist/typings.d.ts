export declare enum ObjectType {
    'engine' = 0,
    'list' = 1,
    'text_completion' = 2,
    'search_result' = 3,
    'classification' = 4,
    'answer' = 5,
    'file' = 6
}
export declare type BasicResponse = {
    object: ObjectType;
};
export declare type BasicRequest = {
    engineId: EngineId;
};
export declare type EngineId = 'ada' | 'babbage' | 'curie' | 'curie-instruct-beta' | 'davinci' | 'davinci-instruct-beta' | 'content-filter-alpha-c4' | 'content-filter-dev' | 'cursing-filter-v6' | string;
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
