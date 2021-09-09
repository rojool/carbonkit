<script>
  // import empty state control for intial state
  import EmptyState from '$lib/EmptyState.svelte'
  // Set empty texts and actions for intial state
  const campaign_empty = {
        title: 'Start adding some campaigns',
        description: 'Your campaign list is empty. Please click on <strong>Create new campaign</strong> to start.',
        actionText: 'Create a new campaign',
        annexe: 'You can also ',
        linkHref: '/tasks',
        linkText: 'create new task'
    }
</script>

<svelte:head>
  <title>Campaigns</title>
</svelte:head>

<h1>Campaigns</h1>

<EmptyState emptyData={campaign_empty}></EmptyState>