<script lang="ts">
	import { onMount } from "svelte";
	import { Application, Assets, Container, Sprite, Ticker } from "pixi.js";

    const initPixieApp = async () => {
        const parent = <HTMLDivElement>document.getElementById("render-div");
		const app = new Application();

		await app.init({ background: "#000000", resizeTo: parent });
		parent.appendChild(app.canvas);

		const container = new Container();
		app.stage.addChild(container);

        const backgroundTexture = await Assets.load("https://static.vecteezy.com/system/resources/previews/042/056/318/non_2x/8bit-pixel-art-night-sky-game-space-landscape-vector.jpg")
        const backgroundSprite = new Sprite(backgroundTexture)

        container.addChild(backgroundSprite)

        return {app, rootContainer: container}
    }

    const gameUpdate = (time: Ticker) => {

    }

    const createButtons = async (app: Application) => {
        const buttonsContainer = new Container();
        buttonsContainer.eventMode = "static"

        const shieldTexture = await Assets.load("https://cdn-icons-png.flaticon.com/512/19031/19031173.png")
        const shieldButton = new Sprite(shieldTexture)

        const machinegunTexture = await Assets.load("https://cdn-icons-png.flaticon.com/512/7445/7445348.png")
        const machinegunButton = new Sprite(machinegunTexture)

        const laserTexture = await Assets.load("https://cdn-icons-png.flaticon.com/512/7421/7421037.png")
        const laserButton = new Sprite(laserTexture)

        const speedTexture = await Assets.load("https://cdn-icons-png.flaticon.com/512/8146/8146004.png")
        const speedButton = new Sprite(speedTexture)

        const buttons = [shieldButton, machinegunButton, laserButton, speedButton]
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].setSize(90)
            buttons[i].position.x = buttons[i].width * i

            buttonsContainer.addChild(buttons[i])
        }
        
        buttonsContainer.x = app.screen.width - buttonsContainer.width - 30
        buttonsContainer.y = app.screen.height - buttonsContainer.height - 30

        return buttonsContainer
    }

	onMount(async () => {
		(async () => {
			const { app, rootContainer } = await initPixieApp()
            const buttonsContainer = await createButtons(app)

            rootContainer.addChild(buttonsContainer)

			// Main loop
			app.ticker.add(gameUpdate);
		})();
	});
</script>
