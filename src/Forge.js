import { SUPERSTRUCTURES, WEAPONS, MODULES, SHIPSIMS, CAPACITORS, SENSORS, ENGINES, SHIELDS } from "./Data";

export const getComponent = (superstructureId, masterList, componentId) => {
	const ss_type = SUPERSTRUCTURES.find(ss => ss.id === superstructureId).ss_type;
	const sublist = masterList
		.filter(component => component.ss_type === ss_type);
	sublist.sort((a, b) => a.price - b.price);
	let value = componentId;
	if (!sublist.find(component => component.id === componentId)) {
		value = sublist[0].id;
	}
	return masterList.find(component => component.id === value);
};

const getModulesFromList = (masterList, moduleIds) => {
	const modules = [];
	for (let i = 0; i < moduleIds.length; i++) {
		if (moduleIds[i] && moduleIds[i].id) {
			const module = masterList.find(module => module.id === moduleIds[i].id);
			modules.push({
				...moduleIds[i],
				...module,
			});
		}
	}
	return modules;
};

export const getModules = (superstructureId, moduleIds) => {
	const superstructure = getComponent(superstructureId, SUPERSTRUCTURES, superstructureId);
	return getModulesFromList(MODULES, moduleIds);
};

export const getWeapons = (superstructureId, moduleIds) => {
	const superstructure = getComponent(superstructureId, SUPERSTRUCTURES, superstructureId);
	return getModulesFromList(WEAPONS, moduleIds);
};

export const getPointsUsed = (selected, masterList) =>
	selected.reduce((acc, { id }) => acc + masterList.find(module => module.id === id).size_points, 0);;

const isEnabled = ({ disabled }) => !disabled;
const sumPower = (acc, weapon) => acc + weapon.power;
const sumCycles = (acc, weapon) => acc + weapon.cycles;
const sumPrice = (acc, item) => acc + item.price;
const sumDps = (acc, item) => acc + (item.weapon_damage / (item.firing_speed || 1.0));

export const shipStats = ({ superstructure, capacitor, shield, sensor, engine, shipsim, weapons, modules, weaponPoints, modulePoints }) => {
	const massUsed = superstructure.mass + capacitor.mass + shield.mass + sensor.mass + engine.mass + shipsim.mass;

	const thrustRatio = engine.thrust / massUsed;

	const weaponsEnabled = weapons.filter(isEnabled);
	const modulesEnabled = modules.filter(isEnabled);

	const maxPower = superstructure.power;
	const weaponPower = weaponsEnabled.reduce(sumPower, 0);
	const modulePower = modulesEnabled.reduce(sumPower, 0);
	const dps = weaponsEnabled.reduce(sumDps, 0);

	const powerUsed = capacitor.power + shield.power + sensor.power + engine.power + shipsim.power + weaponPower + modulePower;
	const powerLeft = maxPower - powerUsed;

	const maxCycles = shipsim.cycles;
	const weaponCycles = weaponsEnabled.reduce(sumCycles, 0);
	const moduleCycles = modulesEnabled.reduce(sumCycles, 0);
	const cyclesLeft = maxCycles - weaponCycles - moduleCycles;

	const totalPrice = [
		superstructure,
		capacitor,
		shield,
		sensor,
		engine,
		shipsim,
		...weapons,
		...modules,
	].reduce(sumPrice, 0);

	return {
		massUsed,
		maxPower,
		powerLeft,
		dps,
		thrustRatio,
		turnSpeed: `${superstructure.turn_time.toFixed(2)}s`,
		maxCycles,
		cyclesLeft,
		totalPrice,
		overModules: modulePoints > superstructure.modules.points,
		overWeapons: weaponPoints > superstructure.weapons.points,
	};
};