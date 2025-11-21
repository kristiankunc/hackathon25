import { Assets, Sprite } from "pixi.js";
import Spaceship from "./spaceship";

abstract class Projectile {
	public sprite: Sprite;
	protected speed: number;
	protected enemy: Spaceship;
	protected damage: number;

	protected constructor(enemy: Spaceship, speed: number, posX: number, posY: number, sprite: Sprite, damage: number) {
		this.speed = speed;
		this.sprite = sprite;
		this.enemy = enemy;
		this.damage = damage;

		this.setCenterPos(posX, posY);
	}

	static async create(...args: any[]): Promise<Projectile> {
		throw new Error("Must be implemented by subclasses");
	}

	abstract move(deltaTime: number): boolean;
	setCenterPos(x: number, y: number) {
		this.sprite.x = x - this.sprite.width / 2;
		this.sprite.y = y - this.sprite.height / 2;
	}

	abstract onHit(): void;
}

class Bullet extends Projectile {
	private constructor(enemy: Spaceship, speed: number, posX: number, posY: number, sprite: Sprite) {
		super(enemy, speed, posX, posY, sprite, 10);
	}

	static async create(enemy: Spaceship, direction: "right" | "left", posX: number, posY: number): Promise<Bullet> {
		const texture = await Assets.load("https://cdn-icons-png.flaticon.com/512/2218/2218103.png");
		const sprite = new Sprite(texture);
		sprite.setSize(50);

		return new Bullet(enemy, 8 * (direction == "left" ? -1 : 1), posX, posY, sprite);
	}

	move(deltaTime: number) {
		this.sprite.x += this.speed * deltaTime;

		if (this.enemy.checkForHit(this.sprite, this.damage)) {
			this.onHit();

			return true;
		}
		return false;
	}

	onHit(): void {
		this.sprite.destroy();
	}
}

class MortarShot extends Projectile {
	private xVel: number;
	private yVel: number;

	private constructor(enemy: Spaceship, speed: number, posX: number, posY: number, sprite: Sprite) {
		super(enemy, speed, posX, posY, sprite, 20);

		const x = enemy.spaceship_sprite.x;
		const y = enemy.spaceship_sprite.y;

		const distance = Math.sqrt((x - posX) ** 2 + (y - posY) ** 2);
		this.xVel = (-(x - posX) / distance) * speed;
		this.yVel = (-(y - posY) / distance) * speed;
	}

	static async create(enemy: Spaceship, posX: number, posY: number): Promise<Bullet> {
		const texture = await Assets.load("https://cdn-icons-png.flaticon.com/512/8089/8089316.png");
		const sprite = new Sprite(texture);

		return new MortarShot(enemy, 6, posX, posY, sprite);
	}

	move(deltaTime: number) {
		this.sprite.x += this.xVel * deltaTime;
		this.sprite.y += this.yVel * deltaTime;

		if (this.enemy.checkForHit(this.sprite, this.damage)) {
			this.onHit();

			return true;
		}
		return false;
	}

	onHit(): void {
		this.sprite.destroy();
	}
}

export { Projectile, Bullet, MortarShot };
