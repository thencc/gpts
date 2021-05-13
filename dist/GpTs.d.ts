/// <reference types="node" />
import { AnswerRequest, AnswerResponse, ClassificationRequest, ClassificationResponse, CompletionRequest, CompletionResponse, EngineId, FileListResponse, EngineListResponse, EngineRetrieveResponse, SearchRequest, SearchResponse, FileUploadResponse, FileRetrieveResponse } from './typings';
import * as fs from 'fs';
export declare class GpTs {
    origin: string;
    apiKey: string;
    private headers;
    constructor(apiKey: string, origin?: string);
    private setApiKey;
    private request;
    engineList(): Promise<EngineListResponse>;
    engineRetrieve(engineId: EngineId): Promise<EngineRetrieveResponse>;
    completion(options: CompletionRequest): Promise<CompletionResponse>;
    completionStream(engineId: EngineId, options: Partial<CompletionRequest>): Promise<any>;
    search(options: SearchRequest): Promise<SearchResponse>;
    classification(options: ClassificationRequest): Promise<ClassificationResponse>;
    answer(options: AnswerRequest): Promise<AnswerResponse>;
    fileList(): Promise<FileListResponse>;
    fileUpload(file: fs.ReadStream, purpose: 'answers' | 'classifications' | 'search'): Promise<FileUploadResponse>;
    fileRetrieve(fileId: string): Promise<FileRetrieveResponse>;
    fileDelete(fileId: string): Promise<void>;
}
export default GpTs;
