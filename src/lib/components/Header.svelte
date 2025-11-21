<script lang="ts">
	export let data;
	const { user } = data;
</script>

<header class="w-screen bg-background-950 text-text">
	<div class="flex w-full items-center justify-between px-4 py-4">
		<a href="/" class="flex items-center text-xl font-bold">
			<span class="material-symbols-outlined mr-2">rocket_launch</span>
			CodeShips</a
		>

		<nav class="absolute left-1/2 z-10 flex -translate-x-1/2 justify-center gap-4">
			<a href="/quests" class="transition-colors hover:text-accent">Quests</a>
			<a href="/" class="transition-colors hover:text-accent">About</a>
		</nav>

		<div class="flex items-center gap-4 text-background">
			<div class="flex h-8 items-center gap-1 rounded-full bg-linear-90 from-yellow-400 to-yellow-500 px-3 py-1">
				<span class="material-symbols-outlined text-background">paid</span>
				<span class="text-sm font-semibold">{user.money}</span>
			</div>
			<div class="flex h-8 items-center rounded-full bg-primary px-3 py-1">
				<div class="flex items-center gap-1 text-sm">
					<span class="leading-none font-semibold">{user.points}</span>
					<span class="text-xs">pts</span>
				</div>
			</div>

			<a href="/profile" aria-label="Profile" class="material-symbols-outlined text-text"> person </a>
		</div>
	</div>
</header>
