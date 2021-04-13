const node = require('@sveltejs/adapter-node');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		adapter: node(),
		target: '#svelte',

		vite: {
			optimizeDeps: {
				include: ['clipboard-copy']
			},
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
