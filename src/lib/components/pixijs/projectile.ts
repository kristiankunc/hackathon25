import { Assets, Sprite } from "pixi.js";
import Spaceship from "./spaceship";

abstract class Projectile {
    public sprite: Sprite;
    protected speed: number;

    protected constructor(speed: number, posX: number, posY: number, sprite: Sprite) {
        this.speed = speed;
        this.sprite = sprite;

        this.setCenterPos(posX, posY);
    }

    static async create(...args: any[]): Promise<Projectile> {
        throw new Error("Must be implemented by subclasses");
    }

    abstract move(deltaTime: number): void;
    setCenterPos(x: number, y: number) {
        this.sprite.x = x - this.sprite.width / 2;
        this.sprite.y = y - this.sprite.height / 2;
    }
}

class Bullet extends Projectile {
    private constructor(speed: number, posX: number, posY: number, sprite: Sprite) {
        super(speed, posX, posY, sprite);
    }

    static async create(direction: "right" | "left", posX: number, posY: number): Promise<Bullet> {
        const texture = await Assets.load("https://cdn-icons-png.flaticon.com/512/2218/2218103.png");
        const sprite = new Sprite(texture);

        return new Bullet(8 * (direction == "left" ? -1 : 1), posX, posY, sprite);
    }

    move(deltaTime: number) {
        this.sprite.x += this.speed * deltaTime;
    }
}

class MortarShot extends Projectile {
    private xVel: number;
    private yVel: number;

    private constructor(enemy: Spaceship, speed: number, posX: number, posY: number, sprite: Sprite) {
        super(speed, posX, posY, sprite);

        const { x, y } = enemy.getCenterPos()
        const distance = Math.sqrt((x - posX)**2 + (y - posY)**2)
        this.xVel = -(x - posX) / distance * speed
        this.yVel = -(y - posY) / distance * speed
    }

    static async create(enemy: Spaceship, posX: number, posY: number,): Promise<Bullet> {
        const texture = await Assets.load("https://cdn-icons-png.flaticon.com/512/8089/8089316.png");
        const sprite = new Sprite(texture);

        return new MortarShot(enemy, 6, posX, posY, sprite);
    }

    move(deltaTime: number) {
        this.sprite.x += this.xVel;
        this.sprite.y += this.yVel;
    }
}