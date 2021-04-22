const node = require('@sveltejs/adapter-node');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		adapter: node(),
		target: '#svelte',

		vite: {
			optimizeDeps: {
				// Include to fix cliboard-copie issue: https://github.com/IBM/carbon-components-svelte/issues/595#issuecomment-824562588
				include: ['clipboard-copy']
			},
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
