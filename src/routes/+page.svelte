<script lang="ts">
	import ShipPreview from "$lib/components/pixijs/shipPreview.svelte";
</script>

<div class="flex h-screen flex-col">
	<!-- Render area -->
	<div class="static z-0 h-screen w-screen" id="render-div">
		<ShipPreview />
	</div>

	<!-- Buttons at bottom -->
	<div class="buttons static bottom-10 z-10 flex justify-center gap-4 bg-gray-800 py-8">
		<a class="button w-1/4 rounded-lg bg-blue-600 py-4 text-center text-xl font-semibold text-white transition hover:bg-blue-700" href="quests/"
			>Quests</a
		>

		<a class="button w-1/4 rounded-lg bg-green-600 py-4 text-center text-xl font-semibold text-white transition hover:bg-green-700" href="game/"
			>1V1</a
		>

		<a
			class="button w-1/4 rounded-lg bg-purple-600 py-4 text-center text-xl font-semibold text-white transition hover:bg-purple-700"
			href="upgrades/">Upgrades</a
		>
	</div>
</div>
