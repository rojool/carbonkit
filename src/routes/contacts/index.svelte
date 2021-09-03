<script>
  import supabase from '$lib/db';
  import Delete16 from "carbon-icons-svelte/lib/Delete16";
  import {
    InlineLoading,
    InlineNotification,
    Button,
    Modal,
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarBatchActions,
    Form,
    TextInput,
    Select,
    SelectItem,
    Pagination
  } from 'carbon-components-svelte';
  import { Contact } from './contact';

  let newContact = new Contact();
  let submit = false;
  let deletion = false;
  let update = true;
  let open = false;
  let rows = [];

  let contacts_headers = [
    {key: 'gender', value: 'Gender'},
    {key: 'firstname', value: 'Firstname'},
    {key: 'lastname', value: 'Lastname'},
    {key: 'birthdate', value: 'Birthdate'},
    {key: 'email', value: 'Email'},
    {key: 'type', value: 'Type'},
  ];

  let selectedRowIds = [];
  const mySubscription = supabase
    .from('*')
    .on('*', payload => {
      console.log('Change received!', payload)
      if (payload.eventType == 'INSERT') console.log('INSERT')
      if (payload.eventType == 'DELETE') console.log('DELETE')
    })
    .subscribe()

  $: console.table(rows)
  // $: console.log("selectedRowIds", selectedRowIds);

  async function getData() {
    const { data, error } = await supabase
      .from('contacts')
      .select()
      .order('id', { ascending: false })
    if (error) throw new Error(error.message)
    return data
  }

  async function deleteSelectedContacts() {
    update = false
    if (selectedRowIds.length == 0) return
    selectedRowIds.forEach(
      async (currentValue) => {
        console.log(currentValue)
        const { data, error } = await supabase
          .from('contacts')
          .delete()
          .match({id: currentValue})
        if (error) throw new Error(error.message)
        update = true
        return data
      }
    )
    selectedRowIds = []
  }

  async function sendData() {
    update = false
    // remove id for insert
    delete newContact.id;
    const { data, error } = await supabase
    .from('contacts')
    .insert([
      newContact
    ])
    if (error) throw new Error(error.message)
    newContact = new Contact()
    update = true
    return data
  }
</script>

<svelte:head>
  <title>Contacts</title>
</svelte:head>

<h1>Contacts</h1>

{#if submit}
  {#await sendData()}
    <InlineLoading description="Sending data..." />
  {:then data}
    <InlineNotification kind="success" title="Success:" subtitle="Succesfully sent data."  />
  {:catch error}
    <InlineNotification kind="error" title="Error:" subtitle="Something went wrong while sending the data. {error}" />
  {/await}
{/if}

{#if deletion}
  {#await deleteSelectedContacts()}
    <InlineLoading description="Deleting data..." />
  {:then data}
    <InlineNotification kind="success" title="Success:" subtitle="Succesfully deleted data." hideCloseButton=false />
  {:catch error}
    <InlineNotification kind="error" title="Error:" subtitle="Something went wrong while sending the data. {error}" hideCloseButton=false />
  {/await}
{/if}

{#if update}
  {#await getData()}
    <InlineLoading description="Fetching data..." />
  {:then data}
    {#if data.length == 0}
      <InlineNotification kind="info" title="Information" subtitle="No data to display" hideCloseButton=true />
    {:else}
      <DataTable batchSelection bind:selectedRowIds headers={contacts_headers} rows={data}>
        <Toolbar>
          <ToolbarBatchActions>
            <Button icon={Delete16} on:click={() =>{deletion = true; submit = false}}>Delete</Button>
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
            <Button on:click={() => (open = true)}>Create contact</Button>
          </ToolbarContent>
        </Toolbar>
      </DataTable>
      <Pagination totalItems={111} pageSizes={[10, 15, 20]} />
    {/if}
  {:catch error}
    <p>Something went wrong while fetching the data:</p>
    <InlineNotification title="Error:" subtitle={error} hideCloseButton=true />
  {/await}
{/if}

<Modal
  bind:open
  modalHeading="Create contact"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:open={()=>{submit = false; deletion = false;}}
  on:close
  on:submit={() => {submit = true; open = false;}}
>
<Form>
  <InlineNotification kind="warning" title="Warning" subtitle="You can't add rows to database for now. Sorry ;-)" hideCloseButton=true />
  <Select labelText="Gender" bind:selected={newContact.gender}>
    <SelectItem value="Mr" text="Mr" />
    <SelectItem value="Ms" text="Ms" />
  </Select>
  <TextInput labelText="Firstname" placeholder="Firstname..." bind:value={newContact.firstname} required />
  <TextInput labelText="Lastname" placeholder="Lastname..." bind:value={newContact.lastname} required />
  <TextInput labelText="Birth date" placeholder="Birth date..." bind:value={newContact.birthdate} required />
  <TextInput labelText="Email" placeholder="Email..." bind:value={newContact.email} required />
  <Select labelText="Gender" bind:selected={newContact.type}>
    <SelectItem value="Prospect" text="Prospect" />
    <SelectItem value="Client" text="Client" />
    <SelectItem value="Administrative" text="Administrative" />
  </Select>
</Form>
</Modal>