<script lang="ts">
	import { onMount } from "svelte";
	import { Application, Assets, Container, Sprite, Graphics } from "pixi.js";

	let slotCoordinates = {
		lWing1: { x: 0, y: 0 },
		lWing2: { x: 0, y: 0 },
		rWing1: { x: 0, y: 0 },
		rWing2: { x: 0, y: 0 },
		engine1: { x: 0, y: 0 },
		engine2: { x: 0, y: 0 },
		centerFront: { x: 0, y: 0 },
		centerMid: { x: 0, y: 0 },
		centerBack: { x: 0, y: 0 }
	};

	onMount(async () => {
		(async () => {
			const parent = <HTMLDivElement>document.getElementById("render-div");
			const app = new Application();

			await app.init({ background: "#1099bb", resizeTo: parent });
			parent.appendChild(app.canvas);

			const container = new Container();

			app.stage.addChild(container);

			const texture = await Assets.load("/assets/ship.png");

			const mySpaceship = new Sprite(texture);
			container.addChild(mySpaceship);
			mySpaceship.scale.set(0.6);
			mySpaceship.scale.x = -mySpaceship.scale.x;

			mySpaceship.anchor.set(0.5);
			mySpaceship.x = 225;
			mySpaceship.y = app.renderer.height / 2;

			slotCoordinates = {
				lWing1: { x: 75, y: 115 },
				lWing2: { x: 130, y: 200 },
				rWing1: { x: 75, y: -115 },
				rWing2: { x: 130, y: -200 },
				engine1: { x: 280, y: 20 },
				engine2: { x: 280, y: -20 },
				centerFront: { x: -300, y: 0 },
				centerMid: { x: -100, y: 0 },
				centerBack: { x: 50, y: 0 }
			};

			// renver a basic green circle at each slot coordinate for debugging
			for (const slot in slotCoordinates) {
				const coord = slotCoordinates[slot];
				const graphics = new Graphics().rect(0, 0, 5, 5);
				graphics.beginFill(0x00ff00);
				graphics.drawCircle(0, 0, 5);
				graphics.endFill();
				// Convert relative coordinates to screen coordinates, accounting for scale and flip
				graphics.x = mySpaceship.x + coord.x * mySpaceship.scale.x;
				graphics.y = mySpaceship.y + coord.y * mySpaceship.scale.y;
				container.addChild(graphics);
			}

			// duplicate the spaceship sprite and flip it horizontally to represent an enemy ship
			const enemySpaceship = new Sprite(texture);
			container.addChild(enemySpaceship);
			enemySpaceship.scale.set(0.6);
			enemySpaceship.anchor.set(0.5);
			enemySpaceship.x = app.renderer.width - 225;
			enemySpaceship.y = app.renderer.height / 2;

			for (const slot in slotCoordinates) {
				const coord = slotCoordinates[slot];
				const graphics = new Graphics().rect(0, 0, 5, 5);
				graphics.beginFill(0xff0000);
				graphics.drawCircle(0, 0, 5);
				graphics.endFill();
				// Convert relative coordinates to screen coordinates, accounting for scale and flip
				graphics.x = enemySpaceship.x + coord.x * enemySpaceship.scale.x;
				graphics.y = enemySpaceship.y + coord.y * enemySpaceship.scale.y;
				container.addChild(graphics);
			}

			app.ticker.add(() => {
				// Add animation logic here if needed
			});
		})();
	});
</script>
