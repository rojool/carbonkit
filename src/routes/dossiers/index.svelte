<script>
    import {
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        ToolbarMenu,
        ToolbarMenuItem,
        Button,
    } from "carbon-components-svelte";
</script>

<DataTable
  title="Dossiers"
  description="Your organization's active load balancers."
  headers={[{ key: 'name', value: 'Name' }, { key: 'protocol', value: 'Protocol' }, { key: 'port', value: 'Port' }, { key: 'rule', value: 'Rule' }]}
  rows={[{ id: 'a', name: 'Load Balancer 3', protocol: 'HTTP', port: 3000, rule: 'Round robin' }, { id: 'b', name: 'Load Balancer 1', protocol: 'HTTP', port: 443, rule: 'Round robin' }, { id: 'c', name: 'Load Balancer 2', protocol: 'HTTP', port: 80, rule: 'DNS delegation' }, { id: 'd', name: 'Load Balancer 6', protocol: 'HTTP', port: 3000, rule: 'Round robin' }, { id: 'e', name: 'Load Balancer 4', protocol: 'HTTP', port: 443, rule: 'Round robin' }, { id: 'f', name: 'Load Balancer 5', protocol: 'HTTP', port: 80, rule: 'DNS delegation' }]}
>
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
      <Button>Créer un dossier</Button>
    </ToolbarContent>
  </Toolbar>
</DataTable>