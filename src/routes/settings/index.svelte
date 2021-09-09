<script>
  import {
    Tabs,
    Tab,
    TabContent,
    Tile
  } from "carbon-components-svelte"
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<h1>Settings</h1>

<Tabs>
  <Tab label="Users" />
  <Tab label="Roles" />
  <Tab label="Application" />
  <div slot="content">
    <TabContent>
      <Tile>Oops, page in progress for users...</Tile>
    </TabContent>
    <TabContent>
      <Tile>Oops, page in progress for roles...</Tile>
    </TabContent>
    <TabContent>
      <Tile>Oops, page in progress for application...</Tile>
    </TabContent>
  </div>
</Tabs>