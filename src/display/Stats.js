import React from "react";
import { getMods, getComponent, getWeapons, getModules, getPointsUsed, shipStats } from "../Forge";
import { SUPERSTRUCTURES, CAPACITORS, ENGINES, SHIELDS, SHIPSIMS, SENSORS, WEAPONS, MODULES } from "../Data";
import { MOD_PART_TYPES } from "../Mods";

export const ShipDisplay = ({ superstructure, capacitor, engine, shield, shipsim, sensor, weapons, modules, mods }) => {
    const modsWithLevels = getMods(mods);
    const ship = {
        superstructure: getComponent(superstructure, SUPERSTRUCTURES, superstructure, modsWithLevels),
        capacitor: getComponent(superstructure, CAPACITORS, capacitor, modsWithLevels),
        engine: getComponent(superstructure, ENGINES, engine, modsWithLevels),
        shield: getComponent(superstructure, SHIELDS, shield, modsWithLevels),
        shipsim: getComponent(superstructure, SHIPSIMS, shipsim, modsWithLevels),
        sensor: getComponent(superstructure, SENSORS, sensor, modsWithLevels),
        weapons: getWeapons(superstructure, weapons, modsWithLevels),
        modules: getModules(superstructure, modules, modsWithLevels),
        mods: modsWithLevels,
        weaponPoints: getPointsUsed(weapons, WEAPONS),
        modulePoints: getPointsUsed(modules, MODULES),
    };
    const { maxPower, massUsed, powerLeft, thrustRatio, cyclesLeft, maxCycles, health, alphaStrike, dps, totalPrice, overModules, overWeapons, overModded, turnSpeed, modCosts } = shipStats(ship);
    return (<div className="ship">
        <span className="power">Power: <span className="power_left">{powerLeft}</span>/<span className="max_power">{maxPower}</span></span>
        <span className="cycles">Cycles: <span className="cycles_left">{cyclesLeft}</span>/<span className="max_cycles">{maxCycles}</span></span>
        <span className="health">Health: {health.shield + health.hull} (<span className="health_shield">{health.shield}</span>+<span className="health_hull">{health.hull}</span>)</span>
        <span className="alpha_strike">Alpha Strike: {alphaStrike.shieldDamage + alphaStrike.hullDamage} (<span className="alpha_strike_shield">{alphaStrike.shieldDamage}</span> - <span className="alpha_strike_hull">{alphaStrike.hullDamage}</span>)</span>
        <span className="dps">DPS: {(dps.shieldDamage + dps.hullDamage).toFixed(2)} (<span className="dps_shield">{dps.shieldDamage.toFixed(2)}</span> - <span className="dps_hull">{dps.hullDamage.toFixed(2)}</span>)</span>
        <span className="mass">Mass: <span className="mass_used">{massUsed}</span></span>
        <span className="thrust">Thrust Over Mass: <span className="thrust_ratio">{thrustRatio.toFixed(3)}</span></span>
        <span className="turn_speed">Turn Speed: <span className="turn_speed_seconds">{turnSpeed}</span></span>
        <span className="price">Price: <span className="total_price">{totalPrice}</span></span>
        {overModules && <span className="over_modules">TOO MANY MODULES / MODULES TOO LARGE</span>}
        {overWeapons && <span className="over_weapons">TOO MANY WEAPONS / WEAPONS TOO LARGE</span>}
        {overModded && <span className="over_modded">TOO MANY SHIP MODS</span>}
        <div className="mod_costs">
            {MOD_PART_TYPES.map(partType => <div className="mod_costs_header">{partType}</div>)}
            {MOD_PART_TYPES.map(partType => <div className="mod_cost">{modCosts[partType]}</div>)}
        </div>
    </div>);
};