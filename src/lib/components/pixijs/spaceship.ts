import { Assets, Sprite } from "pixi.js";

const spritesData = {
	LASER: {
		texturePath: "/assets/guns/laser.png",
		scale: 0.1,
		invert: true
	},
	MORTAR: {
		texturePath: "/assets/guns/mortar.png",
		scale: 0.075,
		invert: true
	},
	STEN: {
		texturePath: "/assets/guns/smg.png",
		scale: 0.075,
		invert: true
	},
	BOW: {
		texturePath: "/assets/guns/bow.png",
		scale: 0.07,
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
		scale: 0.06,
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

export const slotCoordinates = {
	lWing1: { x: 75, y: 115 },
	lWing2: { x: 130, y: 200 },
	rWing1: { x: 75, y: -115 },
	rWing2: { x: 130, y: -200 },
	engine1: { x: 280, y: 20 },
	engine2: { x: 280, y: -20 },
	centerFront: { x: -300, y: 0 },
	centerMid: { x: -100, y: 0 },
	centerBack: { x: 200, y: 0 }
};

const spriteScaler = 2;

interface ShipAttachment {
	position: (typeof slotCoordinates)[keyof typeof slotCoordinates];
	name: keyof typeof spritesData;
}

class Spaceship {
	type: "friendly" | "enemy";
	spaceship_sprite: Sprite;
	private sprites: Sprite[]; // Used for managing spaceship components
    private speed = 30;
    private movingUp: boolean | undefined;
    private movingDown: boolean | undefined;
    private movingRight: boolean | undefined;
    private movingLeft: boolean | undefined;

	private constructor(type: "friendly" | "enemy", spaceship_sprite: Sprite, sprites: Map<string, Sprite>, config: ShipAttachment[]) {
		this.type = type;
		this.spaceship_sprite = spaceship_sprite;
		this.sprites = Array.from(sprites.values());

		const shipWidth = spaceship_sprite.texture.width;
		const shipHeight = spaceship_sprite.texture.height;
		const offsetX = shipWidth / 2;
		const offsetY = shipHeight / 2;

		for (let i = 0; i < config.length; i++) {
			const attachment = config[i];
			const spriteData = spritesData[attachment.name as keyof typeof spritesData];
			const sprite = sprites.get(attachment.name);

			if (!sprite) continue;

			// Set pivot to center for proper positioning BEFORE adding to parent
			sprite.pivot.x = sprite.texture.width / 2;
			sprite.pivot.y = sprite.texture.height / 2;

			sprite.scale.set(spriteData.scale);
			if (!spriteData.invert && this.type === "friendly") {
				sprite.scale.x *= -1;
			}

			sprite.scale.x *= spriteScaler;
			sprite.scale.y *= spriteScaler;

			// Position relative to spaceship center, accounting for the pivot offset
			sprite.position.set(offsetX + attachment.position.x, offsetY + attachment.position.y);

			// Add to spaceship after all properties are set
			this.spaceship_sprite.addChild(sprite);
		}
	}

	static async create(type: "friendly" | "enemy", config: ShipAttachment[]): Promise<Spaceship> {
		const spaceship_texture = await Assets.load("/assets/ship.png");
		const spaceship_sprite = new Sprite(spaceship_texture);

		// scale the ship down a little
		spaceship_sprite.scale.set(0.5);

		spaceship_sprite.pivot.x = spaceship_texture.width / 2;
		spaceship_sprite.pivot.y = spaceship_texture.height / 2;

		if (type === "friendly") {
			spaceship_sprite.scale.x = -Math.abs(spaceship_sprite.scale.x);
		}

		const sprites = new Map<string, Sprite>();

		for (const attachment of config) {
			const texturePath = spritesData[attachment.name as keyof typeof spritesData].texturePath;
			const sprite = new Sprite(await Assets.load(texturePath));
			sprites.set(attachment.name, sprite);
		}

		return new Spaceship(type, spaceship_sprite, sprites, config);
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
