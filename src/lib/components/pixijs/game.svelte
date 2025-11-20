<script lang="ts">
	import { onMount } from "svelte";
	import { Application, Assets, Container, Sprite, Ticker } from "pixi.js";

    const initPixieApp = async () => {
        const parent = <HTMLDivElement>document.getElementById("render-div");
		const app = new Application();

		await app.init({ background: "#1099bb", resizeTo: parent });
		parent.appendChild(app.canvas);

		const container = new Container();
		app.stage.addChild(container);

        return {app, parentContainer: container}
    }

    const gameUpdate = (time: Ticker) => {

    }

	onMount(async () => {
		(async () => {
			const { app, parentContainer } = await initPixieApp()

			


			// Main loop
			app.ticker.add(gameUpdate);
		})();
	});
</script>
