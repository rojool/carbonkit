<script>
    import {
        Header,
        SideNav,
        SideNavItems,
        SideNavLink,
        SkipToContent,
        HeaderUtilities,
        Toggle
    } from 'carbon-components-svelte';
    import { getContext } from "svelte";

    let isSideNavOpen = false;

    const ctx = getContext("Theme");
    let isdark;
    let toggled;

    const switchTheme = () => {
        var oppositeTheme = (isdark) ? "g10" : "g100"
        ctx.carbon_theme.set(oppositeTheme)
    }

    $: if (ctx) {
        ctx.dark.subscribe((value) => {
            isdark = toggled = value;
        });
    }
</script>

<Header company="SMART" platformName="Carbon Design" href="." bind:isSideNavOpen>
    <div slot="skip-to-content">
        <SkipToContent />
    </div>
    <HeaderUtilities>
        <Toggle size="sm" labelA="Light" labelB="Dark" bind:toggled on:change={switchTheme} />
    </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink text="Contacts" href="contacts" />
        <SideNavLink text="Dossiers" href="dossiers" />
    </SideNavItems>
</SideNav>