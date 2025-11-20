<script lang="ts">
    import { onMount } from 'svelte';

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

    function submit() {
        if (!selectedImage) {
            alert("Vyber obrázek!");
            return;
        }

        if (selectedImage === fakePicture) {
            message = `Správně! Získáváš ${rewardMoney} peněz.`;
        } else {
            message = `Špatně!`;
        }
    }
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
    <h1 class="text-4xl font-bold mb-6 text-center">Real or Fake: {name}</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-4xl">
        {#each images as image}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="border-4 rounded-lg overflow-hidden cursor-pointer transition"
                class:selected={selectedImage === image}
                on:click={() => selectedImage = image}
            >
                <img 
                    src={`${picturesFilepath.replace(/^\/?static/, '')}/${image}`} 
                    alt={image} 
                    class="w-full h-40 object-cover" 
                />
            </div>
        {/each}
    </div>

    <button
        on:click={submit}
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg transition"
    >
        Submit
    </button>

    <div class="mt-4 text-xl font-semibold h-8">{message}</div>
</div>

<style>
    .selected {
        border-color: #2563eb; /* Tailwind blue-600 */
    }
</style>
