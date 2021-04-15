import { CompletionRequest, CompletionResponse, EngineId, ListEnginesResponse } from './typings';
export declare class GpTs {
    origin: string;
    apiKey: string;
    private headers;
    constructor(apiKey: string, origin?: string);
    private setApiKey;
    private request;
    listEngines(): Promise<ListEnginesResponse>;
    createCompletion(engineId: EngineId, options?: CompletionRequest): Promise<CompletionResponse>;
    createCompletionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any>;
}
export default GpTs;
