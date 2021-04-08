export * from './utils';
export * from './typings';
import { AnswerRequest, ClassificationRequest, CompletionRequest, EngineId, SearchRequest } from './typings';
export declare class GpTs {
    hello: string;
    apiKey: string;
    getHeaders: {
        Authorization: string;
    };
    postHeaders: {
        Authorization: string;
        'Content-Type': string;
    };
    constructor(apiKey: string);
    listEngines(): Promise<any>;
    retrieveEngine(engineId: EngineId): Promise<any>;
    createCompletion(engineId: EngineId, options: CompletionRequest): Promise<any>;
    createCompletionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any>;
    createSearch(engineId: EngineId, options: SearchRequest): Promise<any>;
    createClassification(engineId: EngineId, options: ClassificationRequest): Promise<any>;
    createAnswer(engineId: EngineId, options: AnswerRequest): Promise<any>;
}
export default GpTs;
