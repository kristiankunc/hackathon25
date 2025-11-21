<script lang="ts">
	export let left = {
		title: "How to center a div?",
		searches: 50012,
		img: "/images/center-div.png"
	};

	export let right = {
		title: "How to exit from Vim?",
		searches: 110279,
		img: "/images/vim.jpg"
	};

	let selected: "higher" | "lower" | null = null;
</script>

<div class="absolute top-0 -z-10 flex h-screen w-screen flex-col items-center justify-center px-4 text-text">
	<h1 class="mb-6 text-center text-4xl font-bold">Higher or Lower?</h1>

	<div class="mb-8 flex w-full max-w-5xl flex-wrap justify-center gap-6 rounded-sm bg-background-950 p-4 shadow-xl">
		<!-- LEFT CARD -->
		<div class="relative flex max-w-[350px] min-w-[250px] flex-1 overflow-hidden rounded shadow-lg">
			<img src={left.img} alt={left.title} class="h-full w-full object-cover" />
			<div class="absolute inset-0 flex flex-col justify-end bg-black/60 p-4 text-white">
				<h2 class="text-lg font-bold">{left.title}</h2>
				<p class="mt-1 text-sm">{left.searches.toLocaleString()} searches</p>
			</div>
		</div>

		<div class="flex items-center justify-center self-center px-4 text-3xl font-bold text-primary">VS</div>

		<!-- RIGHT CARD -->
		<div class="flex max-w-[350px] min-w-[250px] flex-1 flex-col gap-4">
			<div class="relative overflow-hidden rounded shadow-lg">
				<img src={right.img} alt={right.title} class="h-full w-full object-cover" />
				<div class="absolute inset-0 flex flex-col justify-end bg-black/60 p-4 text-white">
					<h2 class="text-lg font-bold">{right.title}</h2>
					<!-- <p class="mt-1 text-sm">{right.searches.toLocaleString()} searches</p> -->
				</div>
			</div>

			<div class="mt-2 flex justify-center gap-4">
				<button
					class="rounded bg-green-600 px-4 py-2 text-lg font-semibold text-white transition hover:bg-green-700"
					on:click={() => (selected = "higher")}
				>
					Higher
				</button>
				<button
					class="rounded bg-red-600 px-4 py-2 text-lg font-semibold text-white transition hover:bg-red-700"
					on:click={() => (selected = "lower")}
				>
					Lower
				</button>
			</div>

			{#if selected}
				<div class="mt-2 text-center text-xl font-bold text-primary">
					You chose: {selected.toUpperCase()}
				</div>
			{/if}
		</div>
	</div>
</div>
