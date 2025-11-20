<script lang="ts">
	import { onMount } from "svelte";
	import { Application, Assets, Container, Sprite } from "pixi.js";

	onMount(async () => {
		(async () => {
			const parent = <HTMLDivElement>document.getElementById("render-div");
			const app = new Application();

			await app.init({ background: "#1099bb", resizeTo: parent });
			parent.appendChild(app.canvas);

			
			const container = new Container();

			app.stage.addChild(container);

			const texture = await Assets.load("https://i.redd.it/yct20hubfk061.png");

      const spaceship = new Sprite(texture)
      container.addChild(spaceship)
      spaceship.x = app.screen.width / 2 - texture.width / 2
      spaceship.y = app.screen.height / 2 - texture.height / 2

			// Main loop
			app.ticker.add((time) => {
				
			});
		})();
	});
</script>
