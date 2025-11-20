<script lang="ts">
	import { onMount } from "svelte";
	import { Application, Assets, Container, Sprite, Ticker } from "pixi.js";
	import Spaceship, { buttonSprites, slotCoordinates, type ShipAttachment } from "./spaceship";

	const initPixieApp = async () => {
		const parent = <HTMLDivElement>document.getElementById("render-div");
		const app = new Application();

		await app.init({
			background: "#000000",
			width: 1920,
			height: 1080,
			resizeTo: parent
		});
		parent.appendChild(app.canvas);

		const container = new Container();
		app.stage.addChild(container);

		const backgroundTexture = await Assets.load(
			"https://static.vecteezy.com/system/resources/previews/042/056/318/non_2x/8bit-pixel-art-night-sky-game-space-landscape-vector.jpg"
		);
		const backgroundSprite = new Sprite(backgroundTexture);

		container.addChild(backgroundSprite);

		return { app, rootContainer: container, parent };
	};

	const createButtons = async (app: Application, friendlyLoadout: ShipAttachment[]) => {
		const buttonsContainer = new Container();
		buttonsContainer.eventMode = "static";

		// shield attachments
		const shieldAttachments: ShipAttachment[] = friendlyLoadout.filter(
			(attachment) => attachment && attachment.name && attachment.name.endsWith("_SHIELD")
		);

		const buttons = [];

		for (const attachment of shieldAttachments) {
			if (!attachment || !attachment.name) continue;

			switch (attachment.name) {
				case "MORAVA_SHIELD":
					break;
				case "CECHY_SHIELD":
					buttons.push(new Sprite(await Assets.load(buttonSprites.METRO.texturePath)));
					break;
				case "SLEZSKO_SHIELD":
					buttons.push(new Sprite(await Assets.load(buttonSprites.ROBBER.texturePath)));
					break;
				case "SLOVENSKO_SHIELD":
					buttons.push(new Sprite(await Assets.load(buttonSprites.SIX.texturePath)));
			}
		}

		for (let i = 0; i < buttons.length; i++) {
			buttons[i].setSize(90);
			buttons[i].position.x = buttons[i].width * i;

			buttonsContainer.addChild(buttons[i]);
		}

		buttonsContainer.x = app.screen.width - buttonsContainer.width - 30;
		buttonsContainer.y = app.screen.height - buttonsContainer.height - 30;

		return buttonsContainer;
	};

	onMount(async () => {
		(async () => {
			const { app, rootContainer, parent } = await initPixieApp();

			const friendlyLoadout: ShipAttachment[] = [
				{ name: "LASER", position: slotCoordinates.lWing1 },
				{ name: "MORTAR", position: slotCoordinates.lWing2 },
				{ name: "STEN", position: slotCoordinates.rWing1 },
				{ name: "BOW", position: slotCoordinates.rWing2 },
				{ name: "SKODA_ENGINE", position: slotCoordinates.centerBack },
				{ name: "CECHY_SHIELD", position: slotCoordinates.centerFront },
				{
					name: "SLOVENSKO_SHIELD",
					position: slotCoordinates.centerBack
				},
				{
					name: "MORAVA_SHIELD",
					position: slotCoordinates.centerMid
				},
				{
					name: "SLEZSKO_SHIELD",
					position: slotCoordinates.engine1
				}
			];

			const buttonsContainer = await createButtons(app, friendlyLoadout);

			rootContainer.addChild(buttonsContainer);

			const player = await Spaceship.create("friendly", friendlyLoadout);
			const enemy = await Spaceship.create("enemy", [
				{ name: "LASER", position: slotCoordinates.lWing1 },
				{ name: "MORTAR", position: slotCoordinates.lWing2 },
				{ name: "STEN", position: slotCoordinates.rWing1 },
				{ name: "BOW", position: slotCoordinates.rWing2 },
				{
					name: "SKODA_ENGINE",
					position: slotCoordinates.centerBack
				},
				{ name: "MORAVA_SHIELD", position: slotCoordinates.centerFront }
			]);

			window.addEventListener("keydown", player.keyboardHandler);
			window.addEventListener("keyup", player.keyboardHandler);

			player.spaceship_sprite.position.x = app.screen.width / 10;
			player.spaceship_sprite.position.y = app.screen.height / 2;

			enemy.spaceship_sprite.position.x = app.screen.width - player.spaceship_sprite.position.x;
			enemy.spaceship_sprite.position.y = app.screen.height / 2;

			rootContainer.addChild(player.spaceship_sprite);
			rootContainer.addChild(enemy.spaceship_sprite);

			// Main loop
			app.ticker.add((ticker) => {
				player.move(ticker.deltaTime, app.screen.width, app.screen.height);
			});

			// Cleanup on unmount
			return () => {
				window.removeEventListener("keydown", player.keyboardHandler);
				window.removeEventListener("keyup", player.keyboardHandler);
			};
		})();
	});
</script>
