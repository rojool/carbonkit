<script>
    import { Button, Link } from 'carbon-components-svelte'
    export let emptyData = {
        title: 'Start adding some content',
        description: 'This page looks like having no content all.',
        image: '',
        action: () => {return false},
        actiontext: 'Create new content',
        annexe: 'Otherwise, this second action is available: ',
        linkHref: '#',
        linkText: 'Second action'
    }
</script>

<h3>{emptyData.title}</h3>
<p>{@html emptyData.description}</p>
<Button on:click={emptyData.action}>{emptyData.actiontext}</Button>
<p><small>{emptyData.annexe} - <Link href={emptyData.linkHref}>{emptyData.linkText}</Link></small></p>