/** @type {import('@sveltejs/kit').Config} */
import vercel from '@sveltejs/adapter-vercel';

const production = process.env.NODE_ENV === 'production';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
		vite: {
			optimizeDeps: {
				include: ['@carbon/charts'],
			},
			ssr: {
				noExternal: [production && '@carbon/charts'].filter(Boolean),
			},
		},
	}
};

export default config;
