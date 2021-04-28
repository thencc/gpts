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

### npm

`npm i gpts`

### github

`package.json`

```json
	"dependencies": {
		"gpts": "thencc/gpts",
		...
	},
```

---

## notes

-   uses OpenAI's REST api
-   backend: depends on `node-fetch`
-   frontend: works client-side too (but DO NOT share your api key in public client-side code)
-   for the [/classifications](https://beta.openai.com/docs/api-reference/classifications/create) and [/answers](https://beta.openai.com/docs/api-reference/answers/create) endpoints openai seems to switch the syntax from engineId -> model so if you specify both in the options argument, options.model takes precedence

---

## TODO

-   support completion streaming SSE (https://beta.openai.com/docs/api-reference/completions/create-via-get)
