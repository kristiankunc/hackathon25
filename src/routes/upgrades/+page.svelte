<script lang="ts">
	import UpgradeTree from "$lib/components/UpgradeTree.svelte";
</script>

<main class="mx-auto max-w-7xl px-4 py-6">
	<h1 class="mb-4 text-3xl font-bold text-text">Upgrade Page</h1>
	<p class="mb-4 text-lg text-text">Welcome to the upgrade page. Here you can find options to enhance your experience.</p>

	<div class="flex items-center justify-between">
		<!-- <img src="/images/spaceship.png" alt="Spaceship" class="h-full w-full object-contain" /> -->
		<UpgradeTree />
	</div>
</main>
