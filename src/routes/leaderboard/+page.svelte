<script lang="ts">
	import Header from "$lib/components/Header.svelte";

	export let data;
	const { users } = data;

	const shields = ["/assets/shields/cechy.webp", "/assets/shields/morava.webp", "/assets/shields/slezsko.webp", "/assets/shields/slovensko.webp"];

	import { onMount, onDestroy } from "svelte";
	const target = new Date("2025-11-23T18:30");
	let remaining = "";
	let timer: ReturnType<typeof setInterval>;

	function update() {
		const diff = target.getTime() - Date.now();
		if (diff <= 0) {
			remaining = "Reset now";
			clearInterval(timer);
			return;
		}
		const s = Math.floor(diff / 1000) % 60;
		const m = Math.floor(diff / 60000) % 60;
		const h = Math.floor(diff / 3600000) % 24;
		const d = Math.floor(diff / 86400000);
		remaining = `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
	}

	onMount(() => {
		update();
		timer = setInterval(update, 1000);
	});

	let shieldsForUsers: string[] = [];

	onMount(() => {
		const pool = shields.length > 1 ? shields.slice(1) : shields;
		const arr = users.map((_, i) => {
			if (i === 0) return shields[0];
			// use crypto.getRandomValues for high-quality client-side randomness
			const r = crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff;
			return pool[Math.floor(r * pool.length)];
		});
		shieldsForUsers = arr;
	});

	onDestroy(() => clearInterval(timer));
</script>

<Header {data} />
<main class="mx-auto max-w-7xl px-4 py-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="mb-3 text-3xl font-bold text-text">Leaderboard</h1>
			<p class="mb-3 text-lg text-text">Check out the top coders in the community!</p>
		</div>

		<div>
			<h2 class="font-bold">
				Next reset date:
				<span class="font-normal">{target.toLocaleString()}</span>
			</h2>
			<span title={target.toISOString()}></span>
			<div class="mt-1 text-text">Countdown: {remaining}</div>
		</div>
	</div>

	{#if shieldsForUsers.length}
		{#each users as user, index}
			<div class="mb-2 flex items-center justify-between rounded-lg bg-background-800 p-4">
				<div class="flex items-center gap-4">
					<img src={shieldsForUsers[index]} alt="shield" class="h-10 w-10 rounded" />
					<span class="text-xl font-bold">{index + 1}.</span>
					<span class="text-lg font-semibold">{user.name}</span>
				</div>
				<div class="flex items-center gap-4">
					<span class="text-sm font-medium">Points: {user.points}</span>
				</div>
			</div>
		{/each}
	{:else}
		<div class="text-text">Loading leaderboard...</div>
	{/if}
</main>
