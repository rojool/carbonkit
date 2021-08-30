<script>
    import { Tile, Row, Column } from "carbon-components-svelte";
    import { BarChartSimple } from "@carbon/charts-svelte";
    import "@carbon/charts/styles.min.css";
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>

<Row>
    <Column>
        <Tile>
            <BarChartSimple
            data={[
                { group: "Qty", value: 65000 },
                { group: "More", value: 29123 },
                { group: "Sold", value: 35213 },
                { group: "Restocking", value: 51213 },
                { group: "Misc", value: 16932 },
                ]}
                options={{
                    title: "Simple bar (discrete)",
                    height: "400px",
                    axes: {
                        left: { mapsTo: "value" },
                        bottom: { mapsTo: "group", scaleType: "labels" },
                    },
                }}
                />
        </Tile>
    </Column>
</Row>