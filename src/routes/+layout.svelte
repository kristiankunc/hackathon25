<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<!-- Header je nahoře na každé stránce -->
<Header />

<!-- Obsah stránek -->
{@render children()}
