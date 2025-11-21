<script lang="ts">
	import { onMount } from "svelte";
	import { Application, Assets, Container, Sprite, type SpriteOptions } from "pixi.js";

	let sprites = {
		SPACESHIP: {
			texturePath: "/assets/ship.png",
			scale: 0.6,
			invert: true,
			texture: null as SpriteOptions | null
		},
		LASER: {
			texturePath: "/assets/guns/laser.png",
			scale: 0.1,
			invert: false,
			texture: null as SpriteOptions | null
		},
		MORTAR: {
			texturePath: "/assets/guns/mortar.png",
			scale: 0.075,
			invert: true,
			texture: null as SpriteOptions | null
		},

		STEAM_ENGINE: {
			texturePath: "/assets/engines/steam.webp",
			scale: 0.04,
			invert: false,
			texture: null as SpriteOptions | null
		},
		SKODA_ENGINE: {
			texturePath: "/assets/engines/skoda.webp",
			scale: 0.06,
			invert: false,
			texture: null as SpriteOptions | null
		},
		UNITY_ENGINE: {
			texturePath: "/assets/engines/unity.webp",
			scale: 0.05,
			invert: false,
			texture: null as SpriteOptions | null
		},
		MORAVA_SHIELD: {
			texturePath: "/assets/shields/morava.webp",
			scale: 0.05,
			invert: false,

			texture: null as SpriteOptions | null
		},
		CECHY_SHIELD: {
			texturePath: "/assets/shields/cechy.webp",
			scale: 0.05,
			invert: false,

			texture: null as SpriteOptions | null
		},
		SLEZSKO_SHIELD: {
			texturePath: "/assets/shields/slezsko.webp",
			scale: 0.05,
			invert: false,

			texture: null as SpriteOptions | null
		},
		SLOVENSKO_SHIELD: {
			texturePath: "/assets/shields/slovensko.webp",
			scale: 0.05,
			invert: false,
			texture: null as SpriteOptions | null
		}
	};

	onMount(async () => {
		(async () => {
			const parent = <HTMLDivElement>document.getElementById("render-div");
			const app = new Application();

			// Initialize the application
			await app.init({ background: "#fafafe", resizeTo: parent });

			const bgTexture = await Assets.load("/assets/bg.jpg");
			const bg = new Sprite(bgTexture);
			bg.alpha = 0.5;

			// scale background to fill the entire renderer
			bg.width = app.renderer.width;
			bg.height = app.renderer.height;

			app.stage.addChildAt(bg, 0); // put background at the bottom

			// Append the application canvas to the document body
			parent.appendChild(app.canvas);

			const container = new Container();

			app.stage.addChild(container);

			for (const key in sprites) {
				const spriteInfo = sprites[key as keyof typeof sprites];
				spriteInfo.texture = await Assets.load(spriteInfo.texturePath);
			}

			const mySpaceship = new Sprite(sprites.SPACESHIP.texture!);
			container.addChild(mySpaceship);
			mySpaceship.scale.set(0.6);
			mySpaceship.scale.x = -mySpaceship.scale.x;

			mySpaceship.anchor.set(0.5);
			mySpaceship.x = 225;
			mySpaceship.y = app.renderer.height / 2;

			const slotCoordinates = {
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

			// Test all sprites at slot positions on the spaceship
			const slotKeys = Object.keys(slotCoordinates) as Array<keyof typeof slotCoordinates>;
			const spriteKeys = Object.keys(sprites).filter((key) => key !== "SPACESHIP" && key !== "LASER") as Array<keyof typeof sprites>;

			// Shuffle sprite keys for random order
			const shuffledSpriteKeys = [...spriteKeys].sort(() => Math.random() - 0.5);

			shuffledSpriteKeys.forEach((spriteKey, index) => {
				const spriteInfo = sprites[spriteKey];
				const slot = slotKeys[index % slotKeys.length];
				const coord = slotCoordinates[slot];

				const part = new Sprite(spriteInfo.texture!);
				part.anchor.set(0.5);
				part.scale.set(spriteInfo.scale);

				if (spriteInfo.invert) {
					part.scale.x *= Math.sign(mySpaceship.scale.x);
				}

				// IMPORTANT: positions are relative to the spaceship’s center
				part.x = coord.x;
				part.y = coord.y;

				// ADD PART TO SPACESHIP, NOT TO CONTAINER
				mySpaceship.addChild(part);
			});

			let vx = 5;
			app.ticker.add(() => {
				// Add animation logic here if needed
				mySpaceship.x += vx;

				// bounce off screen edges
				const right = app.renderer.width - mySpaceship.width * 0.5;
				console.log(right);

				if (mySpaceship.x > right + 500) mySpaceship.x = -200;
			});
		})();
	});
</script>
