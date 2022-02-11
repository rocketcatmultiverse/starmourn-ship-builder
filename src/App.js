import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SUPERSTRUCTURES, CAPACITORS, ENGINES, SHIELDS, SHIPSIMS, SENSORS, WEAPONS, MODULES, SHIP_MODS } from './Data';
import { getComponent, getModules, getWeapons, getPointsUsed, shipStats, getModPointsUsed, getMods } from './Forge';
import { modify, MOD_PART_TYPES, getValidMods } from './Mods';
import { ModulesSelection } from './simple_select/Modules';
import { Capacitor, Engine, Shield, Shipsim, Sensor, ComponentSelection } from './simple_select/Components';
import { SuperstructureSelection } from './simple_select/Superstructures';
import { ModsSelection } from './simple_select/Mods';
import { ShipDisplay } from './display/Stats';
import { ShipBuilder } from './display/Builder';
import { getDefaultState, simplify } from './Bookmark';

const SHIP_DEFAULT = {
	Interceptor: '20',
	Corvette: '6',
	Destroyer: '15',
	Cruiser: '14',
	Battleship: '4',
	Freighter: '29',
	Superhauler: '32',
};

function App() {
	const [settings, baseSetSettings] = useState(getDefaultState());
	const setSettings = (newSettings) => {
		window.history.replaceState(null, '', '?' + JSON.stringify(simplify(newSettings)));
		baseSetSettings(newSettings);
	};
	const setSsType = (ssType) => (setSettings({
		...settings,
		ssType,
		superstructure: SHIP_DEFAULT[ssType],
	}));
	const setSuperstructure = (superstructure) => (setSettings({
		...settings,
		superstructure,
	}));
	const setCapacitor = (capacitor) => (setSettings({
		...settings,
		capacitor,
	}));
	const setEngine = (engine) => (setSettings({
		...settings,
		engine,
	}));
	const setShield = (shield) => (setSettings({
		...settings,
		shield,
	}));
	const setShipsim = (shipsim) => (setSettings({
		...settings,
		shipsim,
	}));
	const setSensor = (sensor) => (setSettings({
		...settings,
		sensor,
	}));
	const setModules = (modules) => (setSettings({
		...settings,
		modules,
	}));
	const setWeapons = (weapons) => (setSettings({
		...settings,
		weapons,
	}));
	const setMods = (mods) => (setSettings({
		...settings,
		mods,
	}));
	const {
		ssType, superstructure, capacitor, engine, shield, shipsim, sensor, modules, weapons, mods,
	} = settings;
	const modsWithLevels = getMods(mods);
	const ship = {
		superstructure,
		capacitor,
		engine,
		shield,
		shipsim,
		sensor,
		weapons,
		modules,
		mods,
	};
	return (
		<div className="App">
			<SuperstructureSelection ssType={ssType} setSsType={setSsType} selected={superstructure} setSelected={setSuperstructure} mods={modsWithLevels} />
			<ComponentSelection selected={capacitor} setSelected={setCapacitor} masterList={CAPACITORS} ss_type={ssType} comp_name="capacitors" comp_type={Capacitor} mods={modsWithLevels} />
			<ComponentSelection selected={engine} setSelected={setEngine} masterList={ENGINES} ss_type={ssType} comp_name="engines" comp_type={Engine} mods={modsWithLevels} />
			<ComponentSelection selected={shield} setSelected={setShield} masterList={SHIELDS} ss_type={ssType} comp_name="shields" comp_type={Shield} mods={modsWithLevels} />
			<ComponentSelection selected={shipsim} setSelected={setShipsim} masterList={SHIPSIMS} ss_type={ssType} comp_name="shipsims" comp_type={Shipsim} mods={modsWithLevels} />
			<ComponentSelection selected={sensor} setSelected={setSensor} masterList={SENSORS} ss_type={ssType} comp_name="sensors" comp_type={Sensor} mods={modsWithLevels} />
			<ModulesSelection selected={modules} setSelected={setModules} superstructure={superstructure} masterList={MODULES} name="modules" mods={modsWithLevels} />
			<ModulesSelection selected={weapons} setSelected={setWeapons} superstructure={superstructure} masterList={WEAPONS} name="weapons" mods={modsWithLevels} />
			<ModsSelection selected={mods} setSelected={setMods} masterList={SHIP_MODS} />
			<ShipDisplay {...ship} />
			<ShipBuilder {...ship} />
		</div>
	);
}

export default App;
