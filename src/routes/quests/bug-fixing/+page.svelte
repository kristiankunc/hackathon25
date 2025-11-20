<script lang="ts">
	import Header from "$lib/components/Header.svelte";

	export let data;

	const { name, description, codeSnippet, correctLine, rewardMoney } = data;

	let selectedLine: number | null = null;
	let message = "";

	const lines = codeSnippet.trim().split("\n");

	function submit() {
		if (selectedLine === null) {
			alert("You have to select a line!");
			return;
		}

		if (selectedLine === correctLine) {
			message = `Correct! You earned ${rewardMoney} coins.`; // TODO: Přidat peníze uživateli
		} else {
			message = `Incorrect!`;
		}
	}
</script>

<Header />
<!-- Celá stránka vystředěná -->
<div class="absolute right-0 bottom-0 -z-10 flex h-screen w-screen flex-col items-center justify-center p-6 text-text">
	<!-- Nadpis -->
	<h1 class="mb-8 text-center text-4xl font-bold">
		Quest: {name}
	</h1>

	<!-- Popis -->
	<p class="mb-8 max-w-2xl text-center text-lg text-text-200">
		{description}
	</p>

	<!-- Řádky kódu -->
	<div class="w-full max-w-2xl space-y-1 rounded bg-background-900 p-4 text-text shadow-xl">
		{#each lines as line, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="cursor-pointer rounded border border-transparent whitespace-pre transition {selectedLine == i ? 'bg-background-800' : ''}"
				on:click={() => (selectedLine = i)}
			>
				<span class="px-2 text-text-600">{i + 1}.</span>
				{line}
			</div>
		{/each}
	</div>

	<!-- Tlačítko -->
	<button
		on:click={submit}
		class="mt-6 rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-background transition-colors hover:bg-primary-600"
	>
		Submit
	</button>

	<!-- Výsledek -->
	<div class="mt-4 h-8 text-xl font-semibold text-text">
		{message}
	</div>
</div>
