<script>
	import 'carbon-components-svelte/css/all.css';
	import '../app.css';

	import Theme from '$lib/Theme.svelte';
	import UIshell from '$lib/UIshell.svelte';
	import { Content } from 'carbon-components-svelte';
</script>

<Theme theme="g100">
	<UIshell />
	<Content>
		<slot />
	</Content>
</Theme>
