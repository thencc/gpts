import { AnswerRequest, AnswerResponse, ClassificationRequest, ClassificationResponse, CompletionRequest, CompletionResponse, EngineId, ListEnginesResponse, RetrieveEngineResponse, SearchRequest, SearchResponse } from './typings';
export declare class GpTs {
    origin: string;
    apiKey: string;
    private headers;
    constructor(apiKey: string, origin?: string);
    private setApiKey;
    private request;
    listEngines(): Promise<ListEnginesResponse>;
    retrieveEngine(engineId: EngineId): Promise<RetrieveEngineResponse>;
    completion(options: CompletionRequest): Promise<CompletionResponse>;
    createCompletionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any>;
    search(options: SearchRequest): Promise<SearchResponse>;
    classification(options: ClassificationRequest): Promise<ClassificationResponse>;
    answer(options: AnswerRequest): Promise<AnswerResponse>;
}
export default GpTs;
