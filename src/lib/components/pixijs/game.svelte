<script lang="ts">
	import { onMount } from "svelte";
	import Spaceship, { buttonSprites, slotCoordinates, type ShipAttachment } from "./spaceship";
	import { Application, Assets, Container, Sprite, Ticker, Graphics } from "pixi.js";
	import type { Projectile } from "./projectile";

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

	async function createHealthBar(options: { x: number; y: number; width: number; height: number }) {
		const { x, y, width, height } = options;

		const barTexture = await Assets.load("/assets/Bar.png");
		const heartTexture = await Assets.load("/assets/Heart.png");

		const container = new Container();

		const emptyBar = new Sprite(barTexture);
		emptyBar.width = width;
		emptyBar.height = height;

		const fillBar = new Graphics();
		fillBar.beginFill(0xff0000);
		fillBar.drawRect(0, 0, width, height);
		fillBar.endFill();

		let icon: Sprite | null = null;
		let offsetX = 0;

		icon = new Sprite(heartTexture);
		icon.width = height;
		icon.height = height;
		icon.x = 0;
		icon.y = 0;

		offsetX = icon.width + 8;
		container.addChild(icon);

		emptyBar.x = offsetX;
		fillBar.x = offsetX;

		container.addChild(fillBar);
		container.addChild(emptyBar);

		container.x = x;
		container.y = y;

		return {
			container,
			setHealth: (value: number) => {
				const pct = Math.max(0, Math.min(1, value));
				fillBar.clear();
				fillBar.beginFill(0xff0000);
				fillBar.drawRect(0, 0, width * pct, height);
				fillBar.endFill();
			}
		};
	}

	function autoPlay(): string {
		// random integer between 0 and 99
		const a = Math.floor(Math.random() * 100);
		switch (a) {
			case 1:
			case 5:
			case 9:
			case 13:
				console.log("AUTOPLAY UP");
				return "w";
			case 2:
			case 6:
			case 10:
			case 14:
				return "a";
			case 3:
				return "s";
			case 4:
				return "d";
			default:
				return "h";
		}
	}

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

			let projectiles: Projectile[] = [];

			const players = [];

			const player = await Spaceship.create("friendly", projectiles, friendlyLoadout);
			const buttonsContainer = await createButtons(app, friendlyLoadout);

			rootContainer.addChild(buttonsContainer);

			const enemy = await Spaceship.create("enemy", projectiles, [
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

			players.push(player, enemy);

			window.addEventListener("keydown", player.keyboardHandler);
			window.addEventListener("keyup", player.keyboardHandler);

			player.spaceship_sprite.position.x = app.screen.width / 10;
			player.spaceship_sprite.position.y = app.screen.height / 2;

			enemy.spaceship_sprite.position.x = app.screen.width - player.spaceship_sprite.position.x;
			enemy.spaceship_sprite.position.y = app.screen.height / 2;

			rootContainer.addChild(player.spaceship_sprite);
			rootContainer.addChild(enemy.spaceship_sprite);

			const playerHealth = await createHealthBar({
				x: 40,
				y: 40,
				width: 250,
				height: 32
			});

			const enemyHealth = await createHealthBar({
				x: app.screen.width - 330,
				y: 40,
				width: 250,
				height: 32
			});

			rootContainer.addChild(playerHealth.container);
			rootContainer.addChild(enemyHealth.container);

			playerHealth.setHealth(player.health / player.MAX_HEALTH);
			enemyHealth.setHealth(enemy.health / enemy.MAX_HEALTH);

			// Main loop
			app.ticker.add((ticker) => {
				player.update(ticker, app.screen.width, app.screen.height, enemy, rootContainer);
				enemy.changeState(new KeyboardEvent("keydown", { key: autoPlay() }), randomBoolean());
				enemy.update(ticker, app.screen.width, app.screen.height, player, rootContainer);
			});
			app.ticker.add((ticker) => {
				projectiles.forEach((projectile, index) => {
					const didHit = projectile.move(ticker.deltaTime);
					if (didHit) {
						projectiles.splice(index, 1);
					}
				});
			});
			app.ticker.add((ticker) => {
				playerHealth.setHealth(player.health / player.MAX_HEALTH);
				enemyHealth.setHealth(enemy.health / enemy.MAX_HEALTH);
			});

			// Cleanup on unmount
			return () => {
				window.removeEventListener("keydown", player.keyboardHandler);
				window.removeEventListener("keyup", player.keyboardHandler);
			};
		})();
	});


	function randomBoolean(): boolean {
		return Math.random() >= 0.5;
	}
</script>
