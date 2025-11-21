<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import UpgradeTree from "$lib/components/UpgradeTree.svelte";

	export let data;
</script>

<Header {data} />
<main class="mx-auto max-w-7xl px-4 py-6">
	<h1 class="mb-3 text-3xl font-bold text-text">Upgrade Page</h1>
	<p class="mb-3 text-lg text-text">Welcome to the upgrade page. Here you can build your own ship!</p>

	<div class="mt-25 flex items-center justify-between">
		<!-- <img src="/images/spaceship.png" alt="Spaceship" class="h-full w-full object-contain" /> -->
		<UpgradeTree />
	</div>
</main>
