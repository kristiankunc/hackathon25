import { Assets, Sprite, type SpriteOptions } from "pixi.js";

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
            invert: false,
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
    private sprites: Sprite[];

    private slotCoordinates = {
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
        this.sprites = sprites
    }

    static async create(): Promise<Spaceship> {
        const spaceship_texture = await Assets.load("/assets/ship.png");
        const spaceship_sprite = new Sprite(spaceship_texture);

        const sprites: Sprite[] = []

        for (const key in spritesData) {
            const sprite = new Sprite(await Assets.load(spritesData[key as keyof typeof spritesData]))
            sprites.push(sprite)
        }

        return new Spaceship(spaceship_sprite, sprites);
    }
}

export default Spaceship;
