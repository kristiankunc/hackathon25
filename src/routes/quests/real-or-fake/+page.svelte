<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";

	export let data;

	const { name, rewardMoney, picturesFilepath } = data;
	const fakePicture = "the-fake.jpg";
	const correctImages = ["1.jpg", "2.jpg", "3.jpg"];

	let selectedImage: string | null = null;
	let message = "";
	let images: string[] = [];

	onMount(() => {
		// spojíme a zamícháme jen jednou při mountu komponenty
		images = [...correctImages, fakePicture].sort(() => Math.random() - 0.5);
	});

	async function submit() {
		if (!selectedImage) {
			alert("Vyber obrázek!");
			return;
		}

		if (selectedImage === fakePicture) {
			message = `Správně! Získáváš ${rewardMoney} peněz.`;

			// zavoláme serverovou akci
			const formData = new FormData();
			formData.append("amount", String(rewardMoney));

			const res = await fetch("?/addMoney", { method: "POST", body: formData });
			const data = await res.json();
			console.log(data.user); // nový stav peněz z DB
			// po 2 sekundách reloadneme stránku, aby se aktualizoval header
			setTimeout(() => {
				location.reload();
			}, 2000);
		} else {
			message = `Špatně!`;
		}
	}
</script>

<Header {data} />

<div class="absolute top-0 -z-10 flex h-screen w-screen flex-col items-center justify-center text-text">
	<h1 class="mb-6 text-center text-4xl font-bold">Real or Fake - find the AI generated picture: {name}</h1>

	<div class="mb-8 grid w-full max-w-4xl grid-cols-2 gap-4 rounded-sm bg-background-950 p-8 md:grid-cols-4">
		{#each images as image}
			<button
				class="cursor-pointer overflow-hidden rounded-sm border-4 transition-colors {selectedImage == image
					? 'border-primary'
					: 'border-transparent'}"
				on:click={() => (selectedImage = image)}
			>
				<img src={`${picturesFilepath.replace(/^\/?static/, "")}/${image}`} alt={image} class="h-40 w-full object-cover" />
			</button>
		{/each}
	</div>

	<button on:click={submit} class="rounded-sm bg-primary px-6 py-3 text-lg font-semibold text-background transition hover:bg-primary-600">
		Submit
	</button>

	<div class="mt-4 h-8 text-xl font-semibold">{message}</div>
</div>
