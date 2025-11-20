<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		document.body.classList.add("bg-background");
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
</svelte:head>

<!-- Header je nahoře na každé stránce -->
<!-- <Header /> -->

<!-- Obsah stránek -->
{@render children()}
