"use strict";
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
// in case this is not the web, import fetch for node
const node_fetch_1 = require("node-fetch");
class GpTs {
    constructor(apiKey, origin = 'https://api.openai.com/') {
        this.headers = {
            get: {
                Authorization: 'Bearer'
            },
            post: {
                Authorization: 'Bearer',
                'Content-Type': 'application/json'
            }
        };
        // console.log('GpTs constructed');
        this.origin = origin;
        this.setApiKey(apiKey);
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        this.headers.get.Authorization = `Bearer ${this.apiKey}`;
        this.headers.post.Authorization = `Bearer ${this.apiKey}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request(endpoint, method = 'GET', reqOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.origin}${endpoint}`; // ex: https://api.openai.com/v1/engines
            const res = yield node_fetch_1.default(url, {
                method: method,
                headers: method == 'GET' ? this.headers.get : this.headers.post,
                body: method == 'GET' ? null : JSON.stringify(reqOptions || {})
            });
            if (res.status == 401) {
                throw 'invalid api key';
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
    listEngines() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request('v1/engines');
        });
    }
    retrieveEngine(engineId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(`v1/engines/${engineId}`);
        });
    }
    completion(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            return yield this.request(`v1/engines/${engineId}/completions`, 'POST', options);
        });
    }
    // TODO: https://beta.openai.com/docs/api-reference/completions/create-via-get
    createCompletionStream(engineId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TODO');
            return;
        });
    }
    search(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            return yield this.request(`v1/engines/${engineId}/search`, 'POST', options);
        });
    }
    classification(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            // openai mixes up model / engineId here?
            const opts = Object.assign({ model: engineId }, options);
            return yield this.request('v1/classifications', 'POST', opts);
        });
    }
    answer(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            // openai mixes up model / engineId here?
            const opts = Object.assign({ model: engineId }, options);
            return yield this.request('v1/answers', 'POST', opts);
        });
    }
}
exports.GpTs = GpTs;
exports.default = GpTs;
//# sourceMappingURL=GpTs.js.map