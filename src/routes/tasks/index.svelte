<script>
  // import empty state control for intial state
  import EmptyState from '$lib/EmptyState.svelte'
  // Set empty texts and actions for intial state
  const task_empty = {
        title: 'Start adding some tasks',
        description: 'Your task list is empty. Please click on <strong>Create new task</strong> to start.',
        actionText: 'Create a new task',
        annexe: 'You can also ',
        linkHref: '/workflows',
        linkText: 'create new workflow'
    }
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>

<h1>Tasks</h1>

<EmptyState emptyData={task_empty}></EmptyState>
