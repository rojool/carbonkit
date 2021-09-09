<script>
  // import empty state control for intial state
  import EmptyState from '$lib/EmptyState.svelte'
  // Set empty texts and actions for intial state
  const workflow_empty = {
        title: 'Start adding some workflows',
        description: 'Your workflow list is empty. Please click on <strong>Create new workflow</strong> to start.',
        actionText: 'Create a new workflow',
        annexe: 'You can also ',
        linkHref: '/campaigns',
        linkText: 'create new campaign'
    }
</script>

<svelte:head>
  <title>Workflows</title>
</svelte:head>

<h1>Workflows</h1>

<EmptyState emptyData={workflow_empty}></EmptyState>
