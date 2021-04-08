# gpt-ts
typescript wrapper for gpt-3 api (uses REST api)

---

## example
```ts
import { GpTs } from 'gpt-ts';
const brain = new GpTs(OPENAI_APIKEY); // dont publish your api key!

const thoughts = brain.createCompletion('ada', {
	prompt: 'whats for lunch?'
});

console.log(thoughts.choices[0].text); // "maybe a banana?"
```

also see `/demo/index.ts`

---

## import + use
(without npm)

`package.json`
```json
	"dependencies": {
		"gpt-ts": "thencc/gpt-ts",
		...
	},
```

TODO publish to npm for `npm i gpt-ts`

---

FYI works in frontend / backend

(depends on `node-fetch` for backend use to work)

---

## TODO
- support completion streaming SSE (https://beta.openai.com/docs/api-reference/completions/create-via-get)
- support Files (https://beta.openai.com/docs/api-reference/files)
