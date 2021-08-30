<script>
  import supabase from '$lib/db';
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
    Form,
    TextInput,
    Select,
    SelectItem,
    Pagination
  } from 'carbon-components-svelte';
  import { Contact } from './contact';

  let newContact = new Contact();
  let submit = false;
  let open = false;

  let contacts_headers = [
    {key: 'gender', value: 'Gender'},
    {key: 'firstname', value: 'Firstname'},
    {key: 'lastname', value: 'Lastname'},
    {key: 'birthdate', value: 'Birthdate'},
    {key: 'email', value: 'Email'},
    {key: 'type', value: 'Type'},
  ];

  async function getData() {
    const { data, error } = await supabase
    .from('contacts')
    .select()
    if (error) throw new Error(error.message)
    // console.log(data)
    return data
  }

  async function sendData() {
    // remove id for insert
    delete newContact.id;
    const { data, error } = await supabase
    .from('contacts')
    .insert([
      newContact
    ])
    if (error) throw new Error(error.message)
    newContact = new Contact()
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
    <InlineNotification kind="success" title="Error:" subtitle="Succesfully sent data." hideCloseButton=false />
  {:catch error}
    <InlineNotification title="Error:" subtitle="Something went wrong while sending the data. {error}" hideCloseButton=false />
  {/await}
{/if}

{#await getData()}
  <InlineLoading description="Fetching data..." />
{:then data}
  {#if data.length == 0}
    <InlineNotification kind="info" title="Information" subtitle="No data to display" hideCloseButton=true />
  {:else}
    <DataTable headers={contacts_headers} rows={data}>
      <Toolbar>
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
    <Pagination totalItems={102} pageSizes={[10, 15, 20]} />
  {/if}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <InlineNotification title="Error:" subtitle={error} hideCloseButton=true />
{/await}

<Modal
  bind:open
  modalHeading="Create contact"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close
  on:submit={() => {submit = true; open = false;}}
>
<Form>
  <InlineNotification kind="warning" title="Warning" subtitle="You can't add rows to database for now. Sorry ;-)" hideCloseButton=true />
  <Select labelText="Gender" selected={newContact.gender}>
    <SelectItem value="Mr" text="Mr" />
    <SelectItem value="Ms" text="Ms" />
  </Select>
  <TextInput labelText="Firstname" placeholder="Firstname..." value={newContact.firstname} required />
  <TextInput labelText="Lastname" placeholder="Lastname..." value={newContact.lastname} required />
  <TextInput labelText="Birth date" placeholder="Birth date..." value={newContact.birthdate} required />
  <TextInput labelText="Email" placeholder="Email..." value={newContact.email} required />
  <Select labelText="Gender" selected={newContact.type}>
    <SelectItem value="Prospect" text="Prospect" />
    <SelectItem value="Client" text="Client" />
    <SelectItem value="Administrative" text="Administrative" />
  </Select>
</Form>
</Modal>