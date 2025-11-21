import type { Container, Sprite } from "pixi.js";
import { Bullet, Laser, MortarBall, type Projectile } from "./projectile";
import type Spaceship from "./spaceship";

abstract class Ability {
    protected readonly COOLDOWN: number;
    protected readonly TIMELENGTH: number;
    protected readonly FREQUENCY: number;

    protected cooldown = 0;
    protected timeleft = 0;
    protected deltaSinceLastAction = 0;

    protected player: Spaceship;
    protected playerType: "friendly" | "enemy";

    protected projectiles: Projectile[];

    protected constructor(cooldown: number, timelength: number, frequency: number, player: Spaceship, playerType: "friendly" | "enemy", projectiles: Projectile[]) {
        this.COOLDOWN = cooldown;
        this.TIMELENGTH = timelength;
        this.FREQUENCY = frequency;

        this.player = player;
        this.playerType = playerType;

        this.projectiles = projectiles;
    }

    public isActive() {
        return this.timeleft > 0
    }

    public activate() {
        if (this.cooldown == 0) {
            this.timeleft = this.TIMELENGTH;
            this.cooldown = this.COOLDOWN;
        }
    }

    public tick(deltaMS: number, enemy: Spaceship, rootContainer: Container) {
        if (this.timeleft > 0) {
            this.timeleft -= deltaMS;
            this.deltaSinceLastAction += deltaMS;
            if (this.deltaSinceLastAction > this.FREQUENCY) {
                this.deltaSinceLastAction -= this.FREQUENCY;
                this.action(enemy, rootContainer);
            }
        } else if (this.timeleft < 0) {
            this.timeleft = 0
        }
        if (this.cooldown > 0) {
            this.cooldown -= deltaMS;
        } else if (this.cooldown < 0) {
            this.cooldown = 0
        }
    }

    protected abstract action(enemy: Spaceship, rootContainer: Container): Promise<void>;
}

class Shoot extends Ability {
    constructor(player: Spaceship, playerType: "friendly" | "enemy", projectiles: Projectile[]) {
        super(8, 4, 1, player, playerType, projectiles);
    }

    async action(enemy: Spaceship, rootContainer: Container): Promise<void> {
        const bullet = await Bullet.create(enemy, this.playerType == "friendly" ? "right" : "left", this.player.spaceship_sprite.x, this.player.spaceship_sprite.y);
        this.projectiles.push(bullet);
        rootContainer.addChild(bullet.sprite)
    }

}

class MortarShoot extends Ability {
    constructor(player: Spaceship, playerType: "friendly" | "enemy", projectiles: Projectile[]) {
        super(8, 4, 1, player, playerType, projectiles);
    }

    async action(enemy: Spaceship, rootContainer: Container): Promise<void> {
        console.log("[+] Mortar action")
        const mortarBall = await MortarBall.create(enemy, this.player.spaceship_sprite.x, this.player.spaceship_sprite.y);
        this.projectiles.push(mortarBall);
        rootContainer.addChild(mortarBall.sprite)
    }
}

class LaserBeam extends Ability {
    private laserExists: boolean;
    private sprite: Sprite | undefined;

    constructor(player: Spaceship, playerType: "friendly" | "enemy", projectiles: Projectile[]) {
        super(8, 4, 0, player, playerType, projectiles);
        this.laserExists = false;
    }

    async action(enemy: Spaceship, rootContainer: Container): Promise<void> {
        if (!this.laserExists) {
            this.laserExists = true;
            const laser = await Laser.create(enemy, this.playerType == "friendly" ? "right" : "left", this.player.spaceship_sprite.x, this.player.spaceship_sprite.y, this.player);
            this.projectiles.push(laser);
            rootContainer.addChild(laser.sprite)
            this.sprite = laser.sprite;
        }
    }

    public tick(deltaMS: number, enemy: Spaceship, rootContainer: Container) {
        if (this.timeleft > 0) {
            this.timeleft -= deltaMS;
            this.deltaSinceLastAction += deltaMS;
            if (this.deltaSinceLastAction > this.FREQUENCY) {
                this.deltaSinceLastAction -= this.FREQUENCY;
                this.action(enemy, rootContainer);
            }
        } else if (this.timeleft < 0) {
            this.timeleft = 0
            this.sprite?.destroy()
            this.laserExists = false
        }
        if (this.cooldown > 0) {
            this.cooldown -= deltaMS;
        } else if (this.cooldown < 0) {
            this.cooldown = 0
        }
    }
}

export { Ability, Shoot, MortarShoot, LaserBeam }