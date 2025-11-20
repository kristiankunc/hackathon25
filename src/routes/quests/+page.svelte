<script lang="ts">
    export let data;

    const { name, description, codeSnippet, correctLine, rewardMoney } = data;

    let selectedLine: number | null = null;
    let message = "";

    const lines = codeSnippet.trim().split('\n');

    function submit() {
        if (selectedLine === null) {
            alert("Musíš vybrat řádek!");
            return;
        }

        if (selectedLine === correctLine) {
            message = `Správně! Získáváš ${rewardMoney} peněz.`; // TODO: Přidat peníze uživateli
        } else {
            message = `Špatně!`;
        }
    }
</script>

<!-- Celá stránka vystředěná -->
<div class="min-h-screen flex flex-col items-center justify-center text-white p-6">

    <!-- Nadpis -->
    <h1 class="text-4xl font-bold mb-8 text-center">
        Quest: {name}
    </h1>

    <!-- Popis -->
    <p class="text-lg text-gray-300 max-w-2xl text-center mb-8">
        {description}
    </p>

    <!-- Řádky kódu -->
    <div class="bg-gray-800 text-white rounded p-4 space-y-1 w-full max-w-2xl shadow-xl">
        {#each lines as line, i}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="cursor-pointer rounded transition border border-transparent whitespace-pre"
                class:selected={selectedLine === i}
                on:click={() => (selectedLine = i)}
            >
                <span class="text-gray-500 pr-2">{i + 1}.</span> {line}
            </div>
{/each}

    </div>

    <!-- Tlačítko -->
    <button
        on:click={submit}
        class="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg transition"
    >
        Submit
    </button>

    <!-- Výsledek -->
    <div class="mt-4 text-xl font-semibold h-8">
        {message}
    </div>
</div>

<style>
    .selected {
        background-color: #1e40af; /* Tailwind blue-800 */
    }
</style>
