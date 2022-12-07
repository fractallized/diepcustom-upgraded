/*
    DiepCustom - custom tank game server that shares diep.io's WebSocket protocol
    Copyright (C) 2022 ABCxFF (github.com/ABCxFF)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>
*/

import Barrel from "../Barrel";
import Bullet from "./Bullet";
import Drone from "./Drone";
import { Inputs } from "../../AI";
import { PhysicsFlags, StyleFlags } from "../../../Const/Enums";
import { TankDefinition } from "../../../Const/TankDefinitions";
import { Entity } from "../../../Native/Entity";
import { AI, AIState } from "../../AI";
import { BarrelBase } from "../TankBody";
import AutoTurret from "../AutoTurret";

/**
 * The drone class represents the drone (projectile) entity in diep.
 */
export default class AutoDrone extends Drone implements BarrelBase {
    private turret: AutoTurret;
    public sizeFactor: number;
    public cameraEntity: Entity;
    public inputs = new Inputs();    
    public reloadTime = 15;
    /** The AI of the drone (for AI mode) */
    public ai: AI;

    /** The drone's radius of resting state */
    public static MAX_RESTING_RADIUS = 400 ** 2;

    /** Used let the drone go back to the player in time. */
    protected restCycle = true;


    /** Cached prop of the definition. */
    protected canControlDrones: boolean;

    public constructor(barrel: Barrel, tank: BarrelBase, tankDefinition: TankDefinition | null, shootAngle: number) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.cameraEntity = tank.cameraEntity;
        const autoCannonDef = barrel.definition.bullet.autoCannon ?? {
            angle: 0,
            offset: 0,
            size: 55,
            width: 29.4,
            delay: 0.01,
            reload: 1,
            recoil: 0.3,
            isTrapezoid: false,
            trapezoidDirection: 0,
            addon: null,
            bullet: {
                type: "bullet",
                health: 1,
                damage: 0.3,
                speed: 1.2,
                scatterRate: 1,
                lifeLength: 1,
                sizeRatio: 1,
                absorbtionFactor: 1
            }
        };
        this.sizeFactor = this.physicsData.values.size / 50;
        this.turret = new AutoTurret(this, autoCannonDef);
        this.turret.positionData.values.angle = shootAngle
        this.turret.styleData.values.flags |= StyleFlags.showsAboveParent;
        this.turret.ai.viewRange = 640
        const bulletDefinition = barrel.definition.bullet;

        this.usePosAngle = true;
        
        this.ai = new AI(this);
        this.ai.viewRange = 850 * tank.sizeFactor;
        this.ai.targetFilter = (targetPos) => (targetPos.x - this.tank.positionData.values.x) ** 2 + (targetPos.y - this.tank.positionData.values.y) ** 2 <= this.ai.viewRange ** 2; // (1000 ** 2) 1000 radius
        this.canControlDrones = typeof this.barrelEntity.definition.canControlDrones === 'boolean' && this.barrelEntity.definition.canControlDrones;
        this.physicsData.values.sides = bulletDefinition.sides ?? 3;
        if (this.physicsData.values.flags & PhysicsFlags.noOwnTeamCollision) this.physicsData.values.flags ^= PhysicsFlags.noOwnTeamCollision;
        this.physicsData.values.flags |= PhysicsFlags.onlySameOwnerCollision;
        this.styleData.values.flags &= ~StyleFlags.hasNoDmgIndicator;

        if (barrel.definition.bullet.lifeLength !== -1) {
            this.lifeLength = 88 * barrel.definition.bullet.lifeLength;
        } else {
            this.lifeLength = Infinity;
            if (this.physicsData.values.flags & PhysicsFlags.canEscapeArena) this.physicsData.values.flags ^= PhysicsFlags.canEscapeArena;
        }
        this.deathAccelFactor = 1;

        this.physicsData.values.pushFactor = 4;
        this.physicsData.values.absorbtionFactor = bulletDefinition.absorbtionFactor;

        this.baseSpeed /= 3;
        barrel.droneCount += 1;

        this.ai.movementSpeed = this.ai.aimSpeed = this.baseAccel;
    }

    /** Extends LivingEntity.destroy - so that the drone count decreases for the barrel. */
    public destroy(animate=true) {
        if (!animate) this.barrelEntity.droneCount -= 1;

        super.destroy(animate);
    }

    public tick(tick: number) {
        super.tick(tick);
    }
}