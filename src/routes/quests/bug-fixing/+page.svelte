<script lang="ts">
	import Header from "$lib/components/Header.svelte";

	export let data;

	const { name, description, codeSnippet, correctLine, rewardMoney } = data;

	let selectedLine: number | null = null;
	let message = "";

	const lines = codeSnippet.trim().split("\n");

	async function submit() {
		if (selectedLine === null) {
			alert("You have to select a line!");
			return;
		}

		if (selectedLine === correctLine) {
			message = `Správně! Získáváš ${rewardMoney} peněz.`;

			// zavoláme serverovou akci
			const formData = new FormData();
			formData.append("amount", String(rewardMoney));

            const res = await fetch('?/addMoney', { method: 'POST', body: formData });
            const data = await res.json();
            console.log(data.user); // nový stav peněz z DB
            // reloadneme stránku, aby se aktualizoval header
            setTimeout(() => {
                location.reload();
            }, 2000);
		} else {
			message = `Incorrect!`;
		}
	}
</script>

<Header {data} />
<!-- Celá stránka vystředěná -->
<div class="flex w-screen flex-col items-center justify-center p-6 text-text my-10">
	<!-- Nadpis -->
	<h1 class="mb-8 text-center text-4xl font-bold">
		Quest: {name}
	</h1>

	<!-- Popis -->
	<p class="mb-8 max-w-2xl text-center text-lg text-text-200">
		{description}
	</p>

	<!-- Řádky kódu -->
	<div class="w-full max-w-2xl space-y-1 rounded bg-background-950 p-4 text-text">
		{#each lines as line, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="cursor-pointer rounded border border-transparent whitespace-pre transition {selectedLine == i ? 'bg-background-900' : ''}"
				on:click={() => (selectedLine = i)}
			>
				<span class="px-2 text-text-600">{i + 1}</span>
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
