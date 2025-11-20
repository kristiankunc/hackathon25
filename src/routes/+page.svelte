<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import ShipPreview from "$lib/components/pixijs/shipPreview.svelte";
</script>

<div class="flex h-screen flex-col">
	<Header />
	<!-- Render area -->
	<div class="z-0 h-full w-screen" id="render-div">
		<ShipPreview />
	</div>

	<!-- Buttons at bottom -->
	<div class="buttons bottom-0 z-10 flex justify-center gap-4 bg-background p-4">
		<a
			class="button w-1/4 rounded-sm bg-secondary py-4 text-center text-xl font-semibold text-text transition-colors hover:bg-secondary-800"
			href="quests/">Quests</a
		>

		<a
			class="button w-1/4 rounded-sm bg-primary py-4 text-center text-2xl font-semibold text-primary-900 transition-colors hover:bg-primary-400"
			href="game/">1V1</a
		>

		<a
			class="button w-1/4 rounded-sm bg-secondary py-4 text-center text-xl font-semibold text-text transition-colors hover:bg-secondary-800"
			href="upgrades/">Upgrades</a
		>
	</div>
</div>
