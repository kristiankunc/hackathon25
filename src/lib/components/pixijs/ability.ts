import type { Container } from "pixi.js";
import { Bullet, type Projectile } from "./projectile";
import type Spaceship from "./spaceship";

abstract class Ability {
    private readonly COOLDOWN: number;
    private readonly TIMELENGTH: number;
    private readonly FREQUENCY: number;

    private cooldown = 0;
    private timeleft = 0;
    private deltaSinceLastAction = 0;

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
        const bullet = await Bullet.create(enemy, this.playerType == "friendly" ? "right" : "left", this.player.getCenterPos().x, this.player.getCenterPos().y);
        this.projectiles.push(bullet);
        rootContainer.addChild(bullet.sprite)
    }

}

export { Ability, Shoot }