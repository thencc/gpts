export * from './utils';
export * from './typings';
import { AnswerRequest, AnswerResponse, ClassificationRequest, ClassificationResponse, CompletionRequest, CompletionResponse, EngineId, ListEnginesResponse, RetrieveEngineResponse, SearchRequest, SearchResponse } from './typings';
export declare class GpTs {
    apiKey: string;
    getHeaders: {
        Authorization: string;
    };
    postHeaders: {
        Authorization: string;
        'Content-Type': string;
    };
    constructor(apiKey: string);
    listEngines(): Promise<ListEnginesResponse>;
    retrieveEngine(engineId: EngineId): Promise<RetrieveEngineResponse>;
    createCompletion(engineId: EngineId, options: CompletionRequest): Promise<CompletionResponse>;
    createCompletionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any>;
    createSearch(engineId: EngineId, options: SearchRequest): Promise<SearchResponse>;
    createClassification(engineId: EngineId, options: ClassificationRequest): Promise<ClassificationResponse>;
    createAnswer(engineId: EngineId, options: AnswerRequest): Promise<AnswerResponse>;
}
export default GpTs;
