<script>
  import supabase from '$lib/db'
  import {Company} from './company'
  import EmptyState from '$lib/EmptyState.svelte'

  import Delete16 from "carbon-icons-svelte/lib/Delete16"
  import {
    InlineLoading,
    InlineNotification,
    FluidForm,
    TextInput,
    Button,
    Link,
    Modal,
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarBatchActions,
  } from 'carbon-components-svelte'

  let promise = Company.getAllCompanies()
  const subscription = supabase
        .from('companies')
        .on('*', payload => {
          promise = Company.getAllCompanies()
        })
        .subscribe()

  let name = ''
  let numero_registre = ''
  let numero_tva = ''
  let open = false
  let selectedRowIds = []
  const companies_headers = [
    {key: 'id', value: 'ID'},
    {key: 'name', value: 'Name'},
    {key: 'numero_registre', value: 'Numéro Registre du Commerce'},
    {key: 'numero_tva', value: 'Numéro TVA'},
  ]

  async function createCompany () {
    let newCompany = new Company(name, numero_registre, numero_tva)
    newCompany
      .insert()
      .then(()=>{
        name = numero_registre = numero_tva =  ''
        open = false
      })
  }

</script>

<svelte:head>
  <title>Companies</title>
</svelte:head>

<h1>Companies</h1>

{#await promise}
  <InlineLoading description="Fetching data..." />
{:then companies}
  {#if companies.length < 1}
     <EmptyState></EmptyState>
  {:else}
    <DataTable batchSelection bind:selectedRowIds headers={companies_headers} rows={companies}>
      <Toolbar>
        <ToolbarBatchActions>
          <Button icon={Delete16} >Delete</Button>
        </ToolbarBatchActions>
        <ToolbarContent>
          <ToolbarSearch />
          <ToolbarMenu>
            <ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
            <ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
              API documentation
            </ToolbarMenuItem>
            <ToolbarMenuItem danger>Stop all</ToolbarMenuItem>
          </ToolbarMenu>
          <Button on:click={() => (open = true)}>Create company</Button>
        </ToolbarContent>
      </Toolbar>
    </DataTable>
  {/if}
{:catch error}
  <InlineNotification kind="error" title="Error:" subtitle="Something went wrong while fetching data. {error}" />
{/await}

<Modal
  bind:open
  modalHeading="Create company"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => {open = false}}
  on:open={()=>{}}
  on:close
  on:submit={createCompany}
>
<FluidForm>
  <TextInput labelText="Name" bind:value={name}></TextInput>
  <TextInput labelText="Numéro Registre du Commerce" bind:value={numero_registre}></TextInput>
  <TextInput labelText="Numéro TVA" bind:value={numero_tva}></TextInput>
  <!-- <Button type="submit">Add</Button> -->
</FluidForm>
</Modal>