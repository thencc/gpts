export const hello = () => 'world';

// Python String.format adapted for TS + renamed inject
export const inject = (input: string, ...args: any[]): string => {
	// adapted from: https://stackoverflow.com/a/13639670/10412744
	let unkeyed_index = 0;
	return input.replace(/\{(\w*)\}/g, function (match, key) {
		if (key === '') {
			key = unkeyed_index;
			unkeyed_index++
		}
		if (key == +key) {
			return args[key] !== 'undefined'
				? args[key]
				: match;
		} else {
			for (var i = 0; i < args.length; i++) {
				if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
					return args[i][key];
				}
			}
			return match;
		}
	});
};
// used like...
// let qwe = 'test {0} {1} and then some more';
// qwe = inject(qwe, '123', '456');
