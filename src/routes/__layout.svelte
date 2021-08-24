<script>
    // Import Carbon Design System
    import "carbon-components-svelte/css/all.css";
    import "../app.css";
    import {
        Theme,
        Content,
        Grid,
        Row,
        Column,
    } from "carbon-components-svelte";

    // Import custom components
    import Header from "$lib/Header.svelte";

    // Setup default theme (light = g10 /dark = g100)
    // Can be 'white', 'g10', 'g80', 'g90', 'g100'
    let theme = "g10";
</script>

<svelte:head>
    <title>FS Oversight</title>
</svelte:head>

<Theme bind:theme persist persistKey="__carbon-theme">
    <Header bind:theme={theme} />
    <Content>
        <Grid>
            <Row>
                <Column>
                    <slot />
                </Column>
            </Row>
        </Grid>
    </Content>
</Theme>
