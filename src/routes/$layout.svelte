<script>
	import 'carbon-components-svelte/css/all.css';
	import '../app.css';

	import Theme from '$lib/Theme.svelte';
	import UIshell from '$lib/UIshell.svelte';
	import { Content } from 'carbon-components-svelte';
</script>

<svelte:head>
	<title>Smart Carbon Design</title>
</svelte:head>

<Theme>
	<UIshell />
	<Content>
		<slot />
	</Content>
</Theme>
