# gpts = [gpt-3](https://openai.com/blog/openai-api/) + [typescript](https://www.typescriptlang.org/)

typescript wrapper for gpt-3 api

---

## example

```ts
import { GpTs } from 'gpts';
const brain = new GpTs(OPENAI_APIKEY); // dont publish your api key!

const thoughts = brain.completion({
	engineId: 'ada',
	prompt: 'whats for lunch?',
});

console.log(thoughts.choices[0].text); // "maybe a banana?"
```

also see [demo/index.ts](https://github.com/thencc/gpts/blob/main/demo/index.ts) (need to insert your api key to run)

---

## install

### [npm](https://www.npmjs.com/package/gpts)

`npm i gpts`

### [github](https://github.com/thencc/gpts)

`package.json`

```json
	"dependencies": {
		"gpts": "thencc/gpts",
		...
	},
```

---

## features

-   engines
    -   list ✅
    -   retreive ✅
-   completions
    -   create ✅
    -   stream ⚠️ (TODO)
-   searches
    -   create ✅
-   classifications
    -   create ✅
-   answers
    -   create ✅
-   files
    -   list ✅
    -   upload ✅ (server-side only)
    -   retrieve ✅
    -   delete ✅
-   embeddings
    -   create ✅
-   fine-tunes
    -   prepare dataset ⚠️ (TODO)
    -   upload dataset ⚠️ (TODO)
    -   check upload results ⚠️ (TODO)

---

## notes

### general

-   uses openai's REST api
-   for the [/classifications](https://beta.openai.com/docs/api-reference/classifications/create) and [/answers](https://beta.openai.com/docs/api-reference/answers/create) endpoints, openai seems to switch the syntax from `engineId` -> `model` so if you specify both in the `options` argument, `options.model` takes precedence

### client-side use

-   this library works client + server side using [axios](https://github.com/axios/axios) for http requests
-   DO NOT share your api key in public client-side frontend code
-   one way to hide your openai api key for client-side use is by hosting an api wrapper endpoint that enforces your own authentication, then updating the origin this library looks to use like the below.

api wrapper example:

```ts
import { GpTs } from 'gpts';
/*
    gives your api wrapper authorization like this:
        headers: {
            'Authorization': 'Bearer ASuperSecretPassword'
        }

    the constructor takes 2 arguments
        1. the authorization bearer value
        2. the api origin
*/
const brain = new GpTs('ASuperSecretPassword', 'https://company.api-wrappers.io/gpt3');
```

---

## TODO

-   support completion streaming SSE (https://beta.openai.com/docs/api-reference/completions/create-via-get)
-   support fine-tuning management (https://beta.openai.com/docs/guides/fine-tuning/preparing-your-dataset)
