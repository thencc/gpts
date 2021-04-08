"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GpTs = void 0;
__exportStar(require("./utils"), exports);
__exportStar(require("./typings"), exports); // for use elswehere
// in case this is not the web import fetch
const node_fetch_1 = require("node-fetch");
class GpTs {
    constructor(apiKey) {
        this.getHeaders = {
            Authorization: 'Bearer'
        };
        this.postHeaders = {
            Authorization: 'Bearer',
            'Content-Type': 'application/json'
        };
        // console.log('Chronolgy constructed');
        this.apiKey = apiKey;
        this.getHeaders.Authorization = `Bearer ${this.apiKey}`;
        this.postHeaders.Authorization = `Bearer ${this.apiKey}`;
    }
    listEngines() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default('https://api.openai.com/v1/engines', {
                headers: this.getHeaders
            });
            if (res.status == 401) {
                throw 'no api auth';
            }
            else if (res.status !== 200) {
                throw 'request err';
            }
            else {
                const json = yield res.json();
                return json;
            }
        });
    }
    retrieveEngine(engineId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`https://api.openai.com/v1/engines/${engineId}`, {
                headers: this.getHeaders
            });
            if (res.status == 401) {
                throw 'no api auth';
            }
            else if (res.status !== 200) {
                throw 'request err';
            }
            else {
                const json = yield res.json();
                return json;
            }
        });
    }
    createCompletion(engineId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`https://api.openai.com/v1/engines/${engineId}/completions`, {
                body: JSON.stringify(options),
                headers: this.postHeaders,
                method: 'POST'
            });
            if (res.status == 401) {
                throw 'no api auth';
            }
            else if (res.status !== 200) {
                throw 'request err';
            }
            else {
                const json = yield res.json();
                return json;
            }
        });
    }
    // TODO: https://beta.openai.com/docs/api-reference/completions/create-via-get
    createCompletionStream(engineId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TODO');
            return;
        });
    }
    createSearch(engineId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`https://api.openai.com/v1/engines/${engineId}/search`, {
                body: JSON.stringify(options),
                headers: this.postHeaders,
                method: 'POST'
            });
            if (res.status == 401) {
                throw 'no api auth';
            }
            else if (res.status !== 200) {
                throw 'request err';
            }
            else {
                const json = yield res.json();
                return json;
            }
        });
    }
    createClassification(engineId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const bod = Object.assign({ model: engineId }, options);
            const res = yield node_fetch_1.default('https://api.openai.com/v1/classifications', {
                body: JSON.stringify(bod),
                headers: this.postHeaders,
                method: 'POST'
            });
            if (res.status == 401) {
                throw 'no api auth';
            }
            else if (res.status !== 200) {
                throw 'request err';
            }
            else {
                const json = yield res.json();
                return json;
            }
        });
    }
    // async createAnswer(engineId: EngineId, options: Partial<AnswerRequest>): Promise<any> {
    // 	const bod = {
    // 		model: engineId,
    // 		...options
    // 	} as AnswerRequest;
    createAnswer(engineId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const bod = Object.assign({ model: engineId }, options);
            const res = yield node_fetch_1.default('https://api.openai.com/v1/answers', {
                body: JSON.stringify(bod),
                headers: this.postHeaders,
                method: 'POST'
            });
            if (res.status == 401) {
                throw 'no api auth';
            }
            else if (res.status !== 200) {
                throw 'request err';
            }
            else {
                const json = yield res.json();
                return json;
            }
        });
    }
}
exports.GpTs = GpTs;
exports.default = GpTs;
//# sourceMappingURL=index.js.map