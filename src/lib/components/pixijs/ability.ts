import type Spaceship from "./spaceship";

abstract class Ability {
    private readonly COOLDOWN: number;
    private readonly TIMELENGTH: number;
    private readonly FREQUENCY: number;

    private cooldown = 0;
    private timeleft = 0;
    private deltaSinceLastAction = 0;

    protected player: Spaceship;

    protected constructor(cooldown: number, timelength: number, frequency: number, player: Spaceship) {
        this.COOLDOWN = cooldown;
        this.TIMELENGTH = timelength;
        this.FREQUENCY = frequency;

        this.player = player;
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

    public tick(deltaMS: number) {
        if (this.timeleft > 0) {
            this.timeleft -= deltaMS;
            this.deltaSinceLastAction += deltaMS;
            if (this.deltaSinceLastAction > this.FREQUENCY) {
                this.deltaSinceLastAction -= this.FREQUENCY;
                this.action();
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

    action() {
        throw new Error("Must be implemented by subclasses");
    }
}