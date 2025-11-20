import { Assets, Sprite } from "pixi.js";

const spritesData = {
	LASER: {
		texturePath: "/assets/guns/laser.png",
		scale: 0.1,
		invert: false
	},
	MORTAR: {
		texturePath: "/assets/guns/mortar.png",
		scale: 0.075,
		invert: true
	},
	STEAM_ENGINE: {
		texturePath: "/assets/engines/steam.webp",
		scale: 0.04,
		invert: false
	},
	SKODA_ENGINE: {
		texturePath: "/assets/engines/skoda.webp",
		scale: 0.06,
		invert: false
	},
	UNITY_ENGINE: {
		texturePath: "/assets/engines/unity.webp",
		scale: 0.05,
		invert: false
	},
	MORAVA_SHIELD: {
		texturePath: "/assets/shields/morava.webp",
		scale: 0.05,
		invert: false
	},
	CECHY_SHIELD: {
		texturePath: "/assets/shields/cechy.webp",
		scale: 0.05,
		invert: false
	},
	SLEZSKO_SHIELD: {
		texturePath: "/assets/shields/slezsko.webp",
		scale: 0.05,
		invert: false
	},
	SLOVENSKO_SHIELD: {
		texturePath: "/assets/shields/slovensko.webp",
		scale: 0.05,
		invert: false
	}
};

class Spaceship {
	spaceship_sprite: Sprite;
	private sprites: Sprite[]; // Used for managing spaceship components
    private speed = 30;
    private movingUp: boolean | undefined;
    private movingDown: boolean | undefined;
    private movingRight: boolean | undefined;
    private movingLeft: boolean | undefined;

	private slotCoordinates = {
		// Coordinates for attaching components
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

	private constructor(spaceship_sprite: Sprite, sprites: Sprite[]) {
		this.spaceship_sprite = spaceship_sprite;
		this.sprites = sprites;
	}

	static async create(type: "friendly" | "enemy"): Promise<Spaceship> {
		const spaceship_texture = await Assets.load("/assets/ship.png");
		const spaceship_sprite = new Sprite(spaceship_texture);

		// set pivot to center
		spaceship_sprite.pivot.x = spaceship_texture.width / 2;
		spaceship_sprite.pivot.y = spaceship_texture.height / 2;

		if (type === "friendly") {
			spaceship_sprite.scale.x = -1;
		}

		const sprites: Sprite[] = [];

		for (const key in spritesData) {
			const texturePath = spritesData[key as keyof typeof spritesData].texturePath;
			const sprite = new Sprite(await Assets.load(texturePath));
			sprites.push(sprite);
		}

		return new Spaceship(spaceship_sprite, sprites);
	}

    changeState(event: KeyboardEvent, type: boolean) {
        console.log("Keybaord event", type)
        switch (event.key) {
            case "w":
                this.movingUp = type
            case "a":
                this.movingLeft = type
            case "s":
                this.movingDown = type
            case "d":
                this.movingRight = type
        }
    }

    keyboardHandler(event: KeyboardEvent) {
        console.log("Keyboard event")
        switch (event.type) {
            case "keydown":
                this.changeState(event, true)
            case "keyup":
                this.changeState(event, false)
        }
    }

    move(deltaTime: number) {
        if (this.movingUp) {
            this.spaceship_sprite.y -= this.speed * deltaTime
        }
        if (this.movingDown) {
            this.spaceship_sprite.y += this.speed * deltaTime
        }
        if (this.movingLeft) {
            this.spaceship_sprite.x -= this.speed * deltaTime
        }
        if (this.movingRight) {
            this.spaceship_sprite.x += this.speed * deltaTime
        }
    }
}

export default Spaceship;
