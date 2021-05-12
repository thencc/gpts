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
// if (!window) {
// 	import fetch from 'node-fetch';
// }
// import * as NodeFetch from 'node-fetch';
// let fetch: typeof NodeFetch | typeof window.fetch;
let fetch;
const go = () => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof window !== 'undefined') {
        console.log('is browser');
        fetch = window.fetch;
    }
    else {
        console.log('is node.js');
        // fetch = NodeFetch;
        fetch = yield Promise.resolve().then(() => require('node-fetch'));
    }
});
go();
const FormData = require("form-data");
class GpTs {
    constructor(apiKey, origin = 'https://api.openai.com/v1', apiVersion = '/v1') {
        this.headers = {
            get: {
                Authorization: 'Bearer',
            },
            post: {
                Authorization: 'Bearer',
                'Content-Type': 'application/json',
            },
        };
        // console.log('GpTs constructed');
        this.origin = origin;
        // this.apiVersion = apiVersion;
        this.setApiKey(apiKey);
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        // TODO update to work for custom endpoint WITHOUT bearer prefixed
        this.headers.get.Authorization = `Bearer ${this.apiKey}`;
        this.headers.post.Authorization = `Bearer ${this.apiKey}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request(endpoint, method = 'GET', reqOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            // const url = `${this.origin}${this.apiVersion}/${endpoint}`; // ex: https://api.openai.com/v1/engines
            const url = `${this.origin}/${endpoint}`; // ex: https://api.openai.com/v1/engines
            const res = yield fetch(url, {
                method: method,
                // headers: method == 'POST' ? this.headers.post : this.headers.get,
                headers: this.headers.post,
                body: method == 'POST' ? JSON.stringify(reqOptions || {}) : null,
            });
            if (res.status == 401) {
                throw 'invalid api key';
            }
            else if (res.status == 403) {
                throw 'no access to this';
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
    engineList() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.request('engines'));
        });
    }
    engineRetrieve(engineId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.request(`engines/${engineId}`));
        });
    }
    completion(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            return (yield this.request(`engines/${engineId}/completions`, 'POST', options));
        });
    }
    // TODO: https://beta.openai.com/docs/api-reference/completions/create-via-get
    completionStream(engineId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TODO');
            return;
        });
    }
    search(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            return (yield this.request(`engines/${engineId}/search`, 'POST', options));
        });
    }
    classification(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            // openai mixes up model / engineId here?
            const opts = Object.assign({ model: engineId }, options);
            return (yield this.request('classifications', 'POST', opts));
        });
    }
    answer(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const engineId = options.engineId;
            delete options.engineId; // some endpoints err if you pass in this
            // openai mixes up model / engineId here?
            const opts = Object.assign({ model: engineId }, options);
            return (yield this.request('answers', 'POST', opts));
        });
    }
    fileList() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.request('files'));
        });
    }
    // backend: file is fs.ReadStream (node.js)
    // frontend: file is ...
    fileUpload(file, purpose) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append('purpose', purpose);
            formData.append('file', file);
            // console.log('formData', formData);
            // const res = await fetch(`${this.origin}${this.apiVersion}/files`, {
            const res = yield fetch(`${this.origin}/files`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    // removing content-type header makes file upload work... strange
                    // 'Content-Type': 'multipart/form-data'
                },
            });
            // console.log('res', res);
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
    fileRetrieve(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.request(`files/${fileId}`));
        });
    }
    // "Only owners of organizations can delete files currently." (https://beta.openai.com/docs/api-reference/files/delete)
    // not sure about the return type here as i am not an org owner
    fileDelete(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.request(`files/${fileId}`, 'DELETE'));
        });
    }
}
exports.GpTs = GpTs;
exports.default = GpTs;
//# sourceMappingURL=GpTs.js.map