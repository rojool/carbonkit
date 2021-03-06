<script>
  // import class and store
  import { Company, Companies } from './company'
  // import empty state control for intial state
  import EmptyState from '$lib/EmptyState.svelte'
  // import icons from CDS
  import Delete16 from 'carbon-icons-svelte/lib/Delete16'
  import Add16 from 'carbon-icons-svelte/lib/Add16'
  // import CDS components required
  import {
    Button,
    DataTable,
    Form,
    FormGroup,
    InlineLoading,
    InlineNotification,
    Modal,
    TextInput,
    Toolbar,
    ToolbarBatchActions,
    ToolbarContent,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarSearch,
  } from 'carbon-components-svelte'
  // declare variables
  let name = ''
  let numero_registre = ''
  let numero_tva = ''
  let insert_error = ''
  let delete_error = ''
  let open = false
  let selectedRowIds = []
  // Set empty texts and actions for intial state
  const company_empty = {
        title: 'Start adding some companies',
        description: 'Your company list is empty. Please click on <strong>Create new company</strong> to start.',
        actionText: 'Create a new company',
        annexe: 'You can also ',
        linkHref: '/contacts',
        linkText: 'create new contact'
    }
  // set table headers
  const companies_headers = [
    // {key: 'id', value: 'ID'},
    {key: 'name', value: 'Name'},
    {key: 'numero_registre', value: 'Unique identifier'},
    {key: 'numero_tva', value: 'VAT number'},
  ]
  // function: create new company
  async function createCompany () {
    // create new company instance
    let newCompany = new Company(name, numero_registre, numero_tva)
    // insert instance to database via class function
    newCompany
      .insert()
      .then(()=>{
        // reset variables
        name = numero_registre = numero_tva =  ''
        // close modal
        open = false
      })
      .catch(error=>{
          insert_error = error
        })
  }
  // function: batch delete companies
  async function deleteCompanies () {
    // iterate through selection
    selectedRowIds.forEach(id => {
      // delete from db related company
      Company
        .deleteById(id)
        .then(()=>{
          // throw back to console for testing
          console.log('%s deleted', id)
        })
        .catch(error=>{
          delete_error = error
          console.log('error on delete: ', error)
        })
    });
    // reset selection after deletion
    selectedRowIds = []
    return
  }

</script>

<svelte:head>
  <title>Companies</title>
</svelte:head>

<h1>Companies</h1>

{#if $Companies == null}
  <InlineLoading description="Fetching data..." />
{:else}
  {#if $Companies.length < 1}
     <EmptyState emptyData={company_empty} bind:modalAddOpen={open}></EmptyState>
  {:else}
    {#if delete_error !== ''}
      <InlineNotification
        kind="error"
        title="Oops"
        subtitle="Something went wrong while deleting your data. {delete_error}"
        on:close={()=>{delete_error=''}} />
    {/if}
    <DataTable batchSelection bind:selectedRowIds headers={companies_headers} rows={$Companies} zebra sortable>
      <Toolbar>
        <ToolbarBatchActions>
          <Button icon={Delete16} on:click={deleteCompanies} >Delete</Button>
        </ToolbarBatchActions>
        <ToolbarContent>
          <ToolbarSearch />
          <ToolbarMenu>
            <ToolbarMenuItem primaryFocus>Companies settings</ToolbarMenuItem>
            <ToolbarMenuItem href="https://github.com/myangga/carbonkit">
              Documentation
            </ToolbarMenuItem>
          </ToolbarMenu>
          <Button icon={Add16} on:click={() => (open = true)}>Create company</Button>
        </ToolbarContent>
      </Toolbar>
    </DataTable>
  {/if}
{/if}

<Modal
  bind:open
  hasForm=true
  hasScrollingContent=true
  shouldSubmitOnEnter=false
  modalHeading="Create new company"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => {open = false}}
  on:open={()=>{}}
  on:close
  on:submit={createCompany}
  >
  {#if (insert_error !== '')}
    <InlineNotification
      kind="error"
      title="Oops"
      subtitle="Something went wrong while inserting data. {insert_error}"
      on:close={()=>{insert_error = ''}} />
  {/if}
  <Form>
    <FormGroup>
      <TextInput labelText="Name" bind:value={name}></TextInput>
    </FormGroup>
    <FormGroup>
      <TextInput labelText="Unique identifier" bind:value={numero_registre}></TextInput>
    </FormGroup>
    <FormGroup>
      <TextInput labelText="VAT number" bind:value={numero_tva}></TextInput>
    </FormGroup>
  </Form>
</Modal>