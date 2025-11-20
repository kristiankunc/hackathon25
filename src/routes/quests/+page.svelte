<script lang="ts">
	import { goto } from "$app/navigation";
	import Header from "$lib/components/Header.svelte";

	export let data;
</script>

<Header {data} />
<div class="absolute right-0 bottom-0 -z-10 flex h-screen w-screen flex-col items-center justify-center p-6 text-text">
	<!-- Nadpis -->
	<h1 class="mb-8 text-center text-5xl font-bold">Quests</h1>

	<!-- Seznam questů -->
	<div class="w-full max-w-md space-y-4 rounded-sm bg-background-950 p-6">
		<button
			onclick={() => goto("quests/bug-fixing")}
			class="w-full rounded-sm bg-primary p-4 font-semibold text-background transition-colors hover:bg-primary-600"
		>
			Bug Fixing Quest
		</button>
		<button
			onclick={() => goto("quests/real-or-fake")}
			class="w-full rounded-sm bg-primary p-4 font-semibold text-background transition-colors hover:bg-primary-600"
		>
			Real or Fake
		</button>
	</div>
</div>
