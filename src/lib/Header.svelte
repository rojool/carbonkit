<script>
    // Get SvelteKit stores
    import { page } from '$app/stores';

    // Import Carbon Design System
    import {
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderUtilities,
        HeaderSearch,
        HeaderGlobalAction,
        SideNav,
        SideNavItems,
        SideNavLink,
        SideNavDivider,
    } from "carbon-components-svelte";

    // Icons
    import Dashboard16 from "carbon-icons-svelte/lib/Dashboard16";
    import GatewayUserAccess16 from "carbon-icons-svelte/lib/GatewayUserAccess16";
    import Task16 from "carbon-icons-svelte/lib/Task16";
    import FlowConnection16 from "carbon-icons-svelte/lib/FlowConnection16";
    import DataFormat16 from "carbon-icons-svelte/lib/DataFormat16";
    import Wallet16 from "carbon-icons-svelte/lib/Wallet16";
    import Product16 from "carbon-icons-svelte/lib/Product16";
    import Enterprise16 from "carbon-icons-svelte/lib/Enterprise16";
    import Collaborate16 from "carbon-icons-svelte/lib/Collaborate16";
    import ReportData16 from "carbon-icons-svelte/lib/ReportData16";
    import MessageQueue16 from "carbon-icons-svelte/lib/MessageQueue16";
    import Settings16 from "carbon-icons-svelte/lib/Settings16";
    import UserAvatar16 from "carbon-icons-svelte/lib/UserAvatar16";
    import GroupAccount16 from "carbon-icons-svelte/lib/GroupAccount16";

    import NotificationOff20 from "carbon-icons-svelte/lib/NotificationOff20";
    import Sun20 from "carbon-icons-svelte/lib/Sun20";
    import Moon20 from "carbon-icons-svelte/lib/Moon20";

    // Variables
    export let theme;
    let isSideNavOpen = false;

    // Functions
    function switchTheme () {
        theme == 'g10' ? theme = 'g100' : theme = 'g10'
    }

</script>

<Header company="Carbon" platformName="Kit" href="/" bind:isSideNavOpen>

    <HeaderNav>
        <HeaderNavItem href="/profile" text="Contoso / John Smith" />
    </HeaderNav>

    <HeaderUtilities>
        <HeaderSearch />
        <HeaderGlobalAction aria-label="Alert" icon={NotificationOff20} />
        <HeaderGlobalAction aria-label="Theme" icon={theme=='g10'?Sun20:Moon20} on:click={switchTheme} />
      </HeaderUtilities>

</Header>

<SideNav bind:isOpen={isSideNavOpen} class="overlay">
    <SideNavItems>
        <SideNavLink icon={Dashboard16} text="Dashboard" href="/dashboard" isSelected={$page.path == '/dashboard'} />
        <SideNavLink icon={GatewayUserAccess16} text="Activities" href="/activities" isSelected={$page.path == '/activities'} />
        <SideNavDivider />
        <SideNavLink icon={Wallet16} text="Leads" href="/leads" isSelected={$page.path == '/leads'} />
        <SideNavLink icon={Enterprise16} text="Companies" href="/companies" isSelected={$page.path == '/companies'} />
        <SideNavLink icon={Collaborate16} text="Contacts" href="/contacts" isSelected={$page.path == '/contacts'} />
        <SideNavDivider />
        <SideNavLink icon={DataFormat16} text="Campaigns" href="/campaigns" isSelected={$page.path == '/campaigns'} />
        <SideNavLink icon={Task16} text="Tasks" href="/tasks" isSelected={$page.path == '/tasks'} />
        <SideNavLink icon={FlowConnection16} text="Workflows" href="/workflows" isSelected={$page.path == '/workflows'} />
        <SideNavDivider />
        <SideNavLink icon={ReportData16} text="Reports" href="/reports" isSelected={$page.path == '/reports'} />
        <SideNavDivider />
        <SideNavLink icon={MessageQueue16} text="System queue" href="/queue" isSelected={$page.path == '/queue'} />
        <SideNavLink icon={Settings16} text="Global settings" href="/settings" isSelected={$page.path == '/settings'} />
        <SideNavDivider />
        <SideNavLink icon={UserAvatar16} text="Profile" href="/profile" isSelected={$page.path == '/profile'} />
        <SideNavLink icon={GroupAccount16} text="Account" href="/account" isSelected={$page.path == '/account'} />
    </SideNavItems>
</SideNav>
