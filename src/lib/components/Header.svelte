<script lang="ts">
	export let data;
	const { user } = data;
</script>

<header class="w-screen bg-background text-text">
	<div class="flex items-center justify-between px-4 py-4">
		<a href="/" class="text-xl font-bold">MySite</a>

		<nav class="flex gap-8">
			<a href="/" class="transition-colors hover:text-accent">Link 1</a>
			<a href="/" class="transition-colors hover:text-accent">Link 2</a>
		</nav>

		<div class="flex items-center gap-4 text-background">
			<div class="flex h-8 items-center gap-1 rounded-full bg-linear-90 from-yellow-400 to-yellow-300 px-3 py-1">
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
