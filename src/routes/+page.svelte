<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import ShipPreview from "$lib/components/pixijs/shipPreview.svelte";
</script>

<div class="flex h-screen flex-col">
	<Header />
	<!-- Render area -->
	<div class="h-full w-screen" id="render-div">
		<ShipPreview />
	</div>

	<!-- Buttons at bottom -->
	<div class="bottom-0 flex items-end justify-center gap-4 bg-background p-4">
		<a
			class="h-min w-1/6 rounded-sm bg-secondary py-2 text-center text-xl font-semibold text-secondary-200 transition-colors hover:bg-secondary-800"
			href="quests/">Quests</a
		>

		<a
			class="h-min w-1/4 rounded-sm bg-primary py-4 text-center text-4xl font-semibold text-primary-900 transition-colors hover:bg-primary-600"
			href="game/"><span class="material-symbols-outlined mr-2">swords</span>1v1</a
		>

		<a
			class="h-min w-1/6 rounded-sm bg-secondary py-2 text-center text-xl font-semibold text-secondary-200 transition-colors hover:bg-secondary-800"
			href="upgrades/">Upgrades</a
		>
	</div>
</div>
