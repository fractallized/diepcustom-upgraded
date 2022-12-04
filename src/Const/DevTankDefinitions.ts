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

import { PI2 } from "../util";
import { TankDefinition } from "./TankDefinitions";

/**
 * The IDs for all the dev tanks, by name.
 */
export const enum DevTank {
    Developer = -1,
    UsainBolt = -2,
    BigBoi = -3,
    Bouncy = -4,
    Master = -5,
    Musketeer = -6,
    Squirrel = -7,
    Shotgun = -8,
    Flamethrower = -9,
    Builder = -10,
    Goodbye = -11,
    Spectator = -12,
    TheCroc = -13,
    Railgun = -14,
    Nightmare = -15,
    Overpowered = -16
};

/**
 * List of all dev tank definitions.
*/
const DevTankDefinitions: TankDefinition[] = [
    {
        id: DevTank.Developer,
        name: "Overpowered",
        upgradeMessage: "Go wild",
        // upgrades dont have any affect
        upgrades: [],
        barrels: [
            {
                angle: 0,
                delay: 0,
                size: 85,
                offset: 0,
                recoil: 0,
                addon: "trapLauncher",
                bullet: {
                    type: "engineer",
                    speed: 10,
                    damage: 4,
                    health: 10,
                    scatterRate: 0.01,
                    lifeLength: 8,
                    absorbtionFactor: 1,
                    sizeRatio: 1,
                    autoCannon: {
                        "angle": 0,
                        "offset": 0,
                        "size": 55,
                        "width": 29.4,
                        "delay": 0,
                        "reload": 2,
                        "recoil": 0,
                        "isTrapezoid": false,
                        "trapezoidDirection": 0,
                        "addon": null,
                        "bullet": {
                            "type": "bullet",
                            "sizeRatio": 1,
                            "health": 2,
                            "damage": 1,
                            "speed": 0.8,
                            "scatterRate": 1,
                            "lifeLength": 0.6,
                            "absorbtionFactor": 1
                        }
                    }
                },
                reload: 1.5,
                width: 50,
                isTrapezoid: true,
                trapezoidDirection: Math.PI
            },
            {
                "angle": 2.0943951023931953,
                "offset": 0,
                "size": 70,
                "width": 42,
                "delay": 0,
                "reload": 6,
                "recoil": 1,
                "isTrapezoid": true,
                "trapezoidDirection": 0,
                "addon": null,
                "droneCount": 3,
                "canControlDrones": true,
                "bullet": {
                    "type": "autodrone",
                    "sizeRatio": 1,
                    "health": 2,
                    "damage": 10,
                    "speed": 2,
                    "scatterRate": 1,
                    "lifeLength": -1,
                    "absorbtionFactor": 1
                }
            },
            {
                "angle": 4.1887902047863905,
                "offset": 0,
                "size": 70,
                "width": 42,
                "delay": 0,
                "reload": 6,
                "recoil": 1,
                "isTrapezoid": true,
                "trapezoidDirection": 0,
                "addon": null,
                "droneCount": 3,
                "canControlDrones": true,
                "bullet": {
                    "type": "autodrone",
                    "sizeRatio": 1,
                    "health": 2,
                    "damage": 10,
                    "speed": 2,
                    "scatterRate": 1,
                    "lifeLength": -1,
                    "absorbtionFactor": 1
                }
            }
        ],
        levelRequirement: 45,
        fieldFactor: .75,
        speed: 1.5,
        absorbtionFactor: 1,
        flags: {
            invisibility: true,
            zoomAbility: false,
            devOnly: true
        },
        visibilityRateShooting: 0.1,
        visibilityRateMoving: 0,
        invisibilityRate: 0.2,
        preAddon: null,
        postAddon: "overdrive",
        maxHealth: 50,
        borderWidth: 15,
        sides: 1,
        stats: [
            {
                name: "Movement Speed",
                max: 9
            },
            {
                name: "Reload",
                max: 9
            },
            {
                name: "Bullet Damage",
                max: 9
            },
            {
                name: "Bullet Penetration",
                max: 9
            },
            {
                name: "Bullet Speed",
                max: 9
            },
            {
                name: "Body Damage",
                max: 9
            },
            {
                name: "Max Health",
                max: 9
            },
            {
                name: "Health Regen",
                max: 9
            }
        ]
    }
]

export default DevTankDefinitions;
// export const DevTankCount = DevTankDefinitions.reduce((a, b) => b ? a + 1 : a, 1);
