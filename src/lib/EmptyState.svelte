<script>
    import { Button, Link } from 'carbon-components-svelte'
    import Add16 from 'carbon-icons-svelte/lib/Add16'

    export let emptyData = {
        title: 'Start adding some content',
        description: 'This page looks like having no content all.',
        actionText: 'Create new content',
        annexe: 'Otherwise, this second action is available: ',
        linkHref: '#',
        linkText: 'Second action'
    }

    export let modalAddOpen = false
</script>

<div class="empty">
    <h3>{emptyData.title}</h3>
    <p>{@html emptyData.description}</p>
    <Button icon={Add16}  on:click={() => (modalAddOpen = true)}>{emptyData.actionText}</Button>
    <p class="subAction"><small>{emptyData.annexe} </small><Link href={emptyData.linkHref}>{emptyData.linkText}</Link></p>
</div>

<style>
    .empty{
        margin: 4rem 0;
        padding: 4rem 0;
    }
    p{
        margin: 0 0 1.5em;
    }
    small{
        font-size: var(--cds-body-short-01-font-size);
    }
    .subAction
    {
        margin-top: 1rem;
    }
</style>