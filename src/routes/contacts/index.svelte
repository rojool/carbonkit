<script>
  // import class and store
  import { Contact, Contacts } from './contact'
  // import empty state control for intial state
  import EmptyState from '$lib/EmptyState.svelte'
  // import icons from CDS
  import Delete16 from 'carbon-icons-svelte/lib/Delete16'
  import Add16 from 'carbon-icons-svelte/lib/Add16'
  // import CDS components required
  import {
    Button,
    DataTable,
    DatePicker,
    DatePickerInput,
    Form,
    FormGroup,
    InlineLoading,
    InlineNotification,
    Modal,
    Select,
    SelectItem,
    TextInput,
    Toolbar,
    ToolbarBatchActions,
    ToolbarContent,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarSearch,
  } from 'carbon-components-svelte'
  // declare variables
  let newContact = new Contact()
  let insert_error = ''
  let delete_error = ''
  let open = false
  let selectedRowIds = []
  // Set empty texts and actions for intial state
  const contact_empty = {
        title: 'Start adding some contacts',
        description: 'Your contact list is empty. Please click on <strong>Create new contact</strong> to start.',
        actionText: 'Create a new contact',
        annexe: 'You can also ',
        linkHref: '/contacts',
        linkText: 'create new contact'
    }
  // set table headers
  let contacts_headers = [
    {key: 'gender', value: 'Gender'},
    {key: 'lastname', value: 'Lastname'},
    {key: 'firstname', value: 'Firstname'},
    {key: 'birthdate', value: 'Birthdate'},
    {key: 'email', value: 'Email'},
    {key: 'type', value: 'Type'},
  ]

  // function: create new contact
  async function createContact() {
    // insert instance to database via class function
    newContact
      .insert()
      .then(()=>{
        // reset variables
        newContact = new Contact()
        // close modal
        open = false
      })
      .catch(error=>{
          insert_error = error
        })
  }
  // function: batch delete companies
  async function deleteContacts () {
    // iterate through selection
    selectedRowIds.forEach(id => {
      // delete from db related contact
      Contact
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
  <title>Contacts</title>
</svelte:head>

<h1>Contacts</h1>

{#if $Contacts == null}
  <InlineLoading description="Fetching data..." />
{:else}
  {#if $Contacts .length < 1}
  <EmptyState emptyData={contact_empty} bind:modalAddOpen={open}></EmptyState>
  {:else}
    {#if delete_error !== ''}
      <InlineNotification
        kind="error"
        title="Oops"
        subtitle="Something went wrong while deleting your data. {delete_error}"
        on:close={()=>{delete_error=''}} />
    {/if}
    <DataTable batchSelection bind:selectedRowIds headers={contacts_headers} rows={$Contacts} zebra sortable>
      <Toolbar>
        <ToolbarBatchActions>
          <Button icon={Delete16} on:click={deleteContacts} >Delete</Button>
        </ToolbarBatchActions>
        <ToolbarContent>
          <ToolbarSearch />
          <ToolbarMenu>
            <ToolbarMenuItem primaryFocus>Contacts settings</ToolbarMenuItem>
            <ToolbarMenuItem href="https://github.com/myangga/carbonkit">
              Documentation
            </ToolbarMenuItem>
          </ToolbarMenu>
          <Button icon={Add16} on:click={() => (open = true)}>Create contact</Button>
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
  modalHeading="Create new contact"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => {open = false}}
  on:open={()=>{}}
  on:close
  on:submit={createContact}
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
        <Select labelText="Gender" bind:selected={newContact.gender}>
          <SelectItem value="" text="Please select a gender" />
          <SelectItem value="Mr" text="Mr" />
          <SelectItem value="Ms" text="Ms" />
        </Select>
      </FormGroup>
      <FormGroup>
        <TextInput labelText="Firstname" placeholder="Firstname..." bind:value={newContact.firstname} required />
      </FormGroup>
      <FormGroup>
        <TextInput labelText="Lastname" placeholder="Lastname..." bind:value={newContact.lastname} required />
      </FormGroup>
      <FormGroup>
        <DatePicker datePickerType="single" on:change bind:value={newContact.birthdate}>
          <DatePickerInput labelText="Birth date" placeholder="mm/dd/yyyy" />
        </DatePicker>
      </FormGroup>
      <FormGroup>
        <TextInput labelText="Email" placeholder="Email..." bind:value={newContact.email} required />
      </FormGroup>
      <FormGroup>
        <Select labelText="Contact type" bind:selected={newContact.type}>
          <SelectItem value="" text="Please select a type" />
          <SelectItem value="Prospect" text="Prospect" />
          <SelectItem value="Client" text="Client" />
          <SelectItem value="Administrative" text="Administrative" />
        </Select>
      </FormGroup>
    </Form>
</Modal>