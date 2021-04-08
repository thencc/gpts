# gpt-ts
typescript wrapper for gpt-3 api (uses REST api)

---

example:
```ts
import { GpTs } from 'gpt-ts';
const brain = new GpTs(OPENAI_APIKEY); // dont publish your api key!

const thoughts = brain.createCompletion('ada', {
	prompt: 'whats for lunch?'
});

console.log(thoughts.choices[0].text); // "maybe a banana?"
```

also see `/demo`

---

works in frontend + backend

(depends on `node-fetch` for backend use to work)
