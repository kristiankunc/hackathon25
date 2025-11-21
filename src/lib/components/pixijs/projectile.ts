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
		super(enemy, speed, posX, posY - 75, sprite, 10);
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

class MortarBall extends Projectile {
	private xVel: number;
	private yVel: number;

	private constructor(enemy: Spaceship, speed: number, posX: number, posY: number, sprite: Sprite) {
		super(enemy, speed, posX - 45, posY + 80, sprite, 20);

		const x = enemy.spaceship_sprite.x;
		const y = enemy.spaceship_sprite.y;

		const distance = Math.sqrt((x - posX) ** 2 + (y - posY) ** 2);
		this.xVel = ((x - posX) / distance) * speed;
		this.yVel = ((y - posY) / distance) * speed;
	}

	static async create(enemy: Spaceship, posX: number, posY: number): Promise<Bullet> {
		const texture = await Assets.load("https://cdn-icons-png.flaticon.com/512/8089/8089316.png");
		const sprite = new Sprite(texture);
		sprite.setSize(50);

		return new MortarBall(enemy, 6, posX, posY, sprite);
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

class Laser extends Projectile {
	private player: Spaceship;
  private direction: "left" | "right";


	static async create(enemy: Spaceship, direction: "right" | "left", posX: number, posY: number, player: Spaceship): Promise<Laser> {
		const texture = await Assets.load("/assets/guns/laserbeam.png");
		const sprite = new Sprite(texture);
		sprite.setSize(50);
		sprite.width = 1500;

		if (direction == "left") {
			sprite.pivot.x = sprite.width;
		}

		return new Laser(enemy, 0, posX, posY, sprite, player);
	}

	onHit(): void {}

    move(deltaTime: number) {
        if (this.sprite.destroyed) {
            return true
        }

        console.log("[+] Laser move")
        if (this.direction == "right") {
            this.sprite.x = this.player.spaceship_sprite.x - 15;
            this.sprite.y = this.player.spaceship_sprite.y + 30;
        } else if (this.direction == "left") {
            this.sprite.x = this.player.spaceship_sprite.x + 15;
            this.sprite.y = this.player.spaceship_sprite.y + 90;
        }

        if (this.enemy.checkForHit(this.sprite, this.damage)) {
            this.onHit();

            return false;
        }
        return false
    }
    
    onHit(): void {
        
    }
}

export { Projectile, Bullet, MortarBall, Laser };
