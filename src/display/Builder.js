import React from "react";
import { getComponent } from "../Forge";
import { CAPACITORS, ENGINES, SHIELDS, SHIPSIMS, SENSORS } from "../Data";

export const ShipBuilder = ({ superstructure, capacitor, engine, shield, shipsim, sensor, weapons, modules, mods }) => {
    const cap = getComponent(superstructure, CAPACITORS, capacitor, []);
    const eng = getComponent(superstructure, ENGINES, engine, []);
    const shd = getComponent(superstructure, SHIELDS, shield, []);
    const sim = getComponent(superstructure, SHIPSIMS, shipsim, []);
    const sen = getComponent(superstructure, SENSORS, sensor, []);
    let buildString = `SF MODEL ${superstructure}\n`;
    buildString = buildString + `SF INSTALL CAPACITOR ${cap.id}\n`;
    buildString = buildString + `SF INSTALL ENGINE ${eng.id}\n`;
    buildString = buildString + `SF INSTALL SHIELD ${shd.id}\n`;
    buildString = buildString + `SF INSTALL SHIPSIM ${sim.id}\n`;
    buildString = buildString + `SF INSTALL SENSOR ${sen.id}\n`;
    {
        modules.forEach(({ id }) => {
            buildString = buildString + `SF INSTALL MODULE ${id}\n`;
        })
    }
    {
        weapons.forEach(({ id }) => {
            buildString = buildString + `SF INSTALL MODULE ${id}\n`;
        })
    };
    const modString = mods.map(({ id, level }) => `MOD INSTALL ${id} INTO SHIP AT LEVEL ${level}`).join('\n');
    return (<div id="builder">
        <div id="builder_base" className="builder">{buildString}</div>
        <div id="builder_mods" className="builder">{modString}</div>
    </div>);
};